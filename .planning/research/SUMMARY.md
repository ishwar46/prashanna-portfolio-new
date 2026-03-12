# Project Research Summary

**Project:** Prashanna Sangroula — Loan Officer Portfolio Website
**Domain:** Loan officer lead-generation portfolio site
**Researched:** 2026-03-12
**Confidence:** HIGH

## Executive Summary

This is a static, single-page lead-generation portfolio site for a licensed mortgage loan officer. The goal is straightforward: convert visitors into leads via a contact form and phone call. Expert practitioners build these sites as statically generated single pages (no server round-trips on load), deploy to a CDN edge network, and keep JavaScript minimal by defaulting to Server Components. The stack is already in place — Next.js 16.1.6 with App Router, React 19, Tailwind CSS v4, Motion, and shadcn/ui — and only five additional libraries are needed: `react-hook-form`, `@hookform/resolvers`, `resend`, `@vercel/analytics`, and `@vercel/speed-insights`.

The recommended approach is a five-phase build: foundation (globals, layout shell, NMLS compliance), static content sections (hero, about, services, testimonials), interactive sections (calculator, FAQ, contact form), SEO and structured data, and a final polish pass. Compliance is non-negotiable and must ship in Phase 1 — NMLS numbers and Equal Housing disclosures are legal requirements under the SAFE Act. The contact form uses Next.js Server Actions with `useActionState` rather than an API route, eliminating boilerplate while providing progressive enhancement, pending state, and field-level error handling out of the box.

The primary risks are compliance omissions (legal exposure), a contact form that silently fails to deliver (lost leads), and mobile performance degradation (60%+ of mortgage research happens on mobile). All three are well-understood and preventable with the patterns documented in ARCHITECTURE.md and PITFALLS.md. There are no novel architectural challenges — this is a well-trodden problem domain with clear best practices at every step.

## Key Findings

### Recommended Stack

The base stack requires only five additions. Resend is the correct email delivery choice for a Vercel-deployed serverless environment — Nodemailer is not serverless-safe and EmailJS exposes API keys client-side. The mortgage calculator requires no library: a 10-line pure function implementing the standard amortization formula (`M = P * [r(1+r)^n] / [(1+r)^n - 1]`) is sufficient and easier to unit test. Spam protection at v1 is a honeypot field — zero dependencies, sufficient for low-volume traffic.

**Core technologies:**
- `react-hook-form` + `@hookform/resolvers`: Contact form state and Zod validation — minimal re-renders, widely adopted standard
- `resend`: Email delivery from Server Actions — purpose-built for serverless, 3,000/mo free tier
- `@vercel/analytics` + `@vercel/speed-insights`: Zero-config conversion tracking and Core Web Vitals monitoring on Vercel
- `next/image`, `next/font`, Metadata API, `app/sitemap.ts`: SEO, image optimization, and fonts are all covered by Next.js built-ins — no external libraries needed

### Expected Features

**Must have (table stakes):**
- NMLS number visible on every page — legally required under SAFE Act
- Hero section with strong above-the-fold CTA — primary conversion driver
- Phone number prominently displayed with `tel:` link — tap-to-call on mobile
- Services / loan types section — showcases products
- About / bio section — builds trust
- Contact form with email delivery — primary lead capture
- Mobile-responsive layout — 60%+ of traffic
- Testimonials — critical trust signal
- Footer with full legal disclosures (Equal Housing Lender, NMLS personal + company, RESPA/TILA disclaimer)
- SEO basics: meta tags, Open Graph, JSON-LD structured data

**Should have (differentiators):**
- Interactive mortgage calculator — increases engagement and time on site
- FAQ section — reduces visitor anxiety, improves long-tail SEO
- "How it works" process steps — reduces anxiety for first-time buyers
- Loan type explainer cards with pre-filled contact form — reduces friction
- Geographic market callout — local SEO signal

**Defer (v2+):**
- Blog / content marketing pages
- CRM integration
- hCaptcha or Cloudflare Turnstile (only if spam volume becomes a problem)
- Online loan application (out of scope — handled by Loan Factory systems)

### Architecture Approach

