# Phase 2: Static Content Sections - Research

**Researched:** 2026-03-13
**Domain:** Next.js 16 static content sections (Hero, Services, About, Testimonials) with Tailwind CSS v4
**Confidence:** HIGH

## Summary

Phase 2 replaces placeholder content in `page.tsx` with four fully-realized sections: Hero, Services, About, and Testimonials. All sections are React Server Components with static content -- no interactivity beyond anchor link clicks. The existing `SectionWrapper` component, `SECTION_IDS` constants, and navy/gold design tokens from Phase 1 provide the foundation.

The primary technical considerations are: (1) the Hero section needs a custom navy gradient background that overrides `SectionWrapper`'s default `bg-background`, (2) service card clicks must pass a loan type identifier to the Phase 3 contact form via URL hash parameters, (3) placeholder images use CSS-generated avatars (not `next/image`) since no real photos exist yet, and (4) Tailwind v4 uses `bg-linear-to-*` (not `bg-gradient-to-*`) for gradients.

**Primary recommendation:** Build four Server Component files (`HeroSection`, `ServicesSection`, `AboutSection`, `TestimonialsSection`), add `SERVICES` and `TESTIMONIALS` data arrays to `constants.ts`, and use `<a href="#contact?service=slug">` links on service cards for Phase 3 pre-selection.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Hero: Split layout (text/CTA left, headshot right), navy gradient background with white text, "Get a Free Consultation" CTA scrolls to #contact, placeholder headshot, stacks vertically on mobile
- Services: 3-column grid (desktop), 2 (tablet), 1 (mobile), gold accent on each card (top border or large number, no icons), entire card clickable scrolling to #contact with pre-selection, 11 loan types, data stored in constants.ts
- About: Side-by-side layout (photo left, bio right), stacks vertically on mobile, personal journey angle, placeholder bio and photo, 2-3 key stats/highlights below bio
- Testimonials: Static 3-card grid (3 desktop, 1 mobile), each card has quote text + client name as "First LastInitial." + loan type context, 3 placeholder testimonials, no carousel

### Claude's Discretion
- Exact hero headline and subtext copy
- Headshot placeholder design (initials circle, silhouette, etc.)
- Service card hover animation style
- Bio placeholder copy (based on known details)
- Stat highlight box styling
- Testimonial card visual treatment (quote marks, borders, etc.)
- Card pre-selection mechanism for contact form (query param, URL hash, or global state)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Hero section with compelling headline and subtext | Server Component with navy gradient bg, split layout, responsive stacking |
| HERO-02 | Primary CTA button ("Get a Free Consultation") linking to contact form | `<a href="#contact">` with Button component styled as gold/accent variant |
| HERO-03 | Professional headshot photo with optimized loading (LCP priority) | CSS placeholder for now; when real photo added, use `next/image` with `preload` prop |
| SERV-01 | Services section displaying all loan types as cards | 11 cards in responsive grid from SERVICES constant array |
| SERV-02 | Each card has loan type name, brief description, and "who it's for" | Data structure: `{ name, slug, description, audience }` in constants.ts |
| SERV-03 | Clicking a service card navigates to contact form with that service pre-selected | URL hash approach: `#contact?service=slug` -- Phase 3 form reads this |
| ABOUT-01 | About section with Prashanna's bio and story | Placeholder bio copy based on known details, personal journey tone |
| ABOUT-02 | Professional photo in about section | CSS placeholder matching hero headshot style |
| TEST-01 | Testimonials section with client reviews | 3 placeholder testimonials in static grid, different loan types |
| TEST-02 | Each testimonial includes name (first + last initial), context, and quote | Data structure: `{ name, context, quote }` in TESTIMONIALS array |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, Server Components | Already installed, provides `next/image` for future real photos |
| React | 19.2.3 | UI rendering | Already installed |
| Tailwind CSS | v4 | Styling, responsive layout, gradients | Already installed, CSS-native config in globals.css |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| class-variance-authority | 0.7.1 | Button variants | Hero CTA button styling |
| clsx + tailwind-merge | via `cn()` | Conditional class names | Merging SectionWrapper overrides |
| Lucide React | 0.577.0 | Icons (minimal use) | Only if functionally necessary per CLAUDE.md |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS placeholder avatars | `next/image` with placeholder files | Real photos not available yet; CSS is simpler and avoids unnecessary image optimization setup |
| URL hash for service pre-selection | React context/global state | URL hash is simpler, works without client components, and is bookmarkable; Phase 3 can read it |

