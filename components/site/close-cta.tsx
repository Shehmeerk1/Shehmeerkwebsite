import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const routes = [
  { href: "/contact?topic=buy-sell", label: "Buying or selling a home" },
  { href: "/invest#inquire", label: "Investing in Arizona real estate" },
  { href: "/contact?topic=marketing", label: "Marketing and business" },
];

/** The closing scene on most pages: dusk, one question, three doors. */
export function CloseCta({ title = "Let's talk." }: { title?: string }) {
  return (
    <section data-theme="ember" aria-labelledby="close-title" className="relative overflow-hidden py-[clamp(4.5rem,10vw,9rem)]">
      <div className="wrap grid-12 items-end gap-y-12">
        <h2 id="close-title" className={title.length > 14 ? "t-xl col-span-12 lg:col-span-6" : "t-card col-span-12 lg:col-span-7"}>
          {title}
        </h2>
        <ul className="col-span-12 lg:col-span-5 lg:col-start-8">
          {routes.map((r) => (
            <li key={r.href} className="border-b border-line first:border-t">
              <Link href={r.href} className="group flex min-h-[4.75rem] items-center justify-between gap-6 py-3">
                <span className="t-m transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">{r.label}</span>
                <span className="flex size-12 flex-none items-center justify-center rounded-full bg-fg text-bg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
