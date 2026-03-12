# Requirements: Prashanna Sangroula Portfolio

**Defined:** 2026-03-12
**Core Value:** Visitors trust Prashanna enough to submit a contact form or call him within one session.

## v1 Requirements

### Compliance

- [ ] **COMP-01**: NMLS number (#2528620) displayed in header and footer
- [ ] **COMP-02**: Company NMLS (Loan Factory #320841) displayed in footer
- [ ] **COMP-03**: Equal Housing Lender logo and text in footer
- [ ] **COMP-04**: Legal disclaimer in footer ("Not a commitment to lend. Terms and conditions apply.")

### Layout & Navigation

- [ ] **NAV-01**: Sticky header with logo, navigation links, and phone number
- [ ] **NAV-02**: Smooth scroll anchor navigation between sections
- [ ] **NAV-03**: Phone number (571) 222-5555 as tap-to-call `tel:` link
- [ ] **NAV-04**: Mobile-responsive hamburger menu on small screens
- [ ] **NAV-05**: Footer with compliance disclosures, contact info, and copyright

### Hero

- [ ] **HERO-01**: Hero section with compelling headline and subtext
- [ ] **HERO-02**: Primary CTA button ("Get a Free Consultation") linking to contact form
- [ ] **HERO-03**: Professional headshot photo with optimized loading (LCP priority)

### Services

- [ ] **SERV-01**: Services section displaying all loan types as cards
- [ ] **SERV-02**: Each card has loan type name, brief description, and "who it's for"
- [ ] **SERV-03**: Clicking a service card navigates to contact form with that service pre-selected

### About

- [ ] **ABOUT-01**: About section with Prashanna's bio and story
- [ ] **ABOUT-02**: Professional photo in about section

### Testimonials

- [ ] **TEST-01**: Testimonials section with client reviews
- [ ] **TEST-02**: Each testimonial includes name (first + last initial), context, and quote

### FAQ

- [ ] **FAQ-01**: FAQ section with accordion-style expandable answers
- [ ] **FAQ-02**: Minimum 5 common loan process questions covered

### Calculator

- [ ] **CALC-01**: Interactive mortgage calculator with inputs for loan amount, interest rate, and term
- [ ] **CALC-02**: Real-time monthly payment estimate (principal & interest)
- [ ] **CALC-03**: Disclaimer text stating estimates only, not a commitment

### Contact Form

- [ ] **FORM-01**: Contact form with fields: name, email, phone, message, loan type (pre-selectable)
- [ ] **FORM-02**: Server-side validation with clear error messages
- [ ] **FORM-03**: Email delivery via Resend to prashanna@loanfactory.com
- [ ] **FORM-04**: Success/error states shown to user after submission
- [ ] **FORM-05**: Honeypot field for basic spam protection

### SEO & Analytics

- [ ] **SEO-01**: Page title, meta description, and canonical URL set
- [ ] **SEO-02**: Open Graph image and Twitter card meta tags
- [ ] **SEO-03**: JSON-LD structured data (LocalBusiness + Person schema)
- [ ] **SEO-04**: Auto-generated sitemap.xml and robots.txt
- [ ] **SEO-05**: Vercel Analytics and Speed Insights integrated

### Performance & Polish

- [ ] **PERF-01**: All images optimized via next/image (WebP, lazy loading, responsive)
- [ ] **PERF-02**: Subtle scroll-triggered animations using Motion (fadeInUp, once only)
- [ ] **PERF-03**: Respects `prefers-reduced-motion` for accessibility
- [ ] **PERF-04**: Mobile-responsive end-to-end (mobile-first Tailwind approach)
- [ ] **PERF-05**: LCP < 2.5s, CLS < 0.1 targets

## v2 Requirements

### Content Marketing

- **BLOG-01**: Blog with SEO-optimized articles about loan process, tips
- **BLOG-02**: MDX-based content with next-mdx-remote

### Enhanced Lead Capture

- **LEAD-01**: Calendly or Cal.com scheduling integration
- **LEAD-02**: CRM integration for automated follow-up
- **LEAD-03**: hCaptcha or Cloudflare Turnstile for advanced spam protection

### Expanded Features

- **EXP-01**: Multi-language support
- **EXP-02**: Dark mode
- **EXP-03**: Live chat widget

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online loan application | Handled by Loan Factory systems |
| Live rate ticker | Compliance risk, rates change constantly |
| User accounts / login | Not needed for a portfolio site |
| Social media feed embeds | Slows page, adds clutter |
| Payment processing | Not applicable |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| COMP-01 | — | Pending |
| COMP-02 | — | Pending |
| COMP-03 | — | Pending |
| COMP-04 | — | Pending |
| NAV-01 | — | Pending |
| NAV-02 | — | Pending |
| NAV-03 | — | Pending |
| NAV-04 | — | Pending |
| NAV-05 | — | Pending |
| HERO-01 | — | Pending |
| HERO-02 | — | Pending |
| HERO-03 | — | Pending |
| SERV-01 | — | Pending |
| SERV-02 | — | Pending |
| SERV-03 | — | Pending |
| ABOUT-01 | — | Pending |
| ABOUT-02 | — | Pending |
| TEST-01 | — | Pending |
| TEST-02 | — | Pending |
| FAQ-01 | — | Pending |
| FAQ-02 | — | Pending |
| CALC-01 | — | Pending |
| CALC-02 | — | Pending |
| CALC-03 | — | Pending |
| FORM-01 | — | Pending |
| FORM-02 | — | Pending |
| FORM-03 | — | Pending |
| FORM-04 | — | Pending |
| FORM-05 | — | Pending |
| SEO-01 | — | Pending |
| SEO-02 | — | Pending |
| SEO-03 | — | Pending |
| SEO-04 | — | Pending |
| SEO-05 | — | Pending |
| PERF-01 | — | Pending |
| PERF-02 | — | Pending |
| PERF-03 | — | Pending |
| PERF-04 | — | Pending |
| PERF-05 | — | Pending |

**Coverage:**
- v1 requirements: 39 total
- Mapped to phases: 0
- Unmapped: 39 (pending roadmap creation)

---
*Requirements defined: 2026-03-12*
*Last updated: 2026-03-12 after initial definition*
