"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, CONTACT, COMPLIANCE } from "@/lib/constants";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-navy-900/95 shadow-lg backdrop-blur-sm"
          : "bg-white/80 shadow-sm backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#hero" className="flex flex-col">
          <span
            className={cn(
              "text-lg font-bold tracking-tight transition-colors duration-300",
              scrolled ? "text-white" : "text-navy-900"
            )}
          >
            Prashanna Sangroula
          </span>
          <span
            className={cn(
              "text-[10px] tracking-wide transition-colors duration-300",
              scrolled ? "text-navy-300" : "text-navy-500"
            )}
          >
            {COMPLIANCE.personalNmls}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gold-500",
                scrolled ? "text-navy-100" : "text-navy-700"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CONTACT.phoneHref}
            className={cn(
              "hidden items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors sm:flex",
              scrolled
                ? "border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
                : "border-gold-600/50 text-gold-700 hover:bg-gold-500/10"
            )}
          >
            <Phone className="size-3.5" />
            {CONTACT.phone}
          </a>

          <a
            href={CONTACT.phoneHref}
            aria-label="Call Prashanna"
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-lg transition-colors sm:hidden",
              scrolled
                ? "text-gold-400 hover:bg-white/10"
                : "text-gold-700 hover:bg-navy-100"
            )}
          >
            <Phone className="size-4" />
          </a>

          <MobileNav scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}
