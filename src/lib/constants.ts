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

export interface Service {
  name: string;
  slug: string;
  description: string;
  audience: string;
}

export const SERVICES: Service[] = [
  {
    name: "Conventional Loans",
    slug: "conventional",
    description:
      "Traditional financing with competitive rates and flexible terms for a wide range of property types.",
    audience: "Buyers with good credit and 3-20% down payment",
  },
  {
    name: "FHA Loans",
    slug: "fha",
    description:
      "Government-backed loans with lower down payment and more flexible credit requirements to help you get into your first home.",
    audience: "First-time homebuyers and those with limited savings",
  },
  {
    name: "VA Loans",
    slug: "va",
    description:
      "Zero-down financing exclusively for eligible military service members, honoring your service with outstanding loan terms.",
    audience: "Active-duty military, veterans, and eligible spouses",
  },
  {
    name: "USDA Loans",
    slug: "usda",
    description:
      "Zero-down mortgage options for homes in eligible rural and suburban areas across the country.",
    audience: "Buyers in qualifying rural and suburban locations",
  },
  {
    name: "Jumbo Loans",
    slug: "jumbo",
    description:
      "Financing that exceeds conforming loan limits, designed for luxury and high-value property purchases.",
    audience: "Buyers purchasing high-value homes",
  },
  {
    name: "DSCR Loans",
    slug: "dscr",
    description:
      "Investment property loans qualified by the property's rental income rather than your personal income.",
    audience: "Real estate investors and landlords",
  },
  {
    name: "Bank Statement Loans",
    slug: "bank-statement",
    description:
      "Flexible qualification using bank statements instead of tax returns, built for self-employed professionals.",
    audience: "Self-employed professionals and business owners",
  },
  {
    name: "Foreign National Loans",
    slug: "foreign-national",
    description:
      "Home financing programs for non-US citizens purchasing property in the United States without a Social Security number.",
    audience: "Foreign nationals buying US property",
  },
  {
    name: "Refinancing",
    slug: "refinancing",
    description:
      "Rate-and-term, cash-out, and streamline options to optimize your current mortgage and save money.",
    audience: "Homeowners seeking better rates or accessing equity",
  },
  {
    name: "HELOC",
    slug: "heloc",
    description:
      "A revolving line of credit secured by your home equity, giving you flexible access to funds when you need them.",
    audience: "Homeowners needing flexible access to funds",
  },
  {
    name: "Reverse Mortgages",
    slug: "reverse-mortgage",
    description:
      "Convert your home equity into tax-free income without monthly mortgage payments, supplementing your retirement.",
    audience: "Homeowners age 62+ looking to supplement retirement income",
  },
] as const;

export interface Testimonial {
  name: string;
  context: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "John D.",
    context: "VA Home Purchase",
    quote:
      "Prashanna made the entire VA loan process seamless from start to finish. He was incredibly patient with all the paperwork and kept me informed at every step. I never felt lost or overwhelmed, even as a first-time buyer using my VA benefit.",
  },
  {
    name: "Maria S.",
    context: "First-Time FHA Buyer",
    quote:
      "As a first-time homebuyer, I had a million questions and Prashanna answered every single one. He walked me through the FHA process, explained what to expect, and helped me find a payment I was comfortable with. I couldn't have done it without him.",
  },
  {
    name: "Robert K.",
    context: "Cash-Out Refinance",
    quote:
      "I reached out to Prashanna about refinancing and he responded the same day. He found me a significantly lower rate and walked me through the cash-out process clearly. The savings have been real, and I only wish I'd called him sooner.",
  },
] as const;
