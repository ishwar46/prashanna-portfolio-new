# Phase 4: SEO and Analytics - Research

**Researched:** 2026-03-14
**Domain:** Next.js SEO (metadata, OG images, structured data, sitemap, robots, analytics)
**Confidence:** HIGH

## Summary

Phase 4 adds discoverability, social sharing, and traffic instrumentation to a single-page Next.js 16.1.6 portfolio site. All five requirements are well-served by built-in Next.js App Router conventions: static `Metadata` export for meta tags, file-convention `opengraph-image.tsx` for dynamic OG image generation via `next/og` ImageResponse, `sitemap.ts` and `robots.ts` for crawler files, and inline `<script type="application/ld+json">` for structured data. Analytics is handled by dropping `@vercel/analytics` and `@vercel/speed-insights` components into the root layout.

The existing codebase already has a `Metadata` export in `layout.tsx` with basic title/description, and `constants.ts` contains all contact, compliance, company, social, and service data needed for structured data and meta tags. The work is primarily additive: expanding the metadata object, creating four new files, and installing two packages.

**Primary recommendation:** Use Next.js built-in metadata conventions for everything. No third-party SEO libraries needed. JSON-LD goes as a `<script>` tag in `page.tsx`. OG image uses `next/og` ImageResponse with inline styles (flexbox only). Domain uses `NEXT_PUBLIC_SITE_URL` env var.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Use Next.js `next/og` (ImageResponse API) to dynamically generate the OG image -- navy background with gold accents, Prashanna's name, dual roles, phone number
- Page title: "Prashanna Sangroula | Mortgage Loan Officer & Realtor"
- Meta description reflecting dual role: mortgage + real estate services across 12 states
- Twitter card type: summary_large_image
- OG type: website
- Use multiple schema types: Person + LocalBusiness (for the Fairfax office) + RealEstateAgent
- Include both roles: Mortgage Loan Officer at Loan Factory and Realtor at oNest Real Estate
- Service area: all 12 licensed states (VA, DC, FL, GA, KY, MA, MD, NC, NH, OH, PA, WA)
- Include NMLS #2528620 and VA Real Estate License #225273183
- Contact: both phone numbers, both emails, office address
- sameAs links: Facebook, Instagram, LinkedIn profiles
- Auto-generated sitemap.xml via Next.js sitemap() export in app/sitemap.ts
- robots.txt via Next.js robots() export in app/robots.ts
- Domain placeholder: use environment variable (NEXT_PUBLIC_SITE_URL) defaulting to "https://prashannasangroula.com"
- Vercel Analytics only (no Google Analytics) -- lightweight, privacy-friendly, no cookie banner needed
- Install @vercel/analytics and @vercel/speed-insights packages
- Add Analytics and SpeedInsights components to root layout

### Claude's Discretion
- Exact OG image layout and typography within the dynamic generator
- JSON-LD schema nesting structure (graph vs standalone)
- Additional meta tags (geo, author, etc.)
- Canonical URL strategy

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Page title, meta description, and canonical URL set | Expand existing `Metadata` export in `layout.tsx` with `metadataBase`, `title`, `description`, `alternates.canonical`, `openGraph`, `twitter` fields |
| SEO-02 | Open Graph image and Twitter card meta tags | Create `src/app/opengraph-image.tsx` using `ImageResponse` from `next/og`; Next.js auto-generates og:image and twitter:image meta tags from this file |
| SEO-03 | JSON-LD structured data (LocalBusiness + Person schema) | Add `<script type="application/ld+json">` in `page.tsx` with `@graph` array containing Person, LocalBusiness, and RealEstateAgent schemas; use XSS-safe serialization |
| SEO-04 | Auto-generated sitemap.xml and robots.txt | Create `src/app/sitemap.ts` and `src/app/robots.ts` using `MetadataRoute` types |
| SEO-05 | Vercel Analytics and Speed Insights integrated | Install `@vercel/analytics` and `@vercel/speed-insights`, add `<Analytics />` and `<SpeedInsights />` components to `layout.tsx` |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/og (ImageResponse) | Built into Next.js 16.1.6 | Dynamic OG image generation | Official Next.js API, uses Satori under the hood, no extra dependency |
| @vercel/analytics | 2.0.1 | Page view and event tracking | Official Vercel package, privacy-friendly, no cookie banner |
| @vercel/speed-insights | 2.0.0 | Web Vitals (LCP, CLS, FID, TTFB) | Official Vercel package, feeds Speed Insights dashboard |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | latest | TypeScript types for JSON-LD schemas | Optional -- provides `WithContext<Person>`, `LocalBusiness` etc. types for type-safe structured data |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next/og ImageResponse | Static PNG file | Static is simpler but cannot include dynamic text; user wants navy/gold branded image with name and roles |
| Manual JSON-LD | next-seo library | next-seo adds unnecessary abstraction; Next.js metadata API + manual script tag covers everything needed |
| schema-dts | Raw object literals | schema-dts adds type safety but is optional; raw objects work fine for 3 schema types |

