# Phase 3: Interactive Sections - Research

**Researched:** 2026-03-14
**Domain:** React forms, server actions, email delivery, interactive UI components
**Confidence:** HIGH

## Summary

Phase 3 replaces three placeholder sections (calculator, FAQ, contact) with fully interactive components. The mortgage calculator is a pure client-side computation (no API calls), the FAQ uses shadcn/ui Accordion with `type="single"` for single-open behavior, and the contact form uses Next.js Server Actions with `useActionState` for server-side validation and Nodemailer/Gmail SMTP for email delivery.

The tech choices are straightforward and well-supported. The calculator is simple arithmetic (no library needed). The FAQ is a direct shadcn/ui Accordion install. The contact form is the most complex piece -- it combines `useActionState` from React 19, Zod validation, a honeypot field, and Nodemailer transporter setup. The service card pre-selection via URL hash parameter requires reading search params on the client side.

**Primary recommendation:** Build calculator and FAQ as self-contained client components, contact form as a client component backed by a Server Action in `src/app/actions/contact.ts`, with Nodemailer configured via Gmail SMTP app password.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Mortgage calculator: 3 text inputs (loan amount, interest rate, term), real-time update as user types, no sliders, no Calculate button
- Calculator output: monthly P&I payment + disclaimer + CTA scrolling to #contact
- FAQ: Single-open accordion, 6-8 mortgage process questions, data in constants.ts as FAQ_ITEMS
- FAQ: Use shadcn/ui Accordion component (`npx shadcn add accordion`)
- Contact form fields: name (required), phone (required), email (optional), loan type dropdown (optional, default "Not sure yet"), message textarea (optional)
- Service card pre-selection via URL hash parameter (`?service={slug}`)
- Server-side validation with field-level errors via Next.js Server Actions / useActionState
- Honeypot field for spam protection
- Success state: inline message replacing form with "Thank you" + phone number
- Email: Nodemailer with Gmail SMTP (not Resend) -- credentials via SMTP_HOST, SMTP_USER, SMTP_PASS env vars
- Email to: prashanna@loanfactory.com with HTML template
- Email subject: "New Lead from Portfolio: {visitor name} - {loan type}"
- No auto-reply to visitor

### Claude's Discretion
- Calculator layout and visual styling
- Default values for calculator inputs (e.g., $300,000, 6.5%, 30 years)
- Exact FAQ question/answer content (loan process focused)
- Form field order and layout
- HTML email template design details
- Animation/transition for accordion open/close
- Debounce timing for calculator real-time updates

### Deferred Ideas (OUT OF SCOPE)
- Resend email delivery (future when domain verified)
- Auto-reply confirmation email to visitor
- Advanced spam protection (hCaptcha/Turnstile) -- v2 LEAD-03
- Amortization schedule / detailed payment breakdown
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CALC-01 | Interactive mortgage calculator with inputs for loan amount, interest rate, and term | Client-side React state with controlled inputs; standard P&I formula |
| CALC-02 | Real-time monthly payment estimate (principal & interest) | Computed on every keystroke/change via `useState`; standard amortization formula M = P[r(1+r)^n]/[(1+r)^n-1] |
| CALC-03 | Disclaimer text stating estimates only, not a commitment | Static text below result; copy from COMPLIANCE.disclaimer pattern |
| FAQ-01 | FAQ section with accordion-style expandable answers | shadcn/ui Accordion with `type="single" collapsible`; install via `npx shadcn add accordion` |
| FAQ-02 | Minimum 5 common loan process questions covered | FAQ_ITEMS array in constants.ts; 6-8 items per user decision |
| FORM-01 | Contact form with fields: name, email, phone, message, loan type (pre-selectable) | Client component with useActionState; service pre-selection via URL search params |
| FORM-02 | Server-side validation with clear error messages | Zod schema + `safeParse` in Server Action; field-level errors via `error.flatten().fieldErrors` |
| FORM-03 | Email delivery to prashanna@loanfactory.com | Nodemailer with Gmail SMTP; note: REQUIREMENTS.md says "Resend" but CONTEXT.md overrides to Nodemailer |
| FORM-04 | Success/error states shown to user after submission | useActionState returns state with success/error; conditional rendering in client component |
| FORM-05 | Honeypot field for basic spam protection | Hidden input field checked server-side; reject if filled |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React 19.2 (useActionState) | 19.2.3 | Form state management with server actions | Built into React 19; official Next.js pattern for form handling |
| Zod | 4.x (add as direct dep) | Server-side form validation | Already transitive dep; Next.js official docs recommend it for server action validation |
| Nodemailer | latest (6.x) | Email delivery via Gmail SMTP | Locked decision; standard Node.js email library |
| shadcn/ui Accordion | latest | FAQ expandable sections | Radix-based, accessible, already using shadcn/ui in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @types/nodemailer | latest | TypeScript types for Nodemailer | Dev dependency for type safety |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Nodemailer | Resend | Resend is cleaner API but user chose Nodemailer/Gmail; deferred to future |
| Zod | Manual validation | Zod provides type inference + structured errors; no reason to hand-roll |

