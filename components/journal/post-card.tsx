import Link from "next/link";
import { Play } from "lucide-react";
import { Photo } from "@/components/site/photo";
import type { Post } from "@/lib/journal";
import { cn, formatDate } from "@/lib/utils";

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <p className={cn("t-label flex flex-wrap items-center gap-x-4 gap-y-1 text-muted", className)}>
      <span className="text-accent">{post.category}</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span>{post.minutes} min read</span>
      {post.hasVideo ? (
        <span className="inline-flex items-center gap-1.5">
          <Play className="size-3" aria-hidden /> Video
        </span>
      ) : null}
    </p>
  );
}

export function PostCard({ post, large = false, className, aspect }: { post: Post; large?: boolean; className?: string; aspect?: string }) {
  return (
    <article className={className}>
      <Link href={`/journal/${post.slug}`} className="group block">
        {post.cover ? (
          <Photo name={post.cover} className={cn("rounded-[1rem]", aspect ?? (large ? "aspect-[16/10]" : "aspect-[4/3]"))} sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"} />
        ) : null}
        <PostMeta post={post} className={post.cover ? "mt-4" : ""} />
        <h3 className={cn("mt-2", large ? "t-l" : "t-m")}>
          <span className="link-draw">{post.title}</span>
        </h3>
        <p className="t-body mt-3 max-w-xl text-muted">{post.excerpt}</p>
      </Link>
    </article>
  );
}
