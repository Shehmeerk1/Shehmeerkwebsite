import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 1000 * 60 * 60 * 24; // download links last a day

function secret(): string | null {
  if (process.env.LEAD_TOKEN_SECRET) return process.env.LEAD_TOKEN_SECRET;
  // A fixed development secret so the flow works locally. Never used in production.
  return process.env.NODE_ENV === "production" ? null : "dev-only-secret-not-for-production";
}

const sign = (payload: string, key: string) => createHmac("sha256", key).update(payload).digest("base64url");

export function issueDownloadToken(slug: string): string | null {
  const key = secret();
  if (!key) return null;
  const expires = Date.now() + TTL_MS;
  return `${expires}.${sign(`${slug}.${expires}`, key)}`;
}

export function verifyDownloadToken(slug: string, token: string | null): boolean {
  const key = secret();
  if (!key || !token) return false;
  const [expiresRaw, mac] = token.split(".");
  const expires = Number(expiresRaw);
  if (!mac || !Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = Buffer.from(sign(`${slug}.${expires}`, key));
  const given = Buffer.from(mac);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