**Installation:**
```bash
npm install nodemailer zod
npm install -D @types/nodemailer
npx shadcn add accordion
```

## Architecture Patterns

### New Files Structure
```
src/
├── app/
│   └── actions/
│       └── contact.ts           # Server Action: validate + send email
├── components/
│   ├── sections/
│   │   ├── CalculatorSection.tsx # "use client" - real-time calc
│   │   ├── FAQSection.tsx       # Server component wrapping Accordion
│   │   └── ContactSection.tsx   # "use client" - form with useActionState
│   └── ui/
│       └── accordion.tsx        # Auto-generated by shadcn CLI
├── lib/
│   ├── constants.ts             # Add FAQ_ITEMS array
│   └── email.ts                 # Nodemailer transporter + sendLeadEmail()
```

### Pattern 1: useActionState for Contact Form
**What:** React 19's `useActionState` hook manages form submission state, errors, and pending status through a Server Action.
**When to use:** Any form that needs server-side validation with field-level error display.
**Example:**
```typescript
// src/app/actions/contact.ts
"use server";

import { z } from "zod";
import { sendLeadEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  loanType: z.string().optional(),
  message: z.string().optional(),
});

type ContactState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function submitContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot check
  if (formData.get("website")) {
    // Bot detected -- silently succeed to avoid revealing the trap
    return { success: true, message: "Thank you!" };
  }

  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    loanType: formData.get("loanType"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await sendLeadEmail(validatedFields.data);
    return { success: true, message: "Thank you! Prashanna will be in touch within 24 hours." };
  } catch {
    return { success: false, message: "Something went wrong. Please try again or call directly." };
  }
}
```

```typescript
// Client component usage
"use client";
import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";

const [state, formAction, pending] = useActionState(submitContact, {});

<form action={formAction}>
  <input name="name" />
  {state.errors?.name && <p>{state.errors.name[0]}</p>}
  {/* Honeypot - hidden from users */}
  <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
  <button disabled={pending}>Send</button>
</form>
```
**Source:** https://nextjs.org/docs/app/guides/forms

### Pattern 2: Mortgage Calculator (Pure Client-Side)
**What:** Real-time P&I calculation using the standard amortization formula.
**When to use:** The calculator section -- compute on every input change.
**Example:**
```typescript
"use client";
import { useState } from "react";

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
    / (Math.pow(1 + monthlyRate, numPayments) - 1);
}
```

### Pattern 3: Nodemailer Gmail SMTP Transport
**What:** Configure Nodemailer with Gmail app password for sending lead notification emails.
**When to use:** The `sendLeadEmail` function called from the contact Server Action.
**Example:**
```typescript
// src/lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLeadEmail(data: {
  name: string;
  phone: string;
  email?: string;
  loanType?: string;
  message?: string;
}) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "prashanna@loanfactory.com",
    subject: `New Lead from Portfolio: ${data.name} - ${data.loanType || "General Inquiry"}`,
    html: buildEmailHtml(data),
  });
}
```
**Source:** https://nodemailer.com/usage/using-gmail

