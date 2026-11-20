import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { DemoBanner } from "@/components/listings/demo-banner";
import { SavedCount } from "@/components/listings/favorite-button";
import { ListingCard } from "@/components/listings/listing-card";
import { SearchForm } from "@/components/listings/search-form";
import { CloseCta } from "@/components/site/close-cta";
import { Button } from "@/components/ui/button";
import { getListingsProvider } from "@/lib/listings";
import { PROPERTY_TYPES, type ListingQuery, type PropertyType } from "@/lib/listings/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Explore homes in Arizona",
  description: "Search homes across the Valley by location, price, bedrooms, bathrooms and property type.",
  alternates: { canonical: "/homes" },
};

type Params = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const num = (v: string | undefined) => {
  const n = Number(v);
  return v && Number.isFinite(n) && n > 0 ? n : undefined;
};

export default async function HomesPage({ searchParams }: { searchParams: Promise<Params> }) {
  const sp = await searchParams;
  const values = { q: one(sp.q)?.slice(0, 80), min: one(sp.min), max: one(sp.max), beds: one(sp.beds), baths: one(sp.baths), type: one(sp.type), sort: one(sp.sort) };
  const query: ListingQuery = {
    q: values.q,
    minPrice: num(values.min),
    maxPrice: num(values.max),
    beds: num(values.beds),
    baths: num(values.baths),
    type: PROPERTY_TYPES.includes(values.type as PropertyType) ? (values.type as PropertyType) : undefined,
    sort: values.sort === "price-asc" || values.sort === "newest" ? values.sort : "price-desc",
  };
  const provider = getListingsProvider();
  const { listings, total, isDemo } = await provider.search(query);
  const filtered = Object.values(values).some(Boolean);

  return (
    <>
      <section data-theme="chalk" className="pt-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="t-card !text-[clamp(3.6rem,11vw,12rem)]">
              <span className="line-mask">
                <span>Find a home</span>
              </span>
            </h1>
            <Link href="/homes/saved" className="t-label inline-flex min-h-11 items-center gap-2.5 rounded-full border border-fg/25 px-4 transition-colors hover:bg-fg hover:text-bg">
              <Heart className="size-4" strokeWidth={1.6} aria-hidden />
              Saved homes <SavedCount />
            </Link>
          </div>
          <div data-theme="basalt" className="mt-8 rounded-[1.5rem] p-[clamp(1.25rem,2.5vw,2rem)]">
            <SearchForm key={JSON.stringify(values)} values={values} />
          </div>
          {isDemo ? <DemoBanner className="mt-4" /> : null}
        </div>
      </section>

      <section data-theme="chalk" aria-labelledby="results-title" className="pb-[clamp(4.5rem,9vw,8rem)] pt-12">
        <div className="wrap">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
            <h2 id="results-title" className="t-m t-num" aria-live="polite">
              {total} {total === 1 ? "home" : "homes"}
              {values.q ? ` matching “${values.q}”` : ""}
              {isDemo ? <span className="t-label ml-3 align-middle text-muted">sample data</span> : null}
            </h2>
            {filtered ? (
              <Link href="/homes" className="t-label inline-flex min-h-11 items-center">
                <span className="link-draw">Clear all filters</span>
              </Link>
            ) : null}
          </div>

          {total === 0 ? (
            <div className="py-16">
              <p className="t-xl max-w-[14ch]">Nothing matches that, yet.</p>
              <p className="t-body mt-5 max-w-md text-muted">Widen the price range or clear a filter. Or tell me what you are looking for and I will search for you, including homes that never reach the portals.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/homes">Clear all filters</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact?topic=buy-sell">Describe what you need</Link>
                </Button>
              </div>
            </div>
          ) : (
            <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((l, i) => (
                <li key={l.id} className={cn(i % 3 === 1 && "lg:translate-y-14")}>
                  <ListingCard listing={l} priority={i < 3} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CloseCta title="Looking for something specific?" />
    </>
  );
}