**Installation:**
No new packages needed. All dependencies are already installed.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── page.tsx                    # Import and compose all section components
│   └── globals.css                 # Existing design tokens (no changes needed)
├── components/
│   ├── layout/
│   │   └── SectionWrapper.tsx      # Existing (no changes needed)
│   └── sections/
│       ├── HeroSection.tsx         # NEW: Hero with navy gradient
│       ├── ServicesSection.tsx     # NEW: Service cards grid
│       ├── AboutSection.tsx       # NEW: Bio + photo + stats
│       └── TestimonialsSection.tsx # NEW: Testimonial cards
└── lib/
    └── constants.ts                # ADD: SERVICES[] and TESTIMONIALS[] arrays
```

### Pattern 1: Server Component Sections
**What:** Each section is a standalone React Server Component that receives no props and reads data from constants
**When to use:** All four Phase 2 sections -- they are purely static with no interactivity
**Example:**
```typescript
// Source: Established pattern from Phase 1 SectionWrapper usage
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

export function HeroSection() {
  return (
    <SectionWrapper
      id={SECTION_IDS.hero}
      className="bg-linear-to-br from-navy-900 via-navy-800 to-navy-950 pt-20"
    >
      {/* Hero content */}
    </SectionWrapper>
  );
}
```

### Pattern 2: Data-Driven Card Rendering
**What:** Card content defined in a typed constant array, rendered via `.map()`
**When to use:** Services cards and testimonials cards
**Example:**
```typescript
// Source: Follows constants.ts pattern from Phase 1
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
    description: "Traditional financing with competitive rates...",
    audience: "Buyers with good credit and 3-20% down payment",
  },
  // ... 10 more
];
```

### Pattern 3: Hero Gradient Override of SectionWrapper
**What:** Override SectionWrapper's default `bg-background` or `bg-secondary` with a custom gradient via `className` prop
**When to use:** Hero section only -- needs full-bleed navy gradient
**Example:**
```typescript
// SectionWrapper accepts className and merges via cn()
// The gradient classes override the default bg-background
<SectionWrapper
  id={SECTION_IDS.hero}
  className="bg-linear-to-br from-navy-900 via-navy-800 to-navy-950 pt-20"
>
```

**Important Tailwind v4 note:** Gradient utilities changed from v3 to v4:
- v3: `bg-gradient-to-r` (WRONG in this project)
- v4: `bg-linear-to-r` (CORRECT in this project)

### Pattern 4: Service Card Pre-Selection via URL Hash
**What:** Service cards link to `#contact?service=slug` -- the Phase 3 contact form will parse this
**When to use:** SERV-03 requirement
**Example:**
```typescript
// Service card as an anchor link
<a
  href={`#contact?service=${service.slug}`}
  className="group block rounded-xl border-t-4 border-t-gold-500 bg-card p-6 transition-shadow hover:shadow-lg"
>
  <h3 className="text-lg font-bold text-foreground">{service.name}</h3>
  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
  <p className="mt-3 text-sm font-medium text-gold-700">Best for: {service.audience}</p>
</a>
```

**Why URL hash over global state:** The `#contact?service=conventional` approach:
1. Works in Server Components (no `"use client"` needed)
2. Is bookmarkable/shareable
3. Phase 3's contact form (a Client Component) can read `window.location.hash` on mount
4. Browser natively scrolls to `#contact` element
5. No state management library needed

**Alternative if hash params cause issues:** Use separate hash fragments like `#contact-conventional` and parse the suffix. Simpler but less standard.

### Pattern 5: CSS Placeholder Avatars
**What:** Styled div with initials instead of an actual image
**When to use:** Hero headshot and About photo until real photos are provided
**Example:**
```typescript
// Placeholder headshot -- no next/image needed
<div className="flex size-64 items-center justify-center rounded-full bg-navy-700 text-5xl font-bold text-gold-400 md:size-80">
  PS
</div>
```

When real photos are added later, replace with:
```typescript
import Image from "next/image";

<Image
  src="/images/prashanna-headshot.jpg"
  alt="Prashanna Sangroula"
  width={320}
  height={320}
  preload  // Next.js 16 uses preload instead of priority
  className="rounded-full object-cover"
/>
```

