import type { Metadata } from "next";
import { photos } from "@/lib/photos";

export const metadata: Metadata = { title: "Photo credits", alternates: { canonical: "/credits" } };

export default function CreditsPage() {
  return (
    <section data-theme="chalk" className="pt-28">
      <div className="wrap grid-12 pb-[clamp(4.5rem,9vw,8rem)]">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <h1 className="t-xl">Photo credits</h1>
          <p className="t-m mt-6 max-w-[40ch] text-muted">
            These photographs stand in until Shehmeer&rsquo;s own photography replaces them. Property photos on sample listings show other buildings and rooms, not the listed homes.
          </p>
          <ul className="mt-12 border-t border-line">
            {Object.values(photos).map((p) => (
              <li key={p.src} className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[1fr_16rem] sm:gap-8">
                <span>{p.alt}</span>
                <a href={p.source} target="_blank" rel="noopener noreferrer" className="text-muted">
                  <span className="link-rule">{p.credit}</span>, {p.license}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
