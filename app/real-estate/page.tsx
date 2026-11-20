import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { NeighborhoodIndex } from "@/components/map/neighborhood-index";
import { SunOrientation } from "@/components/real-estate/sun-orientation";
import { CloseCta } from "@/components/site/close-cta";
import { DraftNote } from "@/components/site/draft-note";
import { Photo } from "@/components/site/photo";
import { Steps } from "@/components/site/steps";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Real estate in Arizona: buying, selling and luxury homes",
  description: "Buy or sell a home in Arizona with Shehmeer Kanwar. Buyer and seller representation, luxury property, investment homes and a home valuation request.",
  alternates: { canonical: "/real-estate" },
};

const jump = [
  ["#buying", "Buying"],
  ["#selling", "Selling"],
  ["#luxury", "Luxury"],
  ["#investment", "Investment"],
  ["#market", "The desert, read"],
  ["#communities", "Communities"],
  ["#valuation", "Home valuation"],
] as const;

const buying = [
  { title: "A first conversation", body: "What you need from a home, where, by when, and what you are comfortable spending." },
  { title: "Search and tours", body: "A short list built around your criteria, walked in person with the map open." },
  { title: "Offer", body: "Price and terms set from comparable sales, then negotiated on your behalf." },
  { title: "Inspection period", body: "Inspections, disclosures and repairs worked through while you can still walk away." },
  { title: "Closing", body: "Lender, title and walkthrough lined up so the keys arrive on the day planned." },
];
const selling = [
  { title: "Walkthrough and price", body: "A room-by-room visit and a range drawn from recent comparable sales." },
  { title: "Preparation", body: "A short list of what to fix, clear or leave alone, in order of return." },
  { title: "Launch", body: "Photographs, copy and a release plan written for the likely buyer." },
  { title: "Showings and offers", body: "Feedback after every showing; each offer explained line by line." },
  { title: "Closing", body: "Inspection, appraisal and title handled through to handover." },
];

/** Service chapters stack like cards as you scroll: each pins, the next slides over it. */
function Chapter({ id, theme, index, children }: { id: string; theme: string; index: number; children: React.ReactNode }) {
  return (
    <section id={id} data-theme={theme} aria-labelledby={`${id}-title`} className="sticky min-h-[100svh] rounded-t-[2rem] shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.35)] max-md:static max-md:rounded-none max-md:shadow-none [@media(max-height:740px)]:static" style={{ top: `${index * 1.25}rem` }}>
      <div className="wrap flex min-h-[100svh] flex-col justify-center py-[clamp(3rem,6vw,5rem)]">{children}</div>
    </section>
  );
}

