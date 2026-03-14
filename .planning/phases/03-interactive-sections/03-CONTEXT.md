# Phase 3: Interactive Sections - Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Mortgage calculator, FAQ accordion, and contact form with email delivery — the three interactive sections that drive lead conversion. Replaces the three placeholder sections from Phase 2. Includes wiring the service card pre-selection (SERV-03 deferred from Phase 2).

</domain>

<decisions>
## Implementation Decisions

### Mortgage Calculator
- Basic 3 inputs: loan amount, interest rate, loan term (15/30 year toggle or select)
- Text input fields only — no sliders
- Real-time instant update as user types (no "Calculate" button)
- Output: estimated monthly payment (principal & interest)
- Disclaimer text below result: estimates only, not a commitment
- CTA button below result ("Get Your Personalized Rate" or similar) that scrolls to #contact

### FAQ Accordion
- Single-open accordion behavior — clicking a new question closes the previous
- 6-8 questions focused on the mortgage loan process (not product comparisons)
- Example topics: closing timeline, documents needed, credit score requirements, pre-approval process, etc.
- FAQ data stored in constants.ts as FAQ_ITEMS array — consistent with SERVICES and TESTIMONIALS pattern
- Use shadcn/ui Accordion component (install via `npx shadcn add accordion`)

### Contact Form
- Fields: name (required), phone (required), email (optional), loan type dropdown (optional), message textarea (optional)
- Loan type dropdown defaults to "Not sure yet / General inquiry"
- Service card pre-selection via URL hash parameter: service card links to `#contact?service=va`, form reads the param and pre-selects loan type
- Close SERV-03: update service card links from Phase 2 to include `?service={slug}` parameter
- Server-side validation with field-level error messages (Next.js Server Actions / useActionState)
- Honeypot field (hidden from real users) for basic spam protection
- Success state: inline message replacing the form ("Thank you! Prashanna will be in touch within 24 hours" + phone number for immediate contact)
- Error state: inline error message with option to retry

### Email Delivery
- Nodemailer with Gmail SMTP (not Resend)
- SMTP credentials via environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS or Gmail-specific app password config)
- Clean HTML email template sent to prashanna@loanfactory.com with: visitor name, phone, email, selected loan type, message
- No auto-reply to visitor — Prashanna follows up personally
- Email subject: "New Lead from Portfolio: {visitor name} - {loan type}"

### Claude's Discretion
- Calculator layout and visual styling (split layout, card-based, etc.)
- Default values for calculator inputs (e.g., $300,000, 6.5%, 30 years)
- Exact FAQ question/answer content (loan process focused)
- Form field order and layout (single column, two column, etc.)
- HTML email template design details
- Animation/transition for accordion open/close
- Debounce timing for calculator real-time updates

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SectionWrapper`: Section container with id and alternating backgrounds — use for all 3 sections
- `Button` (CVA): Use for calculator CTA and form submit button
- `SECTION_IDS`: Already has `calculator`, `faq`, `contact` IDs defined
- `SERVICES` array: Has slug field for each service — use for loan type dropdown options and pre-selection matching
- `constants.ts`: Add FAQ_ITEMS array here for consistency with SERVICES/TESTIMONIALS pattern
- `cn()`: Class name merging utility

### Established Patterns
- Navy/gold design tokens in globals.css — use semantic tokens for interactive elements
- Server Components by default, "use client" for interactive sections (calculator, form will need it)
- shadcn/ui component pattern — install Accordion via CLI (`npx shadcn add accordion`)
- Service cards already have `data-service` attribute with slugs — update href to include `?service={slug}` for pre-selection

### Integration Points
- `src/app/page.tsx`: Replace 3 placeholder SectionWrappers with CalculatorSection, FAQSection, ContactSection
- `src/lib/constants.ts`: Add FAQ_ITEMS array
- `src/components/sections/ServicesSection.tsx`: Update service card links for pre-selection
- New Server Action: `src/app/actions/contact.ts` for form handling + email
- New components: `src/components/sections/CalculatorSection.tsx`, `src/components/sections/FAQSection.tsx`, `src/components/sections/ContactSection.tsx`

</code_context>

<specifics>
## Specific Ideas

- Calculator should feel lightweight — a quick estimate tool, not a full mortgage calculator app
- FAQ builds confidence to contact — questions should address common hesitations ("What do I need to get started?")
- Contact form is the primary conversion point — keep it short and low-friction (only name + phone required)
- Inline success message should reinforce urgency with Prashanna's phone number for immediate contact

</specifics>

<deferred>
## Deferred Ideas

- Resend email delivery — switch from nodemailer when domain is verified (future improvement)
- Auto-reply confirmation email to visitor — could add later for professionalism
- Advanced spam protection (hCaptcha/Turnstile) — listed in v2 requirements (LEAD-03)
- Amortization schedule / detailed payment breakdown — keep calculator simple for v1

</deferred>

---

*Phase: 03-interactive-sections*
*Context gathered: 2026-03-14*
