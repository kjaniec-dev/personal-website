# UI Kit Simplifications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align website components with `@kjaniec-dev/ui` design kit primitives by adopting `buttonVariants` on buttons and links, using `<Kbd>` in search footer, and leveraging `EmptyState` for empty lists.

**Architecture:** Replace bespoke Tailwind button and link styles with kit `buttonVariants` in `Hero.tsx`, `Main.tsx`, and `not-found.tsx`. Update `SearchDialog.tsx` shortcut hints to render kit `<Kbd>` components. Replace plain paragraph empty state messages with kit `EmptyState` in `ListLayoutWithTags.tsx` and `tags/page.tsx`.

**Tech Stack:** Next.js 16, React 19, `@kjaniec-dev/ui`, `@kjaniec-dev/design`, Tailwind CSS v4, Biome, Vitest.

**Spec:** [docs/portfolio-ui.md](file:///Volumes/kjdisk/projects/personal-website/docs/portfolio-ui.md)

## Global Constraints

- Rely on `@kjaniec-dev/ui` exports via `@/components/ClientUI`.
- Maintain full accessibility: preserve `aria-label`, `aria-hidden`, keyboard navigation, and semantic roles.
- Follow Biome formatting and linting rules: no unused imports, strict import sorting.
- Ensure all 20 test suites pass with 0 failures on every step.

---

### Task 1: Adopt `buttonVariants` in `Hero.tsx`

**Files:**
- Modify: `components/Hero.tsx:60-105`
- Test: `__tests__/hero.test.tsx`

**Interfaces:**
- Consumes: `buttonVariants`, `cn` from `@/components/ClientUI`
- Produces: Hero CTA actions formatted with kit button variants

- [x] **Step 1: Verify current tests pass**

Run: `npx vitest run __tests__/hero.test.tsx`
Expected: PASS

- [x] **Step 2: Update `Hero.tsx` to use `buttonVariants` and `cn`**

Import `buttonVariants`, `cn` from `@/components/ClientUI`. Replace bespoke button classes on "Let's talk" with `cn(buttonVariants({ variant: "primary", size: "lg" }), "min-h-12 gap-5 rounded-kj-lg shadow-kj-glow")` and on "View selected work" with `cn(buttonVariants({ variant: "ghost", size: "lg" }), "min-h-12 gap-3 rounded-kj-sm text-foreground hover:text-primary")`.

- [x] **Step 3: Run test to verify behavior remains intact**

Run: `npx vitest run __tests__/hero.test.tsx`
Expected: PASS

- [x] **Step 4: Check Biome on `Hero.tsx`**

Run: `npx @biomejs/biome check components/Hero.tsx`
Expected: 0 errors

- [x] **Step 5: Commit**

```bash
git add components/Hero.tsx
git commit -m "refactor(hero): adopt buttonVariants for CTA links"
```

---

### Task 2: Adopt `buttonVariants` in `not-found.tsx` and `Main.tsx`

**Files:**
- Modify: `app/not-found.tsx:10-20`
- Modify: `app/Main.tsx:115-155`
- Test: `__tests__/smoke.test.ts`

**Interfaces:**
- Consumes: `buttonVariants`, `cn` from `@/components/ClientUI`
- Produces: Standardized button styles on error and home CTA links

- [x] **Step 1: Update `app/not-found.tsx` to use `buttonVariants`**

Import `buttonVariants`, `cn` from `@/components/ClientUI`. Style the "← Back to home" link using `cn(buttonVariants({ variant: "primary", size: "lg" }), "rounded-kj-lg shadow-kj-glow")`.

- [x] **Step 2: Update `app/Main.tsx` CTA buttons to use `buttonVariants`**

In `app/Main.tsx`, import `buttonVariants`, `cn` from `@/components/ClientUI`. Replace manual button classes on the "Say Hello" link with `cn(buttonVariants({ variant: "primary", size: "md" }), "rounded-kj-lg shadow-kj-glow")` and on the "LinkedIn" link with `cn(buttonVariants({ variant: "outline", size: "md" }), "rounded-kj-lg shadow-kj-sm")`.

- [x] **Step 3: Verify tests and run Biome check**

Run: `npx vitest run && npx @biomejs/biome check app/not-found.tsx app/Main.tsx`
Expected: PASS, 0 errors

- [x] **Step 4: Commit**

```bash
git add app/not-found.tsx app/Main.tsx
git commit -m "refactor(ui): use buttonVariants in not-found and home CTA"
```

---

### Task 3: Use `<Kbd>` for Shortcuts in `SearchDialog.tsx` Footer

**Files:**
- Modify: `components/SearchDialog.tsx:165-175`
- Test: `__tests__/search-provider.test.tsx`

**Interfaces:**
- Consumes: `Kbd` from `@/components/ClientUI`
- Produces: Consistent keyboard shortcut badges across the entire search dialog

- [x] **Step 1: Update footer shortcuts in `SearchDialog.tsx`**

Replace plain text shortcuts (`↑ ↓ navigate`, `↵ open`, `esc close`) with structured badges:
```tsx
<span className="inline-flex items-center gap-1.5">
	<Kbd keys={["↑", "↓"]} size="sm" />
	<span>navigate</span>
</span>
<span className="inline-flex items-center gap-1.5">
	<Kbd keys={["↵"]} size="sm" />
	<span>open</span>
</span>
<span className="ml-auto inline-flex items-center gap-1.5">
	<Kbd keys={["esc"]} size="sm" />
	<span>close</span>
</span>
```

- [x] **Step 2: Run test suite and check Biome**

Run: `npx vitest run __tests__/search-provider.test.tsx && npx @biomejs/biome check components/SearchDialog.tsx`
Expected: PASS, 0 errors

- [x] **Step 3: Commit**

```bash
git add components/SearchDialog.tsx
git commit -m "refactor(search): use Kbd component in dialog footer shortcuts"
```

---

### Task 4: Use `EmptyState` in `ListLayoutWithTags.tsx` and `app/tags/page.tsx`

**Files:**
- Modify: `layouts/ListLayoutWithTags.tsx:125-135`
- Modify: `app/tags/page.tsx:50-60`
- Test: `__tests__/list-layout-pagination.test.tsx`

**Interfaces:**
- Consumes: `EmptyState` from `@/components/ClientUI`
- Produces: Polished, empty-state UI feedback when no articles or tags match

- [x] **Step 1: Write test verifying EmptyState renders when no posts match**

Add a test in `__tests__/list-layout-pagination.test.tsx` asserting that when `posts={[]}`, the `No posts found` heading / empty state is displayed.

- [x] **Step 2: Update `layouts/ListLayoutWithTags.tsx`**

Import `EmptyState` from `@/components/ClientUI`. Replace `<p className="py-10 text-muted-foreground">No posts found.</p>` with:
```tsx
{displayPosts.length === 0 && (
	<EmptyState
		title="No posts found"
		description="No articles matched your current filter criteria."
		className="my-8 min-h-[220px]"
	/>
)}
```

- [x] **Step 3: Update `app/tags/page.tsx`**

Import `EmptyState` from `@/components/ClientUI`. Replace `<p className="py-10 text-muted-foreground">No tags found.</p>` with:
```tsx
{tagKeys.length === 0 ? (
	<EmptyState
		title="No tags found"
		description="There are currently no tagged articles."
		className="my-8 min-h-[220px]"
	/>
) : (
...
```

- [x] **Step 4: Run full test suite and Biome check**

Run: `npx vitest run && npx @biomejs/biome check .`
Expected: PASS, 0 errors

- [x] **Step 5: Verify build**

Run: `npx contentlayer2 build && npx cross-env INIT_CWD=$PWD next build`
Expected: Exit code 0, all 115 pages generated

- [x] **Step 6: Commit**

```bash
git add layouts/ListLayoutWithTags.tsx app/tags/page.tsx __tests__/list-layout-pagination.test.tsx
git commit -m "feat(ui): use EmptyState component for empty blog and tag listings"
```
