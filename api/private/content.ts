import { hasValidSession } from "../_lib/private-content";

export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  if (req.method !== "GET") return new Response("Method not allowed", { status: 405 });
  try {
    if (!await hasValidSession(req)) return new Response(JSON.stringify({ error: "Authentication required" }), { status: 401, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
    return new Response(JSON.stringify({ entries: [{ title: "Private field notes", body: "This is protected content. Replace it in api/private/content.ts with the material you want to share privately." }] }), { headers: { "Content-Type": "application/json", "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Private archive content error", error);
    return new Response(JSON.stringify({ error: "Unable to load private content" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
