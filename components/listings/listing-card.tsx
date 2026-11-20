import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/lib/listings/types";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import { Elevation } from "./elevation";
import { FavoriteButton } from "./favorite-button";

export function ListingFacts({ listing, className }: { listing: Listing; className?: string }) {
  return (
    <p className={cn("t-label t-num text-muted", className)}>
      {listing.beds}&nbsp;bed, {listing.baths}&nbsp;bath, {formatNumber(listing.sqft)}&nbsp;sq&nbsp;ft
    </p>
  );
}

/** The two flags every sample record carries, so it is never mistaken for a real listing. */
export function SampleFlags({ listing, className }: { listing: Listing; className?: string }) {
  if (!listing.isDemo && !listing.photosAreStandIns) return null;
  return (
    <div className={cn("pointer-events-none flex flex-wrap gap-1.5", className)}>
      {listing.isDemo ? <span className="t-label rounded-full bg-[#f2d33b] px-2.5 py-1 text-[#12100e]">Sample listing</span> : null}
      {listing.photosAreStandIns ? <span className="t-label rounded-full bg-[#0f0e0c]/75 px-2.5 py-1 text-[#f3f0ea] backdrop-blur-sm">Stand-in photos</span> : null}
    </div>
  );
}

/**
 * A listing card. Hover crossfades from the exterior to an interior, so a
 * glance shows more than the facade.
 */
export function ListingCard({ listing, aspect = "aspect-[4/5]", sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw", className, priority = false }: { listing: Listing; aspect?: string; sizes?: string; className?: string; priority?: boolean }) {
  const [first, second] = listing.photos;
  return (
    <article className={cn("group relative", className)}>
      <Link href={`/homes/${listing.id}`} className="block">
        <div className={cn("photo-zoom relative overflow-hidden rounded-[1rem] bg-surface", aspect)}>
          {first ? (
            <>
              <Image src={first.src} alt={first.alt} fill sizes={sizes} priority={priority} className="object-cover" />
              {second ? <Image src={second.src} alt="" fill sizes={sizes} className="object-cover opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" /> : null}
            </>
          ) : (
            <Elevation style={listing.style} seed={listing.id} title={`Line drawing for ${listing.title}`} />
          )}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
          <SampleFlags listing={listing} className="absolute left-3 top-3" />
          <p className="t-num absolute bottom-3 left-4 text-[1.375rem] font-semibold tracking-[-0.02em] text-white [font-variation-settings:'wdth'_80]">{formatPrice(listing.price)}</p>
        </div>
        <div className="mt-3.5 flex items-baseline justify-between gap-4">
          <h3 className="t-s">
            <span className="link-draw">{listing.community}</span>
          </h3>
          <p className="t-label text-muted">{listing.type}</p>
        </div>
        <ListingFacts listing={listing} className="mt-1" />
      </Link>
      <FavoriteButton id={listing.id} title={`${listing.title} in ${listing.community}`} className="absolute right-3 top-3" />
    </article>
  );
}
