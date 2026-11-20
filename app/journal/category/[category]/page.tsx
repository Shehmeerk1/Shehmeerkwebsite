import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalIndex } from "@/components/journal/journal-index";
import { CATEGORIES, categoryFromSlug, categorySlug, getPosts } from "@/lib/journal";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: categorySlug(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryFromSlug((await params).category);
  return category ? { title: `${category} articles`, description: `Journal articles on ${category.toLowerCase()} from Shehmeer Kanwar.`, alternates: { canonical: `/journal/category/${categorySlug(category)}` } } : {};
}

export default async function CategoryPage({ params }: Props) {
  const category = categoryFromSlug((await params).category);
  if (!category) notFound();
  const posts = (await getPosts()).filter((p) => p.category === category);
  return <JournalIndex posts={posts} active={category} />;
}
