"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A survey plat of one block, divided three ways. Each parcel is a kind of
 * investment; choosing one lights it and explains it. The lines draw on load.
 */
const PARCELS = [
  { id: "residential", label: "Residential", d: "M40 40H300V250H40Z", text: "Single homes and small properties bought to hold or improve. I help define the criteria, find candidates and represent the purchase." },
  { id: "multifamily", label: "Multifamily", d: "M300 40H560V250H300Z", text: "Buildings with several units. The conversation is about the property, its operations and the people who will run it." },
  { id: "development", label: "Development", d: "M40 250H560V400H40Z", text: "Land and ground-up projects, for investors comfortable with a longer timeline and more moving parts." },
] as const;

export function CapitalPlat() {
  const [on, setOn] = useState<number>(0);
  return (
    <div className="grid-12 items-center gap-y-8">
      <div className="col-span-12 lg:col-span-7">
        <svg viewBox="0 0 600 440" className="h-auto w-full text-fg" role="img" aria-label="A block divided into three parcels: residential, multifamily and development.">
          <defs>
            <pattern id="plat-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="9" stroke="var(--accent)" strokeWidth="1.3" />
            </pattern>
          </defs>
          {PARCELS.map((p, i) => (
            <path key={p.id} d={p.d} className="transition-[fill-opacity] duration-500" fill="url(#plat-hatch)" fillOpacity={i === on ? 1 : 0} />
          ))}
          {/* Lot lines inside each parcel: the subdivision a plat actually shows. */}
          <g stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none">
            <path d="M105 40V250M170 40V250M235 40V250M40 145H300" />
            <path d="M300 110H560M300 180H560M430 40V250" />
            <path d="M170 250V400M300 250V400M430 250V400" strokeDasharray="4 6" />
          </g>
          {PARCELS.map((p) => (
            <path key={p.id} d={p.d} stroke="currentColor" strokeWidth="2" fill="none" pathLength={1} strokeDasharray="1" strokeDashoffset="1" className="animate-[draw_1.8s_var(--ease-out-quart)_0.5s_forwards]" />
          ))}
          <path d="M20 420H580" stroke="var(--accent)" strokeWidth="2" />
          <text x="20" y="436" className="fill-current text-[12px]" fontFamily="var(--font-archivo)" opacity="0.7">
            Street frontage
          </text>
        </svg>
      </div>
      <div className="col-span-12 lg:col-span-4 lg:col-start-9">
        <ul className="border-t border-line">
          {PARCELS.map((p, i) => (
            <li key={p.id} className="border-b border-line">
              <button type="button" aria-expanded={i === on} onClick={() => setOn(i)} onPointerEnter={() => setOn(i)} onFocus={() => setOn(i)} className="w-full py-5 text-left">
                <span className={cn("t-l block transition-colors duration-300", i === on ? "text-accent" : "text-fg/40")}>{p.label}</span>
                <span className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]", i === on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <span className="t-body overflow-hidden pt-3 text-muted">{p.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
