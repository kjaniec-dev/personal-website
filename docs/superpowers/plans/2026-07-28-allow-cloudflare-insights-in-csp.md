# Allow Cloudflare Insights in CSP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `https://static.cloudflareinsights.com` to `script-src` and `https://cloudflareinsights.com` to `connect-src` in both `public/_headers` and `next.config.js` so Cloudflare Web Analytics operates without CSP violations.

**Architecture:** Update `public/_headers` and `next.config.js` CSP directives, verify with lint and build, and commit.

**Tech Stack:** Next.js 16, Cloudflare Pages, Biome, Vitest.

---

### Task 1: Update CSP for Cloudflare Insights

**Files:**
- Modify: `public/_headers:2`
- Modify: `next.config.js:10,14`

- [ ] **Step 1: Update public/_headers**

Add Cloudflare Insights domains to script-src and connect-src.

- [ ] **Step 2: Update next.config.js**

Add Cloudflare Insights domains to script-src and connect-src in ContentSecurityPolicy string.

- [ ] **Step 3: Run lint:fix and lint & test suite**

Run: `npm run lint:fix && npm run test && npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add public/_headers next.config.js
git commit -m "fix(csp): add Cloudflare Insights to script-src and connect-src"
```
