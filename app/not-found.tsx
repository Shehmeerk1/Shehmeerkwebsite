import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section data-theme="basalt" className="flex min-h-[90dvh] items-center pt-24">
      <div className="wrap">
        <h1 className="t-card !text-[clamp(4.5rem,16vw,17rem)]">
          Off <span className="text-accent">the map.</span>
        </h1>
        <p className="t-m mt-8 max-w-[34ch]">This address does not exist, or it moved. The home search and the journal are good places to pick the trail back up.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg">
            <Link href="/homes">Explore homes</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Go to the homepage</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
