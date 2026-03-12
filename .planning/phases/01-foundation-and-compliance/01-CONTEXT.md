# Phase 1: Foundation and Compliance - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Layout shell with sticky header, smooth-scroll anchor navigation, mobile hamburger menu, footer with NMLS/compliance disclosures, and global design system (colors, typography, section wrapper pattern). Unblocks all content phases.

</domain>

<decisions>
## Implementation Decisions

### Brand Identity
- Text wordmark "Prashanna Sangroula" in header — no logo image needed
- Color palette: Navy + gold — classic finance/trust aesthetic
- Typography: Keep Geist Sans (already configured) for body, potentially a serif or different weight for headings to add gravitas

### Header Behavior
- Transparent header on hero section, transitions to solid with shadow on scroll
- Sticky at top of viewport at all times
- Contains: wordmark (left), nav links (center/right), phone number as CTA button (right)
- NMLS #2528620 displayed in header (small text, near wordmark or phone)
- Mobile: hamburger menu replaces nav links, phone number stays visible

### Footer Content
- Compliance section: Personal NMLS #2528620, Company NMLS (Loan Factory #320841), Equal Housing Lender text/logo, legal disclaimer
- Social links: Instagram, Facebook, LinkedIn (real profiles exist)
- Quick nav: repeat section anchor links (Services, About, Calculator, Contact)
- Email: prashanna@loanfactory.com as mailto link
- Phone number repeated

### Section Layout
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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/button.tsx`: CVA-based Button with variants — use for CTA buttons
- `src/lib/utils.ts`: `cn()` utility for className merging
- `src/app/globals.css`: Design tokens already set up with CSS custom properties (oklch) — extend with navy/gold palette

### Established Patterns
- shadcn/ui component pattern: "use client" directive, CVA variants, props spreading
- Path alias `@/*` → `src/*` used consistently
- Server Components by default, "use client" only when needed

### Integration Points
- `src/app/layout.tsx`: Root layout — add Header and Footer here
- `src/app/page.tsx`: Home page — compose section placeholders here
- `src/app/globals.css`: Add navy/gold design tokens here
- New components: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/shared/SectionWrapper.tsx`

</code_context>

<specifics>
## Specific Ideas

- Transparent-to-solid header like modern fintech sites
- Navy + gold palette for trust/credibility
- Footer should feel substantial but not overwhelming — compliance + useful links

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-and-compliance*
*Context gathered: 2026-03-12*
