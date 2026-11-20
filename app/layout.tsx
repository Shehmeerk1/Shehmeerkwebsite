import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Shehmeer Kanwar | Arizona real estate, capital and growth", template: "%s | Shehmeer Kanwar" },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_US", url: site.url, images: ["/photos/az/saguaro-sunset.jpg"] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0f0e0c" };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Real estate professional",
  areaServed: { "@type": "State", name: "Arizona" },
  knowsAbout: ["Residential real estate", "Real estate investing", "Marketing strategy", "Entrepreneurship"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <a href="#main" className="t-label sr-only z-[80] rounded-full bg-[#f3f0ea] px-5 py-3 text-[#0f0e0c] focus:not-sr-only focus:fixed focus:left-4 focus:top-20">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