### Pattern 4: Service Card Pre-Selection via URL Params
**What:** Service cards link to `#contact?service={slug}`, and the contact form reads the `service` search param to pre-select the loan type dropdown.
**When to use:** Wiring SERV-03 from Phase 2 to the contact form.
**Example:**
```typescript
// In ContactSection.tsx (client component)
"use client";
import { useSearchParams } from "next/navigation";
import { SERVICES } from "@/lib/constants";

function ContactSection() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service");
  const matchedService = SERVICES.find(s => s.slug === preselected);
  const defaultLoanType = matchedService?.name ?? "";
  // Use as defaultValue for the loan type select
}

// In ServicesSection.tsx -- update hrefs
<a href={`#contact?service=${service.slug}`} data-service={service.slug}>
```

**Important:** `useSearchParams` requires the component reading it to be a Client Component. Since ContactSection is already `"use client"`, this works naturally. The component should be wrapped in `<Suspense>` at the page level since `useSearchParams` opts the nearest Suspense boundary into client-side rendering.

### Anti-Patterns to Avoid
- **Don't use `onChange` + separate `fetch` for form submission:** Use `useActionState` with the form `action` prop -- it handles progressive enhancement, pending state, and error state.
- **Don't put Nodemailer in a client component:** Nodemailer is Node.js only -- it must be in a Server Action or server-only module.
- **Don't use `framer-motion`:** Import from `motion/react` per project CLAUDE.md.
- **Don't use `any` for action state type:** Define a proper `ContactState` type for `useActionState`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accordion behavior | Custom expand/collapse with state | shadcn/ui Accordion (Radix) | Keyboard navigation, ARIA, animation built-in |
| Form validation | Manual if/else checks | Zod `safeParse` + `flatten().fieldErrors` | Structured errors, type inference, edge cases handled |
| Email sending | Raw SMTP via `net` module | Nodemailer | Connection pooling, encoding, MIME handling |
| Form state management | Custom useState + fetch | `useActionState` | Built into React 19, handles pending/error/success, progressive enhancement |

**Key insight:** All three interactive sections have well-established patterns in the Next.js + React 19 ecosystem. The only custom logic is the mortgage formula (5 lines of math).

## Common Pitfalls

### Pitfall 1: useActionState Signature
**What goes wrong:** Server Action receives `(formData)` instead of `(prevState, formData)`.
**Why it happens:** When using `useActionState`, React prepends the previous state as the first argument.
**How to avoid:** Always define the server action as `async function action(prevState: StateType, formData: FormData)`.
**Warning signs:** Runtime error about unexpected argument types.

### Pitfall 2: Honeypot Field Visibility
**What goes wrong:** Honeypot field is visible to users, or CSS hiding is stripped by screen readers.
**Why it happens:** Using `display: none` or `visibility: hidden` -- some bots ignore these; some screen readers announce hidden fields.
**How to avoid:** Use `className="hidden"` (Tailwind), `tabIndex={-1}`, and `autoComplete="off"`. The field should be `aria-hidden="true"` and positioned off-screen or zero-sized. On the server side, silently "succeed" if the honeypot is filled (don't reveal the trap to bots).
**Warning signs:** Spam submissions getting through, or real users seeing the field.

### Pitfall 3: Nodemailer in Edge Runtime
**What goes wrong:** Nodemailer fails with "module not found" errors.
**Why it happens:** Nodemailer requires Node.js runtime, not Edge runtime. Next.js Server Actions default to Node.js, but if the route segment has `export const runtime = "edge"`, it will fail.
**How to avoid:** Do not set `runtime = "edge"` on any route that uses the contact Server Action. The default Node.js runtime is correct.
**Warning signs:** Build errors or runtime crashes mentioning `net`, `tls`, or `dns` modules.

### Pitfall 4: URL Search Params with Hash Navigation
**What goes wrong:** `useSearchParams()` doesn't read params from `#contact?service=va` because hash fragments aren't sent to the server.
**Why it happens:** The `?service=va` after `#contact` is part of the hash, not the URL query string. `useSearchParams()` reads the query string.
**How to avoid:** Two options: (a) use `window.location.hash` parsing on the client, or (b) change service card links to `?service=${slug}#contact` (query param before hash). Option (b) is cleaner because `useSearchParams` works directly.
**Warning signs:** Pre-selection never works despite correct links.

### Pitfall 5: Gmail SMTP Rate Limits
**What goes wrong:** Emails stop sending after ~100-150 per day.
**Why it happens:** Gmail limits individual accounts to roughly 500 sends/day (personal) or 2000/day (Workspace), but practical limits are lower for SMTP relay.
**How to avoid:** For a portfolio site, volume will be well under these limits. Log errors gracefully and show the user Prashanna's phone number as fallback. If volume grows, switch to Resend (deferred).
**Warning signs:** Nodemailer throws authentication or rate-limit errors.

### Pitfall 6: Missing Suspense Boundary for useSearchParams
**What goes wrong:** Build warning or hydration error when using `useSearchParams()`.
**Why it happens:** Next.js requires components using `useSearchParams` to be wrapped in a `<Suspense>` boundary.
**How to avoid:** Wrap `<ContactSection />` in `<Suspense>` in `page.tsx`, or handle it internally with a fallback.
**Warning signs:** Build warnings about missing Suspense boundary.

## Code Examples

