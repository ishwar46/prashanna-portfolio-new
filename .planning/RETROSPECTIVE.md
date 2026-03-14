# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP Launch

**Shipped:** 2026-03-14
**Phases:** 5 | **Plans:** 11

### What Was Built
- Professional dual-role portfolio (Mortgage Loan Officer + Realtor)
- Navy/gold editorial design with dot-grid patterns, scroll animations
- 14 services with category filter, mortgage calculator, FAQ, contact form with email
- Full SEO: dynamic OG image, JSON-LD structured data, sitemap, Vercel Analytics
- Performance-optimized: LCP 1.8s, CLS 0, WCAG contrast compliant

### What Worked
- Frontend design skill produced distinctive, cohesive sections quickly — dot-grid, editorial cards, split panels
- Phase-by-phase approach kept scope tight; each phase delivered measurable value
- Real Google reviews and real photos replaced placeholders early, making the site feel authentic
- The dual-role pivot (adding real estate) was absorbed smoothly mid-project without replanning

### What Was Inefficient
- Mobile responsiveness was retrofitted after Phase 3 rather than built mobile-first from Phase 1
- FORM requirements in REQUIREMENTS.md weren't auto-checked when completed
- Hero image stayed as 348KB PNG through 3 phases before being caught by Lighthouse — should optimize images earlier
- Motion bundle (TBT 710ms) required LazyMotion refactor — could have used `m` from the start

### Patterns Established
- Navy panel with dot-grid pattern = signature visual element (hero, calculator, contact, footer CTA)
- Split-panel layout for interactive sections (inputs left, results right on navy)
- Gold accent bars and expanding gold dividers as hover/active indicators
- Uppercase tracking labels for section kickers and form labels
- `AnimatedSection` wrapper for Server Components, direct `m.div` for Client Components

### Key Lessons
1. Optimize images at creation time, not as a polish step — WebP should be default
2. Use LazyMotion + `m` from the start when using Motion library — avoids TBT refactor later
3. Mobile-first responsive should be enforced from Phase 1, not retrofitted
4. Real content (photos, reviews, bio) should be gathered before design phases, not after

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Change |
|-----------|--------|-------|------------|
| v1.0 | 5 | 11 | Initial build — established design system and patterns |

### Top Lessons (Verified Across Milestones)

1. Optimize assets at creation time, not during polish
2. Mobile-first from day one
