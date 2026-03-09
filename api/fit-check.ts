import { FIT_CHECK_PROMPT } from "./_lib/context";

export const config = { runtime: "edge" };

const ALLOWED_ORIGINS = [
  process.env.ALLOWED_ORIGIN, // Set in Vercel env vars (e.g. https://yourdomain.com)
].filter(Boolean);

const MAX_JOB_DESCRIPTION_LENGTH = 5000;

// Simple in-memory rate limiter (per edge instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

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

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const allowedOrigin =
    ALLOWED_ORIGINS.length > 0 && ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0] ?? "*";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function errorResponse(message: string, status: number, cors: Record<string, string>) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

export default async function handler(req: Request) {
  const cors = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  if (req.method !== "POST") {
    return errorResponse("Method not allowed", 405, cors);
  }

  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return errorResponse("Too many requests. Please try again later.", 429, cors);
  }

  try {
    const body = await req.json();
    const jobDescription =
      typeof body.jobDescription === "string"
        ? body.jobDescription.trim().slice(0, MAX_JOB_DESCRIPTION_LENGTH)
        : "";

    if (jobDescription.length < 50) {
      return errorResponse(
        "Please provide a more detailed job description (at least 50 characters)",
        400,
        cors,
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return errorResponse("AI service is not configured", 500, cors);
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: FIT_CHECK_PROMPT },
          { role: "user", content: `Analyze this job description:\n\n${jobDescription}` },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return errorResponse("Rate limited. Please try again in a moment.", 429, cors);
      }
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      return errorResponse("Failed to analyze job description", 500, cors);
    }

    return new Response(response.body, {
      headers: { ...cors, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Fit check error:", error);
    return errorResponse("An unexpected error occurred", 500, cors);
  }
}
