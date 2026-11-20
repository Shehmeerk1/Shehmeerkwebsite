"use client";

import Image from "next/image";
import { useState } from "react";
import type { Listing } from "@/lib/listings/types";
import { cn } from "@/lib/utils";
import { Elevation } from "./elevation";
import { SampleFlags } from "./listing-card";

/** One large frame, thumbnails to switch it. Keyboard: the thumbnails are plain buttons. */
export function Gallery({ listing }: { listing: Listing }) {
  const [i, setI] = useState(0);
  const photos = listing.photos;
  if (photos.length === 0) {
    return (
      <div className="aspect-[16/9] overflow-hidden rounded-[1.25rem]">
        <Elevation style={listing.style} seed={listing.id} tone="dusk" />
      </div>
    );
  }
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_9rem]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-surface lg:aspect-[16/9]">
        {photos.map((p, n) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            fill
            priority={n === 0}
            sizes="(min-width: 1024px) 75vw, 100vw"
            className={cn("object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]", n === i ? "scale-100 opacity-100" : "scale-105 opacity-0")}
          />
        ))}
        <SampleFlags listing={listing} className="absolute left-4 top-4" />
        <p className="t-label t-num absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1.5 text-white backdrop-blur-sm" aria-live="polite">
          {i + 1} of {photos.length}
        </p>
      </div>
      <ul className="flex gap-3 lg:flex-col" aria-label="Photos">
        {photos.map((p, n) => (
          <li key={p.src} className="flex-1 lg:flex-none">
            <button
              type="button"
              onClick={() => setI(n)}
              aria-label={`Show photo ${n + 1}: ${p.alt}`}
              aria-pressed={n === i}
              className={cn("relative block aspect-[4/3] w-full overflow-hidden rounded-[0.75rem] transition-opacity", n === i ? "opacity-100 ring-2 ring-accent ring-offset-2 ring-offset-bg" : "opacity-60 hover:opacity-100")}
            >
              <Image src={p.src} alt="" fill sizes="10rem" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
