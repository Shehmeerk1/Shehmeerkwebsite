"use client";

import { useId, useMemo, useState } from "react";
import { formatClock, sunAt } from "@/lib/sun";
import { cn } from "@/lib/utils";

/**
 * Which way should the back yard face? An Arizona question with a real answer.
 * Uses the actual solar position over Phoenix for the chosen month and hour,
 * then shows where the sun is and where the house throws its shade.
 */
const MONTHS = [
  { label: "January", day: 15 },
  { label: "April", day: 105 },
  { label: "July", day: 196 },
  { label: "October", day: 288 },
] as const;
const FACINGS = [
  { label: "North", deg: 0 },
  { label: "East", deg: 90 },
  { label: "South", deg: 180 },
  { label: "West", deg: 270 },
] as const;
const COMPASS = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];
const compass = (az: number) => COMPASS[Math.round(az / 45) % 8];

const S = 400; // svg size
const C = S / 2;
const HOUSE = 92; // half-size of the house square

function angleDiff(a: number, b: number) {
  const d = Math.abs(((a - b + 540) % 360) - 180);
  return d;
}

export function SunOrientation() {
  const uid = useId();
  const [month, setMonth] = useState(2);
  const [minute, setMinute] = useState(17 * 60);
  const [facing, setFacing] = useState(3);

  const { elevation, azimuth } = useMemo(() => sunAt(MONTHS[month].day, minute), [month, minute]);
  const yardDeg = FACINGS[facing].deg;
  const up = elevation > 0;
  const diff = angleDiff(azimuth, yardDeg);
  const verdict = !up
    ? "The sun is down. The yard is cooling off."
    : diff < 70
      ? `A ${FACINGS[facing].label.toLowerCase()}-facing yard is in direct sun.`
      : diff < 110
        ? `A ${FACINGS[facing].label.toLowerCase()}-facing yard gets raking side light.`
        : elevation < 40
          ? `The house shades a ${FACINGS[facing].label.toLowerCase()}-facing yard.`
          : `The sun is high enough to reach most of a ${FACINGS[facing].label.toLowerCase()}-facing yard anyway.`;

  // SVG geometry: north is up. Sun sits on a ring; nearer the centre means higher in the sky.
  const toXY = (az: number, r: number) => ({ x: C + r * Math.sin((az * Math.PI) / 180), y: C - r * Math.cos((az * Math.PI) / 180) });
  const ringR = 180 - Math.max(0, elevation) * 1.5;
  const sun = toXY(azimuth, ringR);
  const shadowLen = up ? Math.min(170, 26 / Math.tan((Math.max(elevation, 3) * Math.PI) / 180)) : 0;
  const away = (azimuth + 180) % 360;
  const dx = shadowLen * Math.sin((away * Math.PI) / 180);
  const dy = -shadowLen * Math.cos((away * Math.PI) / 180);
  const corners = [
    [C - HOUSE / 2, C - HOUSE / 2],
    [C + HOUSE / 2, C - HOUSE / 2],
    [C + HOUSE / 2, C + HOUSE / 2],
    [C - HOUSE / 2, C + HOUSE / 2],
  ];
  // Shadow: the convex hull of the house and its translated copy (simple, good enough at this scale).
  const pts = [...corners, ...corners.map(([x, y]) => [x + dx, y + dy])];
  const hull = (() => {
    const p = pts.toSorted((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower: number[][] = [];
    for (const q of p) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
      lower.push(q);
    }
    const upper: number[][] = [];
    for (const q of p.toReversed()) {
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
      upper.push(q);
    }
    return [...lower.slice(0, -1), ...upper.slice(0, -1)].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  })();
  const yard = toXY(yardDeg, HOUSE / 2 + 44);
  const yardW = yardDeg % 180 === 0 ? HOUSE + 40 : 70;
  const yardH = yardDeg % 180 === 0 ? 70 : HOUSE + 40;
  const yardLit = up && diff < 110;

  return (
    <div className="grid-12 items-center gap-y-10">
      <div className="col-span-12 lg:col-span-6">
        <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto h-auto w-full max-w-[34rem]" role="img" aria-label={`Plan view. In ${MONTHS[month].label} at ${formatClock(minute)}, the sun is ${Math.max(0, Math.round(elevation))} degrees high in the ${compass(azimuth)}. ${verdict}`}>
          <circle cx={C} cy={C} r="180" fill="none" stroke="currentColor" opacity="0.18" />
          <circle cx={C} cy={C} r="120" fill="none" stroke="currentColor" opacity="0.1" strokeDasharray="2 6" />
          {["N", "E", "S", "W"].map((l, i) => {
            const p = toXY(i * 90, 194);
            return (
              <text key={l} x={p.x} y={p.y + 5} textAnchor="middle" className="fill-current text-[14px] font-semibold" fontFamily="var(--font-archivo)">
                {l}
              </text>
            );
          })}
          <rect x={yard.x - yardW / 2} y={yard.y - yardH / 2} width={yardW} height={yardH} rx="6" className={cn("transition-[fill] duration-500", yardLit ? "fill-[#f2d33b]" : "fill-current opacity-15")} />
          {up ? <polygon points={hull} fill="#000" opacity="0.32" className="transition-all duration-300" /> : null}
          <rect x={C - HOUSE / 2} y={C - HOUSE / 2} width={HOUSE} height={HOUSE} rx="4" className="fill-current" />
          <text x={yard.x} y={yard.y + 5} textAnchor="middle" className="fill-[#12100e] text-[13px] font-semibold" fontFamily="var(--font-archivo)" opacity={yardLit ? 1 : 0}>
            Yard
          </text>
          {up ? (
            <g>
              <line x1={C} y1={C} x2={sun.x} y2={sun.y} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 5" />
              <circle cx={sun.x} cy={sun.y} r="22" fill="var(--accent)" opacity="0.25" />
              <circle cx={sun.x} cy={sun.y} r="13" fill="var(--accent)" />
            </g>
          ) : null}
        </svg>
      </div>

      <div className="col-span-12 lg:col-span-5 lg:col-start-8">
        <p className="t-m" aria-live="polite">
          {MONTHS[month].label}, {formatClock(minute)}. {up ? `The sun is ${Math.round(elevation)}° high in the ${compass(azimuth)}.` : "The sun is below the horizon."}
        </p>
        <p className="t-body mt-3 text-muted">{verdict}</p>

        <fieldset className="mt-8">
          <legend className="t-label text-muted">Month</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {MONTHS.map((m, i) => (
              <label key={m.label} className={cn("t-label inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent", i === month ? "border-fg bg-fg text-bg" : "border-fg/30 hover:border-fg")}>
                <input type="radio" name={`${uid}-month`} className="sr-only" checked={i === month} onChange={() => setMonth(i)} />
                {m.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="t-label text-muted">The yard faces</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {FACINGS.map((f, i) => (
              <label key={f.label} className={cn("t-label inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent", i === facing ? "border-fg bg-fg text-bg" : "border-fg/30 hover:border-fg")}>
                <input type="radio" name={`${uid}-facing`} className="sr-only" checked={i === facing} onChange={() => setFacing(i)} />
                {f.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <label htmlFor={`${uid}-time`} className="t-label flex justify-between text-muted">
            <span>Time of day</span>
            <span className="t-num text-fg">{formatClock(minute)}</span>
          </label>
          <input
            id={`${uid}-time`}
            type="range"
            min={5 * 60}
            max={20 * 60}
            step={15}
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            className="mt-3 h-11 w-full cursor-pointer accent-[var(--accent)]"
          />
        </div>
        <p className="mt-6 text-[0.875rem] text-muted">Computed from the sun&rsquo;s real position over Phoenix. Trees, walls and neighbours change the picture; we check them on the tour.</p>
      </div>
    </div>
  );
}
