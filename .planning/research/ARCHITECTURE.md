# Architecture Research: Loan Officer Portfolio Website

**Domain:** Single-page lead-generation portfolio site (loan officer)
**Researched:** 2026-03-12
**Stack:** Next.js 16.1.6 App Router, React 19.2.3, Tailwind CSS v4, Motion 12.36, shadcn/ui

## Recommended Directory Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: metadata, fonts, JSON-LD, OG tags
│   ├── page.tsx            # Single page: composes all sections in order
│   ├── globals.css         # Design tokens, Tailwind theme
│   ├── actions.ts          # Server Action: contact form → email delivery
│   ├── favicon.ico
│   └── opengraph-image.jpg # Static OG image (1200×630)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav, anchor links, phone CTA
│   │   └── Footer.tsx          # NMLS disclosure, copyright
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CalculatorSection.tsx   # "use client" — useState for inputs
│   │   ├── FaqSection.tsx          # "use client" — shadcn Accordion
│   │   └── ContactSection.tsx      # "use client" — useActionState
│   ├── shared/
│   │   ├── SectionWrapper.tsx      # id anchor + consistent padding
│   │   └── AnimatedSection.tsx     # "use client" — Motion whileInView
│   └── ui/                         # shadcn/ui primitives
│
├── lib/
│   ├── utils.ts                # cn() class merge
│   ├── calculator.ts           # Pure: calculateMonthlyPayment()
│   └── structured-data.ts      # JSON-LD LocalBusiness + Person builders
│
└── hooks/
    └── useSmoothScroll.ts      # Optional: IntersectionObserver for active nav
```

## Component Boundaries

| Component | Responsibility | Server/Client |
|-----------|---------------|---------------|
| `app/layout.tsx` | HTML shell, static metadata, JSON-LD | Server |
| `app/page.tsx` | Composes sections — no logic | Server |
| `app/actions.ts` | Email delivery via Server Action | Server |
| `Header` | Sticky nav, phone number | Client (sticky behavior) |
| `Footer` | NMLS disclosure | Server |
| `SectionWrapper` | `id` anchor, padding, max-width | Server |
| `AnimatedSection` | Motion `whileInView` reveal | Client |
| `HeroSection` | Static content, CTA buttons | Server |
| `ServicesSection` | Loan type cards | Server |
| `AboutSection` | Bio, photo | Server |
| `TestimonialsSection` | Review cards | Server |
| `CalculatorSection` | Interactive mortgage calc | Client |
| `FaqSection` | Accordion FAQ | Client |
| `ContactSection` | Lead capture form | Client |

## Data Flow

### Static Generation (build time)

`next build` generates all HTML. `app/layout.tsx` exports the `metadata` object (title, OG, Twitter). `lib/structured-data.ts` builds the JSON-LD `<script>` block. `app/page.tsx` renders all sections to static HTML. Vercel serves from CDN edge — no server round-trip on page load.

### Contact Form (runtime)

`ContactSection` uses `useActionState(submitContactForm, initialState)` and passes `dispatch` as the `form action`. On submit, Next.js POSTs to the Server Action in `app/actions.ts`, which validates with Zod and sends email via Resend (or Nodemailer). Returns `{ success: true }` or `{ fieldErrors: {...} }`. `isPending` drives the submit button loading state.

### Calculator (client-only)

`useState` in `CalculatorSection` feeds `lib/calculator.ts:calculateMonthlyPayment(principal, rate, months)`. Pure function, no server round-trip, synchronous result.

### Smooth Scroll

Native CSS `scroll-behavior: smooth` on `<html>`. No JavaScript needed. Header `href="#contact"` anchors into `<section id="contact">`.

## Key Patterns

- **Server Actions over API routes** for the contact form — React 19's `useActionState` gives progressive enhancement, pending state, and field errors without a manual `fetch`. No `app/api/contact/route.ts` needed.
- **Server Components by default** — only `CalculatorSection`, `FaqSection`, `ContactSection`, `Header`, and `AnimatedSection` are client components. All other sections are server-rendered, keeping JS payload small.
- **`viewport={{ once: true }}`** on all Motion animations — sections animate in once, not every time scrolled past. Prevents distraction and reduces observer overhead.
- **Static image imports** over string paths — `import photo from '@/public/images/prashanna.jpg'` auto-provides `blurDataURL`, dimensions, and `placeholder="blur"` support. Hero photo uses `priority={true}` to front-load the LCP image.

## Anti-Patterns to Avoid

- `"use client"` on content sections to make animations easier — eliminates static generation and bloats JS bundle
- API route for contact form — Server Action + `useActionState` is simpler and built-in
- Calculator formula embedded in component — belongs in `lib/calculator.ts` as a pure function
- Separate routes (`/services`, `/about`) instead of anchor scroll — breaks single-page UX
- Motion animations on individual text blocks and icons — animate sections only, not every element

## Component Build Order

```
Phase 1 — Foundation
  globals.css → layout.tsx → SectionWrapper → AnimatedSection

Phase 2 — Layout Shell
  Header → Footer

Phase 3 — Static Sections (build in visual order, no interactivity)
  HeroSection → AboutSection → ServicesSection → TestimonialsSection

Phase 4 — Interactive Sections
  lib/calculator.ts → CalculatorSection
  FaqSection (needs shadcn Accordion added first)
  app/actions.ts → ContactSection

Phase 5 — SEO + Production
  structured-data.ts → opengraph-image.jpg → favicon.ico
```

## Sources (confirmed current)

- Next.js 16.1.6 Server Actions: `nextjs.org/docs/app/getting-started/updating-data` — HIGH confidence
- Next.js 16.1.6 Image Optimization: `nextjs.org/docs/app/getting-started/images` — HIGH confidence
- Next.js 16.1.6 Metadata/OG: `nextjs.org/docs/app/getting-started/metadata-and-og-images` — HIGH confidence
- React 19 `useActionState`: `react.dev/reference/react/useActionState` — HIGH confidence
- Motion 12.x `whileInView`/`viewport` API: MEDIUM confidence (confirmed `motion/react` import from `package.json motion@12.36.0`)