**Installation:**
```bash
npm install @vercel/analytics @vercel/speed-insights
```

Optional (for type-safe JSON-LD):
```bash
npm install -D schema-dts
```

## Architecture Patterns

### New Files to Create
```
src/app/
  opengraph-image.tsx   # Dynamic OG image (next/og ImageResponse)
  sitemap.ts            # Auto-served at /sitemap.xml
  robots.ts             # Auto-served at /robots.txt
  layout.tsx            # MODIFY: expand Metadata, add Analytics/SpeedInsights
  page.tsx              # MODIFY: add JSON-LD script tag
```

### Pattern 1: Expanded Static Metadata in layout.tsx
**What:** Extend the existing `Metadata` export with full OG, Twitter, and canonical fields.
**When to use:** Single-page site with no per-route variation.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prashannasangroula.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Prashanna Sangroula | Mortgage Loan Officer & Realtor",
  description: "Licensed Mortgage Loan Officer (NMLS #2528620) and Realtor serving VA, DC, FL, GA, KY, MA, MD, NC, NH, OH, PA & WA. Conventional, FHA, VA, USDA, Jumbo, DSCR, and Bank Statement loans.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Prashanna Sangroula | Mortgage Loan Officer & Realtor",
    description: "...",
    url: BASE_URL,
    siteName: "Prashanna Sangroula",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashanna Sangroula | Mortgage Loan Officer & Realtor",
    description: "...",
  },
};
```

### Pattern 2: Dynamic OG Image with ImageResponse
**What:** Generate a branded PNG at build time using JSX + inline CSS (flexbox only).
**When to use:** When you want text/branding embedded in the social preview image.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
import { ImageResponse } from "next/og";

export const alt = "Prashanna Sangroula - Mortgage Loan Officer & Realtor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // Navy background -- use hex/rgb, NOT oklch (Satori does not support oklch)
        backgroundColor: "#1a1f4e",
        color: "white",
      }}>
        {/* Layout content here */}
      </div>
    ),
    { ...size }
  );
}
```

### Pattern 3: JSON-LD as Script Tag in page.tsx
**What:** Render structured data in the page component using the official Next.js approach.
**When to use:** Official Next.js recommendation for App Router JSON-LD.
**Note:** The script tag uses JSON.stringify with XSS mitigation per official Next.js docs. The data is entirely static constants from constants.ts, so there is no user-supplied content risk. The `.replace()` is applied as a defensive best practice.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", name: "Prashanna Sangroula" },
    { "@type": "LocalBusiness", name: "Loan Factory, Inc." },
    { "@type": "RealEstateAgent", name: "Prashanna Sangroula" },
  ],
};

