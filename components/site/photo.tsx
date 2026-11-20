import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

/** A framed photograph. The frame owns the aspect ratio; the image fills it. */
export function Photo({ name, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority = false, grain = false, imgClassName }: { name: PhotoKey; className?: string; sizes?: string; priority?: boolean; grain?: boolean; imgClassName?: string }) {
  const p = photos[name];
  return (
    <div className={cn("photo-zoom relative overflow-hidden bg-surface", grain && "grain", className)}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
    </div>
  );
}

/**
 * A reserved frame for a photograph of Shehmeer that has not been taken yet.
 * It shows the frame, crop marks and the art direction for the shot. It never
 * shows a face, drawn or generated.
 */
export function PortraitSlot({ shot, direction, className, tone = "dark" }: { shot: string; direction?: string; className?: string; tone?: "dark" | "light" }) {
  return (
    <figure
      role="img"
      aria-label={`Reserved for a photograph: ${shot}`}
      className={cn(
        "relative isolate flex flex-col justify-between overflow-hidden p-[clamp(1rem,2vw,1.5rem)]",
        tone === "dark" ? "bg-[#26221e] text-[#efe9df]" : "bg-[#e3dcd2] text-[#1b1714]",
        className,
      )}
    >
      {/* A soft warm light, as if the subject stood in golden hour. */}
      <div aria-hidden className={cn("absolute inset-0 -z-10", tone === "dark" ? "bg-[radial-gradient(120%_80%_at_70%_20%,rgba(255,150,90,0.28),transparent_60%)]" : "bg-[radial-gradient(120%_80%_at_70%_20%,rgba(255,170,120,0.35),transparent_60%)]")} />
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 -z-10 h-full w-full opacity-25">
        <line x1="33.3" y1="0" x2="33.3" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="66.6" y1="0" x2="66.6" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="33.3" x2="100" y2="33.3" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="66.6" x2="100" y2="66.6" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>
      {(["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"] as const).map((c) => (
        <span key={c} aria-hidden className={cn("absolute size-5 border-current opacity-70", c)} />
      ))}
      <span className="t-label relative opacity-75">Photograph to come</span>
      <figcaption className="relative">
        <span className="t-s block max-w-[18ch]">{shot}</span>
        {direction ? <span className="mt-1.5 block max-w-[30ch] text-[0.8125rem] leading-snug opacity-70">{direction}</span> : null}
      </figcaption>
    </figure>
  );
}

/** Kept for older call sites. */
export function ReservedFrame({ label, sub, className }: { label: string; sub?: string; className?: string }) {
  return <PortraitSlot shot={label} direction={sub} className={className} tone="light" />;
}
export const PortraitPlaceholder = ({ label, className }: { label: string; className?: string }) => <PortraitSlot shot={label} className={className} tone="light" />;
