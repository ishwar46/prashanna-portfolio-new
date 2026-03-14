# Phase 5: Polish and Launch Validation - Research

**Researched:** 2026-03-14
**Domain:** Performance optimization, scroll animations, image optimization, mobile QA
**Confidence:** HIGH

## Summary

Phase 5 is a polish and validation phase covering five requirements: image optimization audit (PERF-01), scroll-triggered entrance animations (PERF-02), prefers-reduced-motion accessibility (PERF-03), mobile 375px audit (PERF-04), and Core Web Vitals targets (PERF-05). The project already uses next/image in the two sections with images (Hero, About) and Motion 12.36 is installed but unused so far.

The key technical work involves: (1) wrapping section content in Motion `whileInView` animations with `viewport={{ once: true }}`; (2) adding a `MotionConfig` wrapper with `reducedMotion="user"` to globally respect the `prefers-reduced-motion` media query; (3) auditing all images for proper lazy/priority loading; (4) generating a favicon via static files or `icon.tsx`; and (5) running Lighthouse to validate LCP < 2.5s and CLS < 0.1.

**Primary recommendation:** Create a reusable `AnimatedSection` client component that wraps content with Motion's `whileInView` and apply it to each section. Add `MotionConfig reducedMotion="user"` at the layout level.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Use Motion library (already installed) for scroll-triggered entrance animations
- Subtle fadeInUp or fadeIn on section content as it enters viewport
- Animations play once on entry, do not replay on scroll-back
- Respect prefers-reduced-motion -- suppress all animations when enabled
- Keep animations fast and subtle (200-400ms) -- professional, not flashy
- Audit all Image components: ensure non-hero images use lazy loading (default)
- Hero image already has `priority` prop -- verify it's the only one
- Confirm all images output as WebP/AVIF via next/image
- Generate a simple "PS" monogram favicon using next/og or static SVG
- Navy background, gold text -- matches brand
- Include standard sizes: favicon.ico, apple-touch-icon, etc.
- Mobile responsiveness already addressed extensively in earlier phases
- This phase: final audit at 375px for any remaining issues
- Verify all tap targets are at least 44px
- Verify no horizontal scrolling on any section
- LCP < 2.5s on simulated mobile (Lighthouse)
- CLS < 0.1
- Address any render-blocking resources identified by Lighthouse
- Verify .env.example has all required variables documented
- Verify build passes clean with no warnings
- No console errors in production build

### Claude's Discretion
- Which specific sections get which animation type
- Animation timing and easing curves
- Favicon exact design within the "PS monogram" direction
- Any additional Lighthouse fixes needed
- Whether to add a custom 404 page (nice-to-have, not required)

### Deferred Ideas (OUT OF SCOPE)
- Custom branded 404 page -- nice-to-have for v2
- Advanced performance optimization (image CDN, edge caching) -- post-launch
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PERF-01 | All images optimized via next/image (WebP, lazy loading, responsive) | Image audit findings: Hero has `priority`, About uses default lazy. Both use next/image. Verify no raw `<img>` tags exist. |
| PERF-02 | Subtle scroll-triggered animations using Motion (fadeInUp, once only) | Motion `whileInView` + `viewport={{ once: true }}` pattern. AnimatedSection wrapper component. |
| PERF-03 | Respects `prefers-reduced-motion` for accessibility | `MotionConfig reducedMotion="user"` at layout level suppresses all child animations. |
| PERF-04 | Mobile-responsive end-to-end (mobile-first Tailwind approach) | 375px viewport audit checklist. Tap target 44px minimum. No horizontal overflow. |
| PERF-05 | LCP < 2.5s, CLS < 0.1 targets | Lighthouse CLI or DevTools audit on production build. Font preloading already handled by next/font. |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.36 | Scroll-triggered animations | Already in package.json; `whileInView` is the standard React scroll animation API |
| next/image | 16.1.6 | Image optimization | Built-in WebP/AVIF, lazy loading, responsive sizing |
| next/font | 16.1.6 | Font optimization | Already configured with Geist; prevents CLS from font loading |

### Supporting (No New Dependencies)
| Tool | Purpose | When to Use |
|------|---------|-------------|
| Lighthouse CLI | Performance measurement | Validate LCP/CLS targets |
| Chrome DevTools | Mobile viewport testing | 375px audit |

**No new npm packages are needed for this phase.**

## Architecture Patterns

### Current Section Architecture

The page has 7 sections. Their rendering model matters for animation:

| Section | Client Component? | Has Images? | Animation Approach |
|---------|-------------------|-------------|-------------------|
| HeroSection | No (Server) | Yes (priority) | No scroll animation needed (above fold) |
| ServicesSection | Yes ("use client") | No | Wrap content in motion.div |
| AboutSection | No (Server) | Yes (lazy default) | Need client wrapper or AnimatedSection |
| TestimonialsSection | No (Server) | No | Need client wrapper or AnimatedSection |
| CalculatorSection | Yes ("use client") | No | Wrap content in motion.div |
| FAQSection | ? (check) | No | Wrap content in motion.div or AnimatedSection |
| ContactSection | Yes ("use client") | No | Wrap content in motion.div |

