"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TrialButton } from "@/components/ui/TrialButton";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[0.94rem] text-ink-2 transition-colors hover:bg-bg-sunken hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a href={siteConfig.appUrl} className="rounded-full px-3.5 py-2 text-[0.94rem] text-ink-2 hover:text-ink">
            Sign in
          </a>
          <TrialButton size="sm" />
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-bg-sunken"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        hidden={!open}
        className="container-x h-[calc(100dvh-var(--header-h))] overflow-y-auto pb-10 pt-4 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-display text-2xl text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a href={siteConfig.appUrl} className="border-b border-line py-4 font-display text-2xl text-ink-2">
            Sign in
          </a>
        </nav>
        <TrialButton className="mt-8 w-full" />
        <p className="mt-3 text-center text-sm text-ink-3">{siteConfig.trial.note}</p>
      </div>
    </header>
  );
}
