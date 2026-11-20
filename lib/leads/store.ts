import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { LeadRecord } from "./schema";

export type StoreResult = { ok: true; via: "webhook" | "file" } | { ok: false; reason: "not-configured" | "delivery-failed" };

/**
 * Where leads go.
 *  1. LEADS_WEBHOOK_URL set: POST the record as JSON (CRM, Zapier, Make, n8n).
 *  2. Local development: append to .data/leads.jsonl so the flow can be tested.
 *  3. Production with nothing configured: refuse, so the form never claims a
 *     delivery that did not happen.
 */
export async function storeLead(lead: LeadRecord): Promise<StoreResult> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.LEADS_WEBHOOK_SECRET ? { "x-leads-secret": process.env.LEADS_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      return res.ok ? { ok: true, via: "webhook" } : { ok: false, reason: "delivery-failed" };
    } catch {
      return { ok: false, reason: "delivery-failed" };
    }
  }

  if (process.env.NODE_ENV !== "production" || process.env.LEADS_ALLOW_FILE_STORE === "true") {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n", "utf8");
    return { ok: true, via: "file" };
  }

  return { ok: false, reason: "not-configured" };
}
