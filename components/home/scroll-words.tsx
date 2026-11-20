"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Two lines of type that slide in opposite directions as the section passes.
 * Driven by scroll, so it stops when the reader stops: no autoplay to pause.
 */
export function ScrollWords({ top, bottom, className }: { top: string; bottom: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["4%", "-28%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-30%", "2%"]);
  const row = "t-card whitespace-nowrap !text-[clamp(4rem,13vw,14rem)] will-change-transform";
  return (
    <div ref={ref} aria-hidden className={cn("overflow-hidden", className)}>
      <motion.p style={reduce ? undefined : { x: a }} className={row}>
        {`${top} `.repeat(3)}
      </motion.p>
      <motion.p style={reduce ? undefined : { x: b }} className={cn(row, "text-accent")}>
        {`${bottom} `.repeat(3)}
      </motion.p>
    </div>
  );
}
