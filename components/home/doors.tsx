"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/site/photo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** A survey plat that subdivides itself as the panel slides in: capital, placed parcel by parcel. */
function Plat({ progress }: { progress: MotionValue<number> }) {
  const draw = useTransform(progress, [0.25, 0.62], [0, 1]);
  const fill = useTransform(progress, [0.5, 0.7], [0, 1]);
  const solid = useTransform(fill, (v) => v * 0.9);
  const lines = ["M40 40H560V400H40Z", "M40 160H560", "M40 280H560", "M213 40V400", "M386 40V400", "M126 160V280", "M300 280V400", "M473 40V160"];
  return (
    <svg viewBox="0 0 600 440" className="h-auto w-full text-accent" fill="none" aria-hidden>
      <defs>
        <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1.2" />
        </pattern>
      </defs>
      <motion.rect x="213" y="160" width="173" height="120" fill="url(#hatch)" style={{ opacity: fill }} />
      <motion.rect x="386" y="280" width="174" height="120" fill="currentColor" style={{ opacity: solid }} />
      {lines.map((d) => (
        <motion.path key={d} d={d} stroke="currentColor" strokeWidth="1.5" style={{ pathLength: draw }} />
      ))}
      <motion.g style={{ opacity: fill }} className="fill-current text-fg" fontFamily="var(--font-archivo)" fontSize="15">
        <text x="226" y="186">Multifamily</text>
        <text x="399" y="306" className="fill-[var(--accent-fg)]">Development</text>
        <text x="54" y="66">Residential</text>
      </motion.g>
    </svg>
  );
}

const PANELS = 3;

export function Doors() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  const pinned = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.04, 0.96], ["0vw", `-${(PANELS - 1) * 100}vw`]);
  const p2 = useTransform(scrollYProgress, [0.2, 0.75], [0, 1]);

  /** Keyboard users tabbing into an off-screen panel get scrolled to it. */
  const focusPanel = (i: number) => {
    const el = ref.current;
    if (!pinned || !el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * (0.04 + (0.92 * i) / (PANELS - 1)), behavior: "instant" });
  };

  return (
    <section ref={ref} aria-labelledby="doors-title" className={cn("relative", pinned ? "h-[340vh]" : "")}>
      <h2 id="doors-title" className="sr-only">
        Three ways to work with Shehmeer
      </h2>
      <div className={cn(pinned && "sticky top-0 h-[100svh] overflow-clip")}>
        <motion.div style={pinned ? { x } : undefined} className={cn("flex", pinned ? "h-full w-[300vw]" : "flex-col")}>
          {/* Homes */}
          <div data-theme="chalk" onFocusCapture={() => focusPanel(0)} className={cn("relative flex", pinned ? "h-full w-screen items-center" : "py-14 md:py-20")}>
            <div className="wrap grid-12 items-center gap-y-10">
              <div className="col-span-12 lg:col-span-5">
                <h3 className="t-card !text-[clamp(3.5rem,12vw,13rem)]">Homes</h3>
                <p className="t-m mt-6 max-w-[26ch]"><span className="font-bold">I sell homes.</span> Find the right one, or sell yours for what it is actually worth.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/homes">
                      Explore homes <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/real-estate#selling">Sell your home</Link>
                  </Button>
                </div>
              </div>
              <div className="relative col-span-12 lg:col-span-6 lg:col-start-7">
                <Photo name="villaPool" className="aspect-[4/3] rounded-[1.25rem]" sizes="(min-width: 900px) 46vw, 100vw" />
                <Photo name="kitchenWhite" className="absolute -bottom-8 -left-6 hidden aspect-[4/5] w-[34%] rounded-[1rem] ring-8 ring-bg sm:block" sizes="16vw" />
              </div>
            </div>
          </div>

          {/* Investing */}
          <div data-theme="night" onFocusCapture={() => focusPanel(1)} className={cn("relative flex", pinned ? "h-full w-screen items-center" : "py-14 md:py-20")}>
            <div className="wrap grid-12 items-center gap-y-10">
              <div className="order-2 col-span-12 lg:order-1 lg:col-span-6">
                <Plat progress={pinned ? p2 : scrollYProgress} />
              </div>
              <div className="order-1 col-span-12 lg:order-2 lg:col-span-5 lg:col-start-8">
                <h3 className="t-card !text-[clamp(3.5rem,9.5vw,10.5rem)]">Investing</h3>
                <p className="t-m mt-6 max-w-[26ch]"><span className="font-bold">I invest in them.</span> Residential, multifamily and development property, chosen with patience.</p>
                <Button asChild variant="accent" size="lg" className="mt-8">
                  <Link href="/invest">
                    Invest with me <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Marketing */}
          <div data-theme="cobalt" onFocusCapture={() => focusPanel(2)} className={cn("relative flex overflow-hidden", pinned ? "h-full w-screen items-center" : "py-14 md:py-20")}>
            <div className="wrap grid-12 items-end gap-y-10">
              <div className="col-span-12 lg:col-span-8">
                <h3 className="t-card !text-[clamp(3.5rem,11vw,12rem)]">Marketing</h3>
                <p className="t-m mt-6 max-w-[28ch]"><span className="font-bold">I market them.</span> I built marketing businesses before I sold homes, and I still do strategy and growth for people building something of their own.</p>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <Photo name="saguaroDusk" className="mb-6 hidden aspect-[4/3] rounded-[1rem] lg:block" sizes="30vw" />
                <Button asChild variant="accent" size="lg">
                  <Link href="/marketing">
                    See what I do <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {pinned ? (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6">
            <div className="wrap text-white mix-blend-difference">
              <div className="t-label flex justify-between">
                <span>Homes</span>
                <span>Investing</span>
                <span>Marketing</span>
              </div>
              <div className="relative mt-2 h-px bg-white/30">
                <motion.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-white" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
