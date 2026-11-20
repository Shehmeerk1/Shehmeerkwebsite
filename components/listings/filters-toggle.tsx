"use client";

import { useId, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/** On phones the filters fold away so results start on the first screen. Always open from md up. */
export function FiltersToggle({ active, children }: { active: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="t-label flex min-h-12 w-full items-center justify-between gap-3 md:hidden"
      >
        <span className="inline-flex items-center gap-2.5">
          <SlidersHorizontal className="size-4" aria-hidden /> Filters
          {active ? <span className="rounded-full bg-accent px-2 py-0.5 text-accent-fg">{active}</span> : null}
        </span>
        <span className="text-muted">{open ? "Hide" : "Show"}</span>
      </button>
      <div id={id} className={cn(open ? "mt-4 block" : "hidden", "md:mt-0 md:block")}>
        {children}
      </div>
    </div>
  );
}
