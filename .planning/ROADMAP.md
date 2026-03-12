# Roadmap: Prashanna Sangroula Portfolio

## Overview

A five-phase build that goes from a compliant structural shell to a fully optimized, launch-ready lead-generation site. Phase 1 locks in legal compliance and navigation before any content is visible. Phase 2 fills the page with static content sections that build trust. Phase 3 adds the interactive sections — calculator, FAQ, and contact form — that drive conversions. Phase 4 layers in SEO and analytics so the site earns organic traffic from day one. Phase 5 validates performance, accessibility, and mobile quality before real traffic arrives.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation and Compliance** - Layout shell, sticky header/footer, NMLS disclosures, and global styles (completed 2026-03-12)
- [ ] **Phase 2: Static Content Sections** - Hero, About, Services, and Testimonials as Server Components
- [ ] **Phase 3: Interactive Sections** - Mortgage calculator, FAQ accordion, and contact form with email delivery
- [ ] **Phase 4: SEO and Analytics** - Metadata, Open Graph, JSON-LD structured data, sitemap, and Vercel Analytics
- [ ] **Phase 5: Polish and Launch Validation** - Performance audit, animation quality, accessibility, and mobile verification

## Phase Details

### Phase 1: Foundation and Compliance
**Goal**: The site has a structurally complete shell with required legal disclosures that unblocks all content sections
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, COMP-01, COMP-02, COMP-03, COMP-04
**Success Criteria** (what must be TRUE):
  1. Visiting the site shows a sticky header containing Prashanna's name/logo, navigation links, the phone number (571) 222-5555 as a tappable link, and NMLS #2528620
  2. Clicking any navigation link smoothly scrolls to the correct section anchor
  3. Tapping the phone number on a mobile device triggers a call
  4. The hamburger menu opens and closes on screens narrower than the desktop breakpoint, revealing navigation links
  5. The footer displays personal NMLS #2528620, company NMLS (Loan Factory #320841), Equal Housing Lender text, and the legal disclaimer about not being a commitment to lend
**Plans:** 3/3 plans complete
Plans:
- [ ] 01-01-PLAN.md — Design system (navy/gold tokens), constants, SectionWrapper, page scaffolding, layout wiring
- [ ] 01-02-PLAN.md — Sticky header with transparent-to-solid scroll, desktop nav, phone CTA, mobile hamburger menu
- [ ] 01-03-PLAN.md — Footer with compliance disclosures (NMLS, Equal Housing, disclaimer), contact, social links

### Phase 2: Static Content Sections
**Goal**: Visitors can read Prashanna's full professional story, see all loan products, and review client testimonials without any page load gaps
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, SERV-01, SERV-02, SERV-03, ABOUT-01, ABOUT-02, TEST-01, TEST-02
**Success Criteria** (what must be TRUE):
  1. The above-the-fold hero displays a compelling headline, supporting subtext, a "Get a Free Consultation" CTA button, and Prashanna's professional headshot
  2. Clicking the hero CTA button scrolls to the contact form section
  3. The services section shows all loan type cards (Conventional, FHA, VA, USDA, Jumbo, DSCR, Bank Statement, Foreign National, Refinancing, HELOC, Reverse Mortgage), each with a name, brief description, and who it is for
  4. Clicking a service card scrolls to the contact form and pre-selects that loan type
  5. The about section displays Prashanna's bio and a professional photo, and the testimonials section shows reviews each with client name format (first + last initial), context, and quote
**Plans**: TBD

### Phase 3: Interactive Sections
**Goal**: Visitors can estimate their mortgage payment, get answers to common questions, and submit a lead via the contact form — with all submissions delivered to Prashanna's inbox
**Depends on**: Phase 2
**Requirements**: CALC-01, CALC-02, CALC-03, FAQ-01, FAQ-02, FORM-01, FORM-02, FORM-03, FORM-04, FORM-05
**Success Criteria** (what must be TRUE):
  1. Entering a loan amount, interest rate, and term into the calculator instantly updates the monthly payment estimate (principal and interest), and disclaimer text is visible stating estimates only
  2. Clicking any FAQ item expands its answer; clicking again collapses it; at least 5 questions are present
  3. Submitting the contact form with valid data (name, email, phone, message, loan type) shows a success confirmation to the user and delivers the submission to prashanna@loanfactory.com
  4. Submitting the form with missing or invalid fields shows clear, field-level error messages without navigating away from the page
  5. The form includes a hidden honeypot field invisible to real users
**Plans**: TBD

### Phase 4: SEO and Analytics
**Goal**: The site is fully discoverable by search engines, shareable on social media with a rich preview, and instrumented to capture conversion data from the first visitor
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. Pasting the site URL into a social platform previewer (e.g., opengraph.xyz) shows a title, description, and Open Graph image
  2. The page source contains a JSON-LD script block with LocalBusiness and Person structured data including NMLS number, contact details, and service area
  3. Fetching /sitemap.xml returns a valid XML sitemap listing the site URL
  4. Fetching /robots.txt returns a valid robots file
  5. The Vercel Analytics dashboard shows page view and Web Vitals data after at least one real visit
**Plans**: TBD

### Phase 5: Polish and Launch Validation
**Goal**: The site passes Core Web Vitals thresholds, renders correctly on real mobile devices, and is ready to receive real traffic without known deficiencies
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):
  1. All images on the page use next/image (visible as WebP or AVIF in network tab) and non-hero images load lazily
  2. Scroll-triggered animations play once on entry and do not replay on scroll-back; on a device with prefers-reduced-motion enabled, animations are suppressed
  3. Measured LCP is below 2.5 seconds and CLS is below 0.1 on a simulated mobile connection in Lighthouse or PageSpeed Insights
  4. Every section of the page is usable on a 375px-wide viewport with no horizontal scrolling and all tap targets are adequately sized
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Compliance | 3/3 | Complete   | 2026-03-12 |
| 2. Static Content Sections | 0/TBD | Not started | - |
| 3. Interactive Sections | 0/TBD | Not started | - |
| 4. SEO and Analytics | 0/TBD | Not started | - |
| 5. Polish and Launch Validation | 0/TBD | Not started | - |
