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
      <CloseCta />
    </>
  );
}
