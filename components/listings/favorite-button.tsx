"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/hooks/use-favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({ id, title, variant = "icon", className }: { id: string; title: string; variant?: "icon" | "labelled"; className?: string }) {
  const { ids, toggle } = useFavorites();
  const saved = ids.includes(id);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={variant === "icon" ? `${saved ? "Remove" : "Save"} ${title}` : undefined}
      onClick={(e) => {
        e.preventDefault();
        toggle(id);
      }}
      className={cn(
        "t-label inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 rounded-full transition-[background-color,color,transform] duration-200 active:scale-90",
        variant === "icon" ? "bg-white/90 text-[#12100e] backdrop-blur-sm hover:bg-white" : "border border-fg/30 px-5 hover:border-fg",
        className,
      )}
    >
      <Heart className={cn("size-[1.125rem] transition-[fill,stroke,transform] duration-300", saved && "scale-110 fill-[#ff6b3d] stroke-[#ff6b3d]")} strokeWidth={1.6} aria-hidden />
      {variant === "labelled" ? <span>{saved ? "Saved" : "Save this home"}</span> : null}
    </button>
  );
}

export function SavedCount() {
  const { ids } = useFavorites();
  return <span className="t-num">{ids.length}</span>;
}
