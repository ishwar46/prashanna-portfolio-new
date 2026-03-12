"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#hero" className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white">
            Prashanna Sangroula
          </span>
          <span className="text-[10px] tracking-wide text-navy-300">
            {COMPLIANCE.personalNmls}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy-100 transition-colors hover:text-gold-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            render={
              <a
                href={CONTACT.phoneHref}
                className="hidden items-center gap-1.5 border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 sm:flex"
              />
            }
          >
            <Phone className="size-3.5" />
            {CONTACT.phone}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="text-gold-400 sm:hidden"
            render={
              <a href={CONTACT.phoneHref} aria-label="Call Prashanna" />
            }
          >
            <Phone className="size-4" />
          </Button>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
