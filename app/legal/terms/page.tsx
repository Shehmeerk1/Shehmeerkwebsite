import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/legal/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="November 2026">
      <p>By using this website you agree to these terms.</p>
      <h2>Information, not advice</h2>
      <p>The articles, guides and pages here are general information. They are not legal, tax, financial or investment advice. Speak with your own advisors before making a decision.</p>
      <h2>Listings</h2>
      <p>Listing information comes from third parties and is deemed reliable but is not guaranteed. Prices, availability and details can change without notice. Where the site shows sample listings, they are labelled as samples and are not real properties.</p>
      <h2>Investing</h2>
      <p>Nothing on this site is an offer to sell or a solicitation to buy any security. No returns are promised or implied. Real estate investing involves risk, including loss of principal.</p>
      <h2>Fair housing</h2>
      <p>Services are offered in line with the Fair Housing Act and Arizona fair housing law, without regard to race, color, religion, sex, disability, familial status or national origin.</p>
      <h2>Content</h2>
      <p>The writing and design on this site belong to Shehmeer Kanwar unless credited otherwise. Photograph credits are listed on the credits page.</p>
    </LegalPage>
  );
}
