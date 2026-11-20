/**
 * Single source of truth for facts about Shehmeer and the business.
 *
 * Anything set to `null` is NOT yet verified and is deliberately left out of
 * the site (or shown as a draft note). Fill these in before launch.
 * See docs/LAUNCH-CHECKLIST.md.
 */
export const site = {
  name: "Shehmeer Kanwar",
  shortName: "Kanwar",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Shehmeer Kanwar is an Arizona real estate professional, investor and marketing strategist. Search homes, talk about selling, or start an investment conversation.",
  region: "Arizona",
  base: "Greater Phoenix",

  contact: {
    email: null as string | null,
    phone: null as string | null,
    schedulingUrl: (process.env.NEXT_PUBLIC_SCHEDULING_URL || null) as string | null,
  },

  /** Required on real estate advertising in Arizona. Verify with your broker before launch. */
  brokerage: {
    name: null as string | null,
    licenseNumber: null as string | null,
    officeAddress: null as string | null,
    logo: null as string | null,
  },

  social: [] as { label: string; href: string }[],

  /** Turquoise editor's notes that mark draft copy and missing material. */
  showDraftNotes: process.env.NEXT_PUBLIC_SHOW_DRAFT_NOTES !== "false",
} as const;

export const primaryNav = [
  { href: "/homes", label: "Homes" },
  { href: "/real-estate", label: "Real estate" },
  { href: "/invest", label: "Invest" },
  { href: "/marketing", label: "Marketing" },
  { href: "/journal", label: "Journal" },
] as const;

export const fullNav = [
  { href: "/", label: "Home", note: "Start here", photo: "saguaroSunset" },
  { href: "/homes", label: "Explore homes", note: "Property search", photo: "villaPool" },
  { href: "/real-estate", label: "Real estate", note: "Buy, sell, luxury, communities", photo: "interiorView" },
  { href: "/invest", label: "Invest with me", note: "For investors", photo: "taliesinNight" },
  { href: "/marketing", label: "Marketing", note: "Strategy and growth", photo: "saguaroDusk" },
  { href: "/about", label: "About", note: "The story so far", photo: "camelbackWide" },
  { href: "/journal", label: "Journal", note: "Articles and video", photo: "camelbackEtching" },
  { href: "/resources", label: "Free guides", note: "Guides and checklists", photo: "hermosaGarden" },
  { href: "/contact", label: "Contact", note: "Start a conversation", photo: "taliesinPool" },
] as const;
