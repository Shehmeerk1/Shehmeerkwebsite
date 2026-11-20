"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";

/** Name and email in exchange for the download. The contact is tagged with the resource it asked for. */
export function ResourceGate({ slug, title, kind, startOpen = false }: { slug: string; title: string; kind: string; startOpen?: boolean }) {
  const [open, setOpen] = useState(startOpen);
  if (!open) {
    return (
      <Button type="button" size="lg" onClick={() => setOpen(true)} aria-expanded={false}>
        Get the {kind.toLowerCase()} <ArrowRight aria-hidden />
      </Button>
    );
  }
  return (
    <div>
      <p className="t-label mb-6 text-muted">Where should the {kind.toLowerCase()} go?</p>
      <LeadForm kind="resource" hidden={{ resource: slug, resourceTitle: title }} idPrefix={`res-${slug}`} />
    </div>
  );
}
