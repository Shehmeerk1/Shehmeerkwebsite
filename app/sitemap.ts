import type { MetadataRoute } from "next";
import { CATEGORIES, categorySlug, getPosts } from "@/lib/journal";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const staticPaths = ["", "/real-estate", "/valuation", "/homes", "/invest", "/marketing", "/about", "/journal", "/resources", "/contact", "/legal/privacy", "/legal/terms", "/credits"];
  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...CATEGORIES.map((c) => ({ url: `${site.url}/journal/category/${categorySlug(c)}`, changeFrequency: "weekly" as const, priority: 0.4 })),
    ...posts.map((p) => ({ url: `${site.url}/journal/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}