// In JSX -- official Next.js pattern with XSS prevention:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
/>
```

### Pattern 4: Sitemap and Robots via MetadataRoute
**What:** Export functions returning typed objects; Next.js auto-serves at /sitemap.xml and /robots.txt.
**When to use:** Always for Next.js App Router projects.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prashannasangroula.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

### Pattern 5: Vercel Analytics Components
**What:** Import and add `<Analytics />` and `<SpeedInsights />` to root layout body.
**When to use:** Any Vercel-deployed Next.js project.
**Example:**
```typescript
// Source: https://vercel.com/docs/analytics/quickstart
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Inside layout body:
<body>
  <Header />
  <main>{children}</main>
  <Footer />
  <Analytics />
  <SpeedInsights />
</body>
```

### Anti-Patterns to Avoid
- **Using oklch() colors in OG image:** Satori (the renderer behind ImageResponse) does NOT support oklch color format. Use hex or rgb values instead. The navy/gold palette from globals.css must be converted.
- **Putting JSON-LD in layout.tsx:** The official recommendation is to place it in `page.tsx`, not layout. Layout metadata is for the `Metadata` object.
- **Using `display: grid` in OG image:** ImageResponse only supports flexbox. No grid layout. Absolute positioning IS supported.
- **Duplicating twitter-image when same as OG:** If the Twitter image is identical to OG, just create `opengraph-image.tsx` -- Next.js will use it for both unless a separate `twitter-image.tsx` exists with different content.
- **Setting openGraph.images in Metadata AND having opengraph-image.tsx:** This creates duplicate og:image tags. Use the file convention only.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Meta tag management | Custom `<Head>` component with manual tags | Next.js `Metadata` export | Framework handles deduplication, merging, and proper tag placement |
| OG image generation | Canvas/Sharp-based image builder | `next/og` ImageResponse | Built-in, edge-optimized, JSX-based, cached by default |
| Sitemap generation | Manual XML string building | `sitemap.ts` with `MetadataRoute.Sitemap` | Type-safe, auto-served, cached |
| Robots.txt | Static file in `public/` | `robots.ts` with `MetadataRoute.Robots` | Can reference env-var-based sitemap URL |
| Analytics tracking | Custom event listeners | `@vercel/analytics` | Automatic page view tracking, SPA-aware route changes |

**Key insight:** Next.js 16 has comprehensive built-in SEO primitives. Every requirement in this phase maps to a framework convention. Zero custom infrastructure needed.

## Common Pitfalls

### Pitfall 1: Missing metadataBase
**What goes wrong:** OG image URLs resolve to relative paths, breaking social previews.
**Why it happens:** Without `metadataBase`, Next.js cannot construct absolute URLs for OG images.
**How to avoid:** Set `metadataBase: new URL(BASE_URL)` in root layout metadata.
**Warning signs:** Social media debuggers show broken image or relative URL in og:image.

### Pitfall 2: oklch Colors in ImageResponse
**What goes wrong:** OG image renders with black/missing backgrounds or throws errors.
**Why it happens:** Satori (the SVG renderer behind ImageResponse) does not support oklch() color syntax.
**How to avoid:** Convert oklch palette values to hex equivalents for the OG image. Navy-900 ~ `#1a1f4e`, Gold-500 ~ `#c4a535`.
**Warning signs:** OG image preview looks wrong or has unexpected colors.

### Pitfall 3: JSON-LD XSS via Content
**What goes wrong:** Malicious `<script>` tags in JSON-LD payload could execute.
**Why it happens:** `JSON.stringify` does not escape `<` characters.
**How to avoid:** Use `.replace(/</g, "\\u003c")` on the stringified JSON per official Next.js docs. This project uses static constants so risk is minimal, but apply the pattern defensively.
**Warning signs:** N/A for this project (data is static constants).

### Pitfall 4: Forgetting NEXT_PUBLIC_ Prefix
**What goes wrong:** Environment variable is undefined on the client side.
**Why it happens:** Next.js only exposes env vars prefixed with `NEXT_PUBLIC_` to client bundles.
**How to avoid:** Name the variable `NEXT_PUBLIC_SITE_URL`. For server-only files (sitemap.ts, robots.ts), either prefix works, but keeping consistency with one name is simpler.
**Warning signs:** Sitemap or canonical URL shows "undefined" or falls back to default.

