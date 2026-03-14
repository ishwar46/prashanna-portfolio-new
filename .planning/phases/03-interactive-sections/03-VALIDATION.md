---
phase: 3
slug: interactive-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — manual validation + build checks |
| **Config file** | none — no test framework in project |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full build green + manual form submission test
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | CALC-01 | manual | Visual check — inputs render | N/A | ⬜ pending |
| 03-01-02 | 01 | 1 | CALC-02 | manual | Verify formula with known values | N/A | ⬜ pending |
| 03-01-03 | 01 | 1 | CALC-03 | manual | Visual check — disclaimer visible | N/A | ⬜ pending |
| 03-02-01 | 02 | 1 | FAQ-01 | manual | Visual check — accordion behavior | N/A | ⬜ pending |
| 03-02-02 | 02 | 1 | FAQ-02 | manual | Count items in constants.ts | N/A | ⬜ pending |
| 03-03-01 | 03 | 2 | FORM-01 | manual | Visual check + URL param test | N/A | ⬜ pending |
| 03-03-02 | 03 | 2 | FORM-02 | manual | Submit empty form, verify errors | N/A | ⬜ pending |
| 03-03-03 | 03 | 2 | FORM-03 | manual | Submit form with SMTP, check inbox | N/A | ⬜ pending |
| 03-03-04 | 03 | 2 | FORM-04 | manual | Submit valid/invalid form | N/A | ⬜ pending |
| 03-03-05 | 03 | 2 | FORM-05 | manual | Fill honeypot, verify silent success | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework needed — validation is build-time type checking + manual visual/functional checks. This is appropriate for a portfolio site with no complex business logic beyond the mortgage formula.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Calculator inputs render and accept values | CALC-01 | UI interaction | Open page, verify 3 input fields accept numeric values |
| Payment updates on input change | CALC-02 | Real-time UI | Enter known values ($300K, 6.5%, 30yr), verify ~$1,896/mo |
| Disclaimer text visible | CALC-03 | Visual check | Verify disclaimer text below calculator result |
| Accordion expand/collapse | FAQ-01 | UI interaction | Click FAQ items, verify single-open behavior |
| At least 5 FAQ items | FAQ-02 | Count check | Count FAQ_ITEMS in constants.ts (target: 6-8) |
| Form fields + pre-selection | FORM-01 | UI + URL param | Visit `?service=va#contact`, verify VA pre-selected |
| Server validation errors | FORM-02 | Form submission | Submit empty form, verify field-level errors |
| Email delivery | FORM-03 | End-to-end | Submit form with SMTP configured, check inbox |
| Success/error states | FORM-04 | Form submission | Submit valid/invalid form, verify states |
| Honeypot rejection | FORM-05 | DOM manipulation | Fill hidden honeypot field, verify no email sent |

---

## Validation Sign-Off

- [ ] All tasks have manual verification instructions
- [ ] Build passes after each task (`npm run build`)
- [ ] Lint passes after each wave (`npm run lint`)
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
