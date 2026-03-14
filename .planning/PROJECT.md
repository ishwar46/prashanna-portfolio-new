# Prashanna Sangroula — Portfolio Website

## What This Is

A lead-generation portfolio website for Prashanna Sangroula — a **Mortgage Loan Officer** (NMLS #2528620) at Loan Factory, Inc. and a **licensed Realtor** (VA License #225273183) at oNest Real Estate, Fairfax, VA. The site serves as his standalone professional presence designed to build trust and convert visitors into consultation leads through a contact form, phone CTAs, and professional credibility.

## Core Value

Visitors trust Prashanna enough to submit a contact form or call him within one session.

## Requirements

### Validated

- ✓ Hero section with headline, CTA, professional photo, dot-grid background — v1.0
- ✓ Services section with 14 loan types + 3 real estate services, category filter tabs — v1.0
- ✓ About section with dual-role bio, overlapping stats card, professional photo — v1.0
- ✓ Client testimonials with real Google reviews — v1.0
- ✓ Interactive mortgage calculator with real-time P&I estimates — v1.0
- ✓ FAQ accordion with 8 loan process questions — v1.0
- ✓ Contact form with Zod validation, nodemailer email delivery, honeypot — v1.0
- ✓ Phone numbers visible on header, hero, contact panel, footer — v1.0
- ✓ Single-page layout with smooth scroll anchor navigation — v1.0
- ✓ Navy/gold editorial design with scroll animations — v1.0
- ✓ Mobile-responsive at 375px with no horizontal scroll — v1.0
- ✓ SEO: metadata, dynamic OG image, JSON-LD (Person + LocalBusiness + RealEstateAgent) — v1.0
- ✓ Sitemap, robots.txt, Vercel Analytics + Speed Insights — v1.0
- ✓ LCP 1.8s, CLS 0, WCAG-compliant color contrast — v1.0
- ✓ PS monogram favicon — v1.0

### Active

(None — ship to validate in next milestone)

### Out of Scope

- Blog / content marketing — consider for SEO in v2
- Online application / loan origination — handled by Loan Factory systems
- User accounts / login — not needed for a portfolio site
- Payment processing — not applicable
- Multi-language support — English only for now
- CRM integration — Prashanna follows up manually
- Dark mode — not requested

## Context

- **Shipped:** v1.0 MVP (2026-03-14), 2,552 LOC TypeScript/TSX
- **Tech stack:** Next.js 16.1, React 19.2, Tailwind CSS v4, shadcn/ui, Motion 12.36
- **Dual role:** Mortgage (Loan Factory, 246+ lenders, 12 states) + Real Estate (oNest, Fairfax VA)
- **Contact:** (571) 222-5555 (mortgage), (703) 321-6914 (real estate)
- **Office:** 9697 Main St, Fairfax, VA 22031
- **Deployment:** Ready for Vercel — needs NEXT_PUBLIC_SITE_URL and SMTP env vars

## Constraints

- **Tech stack:** Next.js 16.1, React 19.2, Tailwind CSS v4, shadcn/ui CLI v4, Motion 12.36
- **Deployment:** Vercel (free tier initially, custom domain later)
- **Design:** Navy/gold editorial aesthetic — dot-grid patterns, gold accents, refined typography
- **Compliance:** NMLS #2528620 and VA Real Estate License #225273183 must be displayed
- **Form handling:** Nodemailer with Gmail SMTP — no backend/database needed

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-page layout | Simpler UX for lead gen — fewer clicks to CTA | ✓ Good |
| Next.js 16.1 + Tailwind v4 | Latest stack, SSG for speed + SEO, easy Vercel deploy | ✓ Good |
| Contact form over Calendly | Prashanna prefers manual follow-up, lower friction | ✓ Good |
| No blog in v1 | Focus on core lead gen first | ✓ Good — consider for v2 |
| Nodemailer over Resend | Resend domain not verified; Gmail SMTP works now | ✓ Good |
| Navy/gold editorial design | Trust/finance aesthetic, unique and memorable | ✓ Good |
| Dual role (Mortgage + Realtor) | Competitive advantage — one professional for everything | ✓ Good |
| LazyMotion for animations | Reduces TBT, tree-shakes Motion bundle | ✓ Good |
| WebP hero image | 348KB PNG → 28KB WebP, major LCP improvement | ✓ Good |

---
*Last updated: 2026-03-14 after v1.0 milestone*
