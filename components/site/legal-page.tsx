import { DraftNote } from "./draft-note";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <section data-theme="chalk" className="pt-28">
      <div className="wrap grid-12 pb-[clamp(4.5rem,9vw,8rem)]">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <h1 className="t-xl">{title}</h1>
          <p className="t-label mt-6 text-muted">Last updated {updated}</p>
          <DraftNote className="mt-4 text-muted">Working draft. Have an attorney review this page before the site goes live.</DraftNote>
          <div className="prose-journal mt-12 max-w-[66ch] !text-[1.125rem]">{children}</div>
        </div>
      </div>
    </section>
  );
}
