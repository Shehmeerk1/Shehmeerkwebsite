import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { buildTags, CONSENT_WORDING, leadSchema, PIPELINE, validateExtras, type LeadRecord } from "@/lib/leads/schema";
import { storeLead } from "@/lib/leads/store";
import { issueDownloadToken } from "@/lib/leads/token";
import { resourceBySlug } from "@/lib/resources";

export const runtime = "nodejs";

// Best-effort throttle per server instance. Put a real limiter (Vercel WAF,
// Upstash) in front of this route for production traffic.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, message: "Cross-site submissions are not accepted." }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (throttled(ip)) {
    return NextResponse.json({ ok: false, message: "Too many requests from this connection. Wait a few minutes and send it again." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The request was not readable." }, { status: 400 });
  }

  // Bots that fill the honeypot get a quiet success and nothing is stored.
  if (typeof json === "object" && json !== null && "website" in json && (json as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }
  const input = parsed.data;
  const extraErrors = validateExtras(input);
  if (Object.keys(extraErrors).length) return NextResponse.json({ ok: false, errors: extraErrors }, { status: 422 });

  const resource = input.kind === "resource" ? resourceBySlug.get(String(input.extras.resource)) : null;
  if (input.kind === "resource" && !resource) {
    return NextResponse.json({ ok: false, errors: { resource: "That resource does not exist." } }, { status: 422 });
  }

  const now = new Date().toISOString();
  const lead: LeadRecord = {
    id: randomUUID(),
    receivedAt: now,
    kind: input.kind,
    pipeline: PIPELINE[input.kind],
    tags: buildTags(input),
    source: input.source,
    name: input.name,
    email: input.email.toLowerCase(),
    phone: input.phone || null,
    message: input.message || null,
    extras: input.extras,
    consent: { contact: true, marketing: input.consentMarketing, recordedAt: now, wording: CONSENT_WORDING.contact },
  };

  const stored = await storeLead(lead);
  if (!stored.ok) {
    const message =
      stored.reason === "not-configured"
        ? "This form is not connected to an inbox yet, so your message was not sent."
        : "Your message could not be delivered. Nothing was saved; send it again in a moment.";
    return NextResponse.json({ ok: false, message }, { status: 503 });
  }

  const token = resource ? issueDownloadToken(resource.slug) : null;
  return NextResponse.json({ ok: true, id: lead.id, download: resource && token ? `/api/resources/${resource.slug}?token=${encodeURIComponent(token)}` : null });
}
