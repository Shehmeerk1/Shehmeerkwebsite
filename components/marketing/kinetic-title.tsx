"use client";

import { useEffect, useRef } from "react";

/**
 * Letters widen as the pointer passes over them, using Archivo's width axis.
 * Writes styles directly in an animation frame, never through React state.
 * Static for touch, keyboard-only and reduced-motion visitors.
 */
export function KineticTitle({ lines, className }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(hover: hover)").matches) return;
    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-l]"));
    let frame = 0;
    let px = -9999;
    let py = -9999;
    const paint = () => {
      frame = 0;
      for (const l of letters) {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / 260);
        l.style.fontVariationSettings = `"wdth" ${(62 + t * 48).toFixed(1)}`;
      }
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      px = py = -9999;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const host = el.parentElement ?? el;
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <h1 ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={line} aria-hidden className="line-mask whitespace-nowrap" style={{ "--i": i } as React.CSSProperties}>
          <span>
            {[...line].map((ch, j) => (
              <span key={j} data-l className="inline-block transition-[font-variation-settings] duration-300 ease-out [font-variation-settings:'wdth'_62]">
                {ch === " " ? " " : ch}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}
