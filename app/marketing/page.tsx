import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { ScrollWords } from "@/components/home/scroll-words";
import { Capabilities } from "@/components/marketing/capabilities";
import { KineticTitle } from "@/components/marketing/kinetic-title";
import { DraftNote } from "@/components/site/draft-note";
import { Photo, PhotoNote } from "@/components/site/photo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Marketing and business",
  description: "Shehmeer Kanwar's work in marketing strategy, business growth and entrepreneurship, and how to work together.",
  alternates: { canonical: "/marketing" },
};

/** The kinds of work case studies will cover, once the material is in. */
const IN_PROGRESS = ["Brand launch", "Growth system", "Listing campaign", "Founder content"];

const PROCESS = [
  { name: "Listen", line: "Customers, numbers, the founder. Before any idea." },
  { name: "Position", line: "Pick the audience and the promise. Say no to the rest." },
  { name: "Launch", line: "Ship one channel properly, with a date on it." },
  { name: "Measure", line: "Keep what moved the number. Cut what did not." },
];

export default function MarketingPage() {
  return (
    <>
      <section data-theme="cobalt" className="relative overflow-hidden pt-28">
        <div className="wrap pb-[clamp(3.5rem,7vw,6rem)]">
          <KineticTitle lines={["Attention,", "earned."]} className="t-card !text-[clamp(4.5rem,18vw,20rem)]" />
          <div className="grid-12 mt-10 items-end gap-y-8">
            <p className="t-m fade-late col-span-12 max-w-[32ch] lg:col-span-6" style={{ "--i": 3 } as React.CSSProperties}>
              I built marketing businesses before I sold homes. Now I do both: growth for founders and small teams, and every listing launched like a product.
            </p>
            <div className="fade-late col-span-12 flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end" style={{ "--i": 4 } as React.CSSProperties}>
              <Button asChild variant="accent" size="lg">
                <a href="#collaborate">
                  Work together <ArrowRight aria-hidden />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/real-estate#selling">See how I sell a home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="basalt" aria-labelledby="cap-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <div className="grid-12 mb-12 items-end gap-y-6">
            <h2 id="cap-title" className="t-xl col-span-12 lg:col-span-7">
              What I do
            </h2>
            <p className="t-body col-span-12 max-w-md text-muted lg:col-span-4 lg:col-start-9">Six pieces of one job: getting the right people to notice, trust and choose a business. Most projects need two or three of them, not all six.</p>
          </div>
          <Capabilities />
        </div>
      </section>

      <section data-theme="bloom" aria-labelledby="process-title" className="overflow-hidden py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <h2 id="process-title" className="t-xl max-w-[12ch]">
            How a project runs
          </h2>
          <ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.name} className="border-t-2 border-fg pt-5">
                <span className="t-num t-card !text-[clamp(4rem,8vw,8rem)]">{i + 1}</span>
                <h3 className="t-l mt-4">{p.name}</h3>
                <p className="t-body mt-3 max-w-[26ch] text-muted">{p.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-theme="chalk" aria-labelledby="listing-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap grid-12 items-center gap-y-10">
          <div className="relative col-span-12 lg:col-span-6">
            <Photo name="duskGable" className="aspect-[4/3] rounded-[1.25rem]" sizes="(min-width: 1024px) 45vw, 100vw" />
            <Photo name="livingWide" className="absolute -bottom-8 -right-4 hidden aspect-[4/5] w-[32%] rounded-[1rem] ring-8 ring-bg sm:block" sizes="15vw" />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <h2 id="listing-title" className="t-xl">The same playbook, on a house</h2>
            <p className="t-m mt-6 max-w-[30ch]">A listing has an audience, a story and a launch date. I plan it the way I would plan a product: who buys this home, what would stop them, and what they will remember.</p>
            <Link href="/journal/three-questions-before-you-list" className="t-label mt-8 inline-flex min-h-11 items-center gap-2">
              <span className="link-draw">Read: three questions before you list</span>
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section data-theme="cobalt" aria-label="Principles" className="overflow-hidden py-[clamp(3rem,6vw,5rem)]">
        <ScrollWords top="Know the audience. Tell the truth well." bottom="Do one channel properly. Keep showing up." />
      </section>

      <section data-theme="dawn" aria-labelledby="background-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="background-title" className="t-xl">Where this comes from</h2>
            <PhotoNote shot="Shehmeer with a founder" direction="A working session, whiteboard or laptop between them. Documentary, not staged." className="mt-8" />
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="t-voice">Marketing taught me to study an audience before saying a word to it. Running a business taught me what a late decision costs.</p>
            <p className="t-body mt-6 max-w-[56ch] text-muted">My background is in building marketing businesses, developing growth strategies and working with entrepreneurs. Real estate is part of the same practice, and each side makes the other better.</p>
            <DraftNote className="mt-6 text-muted">Add the specifics: the companies you built, the years, the industries, and what each taught you.</DraftNote>
            <div className="mt-10 border-t border-line pt-6">
              <h3 className="t-label text-muted">Case studies in progress</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {IN_PROGRESS.map((k) => (
                  <li key={k} className="t-label rounded-full border border-dashed border-fg/35 px-4 py-2.5">
                    {k}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.875rem] text-muted">Each will show the client, the problem, what changed and a sourced result. Nothing appears until it is real.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="collaborate" data-theme="basalt" aria-labelledby="collab-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="collab-title" className="t-card !text-[clamp(3.6rem,9vw,9rem)]">
              Build it <span className="text-accent">together.</span>
            </h2>
            <p className="t-m mt-6 max-w-[26ch]">Strategy, a growth problem, a collaboration or a speaking request. Tell me what you are building.</p>
          </div>
          <div className="col-span-12 rounded-[1.5rem] bg-surface p-[clamp(1.25rem,3vw,2.5rem)] lg:col-span-6 lg:col-start-7">
            <LeadForm kind="marketing" idPrefix="marketing" />
          </div>
        </div>
      </section>
    </>
  );
}
