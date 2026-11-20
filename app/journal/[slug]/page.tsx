import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/journal/mdx";
import { ReadingProgress } from "@/components/journal/reading-progress";
import { ResourceCover } from "@/components/resources/cover";
import { PostCard, PostMeta } from "@/components/journal/post-card";
import { ResourceGate } from "@/components/resources/resource-gate";
import { DraftNote } from "@/components/site/draft-note";
import { Photo } from "@/components/site/photo";
import { categorySlug, getPost, getPosts } from "@/lib/journal";
import { photos } from "@/lib/photos";
import { resourceBySlug } from "@/lib/resources";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date, images: post.cover ? [photos[post.cover].src] : undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();
  const resource = post.resource ? resourceBySlug.get(post.resource) : null;
  const related = [...all.filter((p) => p.slug !== post.slug && p.category === post.category), ...all.filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: `${site.url}/about` },
    mainEntityOfPage: `${site.url}/journal/${post.slug}`,
  };

  return (
    <>
      <ReadingProgress />
      <article>
        <header data-theme="basalt" className="pt-28">
          <div className="wrap">
            <Link href={`/journal/category/${categorySlug(post.category)}`} className="t-label inline-flex min-h-11 items-center gap-2 text-muted hover:text-fg">
              <ArrowLeft className="size-4" aria-hidden />
              <span className="link-draw">{post.category}</span>
            </Link>
            <h1 className="t-xl mt-6 max-w-[18ch]">
              <span className="line-mask">
                <span>{post.title}</span>
              </span>
            </h1>
            <div className="grid-12 mt-8 gap-y-4 pb-10">
              <p className="t-m col-span-12 max-w-[36ch] text-muted lg:col-span-7">{post.excerpt}</p>
              <div className="col-span-12 lg:col-span-4 lg:col-start-9">
                <PostMeta post={post} />
                {post.sample ? <DraftNote className="mt-4 text-muted">Sample draft, written to show the layout. Replace with your own article.</DraftNote> : null}
              </div>
            </div>
          </div>
          {post.cover ? (
            <div className="wrap pb-0">
              <Photo name={post.cover} grain priority className="aspect-[16/10] translate-y-12 rounded-[1.5rem] lg:aspect-[21/9]" sizes="100vw" />
            </div>
          ) : null}
        </header>

        <div data-theme="chalk" className={post.cover ? "pt-24" : "pt-10"}>
          <div className="wrap grid-12 pb-[clamp(3rem,6vw,6rem)]">
            <div className="prose-journal col-span-12 max-w-[66ch] lg:col-span-7 lg:col-start-4">
              <MDXRemote source={post.body} components={mdxComponents} />
            </div>
          </div>
        </div>
      </article>

      {resource ? (
        <section data-theme="bloom" aria-labelledby="resource-title" className="py-[clamp(4rem,8vw,7rem)]">
          <div className="wrap grid-12 items-center gap-y-10">
            <div className="col-span-6 sm:col-span-4 lg:col-span-2">
              <ResourceCover resource={resource} />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <p className="t-label text-muted">Free {resource.kind.toLowerCase()} that goes with this article</p>
              <h2 id="resource-title" className="t-l mt-3">{resource.title}</h2>
              <p className="t-body mt-3 max-w-md text-muted">{resource.summary}</p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <ResourceGate slug={resource.slug} title={resource.title} kind={resource.kind} startOpen />
            </div>
          </div>
        </section>
      ) : null}

      <section data-theme="chalk" aria-labelledby="related-title" className="border-t border-line py-[clamp(4rem,8vw,7rem)]">
        <div className="wrap">
          <h2 id="related-title" className="t-xl">Keep reading</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
