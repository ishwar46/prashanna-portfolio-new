export const CONTACT = {
  phone: "(571) 222-5555",
  phoneHref: "tel:+15712225555",
  email: "prashanna@loanfactory.com",
  emailHref: "mailto:prashanna@loanfactory.com",
} as const;

export const COMPLIANCE = {
  personalNmls: "NMLS #2528620",
  companyNmls: "Loan Factory, Inc. NMLS #320841",
  equalHousing: "Equal Housing Lender",
  disclaimer:
    "Not a commitment to lend. Programs, rates, terms, and conditions are subject to change without notice. All loans subject to credit approval.",
} as const;

export const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Calculator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/prashannasangroula",
  facebook: "https://facebook.com/prashannasangroula",
  linkedin: "https://linkedin.com/in/prashannasangroula",
} as const;

export const SECTION_IDS = {
  hero: "hero",
  services: "services",
  about: "about",
  testimonials: "testimonials",
  calculator: "calculator",
  faq: "faq",
  contact: "contact",
} as const;
