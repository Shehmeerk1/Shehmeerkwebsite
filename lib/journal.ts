import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import type { PhotoKey } from "./photos";

export const CATEGORIES = ["Real Estate", "Business", "Marketing", "Investing", "Personal Insights"] as const;
export type Category = (typeof CATEGORIES)[number];
export const categorySlug = (c: string) => c.toLowerCase().replace(/\s+/g, "-");
export const categoryFromSlug = (s: string) => CATEGORIES.find((c) => categorySlug(c) === s) ?? null;

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: Category;
  excerpt: string;
  cover: PhotoKey | null;
  /** Slug of a free resource to offer at the end of the article. */
  resource: string | null;
  hasVideo: boolean;
  /** Sample posts show a draft note until Shehmeer replaces them. */
  sample: boolean;
  minutes: number;
  body: string;
};

const DIR = path.join(process.cwd(), "content", "journal");

export const getPosts = cache(async (): Promise<Post[]> => {
  const files = (await readdir(DIR)).filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title),
        date: new Date(data.date).toISOString(),
        category: (CATEGORIES.includes(data.category) ? data.category : "Personal Insights") as Category,
        excerpt: String(data.excerpt ?? ""),
        cover: (data.cover ?? null) as PhotoKey | null,
        resource: (data.resource ?? null) as string | null,
        hasVideo: /<Video\b/.test(content),
        sample: Boolean(data.sample),
        minutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
        body: content,
      } satisfies Post;
    }),
  );
  return posts.toSorted((a, b) => b.date.localeCompare(a.date));
});

export const getPost = cache(async (slug: string) => (await getPosts()).find((p) => p.slug === slug) ?? null);
