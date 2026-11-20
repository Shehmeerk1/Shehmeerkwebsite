"use client";

import { useRef } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { PROPERTY_TYPES } from "@/lib/listings/types";

const PRICES = [300000, 500000, 750000, 1000000, 1500000, 2000000, 3000000, 5000000];
const priceLabel = (n: number) => (n >= 1_000_000 ? `$${n / 1_000_000}M` : `$${n / 1000}K`);

type Values = { q?: string; min?: string; max?: string; beds?: string; baths?: string; type?: string; sort?: string };

/**
 * A plain GET form: it works without JavaScript and every search is a
 * shareable URL. Selects submit on change; the location field submits on Enter.
 */
export function SearchForm({ values }: { values: Values }) {
  const ref = useRef<HTMLFormElement>(null);
  const submit = () => ref.current?.requestSubmit();
  return (
    <form ref={ref} method="get" action="/homes" role="search" aria-label="Search homes" className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-12">
      <div className="col-span-2 md:col-span-4">
        <label htmlFor="q" className="t-label block text-muted">
          Location
        </label>
        <Input id="q" name="q" type="search" defaultValue={values.q} placeholder="Scottsdale, Arcadia…" autoComplete="off" />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="min" className="t-label block text-muted">
          Min price
        </label>
        <Select id="min" name="min" defaultValue={values.min ?? ""} onChange={submit}>
          <option value="">No min</option>
          {PRICES.map((p) => (
            <option key={p} value={p}>
              {priceLabel(p)}
            </option>
          ))}
        </Select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="max" className="t-label block text-muted">
          Max price
        </label>
        <Select id="max" name="max" defaultValue={values.max ?? ""} onChange={submit}>
          <option value="">No max</option>
          {PRICES.map((p) => (
            <option key={p} value={p}>
              {priceLabel(p)}
            </option>
          ))}
        </Select>
      </div>
      <div className="md:col-span-1">
        <label htmlFor="beds" className="t-label block text-muted">
          Beds
        </label>
        <Select id="beds" name="beds" defaultValue={values.beds ?? ""} onChange={submit}>
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </Select>
      </div>
      <div className="md:col-span-1">
        <label htmlFor="baths" className="t-label block text-muted">
          Baths
        </label>
        <Select id="baths" name="baths" defaultValue={values.baths ?? ""} onChange={submit}>
          <option value="">Any</option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </Select>
      </div>
      <div className="col-span-2 md:col-span-2">
        <label htmlFor="type" className="t-label block text-muted">
          Property type
        </label>
        <Select id="type" name="type" defaultValue={values.type ?? ""} onChange={submit}>
          <option value="">All types</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </div>
      <div className="col-span-2 flex flex-wrap items-end justify-between gap-4 md:col-span-12">
        <div className="w-44">
          <label htmlFor="sort" className="t-label block text-muted">
            Sort by
          </label>
          <Select id="sort" name="sort" defaultValue={values.sort ?? ""} onChange={submit}>
            <option value="">Price, high to low</option>
            <option value="price-asc">Price, low to high</option>
            <option value="newest">Newest built</option>
          </Select>
        </div>
        <Button type="submit" variant="accent" size="lg">
          <Search aria-hidden /> Search homes
        </Button>
      </div>
    </form>
  );
}