### Pattern 1: AnimatedSection Wrapper Component

**What:** A reusable client component that wraps any children with Motion entrance animation.
**When to use:** For Server Components that cannot directly use `motion.div` (AboutSection, TestimonialsSection, etc).

```typescript
// src/components/ui/AnimatedSection.tsx
"use client";

import { motion } from "motion/react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Source:** Motion docs confirm `whileInView` + `viewport.once` pattern (motion.dev/docs/react-scroll-animations). Verified by WebSearch.

### Pattern 2: MotionConfig for Reduced Motion

**What:** Wrap the app in `MotionConfig` with `reducedMotion="user"` to automatically respect `prefers-reduced-motion`.
**When to use:** Once, at the layout level.

```typescript
// In layout.tsx or a client wrapper
"use client";

import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
```

When `reducedMotion="user"`, Motion reads the OS-level `prefers-reduced-motion` setting. If enabled, all motion components skip animations entirely (instant state, no transition). This is the recommended accessible approach.

**Confidence:** HIGH -- `reducedMotion` prop on MotionConfig is a well-documented, stable feature in Motion/Framer Motion since v6+.

### Pattern 3: Next.js Favicon via File Convention

**What:** Place static favicon files in `src/app/` using Next.js file conventions.
**Key constraint:** `favicon.ico` cannot be generated via `icon.tsx` -- it must be a static `.ico` file. However, `icon.tsx` can generate PNG icons, and `apple-icon.tsx` can generate the Apple touch icon.

Recommended approach:
1. Create a static `favicon.ico` (32x32) -- can be generated from an SVG or PNG
2. Create `icon.tsx` that generates a PNG icon (192x192, 512x512) using `ImageResponse` from `next/og`
3. Create `apple-icon.tsx` for apple-touch-icon (180x180)

Alternative simpler approach: Generate all favicon files externally (e.g., from an SVG) and place as static files.

**Source:** Next.js official docs (nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).

### Anti-Patterns to Avoid
- **Animating the Hero section on scroll:** Hero is above the fold -- it loads immediately. Adding whileInView to it wastes time and looks broken.
- **Heavy animation durations:** Keep under 400ms. Anything over 600ms feels sluggish for a professional site.
- **Animating every individual element:** Animate at the section content level, not every paragraph/card. Too many IntersectionObservers hurt performance.
- **Using `framer-motion` import path:** The package is `motion` and import must be from `motion/react` per CLAUDE.md.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll detection | Custom IntersectionObserver hooks | Motion `whileInView` | Handles pooled observers, thresholds, cleanup |
| Reduced motion detection | `window.matchMedia` hook | `MotionConfig reducedMotion="user"` | Automatic, covers all child components |
| Image optimization | Manual WebP conversion, srcsets | `next/image` component | Automatic format negotiation, responsive sizes, lazy loading |
| Favicon generation | Canvas API or manual Photoshop | `next/og` ImageResponse in `icon.tsx` | Server-side, cached, consistent |

## Common Pitfalls

### Pitfall 1: Server Component Cannot Use motion.div
**What goes wrong:** Importing `motion` in a Server Component causes a build error.
**Why it happens:** Motion uses React hooks internally (useRef, useEffect).
**How to avoid:** Either add `"use client"` to the section, or wrap the section's content in a client AnimatedSection component.
**Warning signs:** Build error "useState/useEffect only works in Client Components."

### Pitfall 2: CLS from Images Without Explicit Dimensions
**What goes wrong:** Images without width/height cause layout shifts as they load.
**Why it happens:** Browser cannot reserve space until image dimensions are known.
**How to avoid:** Already mitigated -- both Image usages specify width/height. Verify no new images are added without dimensions.
**Warning signs:** CLS > 0.1 in Lighthouse.

### Pitfall 3: LCP Regression from Animation Delay
**What goes wrong:** If the hero content has an animation delay, LCP is pushed back.
**Why it happens:** The hero image/text appears after the animation completes, not at paint time.
**How to avoid:** Do NOT add whileInView or any entrance animation to the HeroSection. It is above the fold and should render immediately.
**Warning signs:** LCP > 2.5s in Lighthouse when it was fine before.

### Pitfall 4: favicon.ico Cannot Be Generated by icon.tsx
**What goes wrong:** Placing an `icon.tsx` file doesn't generate a `favicon.ico`.
**Why it happens:** Next.js file convention requires `favicon.ico` to be a static file, not code-generated.
**How to avoid:** Create a static `favicon.ico` file. Use `icon.tsx` only for PNG variants.
**Warning signs:** Browser tab shows default Next.js icon or no icon.

### Pitfall 5: Motion Animations Replaying on Tab Switch
**What goes wrong:** When user switches tabs and returns, animations may replay.
**Why it happens:** Some IntersectionObserver implementations re-fire on visibility change.
**How to avoid:** `viewport={{ once: true }}` ensures animation fires only on first intersection. This is the correct approach and handles tab switching correctly.

## Code Examples

### Scroll-Triggered FadeInUp Animation
```typescript
// Verified pattern from Motion docs
"use client";
import { motion } from "motion/react";

