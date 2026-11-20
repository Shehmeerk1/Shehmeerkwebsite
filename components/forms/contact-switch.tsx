"use client";

import { useState } from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { TOPICS, type Topic } from "@/lib/contact-topics";
import { cn } from "@/lib/utils";

/** The visitor chooses what the message is about; the form and its destination follow. */
export function ContactSwitch({ initial }: { initial: Topic }) {
  const [topic, setTopic] = useState<Topic>(initial);
  const current = TOPICS.find((t) => t.topic === topic) ?? TOPICS[0];
  return (
    <div className="grid-12 gap-y-12">
      <fieldset className="col-span-12 lg:col-span-5">
        <legend className="t-label text-muted">What is this about?</legend>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {TOPICS.map((t) => {
            const on = t.topic === topic;
            return (
              <label key={t.topic} className={cn("group flex min-h-20 cursor-pointer items-center justify-between gap-4 rounded-[1rem] border px-5 py-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-fg", on ? "border-fg bg-fg text-bg" : "border-fg/25 hover:border-fg")}>
                <input type="radio" name="topic" value={t.topic} checked={on} onChange={() => setTopic(t.topic)} className="sr-only" />
                <span>
                  <span className="t-s block">{t.label}</span>
                  <span className={cn("mt-0.5 block text-[0.9375rem]", on ? "text-bg/70" : "text-muted")}>{t.line}</span>
                </span>
                <span aria-hidden className={cn("size-4 flex-none rounded-full border-2 transition-colors", on ? "border-bg bg-[#ff6b3d]" : "border-current")} />
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <h2 className="t-l mb-8">{current.label}</h2>
        <LeadForm key={current.kind} kind={current.kind} idPrefix={`contact-${current.kind}`} />
      </div>
    </div>
  );
}
