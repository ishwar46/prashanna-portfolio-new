"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, CONTACT, COMPLIANCE } from "@/lib/constants";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-lg transition-colors md:hidden",
          scrolled
            ? "text-white hover:bg-white/10"
            : "text-navy-900 hover:bg-navy-100"
        )}
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="bg-navy-900 border-navy-800 p-0"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>

        <div className="flex items-center justify-between border-b border-navy-800 px-6 py-4">
          <span className="text-sm font-semibold text-white">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex size-8 items-center justify-center rounded-lg text-navy-300 transition-colors hover:bg-navy-800 hover:text-white"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-navy-800/50 py-3.5 text-base font-medium text-navy-100 transition-colors hover:text-gold-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-navy-800 px-6 py-6">
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
          >
            <Phone className="size-4" />
            {CONTACT.phone}
          </a>
          <p className="mt-3 text-center text-xs text-navy-400">
            {COMPLIANCE.personalNmls}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
