"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ListingCard } from "@/components/listings/listing-card";
import type { Listing } from "@/lib/listings/types";

/** A horizontal rail of homes: native scroll and snap, with buttons for people who don't swipe. */
export function HomeRail({ listings }: { listings: Listing[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 24), behavior: "smooth" });
  };
  return (
    <div>
      <div className="wrap mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => step(-1)} aria-label="Previous homes" className="inline-flex size-12 items-center justify-center rounded-full border border-fg/30 transition-colors hover:bg-fg hover:text-bg">
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next homes" className="inline-flex size-12 items-center justify-center rounded-full border border-fg/30 transition-colors hover:bg-fg hover:text-bg">
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>
      <ul
        ref={rail}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: "max(clamp(1.25rem, 3.4vw, 3.5rem), calc((100vw - 1720px) / 2 + 3.5rem))", scrollPaddingInline: "max(clamp(1.25rem, 3.4vw, 3.5rem), calc((100vw - 1720px) / 2 + 3.5rem))" }}
      >
        {listings.map((l, i) => (
          <li key={l.id} className="w-[min(82vw,30rem)] flex-none snap-start">
            <ListingCard listing={l} aspect={i % 2 ? "aspect-[4/5]" : "aspect-[4/5] md:aspect-[5/6]"} sizes="(min-width: 640px) 30rem, 82vw" />
          </li>
        ))}
        <li className="w-[min(82vw,30rem)] flex-none snap-start">
          <Link href="/homes" data-theme="cobalt" className="group flex aspect-[4/5] flex-col justify-between rounded-[1rem] p-7">
            <ArrowUpRight className="size-14 self-end transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:translate-x-2" strokeWidth={1.2} aria-hidden />
            <span className="t-l">Search every home</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
