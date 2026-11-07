import { NextResponse } from "next/server";
import { deliverLead, leadSchema } from "@/lib/leads";

// Simple per-IP rate limit (per server instance). Replace with a shared store in production if needed.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX = 5;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const h = hits.get(ip);
  if (h && h.reset > now && h.count >= MAX) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }
  hits.set(ip, h && h.reset > now ? { count: h.count + 1, reset: h.reset } : { count: 1, reset: now + WINDOW_MS });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    // Honeypot filled → pretend success so bots learn nothing.
    if (first?.path[0] === "website") return NextResponse.json({ ok: true });
    return NextResponse.json({ error: first?.message ?? "Please check the form." }, { status: 400 });
  }

  try {
    const result = await deliverLead(parsed.data);
    if (!result.ok) return NextResponse.json({ error: "We couldn't save that right now. Please try again." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We couldn't save that right now. Please try again." }, { status: 502 });
  }
}
