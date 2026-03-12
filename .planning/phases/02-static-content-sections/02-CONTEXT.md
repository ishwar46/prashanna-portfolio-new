# Phase 2: Static Content Sections - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Hero section, Services section, About section, and Testimonials section — replacing the placeholder sections from Phase 1 with full content. All sections are Server Components with static content (no interactivity). The contact form, calculator, and FAQ belong to Phase 3.

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- Split layout: text/CTA on the left, professional headshot on the right
- Warm & personal tone for headline and subtext (e.g., "Your Home Journey Starts Here")
- Navy gradient background with white text — makes the header transparent-to-solid transition feel natural
- "Get a Free Consultation" CTA button scrolls to #contact section
- Placeholder headshot for now (styled initials or silhouette) — swap for real photo later
- On mobile: stacks vertically (text on top, headshot below)

### Services Cards
- 3-column grid on desktop, 2 on tablet, 1 on mobile
- Each card contains: loan type name, 1-2 sentence description, "Best for:" audience line
- Gold accent on each card (top border or large number) — no icons per CLAUDE.md minimal icons rule
- Entire card is clickable — scrolls to #contact and pre-selects that loan type
- Hover effect on the full card
- 11 loan types: Conventional, FHA, VA, USDA, Jumbo, DSCR, Bank Statement, Foreign National, Refinancing, HELOC, Reverse Mortgage
- Service data stored in constants.ts (name, description, audience, slug for pre-selection)

### About Section
- Side-by-side layout: photo on the left, bio text on the right
- Stacks vertically on mobile (photo on top)
- Personal journey angle: "I got into mortgage lending because..." — warm, builds connection
- Placeholder bio based on known details (Loan Factory, NMLS, specializations) — replace later with real content
- Placeholder photo (styled similarly to hero headshot placeholder)
- 2-3 key stats/highlights below the bio (e.g., "10+ Years Experience", "500+ Families Helped", "11 Loan Programs")

### Testimonials Section
- Static 3-card grid (3 columns desktop, 1 on mobile)
- Each card: large quote text, client name as "First LastInitial." (e.g., "John D."), loan type context (e.g., "VA Home Purchase")
- 3 placeholder testimonials covering different loan types (e.g., VA, FHA, Refinance)
- No carousel or interaction — all visible at once
- Replace with real testimonials when Prashanna provides them

### Claude's Discretion
- Exact hero headline and subtext copy
- Headshot placeholder design (initials circle, silhouette, etc.)
- Service card hover animation style
- Bio placeholder copy (based on known details)
- Stat highlight box styling
- Testimonial card visual treatment (quote marks, borders, etc.)
- Card pre-selection mechanism for contact form (query param, URL hash, or global state)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SectionWrapper`: Already provides section container with id, alternating backgrounds, max-width — use for all 4 sections
- `Button` (CVA): Use for hero CTA button — gold/accent variant would work
- `constants.ts`: Add service data (SERVICES array) and testimonial data (TESTIMONIALS array) here
- `SECTION_IDS`: Already has hero, services, about, testimonials IDs defined
- `cn()`: Class name merging utility for conditional styles

### Established Patterns
- Navy/gold design tokens in globals.css — use `bg-navy-*`, `text-gold-*`, and semantic tokens
- Server Components by default, "use client" only when needed — all Phase 2 sections can be Server Components
- `@/*` path alias for imports
- Tailwind responsive prefixes: `sm:`, `md:`, `lg:` for breakpoints

### Integration Points
- `src/app/page.tsx`: Replace placeholder content inside each SectionWrapper
- `src/lib/constants.ts`: Add SERVICES and TESTIMONIALS data arrays
- Hero needs special treatment: override SectionWrapper's default bg with navy gradient
- Service card click → #contact with loan type: needs a mechanism to pass the selected service (Phase 3 contact form will consume this)

</code_context>

<specifics>
## Specific Ideas

- Navy gradient hero creates a strong visual anchor at the top that transitions naturally with the existing transparent-to-solid header
- Gold accent on service cards (not icons) keeps the design clean and professional per minimal-icons rule
- Stats in the about section add credibility without requiring a lengthy bio
- Testimonials should feel authentic — even placeholders should reference specific loan types to demonstrate breadth of experience

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-static-content-sections*
*Context gathered: 2026-03-13*