### Anti-Patterns to Avoid
- **"use client" for static sections:** All Phase 2 sections are Server Components. Do not add `"use client"` -- there is no interactivity (scroll is handled by native `<a href="#...">` links)
- **Hardcoded Tailwind colors:** Per CLAUDE.md, never use `bg-blue-500` etc. Use `bg-navy-*`, `bg-gold-*`, and semantic tokens (`bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`)
- **`bg-gradient-to-*` syntax:** This is Tailwind v3. In v4, use `bg-linear-to-*`
- **`priority` prop on next/image:** Deprecated in Next.js 16. Use `preload` instead
- **Icons on service cards:** CLAUDE.md says "Minimal icons -- do not litter the UI." Use gold accent border, not icons
- **Using `framer-motion` import:** Must use `import { motion } from "motion/react"` -- but Phase 2 sections should not need animations (Phase 5 scope)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Section containers | Custom section layout with padding/max-width | `SectionWrapper` component | Already handles padding, max-width, alternate backgrounds, and id attributes |
| Responsive grid | Custom media query breakpoints | Tailwind `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | Standard responsive pattern |
| Button styling | Custom CTA button | `Button` component with CVA variants | Consistent with rest of site, handles focus states |
| Smooth scroll | Custom JS scroll handler | Native `<a href="#id">` | `html { scroll-behavior: smooth; scroll-padding-top: 5rem; }` already set in globals.css |
| Class merging | Manual className concatenation | `cn()` utility | Already available, handles Tailwind class conflicts |

**Key insight:** Phase 1 established the component foundation (`SectionWrapper`, `Button`, `cn()`, design tokens). Phase 2 should consume these, not reinvent them.

## Common Pitfalls

### Pitfall 1: Tailwind v4 Gradient Syntax
**What goes wrong:** Using `bg-gradient-to-r` (v3 syntax) instead of `bg-linear-to-r` (v4 syntax) -- gradient silently fails, no background appears
**Why it happens:** Most tutorials and AI training data reference Tailwind v3
**How to avoid:** Always use `bg-linear-to-{direction}` with `from-*`, `via-*`, `to-*` color stops
**Warning signs:** Background appears as transparent/white when gradient was expected

### Pitfall 2: SectionWrapper Background Override
**What goes wrong:** Adding gradient classes but they don't override `SectionWrapper`'s `bg-background` or `bg-secondary`
**Why it happens:** `cn()` uses `tailwind-merge` which should handle this, but only if both are recognized as the same "group"
**How to avoid:** Pass gradient classes via `className` prop. The `cn()` in SectionWrapper merges correctly because `bg-linear-to-*` and `bg-background` are both `bg-*` utilities. However, if `alternate` is also true, both `bg-secondary` and the gradient would conflict -- so don't pass `alternate` for the hero section
**Warning signs:** Two background colors fighting each other

### Pitfall 3: Hero Section Missing Padding for Fixed Header
**What goes wrong:** Hero content hidden behind the fixed header
**Why it happens:** Header is `fixed top-0` with `py-3` -- roughly 60-80px tall
**How to avoid:** The hero section already has `className="pt-20"` in the current `page.tsx` -- preserve this. The `scroll-padding-top: 5rem` in globals.css handles anchor scrolling
**Warning signs:** First line of hero text not visible on page load

### Pitfall 4: Hash Fragment with Query Parameters
**What goes wrong:** Using `#contact?service=conventional` -- the browser treats the entire string after `#` as the fragment identifier, so `document.getElementById("contact?service=conventional")` fails
**Why it happens:** Fragment identifiers don't support query parameter syntax natively
**How to avoid:** The browser will NOT auto-scroll to `#contact?service=conventional` because no element has that ID. Two viable alternatives:
1. **Recommended:** Use `#contact` as the href and store the service in a URL search parameter: `/path?service=conventional#contact`. This requires the page to be a single-page app (which it is).
2. **Simpler fallback:** Use hash only `#contact` and encode service in a data attribute or custom event. Phase 3 client component reads the service from the URL search params.

**Revised recommendation:** Use standard URL query parameters `?service=slug#contact`. The `<a>` tag becomes:
```html
<a href="?service=conventional#contact">
```
This way the browser auto-scrolls to `#contact` AND the service is available via `URLSearchParams`. However, this causes a page navigation in Next.js App Router. For a pure SPA approach, use a thin client wrapper component for service cards that calls `window.history.replaceState` + `scrollIntoView`.

**Simplest viable approach:** Make service cards `<a href="#contact">` links that also set a URL search param programmatically. Since this requires JS (client), consider: a tiny client component wrapper around just the card link behavior OR use a simpler approach of just scrolling to contact and letting users manually select the loan type. The pre-selection is a Phase 3 concern -- Phase 2 just needs to wire the scroll.

