const COOKIE_NAME = "private_archive_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

const encoder = new TextEncoder();

function base64Encode(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64Decode(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(normalized);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function timingSafeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
  return difference === 0;
}

async function derivePasswordKey(password: string, salt: Uint8Array) {
  const material = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 210_000, hash: "SHA-256" }, material, 256);
  return new Uint8Array(bits);
}

async function sign(value: string): Promise<string> {
  const secret = process.env.PRIVATE_CONTENT_SESSION_SECRET;
  if (!secret) throw new Error("PRIVATE_CONTENT_SESSION_SECRET is not configured");
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64Encode(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))));
}

export function getClientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const current = attempts.get(clientKey);
  if (!current || now > current.resetAt) {
    attempts.set(clientKey, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const expected = process.env.PRIVATE_CONTENT_PASSWORD_HASH;
  const salt = process.env.PRIVATE_CONTENT_PASSWORD_SALT;
  if (!expected || !salt) throw new Error("Private content password is not configured");
  const derived = await derivePasswordKey(password, base64Decode(salt));
  return timingSafeEqual(derived, base64Decode(expected));
}

export async function createSession(): Promise<string> {
  const payload = `${Date.now() + SESSION_TTL_SECONDS * 1000}.${crypto.randomUUID()}`;
  return `${payload}.${await sign(payload)}`;
}

export async function hasValidSession(req: Request): Promise<boolean> {
  const cookie = req.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return false;
  const token = cookie.slice(COOKIE_NAME.length + 1);
  const parts = token.split(".");
  if (parts.length !== 3 || Number(parts[0]) < Date.now()) return false;
  const expected = await sign(`${parts[0]}.${parts[1]}`);
  return timingSafeEqual(base64Decode(parts[2]), base64Decode(expected));
}

export function sessionCookie(value: string): string {
  return `${COOKIE_NAME}=${value}; Path=/api/private; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; Secure; SameSite=Strict`;
}

export function clearedSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/api/private; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

export async function logAttempt(req: Request, successful: boolean, reason: string): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const payload = { area: "private_archive", successful, reason, ip_hash: await digest(getClientKey(req)), user_agent_hash: await digest(req.headers.get("user-agent") || "unknown") };
  if (!url || !serviceKey) {
    console.warn("Private archive access attempt", { successful, reason });
    return;
  }
  const response = await fetch(`${url}/rest/v1/security_access_attempts`, {
    method: "POST",
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) console.error("Failed to persist private archive access attempt", response.status);
}

async function digest(value: string): Promise<string> {
  return base64Encode(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value))));
}

export { COOKIE_NAME };
