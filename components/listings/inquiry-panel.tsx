"use client";

import { useState } from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { cn } from "@/lib/utils";

const tabs = [
  { kind: "showing-request", label: "Request a showing" },
  { kind: "property-inquiry", label: "Ask a question" },
] as const;

export function InquiryPanel({ listingId, listingTitle }: { listingId: string; listingTitle: string }) {
  const [kind, setKind] = useState<(typeof tabs)[number]["kind"]>("showing-request");
  return (
    <div>
      <div role="tablist" aria-label="Inquiry type" className="flex rounded-full bg-surface p-1">
        {tabs.map((t) => (
          <button
            key={t.kind}
            role="tab"
            type="button"
            id={`tab-${t.kind}`}
            aria-selected={kind === t.kind}
            aria-controls="inquiry-panel"
            onClick={() => setKind(t.kind)}
            className={cn("t-label min-h-11 flex-1 rounded-full px-2 transition-colors", kind === t.kind ? "bg-fg text-bg" : "text-muted hover:text-fg")}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id="inquiry-panel" role="tabpanel" aria-labelledby={`tab-${kind}`} className="pt-7">
        <LeadForm key={kind} kind={kind} hidden={{ listingId, listingTitle }} idPrefix={kind} className="sm:grid-cols-1" />
      </div>
    </div>
  );
}
