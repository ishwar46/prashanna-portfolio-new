---
phase: 1
slug: foundation-and-compliance
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None (build + lint serve as automated validation) |
| **Config file** | none — Wave 0 relies on existing tooling |
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
| 1-01-01 | 01 | 1 | NAV-01 | smoke | `npm run build` | ✅ | ⬜ pending |
| 1-01-02 | 01 | 1 | NAV-02 | manual | Manual browser check | N/A | ⬜ pending |
| 1-01-03 | 01 | 1 | NAV-03 | smoke | `npm run build` | ✅ | ⬜ pending |
| 1-01-04 | 01 | 1 | NAV-04 | manual | Manual viewport resize check | N/A | ⬜ pending |
| 1-01-05 | 01 | 1 | NAV-05 | smoke | `npm run build` | ✅ | ⬜ pending |
| 1-01-06 | 01 | 1 | COMP-01 | smoke | `npm run build` | ✅ | ⬜ pending |
| 1-01-07 | 01 | 1 | COMP-02 | smoke | `npm run build` | ✅ | ⬜ pending |
| 1-01-08 | 01 | 1 | COMP-03 | smoke | `npm run build` | ✅ | ⬜ pending |
| 1-01-09 | 01 | 1 | COMP-04 | smoke | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] No test framework needed for Phase 1 — `npm run build` and `npm run lint` provide automated validation
- [ ] Manual browser verification covers interactive behaviors (smooth scroll, mobile menu)

*Existing infrastructure (build + lint) covers all phase requirements at the smoke level.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Smooth scroll to anchors | NAV-02 | Visual/interactive scroll behavior | Click each nav link; verify smooth animation to correct section with header offset |
| Hamburger menu open/close | NAV-04 | Requires viewport resize and interaction | Resize to <768px; tap hamburger; verify menu opens; tap link; verify menu closes and scrolls |
| Phone tap-to-call | NAV-03 | Requires mobile device | On mobile, tap phone number; verify native dialer opens with (571) 222-5555 |
| Transparent-to-solid header | NAV-01 | Visual transition on scroll | Load page; verify header is transparent; scroll down; verify solid navy with shadow |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