The site is a statically generated single page composed of ordered section components. `app/page.tsx` is a pure composition file with no logic. Most sections are Server Components — only `Header`, `CalculatorSection`, `FaqSection`, `ContactSection`, and `AnimatedSection` need `"use client"`. The contact form uses a Server Action in `app/actions.ts` rather than an API route, which React 19's `useActionState` makes trivial to wire up. The calculator is a pure function in `lib/calculator.ts` with `useState` in the component — no server involvement. All smooth scrolling is handled by native CSS `scroll-behavior: smooth`, requiring zero JavaScript.

**Major components:**
1. `app/layout.tsx` — HTML shell, static metadata, JSON-LD structured data (Server)
2. `Header` + `Footer` — Sticky navigation, phone CTA, NMLS and legal disclosures (Header = Client, Footer = Server)
3. `SectionWrapper` + `AnimatedSection` — Consistent anchor IDs, padding, Motion `whileInView` reveals
4. Static sections: `HeroSection`, `AboutSection`, `ServicesSection`, `TestimonialsSection` (all Server)
5. Interactive sections: `CalculatorSection`, `FaqSection`, `ContactSection` (all Client)
6. `app/actions.ts` — Server Action for contact form email delivery via Resend

### Critical Pitfalls

1. **Missing NMLS compliance disclosures** — Include personal NMLS #2528620 and company NMLS (Loan Factory #320841) in header and footer from the very first build; these are legal requirements, not optional polish
2. **Contact form silently failing to deliver leads** — Test Resend delivery end-to-end with real email addresses before launch; add explicit success/error states visible to the user
3. **Slow page load degrading conversions** — Default to Server Components, use `priority={true}` on the hero LCP image, and validate Core Web Vitals with `@vercel/speed-insights` before launch (target: LCP < 2.5s)
4. **Poor mobile UX losing 60%+ of visitors** — Enforce mobile-first Tailwind (base = mobile, `md:` = desktop) from Phase 1; phone number must be a `tel:` link; form inputs need 44px minimum tap targets
5. **Calculator accuracy creating liability** — Use the standard amortization formula, label output as "estimate — Principal & Interest only," and unit test against known values

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation and Compliance Shell
**Rationale:** Compliance elements (NMLS, Equal Housing disclosures) are legal requirements that must exist before any other content. The global design tokens, fonts, and layout skeleton unblock all subsequent phases. Building this first means no section is ever shipped without required disclosures.
**Delivers:** `globals.css`, `app/layout.tsx`, `SectionWrapper`, `AnimatedSection`, `Header`, `Footer` (with full NMLS and legal disclosures)
**Addresses:** Sticky header with navigation, NMLS display, footer legal disclosures
**Avoids:** NMLS compliance pitfall — disclosures are baked in from day one, not retrofitted

### Phase 2: Static Content Sections
**Rationale:** These sections have no interactivity and no external dependencies. Building them as pure Server Components keeps them fast and testable in isolation. Visual order matches the page's reading order, making review straightforward.
**Delivers:** `HeroSection` (with above-fold CTA), `AboutSection`, `ServicesSection` (with loan type cards), `TestimonialsSection`
**Addresses:** Hero + CTA table stake, services listing, about/bio, testimonials/social proof
**Avoids:** Missing CTA above the fold, generic testimonials without credibility context

### Phase 3: Interactive Sections
**Rationale:** Calculator, FAQ accordion, and contact form all require client components and have distinct build concerns. Grouping them together surfaces integration issues at a single point. Contact form email delivery must be verified end-to-end before this phase is considered complete.
**Delivers:** `lib/calculator.ts` + `CalculatorSection`, `FaqSection` (shadcn Accordion), `app/actions.ts` + `ContactSection` with honeypot spam protection
**Addresses:** Mortgage calculator differentiator, FAQ SEO benefit, contact form lead capture
**Avoids:** Calculator accuracy pitfall (pure function + unit tests), form delivery failure (Resend test mode + explicit UI states), form spam (honeypot field)

### Phase 4: SEO and Analytics
**Rationale:** SEO metadata must be written after content is finalized — title tags and structured data referencing specific loan types and geography cannot be drafted before Phase 2 is complete. Analytics should be added before launch, not after, to capture baseline traffic from day one.
**Delivers:** `lib/structured-data.ts` (JSON-LD `Person` + `LocalBusiness`), `app/sitemap.ts`, `app/robots.ts`, Open Graph image, `@vercel/analytics` in root layout, keyword-rich page title
**Addresses:** SEO table stake, Open Graph social preview differentiator, conversion tracking
**Avoids:** SEO missed opportunities pitfall, missing analytics from day one

