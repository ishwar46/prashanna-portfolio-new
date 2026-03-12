# Features Research: Loan Officer Portfolio Website

## Table Stakes

Features users expect. Missing any of these and visitors bounce.

| Feature | Complexity | Notes |
|---------|-----------|-------|
| Hero section with strong CTA | Low | Above-the-fold headline + "Get Started" / "Contact Me" button + professional photo |
| NMLS number display | Low | **Legally required** under SAFE Act — must be visible on every page/section |
| Phone number visibility | Low | Prominent on sticky header + hero + contact section — primary conversion action |
| Services / loan types section | Medium | Showcase all loan products (Conventional, FHA, VA, USDA, Jumbo, DSCR, etc.) |
| About / bio section | Low | Prashanna's story, credibility, humanize the brand |
| Contact form | Medium | Name, phone, email, message — primary lead capture mechanism |
| Mobile-responsive layout | Medium | 60%+ of mortgage research happens on mobile |
| Fast page load | Medium | Sub-3s load time — every second of delay kills conversions |
| SEO basics | Medium | Meta tags, Open Graph, JSON-LD LocalBusiness structured data |
| Testimonials / social proof | Low-Medium | Client reviews and success stories — critical trust signal |
| Sticky header with navigation | Low | Logo, nav links, phone number — always accessible |
| Smooth-scroll single-page UX | Low | Anchor navigation between sections |
| SSL / HTTPS | Low | Handled by Vercel automatically |
| Footer with legal disclosures | Low | Equal Housing Lender, NMLS, company info, disclaimer text |

## Differentiators

Features that set Prashanna apart from generic loan officer sites.

| Feature | Complexity | Notes |
|---------|-----------|-------|
| Interactive mortgage calculator | High | Monthly payment estimator — engages visitors, builds trust, increases time on site |
| FAQ section | Low | Common loan process questions — reduces friction, improves SEO with long-tail keywords |
| Loan type explainer cards | Medium | Brief descriptions of each loan type with "who it's for" — educates visitors |
| "How it works" process section | Low | 3-4 step visual process (Apply → Review → Approve → Close) — reduces anxiety |
| Geographic market callout | Low | Mention serving specific areas/states — helps local SEO |
| Trust badges / affiliations | Low | Loan Factory branding, Equal Housing Lender logo, any certifications |
| Pre-filled contact form from service cards | Medium | Click a loan type → contact form pre-selects that service — reduces friction |
| Google Analytics / conversion tracking | Medium | Track form submissions, phone clicks, scroll depth — measure ROI |
| Open Graph social preview | Low | Custom image + description when link is shared on social media |
| Performance-first image strategy | Medium | next/image optimization, WebP, lazy loading — fast load on all devices |

## Anti-Features

Things to deliberately NOT build. Including reasoning to prevent scope creep.

| Feature | Why Not |
|---------|---------|
| Online loan application | Handled by Loan Factory systems — not this site's job |
| Blog / content pages | Not v1 — focus on lead gen first, add for SEO later |
| Calendly / scheduling widget | Prashanna prefers manual follow-up — lower friction without it |
| Live chat widget | Adds complexity, requires monitoring — contact form is sufficient |
| Live rate ticker | Rates change constantly, compliance risk if displayed incorrectly |
| User accounts / login | No need for a portfolio site |
| CRM integration | Prashanna follows up manually — defer to v2 if volume grows |
| Social media feed embeds | Slows page load, adds visual clutter, often stale content |
| Animated loading screen | Unnecessary delay — site should load instantly |
| Dark mode toggle | Not needed for a lead-gen site — one clean design |
| Multi-language support | English only for v1 |

## Feature Dependencies

```
NMLS Display ──────────────────────── blocks launch (legal requirement)
Footer Legal Disclosures ──────────── blocks launch (compliance)
Sticky Header ─────────────────────── needed before sections (navigation)
Hero Section ──────────────────────── first section, sets tone
Services Section ──────────────────── feeds into pre-filled contact form
About Section ─────────────────────── standalone
Testimonials ──────────────────────── standalone
FAQ Section ───────────────────────── standalone
Mortgage Calculator ───────────────── standalone (complex, can be built in parallel)
Contact Form ──────────────────────── requires serverless handler for email delivery
  └── Pre-filled from services ────── depends on both services + form
Analytics / Tracking ──────────────── add after core sections built
SEO / Structured Data ────────────── add after content is finalized
```

## MVP Build Order

1. Layout shell (sticky header, footer with compliance, smooth scroll)
2. Hero section with CTA
3. Services / loan types
4. About / bio
5. Testimonials
6. FAQ
7. Contact form with serverless handler
8. Mortgage calculator
9. SEO + structured data + analytics
10. Polish, animations, performance optimization

**Post-v1:**
- Blog / content marketing
- CRM integration

## Compliance Notes

| Requirement | Source | Implementation |
|-------------|--------|---------------|
| NMLS number visible | SAFE Act | Display in header, footer, and about section |
| Equal Housing Lender | Fair Housing Act | Logo + text in footer |
| Company NMLS (Loan Factory #320841) | SAFE Act | Footer alongside personal NMLS |
| RESPA/TILA disclaimer | Federal regulation | Footer disclaimer text about not being a commitment to lend |
| State licensing info | State regulations | Footer or dedicated disclosure if required by states served |

These are **non-negotiable constraints**, not optional features.
