# Dependency Reorganization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize `package.json` by removing unused dependencies and moving build-time/compilation dependencies from `dependencies` to `devDependencies`.

**Architecture:** Move CSS processing tools, Contentlayer compilation packages, MDX/Rehype/Remark plugins, and bundle analyzer to `devDependencies`, keeping only client/server runtime packages in `dependencies`. Remove completely unused dependencies (`remark`, `esbuild`, `@vitejs/plugin-react`).

**Tech Stack:** Node.js, Bun, Next.js 16, Tailwind CSS v4, Contentlayer2, Vitest

---

### Task 1: Reorganize package.json dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Edit package.json**

Update `package.json` so that:
1. `dependencies` contains only runtime packages (`@kjaniec-dev/design`, `@kjaniec-dev/ui`, `github-slugger`, `kbar`, `next`, `next-themes`, `pliny`, `react`, `react-dom`, `web-vitals`).
2. `devDependencies` contains all build-time tooling, CSS processors, Contentlayer, Rehype/Remark plugins, testing tools, and linters.
3. Unused packages (`remark`, `esbuild`, `@vitejs/plugin-react`) are removed.

- [ ] **Step 2: Re-lock lockfile with package manager**

Run: `bun install`
Expected: Lockfile updated cleanly with reorganized dependencies.

---

### Task 2: Verify test suite and production build

**Files:**
- Test: `__tests__/*`

- [ ] **Step 1: Run unit tests**

Run: `npm test`
Expected: All 18 tests pass in Vitest.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Contentlayer build succeeds, Next.js compiles static pages successfully, and RSS feed is generated with exit code 0.
