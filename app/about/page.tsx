import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TimelineLine } from "@/components/about/timeline-line";
import { CloseCta } from "@/components/site/close-cta";
import { DraftNote } from "@/components/site/draft-note";
import { Photo, PortraitSlot } from "@/components/site/photo";
import type { PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Shehmeer Kanwar",
  description: "Shehmeer Kanwar is an Arizona-based real estate professional, entrepreneur, investor and marketing strategist.",
  alternates: { canonical: "/about" },
};

const chapters: { id: string; title: string; body: string; prompt: string; href: string; link: string; photo?: PhotoKey; shot?: string }[] = [
  {
    id: "entrepreneurship",
    title: "Entrepreneurship",
    body: "I build businesses of my own. Starting one is the fastest education I know: every decision is yours, and so is every result.",
    prompt: "The origin story. What was the first thing you built, and what did it teach you?",
    href: "/marketing",
    link: "Marketing and business",
    shot: "Shehmeer, early days",
  },
  {
    id: "marketing",
    title: "Marketing",
    body: "Marketing is where I learned to listen before speaking. I built marketing businesses and worked with entrepreneurs on how they grow.",
    prompt: "Name the businesses and the work you are proudest of. A specific client story belongs here.",
    href: "/marketing",
    link: "See the marketing work",
    shot: "Shehmeer with a team",
  },
  {
    id: "real-estate",
    title: "Real estate",
    body: "Real estate is now the centre of my work. I help people buy and sell homes in Arizona, and I bring a marketer's eye to every listing.",
    prompt: "Why real estate, and why Arizona? Add when you were licensed and your brokerage, once verified.",
    href: "/real-estate",
    link: "Real estate services",
    photo: "camelback",
  },
  {
    id: "investing",
    title: "Investing",
    body: "I invest in real estate as well as selling it, which keeps me honest about what makes a property worth owning.",
    prompt: "How you started investing and what you look for. No figures unless you can source them.",
    href: "/invest",
    link: "Invest with me",
    photo: "taliesinGarden",
  },
];

const offClock = [
  { shot: "Family, at home in Arizona", direction: "Relaxed, unposed, real light." },
  { shot: "A desert morning", direction: "A trail, a coffee, the hour before work." },
  { shot: "Where the work happens", direction: "Desk, car, notebook: the honest version." },
];

export default function AboutPage() {
  return (
    <>
      <section data-theme="dawn" className="relative overflow-hidden pt-28">
        <div className="wrap relative pb-[clamp(3rem,6vw,5rem)]">
          <h1 className="t-card relative z-10 !text-[clamp(4.2rem,17vw,19rem)]">
            <span className="line-mask" style={{ "--i": 0 } as React.CSSProperties}>
              <span>Shehmeer</span>
            </span>
            <span className="line-mask text-right" style={{ "--i": 1 } as React.CSSProperties}>
              <span>Kanwar</span>
            </span>
          </h1>
          <div className="fade-late relative z-0 mx-auto mt-6 w-[min(78vw,26rem)] sm:-mt-[clamp(6rem,11vw,12rem)]" style={{ "--i": 3 } as React.CSSProperties}>
            <PortraitSlot shot="Portrait of Shehmeer" direction="The lead portrait. Head and shoulders, eyes to camera, warm natural light, a plain wall." tone="light" className="aspect-[3/4] rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(26,18,16,0.55)]" />
          </div>
          <div className="grid-12 mt-12 gap-y-6">
            <p className="t-voice col-span-12 lg:col-span-6 lg:col-start-4">
              I am an Arizona-based real estate professional, entrepreneur, investor and marketer. This is the story so far, with room left for the parts still being written.
            </p>
            <DraftNote className="col-span-12 text-muted lg:col-span-6 lg:col-start-4">This page is a frame for your own words. Each chapter has a short draft and a prompt; replace both with the real story.</DraftNote>
          </div>
        </div>
      </section>

      <section data-theme="chalk" aria-label="Chapters" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <TimelineLine>
            {chapters.map((c, i) => (
              <article key={c.id} id={c.id} aria-labelledby={`${c.id}-t`} className="relative grid gap-8 pb-[clamp(4rem,8vw,7rem)] pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
                <span aria-hidden className="absolute left-[0.6rem] top-4 size-3.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-bg md:left-1/2" />
                <div className={cn("md:pr-10", i % 2 ? "md:order-2 md:pl-10 md:pr-0" : "md:text-right")}>
                  <h2 id={`${c.id}-t`} className="t-xl hyphens-auto !text-[clamp(2.4rem,5vw,5.5rem)]" lang="en">
                    {c.title}
                  </h2>
                  <p className={cn("t-m mt-5 max-w-[30ch]", i % 2 ? "" : "md:ml-auto")}>{c.body}</p>
                  <DraftNote className={cn("mt-5 text-muted", i % 2 ? "" : "md:ml-auto md:flex-row-reverse md:text-right")}>{c.prompt}</DraftNote>
                  <Link href={c.href} className="t-label mt-6 inline-flex min-h-11 items-center gap-2">
                    <span className="link-draw">{c.link}</span>
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </div>
                <div className={cn(i % 2 ? "md:order-1 md:pr-10" : "md:pl-10")}>
                  {c.photo ? <Photo name={c.photo} className="aspect-[4/3] rounded-[1.25rem]" sizes="(min-width: 768px) 40vw, 100vw" /> : <PortraitSlot shot={c.shot ?? c.title} tone="light" className="aspect-[4/3] rounded-[1.25rem]" />}
                </div>
              </article>
            ))}
          </TimelineLine>
        </div>
      </section>

      <section data-theme="basalt" aria-labelledby="offclock-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-6">
            <h2 id="offclock-title" className="t-xl col-span-12 lg:col-span-7">
              Off the clock
            </h2>
            <p className="t-body col-span-12 max-w-md text-muted lg:col-span-4 lg:col-start-9">The person behind the work. Three frames reserved for real photographs, each with its brief.</p>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {offClock.map((o, i) => (
              <li key={o.shot} className={cn(i === 1 && "md:translate-y-16")}>
                <PortraitSlot shot={o.shot} direction={o.direction} className="aspect-[4/5] rounded-[1.25rem]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-theme="dawn" aria-labelledby="milestones-title" className="pb-[clamp(4.5rem,9vw,8rem)] pt-[clamp(6rem,12vw,11rem)]">
        <div className="wrap grid-12 gap-y-10">
          <h2 id="milestones-title" className="t-xl col-span-12 lg:col-span-5">
            Milestones
          </h2>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="t-m">A dated list of what has actually happened: businesses started, licences earned, notable sales, things worth being proud of.</p>
            <ul className="mt-8 border-t border-line" aria-label="Milestones, to be added">
              {[0, 1, 2].map((n) => (
                <li key={n} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-5 text-muted">
                  <span className="t-label">Year</span>
                  <span className="font-serif text-xl italic">Milestone to be added</span>
                </li>
              ))}
            </ul>
            <DraftNote className="mt-6 text-muted">Nothing is listed until it is real. Credentials, awards and testimonials are added only with your confirmation.</DraftNote>
          </div>
        </div>
      </section>

      <CloseCta />
    </>
  );
}
