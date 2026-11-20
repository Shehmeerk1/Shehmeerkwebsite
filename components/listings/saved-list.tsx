"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/hooks/use-favorites";
import type { Listing } from "@/lib/listings/types";
import { ListingCard } from "./listing-card";

export function SavedList() {
  const { ids } = useFavorites();
  const key = ids.join(",");
  const [state, setState] = useState<{ key: string; listings: Listing[] } | null>(null);

  useEffect(() => {
    if (!key) return;
    const controller = new AbortController();
    fetch(`/api/listings?ids=${encodeURIComponent(key)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((d: { listings: Listing[] }) => setState({ key, listings: d.listings }))
      .catch(() => {});
    return () => controller.abort();
  }, [key]);

  if (!key) {
    return (
      <div className="border-t border-line pt-10">
        <h2 className="t-l">No saved homes yet.</h2>
        <p className="t-body mt-4 max-w-md text-muted">Tap the heart on any home to keep it here. Saved homes stay in this browser; nothing is sent anywhere.</p>
        <Button asChild size="lg" className="mt-7">
          <Link href="/homes">Explore homes</Link>
        </Button>
      </div>
    );
  }
  if (!state || state.key !== key) return <p className="t-body text-muted" role="status">Loading your saved homes.</p>;

  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {state.listings.map((l) => (
        <li key={l.id}>
          <ListingCard listing={l} />
        </li>
      ))}
    </ul>
  );
}
