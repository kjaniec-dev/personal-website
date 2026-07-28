# Remove Learning Page and Courses Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Delete the `/learning` route (`app/learning/page.tsx`) and courses data file (`data/coursesData.ts`), and update documentation references in `README.md` and `CLAUDE.md`.

**Architecture:** Remove unreferenced `/learning` page component, delete `data/coursesData.ts`, remove Learning feature bullet point and tree entry from `README.md` and `CLAUDE.md`, and verify lint/tests/build pass.

**Tech Stack:** Next.js 16, TypeScript, Biome, Vitest.

---

### Task 1: Delete `/learning` Route and Data File, Update Documentation

**Files:**
- Delete: `app/learning/page.tsx`
- Delete: `data/coursesData.ts`
- Modify: `README.md:25`
- Modify: `CLAUDE.md:52,68,123`

- [ ] **Step 1: Delete app/learning/page.tsx and data/coursesData.ts**

Remove learning page and courses data file.

- [ ] **Step 2: Update README.md**

Remove `- **Learning Journey** - Completed courses and certifications` from Features.

- [ ] **Step 3: Update CLAUDE.md**

Remove `learning/` and `coursesData.ts` from directory tree and data configuration descriptions.

- [ ] **Step 4: Run lint and vitest suite**

Run: `npm run lint && npm run test`
Expected: PASS with 0 errors.

- [ ] **Step 5: Run production build**

Run: `npm run build`
Expected: PASS with static pages built successfully without `/learning`.

- [ ] **Step 6: Commit changes**

```bash
git add -A
git commit -m "refactor: remove /learning route and coursesData"
```
