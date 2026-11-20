import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { DraftNote } from "@/components/site/draft-note";
import { Photo } from "@/components/site/photo";

export const metadata: Metadata = {
  title: "What is your home worth? Request a home valuation",
  description: "Request a considered home valuation in Arizona from Shehmeer Kanwar, built from recent comparable sales. No automated estimate and no obligation.",
  alternates: { canonical: "/valuation" },
};

const NEXT_STEPS = [
  { title: "I study the property", body: "Your address, its lot and orientation, and the homes that sold near it recently." },
  { title: "You get a range by email", body: "A considered range, with the comparable sales behind it and what would move it up or down." },
  { title: "We talk only if you want to", body: "If selling makes sense, we discuss timing and preparation. If not, the range is yours to keep." },
];

export default function ValuationPage() {
  return (
    <>
      <section data-theme="bloom" className="pt-24 md:pt-28">
        <div className="wrap grid-12 gap-y-10 pb-[clamp(4rem,8vw,7rem)] lg:gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <h1 className="t-card !text-[clamp(2.9rem,8.5vw,9rem)]">
              <span className="line-mask" style={{ "--i": 0 } as React.CSSProperties}>
                <span>What is</span>
              </span>{" "}
              <span className="line-mask" style={{ "--i": 1 } as React.CSSProperties}>
                <span>your home</span>
              </span>{" "}
              <span className="line-mask" style={{ "--i": 2 } as React.CSSProperties}>
                <span>worth?</span>
              </span>
            </h1>
            <p className="t-m mt-6 max-w-[30ch]">A considered range from recent comparable sales, prepared by me. Not an automated estimate.</p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <div data-theme="chalk" className="rounded-[1.5rem] p-[clamp(1.25rem,3vw,2.5rem)] shadow-[0_30px_60px_-30px_rgba(18,16,14,0.35)]">
              <LeadForm kind="valuation" idPrefix="valuation" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <h2 className="t-label text-muted">What happens next</h2>
            <ol className="mt-3 border-t border-line">
              {NEXT_STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-4">
                  <span className="t-num t-l !text-[1.75rem]">{i + 1}</span>
                  <span>
                    <span className="t-s block">{s.title}</span>
                    <span className="t-body mt-1 block text-muted">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="t-body mt-5 text-muted">Free and with no obligation. Your address is used only to prepare the valuation; see the <Link href="/legal/privacy" className="link-rule text-fg">privacy notice</Link>.</p>
            <DraftNote className="mt-4 text-muted">Add your usual reply time here once you can commit to it.</DraftNote>
          </div>
        </div>
      </section>

      <section data-theme="basalt" aria-labelledby="sell-title" className="py-[clamp(4rem,8vw,7rem)]">
        <div className="wrap grid-12 items-center gap-y-10">
          <Photo name="villaPool" className="col-span-12 aspect-[16/10] rounded-[1.25rem] lg:col-span-6" sizes="(min-width: 1024px) 45vw, 100vw" />
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <h2 id="sell-title" className="t-xl">Thinking about selling?</h2>
            <p className="t-m mt-6 max-w-[28ch]">A listing is a launch. See how I prepare, price and market a home.</p>
            <div className="mt-8 flex flex-col gap-1">
              <Link href="/real-estate#selling" className="t-label inline-flex min-h-11 items-center gap-2">
                <span className="link-draw">How I sell a home</span>
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/resources#seller-preparation-checklist" className="t-label inline-flex min-h-11 items-center gap-2">
                <span className="link-draw">The seller preparation checklist</span>
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
