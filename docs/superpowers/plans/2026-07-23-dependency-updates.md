# Dependency Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update safe outdated dependencies in `personal-website` while keeping TypeScript on `v6.x`.

**Architecture:** Update `package.json` and lockfile using `bun add`, keeping TypeScript on `6.0.3`. Run verification checks (tests, linter, build).

**Tech Stack:** Bun, Next.js 16, React 19, Tailwind CSS 4, Vitest 4, Biome.

---

### Task 1: Update Production Dependencies

**Files:**
- Modify: `package.json`
- Modify: `bun.lock`

- [ ] **Step 1: Install updated production dependencies**

```bash
bun add @algolia/client-search@5.56.0 @next/bundle-analyzer@16.2.11 @tailwindcss/postcss@4.3.3 algoliasearch@5.56.0 next@16.2.11 postcss@8.5.22 react@19.2.8 react-dom@19.2.8 tailwindcss@4.3.3 web-vitals@6.0.0
```

- [ ] **Step 2: Verify package.json versions**

Check `package.json` to ensure versions are updated correctly.

- [ ] **Step 3: Commit production dependency updates**

```bash
git add package.json bun.lock package-lock.json
git commit -m "chore(deps): update production dependencies"
```

---

### Task 2: Update Dev Dependencies (excluding TypeScript)

**Files:**
- Modify: `package.json`
- Modify: `bun.lock`

- [ ] **Step 1: Install updated dev dependencies**

```bash
bun add -d @biomejs/biome@2.5.5 @vitejs/plugin-react@6.0.4 @vitest/ui@4.1.10 jsdom@29.1.1 lint-staged@17.2.0 vitest@4.1.10
```

- [ ] **Step 2: Verify TypeScript version remains <= 6.x**

Verify `typescript` in `package.json` is `6.0.3` (NOT `7.x`).

- [ ] **Step 3: Commit dev dependency updates**

```bash
git add package.json bun.lock package-lock.json
git commit -m "chore(deps-dev): update dev dependencies (keeping typescript v6)"
```

---

### Task 3: Full Verification Suite

- [ ] **Step 1: Run Vitest unit tests**

Run: `npx vitest run`
Expected: PASS 100%

- [ ] **Step 2: Run Biome linter check on components**

Run: `npx biome check components/ __tests__/`
Expected: 0 errors

- [ ] **Step 3: Run Next.js production build**

Run: `npm run build`
Expected: Successful compilation