### Pitfall 5: min-h-screen vs Content-Based Height for Hero
**What goes wrong:** Using `min-h-screen` on hero makes it too tall on desktop, too short on mobile with address bar
**Why it happens:** `100vh` doesn't account for mobile browser chrome
**How to avoid:** Use `min-h-[80vh]` (already in placeholder) or better yet `min-h-[calc(100vh-5rem)]` to account for header height, with `md:min-h-[80vh]` for desktop. Or use `min-h-svh` (small viewport height) available in modern browsers
**Warning signs:** Hero section awkwardly sized on mobile Safari

## Code Examples

Verified patterns from the existing codebase and official documentation:

### Service Data Structure (constants.ts)
```typescript
// Add to src/lib/constants.ts
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
    description: "Traditional financing with competitive rates and flexible terms for primary residences, second homes, and investment properties.",
    audience: "Buyers with good credit and 3-20% down payment",
  },
  {
    name: "FHA Loans",
    slug: "fha",
    description: "Government-backed loans with lower down payment and credit score requirements, ideal for first-time buyers.",
    audience: "First-time homebuyers and those with limited savings",
  },
  // ... VA, USDA, Jumbo, DSCR, Bank Statement, Foreign National, Refinancing, HELOC, Reverse Mortgage
];
```

### Testimonial Data Structure (constants.ts)
```typescript
export interface Testimonial {
  name: string;
  context: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "John D.",
    context: "VA Home Purchase",
    quote: "Prashanna made the VA loan process incredibly smooth...",
  },
  // ... 2 more covering FHA and Refinance
];
```

### Hero Section Component
```typescript
// Source: Follows established SectionWrapper + design token patterns
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

export function HeroSection() {
  return (
    <SectionWrapper
      id={SECTION_IDS.hero}
      className="bg-linear-to-br from-navy-900 via-navy-800 to-navy-950 pt-20"
    >
      <div className="flex min-h-[calc(100svh-5rem)] flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
        {/* Text + CTA */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Your Home Journey Starts Here
          </h1>
          <p className="mt-4 text-lg text-navy-200 md:text-xl">
            Expert mortgage guidance...
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex h-12 items-center rounded-lg bg-gold-500 px-8 text-base font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Get a Free Consultation
          </a>
        </div>
        {/* Headshot placeholder */}
        <div className="flex shrink-0 items-center justify-center">
          <div className="flex size-56 items-center justify-center rounded-full border-4 border-gold-500/30 bg-navy-700 text-5xl font-bold text-gold-400 md:size-72">
            PS
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
```

### Service Card with Gold Top Border
```typescript
// Source: CONTEXT.md decision -- gold accent top border, no icons
<a
  href="#contact"
  className="group block rounded-xl border border-border border-t-4 border-t-gold-500 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
>
  <h3 className="text-lg font-semibold text-card-foreground group-hover:text-gold-700">
    {service.name}
  </h3>
  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
    {service.description}
  </p>
  <p className="mt-3 text-sm font-medium text-gold-700">
    Best for: {service.audience}
  </p>
</a>
```

