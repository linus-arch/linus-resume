export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export const MAX_MESSAGES = 12;
export const MAX_CONTENT_LENGTH = 1600;
export const MAX_TOTAL_CONTENT_LENGTH = 9000;

const INSTRUCTION_LEAK_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /reveal|show|print|repeat.{0,30}(system|developer|hidden)\s+(prompt|message|instruction)/i,
  /you are now|act as|pretend to be/i,
  /jailbreak|developer message|system message/i,
];

export function normalizeMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_MESSAGES) {
    return null;
  }

  const messages: ChatMessage[] = [];
  let totalLength = 0;

  for (const item of input) {
    if (!item || typeof item !== "object") return null;
    const record = item as { role?: unknown; content?: unknown };
    if ((record.role !== "user" && record.role !== "assistant") || typeof record.content !== "string") {
      return null;
    }

    const content = record.content.trim();
    if (!content || content.length > MAX_CONTENT_LENGTH) return null;

    totalLength += content.length;
    if (totalLength > MAX_TOTAL_CONTENT_LENGTH) return null;
    messages.push({ role: record.role, content });
  }

  if (messages[messages.length - 1]?.role !== "user") return null;
  return messages;
}

export function containsInstructionLeakAttempt(messages: ChatMessage[]): boolean {
  return messages.some(
    (message) => message.role === "user" && INSTRUCTION_LEAK_PATTERNS.some((pattern) => pattern.test(message.content)),
  );
}

export function containsSensitiveOutput(content: string): boolean {
  return (
    /OPENAI_API_KEY|sk-[A-Za-z0-9_-]{20,}/i.test(content) ||
    /system\s+prompt|developer\s+message|hidden\s+instructions/i.test(content)
  );
}

export function toServerSentEvents(content: string): string {
  const chunks = content.match(/.{1,240}/gs) ?? [content];
  return `${chunks.map((chunk) => `data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`).join("")}data: [DONE]\n\n`;
}
