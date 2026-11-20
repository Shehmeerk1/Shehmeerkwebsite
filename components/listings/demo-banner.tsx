import Link from "next/link";
import { cn } from "@/lib/utils";

/** Shown wherever sample listings appear. Disappears once the provider is live (isDemo false). */
export function DemoBanner({ className }: { className?: string }) {
  return (
    <aside className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[1rem] bg-[#f2d33b] px-5 py-4 text-[0.9375rem] leading-snug text-[#12100e]", className)}>
      <p className="flex-1 basis-72">
        <strong className="font-semibold">Demonstration search.</strong> These homes are samples and not for sale. The photographs are licensed stand-ins of other properties. Live MLS listings replace them once an IDX provider is connected.
      </p>
      <Link href="/contact?topic=buy-sell" className="t-label inline-flex min-h-11 items-center rounded-full bg-[#12100e] px-4 text-[#f2d33b]">
        Ask for current listings
      </Link>
    </aside>
  );
}
