---
phase: 4
slug: seo-and-analytics
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 4 — Validation Strategy

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
- **Before `/gsd:verify-work`:** Full build green + manual OG preview + JSON-LD validation
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | SEO-01 | smoke | `npm run build` | N/A | ⬜ pending |
| 04-01-02 | 01 | 1 | SEO-02 | smoke | `npm run build` + curl OG image | N/A | ⬜ pending |
| 04-01-03 | 01 | 1 | SEO-03 | manual | View source, Rich Results Test | N/A | ⬜ pending |
| 04-01-04 | 01 | 1 | SEO-04 | smoke | `npm run build` (sitemap/robots type-checked) | N/A | ⬜ pending |
| 04-01-05 | 01 | 1 | SEO-05 | smoke | `npm run build` (import errors caught) | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework needed — SEO metadata is validated via build + manual browser/curl inspection.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| OG image renders correctly | SEO-02 | Visual quality check | Paste URL in opengraph.xyz, verify title/desc/image |
| JSON-LD is valid structured data | SEO-03 | Schema validation | Paste page source in Google Rich Results Test |
| Vercel Analytics captures data | SEO-05 | Requires real deployment | Deploy to Vercel, visit site, check dashboard |

---

## Validation Sign-Off

- [ ] All tasks have build-based automated verification
- [ ] Build passes after each task
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