### Phase 5: Polish and Launch Validation
**Rationale:** Performance, accessibility, and animation quality are cross-cutting concerns that can only be fully audited once all sections exist. This phase catches accumulated debt before real traffic arrives.
**Delivers:** Core Web Vitals validation (LCP < 2.5s, CLS < 0.1, INP < 200ms), mobile testing on real devices, animation audit (`viewport={{ once: true }}`, 300-500ms durations, `prefers-reduced-motion`), `app/not-found.tsx`, favicon and OG image, end-to-end contact form delivery test with real email
**Addresses:** Performance table stake, accessibility lower-priority pitfall, over-animation pitfall, missing error page and favicon

### Phase Ordering Rationale

- Compliance first because legal exposure is the highest-severity risk and the footer/header must be built before sections are added anyway
- Static sections before interactive because they unblock content review by Prashanna and have no blocking dependencies
- Interactive sections grouped because their shared characteristic (client components, external integrations) means lessons from one transfer directly to the next
- SEO after content because structured data and meta descriptions require final copy to be meaningful
- Polish last because it is inherently a review of everything that came before

### Research Flags

Phases with standard patterns (no additional research needed):
- **Phase 1:** Next.js App Router layout and Tailwind globals are well-documented; no unknowns
- **Phase 2:** Pure Server Components rendering static content — textbook pattern
- **Phase 4:** Next.js Metadata API, `sitemap.ts`, and `robots.ts` are official conventions with high-confidence docs
- **Phase 5:** Performance and accessibility audit is a checklist activity, not a research problem

Phases that may benefit from targeted research during planning:
- **Phase 3 (Contact form):** Verify the exact `useActionState` + Server Action wire-up in Next.js 16.1.6 against current docs before implementation — the API stabilized recently and examples vary across versions
- **Phase 3 (Calculator):** Confirm shadcn Accordion component API and required CLI add command before starting `FaqSection`

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All library choices verified against official docs and current versions; rejected alternatives clearly documented |
| Features | HIGH | Compliance requirements sourced from SAFE Act and Fair Housing Act; feature prioritization is domain-standard for loan officer sites |
| Architecture | HIGH | All patterns sourced from Next.js 16.1.6 and React 19 official docs; Server Action + `useActionState` pattern confirmed |
| Pitfalls | HIGH | Compliance pitfalls are regulatory facts; performance targets are industry-standard Core Web Vitals thresholds |

**Overall confidence:** HIGH

### Gaps to Address

- **Real testimonials content:** If Prashanna does not have testimonials ready at build time, the `TestimonialsSection` should be skipped in Phase 2 and added post-launch rather than using placeholder copy
- **Geographic markets:** The geographic callout and SEO title require Prashanna to confirm which states/areas he is licensed to operate in before Phase 4 can be completed
- **Resend domain verification:** The Resend API requires a verified sending domain (or use of their sandbox for dev). This must be set up before Phase 3 contact form testing — it is an account/DNS task, not a code task
- **Motion 12.x API:** `whileInView` and `viewport` prop behavior on Motion 12.36.0 was confirmed via `package.json` but not against the Motion changelog directly — validate `motion/react` import path at the start of Phase 2

## Sources

### Primary (HIGH confidence)
- `nextjs.org/docs/app/getting-started/updating-data` — Server Actions, `useActionState` pattern
- `nextjs.org/docs/app/getting-started/images` — `next/image` optimization and `priority` prop
- `nextjs.org/docs/app/getting-started/metadata-and-og-images` — Metadata API, OG image convention
- `react.dev/reference/react/useActionState` — React 19 `useActionState` hook API
- SAFE Act / NMLS Consumer Access — NMLS disclosure requirements on marketing materials
- Fair Housing Act — Equal Housing Lender logo and text requirement

### Secondary (MEDIUM confidence)
- Motion 12.36.0 (`package.json` confirmed version) — `whileInView`/`viewport` API; `motion/react` import path inferred from installed version
- Industry benchmarks — "every second of load delay reduces conversions ~7%" and "60% of mortgage research on mobile" are widely cited conversion optimization figures

### Tertiary (LOW confidence)
- Geographic SEO impact — specific local SEO ranking factors for loan officers are inferred from general LocalBusiness structured data guidance; exact benefit will vary by market competition

---
*Research completed: 2026-03-12*
*Ready for roadmap: yes*
