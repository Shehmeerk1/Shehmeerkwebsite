import { demoListings } from "./demo-data";
import type { Listing, ListingQuery, ListingResult, ListingsProvider } from "./types";

function matches(l: Listing, q: ListingQuery): boolean {
  if (q.q) {
    const needle = q.q.trim().toLowerCase();
    const haystack = `${l.community} ${l.city} ${l.communitySlug} ${l.type}`.toLowerCase();
    if (needle && !haystack.includes(needle)) return false;
  }
  if (q.minPrice != null && l.price < q.minPrice) return false;
  if (q.maxPrice != null && l.price > q.maxPrice) return false;
  if (q.beds != null && l.beds < q.beds) return false;
  if (q.baths != null && l.baths < q.baths) return false;
  if (q.type && l.type !== q.type) return false;
  return true;
}

export const demoProvider: ListingsProvider = {
  name: "demo",
  isDemo: true,
  async search(query): Promise<ListingResult> {
    const found = demoListings.filter((l) => matches(l, query));
    const sorted =
      query.sort === "price-asc"
        ? found.toSorted((a, b) => a.price - b.price)
        : query.sort === "newest"
          ? found.toSorted((a, b) => b.yearBuilt - a.yearBuilt)
          : found.toSorted((a, b) => b.price - a.price);
    return { listings: sorted, total: sorted.length, isDemo: true };
  },
  async getById(id) {
    return demoListings.find((l) => l.id === id) ?? null;
  },
  async getByIds(ids) {
    const wanted = new Set(ids);
    return demoListings.filter((l) => wanted.has(l.id));
  },
  async featured(limit) {
    return ["demo-01", "demo-11", "demo-04", "demo-03"].slice(0, limit).flatMap((id) => demoListings.find((l) => l.id === id) ?? []);
  },
};
