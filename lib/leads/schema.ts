import { z } from "zod";

/** Every form on the site posts one of these kinds. The kind decides the pipeline and tags. */
export const LEAD_KINDS = ["buy-sell", "valuation", "property-inquiry", "showing-request", "investor", "marketing", "general", "resource"] as const;
export type LeadKind = (typeof LEAD_KINDS)[number];

export const PIPELINE: Record<LeadKind, "real-estate" | "investor" | "marketing" | "audience" | "general"> = {
  "buy-sell": "real-estate",
  valuation: "real-estate",
  "property-inquiry": "real-estate",
  "showing-request": "real-estate",
  investor: "investor",
  marketing: "marketing",
  general: "general",
  resource: "audience",
};

/** Extra fields a kind must carry, beyond name and email. */
export const REQUIRED_EXTRAS: Record<LeadKind, string[]> = {
  "buy-sell": ["intent"],
  valuation: ["propertyAddress"],
  "property-inquiry": ["listingId"],
  "showing-request": ["listingId", "preferredDate"],
  investor: ["investorType", "interests"],
  marketing: ["message"],
  general: ["message"],
  resource: ["resource"],
};

const text = (max: number) => z.string().trim().max(max);

export const leadSchema = z.object({
  kind: z.enum(LEAD_KINDS),
  /** Path of the page the form was submitted from. */
  source: text(200).min(1),
  name: text(120).min(2, "Enter your name."),
  email: z.email("Enter a valid email address.").max(200),
  phone: text(40)
    .regex(/^[0-9+().\-\s]*$/, "Use digits only.")
    .optional()
    .or(z.literal("")),
  message: text(4000).optional().or(z.literal("")),
  /** Kind-specific answers: strings or lists of strings. */
  extras: z.record(z.string().max(60), z.union([text(600), z.array(text(120)).max(12)])).default({}),
  consentContact: z.literal(true, { error: "Please confirm we may contact you about this request." }),
  consentMarketing: z.boolean().default(false),
  /** Honeypot. Real people leave it empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadRecord = {
  id: string;
  receivedAt: string;
  kind: LeadKind;
  pipeline: (typeof PIPELINE)[LeadKind];
  tags: string[];
  source: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  extras: Record<string, string | string[]>;
  consent: { contact: true; marketing: boolean; recordedAt: string; wording: string };
};

export const CONSENT_WORDING = {
  contact: "I agree to be contacted about this request and have read the privacy notice.",
  marketing: "Send me occasional articles and market notes by email. I can unsubscribe at any time.",
} as const;

export function validateExtras(input: LeadInput): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const key of REQUIRED_EXTRAS[input.kind]) {
    if (key === "message") {
      if (!input.message || input.message.trim().length < 5) errors.message = "Add a short message.";
      continue;
    }
    const v = input.extras[key];
    if (v == null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && v.length === 0)) {
      errors[key] = "This field is required.";
    }
  }
  return errors;
}

export function buildTags(input: LeadInput): string[] {
  const tags = [`kind:${input.kind}`, `pipeline:${PIPELINE[input.kind]}`];
  const one = (k: string) => (typeof input.extras[k] === "string" ? (input.extras[k] as string) : null);
  if (one("resource")) tags.push(`resource:${one("resource")}`);
  if (one("listingId")) tags.push(`listing:${one("listingId")}`);
  if (one("intent")) tags.push(`intent:${one("intent")!.toLowerCase()}`);
  if (Array.isArray(input.extras.interests)) for (const i of input.extras.interests) tags.push(`interest:${i.toLowerCase().replace(/\s+/g, "-")}`);
  if (input.consentMarketing) tags.push("newsletter:opted-in");
  return tags;
}
