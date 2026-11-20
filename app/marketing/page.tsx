import type { Metadata } from "next";
import { Play } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { ScrollWords } from "@/components/home/scroll-words";
import { Capabilities } from "@/components/marketing/capabilities";
import { KineticTitle } from "@/components/marketing/kinetic-title";
import { DraftNote } from "@/components/site/draft-note";
import { PortraitSlot } from "@/components/site/photo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Marketing and business",
  description: "Shehmeer Kanwar's work in marketing strategy, business growth and entrepreneurship, and how to work together.",
  alternates: { canonical: "/marketing" },
};

/** Reserved slots for real case studies: each states the kind of work it will hold. */
const WORK = [
  { kind: "Brand launch", brief: "A company introduced to its market: name, story, first campaign.", theme: "bloom", span: "lg:col-span-7", aspect: "aspect-[16/11]" },
  { kind: "Growth system", brief: "Lead generation rebuilt around one channel, measured week by week.", theme: "basalt", span: "lg:col-span-5 lg:mt-28", aspect: "aspect-[4/5]" },
  { kind: "Listing campaign", brief: "A home launched like a product: audience, story, release plan.", theme: "ember", span: "lg:col-span-5", aspect: "aspect-[4/5]" },
  { kind: "Founder content", brief: "A personal brand built from the founder's real work and voice.", theme: "dawn", span: "lg:col-span-7 lg:-mt-24", aspect: "aspect-[16/11]" },
];

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
        <div className="wrap pb-10">
          <KineticTitle lines={["Attention,", "earned."]} className="t-card !text-[clamp(4.5rem,18vw,20rem)]" />
          <div className="grid-12 mt-10 items-end gap-y-6">
            <p className="t-m fade-late col-span-12 max-w-[30ch] lg:col-span-6" style={{ "--i": 3 } as React.CSSProperties}>
              Alongside real estate, I build marketing and growth for businesses and the people who start them. This is that side of the work.
            </p>
            <p className="t-label fade-late col-span-12 text-muted lg:col-span-4 lg:col-start-9 lg:text-right" style={{ "--i": 4 } as React.CSSProperties}>
              Strategy, brand, content and growth, for founders and small teams.
            </p>
          </div>
        </div>
        {/* Showreel slot: a real reel plays here once it exists. */}
        <div className="wrap pb-[clamp(4rem,8vw,7rem)]">
          <figure role="img" aria-label="Reserved for a showreel" className="grain relative isolate flex aspect-[16/9] items-end overflow-hidden rounded-[1.5rem] bg-[#0f0e0c] p-[clamp(1rem,3vw,2.5rem)] text-[#f3f0ea]">
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_80%_at_75%_30%,rgba(37,55,238,0.55),transparent_60%),radial-gradient(60%_70%_at_20%_80%,rgba(255,107,61,0.35),transparent_60%)]" />
            <span aria-hidden className="absolute left-1/2 top-1/2 flex size-[clamp(5rem,9vw,8rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40">
              <Play className="size-8 translate-x-0.5 opacity-80" />
            </span>
            <figcaption className="flex w-full flex-wrap items-end justify-between gap-4">
              <span className="t-l">Showreel</span>
              <span className="t-label opacity-75">Reserved for a 60-second reel of real work</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section data-theme="chalk" aria-labelledby="work-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-6">
            <h2 id="work-title" className="t-xl col-span-12 lg:col-span-7">
              Selected work
            </h2>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="t-body text-muted">Case studies are being written. Each frame below is reserved for one: the client, the problem, what changed and the result, with its source.</p>
              <DraftNote className="mt-4 text-muted">Send the material for each project and these fill in. Nothing is shown here until it is real.</DraftNote>
            </div>
          </div>
          <ul className="grid-12 mt-14 gap-y-10">
            {WORK.map((w) => (
              <li key={w.kind} className={cn("col-span-12", w.span)}>
                <div data-theme={w.theme} className={cn("group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] p-[clamp(1.25rem,3vw,2.5rem)]", w.aspect)}>
                  <span className="t-label text-muted">Case study to come</span>
                  <span className="t-card !text-[clamp(3rem,7vw,7.5rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">{w.kind}</span>
                </div>
                <p className="t-body mt-4 max-w-md text-muted">{w.brief}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-theme="basalt" aria-labelledby="cap-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <h2 id="cap-title" className="t-xl mb-12">
            What I do
          </h2>
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

      <section data-theme="cobalt" aria-label="Principles" className="overflow-hidden py-[clamp(3rem,6vw,5rem)]">
        <ScrollWords top="Know the audience. Tell the truth well." bottom="Do one channel properly. Keep showing up." />
      </section>

      <section data-theme="dawn" aria-labelledby="background-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap grid-12 items-center gap-y-10">
          <PortraitSlot shot="Shehmeer with a founder" direction="Working session, whiteboard or laptop between them. Documentary, not staged." tone="light" className="col-span-12 aspect-[4/5] rounded-[1.25rem] sm:col-span-8 lg:col-span-5" />
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <h2 id="background-title" className="t-xl">Where this comes from</h2>
            <p className="t-voice mt-8">Marketing taught me to study an audience before saying a word to it. Running a business taught me what a late decision costs.</p>
            <p className="t-body mt-6 max-w-[56ch] text-muted">My background is in building marketing businesses, developing growth strategies and working with entrepreneurs. Real estate is part of the same practice, and each side makes the other better.</p>
            <DraftNote className="mt-6 text-muted">Add the specifics: the companies you built, the years, the industries, and what each taught you.</DraftNote>
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
