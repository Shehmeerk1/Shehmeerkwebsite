"use client";

import { usePathname } from "next/navigation";
import { HOUR_BG, hourForPath } from "@/lib/themes";

/**
 * Re-mounts on every navigation. A wipe in the destination's own hour lifts
 * away to reveal the page, so moving between pages feels like a cut between
 * scenes. Pure CSS: it runs without JavaScript and is skipped under reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <div aria-hidden className="curtain" style={{ background: HOUR_BG[hourForPath(pathname)] }} />
      {children}
    </>
  );
}
