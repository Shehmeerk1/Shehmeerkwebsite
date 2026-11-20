"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Menu } from "./menu";
import { Wordmark } from "./wordmark";

/**
 * Two floating pills on dark glass, so the header reads the same over a
 * photograph, cobalt, yellow or paper. No scroll listeners needed.
 */
export function Header() {
  const pathname = usePathname();
  const pill = "rounded-full bg-[#0f0e0c]/72 text-[#f3f0ea] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/10 [--mono-ink:#0f0e0c]";
  return (
    <header data-theme="basalt" className="!bg-transparent pointer-events-none fixed inset-x-0 top-0 z-50 [&_:focus-visible]:!outline-white [&_:focus-visible]:outline-offset-2">
      <div className="wrap flex items-center justify-between gap-3 pt-3 sm:pt-4">
        <div className={cn(pill, "pointer-events-auto py-1 pl-1.5 pr-1.5 min-[400px]:pr-4 [&_svg>rect]:fill-[#f3f0ea]")}>
          <Wordmark />
        </div>
        <div className={cn(pill, "pointer-events-auto flex items-center gap-1 py-1 pl-2 pr-1.5")}>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {primaryNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn("t-label inline-flex min-h-11 items-center rounded-full px-3.5 transition-colors duration-300", active ? "bg-[#f3f0ea] text-[#0f0e0c]" : "hover:bg-white/10")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link href="/valuation" className="t-label inline-flex min-h-11 items-center rounded-full bg-[#ff6b3d] px-4 text-[#0f0e0c] transition-colors duration-300 hover:bg-[#f3f0ea]">
            <span className="sm:hidden">Valuation</span>
            <span className="hidden sm:inline">Home valuation</span>
          </Link>
          <Menu />
        </div>
      </div>
    </header>
  );
}
