# Phase 1: Foundation and Compliance - Research

**Researched:** 2026-03-12
**Domain:** Next.js App Router layout shell, Tailwind CSS v4 theming, sticky navigation, mobile responsiveness, mortgage compliance disclosures
**Confidence:** HIGH

## Summary

Phase 1 establishes the structural shell of Prashanna's portfolio site: a sticky header with transparent-to-solid scroll behavior, smooth-scroll anchor navigation, a responsive mobile hamburger menu, a compliance-rich footer, and a navy+gold design system. The existing codebase is a fresh Next.js 16.1.6 project with Tailwind CSS v4 (CSS-native config), shadcn/ui (base-nova style, Radix primitives via `@base-ui/react`), and Motion 12.36 already installed. The page is currently the default Next.js boilerplate.

All required technologies are already in `package.json`. The primary work is: (1) defining the navy/gold color palette as CSS custom properties in `globals.css` via `@theme`, (2) building `Header` and `Footer` layout components, (3) adding the shadcn Sheet component for mobile navigation, (4) implementing smooth-scroll anchor behavior with proper scroll-padding offset, and (5) scaffolding placeholder sections with IDs for future phases.

**Primary recommendation:** Build the design token system first (globals.css), then Header, then Footer, then SectionWrapper + page scaffolding. Use `npx shadcn add sheet` for the mobile menu. Use CSS `scroll-behavior: smooth` with `scroll-padding-top` for anchor navigation rather than JavaScript-based scrolling.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Text wordmark "Prashanna Sangroula" in header -- no logo image needed
- Color palette: Navy + gold -- classic finance/trust aesthetic
- Typography: Keep Geist Sans (already configured) for body, potentially a serif or different weight for headings to add gravitas
- Transparent header on hero section, transitions to solid with shadow on scroll
- Sticky at top of viewport at all times
- Header contains: wordmark (left), nav links (center/right), phone number as CTA button (right)
- NMLS #2528620 displayed in header (small text, near wordmark or phone)
- Mobile: hamburger menu replaces nav links, phone number stays visible
- Footer compliance section: Personal NMLS #2528620, Company NMLS (Loan Factory #320841), Equal Housing Lender text/logo, legal disclaimer
- Footer social links: Instagram, Facebook, LinkedIn
- Footer quick nav: repeat section anchor links (Services, About, Calculator, Contact)
- Footer email: prashanna@loanfactory.com as mailto link, phone number repeated
- Alternating backgrounds (white / light gray or navy-tinted) for visual separation between sections
- Consistent section wrapper with max-width constraint, horizontal padding, vertical spacing
- Each section gets an `id` for anchor navigation
- Scaffold placeholder sections for: Hero, Services, About, Testimonials, Calculator, FAQ, Contact

