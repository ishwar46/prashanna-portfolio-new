---
phase: 2
slug: static-content-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None installed (TypeScript compiler + ESLint) |
| **Config file** | tsconfig.json (type checking), eslint.config.mjs (linting) |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | HERO-01 | build | `npm run build` | ✅ | ⬜ pending |
| 02-01-02 | 01 | 1 | HERO-02 | build | `npm run build` | ✅ | ⬜ pending |
| 02-01-03 | 01 | 1 | HERO-03 | build | `npm run build` | ✅ | ⬜ pending |
| 02-02-01 | 02 | 1 | SERV-01 | build | `npm run build` | ✅ | ⬜ pending |
| 02-02-02 | 02 | 1 | SERV-02 | build | `npm run build` | ✅ | ⬜ pending |
| 02-02-03 | 02 | 1 | SERV-03 | build | `npm run build` | ✅ | ⬜ pending |
| 02-03-01 | 03 | 2 | ABOUT-01 | build | `npm run build` | ✅ | ⬜ pending |
| 02-03-02 | 03 | 2 | ABOUT-02 | build | `npm run build` | ✅ | ⬜ pending |
| 02-04-01 | 04 | 2 | TEST-01 | build | `npm run build` | ✅ | ⬜ pending |
| 02-04-02 | 04 | 2 | TEST-02 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework installation needed for Phase 2 — this phase is entirely static content/layout work. Validation relies on:

1. TypeScript compilation (`npm run build`) catches type errors and import issues
2. ESLint (`npm run lint`) catches code quality issues
3. Visual inspection at 3 breakpoints (375px mobile, 768px tablet, 1280px desktop)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero displays compelling headline and subtext | HERO-01 | Visual/copy quality | Load page, verify headline and subtext are visible above the fold |
| CTA button scrolls to contact section | HERO-02 | Browser scroll behavior | Click "Get a Free Consultation", verify smooth scroll to #contact |
| Headshot placeholder renders correctly | HERO-03 | Visual layout | Verify initials circle renders at correct size on mobile and desktop |
| All 11 service cards render | SERV-01 | Visual grid layout | Count cards, verify all 11 loan types present |
| Each card shows name, description, audience | SERV-02 | Content verification | Check each card has all 3 text elements |
| Card click scrolls to contact | SERV-03 | Browser scroll behavior | Click a service card, verify scroll to #contact |
| Bio renders with story content | ABOUT-01 | Copy quality | Verify bio text appears with personal journey tone |
| About photo placeholder renders | ABOUT-02 | Visual layout | Verify placeholder renders at correct size |
| 3 testimonial cards render | TEST-01 | Visual layout | Count testimonial cards, verify 3 are present |
| Each testimonial has name, context, quote | TEST-02 | Content structure | Check each card has "First L." name, loan type context, and quote |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
