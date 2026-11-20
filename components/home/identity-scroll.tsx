"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { PortraitSlot } from "@/components/site/photo";
import { cn } from "@/lib/utils";

const lines = [
  {
    say: "I sell homes.",
    more: "Buying or selling, you get one person who answers the phone, knows the street and tells you the truth about the price.",
  },
  {
    say: "I invest in them.",
    more: "I own real estate myself, so I look at a house the way an owner does: what it costs to hold, what can go wrong, what it is worth in ten years.",
  },
  {
    say: "I market them.",
    more: "I come from building marketing businesses. Every listing gets a strategy, a story and a launch plan, the way a product would.",
  },
];

function Line({ say, more }: { say: string; more: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const reduce = useReducedMotion();
  const on = reduce || inView;
  return (
    <div ref={ref} className="flex min-h-[62svh] flex-col justify-center py-10 md:min-h-[78svh]">
      <p className={cn("t-xl transition-[color,transform] duration-700 ease-[var(--ease-out-expo)]", on ? "text-fg" : "translate-x-[-0.06em] text-fg/15")}>{say}</p>
      <p className={cn("t-body mt-6 max-w-[38ch] text-muted transition-opacity duration-700", on ? "opacity-100" : "opacity-30")}>{more}</p>
    </div>
  );
}

/** The person first: a held portrait while three plain sentences pass it. */
export function IdentityScroll() {
  return (
    <section data-theme="chalk" aria-labelledby="who-title" className="relative">
      <h2 id="who-title" className="sr-only">
        Who Shehmeer is
      </h2>
      <div className="wrap grid-12">
        <div className="col-span-12 pt-[clamp(4rem,8vw,7rem)] md:col-span-5 md:pt-0">
          <div className="md:sticky md:top-0 md:flex md:h-[100svh] md:items-center">
            <PortraitSlot
              shot="Shehmeer at work"
              direction="Candid, mid-conversation at a showing or over plans. Natural light, 35mm, not posed."
              tone="light"
              className="aspect-[4/5] w-full rounded-[1.25rem] md:max-h-[78svh]"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          {lines.map((l) => (
            <Line key={l.say} {...l} />
          ))}
          <p className="t-voice max-w-[22ch] pb-[clamp(4rem,10vw,9rem)]">Three jobs that turn out to be one: helping people decide well about where they live and what they own.</p>
        </div>
      </div>
    </section>
  );
}
