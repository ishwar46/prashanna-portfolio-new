# Phase 4: SEO and Analytics - Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

<domain>
## Phase Boundary

SEO metadata, Open Graph social sharing, JSON-LD structured data, sitemap, robots.txt, and Vercel Analytics integration. Makes the site discoverable, shareable, and instrumented for traffic data from day one.

</domain>

<decisions>
## Implementation Decisions

### Open Graph & Social Sharing
- Use Next.js `next/og` (ImageResponse API) to dynamically generate the OG image — navy background with gold accents, Prashanna's name, dual roles, phone number
- Page title: "Prashanna Sangroula | Mortgage Loan Officer & Realtor"
- Meta description reflecting dual role: mortgage + real estate services across 12 states
- Twitter card type: summary_large_image
- OG type: website

### Structured Data (JSON-LD)
- Use multiple schema types: Person + LocalBusiness (for the Fairfax office) + RealEstateAgent
- Include both roles: Mortgage Loan Officer at Loan Factory and Realtor at oNest Real Estate
- Service area: all 12 licensed states (VA, DC, FL, GA, KY, MA, MD, NC, NH, OH, PA, WA)
- Include NMLS #2528620 and VA Real Estate License #225273183
- Contact: both phone numbers, both emails, office address
- sameAs links: Facebook, Instagram, LinkedIn profiles

### Sitemap & Robots
- Auto-generated sitemap.xml via Next.js sitemap() export in app/sitemap.ts
- robots.txt via Next.js robots() export in app/robots.ts
- Domain placeholder: use environment variable (NEXT_PUBLIC_SITE_URL) defaulting to "https://prashannasangroula.com" — easy to update when domain is purchased

### Analytics
- Vercel Analytics only (no Google Analytics) — lightweight, privacy-friendly, no cookie banner needed
- Install @vercel/analytics and @vercel/speed-insights packages
- Add Analytics and SpeedInsights components to root layout

### Claude's Discretion
- Exact OG image layout and typography within the dynamic generator
- JSON-LD schema nesting structure (graph vs standalone)
- Additional meta tags (geo, author, etc.)
- Canonical URL strategy

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `constants.ts`: CONTACT, COMPLIANCE, COMPANIES, SOCIAL_LINKS — all data needed for structured data and meta tags
- `layout.tsx`: Already has basic Metadata export — expand with full OG, Twitter, structured data
- Navy/gold palette values in globals.css — use for OG image generation

### Established Patterns
- Next.js App Router metadata API — use generateMetadata or static Metadata export
- Environment variables for deployment config

### Integration Points
- `src/app/layout.tsx`: Expand metadata, add Analytics/SpeedInsights components
- `src/app/sitemap.ts`: New file for sitemap generation
- `src/app/robots.ts`: New file for robots.txt
- `src/app/opengraph-image.tsx`: New file for dynamic OG image (next/og)

</code_context>

<specifics>
## Specific Ideas

- OG image should feel like the hero section — navy background, gold text, professional
- Structured data should highlight the dual role as a unique differentiator
- Domain is not purchased yet — use env var so it's a one-line change later

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-seo-and-analytics*
*Context gathered: 2026-03-14*
