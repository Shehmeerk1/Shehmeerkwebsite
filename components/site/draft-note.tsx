import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * An editor's margin note: marks draft copy and missing material so nothing
 * unverified is mistaken for fact. Hidden when NEXT_PUBLIC_SHOW_DRAFT_NOTES=false.
 */
export function DraftNote({ children, className }: { children: React.ReactNode; className?: string }) {
  if (!site.showDraftNotes) return null;
  return (
    <p className={cn("flex max-w-md items-baseline gap-2.5 font-serif text-[0.9375rem] italic leading-snug text-fg/80", className)}>
      <span aria-hidden className="inline-block size-2 flex-none translate-y-[-0.1em] rounded-full border border-current" />
      <span>
        <span className="sr-only">Draft note: </span>
        {children}
      </span>
    </p>
  );
}
