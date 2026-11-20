import Image from "next/image";
import { Camera } from "lucide-react";
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
 * A compact note where a photograph of Shehmeer will go. It names the shot
 * and its brief (see docs/SHOT-LIST.md) without giving an empty frame prime
 * space. Never a face, drawn or generated. `onPhoto` styles it to sit over a
 * photograph.
 */
export function PhotoNote({ shot, direction, className, onPhoto = false }: { shot: string; direction?: string; className?: string; onPhoto?: boolean }) {
  return (
    <aside
      aria-label={`Photograph to come: ${shot}`}
      className={cn(
        "flex max-w-[22rem] items-start gap-3 rounded-[0.875rem] p-3 text-left",
        onPhoto ? "bg-[#0f0e0c]/70 text-[#f3f0ea] backdrop-blur-md" : "border border-dashed border-fg/30 text-fg",
        className,
      )}
    >
      <span aria-hidden className={cn("relative flex h-12 w-9 flex-none items-center justify-center rounded-[0.35rem]", onPhoto ? "bg-white/10" : "bg-fg/[0.06]")}>
        <Camera className="size-4 opacity-70" strokeWidth={1.6} />
        <span className="absolute left-1 top-1 size-1.5 border-l border-t border-current opacity-60" />
        <span className="absolute bottom-1 right-1 size-1.5 border-b border-r border-current opacity-60" />
      </span>
      <span className="min-w-0">
        <span className={cn("block text-[0.75rem] font-medium leading-tight", onPhoto ? "text-white/70" : "text-muted")}>Photo to come</span>
        <span className="mt-0.5 block text-[0.9375rem] font-semibold leading-snug">{shot}</span>
        {direction ? <span className={cn("mt-1 block text-[0.8125rem] leading-snug", onPhoto ? "text-white/70" : "text-muted")}>{direction}</span> : null}
      </span>
    </aside>
  );
}
