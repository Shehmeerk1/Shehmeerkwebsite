export type Resource = {
  slug: string;
  title: string;
  kind: "Guide" | "Checklist";
  topic: "Real estate" | "Investing" | "Business and marketing";
  summary: string;
  contents: string[];
  /** File inside content/resources/files. Currently a clearly marked placeholder PDF. */
  file: string;
  /** False until Shehmeer has written and approved the real document. */
  finalContent: boolean;
};

export const resources: Resource[] = [
  {
    slug: "arizona-homebuyer-guide",
    title: "The Arizona homebuyer guide",
    kind: "Guide",
    topic: "Real estate",
    summary: "The order things happen in when you buy a home in Arizona, from first conversation to keys.",
    contents: ["Getting ready to make an offer", "How an Arizona purchase contract moves", "Inspection period and what to look for", "Closing and moving in"],
    file: "arizona-homebuyer-guide.pdf",
    finalContent: false,
  },
  {
    slug: "seller-preparation-checklist",
    title: "The seller preparation checklist",
    kind: "Checklist",
    topic: "Real estate",
    summary: "What to fix, clear, photograph and decide before a home goes on the market.",
    contents: ["Repairs worth making and repairs to skip", "Preparing for photography", "Documents to gather", "Pricing conversation notes"],
    file: "seller-preparation-checklist.pdf",
    finalContent: false,
  },
  {
    slug: "real-estate-investing-starter-guide",
    title: "The real estate investing starter guide",
    kind: "Guide",
    topic: "Investing",
    summary: "A plain introduction to residential investing: the property types, the numbers people use, the questions to ask.",
    contents: ["Residential, multifamily and development compared", "Reading a deal summary", "Questions to ask before you commit", "Building a team"],
    file: "real-estate-investing-starter-guide.pdf",
    finalContent: false,
  },
  {
    slug: "marketing-foundations-worksheet",
    title: "The marketing foundations worksheet",
    kind: "Checklist",
    topic: "Business and marketing",
    summary: "A working page for owners: who you serve, what you promise, and where the next customer comes from.",
    contents: ["Audience and offer", "One channel done properly", "A weekly content rhythm", "What to measure"],
    file: "marketing-foundations-worksheet.pdf",
    finalContent: false,
  },
];

export const resourceBySlug = new Map(resources.map((r) => [r.slug, r]));
