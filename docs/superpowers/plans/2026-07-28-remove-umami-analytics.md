# Remove Umami Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Umami analytics configuration, AnalyticsWrapper component, and Umami domains from CSP in `public/_headers` and `next.config.js`.

**Architecture:** Remove `analytics` configuration from `siteMetadata.js`, delete `components/AnalyticsWrapper.tsx`, remove AnalyticsWrapper render in `app/layout.tsx`, clean `umami.is` domains from CSP headers in `public/_headers` and `next.config.js`, and verify build/tests pass.

**Tech Stack:** Next.js 16, TypeScript, Biome, Vitest.

---

### Task 1: Remove Umami Analytics and Clean CSP

**Files:**
- Delete: `components/AnalyticsWrapper.tsx`
- Modify: `data/siteMetadata.js:44-67`
- Modify: `app/layout.tsx:7,9,173-176`
- Modify: `public/_headers:2`
- Modify: `next.config.js:10,14`

- [ ] **Step 1: Delete components/AnalyticsWrapper.tsx**

Remove unused AnalyticsWrapper component file.

- [ ] **Step 2: Clean app/layout.tsx**

Remove `AnalyticsConfig` and `AnalyticsWrapper` imports and rendering in `RootLayout`.

- [ ] **Step 3: Clean data/siteMetadata.js**

Remove `analytics` configuration block.

- [ ] **Step 4: Clean CSP in public/_headers and next.config.js**

Remove `https://*.umami.is` and `https://us.umami.is` from `script-src` and `connect-src`.

- [ ] **Step 5: Run lint:fix and lint & test suite**

Run: `npm run lint:fix && npm run test && npm run build`
Expected: PASS with 0 errors.

- [ ] **Step 6: Commit changes**

```bash
git add -A
git commit -m "refactor: remove Umami analytics and clean CSP"
```
