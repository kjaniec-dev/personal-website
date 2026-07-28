# Remove Unused Dependencies and Dead Code Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up unused dependencies from `package.json`, remove dead code (newsletter API endpoint, comments component, unused imports), and clean up configuration files.

**Architecture:** Remove unreferenced npm packages (`@algolia/client-search`, `algoliasearch`, `search-insights`, `@headlessui/react`, `gray-matter`, `image-size`, `unist-util-visit`), delete dead code files (`app/api/newsletter/route.ts`, `components/Comments.tsx`), remove comments and newsletter references from layouts/components/configs, and verify build/test suites pass.

**Tech Stack:** Next.js 16, TypeScript, Biome, Vitest.

---

### Task 1: Remove Unused Dependencies from `package.json` and `next.config.js`

**Files:**
- Modify: `package.json:20-57`
- Modify: `next.config.js:91-99`

- [ ] **Step 1: Edit package.json to remove unused dependencies**

Remove `@algolia/client-search`, `@headlessui/react`, `algoliasearch`, `gray-matter`, `image-size`, `search-insights`, `unist-util-visit`.

- [ ] **Step 2: Edit next.config.js to clean experimental.optimizePackageImports**

Remove `@headlessui/react`, `@algolia/client-search`, `algoliasearch` from `experimental.optimizePackageImports`.

- [ ] **Step 3: Run npm install to update lockfile**

Run: `npm install`
Expected: Lockfile updated without unused dependencies.

- [ ] **Step 4: Verify with lint & test**

Run: `npm run lint && npm run test`
Expected: PASS

- [ ] **Step 5: Commit Task 1**

```bash
git add package.json package-lock.json next.config.js
git commit -m "chore: remove unused dependencies and clean up next.config.js"
```

---

### Task 2: Remove Dead Code (Newsletter & Comments)

**Files:**
- Delete: `app/api/newsletter/route.ts`
- Delete: `components/Comments.tsx`
- Modify: `components/MDXComponents.tsx:2,27`
- Modify: `components/ScrollTopAndComment.tsx:4,29-45`
- Modify: `data/siteMetadata.js:69-103`
- Modify: `layouts/PostLayout.tsx:13,203-207`
- Modify: `layouts/PostBanner.tsx:6,82-86`
- Modify: `layouts/PostSimple.tsx:11,81-85`

- [ ] **Step 1: Delete app/api/newsletter/route.ts and components/Comments.tsx**

Remove unused route handler and Comments component files.

- [ ] **Step 2: Clean up components/MDXComponents.tsx**

Remove `import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm";` and `BlogNewsletterForm` entry in components map.

- [ ] **Step 3: Clean up components/ScrollTopAndComment.tsx**

Remove `siteMetadata.comments` import/reference and the scroll to comment button.

- [ ] **Step 4: Clean up data/siteMetadata.js**

Remove unused commented out `newsletter` and `comments` config blocks.

- [ ] **Step 5: Clean up post layouts (PostLayout.tsx, PostBanner.tsx, PostSimple.tsx)**

Remove `import Comments` and `{siteMetadata.comments ? ...}` render blocks.

- [ ] **Step 6: Run lint and vitest suite**

Run: `npm run lint && npm run test`
Expected: PASS with 0 errors.

- [ ] **Step 7: Verify production build**

Run: `npm run build`
Expected: Production build succeeds cleanly.

- [ ] **Step 8: Commit Task 2**

```bash
git add -A
git commit -m "refactor: remove unused newsletter endpoint, comments component, and dead code"
```
