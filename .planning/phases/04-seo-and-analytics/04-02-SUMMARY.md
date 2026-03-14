---
phase: 04-seo-and-analytics
plan: 02
subsystem: seo
tags: [json-ld, structured-data, schema-org, vercel-analytics, speed-insights]

requires:
  - phase: 04-seo-and-analytics
    provides: SEO metadata, OG image, sitemap, robots.txt
  - phase: 02-static-content-sections
    provides: page.tsx with section components, constants.ts with contact/compliance data
provides:
  - JSON-LD structured data with Person, LocalBusiness, and RealEstateAgent schemas
  - Vercel Analytics and Speed Insights integration
affects: [05-deployment]

tech-stack:
  added: ["@vercel/analytics", "@vercel/speed-insights"]
  patterns: [Next.js JSON-LD script pattern, schema.org @graph multi-type]

key-files:
  created: []
  modified:
    - src/app/page.tsx
    - src/app/layout.tsx
    - package.json

key-decisions:
  - "JSON-LD uses @graph array with three schema types (Person, LocalBusiness, RealEstateAgent) for comprehensive rich results"
  - "XSS-safe angle bracket replacement applied even though data is static constants (defense in depth)"

patterns-established:
  - "JSON-LD structured data defined as module-level const, serialized with angle bracket escaping"

requirements-completed: [SEO-03, SEO-05]

duration: 2min
completed: 2026-03-14
---

# Phase 4 Plan 2: JSON-LD Structured Data and Analytics Summary

**JSON-LD @graph with Person/LocalBusiness/RealEstateAgent schemas plus Vercel Analytics and Speed Insights integration**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-14T09:02:38Z
- **Completed:** 2026-03-14T09:04:38Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Added comprehensive JSON-LD structured data with three schema types covering mortgage and real estate roles
- Integrated Vercel Analytics and Speed Insights for production traffic and performance monitoring
- All credential, contact, and service area data sourced from centralized constants

## Task Commits

Each task was committed atomically:

1. **Task 1: Add JSON-LD structured data to page.tsx** - `398ced4` (feat)
2. **Task 2: Install and wire Vercel Analytics and Speed Insights** - `3ba3bf3` (feat)

## Files Created/Modified
- `src/app/page.tsx` - Added JSON-LD script tag with Person, LocalBusiness, RealEstateAgent schemas in @graph array
- `src/app/layout.tsx` - Added Analytics and SpeedInsights components after Footer
- `package.json` - Added @vercel/analytics and @vercel/speed-insights dependencies

## Decisions Made
- Used @graph array pattern to include all three schema types in a single JSON-LD block
- Applied angle bracket escaping (`\u003c`) per Next.js docs even though all data is from static constants

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - Analytics and Speed Insights activate automatically on Vercel deployment.

## Next Phase Readiness
- Phase 4 (SEO and Analytics) fully complete
- Site ready for Phase 5 deployment with full SEO metadata, structured data, and analytics instrumentation

---
*Phase: 04-seo-and-analytics*
*Completed: 2026-03-14*
