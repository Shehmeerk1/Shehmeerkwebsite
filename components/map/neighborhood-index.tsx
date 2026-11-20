"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { communities } from "@/lib/communities";
import { cn } from "@/lib/utils";

/**
 * The Valley as an index. Names on the left, the one-mile survey grid on the
 * right; choosing a name sends a line out from downtown to the place, so the
 * map always answers "how far is that from everything else?".
 */
const W = 720;
const H = 640;
const LON0 = -112.13;
const LON_SPAN = 0.41;
const LAT0 = 33.7;
const LAT_SPAN = 0.43;
const px = (lon: number) => ((lon - LON0) / LON_SPAN) * W;
const py = (lat: number) => ((LAT0 - lat) / LAT_SPAN) * H;
const MILE = (H / LAT_SPAN) * 0.01449;
const CENTER = { x: px(-112.074), y: py(33.4484) };

const ridges = [
  { name: "Camelback", lat: 33.515, lon: -111.962, w: 56, h: 18 },
  { name: "Piestewa Peak", lat: 33.547, lon: -112.021, w: 36, h: 20 },
  { name: "South Mountain", lat: 33.335, lon: -112.06, w: 170, h: 22 },
  { name: "McDowell Mountains", lat: 33.672, lon: -111.815, w: 100, h: 40 },
];

function milesBetween(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const dLat = (a.lat - b.lat) * 69;
  const dLon = (a.lon - b.lon) * 69 * Math.cos((a.lat * Math.PI) / 180);
  return Math.sqrt(dLat * dLat + dLon * dLon);
}

export function NeighborhoodIndex() {
  const [active, setActive] = useState(0);
  const c = communities[active];
  const x = px(c.lon);
  const y = py(c.lat);
  const miles = milesBetween(c, { lat: 33.4484, lon: -112.074 });

  return (
    <div className="grid-12 gap-y-10">
      <ul className="col-span-12 lg:col-span-6" aria-label="Communities">
        {communities.map((n, i) => (
          <li key={n.slug} className="border-b border-line first:border-t">
            <button
              type="button"
              aria-pressed={i === active}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group flex w-full items-baseline justify-between gap-6 py-2.5 text-left"
            >
              <span className={cn("t-l transition-[color,transform] duration-500 ease-[var(--ease-out-expo)]", i === active ? "translate-x-2 text-accent" : "text-fg/45 group-hover:text-fg")}>{n.name}</span>
              <span className={cn("t-label hidden text-muted transition-opacity sm:inline", i === active ? "opacity-100" : "opacity-0")}>{n.city}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="col-span-12 lg:col-span-6 lg:sticky lg:top-24 lg:self-start">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible text-fg" role="img" aria-label={`Map of the Phoenix area. ${c.name} is about ${Math.round(miles)} miles from downtown Phoenix.`}>
          <defs>
            <pattern id="mile" width={MILE} height={MILE} patternUnits="userSpaceOnUse">
              <path d={`M${MILE} 0H0V${MILE}`} fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.18" />
            </pattern>
          </defs>
          <rect width={W} height={H} rx="18" fill="url(#mile)" />
          <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="18" fill="none" stroke="currentColor" opacity="0.25" />
          <path
            d={`M0 ${py(33.413)} C ${px(-112.12)} ${py(33.402)}, ${px(-112.03)} ${py(33.425)}, ${px(-111.95)} ${py(33.432)} S ${px(-111.82)} ${py(33.455)}, ${W} ${py(33.49)}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.5"
          />
          {ridges.map((r) => {
            const cx = px(r.lon);
            const cy = py(r.lat);
            const n = Math.max(5, Math.round(r.w / 8));
            return (
              <g key={r.name} opacity="0.45" stroke="currentColor">
                {Array.from({ length: n }, (_, i) => {
                  const t = i / (n - 1);
                  const lx = cx - r.w / 2 + t * r.w;
                  return <line key={i} x1={lx} y1={cy + 4} x2={lx + 4} y2={cy - Math.sin(t * Math.PI) * r.h} strokeWidth="1" />;
                })}
              </g>
            );
          })}
          {/* The line from downtown to the chosen place, redrawn on each choice. */}
          <line key={`l-${active}`} x1={CENTER.x} y1={CENTER.y} x2={x} y2={y} stroke="var(--accent)" strokeWidth="2" strokeDasharray="1" pathLength={1} strokeDashoffset={1} className="animate-[draw_0.9s_var(--ease-out-quart)_forwards]" />
          <rect x={CENTER.x - 5} y={CENTER.y - 5} width="10" height="10" fill="currentColor" />
          <text x={CENTER.x + 10} y={CENTER.y + 22} className="fill-current text-[14px]" fontFamily="var(--font-archivo)">
            Downtown Phoenix
          </text>
          {communities.map((n, i) => (
            <circle key={n.slug} cx={px(n.lon)} cy={py(n.lat)} r={i === active ? 0 : 4.5} className="fill-current opacity-60" />
          ))}
          <g key={`p-${active}`} transform={`translate(${x} ${y})`}>
            <circle r="9" fill="var(--accent)" />
            <circle r="9" fill="none" stroke="var(--accent)" strokeWidth="2" className="origin-center animate-[pulse-ring_1.8s_ease-out_3] [transform-box:fill-box]" />
            <text x={x > W - 220 ? -16 : 16} y="-14" textAnchor={x > W - 220 ? "end" : "start"} className="fill-current text-[19px] font-semibold" fontFamily="var(--font-archivo)">
              {c.name}
            </text>
          </g>
        </svg>
        <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-6" aria-live="polite">
          <div>
            <p className="t-m">{c.name}</p>
            <p className="t-body mt-2 max-w-md text-muted">{c.note}</p>
          </div>
          <p className="t-num text-right">
            <span className="t-l block">{miles < 1 ? "<1" : Math.round(miles)}</span>
            <span className="t-label text-muted">mi from downtown</span>
          </p>
        </div>
        <Link href={`/homes?q=${encodeURIComponent(c.name)}`} className="t-label mt-5 inline-flex min-h-11 items-center gap-2">
          <span className="link-draw">See homes in {c.name}</span>
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
