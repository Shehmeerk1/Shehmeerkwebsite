"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { photos } from "@/lib/photos";
import { fullNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";

/** Full-screen index. Each destination previews its own photograph on the right. */
export function Menu() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="t-label group inline-flex min-h-11 items-center gap-2.5 rounded-full px-3.5 hover:bg-white/10">
        <span>Menu</span>
        <span aria-hidden className="flex w-5 flex-col gap-[4px]">
          <span className="h-[1.5px] w-full bg-current transition-transform duration-300 group-hover:translate-x-0.5" />
          <span className="h-[1.5px] w-full bg-current transition-transform duration-300 group-hover:-translate-x-0.5" />
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          data-theme="basalt"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain data-[state=closed]:animate-[fade-in_0.2s_ease-in_reverse_both] data-[state=open]:animate-[fade-in_0.35s_ease-out_both]"
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>
          <div className="wrap flex flex-none items-center justify-between pt-4 [--mono-ink:#0f0e0c] [&_svg>rect]:fill-[#f3f0ea]">
            <Wordmark onClick={close} />
            <Dialog.Close className="t-label inline-flex min-h-11 items-center gap-2.5 rounded-full bg-fg px-4 text-bg">
              Close <X className="size-4" aria-hidden />
            </Dialog.Close>
          </div>
          <div className="wrap grid flex-1 grid-cols-12 items-center gap-x-6 py-8">
            <nav aria-label="All pages" className="col-span-12 lg:col-span-7">
              <ul onPointerLeave={() => setHover(Math.max(0, fullNav.findIndex((n) => n.href === pathname)))}>
                {fullNav.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        onPointerEnter={() => setHover(i)}
                        onFocus={() => setHover(i)}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-baseline gap-5 py-[0.2rem]"
                      >
                        <span className="line-mask t-xl pr-8 !text-[clamp(2.3rem,6.6vh,5.4rem)]" style={{ "--i": i * 0.4 - 4 } as React.CSSProperties}>
                          <span className={cn("transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-focus-visible:translate-x-3", hover === i || active ? "text-fg" : "text-fg/40")}>{item.label}</span>
                        </span>
                        <span className={cn("t-label hidden text-accent transition-opacity duration-300 sm:inline", hover === i ? "opacity-100" : "opacity-0")}>{item.note}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="relative col-span-5 hidden aspect-[4/5] overflow-hidden rounded-[1.25rem] lg:block">
              {fullNav.map((item, i) => (
                <Image
                  key={item.href}
                  src={photos[item.photo].src}
                  alt=""
                  fill
                  sizes="40vw"
                  className={cn("object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]", hover === i ? "scale-100 opacity-100" : "scale-110 opacity-0")}
                />
              ))}
            </div>
          </div>
          <div className="wrap flex flex-none flex-wrap justify-between gap-4 border-t border-line pb-6 pt-5 text-[0.875rem] text-muted">
            <p>Real estate, capital and growth in {site.region}.</p>
            <Link href="/homes/saved" onClick={close} className="link-draw">
              Saved homes
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
