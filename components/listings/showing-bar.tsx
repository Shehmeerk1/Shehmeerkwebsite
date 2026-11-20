"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Phones: the showing request one tap away. Steps aside while the inquiry
 * form itself or the footer (with its legal text) is on screen.
 */
export function ShowingBar({ price }: { price: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const targets = [document.getElementById("inquire"), document.querySelector("footer")].filter((el): el is HTMLElement => Boolean(el));
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return (
    <div
      aria-hidden={hidden}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-300 md:hidden",
        hidden ? "translate-y-4 opacity-0" : "opacity-100",
      )}
    >
      <a
        href="#inquire"
        tabIndex={hidden ? -1 : undefined}
        className={cn("t-label flex min-h-14 items-center justify-between rounded-full bg-[#0f0e0c]/90 pl-5 pr-2 text-[#f3f0ea] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md", !hidden && "pointer-events-auto")}
      >
        <span className="t-num">{price}</span>
        <span className="rounded-full bg-[#ff6b3d] px-5 py-3 text-[#0f0e0c]">Request a showing</span>
      </a>
    </div>
  );
}
