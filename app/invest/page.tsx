import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { CapitalPlat } from "@/components/invest/capital-plat";
import { DraftNote } from "@/components/site/draft-note";
import { Photo } from "@/components/site/photo";
import { ScheduleLink } from "@/components/site/schedule-link";
import { Steps } from "@/components/site/steps";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Invest in Arizona real estate",
  description: "A direct line for real estate investors: residential, multifamily and development conversations with Shehmeer Kanwar in Arizona.",
  alternates: { canonical: "/invest" },
};

const philosophy = [
  { title: "Location before building", body: "A building can be changed. Its address cannot." },
  { title: "The downside first", body: "I want to know what happens when a plan runs late or rents stay flat before I look at the upside." },
  { title: "Operations decide", body: "Most of what an investment becomes is settled after closing, by whoever runs it." },
  { title: "Patience is a position", body: "Not buying is a decision too. I would sooner miss a deal than force one." },
];

const process = [
  { title: "Inquiry", body: "You tell me how you invest and what interests you, using the form below." },
  { title: "A conversation", body: "We talk, usually by phone, about goals, timeline and experience." },
  { title: "Criteria", body: "We agree on what a suitable property looks like for you." },
  { title: "Opportunities", body: "When something fits, I bring it to you privately, with what I know and what I do not." },
];

export default function InvestPage() {
  return (
    <>
      <section data-theme="night" className="relative isolate overflow-hidden pt-28">
        <Photo name="taliesinNight" grain priority className="!absolute inset-0 -z-10 opacity-35" sizes="100vw" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(10,14,26,0.4),#0a0e1a_85%)]" />
        <div className="wrap pb-[clamp(3rem,6vw,5rem)]">
          <h1 className="t-card max-w-[11ch] !text-[clamp(3.6rem,11.5vw,13rem)]">
            <span className="line-mask" style={{ "--i": 0 } as React.CSSProperties}>
              <span>Capital,</span>
            </span>
            <span className="line-mask" style={{ "--i": 1 } as React.CSSProperties}>
              <span>placed with</span>
            </span>
            <span className="line-mask" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="text-accent">patience.</span>
            </span>
          </h1>
          <div className="grid-12 mt-10 gap-y-8">
            <p className="t-m fade-late col-span-12 max-w-[34ch] lg:col-span-6" style={{ "--i": 3 } as React.CSSProperties}>
              A direct line for people who buy property as an asset. Nothing is offered on this page; every conversation starts privately, with what you are looking for.
            </p>
            <div className="fade-late col-span-12 flex flex-wrap items-start gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end" style={{ "--i": 4 } as React.CSSProperties}>
              <Button asChild variant="accent" size="lg">
                <Link href="#inquire">
                  Start an investor inquiry <ArrowDown aria-hidden className="hover:!translate-x-0" />
                </Link>
              </Button>
              <ScheduleLink />
            </div>
          </div>
        </div>
      </section>

      <section data-theme="night" aria-labelledby="areas-title" className="py-[clamp(4rem,8vw,7rem)]">
        <div className="wrap">
          <h2 id="areas-title" className="t-xl mb-10 max-w-[14ch]">
            Three kinds of ground
          </h2>
          <CapitalPlat />
        </div>
      </section>

      <section data-theme="chalk" aria-labelledby="philosophy-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-6">
            <h2 id="philosophy-title" className="t-xl col-span-12 lg:col-span-7">
              How I think about it
            </h2>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="t-voice">I invest in real estate myself. These are the four ideas I keep coming back to.</p>
              <DraftNote className="mt-4 text-muted">Draft wording. Edit these four so they say exactly what you believe.</DraftNote>
            </div>
          </div>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] bg-line md:grid-cols-2">
            {philosophy.map((p) => (
              <div key={p.title} className="group bg-bg p-[clamp(1.5rem,3vw,2.75rem)] transition-colors duration-500 hover:bg-[#0a0e1a] hover:text-[#ebe7de]">
                <dt className="t-l">{p.title}</dt>
                <dd className="t-body mt-4 max-w-md text-muted group-hover:text-[#959bad]">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section data-theme="dawn" aria-labelledby="process-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 id="process-title" className="t-l">How a conversation goes</h2>
            <p className="t-body mt-5 max-w-sm text-muted">Four steps, in this order. None of them commits you to anything.</p>
          </div>
          <Steps items={process} className="col-span-12 lg:col-span-7 lg:col-start-6" />
        </div>
      </section>

      <section id="inquire" data-theme="night" aria-labelledby="inquire-title" className="py-[clamp(4.5rem,9vw,8rem)]">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="inquire-title" className="t-xl">Investor inquiry</h2>
            <p className="t-m mt-6 max-w-[28ch]">This goes to a separate investor inbox, and I read every one myself.</p>
            {site.contact.schedulingUrl ? (
              <div className="mt-8">
                <ScheduleLink />
              </div>
            ) : (
              <p className="t-body mt-6 max-w-sm text-muted">Prefer to talk first? Pick the best time for a call in the form and I will arrange it by email.</p>
            )}
            <p className="mt-10 max-w-md border-t border-line pt-5 text-[0.875rem] leading-relaxed text-muted">
              Nothing on this page is an offer to sell or a solicitation to buy any security. No returns are promised or implied. Real estate investing involves risk, including the loss of principal. Speak with your own legal, tax and financial advisors.
            </p>
          </div>
          <div className="col-span-12 rounded-[1.5rem] bg-surface p-[clamp(1.25rem,3vw,2.5rem)] lg:col-span-6 lg:col-start-7">
            <LeadForm kind="investor" idPrefix="investor" />
          </div>
        </div>
      </section>
    </>
  );
}
