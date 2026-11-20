import type { Metadata } from "next";
import { ContactSwitch } from "@/components/forms/contact-switch";
import { ScheduleLink } from "@/components/site/schedule-link";
import { TOPICS, type Topic } from "@/lib/contact-topics";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Shehmeer Kanwar about buying or selling a home in Arizona, real estate investing, or marketing and business.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string | string[] }> }) {
  const raw = (await searchParams).topic;
  const asked = Array.isArray(raw) ? raw[0] : raw;
  const initial: Topic = TOPICS.find((t) => t.topic === asked)?.topic ?? "valuation";
  const { email, phone } = site.contact;

  return (
    <>
      <section data-theme="ember" className="pt-28">
        <div className="wrap pb-[clamp(3rem,6vw,5rem)]">
          <h1 className="t-card !text-[clamp(4.5rem,19vw,22rem)]">
            <span className="line-mask">
              <span>Let&rsquo;s talk.</span>
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="t-m max-w-[32ch]">Pick what your message is about. Each kind of inquiry is filed separately, so it reaches the right part of my week.</p>
            {email || phone || site.contact.schedulingUrl ? (
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {email ? (
                  <a href={`mailto:${email}`} className="t-m">
                    <span className="link-draw">{email}</span>
                  </a>
                ) : null}
                {phone ? (
                  <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="t-m">
                    <span className="link-draw">{phone}</span>
                  </a>
                ) : null}
                <ScheduleLink />
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <section data-theme="chalk" aria-label="Contact form" className="py-[clamp(3.5rem,7vw,6rem)]">
        <div className="wrap">
          <ContactSwitch key={initial} initial={initial} />
        </div>
      </section>
    </>
  );
}
