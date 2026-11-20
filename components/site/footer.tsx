import Link from "next/link";
import { fullNav, site } from "@/lib/site";
import { DraftNote } from "./draft-note";

function EqualHousingMark() {
  return (
    <svg viewBox="0 0 48 44" className="h-9 w-auto flex-none" role="img" aria-label="Equal Housing Opportunity">
      <path d="M24 2 2 18v4h4v20h36V22h4v-4L24 2Zm12 34H12V17.5L24 9l12 8.5V36Z" fill="currentColor" />
      <path d="M17 21h14v4H17zM17 28h14v4H17z" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const { brokerage, contact, social } = site;
  return (
    <footer data-theme="basalt" className="relative overflow-hidden">
      <div className="wrap pt-[clamp(3rem,6vw,5rem)]">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="t-l">Shehmeer Kanwar</p>
            <p className="t-body mt-4 max-w-sm text-muted">Real estate, investment and marketing in {site.region}.</p>
          </div>
          <nav aria-label="Footer" className="col-span-6 lg:col-span-3">
            <ul>
              {fullNav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-[1.0625rem]">
                    <span className="link-draw">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-6 lg:col-span-3">
            <ul className="text-[1.0625rem]">
              {contact.email ? (
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center">
                    <span className="link-draw">{contact.email}</span>
                  </a>
                </li>
              ) : null}
              {contact.phone ? (
                <li>
                  <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="inline-flex min-h-11 items-center">
                    <span className="link-draw">{contact.phone}</span>
                  </a>
                </li>
              ) : null}
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="noopener noreferrer" target="_blank" className="inline-flex min-h-11 items-center">
                    <span className="link-draw">{s.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href="/homes/saved" className="inline-flex min-h-11 items-center">
                  <span className="link-draw">Saved homes</span>
                </Link>
              </li>
            </ul>
            {!contact.email && !contact.phone ? <DraftNote className="mt-4 text-muted">Email, phone and social links appear here once added to lib/site.ts.</DraftNote> : null}
          </div>
        </div>

        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid-12 gap-y-8 border-t border-line pt-8 text-[0.875rem] leading-relaxed text-muted">
          <div className="col-span-12 flex gap-4 lg:col-span-6">
            <EqualHousingMark />
            <p className="max-w-xl">Shehmeer Kanwar supports the Fair Housing Act and equal opportunity in housing. Homes are shown and services are offered without regard to race, color, religion, sex, disability, familial status or national origin.</p>
          </div>
          <div className="col-span-12 lg:col-span-6">
            {brokerage.name ? (
              <p>
                {site.name}, licensed real estate salesperson in Arizona{brokerage.licenseNumber ? `, license ${brokerage.licenseNumber}` : ""}. Brokered by {brokerage.name}
                {brokerage.officeAddress ? `, ${brokerage.officeAddress}` : ""}.
              </p>
            ) : (
              <DraftNote className="!max-w-xl text-muted">Brokerage name, license number and office address go here. Arizona requires the employing broker to be identified in real estate advertising; confirm the wording with your broker.</DraftNote>
            )}
            <p className="mt-3">Nothing on this site is an offer to sell securities or a promise of investment returns. Listing information is deemed reliable but not guaranteed.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-1 text-[0.875rem] text-muted">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6">
            {[
              ["/legal/privacy", "Privacy"],
              ["/legal/terms", "Terms"],
              ["/credits", "Photo credits"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-11 items-center">
                  <span className="link-draw">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* The name, set to the full width of the page, cropped by the floor. */}
      <svg aria-hidden viewBox="0 0 1000 118" className="mt-4 block w-full text-fg/[0.07]">
        <text x="0" y="122" textLength="1000" lengthAdjust="spacing" fill="currentColor" style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: 152, fontVariationSettings: '"wdth" 62' }}>
          SHEHMEER KANWAR
        </text>
      </svg>
    </footer>
  );
}
