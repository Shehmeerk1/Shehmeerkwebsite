import type { MDXComponents } from "mdx/types";
import { Video } from "./video";

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <p className="not-prose t-l my-12 border-y-2 border-fg py-8 text-accent">
      {children}
    </p>
  );
}

/** Components available inside every .mdx article. */
export const mdxComponents: MDXComponents = { Video, PullQuote };
