import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Doors } from "@/components/home/doors";
import { HeroCinema } from "@/components/home/hero-cinema";
import { HomeRail } from "@/components/home/home-rail";
import { PostCard } from "@/components/journal/post-card";
import { DemoBanner } from "@/components/listings/demo-banner";
import { NeighborhoodIndex } from "@/components/map/neighborhood-index";
import { ResourceCover } from "@/components/resources/cover";
import { CloseCta } from "@/components/site/close-cta";
import { DraftNote } from "@/components/site/draft-note";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/journal";
import { getListingsProvider } from "@/lib/listings";
import { resources } from "@/lib/resources";


export default async function HomePage() {
  const provider = getListingsProvider();
  const [{ listings }, posts] = await Promise.all([provider.search({ sort: "price-desc" }), getPosts()]);
  const [lead, ...rest] = posts.slice(0, 3);

  return (
    <>
      <HeroCinema />
      <Doors />

      {/* Homes */}
      <section data-theme="chalk" aria-labelledby="rail-title" className="pb-[clamp(4.5rem,9vw,8rem)] pt-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap grid-12 items-end gap-y-6">
          <h2 id="rail-title" className="t-xl col-span-12 lg:col-span-7">
            Homes worth a second look
          </h2>
          <p className="t-body col-span-12 max-w-md text-muted lg:col-span-4 lg:col-start-9">A rotating shortlist across the Valley. Save the ones you like; they wait for you in this browser.</p>
          {provider.isDemo ? <DemoBanner className="col-span-12 mt-4" /> : null}
        </div>
        <div className="mt-10">
          <HomeRail listings={listings} />
        </div>
      </section>

      {/* Communities */}
      <section data-theme="dawn" aria-labelledby="valley-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <div className="grid-12 mb-[clamp(2.5rem,5vw,4.5rem)] items-end gap-y-6">
            <h2 id="valley-title" className="t-xl col-span-12 lg:col-span-8">
              Nine places, one grid
            </h2>
            <p className="t-body col-span-12 max-w-md text-muted lg:col-span-4">Phoenix was surveyed into one-mile squares before most of it was built. Pick a place to see where it sits, and how far it is from everything else.</p>
          </div>
          <NeighborhoodIndex />
        </div>
      </section>

      {/* Journal */}
      <section data-theme="basalt" aria-labelledby="journal-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="journal-title" className="t-xl">
              From the journal
            </h2>
            <Link href="/journal" className="t-label inline-flex min-h-11 items-center gap-2">
              <span className="link-draw">Read the journal</span>
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
          <DraftNote className="mt-5 text-muted">Sample drafts, written to show how the journal works. Replace them with your own.</DraftNote>
          <div className="grid-12 mt-10 gap-y-14">
            {lead ? <PostCard post={lead} large className="col-span-12 lg:col-span-7" /> : null}
            <div className="col-span-12 hidden gap-12 sm:grid sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} aspect="aspect-[16/9]" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section data-theme="bloom" aria-labelledby="guides-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="guides-title" className="t-xl">
              Free guides
            </h2>
            <p className="t-body mt-5 max-w-sm text-muted">Short, plain documents for the decisions people ask me about most. Leave your name and email and the download opens straight away.</p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/resources">
                Browse the guides <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
          <ul className="col-span-12 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
            {resources.map((r, i) => (
              <li key={r.slug} className={i % 2 ? "sm:translate-y-10" : ""}>
                <Link href={`/resources#${r.slug}`} className="group block transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2">
                  <ResourceCover resource={r} />
                  <span className="sr-only">{r.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CloseCta />
    </>
  );
}
