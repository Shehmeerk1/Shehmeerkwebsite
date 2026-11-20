import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DemoBanner } from "@/components/listings/demo-banner";
import { FavoriteButton } from "@/components/listings/favorite-button";
import { Gallery } from "@/components/listings/gallery";
import { InquiryPanel } from "@/components/listings/inquiry-panel";
import { ListingCard } from "@/components/listings/listing-card";
import { ShowingBar } from "@/components/listings/showing-bar";
import { getListingsProvider } from "@/lib/listings";
import { formatNumber, formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingsProvider().getById(id);
  if (!listing) return { title: "Home not found" };
  return {
    title: `${listing.community}: ${listing.beds} bed ${listing.type.toLowerCase()}${listing.isDemo ? " (sample)" : ""}`,
    description: listing.summary,
    robots: listing.isDemo ? { index: false } : undefined,
    alternates: { canonical: `/homes/${listing.id}` },
  };
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const provider = getListingsProvider();
  const listing = await provider.getById(id);
  if (!listing) notFound();
  const { listings: all } = await provider.search({});
  const related = [...all.filter((l) => l.id !== listing.id && l.city === listing.city), ...all.filter((l) => l.id !== listing.id && l.city !== listing.city)].slice(0, 3);

  const facts: [string, string][] = [
    ["Bedrooms", String(listing.beds)],
    ["Bathrooms", String(listing.baths)],
    ["Interior", `${formatNumber(listing.sqft)} sq ft`],
    ["Lot", listing.lotSqft ? `${formatNumber(listing.lotSqft)} sq ft` : "None"],
    ["Built", String(listing.yearBuilt)],
    ["Type", listing.type],
  ];

  return (
    <>
      <section data-theme="chalk" className="pt-24">
        <div className="wrap">
          <Link href="/homes" className="t-label inline-flex min-h-11 items-center gap-2 text-muted hover:text-fg">
            <ArrowLeft className="size-4" aria-hidden />
            <span className="link-draw">All homes</span>
          </Link>
          <div className="mt-3">
            <Gallery listing={listing} />
          </div>
        </div>
      </section>

      <section data-theme="chalk" className="pb-[clamp(4rem,8vw,7rem)] pt-10">
        <div className="wrap grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <p className="t-label text-muted">
              {listing.title}, {listing.city}, Arizona
            </p>
            <h1 className="t-xl mt-3">{listing.community}</h1>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="t-num t-l">{formatPrice(listing.price)}</p>
              <FavoriteButton id={listing.id} title={listing.title} variant="labelled" />
            </div>
            {listing.isDemo ? <DemoBanner className="mt-8" /> : null}

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[1rem] bg-line sm:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-bg p-5">
                  <dt className="t-label text-muted">{k}</dt>
                  <dd className="t-num t-m mt-1">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="t-m mt-12 max-w-[34ch]">{listing.summary}</p>
            <p className="t-body mt-5 max-w-[62ch] text-muted">{listing.description}</p>

            <h2 className="t-label mt-12 text-muted">Features</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {listing.features.map((f) => (
                <li key={f} className="t-label rounded-full bg-surface px-4 py-2.5">
                  {f}
                </li>
              ))}
            </ul>
            {listing.attribution ? <p className="mt-8 text-[0.875rem] text-muted">{listing.attribution}</p> : null}
          </div>

          <aside id="inquire" aria-label="Contact about this home" className="col-span-12 scroll-mt-24 lg:col-span-4 lg:col-start-9">
            <div data-theme="basalt" className="rounded-[1.5rem] p-6 lg:sticky lg:top-24">
              <h2 className="t-m">See it, or ask about it</h2>
              <p className="t-body mt-2 text-muted">Your request comes straight to me.</p>
              <div className="mt-6">
                <InquiryPanel listingId={listing.id} listingTitle={`${listing.title}, ${listing.community}`} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ShowingBar price={formatPrice(listing.price)} />

      <section data-theme="dawn" aria-labelledby="related-title" className="pb-[clamp(6rem,8vw,7rem)] pt-[clamp(4rem,8vw,7rem)]">
        <div className="wrap">
          <h2 id="related-title" className="t-xl">More nearby</h2>
          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((l) => (
              <li key={l.id}>
                <ListingCard listing={l} aspect="aspect-[4/3]" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
