import { Facebook, Home, Instagram, Linkedin, Mail, Phone } from "lucide-react";

import { COMPLIANCE, CONTACT, NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";

const FOOTER_NAV_LABELS = new Set(["Services", "About", "Calculator", "Contact"]);

const footerNavItems = NAV_ITEMS.filter((item) =>
  FOOTER_NAV_LABELS.has(item.label),
);

const socialEntries = [
  { platform: "Instagram", href: SOCIAL_LINKS.instagram, icon: Instagram },
  { platform: "Facebook", href: SOCIAL_LINKS.facebook, icon: Facebook },
  { platform: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: Linkedin },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              Prashanna Sangroula
            </h3>
            <p className="mt-1 text-xs text-navy-400">
              {COMPLIANCE.personalNmls}
            </p>
            <p className="mt-3 text-sm">Mortgage Loan Officer</p>
            <p className="text-sm">Loan Factory, Inc.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <nav className="mt-3 flex flex-col gap-2">
              {footerNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-navy-300 transition-colors hover:text-gold-400"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-white">Contact</h4>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 text-sm text-navy-300 transition-colors hover:text-gold-400"
              >
                <Phone className="size-4" />
                {CONTACT.phone}
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center gap-2 text-sm text-navy-300 transition-colors hover:text-gold-400"
              >
                <Mail className="size-4" />
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white">Connect</h4>
            <div className="mt-3 flex gap-3">
              {socialEntries.map(({ platform, href, icon: Icon }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="text-navy-300 transition-colors hover:text-gold-400"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-xs text-navy-400 sm:gap-x-4">
            <span className="flex items-center gap-1">
              <Home className="size-3.5" />
              {COMPLIANCE.equalHousing}
            </span>
            <span>{COMPLIANCE.personalNmls}</span>
            <span>{COMPLIANCE.companyNmls}</span>
          </div>

          <p className="mt-3 text-center text-xs leading-relaxed text-navy-500">
            {COMPLIANCE.disclaimer}
          </p>

          <p className="mt-3 text-center text-xs text-navy-500">
            &copy; {new Date().getFullYear()} Prashanna Sangroula. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