### Responsive Grid for Services
```typescript
// Source: Tailwind CSS v4 responsive grid utilities
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {SERVICES.map((service) => (
    <ServiceCard key={service.slug} service={service} />
  ))}
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `bg-gradient-to-r` | `bg-linear-to-r` | Tailwind CSS v4 (2025) | Gradient utility names changed |
| `priority` prop (next/image) | `preload` prop | Next.js 16 (2025) | `priority` deprecated, use `preload` |
| `framer-motion` import | `motion/react` import | Motion 12+ (2025) | Package rename |
| `100vh` for full-height | `100svh` (small viewport height) | Modern CSS | Accounts for mobile browser chrome |
| `bg-gradient-to-r from-blue-500` | `bg-linear-to-r from-navy-900` | Tailwind v4 + project tokens | Must use project design tokens, not hardcoded colors |

**Deprecated/outdated:**
- `bg-gradient-to-*`: Tailwind v3 syntax, replaced by `bg-linear-to-*` in v4
- `priority` on `<Image>`: Next.js 16 deprecated in favor of `preload`
- `tailwind.config.js`: Not used in this project -- Tailwind v4 uses CSS-native `@theme` in globals.css

## Open Questions

1. **Service card pre-selection mechanism**
   - What we know: Cards must scroll to #contact AND pre-select a loan type in the form
   - What's unclear: Exact mechanism -- URL search params would cause Next.js page navigation; hash params don't support key-value natively; global state requires client components
   - Recommendation: For Phase 2, wire cards as `<a href="#contact">` links only. The pre-selection logic is fundamentally a Phase 3 concern (the contact form doesn't exist yet). Phase 2 should add `data-service={service.slug}` to each card. When Phase 3 builds the contact form, it can implement pre-selection by either: (a) making service cards a thin client component that sets state, or (b) reading a URL search parameter. **Do not over-engineer this in Phase 2.**

2. **Hero minimum height calculation**
   - What we know: Current placeholder uses `min-h-[80vh]`. Header is fixed, roughly 60-80px
   - What's unclear: Exact desired visual impact -- should hero be full viewport minus header, or just "large enough"
   - Recommendation: Use `min-h-[calc(100svh-5rem)]` which fills viewport minus header on all devices. Fall back to `min-h-[80vh]` if `svh` causes issues on older browsers

3. **SectionWrapper compatibility with full-bleed gradient**
   - What we know: SectionWrapper applies `px-4 py-16 md:py-24` and `bg-background` or `bg-secondary`. Hero needs navy gradient edge-to-edge
   - What's unclear: Whether the `className` override via `cn()` correctly replaces the background
   - Recommendation: Test that `cn("bg-background", "bg-linear-to-br from-navy-900 via-navy-800 to-navy-950")` resolves correctly via `tailwind-merge`. If not, the hero may need a different wrapper or SectionWrapper needs a `noBg` prop

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed |
| Config file | none -- see Wave 0 |
| Quick run command | `npm run build` (type check + compile) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | Hero section renders with headline and subtext | manual-only | Visual inspection in browser | N/A |
| HERO-02 | CTA button links to #contact | manual-only | Click CTA, verify scroll to contact section | N/A |
| HERO-03 | Headshot renders (placeholder for now) | manual-only | Visual inspection | N/A |
| SERV-01 | All 11 service cards render | unit | Could count SERVICES array length | No test framework |
| SERV-02 | Each card shows name, description, audience | manual-only | Visual inspection | N/A |
| SERV-03 | Card click scrolls to contact | manual-only | Click card, verify scroll | N/A |
| ABOUT-01 | Bio renders with text content | manual-only | Visual inspection | N/A |
| ABOUT-02 | Photo placeholder renders | manual-only | Visual inspection | N/A |
| TEST-01 | 3 testimonial cards render | manual-only | Visual inspection | N/A |
| TEST-02 | Each testimonial shows name, context, quote | manual-only | Visual inspection | N/A |

**Note:** This phase is almost entirely visual/layout work. The primary validation is: `npm run build` succeeds (TypeScript compilation) + `npm run lint` passes + visual inspection of all sections at mobile, tablet, and desktop widths.

### Sampling Rate
- **Per task commit:** `npm run build`
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Build succeeds + lint passes + all 4 sections visually verified at 3 breakpoints

### Wave 0 Gaps
- No test framework installed -- not needed for Phase 2 (static content, no logic to unit test)
- Phase 2 validation is primarily visual + type-safety via TypeScript compilation
- If unit tests are desired, would need to install Vitest + @testing-library/react

## Sources

### Primary (HIGH confidence)
- [Next.js 16 Image Component docs](https://nextjs.org/docs/app/api-reference/components/image) - `preload` prop (replaces deprecated `priority`), `placeholder`, `fill`, `quality` props verified
- [Tailwind CSS v4 background-image docs](https://tailwindcss.com/docs/background-image) - `bg-linear-to-*` syntax verified, color stop utilities (`from-*`, `via-*`, `to-*`)
- Existing codebase analysis - SectionWrapper, Button, constants.ts, globals.css design tokens, Header component patterns

### Secondary (MEDIUM confidence)
- [Next.js linking and navigation docs](https://nextjs.org/docs/app/getting-started/linking-and-navigating) - Hash fragment scroll behavior, scroll-padding-top
- [Tailwind CSS v4 blog post](https://tailwindcss.com/blog/tailwindcss-v4) - Gradient API changes confirmed

### Tertiary (LOW confidence)
- Service card pre-selection mechanism -- multiple approaches possible, exact implementation deferred to Phase 3 when contact form exists

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and verified in package.json
- Architecture: HIGH - Follows patterns established in Phase 1, verified against official docs
- Pitfalls: HIGH - Tailwind v4 gradient syntax and Next.js 16 image changes verified against official documentation
- Pre-selection mechanism: LOW - Multiple valid approaches, depends on Phase 3 contact form implementation

**Research date:** 2026-03-13
**Valid until:** 2026-04-13 (stable stack, no fast-moving dependencies)
