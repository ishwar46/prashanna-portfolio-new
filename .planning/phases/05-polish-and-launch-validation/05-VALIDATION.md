---
phase: 5
slug: polish-and-launch-validation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — build + manual validation |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full build green + Lighthouse audit
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | PERF-01 | manual | Verify next/image + lazy loading in network tab | N/A | ⬜ pending |
| 05-01-02 | 01 | 1 | PERF-02, PERF-03 | manual | Check animations play once, test reduced-motion | N/A | ⬜ pending |
| 05-01-03 | 01 | 1 | PERF-04 | manual | Test at 375px viewport | N/A | ⬜ pending |
| 05-01-04 | 01 | 1 | PERF-05 | manual | Run Lighthouse, check LCP < 2.5s, CLS < 0.1 | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. Build validation + Lighthouse + manual checks.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Images use next/image with lazy loading | PERF-01 | Network tab inspection | Open DevTools Network tab, verify WebP/AVIF, non-hero images lazy |
| Animations play once, no replay | PERF-02 | Visual check | Scroll down, scroll back up, verify no replay |
| Reduced motion suppresses animations | PERF-03 | OS setting | Enable prefers-reduced-motion, reload, verify static |
| 375px viewport usable | PERF-04 | Visual check | DevTools responsive mode at 375px, check all sections |
| LCP < 2.5s, CLS < 0.1 | PERF-05 | Lighthouse | Run Lighthouse mobile audit |

---

## Validation Sign-Off

- [ ] All tasks have build-based verification
- [ ] Build passes after each task
- [ ] Lighthouse audit run before phase completion
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
