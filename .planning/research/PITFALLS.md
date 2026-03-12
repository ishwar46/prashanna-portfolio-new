# Pitfalls Research: Loan Officer Portfolio Website

**Domain:** Loan officer lead-generation portfolio site
**Researched:** 2026-03-12

## Critical Pitfalls

### 1. Missing NMLS Compliance Disclosures

**Risk:** Legal violation — SAFE Act requires NMLS number on all advertising/marketing materials.

**Warning signs:** No NMLS number in header/footer, missing Equal Housing Lender logo, no company NMLS.

**Prevention:**
- Display personal NMLS #2528620 in header AND footer
- Display company NMLS (Loan Factory #320841) in footer
- Include Equal Housing Lender logo and text in footer
- Add disclaimer: "Not a commitment to lend. Terms and conditions apply."

**Phase:** Foundation (layout shell) — compliance elements must be in the first build.

---

### 2. Contact Form That Doesn't Actually Deliver

**Risk:** Leads lost silently — form appears to work but emails never arrive.

**Warning signs:** No email delivery testing, no error handling, no fallback.

**Prevention:**
- Test email delivery end-to-end before launch (Resend has a test mode)
- Add server-side validation with clear error messages
- Log form submissions as backup (console.log in Server Action during dev)
- Show clear success/error states to the user
- Test with real email addresses, not just dev addresses

**Phase:** Contact form build phase — must be verified before any other polish.

---

### 3. Mortgage Calculator Accuracy Issues

**Risk:** Incorrect payment estimates damage trust and could create legal liability.

**Warning signs:** Using approximate formulas, not accounting for PMI/taxes/insurance, no disclaimers.

**Prevention:**
- Use the standard amortization formula: `M = P * [r(1+r)^n] / [(1+r)^n - 1]`
- Clearly label as "estimate" — not a quote or commitment
- Add disclaimer: "This calculator provides estimates only. Actual payments may vary."
- Don't include taxes/insurance/PMI — label as "Principal & Interest only"
- Validate inputs (no negative numbers, reasonable ranges)
- Unit test the calculator function with known correct values

**Phase:** Calculator build phase.

---

### 4. Slow Page Load Killing Conversions

**Risk:** Every second of load delay reduces conversions by ~7%. Mortgage shoppers are impatient.

**Warning signs:** Large unoptimized images, too many client components, no lazy loading.

**Prevention:**
- Use `next/image` with `priority` on hero image (LCP)
- Lazy load below-fold images
- Keep most sections as Server Components (ship less JS)
- Use `@vercel/speed-insights` to monitor Core Web Vitals
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Test on 3G throttle before launch

**Phase:** Every phase — but final performance audit in polish phase.

---

### 5. Poor Mobile Experience

**Risk:** 60%+ of mortgage research happens on mobile. Bad mobile UX = lost leads.

**Warning signs:** Desktop-first development, untested on real devices, tiny tap targets.

**Prevention:**
- Mobile-first Tailwind approach (base styles = mobile, `md:` = desktop)
- Phone number must be a `tel:` link (tap to call)
- Contact form inputs need `min-h-[44px]` tap targets
- Test on actual phone, not just browser DevTools resize
- Sticky header must not eat too much vertical space on mobile

**Phase:** Every phase — enforce mobile-first from the start.

---

### 6. SEO Missed Opportunities

**Risk:** Site invisible on Google — no organic traffic from "loan officer near me" searches.

**Warning signs:** Missing meta tags, no structured data, no sitemap, generic title.

**Prevention:**
- Set specific, keyword-rich title: "Prashanna Sangroula | Mortgage Loan Officer | [Area]"
- Add `LocalBusiness` + `Person` JSON-LD structured data
- Generate `sitemap.xml` and `robots.txt` via Next.js conventions
- Add Open Graph image for social sharing
- Use semantic HTML (`h1`, `h2`, `section`, `article`)
- Ensure all images have descriptive `alt` text

**Phase:** SEO phase — after content is finalized.

---

### 7. Contact Form Spam

**Risk:** Inbox flooded with bot submissions, real leads get buried.

**Warning signs:** No bot protection, form publicly accessible with no validation.

**Prevention (v1):**
- Add a honeypot field (hidden input — bots fill it, humans don't)
- Server-side validation (reject empty/malformed submissions)
- Rate limiting on the Server Action (basic check)

**Prevention (post-v1 if needed):**
- Add hCaptcha or Cloudflare Turnstile

**Phase:** Contact form build phase.

---

### 8. Over-Animating the Page

**Risk:** Animations feel gimmicky instead of professional. Distracts from conversion goal.

**Warning signs:** Every element animates, long animation durations, animations replay on scroll.

**Prevention:**
- Animate sections only, not individual text/icons
- Use `viewport={{ once: true }}` — animate in once
- Keep durations short (300-500ms)
- Use subtle `fadeInUp` pattern — no bounces, flips, or spins
- Disable animations for `prefers-reduced-motion`

**Phase:** Every phase with visual elements.

---

### 9. Testimonials Without Credibility

**Risk:** Generic testimonials feel fake and hurt trust instead of building it.

**Warning signs:** No names, no context, identical format, too many 5-star reviews.

**Prevention:**
- Include first name and last initial minimum
- Add context (e.g., "First-time homebuyer, VA loan")
- Vary the format and length
- 3-5 testimonials is plenty — quality over quantity
- If no real testimonials yet, skip the section and add later

**Phase:** Testimonials section build.

---

### 10. No Clear Call-to-Action Above the Fold

**Risk:** Visitors don't know what to do — bounce without converting.

**Warning signs:** Hero section has no button, CTA is below the fold, generic "Learn More" text.

**Prevention:**
- Primary CTA: "Get a Free Consultation" or "Let's Talk About Your Loan"
- Secondary CTA: Phone number with tap-to-call
- Both must be visible without scrolling on desktop AND mobile
- CTA should stand out visually (primary color, large button)

**Phase:** Hero section build.

---

## Lower Priority Pitfalls

### 11. Ignoring Accessibility
Screen readers can't navigate the page. Fix: semantic HTML, ARIA labels on interactive elements, keyboard navigation for calculator/form.

### 12. No Analytics from Day One
Can't measure what's working. Fix: Add Vercel Analytics in root layout before launch.

### 13. Hardcoded Content
Content changes require code deploys. For v1 this is acceptable — but note it as tech debt for v2 (consider headless CMS later).

### 14. No Error Page
404 or server errors show default Next.js page. Fix: Add `app/not-found.tsx` with navigation back to main page.

### 15. Missing Favicon/OG Image
Looks unprofessional when shared on social or bookmarked. Fix: Add favicon and 1200x630 OG image.

---

## Pitfall-to-Phase Mapping

| Pitfall | Should Be Addressed In |
|---------|----------------------|
| NMLS compliance | Foundation (layout shell) |
| Contact form delivery | Contact form phase |
| Calculator accuracy | Calculator phase |
| Page load speed | Every phase + final polish |
| Mobile UX | Every phase (mobile-first) |
| SEO | SEO/polish phase |
| Form spam | Contact form phase |
| Over-animation | Every phase with visuals |
| Testimonial credibility | Testimonials phase |
| CTA above fold | Hero phase |
| Accessibility | Every phase |
| Analytics | Foundation or polish |