### Claude's Discretion
- Exact navy/gold hex values (pick professional shades)
- Header transition animation timing and style
- Hamburger menu animation (slide-in, dropdown, etc.)
- Section padding/spacing values
- Font weight choices for headings vs body

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Sticky header with logo, navigation links, and phone number | Transparent-to-solid header pattern using scroll event + state toggle; Tailwind `fixed top-0` positioning; `cn()` for conditional classes |
| NAV-02 | Smooth scroll anchor navigation between sections | CSS `scroll-behavior: smooth` on html + `scroll-padding-top` for header offset; Next.js Link with `scroll={false}` for hash hrefs |
| NAV-03 | Phone number (571) 222-5555 as tap-to-call `tel:` link | Standard `<a href="tel:+15712225555">` pattern; style as CTA button using Button component |
| NAV-04 | Mobile-responsive hamburger menu on small screens | shadcn Sheet component (side="right"); hidden on `md:` breakpoint and above; Lucide `Menu` and `X` icons |
| NAV-05 | Footer with compliance disclosures, contact info, and copyright | Multi-column footer layout; compliance section with required legal text; semantic HTML `<footer>` |
| COMP-01 | NMLS number (#2528620) displayed in header and footer | Small text near wordmark in header; dedicated compliance section in footer |
| COMP-02 | Company NMLS (Loan Factory #320841) displayed in footer | Footer compliance section text |
| COMP-03 | Equal Housing Lender logo and text in footer | Inline SVG icon (house outline) + "Equal Housing Lender" text; alternatively use the standard Equal Housing Lender image |
| COMP-04 | Legal disclaimer in footer | Static text: "Not a commitment to lend. Terms and conditions apply. Programs, rates, terms, and conditions are subject to change without notice." |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router framework | Already in package.json; provides layout.tsx, page.tsx, Server Components |
| React | 19.2.3 | UI library | Already installed |
| Tailwind CSS | v4 | Styling via CSS-native config | Already configured; `@theme` in globals.css |
| shadcn/ui | v4 (base-nova) | Component primitives | Already configured; Button exists; Sheet needed |
| Lucide React | 0.577.0 | Icons (Menu, X, Phone, Mail, etc.) | Already in package.json |
| Motion | 12.36.0 | Animations (header transitions) | Already installed; import from `motion/react` |
| class-variance-authority | 0.7.1 | Component variant styling | Already installed; used by Button |
| clsx + tailwind-merge | latest | Class name utilities | Already installed via `cn()` in utils.ts |

### To Add via CLI
| Component | Command | Purpose |
|-----------|---------|---------|
| Sheet | `npx shadcn add sheet` | Mobile hamburger menu slide-out panel |

### No Additional npm Installs Needed
Everything required for Phase 1 is already in `package.json`. The only addition is the shadcn Sheet component added via CLI (which generates local source files, not a new dependency -- it uses the existing `@base-ui/react` Dialog primitive).

## Architecture Patterns

### Recommended Project Structure After Phase 1
```
src/
├── app/
│   ├── globals.css          # Design tokens (navy/gold palette, scroll-behavior)
│   ├── layout.tsx           # Root layout with Header + Footer
│   ├── page.tsx             # Home page composing all section placeholders
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Sticky header (client component)
│   │   ├── Footer.tsx       # Footer with compliance (server component)
│   │   ├── MobileNav.tsx    # Sheet-based mobile menu (client component)
│   │   └── SectionWrapper.tsx  # Reusable section container (server component)
│   └── ui/
│       ├── button.tsx       # Existing shadcn Button
│       └── sheet.tsx        # Added via `npx shadcn add sheet`
└── lib/
    ├── utils.ts             # Existing cn() utility
    └── constants.ts         # Navigation items, contact info, compliance text
```

### Pattern 1: Navy + Gold Design Token System
**What:** Extend existing oklch CSS custom properties with navy/gold brand colors, then map them to shadcn semantic tokens (primary, secondary, accent).
**When to use:** All color references throughout the site.

```css
/* In globals.css, add custom brand colors inside @theme */
@theme {
  /* Existing mappings stay... */

  /* Brand palette - Navy */
  --color-navy-50: oklch(0.97 0.01 250);
  --color-navy-100: oklch(0.93 0.02 250);
  --color-navy-200: oklch(0.85 0.04 250);
  --color-navy-300: oklch(0.72 0.06 250);
  --color-navy-400: oklch(0.58 0.09 250);
  --color-navy-500: oklch(0.45 0.10 250);
  --color-navy-600: oklch(0.37 0.10 250);
  --color-navy-700: oklch(0.30 0.09 250);
  --color-navy-800: oklch(0.25 0.08 250);
  --color-navy-900: oklch(0.20 0.07 250);
  --color-navy-950: oklch(0.15 0.06 250);

  /* Brand palette - Gold */
  --color-gold-50: oklch(0.98 0.02 85);
  --color-gold-100: oklch(0.95 0.05 85);
  --color-gold-200: oklch(0.90 0.08 85);
  --color-gold-300: oklch(0.83 0.12 80);
  --color-gold-400: oklch(0.77 0.14 75);
  --color-gold-500: oklch(0.72 0.15 70);
  --color-gold-600: oklch(0.65 0.14 65);
  --color-gold-700: oklch(0.55 0.12 65);
  --color-gold-800: oklch(0.45 0.10 65);
  --color-gold-900: oklch(0.38 0.08 65);
}

/* Then override semantic tokens in :root */
:root {
  /* Map navy as primary */
  --primary: oklch(0.20 0.07 250);       /* navy-900 */
  --primary-foreground: oklch(0.98 0 0);  /* white */

  /* Map gold as accent */
  --accent: oklch(0.72 0.15 70);          /* gold-500 */
  --accent-foreground: oklch(0.20 0.07 250); /* navy-900 */

  /* Section alternating backgrounds */
  --secondary: oklch(0.97 0.005 250);     /* very light navy tint */
  --secondary-foreground: oklch(0.20 0.07 250);
}
```

This generates Tailwind utility classes like `bg-navy-900`, `text-gold-500`, `border-navy-200` automatically, while also keeping shadcn semantic tokens (`bg-primary`, `text-accent`) mapped to the brand palette.

**Important:** The existing `@theme inline { ... }` block references `var()` CSS variables -- keep that block for shadcn's internal mappings. Add the new brand colors in a separate `@theme { ... }` block (non-inline) so they become standalone theme variables that generate utilities directly.

### Pattern 2: Transparent-to-Solid Sticky Header
**What:** Header starts transparent over the hero section, transitions to solid navy with shadow on scroll.
**When to use:** This is a client component because it needs `useEffect` + `useState` for scroll detection.

```tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-navy-900 shadow-lg"
          : "bg-transparent"
      )}
    >
      {/* Header content */}
    </header>
  );
}
```

### Pattern 3: Smooth Scroll with Header Offset
**What:** CSS-only smooth scrolling that accounts for the fixed header height.
**When to use:** All anchor navigation links.

```css
/* In globals.css */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem; /* matches header height */
}
```

```tsx
/* In layout.tsx - add data attribute for Next.js compatibility */
<html lang="en" data-scroll-behavior="smooth">
```

For navigation links, use standard `<a>` tags with hash hrefs (not Next.js `<Link>`) for same-page anchor navigation:

```tsx
<a href="#services" className="...">Services</a>
```

Alternatively, if using Next.js `<Link>`, set `scroll={false}`:
```tsx
<Link href="#services" scroll={false}>Services</Link>
```

### Pattern 4: Mobile Navigation with Sheet
**What:** Hamburger icon triggers a Sheet slide-in panel with navigation links.
**When to use:** Screens narrower than `md` breakpoint (768px).

```tsx
"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav className="flex flex-col gap-4 pt-8">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          {/* ... more links */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

### Pattern 5: Reusable Section Wrapper
**What:** Consistent container for every page section with alternating backgrounds.
**When to use:** Every content section on the page.

```tsx
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  alternate?: boolean;
}

export function SectionWrapper({ id, children, className, alternate }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-16 md:py-24",
        alternate ? "bg-secondary" : "bg-background",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}
```

### Pattern 6: Constants File for Single Source of Truth
**What:** Centralize all contact info, NMLS numbers, nav items, and compliance text.
**When to use:** Any component displaying business data or navigation.

```tsx
// src/lib/constants.ts

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
  disclaimer: "Not a commitment to lend. Programs, rates, terms, and conditions are subject to change without notice. All loans subject to credit approval.",
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
```

### Anti-Patterns to Avoid
- **Hardcoded colors:** Never use `bg-blue-900` or `text-yellow-600`. Always use the design tokens (`bg-navy-900`, `text-gold-500`, or semantic `bg-primary`, `text-accent`).
- **JavaScript scroll libraries:** Do not install `smooth-scroll`, `react-scroll`, or similar. CSS `scroll-behavior: smooth` is sufficient and performant.
- **Manual Sheet implementation:** Do not hand-build a modal/overlay for the mobile menu. Use `npx shadcn add sheet` which provides proper focus management, ARIA semantics, and overlay behavior via Radix Dialog.
- **Inline compliance text:** Do not scatter NMLS numbers and disclaimer text as string literals across components. Use the constants file.
- **Client components everywhere:** Header and MobileNav need `"use client"` for scroll state and Sheet interactivity. Footer and SectionWrapper should be Server Components.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mobile slide-out menu | Custom overlay + animation + focus trap | `npx shadcn add sheet` (Radix Dialog) | Focus management, escape key handling, overlay click-away, ARIA attributes, scroll locking |
| Smooth scroll navigation | JavaScript scroll animation with `scrollIntoView` | CSS `scroll-behavior: smooth` + `scroll-padding-top` | Native browser behavior, zero JS, respects `prefers-reduced-motion` automatically |
| Equal Housing Lender icon | Download and manage external image asset | Inline SVG of house outline with text | No external asset to load, scales perfectly, no CORS/path issues |
| Class name merging | Manual string concatenation | `cn()` from `@/lib/utils` (clsx + tailwind-merge) | Handles conditional classes, resolves Tailwind conflicts |
| Component variants | Manual prop-to-class mapping | CVA (class-variance-authority) | Type-safe variants, consistent with shadcn pattern |

**Key insight:** This phase is entirely layout and styling. Every interactive behavior (scroll, mobile menu) has a CSS-native or shadcn-provided solution. Zero new npm dependencies are needed.

## Common Pitfalls

### Pitfall 1: Header Flicker on Initial Load
**What goes wrong:** The header renders solid briefly before JavaScript hydration detects `scrollY === 0` and switches to transparent.
**Why it happens:** SSR renders the default state; if `scrolled` defaults to `false` but the CSS doesn't match, there's a flash.
**How to avoid:** Default `scrolled` to `false` (transparent). Since the page always loads at the top, the transparent state is correct on initial render. Only set `scrolled = true` after scroll events fire.
**Warning signs:** Visual flash of solid header when page loads.

### Pitfall 2: Next.js Link Overriding Smooth Scroll
**What goes wrong:** Clicking a `<Link href="#section">` causes an instant jump instead of smooth scroll.
**Why it happens:** Next.js `<Link>` component manages scroll behavior by default, which can override CSS `scroll-behavior: smooth`.
**How to avoid:** For same-page hash links, either use plain `<a>` tags or set `scroll={false}` on `<Link>`. The `data-scroll-behavior="smooth"` attribute on `<html>` tells Next.js to not interfere.
**Warning signs:** Anchor links jump instead of scrolling smoothly.

### Pitfall 3: Content Hidden Behind Fixed Header
**What goes wrong:** When scrolling to an anchor, the section heading is hidden behind the fixed header.
**Why it happens:** The browser scrolls the element to the very top of the viewport, but the fixed header covers that area.
**How to avoid:** Set `scroll-padding-top` on the `html` element to match or exceed the header height (e.g., `5rem` for an 80px header). This is a CSS-only solution.
**Warning signs:** Section headings not visible after clicking a nav link.

### Pitfall 4: Sheet Component Missing Accessible Title
**What goes wrong:** Accessibility audit flags missing dialog title.
**Why it happens:** Radix Dialog requires a `DialogTitle` (mapped as `SheetTitle`) for screen readers.
**How to avoid:** Always include `<SheetTitle>` inside `<SheetContent>`. If the title should not be visible, use `className="sr-only"`.
**Warning signs:** Console warnings about missing `aria-labelledby`.

### Pitfall 5: Tailwind v4 @theme Inline vs Regular
**What goes wrong:** Custom color utilities don't generate, or colors resolve incorrectly.
**Why it happens:** `@theme inline` resolves CSS variable references at compile time. If you define brand colors with literal oklch values (not referencing other variables), they should go in a regular `@theme` block.
**How to avoid:** Use `@theme inline` only for values that reference other CSS variables (like shadcn's `--color-primary: var(--primary)`). Use regular `@theme` for standalone brand color definitions.
**Warning signs:** `bg-navy-900` not working as a Tailwind class, or colors appearing wrong.

### Pitfall 6: Phone Number Format in tel: Link
**What goes wrong:** Tap-to-call doesn't work on some devices.
**Why it happens:** The `tel:` href requires E.164 format or at minimum no parentheses/spaces.
**How to avoid:** Use `href="tel:+15712225555"` (E.164 with country code). Display the formatted number `(571) 222-5555` as the visible text.
**Warning signs:** Phone link opens dialer with wrong number or doesn't work.

## Code Examples

### Example 1: Root Layout Integration
```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prashanna Sangroula | Mortgage Loan Officer",
  description: "Licensed Mortgage Loan Officer NMLS #2528620 at Loan Factory, Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Example 2: Page with Scaffold Sections
```tsx
// src/app/page.tsx
import { SectionWrapper } from "@/components/layout/SectionWrapper";

export default function Home() {
  return (
    <>
      <SectionWrapper id="hero">
        <div className="min-h-[80vh] flex items-center">
          <p className="text-muted-foreground">Hero section placeholder</p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="services" alternate>
        <p className="text-muted-foreground">Services section placeholder</p>
      </SectionWrapper>

      <SectionWrapper id="about">
        <p className="text-muted-foreground">About section placeholder</p>
      </SectionWrapper>

      <SectionWrapper id="testimonials" alternate>
        <p className="text-muted-foreground">Testimonials section placeholder</p>
      </SectionWrapper>

      <SectionWrapper id="calculator">
        <p className="text-muted-foreground">Calculator section placeholder</p>
      </SectionWrapper>

      <SectionWrapper id="faq" alternate>
        <p className="text-muted-foreground">FAQ section placeholder</p>
      </SectionWrapper>

      <SectionWrapper id="contact">
        <p className="text-muted-foreground">Contact section placeholder</p>
      </SectionWrapper>
    </>
  );
}
```

### Example 3: Equal Housing Lender Inline SVG
```tsx
// Equal Housing Lender icon as inline SVG (simplified house outline)
function EqualHousingIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2zm0 2.84L19 12h-1v9h-4v-6H10v6H6v-9H5l7-7.16z" />
      <text x="5" y="20" fontSize="4" fill="currentColor">=</text>
    </svg>
  );
}
```

Note: For the Equal Housing Lender compliance requirement, the simplest approach is to use the Lucide `Home` icon alongside "Equal Housing Lender" text. Alternatively, a proper Equal Housing Lender SVG can be placed in the `/public` directory. The official logo is available at https://equalhousinglogo.com/ and https://worldvectorlogo.com/logo/equal-housing-lender-1 in vector format.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | CSS `@theme` in globals.css | Tailwind v4 (Jan 2025) | No JS config file; colors/spacing defined in CSS |
| `framer-motion` package name | `motion` package, import from `motion/react` | Motion 12.x (2025) | Package renamed; old import path deprecated |
| `react-scroll` / JS smooth scroll | CSS `scroll-behavior: smooth` | Browser support reached 97%+ | Zero-JS solution, native performance |
| Custom modal for mobile nav | shadcn Sheet (Radix Dialog) | shadcn v4 (2025-2026) | Built-in focus trap, ARIA, overlay, animations |
| shadcn v0 style registry | base-nova style + `@base-ui/react` | shadcn CLI v4 (Mar 2026) | Uses Base UI instead of Radix UI for primitives |
| `next/font` with `className` | `next/font` with CSS `variable` | Next.js 13+ (stable) | Font variables used in Tailwind theme |

**Note on shadcn base-nova style:** This project uses `"style": "base-nova"` (per components.json), which means shadcn components use `@base-ui/react` primitives instead of `@radix-ui/react`. The Sheet component added via CLI will use the Base UI Dialog primitive. This is the current shadcn v4 default.

## Open Questions

1. **Exact oklch values for navy/gold palette**
   - What we know: Navy (hue ~250) and gold (hue ~65-85) in oklch space; hex references like #1B2A4A (navy) and #C4982F (gold) are common in finance
   - What's unclear: The exact lightness/chroma values that look best for this brand
   - Recommendation: Use an oklch color picker (oklch.com) to fine-tune. The values in the code examples above are reasonable starting points. Implementer should verify visual appearance in-browser and adjust.

2. **Social media profile URLs**
   - What we know: User confirmed Instagram, Facebook, LinkedIn profiles exist
   - What's unclear: Exact URLs for each profile
   - Recommendation: Use placeholder URLs in constants.ts (e.g., `https://instagram.com/prashannasangroula`). These can be updated when real URLs are confirmed.

3. **Equal Housing Lender logo format**
   - What we know: Official vector logo available; compliance requires the text or logo be visible
   - What's unclear: Whether a simple text mention + house icon is sufficient, or if the exact official logo is required
   - Recommendation: Use "Equal Housing Lender" text paired with a house icon (Lucide `Home` or `House` icon) for Phase 1. The exact official SVG can be swapped in later if compliance review requires it. Text-based compliance is the minimum legal requirement.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently installed |
| Config file | none -- see Wave 0 |
| Quick run command | `npm test` (not yet configured) |
| Full suite command | `npm test` (not yet configured) |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Sticky header renders with wordmark, nav links, phone, NMLS | smoke / visual | Manual browser check | N/A Wave 0 |
| NAV-02 | Smooth scroll to anchor sections | e2e / manual | Manual browser check | N/A |
| NAV-03 | Phone number is a tel: link | unit | Check rendered href attribute | N/A Wave 0 |
| NAV-04 | Hamburger menu opens/closes on mobile | e2e / manual | Manual viewport resize check | N/A |
| NAV-05 | Footer displays compliance, contact, copyright | smoke | Check rendered text content | N/A Wave 0 |
| COMP-01 | NMLS #2528620 in header and footer | unit | Check rendered text includes NMLS string | N/A Wave 0 |
| COMP-02 | Company NMLS #320841 in footer | unit | Check rendered text | N/A Wave 0 |
| COMP-03 | Equal Housing Lender in footer | unit | Check rendered text/icon | N/A Wave 0 |
| COMP-04 | Legal disclaimer in footer | unit | Check rendered disclaimer text | N/A Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` (catches TypeScript and build errors)
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Build succeeds + lint passes + manual browser verification of all 5 success criteria

### Wave 0 Gaps
- [ ] No test framework installed -- for Phase 1, `npm run build` and `npm run lint` serve as automated validation. A full test framework (Vitest + React Testing Library or Playwright) should be introduced in a later phase when interactive behavior (calculator, form) needs automated testing.
- [ ] Manual verification required for scroll behavior (NAV-02) and mobile menu (NAV-04) -- these are inherently visual/interactive and best validated by manual browser testing for Phase 1.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Theme Variables docs](https://tailwindcss.com/docs/theme) -- Custom color definitions via `@theme`, oklch format, `@theme inline` vs regular
- [Next.js data-scroll-behavior docs](https://nextjs.org/docs/messages/missing-data-scroll-behavior) -- Required `data-scroll-behavior="smooth"` attribute on html element
- [shadcn/ui Sheet component docs](https://ui.shadcn.com/docs/components/radix/sheet) -- Sheet API, SheetContent side prop, SheetTitle requirement
- Existing codebase files: `package.json`, `globals.css`, `components.json`, `layout.tsx`, `button.tsx` -- confirmed exact versions and patterns

### Secondary (MEDIUM confidence)
- [Next.js smooth scroll implementation guide](https://mariogiancini.com/implementing-smooth-scroll-behavior-with-tailwind-css-and-nextjs) -- `scroll={false}` on Link, scroll-padding-top pattern
- [NMLS Required Use of Unique ID](https://mortgage.nationwidelicensingsystem.org/about/Pages/RequiredUseofNMLSID.aspx) -- MLO must display NMLS ID on website and marketing materials
- [Equal Housing Lender logo](https://equalhousinglogo.com/) -- Vector formats available for download
- [Navy/Gold color palettes](https://www.schemecolor.com/gold-navy-blue.php) -- Hex references for professional finance palettes

### Tertiary (LOW confidence)
- Social media profile URLs -- Placeholder values assumed; need confirmation from Prashanna
- Exact oklch color values -- Starting points provided; visual tuning needed in-browser

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all dependencies already installed and verified in package.json
- Architecture: HIGH -- patterns verified against Tailwind v4 docs, Next.js docs, and shadcn docs
- Pitfalls: HIGH -- cross-referenced with Next.js GitHub issues and official docs
- Color palette: MEDIUM -- oklch values are reasonable but need visual validation
- Compliance requirements: MEDIUM -- NMLS display rules verified from official source; Equal Housing logo approach may need legal review

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (stable domain; no fast-moving dependencies)
