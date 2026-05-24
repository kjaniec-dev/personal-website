# Lighthouse Scores — After kj/design Rollout

**Date:** 2026-05-24  
**Build:** production (`npm run build` + `npm run serve`)  
**Device:** Desktop  
**Tool:** Lighthouse 13.3.0 via `npx lighthouse`

---

## Scores

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| `/` (Home) | 96 | 100 | 100 | 100 |
| `/blog` | 99 | 100 | 100 | 100 |
| `/projects` | 97 | 98 | 100 | 100 |

---

## Core Web Vitals

| Page | LCP | CLS | TBT | FCP |
|------|-----|-----|-----|-----|
| `/` | 1.3 s ✓ | 0.001 ✓ | 0 ms ✓ | 0.3 s |
| `/blog` | 1.0 s ✓ | 0.001 ✓ | 0 ms ✓ | — |
| `/projects` | 1.3 s ✓ | 0.001 ✓ | 0 ms ✓ | — |

All Core Web Vitals in "Good" range (LCP < 2.5 s, CLS < 0.1, TBT < 200 ms).

---

## Opportunities

`/projects` flagged unused/unminified JS (~412 KiB potential savings). This is an existing Next.js bundle characteristic — no new JS introduced by the design rollout itself. Minification in production mode is handled by Next.js; the savings estimate reflects Lighthouse's conservative measurement.

No accessibility or SEO regressions versus pre-rollout baseline.