### Mortgage Payment Formula
```typescript
// Standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1]
// P = principal (loan amount)
// r = monthly interest rate (annual / 12 / 100)
// n = total number of payments (years * 12)
function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0 || years <= 0) return 0;
  if (annualRate <= 0) return principal / (years * 12); // 0% interest edge case
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
```

### shadcn Accordion (Single-Open, Collapsible)
```typescript
// Source: https://ui.shadcn.com/docs/components/radix/accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQSection() {
  return (
    <SectionWrapper id={SECTION_IDS.faq} alternate>
      <h2>Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionWrapper>
  );
}
```

### Number Formatting for Calculator Display
```typescript
// Format currency for display
const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

// Format with cents for monthly payment
const formatPayment = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useFormState` (react-dom) | `useActionState` (react) | React 19 | Import from `react`, not `react-dom`; name changed |
| API routes for forms | Server Actions | Next.js 14+ | No separate API route needed; action defined in `"use server"` file |
| `framer-motion` package | `motion` package | 2024 | Import from `motion/react` per project CLAUDE.md |

**Deprecated/outdated:**
- `useFormState` from `react-dom` -- renamed to `useActionState` in React 19, imported from `react`
- Creating API route handlers (`app/api/contact/route.ts`) for form submission -- Server Actions are the standard pattern now

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected in project |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CALC-01 | Calculator inputs render and accept values | manual-only | Visual check in browser | N/A |
| CALC-02 | Monthly payment updates on input change | manual-only | Visual check -- verify formula with known values | N/A |
| CALC-03 | Disclaimer text visible | manual-only | Visual check | N/A |
| FAQ-01 | Accordion expands/collapses single item | manual-only | Visual check in browser | N/A |
| FAQ-02 | At least 5 FAQ items present | manual-only | Count items in constants.ts | N/A |
| FORM-01 | Form fields present, loan type pre-selectable | manual-only | Visual check + URL param test | N/A |
| FORM-02 | Server validation returns field errors | manual-only | Submit empty form, verify errors | N/A |
| FORM-03 | Email delivered to prashanna@loanfactory.com | manual-only | Submit form with SMTP configured, check inbox | N/A |
| FORM-04 | Success/error states display correctly | manual-only | Submit valid/invalid form | N/A |
| FORM-05 | Honeypot rejects bots silently | manual-only | Fill honeypot field, verify silent success (no email sent) | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` (catches type errors and build issues)
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Full build green + manual form submission test

### Wave 0 Gaps
- No test framework is configured for this project. All validation is manual (build + visual check) and build-time type checking. This is appropriate for a portfolio site with no business logic beyond the mortgage formula.
- The mortgage formula could be unit-tested, but setting up a test framework is out of scope for this phase.

## Open Questions

1. **Gmail App Password Setup**
   - What we know: Gmail requires 2FA enabled + App Password generation for SMTP access
   - What's unclear: Whether Prashanna has a Gmail/Workspace account set up for this, or if SMTP_USER will be a different email
   - Recommendation: Document the env vars needed (SMTP_HOST, SMTP_USER, SMTP_PASS) in .env.example; the app works without them (shows error state gracefully)

2. **Service Card Pre-selection URL Format**
   - What we know: Current service cards link to `#contact` with `data-service` attribute
   - What's unclear: Whether `?service=va#contact` or custom hash parsing is more reliable
   - Recommendation: Use `?service={slug}#contact` format so `useSearchParams()` works directly. Update service card hrefs in ServicesSection.tsx.

## Sources

### Primary (HIGH confidence)
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms) - useActionState pattern, validation, pending states (verified for Next.js 16.1.6)
- [shadcn/ui Accordion](https://ui.shadcn.com/docs/components/radix/accordion) - Installation, type="single" collapsible usage

### Secondary (MEDIUM confidence)
- [Nodemailer Gmail](https://nodemailer.com/usage/using-gmail) - Gmail SMTP configuration, app password setup
- [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion) - Underlying primitive documentation

### Tertiary (LOW confidence)
- Gmail rate limits (100-500/day) - commonly cited but exact limits vary by account type

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries verified against official docs and project dependencies
- Architecture: HIGH - patterns directly from Next.js 16.1.6 official documentation
- Pitfalls: HIGH - URL param/hash interaction verified, useActionState signature verified
- Email delivery: MEDIUM - Nodemailer/Gmail is well-documented but requires manual SMTP setup verification

**Research date:** 2026-03-14
**Valid until:** 2026-04-14 (stable stack, no fast-moving dependencies)
