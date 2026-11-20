"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";

/** A vertical rule that draws itself down the chapters as you read them. */
export function TimelineLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-0 left-[0.6rem] top-0 w-px bg-line md:left-1/2">
        <motion.div style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }} className="absolute inset-0 origin-top bg-accent" />
      </div>
      {children}
    </div>
  );
}
