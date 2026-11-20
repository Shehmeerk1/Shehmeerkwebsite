import type { Resource } from "@/lib/resources";
import { cn } from "@/lib/utils";

/** Each free guide gets a designed cover in its own hour, so the library reads like a shelf. */
const LOOK: Record<string, { theme: string; motif: "sun" | "house" | "grid" | "arrow" }> = {
  "arizona-homebuyer-guide": { theme: "basalt", motif: "sun" },
  "seller-preparation-checklist": { theme: "ember", motif: "house" },
  "real-estate-investing-starter-guide": { theme: "night", motif: "grid" },
  "marketing-foundations-worksheet": { theme: "cobalt", motif: "arrow" },
};

function Motif({ kind }: { kind: "sun" | "house" | "grid" | "arrow" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 120 80" className="draw-on-hover h-auto w-[55%] text-accent" aria-hidden>
      {kind === "sun" ? (
        <>
          <path className="ink" pathLength={1} d="M6 70H114" {...common} />
          <path className="ink" pathLength={1} d="M30 70a30 30 0 0 1 60 0" {...common} />
          <path className="ink" pathLength={1} d="M60 22V10M28 36l-8-8M92 36l8-8" {...common} />
        </>
      ) : kind === "house" ? (
        <>
          <path className="ink" pathLength={1} d="M10 70H110M26 70V38L60 14l34 24v32" {...common} />
          <path className="ink" pathLength={1} d="M50 70V50h20v20" {...common} />
        </>
      ) : kind === "grid" ? (
        <path className="ink" pathLength={1} d="M10 10H110V70H10ZM10 30H110M10 50H110M43 10V70M77 10V70" {...common} />
      ) : (
        <path className="ink" pathLength={1} d="M8 68 40 40l18 14 50-44M84 10h24v24" {...common} />
      )}
    </svg>
  );
}

export function ResourceCover({ resource, className }: { resource: Resource; className?: string }) {
  const look = LOOK[resource.slug] ?? { theme: "basalt", motif: "sun" as const };
  return (
    <div data-theme={look.theme} className={cn("relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[0.5rem] p-[8%] shadow-[0_24px_40px_-24px_rgba(0,0,0,0.55)] [container-type:inline-size]", className)}>
      <div aria-hidden className="absolute inset-y-0 left-0 w-[6%] bg-black/15" />
      <p className="relative text-[clamp(7px,5.6cqw,13px)] font-medium leading-tight text-muted">
        {resource.kind}, {resource.topic.toLowerCase()}
      </p>
      <Motif kind={look.motif} />
      <div className="relative">
        <p className="font-sans text-[11cqw] font-extrabold uppercase leading-[0.9] [font-variation-settings:'wdth'_66]">{resource.title.replace(/^The /, "")}</p>
        <p className="mt-[5cqw] text-[clamp(7px,5.6cqw,13px)] font-medium text-muted">Shehmeer Kanwar</p>
      </div>
    </div>
  );
}
