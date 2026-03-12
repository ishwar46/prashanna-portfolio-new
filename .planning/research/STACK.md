# Stack Research: Loan Officer Portfolio Website

**Domain:** Loan officer lead-generation portfolio site
**Researched:** 2026-03-12
**Base stack:** Next.js 16.1.6, React 19.2.3, Tailwind CSS v4, shadcn/ui CLI v4, Motion 12.36

## Libraries to Add

| Library | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| `react-hook-form` | ^7.54 | Form state management, validation, minimal re-renders | HIGH |
| `@hookform/resolvers` | ^3.10 | Zod integration for react-hook-form | HIGH |
| `resend` | ^4.x | Email delivery from serverless functions (3,000/mo free) | HIGH |
| `@vercel/analytics` | latest | Page views, conversion tracking — zero-config on Vercel | HIGH |
| `@vercel/speed-insights` | latest | Core Web Vitals monitoring — zero-config on Vercel | HIGH |

### Install Command

```bash
npm install react-hook-form @hookform/resolvers resend @vercel/analytics @vercel/speed-insights
```

## Already Covered by Next.js 16 (No External Library Needed)

| Capability | Built-in Solution | Notes |
|-----------|-------------------|-------|
| SEO meta tags | `Metadata` API in `layout.tsx` | Handles title, description, OG, Twitter cards, robots, canonical |
| Structured data | Inline `<script type="application/ld+json">` | `Person` schema for Prashanna, `FAQPage` for FAQ section |
| Image optimization | `next/image` | WebP/AVIF conversion, LCP optimization, responsive sizes |
| Fonts | `next/font/google` | Already using Geist — zero CLS, no external requests |
| Sitemap | `app/sitemap.ts` file convention | Auto-generates sitemap.xml |
| Robots | `app/robots.ts` file convention | Auto-generates robots.txt |

## No Library Needed

| Capability | Approach | Rationale |
|-----------|----------|-----------|
| Mortgage calculator | 10-line amortization formula in `lib/calculator.ts` | Standard formula: `M = P * [r(1+r)^n] / [(1+r)^n - 1]` — no library needed |
| Spam protection (MVP) | Honeypot field | Zero dependencies, sufficient for v1 volume |
| Smooth scroll | CSS `scroll-behavior: smooth` | Native browser support, no JS needed |

## Rejected Libraries

| Library | Why Not |
|---------|---------|
| `Formik` | Stagnant development, react-hook-form is the standard |
| `Nodemailer` | Not serverless-safe — Resend is purpose-built for Vercel |
| `EmailJS` | Client-side API key exposure risk |
| `next-seo` | Pages Router legacy — obsolete with App Router Metadata API |
| `Google Analytics` | Cookie consent overhead — Vercel Analytics is simpler and privacy-friendly |
| `Cloudinary` | Overkill for a few images — next/image handles everything |
| `financial.js` | Unmaintained — calculator math is trivial to implement |

## Environment Variables

```env
# Required
RESEND_API_KEY=re_xxxxx          # Resend API key for contact form emails
CONTACT_EMAIL=prashanna@loanfactory.com  # Where form submissions go

# Optional (auto-configured on Vercel)
# VERCEL_ANALYTICS_ID            # Auto-injected by Vercel
```

## Post-MVP Additions

| Library | When | Purpose |
|---------|------|---------|
| `@hcaptcha/react-hcaptcha` or Cloudflare Turnstile | If spam volume increases | Bot protection for contact form |
| `next-mdx-remote` | If blog added in v2 | MDX content rendering |
