import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Route = { href: string; label: string };

const DEFAULT_ROUTES: Route[] = [
  { href: "/contact?topic=buy-sell", label: "Buying a home" },
  { href: "/invest#inquire", label: "Investing in Arizona real estate" },
  { href: "/contact?topic=marketing", label: "Marketing and business" },
];

/**
 * The one closing scene on a page: dusk, one primary action, and a few
 * quieter routes. The primary action defaults to the home valuation, the
 * site's main conversion. Pages that already end on a form skip this.
 */
export function CloseCta({
  title = "What is your home worth?",
  lede = "Tell me about the property and I will reply with a considered range from recent comparable sales. No automated estimate.",
  primary = { href: "/valuation", label: "Request a valuation" },
  routes = DEFAULT_ROUTES,
}: {
  title?: string;
  lede?: string;
  primary?: Route;
  routes?: Route[];
}) {
  return (
    <section data-theme="ember" aria-labelledby="close-title" className="relative overflow-hidden py-[clamp(4.5rem,10vw,9rem)]">
      <div className="wrap grid-12 items-end gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="close-title" className={title.length > 16 ? "t-xl" : "t-card"}>
            {title}
          </h2>
          <p className="t-m mt-6 max-w-[30ch]">{lede}</p>
          <Button asChild size="lg" className="mt-8">
            <Link href={primary.href}>
              {primary.label} <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <p className="t-label text-muted">Or start with</p>
          <ul className="mt-3">
            {routes.map((r) => (
              <li key={r.href} className="border-b border-line first:border-t">
                <Link href={r.href} className="group flex min-h-16 items-center justify-between gap-6 py-2">
                  <span className="t-s transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">{r.label}</span>
                  <ArrowUpRight className="size-5 flex-none transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
