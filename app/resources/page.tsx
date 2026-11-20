import type { Metadata } from "next";
import { ResourceCover } from "@/components/resources/cover";
import { ResourceGate } from "@/components/resources/resource-gate";
import { CloseCta } from "@/components/site/close-cta";
import { DraftNote } from "@/components/site/draft-note";
import { resources } from "@/lib/resources";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free guides and checklists",
  description: "Free guides and checklists from Shehmeer Kanwar: the Arizona homebuyer guide, a seller preparation checklist, a real estate investing starter guide and a marketing worksheet.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const anyDraft = resources.some((r) => !r.finalContent);
  return (
    <>
      <section data-theme="bloom" className="overflow-hidden pt-28">
        <div className="wrap grid-12 items-end gap-y-10 pb-[clamp(3rem,6vw,5rem)]">
          <h1 className="t-card col-span-12 !text-[clamp(4rem,14vw,15rem)] lg:col-span-7">
            <span className="line-mask" style={{ "--i": 0 } as React.CSSProperties}>
              <span>Free</span>
            </span>
            <span className="line-mask" style={{ "--i": 1 } as React.CSSProperties}>
              <span>guides.</span>
            </span>
          </h1>
          <ul aria-hidden className="col-span-12 flex items-end justify-center gap-3 lg:col-span-5">
            {resources.map((r, i) => (
              <li key={r.slug} className={cn("fade-late w-1/4", i % 2 ? "-translate-y-6 rotate-2" : "-rotate-2")} style={{ "--i": i + 2 } as React.CSSProperties}>
                <ResourceCover resource={r} />
              </li>
            ))}
          </ul>
          <p className="t-m col-span-12 max-w-[34ch] lg:col-span-6">Four short documents for the decisions people ask me about most. Leave your name and email and the download opens straight away.</p>
          {anyDraft ? <DraftNote className="col-span-12 text-muted lg:col-span-5 lg:col-start-8">The downloads are placeholder PDFs marked as drafts. The sign-up, tagging and download flow is real; swap in the finished files in content/resources/files.</DraftNote> : null}
        </div>
      </section>

      {resources.map((r, i) => (
        <section key={r.slug} id={r.slug} data-theme={i % 2 ? "dawn" : "chalk"} aria-labelledby={`${r.slug}-t`} className="scroll-mt-20 py-[clamp(4rem,8vw,7rem)]">
          <div className="wrap grid-12 items-start gap-y-10">
            <div className="col-span-7 sm:col-span-4 lg:col-span-3">
              <ResourceCover resource={r} className="transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-rotate-1 hover:scale-[1.02]" />
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-5">
              <h2 id={`${r.slug}-t`} className="t-l">
                {r.title}
              </h2>
              <p className="t-body mt-4 text-muted">{r.summary}</p>
              <h3 className="t-label mt-8 text-muted">Inside</h3>
              <ul className="mt-3 border-t border-line">
                {r.contents.map((c) => (
                  <li key={c} className="border-b border-line py-3">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <ResourceGate slug={r.slug} title={r.title} kind={r.kind} />
            </div>
          </div>
        </section>
      ))}
      <CloseCta />
    </>
  );
}