### Pitfall 5: Analytics Not Working Locally
**What goes wrong:** No data appears in Vercel Analytics dashboard during local development.
**Why it happens:** `@vercel/analytics` only sends data when deployed on Vercel (production/preview).
**How to avoid:** Do not debug locally. Verify after deploying to Vercel. The component renders harmlessly in dev.
**Warning signs:** This is expected behavior, not a bug.

### Pitfall 6: Duplicate OG Tags from File Convention + Metadata Object
**What goes wrong:** Two `og:image` tags appear in the HTML head.
**Why it happens:** Both `opengraph-image.tsx` file and `openGraph.images` in Metadata export generate og:image tags.
**How to avoid:** Use `opengraph-image.tsx` for the image and do NOT set `openGraph.images` in the Metadata object. The file convention takes precedence and handles it automatically.
**Warning signs:** View page source shows duplicate `og:image` meta tags.

## Code Examples

### OG Image Color Conversion Reference
```
Navy palette (oklch -> approximate hex):
  navy-900: oklch(0.20 0.07 250) -> #1a1f4e
  navy-800: oklch(0.25 0.08 250) -> #232960
  navy-950: oklch(0.15 0.06 250) -> #11143a

Gold palette (oklch -> approximate hex):
  gold-500: oklch(0.72 0.15 70) -> #c4a535
  gold-400: oklch(0.77 0.14 75) -> #d4b84a
  gold-300: oklch(0.83 0.12 80) -> #e0ca6e
```