// For sections that are already client components (Services, Calculator, Contact):
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
>
  {/* section content */}
</motion.div>
```

### Staggered Children Animation
```typescript
// For card grids (services, testimonials) -- optional enhancement
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* card content */}
    </motion.div>
  ))}
</motion.div>
```

### MotionConfig Reduced Motion Setup
```typescript
// In a client layout wrapper
"use client";
import { MotionConfig } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}

// In layout.tsx (Server Component):
import { Providers } from "@/components/Providers";
// Wrap <body> content with <Providers>
```

### Next.js icon.tsx for PNG Favicon
```typescript
// src/app/icon.tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a1628",  // navy-950 hex
          borderRadius: 6,
          fontSize: 18,
          fontWeight: 700,
          color: "#d4a843",  // gold-500 hex
        }}
      >
        PS
      </div>
    ),
    { ...size }
  );
}
```

### Lighthouse CLI Command
```bash
# After running: npm run build && npm start
npx lighthouse http://localhost:3000 --only-categories=performance --output=json --chrome-flags="--headless"
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package name | `motion` package, import from `motion/react` | 2024 | Must use new import path |
| Manual IntersectionObserver | Motion `whileInView` | Stable since Framer Motion v6 | Cleaner API, automatic cleanup |
| `@media (prefers-reduced-motion)` in CSS | `MotionConfig reducedMotion="user"` | Stable feature | Covers JS animations too, not just CSS |
| Manual favicon sizes via HTML link tags | Next.js file conventions (`icon.tsx`, `apple-icon.tsx`) | Next.js 13+ App Router | Automatic meta tags, cached generation |

## Open Questions

1. **FAQSection client status**
   - What we know: Uses base-ui Accordion which likely needs "use client"
   - What's unclear: Need to verify if it already has the directive
   - Recommendation: Check during implementation; if server component, wrap with AnimatedSection

2. **Exact LCP baseline**
   - What we know: Hero image has `priority`, fonts use next/font
   - What's unclear: Current LCP value before animations are added
   - Recommendation: Run Lighthouse on production build before AND after changes to track impact

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Lighthouse CLI (performance audit) + manual browser testing |
| Config file | none -- Lighthouse runs standalone |
| Quick run command | `npx lighthouse http://localhost:3000 --only-categories=performance --output=json --chrome-flags="--headless"` |
| Full suite command | `npm run build && npm start` then Lighthouse + manual 375px audit |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PERF-01 | All images use next/image, non-hero lazy | manual + grep | `grep -r "<img " src/` (should return 0 results) | N/A |
| PERF-02 | Scroll animations play once on entry | manual | Visual inspection in browser | N/A |
| PERF-03 | Animations suppressed with prefers-reduced-motion | manual | Chrome DevTools > Rendering > prefers-reduced-motion: reduce | N/A |
| PERF-04 | Usable at 375px, no horizontal scroll, tap targets 44px+ | manual | Chrome DevTools responsive mode at 375px | N/A |
| PERF-05 | LCP < 2.5s, CLS < 0.1 | automated | Lighthouse CLI (see quick run command) | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` (verify no build errors)
- **Per wave merge:** Full Lighthouse audit on production build
- **Phase gate:** Lighthouse performance score + manual 375px audit before `/gsd:verify-work`

### Wave 0 Gaps
- None -- no test framework setup needed. Validation is Lighthouse CLI (already available via npx) and manual browser testing.

## Sources

### Primary (HIGH confidence)
- Next.js official docs - Image component API (nextjs.org/docs/app/api-reference/components/image)
- Next.js official docs - Favicon file conventions (nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
- Motion docs - Scroll animations with whileInView (motion.dev/docs/react-scroll-animations)
- Motion docs - MotionConfig reducedMotion (motion.dev/docs/react-motion-config)

### Secondary (MEDIUM confidence)
- DebugBear Next.js Image Optimization guide (debugbear.com/blog/nextjs-image-optimization)
- Josh Comeau's prefers-reduced-motion article (joshwcomeau.com/react/prefers-reduced-motion)

### Tertiary (LOW confidence)
- None -- all findings verified against official sources or well-established patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Motion 12.36 already installed, next/image already used, no new dependencies
- Architecture: HIGH - whileInView + viewport.once is the documented, standard pattern
- Pitfalls: HIGH - Based on direct codebase inspection (Server vs Client components, existing image usage)

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (stable libraries, no fast-moving changes expected)
