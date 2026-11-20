import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SavedList } from "@/components/listings/saved-list";

export const metadata: Metadata = { title: "Saved homes", robots: { index: false } };

export default function SavedPage() {
  return (
    <section data-theme="chalk" className="pt-24">
      <div className="wrap min-h-[70dvh] pb-[clamp(4rem,8vw,7rem)]">
        <Link href="/homes" className="t-label inline-flex min-h-11 items-center gap-2 text-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden />
          <span className="link-draw">All homes</span>
        </Link>
        <h1 className="t-card mb-12 mt-4 !text-[clamp(3.6rem,11vw,12rem)]">Saved</h1>
        <SavedList />
      </div>
    </section>
  );
}
