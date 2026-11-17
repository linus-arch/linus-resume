import { createSession, getClientKey, isRateLimited, logAttempt, sessionCookie, verifyPassword } from "../_lib/private-content";

export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const clientKey = getClientKey(req);
  if (isRateLimited(clientKey)) {
    await logAttempt(req, false, "rate_limited");
    return new Response(JSON.stringify({ error: "Too many attempts. Try again later." }), { status: 429, headers: { "Content-Type": "application/json" } });
  }
  try {
    const body = await req.json() as { password?: unknown };
    const password = typeof body.password === "string" ? body.password : "";
    const valid = password.length > 0 && password.length <= 256 && await verifyPassword(password);
    await logAttempt(req, valid, valid ? "success" : "invalid_password");
    if (!valid) return new Response(JSON.stringify({ error: "Unable to unlock this archive." }), { status: 401, headers: { "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookie(await createSession()) } });
  } catch (error) {
    console.error("Private archive unlock error", error);
    return new Response(JSON.stringify({ error: "Private archive is not configured." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
