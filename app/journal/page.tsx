import type { Metadata } from "next";
import { JournalIndex } from "@/components/journal/journal-index";
import { CloseCta } from "@/components/site/close-cta";
import { getPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles and video from Shehmeer Kanwar on Arizona real estate, business, marketing, investing and personal insights.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  return (
    <>
      <JournalIndex posts={await getPosts()} active={null} />
      <CloseCta
        title="Take the guide with you"
        lede="Short, plain documents for the decisions people ask me about most. Leave your name and email and the download opens straight away."
        primary={{ href: "/resources", label: "Browse the free guides" }}
        routes={[
          { href: "/valuation", label: "What is my home worth?" },
          { href: "/homes", label: "Explore homes" },
          { href: "/invest", label: "Invest with me" },
        ]}
      />
    </>
  );
}
