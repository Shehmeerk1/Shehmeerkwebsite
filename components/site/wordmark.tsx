import Link from "next/link";
import { cn } from "@/lib/utils";

/** SK monogram plus the name. The monogram is two strokes: S as a path, K as a cut. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-8", className)}>
      <rect width="40" height="40" rx="20" fill="currentColor" />
      <path d="M17.5 13.4c-1.2-1.2-2.8-1.7-4.4-1.6-2.3.2-3.9 1.8-3.8 3.7.1 4.4 8.6 3.1 8.5 7.9 0 2.1-1.9 3.9-4.4 4-1.9.1-3.6-.7-4.7-2"
        fill="none" stroke="var(--mono-ink, #0f0e0c)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 11.8v16.4M22 21.5l7.6-9.7M24.9 18l5.3 10.2" fill="none" stroke="var(--mono-ink, #0f0e0c)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Shehmeer Kanwar, home" className={cn("group inline-flex min-h-11 items-center gap-2.5", className)}>
      <Monogram className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[-12deg]" />
      <span className="hidden text-[0.9375rem] font-semibold tracking-[-0.01em] [font-variation-settings:'wdth'_90] min-[400px]:inline">Shehmeer Kanwar</span>
    </Link>
  );
}