### JSON-LD @graph Structure (Recommended)
```typescript
// Use @graph to bundle multiple schema entities in one script block
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Prashanna Sangroula",
      jobTitle: ["Mortgage Loan Officer", "Realtor"],
      telephone: [CONTACT.phoneHref, CONTACT.realEstatePhoneHref],
      email: [CONTACT.email, CONTACT.realEstateEmail],
      url: BASE_URL,
      image: `${BASE_URL}/headshot.jpg`,
      sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram, SOCIAL_LINKS.linkedin],
      worksFor: [
        { "@type": "Organization", name: COMPANIES.loanFactory.name },
        { "@type": "Organization", name: COMPANIES.onest.name },
      ],
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", credentialId: "NMLS #2528620" },
        { "@type": "EducationalOccupationalCredential", credentialId: "VA Real Estate License #225273183" },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: COMPANIES.loanFactory.name,
      telephone: CONTACT.phoneHref,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "9697 Main St",
        addressLocality: "Fairfax",
        addressRegion: "VA",
        postalCode: "22031",
        addressCountry: "US",
      },
      areaServed: ["VA", "DC", "FL", "GA", "KY", "MA", "MD", "NC", "NH", "OH", "PA", "WA"],
      employee: { "@id": `${BASE_URL}/#person` },
    },
    {
      "@type": "RealEstateAgent",
      "@id": `${BASE_URL}/#realestateagent`,
      name: "Prashanna Sangroula",
      telephone: CONTACT.realEstatePhoneHref,
      email: CONTACT.realEstateEmail,
      worksFor: { "@type": "Organization", name: COMPANIES.onest.name },
      areaServed: { "@type": "State", name: "Virginia" },
    },
  ],
};
```

### Vercel Analytics Integration
```typescript
// Source: https://vercel.com/docs/analytics/quickstart
// Import paths use /next subpath for Next.js-specific integration
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@vercel/og` package | `next/og` (built into Next.js) | Next.js 14+ | No separate package needed for OG image generation |
| `next-seo` third-party package | Built-in `Metadata` export | Next.js 13.2+ (App Router) | Framework-native, no dependency needed |
| Manual `<Head>` component | `metadata` / `generateMetadata` exports | Next.js 13.2+ | Auto-deduplication, type-safe, SSR-correct |
| Static robots.txt in public/ | `robots.ts` with MetadataRoute | Next.js 13.3+ | Can use env vars for sitemap URL |

**Deprecated/outdated:**
- `next-seo` package: Still works but unnecessary with App Router metadata API
- `@vercel/og` as separate install: Use `next/og` instead in Next.js 14+
- `import { Analytics } from "@vercel/analytics/react"`: Use `@vercel/analytics/next` for Next.js projects

## Open Questions

1. **Exact hex values for navy/gold palette**
   - What we know: oklch values defined in globals.css
   - What is unclear: The exact hex conversion may vary slightly depending on rendering engine
   - Recommendation: Test OG image visually after implementation; adjust hex values if colors look off. The values listed above are close approximations.

2. **Twitter image: separate or shared with OG?**
   - What we know: Both can use 1200x630. User specified `summary_large_image` card type.
   - What is unclear: Whether a separate twitter-image.tsx is desired
   - Recommendation: Use just `opengraph-image.tsx` -- Next.js uses it for both. Only create `twitter-image.tsx` if a different design is needed.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None -- no test framework installed |
| Config file | none -- see Wave 0 |
| Quick run command | `npm run build` (build validates metadata, sitemap, robots) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | Page title, meta description, canonical URL in HTML head | smoke | `npm run build` (build failure if Metadata export is malformed) | N/A |
| SEO-02 | OG image renders at /opengraph-image and Twitter meta tags present | smoke | `curl localhost:3000/opengraph-image` after dev server start | N/A |
| SEO-03 | JSON-LD script block in page source with Person, LocalBusiness, RealEstateAgent | manual-only | View page source, paste into Google Rich Results Test | N/A |
| SEO-04 | /sitemap.xml and /robots.txt return valid content | smoke | `curl localhost:3000/sitemap.xml && curl localhost:3000/robots.txt` | N/A |
| SEO-05 | Analytics and SpeedInsights components in layout | smoke | `npm run build` (import errors caught at build) | N/A |

### Sampling Rate
- **Per task commit:** `npm run build`
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Full build green + manual verification of OG preview and JSON-LD in Rich Results Test

### Wave 0 Gaps
None -- this phase produces static output verifiable via `npm run build` and manual browser/curl inspection. No test framework needed for SEO metadata validation. Build catches TypeScript/import errors. Manual verification covers structured data validity.

## Sources

### Primary (HIGH confidence)
- [Next.js opengraph-image docs (v16.1.6)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) - ImageResponse API, file conventions, config exports
- [Next.js sitemap.xml docs (v16.1.6)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - MetadataRoute.Sitemap type, code generation
- [Next.js robots.txt docs (v16.1.6)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - MetadataRoute.Robots type
- [Next.js JSON-LD guide (v16.1.6)](https://nextjs.org/docs/app/guides/json-ld) - Script tag approach, XSS prevention
- [Next.js Metadata and OG images guide (v16.1.6)](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) - Overall metadata architecture
- [Vercel Analytics quickstart](https://vercel.com/docs/analytics/quickstart) - @vercel/analytics setup
- [Vercel Speed Insights quickstart](https://vercel.com/docs/speed-insights/quickstart) - @vercel/speed-insights setup

### Secondary (MEDIUM confidence)
- [Schema.org RealEstateAgent](https://schema.org/RealEstateAgent) - Schema type for real estate professionals
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness) - Schema type for local businesses
- [Google Local Business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) - Google requirements for LocalBusiness schema

### Tertiary (LOW confidence)
- OG image hex color conversions from oklch - approximate manual conversion, may need visual tuning

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all tools are built-in Next.js or official Vercel packages, verified against v16.1.6 docs
- Architecture: HIGH - file conventions and patterns confirmed in official Next.js documentation dated 2026-02-27
- Pitfalls: HIGH - oklch limitation is well-documented in Satori; metadataBase requirement is in official docs
- JSON-LD structure: MEDIUM - @graph pattern is standard schema.org but specific property choices for mortgage/real estate are based on schema.org type definitions

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (stable -- Next.js metadata API is mature and unlikely to change)
