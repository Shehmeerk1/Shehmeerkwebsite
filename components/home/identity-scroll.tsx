"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { PhotoNote } from "@/components/site/photo";
import { photos, type PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

const lines: { say: string; more: string; photo: PhotoKey }[] = [
  {
    say: "I sell homes.",
    more: "Buying or selling, you get one person who answers the phone, knows the street and tells you the truth about the price.",
    photo: "villaPool",
  },
  {
    say: "I invest in them.",
    more: "I own real estate myself, so I look at a house the way an owner does: what it costs to hold, what can go wrong, what it is worth in ten years.",
    photo: "taliesinGarden",
  },
  {
    say: "I market them.",
    more: "I come from building marketing businesses. Every listing gets a strategy, a story and a launch plan, the way a product would.",
    photo: "saguaroDusk",
  },
];

function Line({ say, more, index, onActive }: { say: string; more: string; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const reduce = useReducedMotion();
  const on = reduce || inView;
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <div ref={ref} className="flex flex-col justify-center py-10 md:min-h-[72svh]">
      {/* Waiting lines stay above 3:1, so they can still be read ahead. */}
      <p className={cn("t-xl transition-[color,transform] duration-700 ease-[var(--ease-out-expo)]", on ? "text-fg" : "translate-x-[-0.06em] text-fg/55")}>{say}</p>
      <p className="t-body mt-6 max-w-[38ch] text-muted">{more}</p>
    </div>
  );
}

/**
 * Who he is, in three plain sentences. The held picture changes with each
 * one; a note marks where Shehmeer's own portrait will go.
 */
export function IdentityScroll() {
  const [active, setActive] = useState(0);
  return (
    <section data-theme="chalk" aria-labelledby="who-title" className="relative">
      <h2 id="who-title" className="sr-only">
        Who Shehmeer is
      </h2>
      <div className="wrap grid-12">
        <div className="col-span-12 hidden md:col-span-5 md:block">
          <div className="sticky top-0 flex h-[100svh] items-center">
            <div className="relative aspect-[4/5] max-h-[78svh] w-full overflow-hidden rounded-[1.25rem] bg-surface">
              {lines.map((l, i) => (
                <Image
                  key={l.photo}
                  src={photos[l.photo].src}
                  alt={i === active ? photos[l.photo].alt : ""}
                  fill
                  sizes="40vw"
                  className={cn("object-cover transition-[opacity,transform] duration-1000 ease-[var(--ease-out-expo)]", i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0")}
                />
              ))}
              <PhotoNote onPhoto shot="Shehmeer at work" direction="Candid, mid-conversation at a showing. Natural light." className="absolute bottom-4 left-4 right-4" />
            </div>
          </div>
        </div>
        <div className="col-span-12 pt-[clamp(3rem,6vw,5rem)] md:col-span-6 md:col-start-7 md:pt-0">
          {lines.map((l, i) => (
            <Line key={l.say} say={l.say} more={l.more} index={i} onActive={setActive} />
          ))}
          <p className="t-voice max-w-[22ch] pb-[clamp(3.5rem,9vw,8rem)] pt-4">Three jobs that turn out to be one: helping people decide well about where they live and what they own.</p>
        </div>
      </div>
    </section>
  );
}
