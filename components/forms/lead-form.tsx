"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, Select, Textarea } from "@/components/ui/input";
import { CONSENT_WORDING, leadSchema, validateExtras, type LeadKind } from "@/lib/leads/schema";
import { cn } from "@/lib/utils";

/** `more` fields sit behind an "Add details (optional)" toggle; they still submit when folded. */
type Field = { more?: boolean } & (
  | { name: string; label: string; type: "text" | "email" | "tel" | "date"; required?: boolean; autoComplete?: string; half?: boolean; hint?: string }
  | { name: string; label: string; type: "textarea"; required?: boolean; hint?: string }
  | { name: string; label: string; type: "select"; options: string[]; required?: boolean; half?: boolean }
  | { name: string; label: string; type: "checks"; options: string[]; required?: boolean }
);

const CORE = new Set(["name", "email", "phone", "message"]);
const who: Field[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name", half: true },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
];
const phone: Field = { name: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel", half: true };
const timeline: Field = { name: "timeline", label: "Timing", type: "select", options: ["Within 3 months", "3 to 6 months", "6 to 12 months", "Just exploring"], half: true };
const callWindow: Field = { name: "callWindow", label: "Best time for a call", type: "select", options: ["Weekday morning", "Weekday afternoon", "Weekday evening", "Weekend"], half: true };

const FIELDS: Record<LeadKind, Field[]> = {
  "buy-sell": [
    ...who,
    phone,
    { name: "intent", label: "I am looking to", type: "select", options: ["Buy", "Sell", "Buy and sell"], required: true, half: true },
    timeline,
    { name: "areas", label: "Areas or neighborhoods", type: "text", half: true },
    { name: "message", label: "Anything else worth knowing", type: "textarea" },
  ],
  valuation: [
    { name: "propertyAddress", label: "Property address", type: "text", required: true, autoComplete: "street-address" },
    ...who,
    { name: "propertyType", label: "Property type", type: "select", options: ["Single family", "Townhome", "Condominium", "Multifamily", "Land"], half: true, more: true },
    { ...timeline, more: true },
    { ...phone, more: true },
    { name: "message", label: "Recent updates, or questions you have", type: "textarea", more: true },
  ],
  "property-inquiry": [...who, phone, { name: "message", label: "Your question", type: "textarea" }],
  "showing-request": [
    ...who,
    phone,
    { name: "preferredDate", label: "Preferred date", type: "date", required: true, half: true },
    { name: "preferredTime", label: "Preferred time", type: "select", options: ["Morning", "Midday", "Afternoon", "Evening"], half: true },
    { name: "message", label: "Notes for the showing", type: "textarea" },
  ],
  investor: [
    ...who,
    phone,
    { name: "investorType", label: "I invest as", type: "select", options: ["An individual", "A family or private group", "A fund or institution", "A developer or operator", "Not investing yet"], required: true, half: true },
    { name: "interests", label: "What interests you", type: "checks", options: ["Residential", "Multifamily", "Development"], required: true },
    timeline,
    callWindow,
    { name: "message", label: "What you are looking for", type: "textarea" },
  ],
  marketing: [
    ...who,
    { name: "company", label: "Company or project", type: "text", autoComplete: "organization", half: true },
    { name: "need", label: "What you need", type: "select", options: ["Marketing strategy", "Business growth", "A collaboration", "Speaking or media", "Something else"], half: true },
    { name: "message", label: "Tell me about it", type: "textarea", required: true },
  ],
  general: [...who, phone, { name: "message", label: "Your message", type: "textarea", required: true }],
  resource: [...who],
};

const SUBMIT: Record<LeadKind, string> = {
  "buy-sell": "Send my request",
  valuation: "Request a valuation",
  "property-inquiry": "Send my question",
  "showing-request": "Request a showing",
  investor: "Send investor inquiry",
  marketing: "Send my message",
  general: "Send my message",
  resource: "Get the download",
};

/**
 * Name, email and phone typed into any form on the page. Switching the contact
 * topic or a listing's tab remounts the form; this keeps what was typed.
 * Memory only: nothing is written to storage.
 */
const identity: Record<"name" | "email" | "phone", string> = { name: "", email: "", phone: "" };
const isIdentity = (n: string): n is keyof typeof identity => n === "name" || n === "email" || n === "phone";

const noSubscribe = () => () => {};
const localDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** A sensible next step after each kind of request. */
const NEXT: Partial<Record<LeadKind, { href: string; label: string }>> = {
  valuation: { href: "/resources#seller-preparation-checklist", label: "While you wait: the seller preparation checklist" },
  "buy-sell": { href: "/resources#arizona-homebuyer-guide", label: "While you wait: the Arizona homebuyer guide" },
  "showing-request": { href: "/homes", label: "Keep browsing homes" },
  "property-inquiry": { href: "/homes", label: "Keep browsing homes" },
  investor: { href: "/journal/reading-an-investment-summary", label: "Read: how I read an investment summary" },
  marketing: { href: "/journal/category/marketing", label: "Read the marketing articles" },
};

const SENT: Record<LeadKind, { title: string; body: string }> = {
  "buy-sell": { title: "Request sent.", body: "Shehmeer will reply personally to the email you gave." },
  valuation: { title: "Valuation request sent.", body: "Shehmeer will review the property and reply to the email you gave." },
  "property-inquiry": { title: "Question sent.", body: "Shehmeer will reply to the email you gave." },
  "showing-request": { title: "Showing request sent.", body: "This is a request, not a confirmed appointment. Shehmeer will reply to confirm a time." },
  investor: { title: "Investor inquiry sent.", body: "Shehmeer will reply to arrange a conversation." },
  marketing: { title: "Message sent.", body: "Shehmeer will reply to the email you gave." },
  general: { title: "Message sent.", body: "Shehmeer will reply to the email you gave." },
  resource: { title: "Your download is ready.", body: "The link below works for 24 hours." },
};

type Status = { state: "idle" | "sending" } | { state: "sent"; download?: string | null } | { state: "failed"; message: string };

export function LeadForm({ kind, hidden, className, idPrefix }: { kind: LeadKind; hidden?: Record<string, string>; className?: string; idPrefix?: string }) {
  const pathname = usePathname();
  const uid = useId();
  const pid = idPrefix ?? uid;
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const fields = FIELDS[kind];
  // Undefined on the server, the visitor's local date in the browser; blocks past dates.
  const today = useSyncExternalStore(noSubscribe, localDate, () => undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const extras: Record<string, string | string[]> = { ...hidden };
    for (const f of fields) {
      if (CORE.has(f.name)) continue;
      if (f.type === "checks") {
        const picked = data.getAll(f.name).map(String);
        if (picked.length) extras[f.name] = picked;
      } else {
        const v = String(data.get(f.name) ?? "").trim();
        if (v) extras[f.name] = v;
      }
    }
    const payload = {
      kind,
      source: pathname,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      extras,
      consentContact: data.get("consentContact") === "on",
      consentMarketing: data.get("consentMarketing") === "on",
      website: String(data.get("website") ?? ""),
    };

    const found: Record<string, string> = {};
    // Empty required fields first, so "empty" and "too short" get different messages.
    const EMPTY: Record<string, string> = { name: "Enter your name.", email: "Enter your email address.", message: "Add a short message." };
    for (const f of fields) if (f.required && CORE.has(f.name) && !String(data.get(f.name) ?? "").trim()) found[f.name] = EMPTY[f.name] ?? "This field is required.";
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) for (const issue of parsed.error.issues) found[String(issue.path[0])] ??= issue.message;
    for (const [k, v] of Object.entries(validateExtras(payload as Parameters<typeof validateExtras>[0]))) found[k] ??= v;
    const date = String(data.get("preferredDate") ?? "");
    if (date && today && date < today) found.preferredDate ??= "Choose today or a later date.";

    setErrors(found);
    const order = [...fields.map((f) => f.name), "consentContact"];
    const firstBad = order.find((n) => found[n]) ?? Object.keys(found)[0];
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"], [data-field="${firstBad}"]`)?.focus();
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, string>; message?: string; download?: string | null };
      if (res.ok && body.ok) return setStatus({ state: "sent", download: body.download });
      if (res.status === 422 && body.errors) {
        setErrors(body.errors);
        return setStatus({ state: "idle" });
      }
      setStatus({ state: "failed", message: body.message ?? "The request could not be sent. Check your connection and send it again." });
    } catch {
      setStatus({ state: "failed", message: "The request could not be sent. Check your connection and send it again." });
    }
  }

  useEffect(() => {
    if (status.state !== "sent" || !sentRef.current) return;
    sentRef.current.focus({ preventScroll: true });
    sentRef.current.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [status.state]);

  if (status.state === "sent") {
    const sent = SENT[kind];
    return (
      <div ref={sentRef} tabIndex={-1} role="status" className={cn("scroll-mt-28 border-t border-accent pt-8 outline-none", className)}>
        <p className="flex items-baseline gap-3">
          <span className="inline-block size-3 rounded-full bg-accent" aria-hidden />
          <span className="t-m">{sent.title}</span>
        </p>
        <p className="t-body mt-3 max-w-md text-muted">{sent.body}</p>
        {NEXT[kind] ? (
          <Link href={NEXT[kind]!.href} className="t-label mt-5 inline-flex min-h-11 items-center gap-2">
            <span className="link-draw">{NEXT[kind]!.label}</span>
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        ) : null}
        {kind === "resource" ? (
          status.download ? (
            <Button asChild className="mt-6">
              <a href={status.download} download>
                <Download aria-hidden /> Download the PDF
              </a>
            </Button>
          ) : (
            <p className="t-body mt-3 text-error">The file is not available yet. Your details were saved.</p>
          )
        ) : null}
      </div>
    );
  }

  const err = (name: string) => (errors[name] ? <p id={`${pid}-${name}-err`} className="mt-2 text-[0.9375rem] text-error">{errors[name]}</p> : null);
  const aria = (name: string) => ({ "aria-invalid": errors[name] ? true : undefined, "aria-describedby": errors[name] ? `${pid}-${name}-err` : undefined });

  const renderField = (f: Field) => {
        const id = `${pid}-${f.name}`;
        const half = "half" in f && f.half;
        return (
          <div key={f.name} className={cn(!half && "sm:col-span-full")}>
            {f.type === "checks" ? (
              <fieldset>
                <legend className="t-label text-muted">
                  {f.label}
                  {f.required ? <span aria-hidden className="text-fg"> *</span> : null}
                </legend>
                <div className="mt-3 flex flex-wrap gap-x-7 gap-y-1">
                  {f.options.map((o, i) => (
                    <label key={o} className="flex min-h-11 cursor-pointer items-center gap-3 text-[1.0625rem]">
                      <input type="checkbox" name={f.name} value={o} data-field={i === 0 ? f.name : undefined} className="size-5 accent-[var(--accent)]" {...(i === 0 ? aria(f.name) : {})} />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : (
              <>
                <label htmlFor={id} className="t-label block text-muted">
                  {f.label}
                  {f.required ? <span aria-hidden className="text-fg"> *</span> : null}
                </label>
                {f.type === "textarea" ? (
                  <Textarea id={id} name={f.name} required={f.required} {...aria(f.name)} />
                ) : f.type === "select" ? (
                  <Select id={id} name={f.name} required={f.required} defaultValue="" {...aria(f.name)}>
                    <option value="" disabled={f.required}>
                      {f.required ? "Choose one" : "No preference"}
                    </option>
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    id={id}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    autoComplete={f.autoComplete ?? "off"}
                    spellCheck={f.type === "email" ? false : undefined}
                    inputMode={f.type === "tel" ? "tel" : undefined}
                    min={f.type === "date" ? today : undefined}
                    defaultValue={isIdentity(f.name) ? identity[f.name] : undefined}
                    onChange={isIdentity(f.name) ? (e) => (identity[f.name as keyof typeof identity] = e.currentTarget.value) : undefined}
                    className={f.type === "date" ? "[color-scheme:light] [[data-theme=basalt]_&]:[color-scheme:dark] [[data-theme=night]_&]:[color-scheme:dark]" : undefined}
                    {...aria(f.name)}
                  />
                )}
              </>
            )}
            {err(f.name)}
          </div>
        );
      };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn("grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2", className)}>
      <p className="text-[0.875rem] text-muted sm:col-span-full" aria-hidden>
        Fields marked <span className="text-fg">*</span> are required.
      </p>
      {fields.filter((f) => !f.more).map(renderField)}
      {fields.some((f) => f.more) ? (
        <details className="group/more sm:col-span-full" open={Object.keys(errors).some((k) => fields.find((f) => f.name === k)?.more) || undefined}>
          <summary className="t-label inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-fg [&::-webkit-details-marker]:hidden">
            <span aria-hidden className="inline-block transition-transform duration-300 group-open/more:rotate-45">+</span>
            <span className="link-draw">Add details (optional)</span>
          </summary>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">{fields.filter((f) => f.more).map(renderField)}</div>
        </details>
      ) : null}

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute left-[-9999px] top-auto size-px overflow-hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="space-y-3 sm:col-span-full">
        <div className="flex items-start gap-3">
          <Checkbox id={`${pid}-consentContact`} name="consentContact" data-field="consentContact" required {...aria("consentContact")} />
          <label htmlFor={`${pid}-consentContact`} className="cursor-pointer text-[0.9375rem] leading-snug text-muted">
            I agree to be contacted about this request and have read the{" "}
            <Link href="/legal/privacy" className="link-rule text-fg">
              privacy notice
            </Link>
            .
          </label>
        </div>
        {err("consentContact")}
        <div className="flex items-start gap-3">
          <Checkbox id={`${pid}-consentMarketing`} name="consentMarketing" />
          <label htmlFor={`${pid}-consentMarketing`} className="cursor-pointer text-[0.9375rem] leading-snug text-muted">
            {CONSENT_WORDING.marketing}
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-full">
        <Button type="submit" size="lg" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : SUBMIT[kind]} <ArrowRight aria-hidden />
        </Button>
        {Object.keys(errors).length >= 3 ? (
          <p aria-live="polite" className="text-[0.9375rem] text-error">
            {Object.keys(errors).length} fields need attention.
          </p>
        ) : null}
        {status.state === "failed" ? (
          <p role="alert" className="max-w-md text-[0.9375rem] text-error">
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
