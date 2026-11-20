"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PhotoNote } from "@/components/site/photo";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/photos";
import { formatClock, phoenixMinuteNow, sunDay } from "@/lib/sun";

/** What the light is doing in Phoenix right now, in one line. Computed, never invented. */
function useLightReadout() {
  const [line, setLine] = useState<{ time: string; light: string } | null>(null);
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const day = sunDay(now);
      const m = phoenixMinuteNow(now);
      const toSet = Math.round(day.sunset - m);
      const toRise = Math.round((day.sunrise - m + 1440) % 1440);
      const light =
        m < day.sunrise
          ? `Sunrise at ${formatClock(day.sunrise)}`
          : toSet > 75
            ? `Sunset at ${formatClock(day.sunset)}`
            : toSet > 0
              ? `Golden hour. Sunset in ${toSet} min`
              : `Sun set at ${formatClock(day.sunset)}. Next light in ${Math.floor(toRise / 60)}h ${toRise % 60}m`;
      setLine({ time: formatClock(m), light });
    };
    update();
    const t = window.setInterval(update, 30_000);
    return () => window.clearInterval(t);
  }, []);
  return line;
}

export function HeroCinema() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const dim = useTransform(scrollYProgress, [0.15, 0.95], [0, 0.85]);
  const readout = useLightReadout();

  return (
    <section ref={ref} data-theme="basalt" aria-labelledby="hero-name" className="relative isolate h-[100svh] min-h-[620px] overflow-hidden">
      {/* The picture: graded, grained, settling into place as the letterbox opens. */}
      <motion.div style={reduce ? undefined : { y: photoY }} className="grain absolute inset-0 -z-20">
        <Image
          src={photos.saguaroSunset.src}
          alt={photos.saguaroSunset.alt}
          fill
          priority
          sizes="100vw"
          className="animate-[settle_2.8s_var(--ease-out-expo)_both] object-cover object-[50%_40%]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#0f0e0c_4%,rgba(15,14,12,0.75)_32%,rgba(15,14,12,0.05)_62%),linear-gradient(to_right,rgba(15,14,12,0.55),transparent_55%)]" />
      <motion.div aria-hidden style={reduce ? undefined : { opacity: dim }} className="pointer-events-none absolute inset-0 z-20 bg-basalt opacity-0" />

      {/* Letterbox: the bars close the frame to a cinema ratio on load. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[50%] origin-top animate-[letterbox-top_1.6s_var(--ease-in-out-cine)_0.1s_both] bg-basalt" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[50%] origin-bottom animate-[letterbox-top_1.6s_var(--ease-in-out-cine)_0.1s_both] bg-basalt" />

      <div className="wrap relative z-10 flex h-full flex-col pb-[clamp(4.5rem,9svh,6.5rem)] pt-[clamp(5.5rem,13svh,8rem)]">
        <div className="flex items-start justify-between gap-8">
          <div className="fade-late max-w-[34rem]" style={{ "--i": 6 } as React.CSSProperties}>
            <p className="t-m">I help people buy, sell and invest in Arizona real estate, and I market every home like a launch.</p>
            <div className="mt-7 hidden flex-wrap gap-3 md:flex">
              <Button asChild variant="accent" size="lg">
                <Link href="/homes">
                  Explore homes <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="backdrop-blur-sm">
                <Link href="/invest">Invest with me</Link>
              </Button>
            </div>
            <Link href="/real-estate#valuation" className="t-label mt-5 hidden min-h-11 items-center gap-2 text-fg md:inline-flex">
              <span className="link-draw">Selling? Find out what your home is worth</span>
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <p className="fade-late t-label t-num hidden min-w-[13rem] text-right text-fg/85 sm:block" style={{ "--i": 7 } as React.CSSProperties} aria-live="off">
            {readout ? (
              <>
                <span className="block text-fg">{readout.time} in Phoenix</span>
                <span className="block text-fg/70">{readout.light}</span>
              </>
            ) : (
              <span className="block">Phoenix, Arizona</span>
            )}
          </p>
        </div>

        <div className="mt-auto flex flex-col-reverse items-stretch gap-6 md:flex-row md:items-end md:justify-between">
          <motion.h1 id="hero-name" style={reduce ? undefined : { y: nameY }} className="t-card">
            <span className="line-mask" style={{ "--i": 2 } as React.CSSProperties}>
              <span>Shehmeer</span>
            </span>{" "}
            <span className="line-mask" style={{ "--i": 3 } as React.CSSProperties}>
              <span>
                Kanwar<span className="text-accent">.</span>
              </span>
            </span>
          </motion.h1>
          <div className="fade-late hidden flex-none self-end md:block" style={{ "--i": 5 } as React.CSSProperties}>
            <PhotoNote onPhoto shot="Shehmeer, golden hour" direction="Waist-up, facing the light, desert behind." />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row md:hidden">
          <Button asChild variant="accent" size="lg">
            <Link href="/homes">
              Explore homes <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/invest">Invest with me</Link>
          </Button>
          <Link href="/real-estate#valuation" className="t-label inline-flex min-h-11 items-center justify-center gap-2">
            <span className="link-draw">Selling? Get a home valuation</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
