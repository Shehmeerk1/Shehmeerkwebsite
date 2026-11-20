import type { LeadKind } from "./leads/schema";

export const TOPICS = [
  { topic: "valuation", kind: "valuation", label: "Home valuation", line: "What your home could sell for." },
  { topic: "buy-sell", kind: "buy-sell", label: "Buying or selling", line: "A home to find, or one to sell." },
  { topic: "investing", kind: "investor", label: "Real estate investing", line: "Residential, multifamily or development." },
  { topic: "marketing", kind: "marketing", label: "Marketing and business", line: "Strategy, growth or a collaboration." },
  { topic: "general", kind: "general", label: "Something else", line: "Press, speaking, or just a question." },
] as const satisfies readonly { topic: string; kind: LeadKind; label: string; line: string }[];

export type Topic = (typeof TOPICS)[number]["topic"];
