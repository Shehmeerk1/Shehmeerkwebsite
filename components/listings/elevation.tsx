import type { ElevationStyle } from "@/lib/listings/types";
import { cn } from "@/lib/utils";

/**
 * Sample homes are drawn, never photographed, so a demo record can't be
 * mistaken for a real listing. Each style is a line elevation on a flat
 * ground; `seed` varies the planting and the sun.
 */
const grounds = {
  sand: { bg: "#d9c7b2", ink: "#2b2521", sun: "#f1e6d6" },
  dusk: { bg: "#2b2521", ink: "#e9dfd0", sun: "#d98a52" },
  sage: { bg: "#c4d2cd", ink: "#1f2a28", sun: "#eef3f1" },
} as const;
export type ElevationTone = keyof typeof grounds;
const TONES = Object.keys(grounds) as ElevationTone[];

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

function Building({ style }: { style: ElevationStyle }) {
  switch (style) {
    case "desert-modern":
      return (
        <>
          <path pathLength={1} className="ink" d="M70 196V150H250V132H336V196" />
          <path pathLength={1} className="ink" d="M60 150H262M240 132H348" />
          <path pathLength={1} className="ink" d="M92 196V166H168V196M184 166H232V196M262 150V196M276 146H322V196" />
          <path pathLength={1} className="ink" d="M130 166V196M299 146V196" />
        </>
      );
    case "ranch":
      return (
        <>
          <path pathLength={1} className="ink" d="M58 196V158L200 124 342 158V196" />
          <path pathLength={1} className="ink" d="M44 162 200 118 356 162" />
          <path pathLength={1} className="ink" d="M84 196V170H124V196M150 170H196V190H150ZM226 170H250V196M274 170H318V190H274Z" />
          <path pathLength={1} className="ink" d="M296 118V96H312V123" />
        </>
      );
    case "courtyard":
      return (
        <>
          <path pathLength={1} className="ink" d="M56 196V146H150V196M250 196V138H344V196" />
          <path pathLength={1} className="ink" d="M150 170H250M150 196V170M250 196V170" />
          <path pathLength={1} className="ink" d="M186 196V176Q200 162 214 176V196" />
          <path pathLength={1} className="ink" d="M76 162H130V184H76ZM270 154H324V176H270ZM48 146H158M242 138H352" />
        </>
      );
    case "hillside":
      return (
        <>
          <path pathLength={1} className="ink" d="M40 204 150 176 250 150 360 118" />
          <path pathLength={1} className="ink" d="M96 190V156H214V162M176 156V126H300V146M262 126V98H350V122" />
          <path pathLength={1} className="ink" d="M86 156H224M166 126H310M252 98H360" />
          <path pathLength={1} className="ink" d="M112 166H196V186M192 136H284M276 106H338" />
        </>
      );
    case "townhome":
      return (
        <>
          <path pathLength={1} className="ink" d="M92 196V96H164V84H236V96H308V196" />
          <path pathLength={1} className="ink" d="M164 96V196M236 96V196" />
          <path pathLength={1} className="ink" d="M108 116H148V146H108ZM180 106H220V136H180ZM252 116H292V146H252ZM108 164H148V196M180 160H220V196M252 164H292V196" />
        </>
      );
    case "tower":
      return (
        <>
          <path pathLength={1} className="ink" d="M150 196V54H250V196M250 96H296V196" />
          <path pathLength={1} className="ink" d="M150 78H250M150 102H250M150 126H296M150 150H296M150 174H296" />
          <path pathLength={1} className="ink" d="M183 54V196M216 54V196M273 96V196" />
        </>
      );
  }
}

export function Elevation({ style, seed, tone, className, title }: { style: ElevationStyle; seed: string; tone?: ElevationTone; className?: string; title?: string }) {
  const h = hash(seed);
  const g = grounds[tone ?? TONES[h % TONES.length]];
  const sunX = 60 + (h % 5) * 62;
  const sunY = 44 + ((h >> 3) % 3) * 14;
  const cactusX = 44 + ((h >> 5) % 2) * 10;
  const treeX = 362 - ((h >> 7) % 3) * 6;

  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={cn("elevation h-full w-full", className)} role="img" aria-label={title ?? "Line drawing of a sample home"}>
      <rect width="400" height="260" fill={g.bg} />
      <circle cx={sunX} cy={sunY} r="17" fill={g.sun} />
      <g fill="none" stroke={g.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {/* far ridge */}
        <path d="M0 150Q60 128 120 142T240 132 400 140" opacity="0.35" />
        <Building style={style} />
        {/* ground and its shadow hatching */}
        <path d="M0 196H400" />
        <path d="M20 206H140M170 206H232M262 206H384M48 216H118M198 216H300" opacity="0.45" />
        {/* saguaro */}
        <path d={`M${cactusX} 196V152M${cactusX} 178h-9v-12M${cactusX} 170h8v-10`} />
        {/* palo verde */}
        <path d={`M${treeX} 196V176M${treeX} 180l-10-12M${treeX} 180l11-14M${treeX - 16} 166q16-18 34 0`} opacity="0.8" />
      </g>
    </svg>
  );
}