export default function RealEstatePage() {
  return (
    <>
      <section data-theme="chalk" className="pt-28">
        <div className="wrap grid-12 items-end gap-y-10 pb-12">
          <h1 className="t-card col-span-12 !text-[clamp(3.6rem,11.5vw,13rem)] lg:col-span-8">
            <span className="line-mask" style={{ "--i": 0 } as React.CSSProperties}>
              <span>Arizona</span>
            </span>
            <span className="line-mask" style={{ "--i": 1 } as React.CSSProperties}>
              <span>homes,</span>
            </span>
            <span className="line-mask" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="text-accent">handled.</span>
            </span>
          </h1>
          <div className="fade-late col-span-12 lg:col-span-4" style={{ "--i": 3 } as React.CSSProperties}>
            <Photo name="interiorView" priority className="aspect-[4/5] rounded-[1.25rem]" sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
          <p className="t-m fade-late col-span-12 max-w-[34ch] lg:col-span-6" style={{ "--i": 4 } as React.CSSProperties}>
            I represent buyers and sellers across the Valley, from first homes to significant estates, and I help investors buy homes as assets.
          </p>
          <nav aria-label="On this page" className="fade-late col-span-12 lg:col-span-6" style={{ "--i": 5 } as React.CSSProperties}>
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {jump.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="t-label inline-flex min-h-11 items-center rounded-full border border-fg/25 px-4 transition-colors hover:border-fg hover:bg-fg hover:text-bg">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="relative">
        <Chapter id="buying" theme="chalk" index={0}>
          <div className="grid-12 gap-y-10 border-t border-line pt-10">
            <div className="col-span-12 lg:col-span-5">
              <h2 id="buying-title" className="t-xl">Buying</h2>
              <p className="t-m mt-6 max-w-[26ch]">You should understand every step before you take it.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/homes">
                    Explore homes <ArrowRight aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact?topic=buy-sell">Talk about buying</Link>
                </Button>
              </div>
            </div>
            <Steps items={buying} className="col-span-12 lg:col-span-6 lg:col-start-7" />
          </div>
        </Chapter>

        <Chapter id="selling" theme="ember" index={1}>
          <div className="grid-12 gap-y-10">
            <div className="col-span-12 lg:col-span-5">
              <h2 id="selling-title" className="t-xl">Selling</h2>
              <p className="t-m mt-6 max-w-[26ch]">A listing is a launch. It gets the attention a launch deserves.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#valuation">Request a valuation</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/resources#seller-preparation-checklist">Get the seller checklist</Link>
                </Button>
              </div>
            </div>
            <Steps items={selling} className="col-span-12 lg:col-span-6 lg:col-start-7" />
          </div>
        </Chapter>

        <Chapter id="luxury" theme="basalt" index={2}>
          <div className="grid-12 items-end gap-y-10">
            <div className="relative col-span-12 lg:col-span-7">
              <Photo name="taliesinPool" grain className="aspect-[4/3] rounded-[1.25rem]" sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <h2 id="luxury-title" className="t-xl">Luxury</h2>
              <p className="t-m mt-6">Fewer showings, better prepared. Presentation that matches the house. Discretion when you ask for it.</p>
              <Button asChild variant="accent" size="lg" className="mt-8">
                <Link href="/contact?topic=buy-sell">Arrange a private conversation</Link>
              </Button>
            </div>
          </div>
        </Chapter>

        <Chapter id="investment" theme="night" index={3}>
          <div className="grid-12 items-center gap-y-10">
            <h2 id="investment-title" className="t-card col-span-12 !text-[clamp(3.5rem,10vw,11rem)] lg:col-span-7">
              Investment property
            </h2>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="t-m">Buying a home to hold is a different purchase from buying one to live in. Investors get their own page, their own questions and a direct line.</p>
              <Button asChild variant="accent" size="lg" className="mt-8">
                <Link href="/invest">
                  Invest with me <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </Chapter>
      </div>

      <section id="market" data-theme="basalt" aria-labelledby="market-title" className="relative z-10 py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <div className="grid-12 mb-12 items-end gap-y-6">
            <h2 id="market-title" className="t-xl col-span-12 lg:col-span-8">
              The desert, read closely
            </h2>
            <p className="t-body col-span-12 max-w-md text-muted lg:col-span-4">In Phoenix, which way a yard faces decides how you live in it from May to September. Move the sun and see for yourself.</p>
          </div>
          <SunOrientation />
          <dl className="mt-[clamp(3rem,6vw,5rem)] grid gap-px overflow-hidden rounded-[1rem] bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Orientation and shade", "Which way a house faces decides how its rooms and patio live in July."],
              ["The lot and its water", "Flood-irrigated lots, desert landscaping and pools each carry different upkeep."],
              ["Community rules", "Many planned communities have associations. Read the documents before the offer."],
              ["The season", "Winter visitors change how the market moves, and so when to list or look."],
            ].map(([t, d]) => (
              <div key={t} className="bg-bg p-6">
                <dt className="t-s">{t}</dt>
                <dd className="t-body mt-2 text-muted">{d}</dd>
              </div>
            ))}
          </dl>
          <DraftNote className="mt-6 text-muted">Add current market figures here once you have a dated source: median price, days on market, inventory.</DraftNote>
        </div>
      </section>

      <section id="communities" data-theme="dawn" aria-labelledby="communities-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <h2 id="communities-title" className="t-xl mb-[clamp(2.5rem,5vw,4.5rem)] max-w-[12ch]">
            Featured communities
          </h2>
          <NeighborhoodIndex />
        </div>
      </section>

      <section id="valuation" data-theme="bloom" aria-labelledby="valuation-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="valuation-title" className="t-xl">What is your home worth?</h2>
            <p className="t-m mt-6 max-w-[28ch]">Tell me about the property. I will study recent comparable sales and reply with a considered range, not an automated guess.</p>
          </div>
          <div className={cn("col-span-12 lg:col-span-6 lg:col-start-7")}>
            <LeadForm kind="valuation" idPrefix="valuation" />
          </div>
        </div>
      </section>

      <CloseCta />
    </>
  );
}
