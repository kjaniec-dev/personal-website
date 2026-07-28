# Security Headers and CSP Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure comprehensive HTTP security headers (HSTS preload, COOP, XFO, CSP, Referrer-Policy, Permissions-Policy) in both `next.config.js` and `public/_headers` to ensure full compliance for Cloudflare Pages static hosting and local server environments.

**Architecture:** Create `public/_headers` with Cloudflare Pages header rules, update `next.config.js` with matching security headers and tightened CSP, and verify with lint, unit tests, and production build.

**Tech Stack:** Next.js 16, Cloudflare Pages, Biome, Vitest.

---

### Task 1: Create `public/_headers` and Update `next.config.js`

**Files:**
- Create: `public/_headers`
- Modify: `next.config.js:8-55`

- [ ] **Step 1: Create public/_headers for Cloudflare Pages**

Add static headers matching Cloudflare Pages format: HSTS preload, COOP, XFO, CSP, Referrer-Policy, CORP, Permissions-Policy.

- [ ] **Step 2: Update next.config.js security headers**

Synchronize `next.config.js` headers array and `ContentSecurityPolicy` to include COOP (`same-origin`), HSTS preload (`max-age=63072000; includeSubDomains; preload`), `frame-ancestors 'none'`, and tightened `connect-src`/`frame-src`.

- [ ] **Step 3: Run lint & test suite**

Run: `npm run lint && npm run test`
Expected: PASS

- [ ] **Step 4: Verify production build**

Run: `npm run build`
Expected: PASS and `out/_headers` is present in export output.

- [ ] **Step 5: Commit changes**

```bash
git add public/_headers next.config.js
git commit -m "security: add Cloudflare Pages _headers and update next.config.js security policy"
```
