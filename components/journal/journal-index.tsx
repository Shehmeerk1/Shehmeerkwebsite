import Link from "next/link";
import { PostCard, PostMeta } from "@/components/journal/post-card";
import { DraftNote } from "@/components/site/draft-note";
import { Photo } from "@/components/site/photo";
import { CATEGORIES, categorySlug, type Category, type Post } from "@/lib/journal";
import { cn } from "@/lib/utils";

export function JournalIndex({ posts, active }: { posts: Post[]; active: Category | null }) {
  const [lead, ...rest] = posts;
  const anySample = posts.some((p) => p.sample);
  return (
    <>
      <section data-theme="basalt" className="pt-28">
        <div className="wrap pb-12">
          <h1 className="t-card !text-[clamp(4rem,15vw,17rem)]">
            <span className="line-mask">
              <span>{active ?? "Journal"}</span>
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="t-m fade-late max-w-[34ch]" style={{ "--i": 2 } as React.CSSProperties}>
              Notes on Arizona real estate, business, marketing, investing and what I am learning along the way.
            </p>
            <nav aria-label="Journal categories" className="fade-late" style={{ "--i": 3 } as React.CSSProperties}>
              <ul className="flex flex-wrap gap-2">
                {[{ label: "Everything", href: "/journal", on: active === null }, ...CATEGORIES.map((c) => ({ label: c, href: `/journal/category/${categorySlug(c)}`, on: c === active }))].map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} aria-current={c.on ? "page" : undefined} className={cn("t-label inline-flex min-h-11 items-center rounded-full border px-4 transition-colors", c.on ? "border-accent bg-accent text-accent-fg" : "border-fg/25 hover:border-fg")}>
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {anySample ? <DraftNote className="mt-6 text-muted">Sample drafts. Add a .mdx file to content/journal to publish an article; delete these when your own are ready.</DraftNote> : null}
        </div>

        {lead ? (
          <div className="wrap pb-[clamp(4rem,8vw,7rem)]">
            <Link href={`/journal/${lead.slug}`} className="group grid-12 items-end gap-y-6">
              {lead.cover ? <Photo name={lead.cover} grain priority className="col-span-12 aspect-[16/10] rounded-[1.5rem] lg:col-span-8 lg:aspect-[16/9]" sizes="(min-width: 1024px) 66vw, 100vw" /> : null}
              <div className="col-span-12 lg:col-span-4">
                <PostMeta post={lead} />
                <h2 className="t-l mt-3">
                  <span className="link-draw">{lead.title}</span>
                </h2>
                <p className="t-body mt-4 text-muted">{lead.excerpt}</p>
              </div>
            </Link>
          </div>
        ) : null}
      </section>

      <section data-theme="chalk" aria-label="More articles" className="py-[clamp(4rem,8vw,7rem)]">
        <div className="wrap">
          {!lead ? (
            <div>
              <p className="t-xl max-w-[16ch]">Nothing filed under {active} yet.</p>
              <Link href="/journal" className="t-label mt-6 inline-flex min-h-11 items-center">
                <span className="link-draw">Read everything else</span>
              </Link>
            </div>
          ) : rest.length === 0 ? (
            <p className="t-m text-muted">That is everything in {active ?? "the journal"} for now.</p>
          ) : (
            <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <li key={p.slug} className={cn(i % 3 === 1 && "lg:translate-y-12")}>
                  <PostCard post={p} aspect={i % 2 ? "aspect-[4/5]" : "aspect-[4/3]"} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
