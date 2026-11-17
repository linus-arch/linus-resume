import { clearedSessionCookie } from "../_lib/private-content";

export const config = { runtime: "edge" };

export default function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json", "Set-Cookie": clearedSessionCookie() } });
}
