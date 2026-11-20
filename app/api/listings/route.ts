import { NextResponse } from "next/server";
import { getListingsProvider } from "@/lib/listings";

/** Looks up listings by id for the saved-homes page (ids live in the visitor's browser). */
export async function GET(request: Request) {
  const ids = (new URL(request.url).searchParams.get("ids") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^[\w-]{1,40}$/.test(s))
    .slice(0, 50);
  if (ids.length === 0) return NextResponse.json({ listings: [], isDemo: getListingsProvider().isDemo });
  const provider = getListingsProvider();
  const listings = await provider.getByIds(ids);
  return NextResponse.json({ listings, isDemo: provider.isDemo });
}
