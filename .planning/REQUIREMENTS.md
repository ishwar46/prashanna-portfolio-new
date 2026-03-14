# Requirements: Prashanna Sangroula Portfolio

**Defined:** 2026-03-12
**Core Value:** Visitors trust Prashanna enough to submit a contact form or call him within one session.

## v1 Requirements

### Compliance

- [x] **COMP-01**: NMLS number (#2528620) displayed in header and footer
- [x] **COMP-02**: Company NMLS (Loan Factory #320841) displayed in footer
- [x] **COMP-03**: Equal Housing Lender logo and text in footer
- [x] **COMP-04**: Legal disclaimer in footer ("Not a commitment to lend. Terms and conditions apply.")

### Layout & Navigation

- [x] **NAV-01**: Sticky header with logo, navigation links, and phone number
- [x] **NAV-02**: Smooth scroll anchor navigation between sections
- [x] **NAV-03**: Phone number (571) 222-5555 as tap-to-call `tel:` link
- [x] **NAV-04**: Mobile-responsive hamburger menu on small screens
- [x] **NAV-05**: Footer with compliance disclosures, contact info, and copyright

### Hero

- [x] **HERO-01**: Hero section with compelling headline and subtext
- [x] **HERO-02**: Primary CTA button ("Get a Free Consultation") linking to contact form
- [x] **HERO-03**: Professional headshot photo with optimized loading (LCP priority)

### Services

- [x] **SERV-01**: Services section displaying all loan types as cards
- [x] **SERV-02**: Each card has loan type name, brief description, and "who it's for"
- [x] **SERV-03**: Clicking a service card navigates to contact form with that service pre-selected

### About

- [x] **ABOUT-01**: About section with Prashanna's bio and story
- [x] **ABOUT-02**: Professional photo in about section

### Testimonials

- [x] **TEST-01**: Testimonials section with client reviews
- [x] **TEST-02**: Each testimonial includes name (first + last initial), context, and quote

### FAQ

- [x] **FAQ-01**: FAQ section with accordion-style expandable answers
- [x] **FAQ-02**: Minimum 5 common loan process questions covered

### Calculator

- [x] **CALC-01**: Interactive mortgage calculator with inputs for loan amount, interest rate, and term
- [x] **CALC-02**: Real-time monthly payment estimate (principal & interest)
- [x] **CALC-03**: Disclaimer text stating estimates only, not a commitment

### Contact Form

- [ ] **FORM-01**: Contact form with fields: name, email, phone, message, loan type (pre-selectable)
- [ ] **FORM-02**: Server-side validation with clear error messages
- [ ] **FORM-03**: Email delivery via Resend to prashanna@loanfactory.com
- [ ] **FORM-04**: Success/error states shown to user after submission
- [ ] **FORM-05**: Honeypot field for basic spam protection

### SEO & Analytics

- [x] **SEO-01**: Page title, meta description, and canonical URL set
- [x] **SEO-02**: Open Graph image and Twitter card meta tags
- [x] **SEO-03**: JSON-LD structured data (LocalBusiness + Person schema)
- [x] **SEO-04**: Auto-generated sitemap.xml and robots.txt
- [x] **SEO-05**: Vercel Analytics and Speed Insights integrated

### Performance & Polish

- [x] **PERF-01**: All images optimized via next/image (WebP, lazy loading, responsive)
- [x] **PERF-02**: Subtle scroll-triggered animations using Motion (fadeInUp, once only)
- [x] **PERF-03**: Respects `prefers-reduced-motion` for accessibility
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
| COMP-01 | Phase 1 | Complete |
| COMP-02 | Phase 1 | Complete |
| COMP-03 | Phase 1 | Complete |
| COMP-04 | Phase 1 | Complete |
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 1 | Complete |
| NAV-03 | Phase 1 | Complete |
| NAV-04 | Phase 1 | Complete |
| NAV-05 | Phase 1 | Complete |
| HERO-01 | Phase 2 | Complete |
| HERO-02 | Phase 2 | Complete |
| HERO-03 | Phase 2 | Complete |
| SERV-01 | Phase 2 | Complete |
| SERV-02 | Phase 2 | Complete |
| SERV-03 | Phase 2 | Complete |
| ABOUT-01 | Phase 2 | Complete |
| ABOUT-02 | Phase 2 | Complete |
| TEST-01 | Phase 2 | Complete |
| TEST-02 | Phase 2 | Complete |
| FAQ-01 | Phase 3 | Complete |
| FAQ-02 | Phase 3 | Complete |
| CALC-01 | Phase 3 | Complete |
| CALC-02 | Phase 3 | Complete |
| CALC-03 | Phase 3 | Complete |
| FORM-01 | Phase 3 | Pending |
| FORM-02 | Phase 3 | Pending |
| FORM-03 | Phase 3 | Pending |
| FORM-04 | Phase 3 | Pending |
| FORM-05 | Phase 3 | Pending |
| SEO-01 | Phase 4 | Complete |
| SEO-02 | Phase 4 | Complete |
| SEO-03 | Phase 4 | Complete |
| SEO-04 | Phase 4 | Complete |
| SEO-05 | Phase 4 | Complete |
| PERF-01 | Phase 5 | Complete |
| PERF-02 | Phase 5 | Complete |
| PERF-03 | Phase 5 | Complete |
| PERF-04 | Phase 5 | Pending |
| PERF-05 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 39 total
- Mapped to phases: 39
- Unmapped: 0

---
*Requirements defined: 2026-03-12*
*Last updated: 2026-03-14 after 03-01 completion*
