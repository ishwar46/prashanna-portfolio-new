import { Facebook, Home, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import {
  COMPLIANCE,
  COMPANIES,
  CONTACT,
  GOOGLE_REVIEWS_URL,
  NAV_ITEMS,
  SOCIAL_LINKS,
} from "@/lib/constants";

const FOOTER_NAV_LABELS = new Set(["Services", "About", "Calculator", "Contact"]);

const footerNavItems = NAV_ITEMS.filter((item) =>
  FOOTER_NAV_LABELS.has(item.label),
);

const socialEntries = [
  { platform: "Facebook", href: SOCIAL_LINKS.facebook, icon: Facebook },
  { platform: "Instagram", href: SOCIAL_LINKS.instagram, icon: Instagram },
  { platform: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: Linkedin },
] as const;

export function Footer() {
  return (
    <footer>
      {/* CTA band */}
      <div className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.72 0.15 70) 0.5px, transparent 0.5px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left md:py-12">
          <div>
            <p className="text-lg font-bold text-white sm:text-xl">
              Ready to Start Your Home Journey?
            </p>
            <p className="mt-1 text-sm text-navy-300">
              Whether you need a mortgage, a Realtor, or both — let&apos;s talk.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex h-11 shrink-0 items-center rounded-lg bg-gold-500 px-6 text-sm font-bold tracking-wide text-navy-950 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
          >
            Get a Free Consultation
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-navy-950 text-navy-300">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <h3 className="text-xl font-bold text-white">
                Prashanna Sangroula
              </h3>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  <div>
                    <p className="text-sm font-medium text-navy-200">
                      {COMPANIES.loanFactory.role}
                    </p>
                    <p className="text-xs text-navy-500">
                      {COMPANIES.loanFactory.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-navy-500" />
                  <div>
                    <p className="text-sm font-medium text-navy-200">
                      {COMPANIES.onest.role}
                    </p>
                    <p className="text-xs text-navy-500">
                      {COMPANIES.onest.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-6 flex gap-2">
                {socialEntries.map(({ platform, href, icon: Icon }) => (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800/50 text-navy-400 ring-1 ring-navy-700/50 transition-all hover:bg-navy-800 hover:text-gold-400 hover:ring-gold-500/30"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                Navigate
              </p>
              <nav className="mt-4 flex flex-col gap-2.5">
                {footerNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm text-navy-300 transition-colors hover:text-gold-400"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-navy-300 transition-colors hover:text-gold-400"
                >
                  Google Reviews
                </a>
              </nav>
            </div>

            {/* Mortgage Contact */}
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                Mortgage
              </p>
              <div className="mt-4 space-y-2.5">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-gold-400"
                >
                  <Phone className="size-3.5 shrink-0 text-navy-500" />
                  {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.emailHref}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-gold-400"
                >
                  <Mail className="size-3.5 shrink-0 text-navy-500" />
                  {CONTACT.email}
                </a>
              </div>

              <div className="my-4 h-px w-8 bg-navy-800" />

              <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                Real Estate
              </p>
              <div className="mt-4 space-y-2.5">
                <a
                  href={CONTACT.realEstatePhoneHref}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-gold-400"
                >
                  <Phone className="size-3.5 shrink-0 text-navy-500" />
                  {CONTACT.realEstatePhone}
                </a>
                <a
                  href={CONTACT.realEstateEmailHref}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-gold-400"
                >
                  <Mail className="size-3.5 shrink-0 text-navy-500" />
                  {CONTACT.realEstateEmail}
                </a>
              </div>
            </div>

            {/* Office */}
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                Office
              </p>
              <div className="mt-4 flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-navy-500" />
                <p className="text-sm leading-relaxed">{CONTACT.office}</p>
              </div>

              <div className="my-4 h-px w-8 bg-navy-800" />

              <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                Credentials
              </p>
              <div className="mt-4 space-y-1.5">
                <p className="text-xs text-navy-400">
                  {COMPLIANCE.personalNmls}
                </p>
                <p className="text-xs text-navy-400">
                  {COMPLIANCE.realEstateLicense}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance bar */}
        <div className="border-t border-navy-800/60">
          <div className="mx-auto max-w-6xl px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] text-navy-500 sm:gap-x-4">
              <span className="flex items-center gap-1.5">
                <Home className="size-3" />
                {COMPLIANCE.equalHousing}
              </span>
              <span className="hidden h-2.5 w-px bg-navy-800 sm:block" />
              <span>{COMPLIANCE.personalNmls}</span>
              <span className="hidden h-2.5 w-px bg-navy-800 sm:block" />
              <span>{COMPLIANCE.realEstateLicense}</span>
            </div>

            <p className="mx-auto mt-3 max-w-2xl text-center text-[11px] leading-relaxed text-navy-600">
              {COMPLIANCE.disclaimer}
            </p>

            <p className="mt-4 text-center text-[11px] text-navy-600">
              &copy; {new Date().getFullYear()} Prashanna Sangroula. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
