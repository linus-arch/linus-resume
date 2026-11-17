import { RESUME_CONTEXT } from "./_lib/context";
import {
  containsInstructionLeakAttempt,
  containsSensitiveOutput,
  normalizeMessages,
  toServerSentEvents,
} from "./_lib/chat-guardrails";

export const config = { runtime: "edge" };

const allowedOrigins = (process.env.ALLOWED_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 15;

function isLocalDevelopmentOrigin(origin: string): boolean {
  if (process.env.VERCEL_ENV === "production") return false;
  try {
    const url = new URL(origin);
    return url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname);
  } catch {
    return false;
  }
}

function isAllowedOrigin(origin: string): boolean {
  return allowedOrigins.includes(origin) || isLocalDevelopmentOrigin(origin);
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };

  if (origin && isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function errorResponse(message: string, status: number, cors: Record<string, string>) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function isOriginAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  return !origin || isAllowedOrigin(origin);
}

async function isFlaggedByModeration(apiKey: string, input: string): Promise<boolean> {
  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "omni-moderation-latest", input }),
  });

  if (!response.ok) {
    console.error("OpenAI moderation error:", response.status);
    throw new Error("Moderation service unavailable");
  }

  const data = (await response.json()) as { results?: Array<{ flagged?: boolean }> };
  return data.results?.some((result) => result.flagged === true) ?? false;
}

export default async function handler(req: Request) {
  const cors = getCorsHeaders(req);

  if (!isOriginAllowed(req)) {
    return errorResponse("Origin not allowed", 403, cors);
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  if (req.method !== "POST") {
    return errorResponse("Method not allowed", 405, cors);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return errorResponse("Too many requests. Please try again later.", 429, cors);
  }

  try {
    const body = await req.json() as { messages?: unknown };
    const messages = normalizeMessages(body.messages);

    if (!messages) {
      return errorResponse("Invalid conversation. Send a non-empty conversation ending with a user message.", 400, cors);
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return errorResponse("AI service is not configured", 500, cors);
    }

    const latestUserMessage = messages[messages.length - 1].content;
    const trustedUserMessages = messages
      .filter((message) => message.role === "user")
      .map((message) => ({ role: "user" as const, content: message.content }));
    if (containsInstructionLeakAttempt(messages)) {
      return new Response(toServerSentEvents(
        "I can answer questions about Linus, his work, education, projects, and professional fit, but I cannot share hidden instructions or internal implementation details.",
      ), {
        headers: { ...cors, "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
      });
    }

    if (await isFlaggedByModeration(apiKey, latestUserMessage)) {
      return new Response(toServerSentEvents(
        "I can help with questions about Linus and his professional work. Please rephrase your question within that scope.",
      ), {
        headers: { ...cors, "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 500,
        messages: [{ role: "system", content: RESUME_CONTEXT }, ...trustedUserMessages],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return errorResponse("Rate limited. Please try again in a moment.", 429, cors);
      }
      console.error("OpenAI API error:", response.status);
      return errorResponse("Failed to get AI response", 502, cors);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content || containsSensitiveOutput(content)) {
      return new Response(toServerSentEvents(
        "I can answer questions about Linus's background, projects, skills, and professional fit. I do not have a safe answer to that question.",
      ), {
        headers: { ...cors, "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
      });
    }

    if (await isFlaggedByModeration(apiKey, content)) {
      return new Response(toServerSentEvents(
        "I can help with questions about Linus and his professional work. Please try a different question.",
      ), {
        headers: { ...cors, "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
      });
    }

    return new Response(toServerSentEvents(content), {
      headers: { ...cors, "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return errorResponse("An unexpected error occurred", 500, cors);
  }
}
