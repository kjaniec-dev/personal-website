# kj/design System Rollout — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the `@kj/design` token-based design language across every page of the personal website (home tune-up + blog list/post + projects + about + faq + tags + tag detail + learning + not-found), with sticky glass nav, 4-column footer, dark default, card-based detail layouts.

**Architecture:** Token-driven presentational refactor. All visuals use Tailwind v4 `@theme` tokens already defined in `css/kj-design.css` (`bg-card`, `border-border`, `text-primary`, `rounded-kj-*`, `shadow-kj-*`). New shared components (`Card`, `PageHeader`, `StatBadge`, `Pill`, `TechStackBar`) compose every page. Existing data files (`data/*.ts`, `data/blog/*.mdx`) untouched. Layouts (`layouts/*.tsx`) rewritten to use new primitives.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Contentlayer2, next-themes, TypeScript, Biome (lint/format), Husky + lint-staged, Playwright MCP for visual verification.

**Spec:** `docs/superpowers/specs/2026-05-24-kj-design-system-rollout-design.md`

**Verification model:** This is a presentational refactor; unit tests do not meaningfully exercise visual output. Per-task verification = (1) `npm run lint` 0 warnings, (2) `npm run dev` boots without console errors, (3) Playwright MCP navigates to the affected route and screenshots light + dark mode, (4) at the end of each phase, `npm run build` succeeds.

---

## Phase 0 — Pre-flight

### Task 0: Fix lint-staged glob so markdown commits don't break

**Why:** `biome check --write` does not support `.md`/`.mdx`. The current glob `*.+(js|jsx|ts|tsx|json|css|md|mdx)` causes pre-commit failure when a markdown-only change is staged (we hit this committing the spec). Fix once, here.

**Files:**
- Modify: `package.json` (`lint-staged` block)

- [ ] **Step 1: Inspect current glob**

Run: `node -e "console.log(JSON.stringify(require('./package.json')['lint-staged'], null, 2))"`
Expected output:
```json
{
  "*.+(js|jsx|ts|tsx|json|css|md|mdx)": [
    "biome check --write"
  ]
}
```

- [ ] **Step 2: Edit `package.json` lint-staged block**

Replace:
```json
"lint-staged": {
    "*.+(js|jsx|ts|tsx|json|css|md|mdx)": [
        "biome check --write"
    ]
}
```

With:
```json
"lint-staged": {
    "*.+(js|jsx|ts|tsx|json|css)": [
        "biome check --write"
    ]
}
```

- [ ] **Step 3: Verify by staging the existing spec**

Run:
```bash
git add docs/superpowers/specs/2026-05-24-kj-design-system-rollout-design.md package.json
git commit -m "chore: remove md/mdx from lint-staged glob (biome does not lint markdown)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```
Expected: commit succeeds, no biome errors.

- [ ] **Step 4: Confirm**

Run: `git log -1 --stat`
Expected: shows `package.json` and the spec file in the latest commit.

---

## Phase 1 — Foundations

### Task 1: Switch default theme to dark

**Files:**
- Modify: `data/siteMetadata.js`
- Verify: `app/theme-providers.tsx` (no change; it reads `siteMetadata.theme`)

- [ ] **Step 1: Read current setting**

Run: `grep -n "theme:" data/siteMetadata.js`
Expected: a line like `theme: 'system', // system, dark or light`.

- [ ] **Step 2: Change to `dark`**

In `data/siteMetadata.js`, replace `theme: 'system'` with `theme: 'dark'`. Leave the comment.

- [ ] **Step 3: Boot dev server and check**

Run: `npm run dev` (background) then visit `http://localhost:3000` via Playwright MCP.
Expected: page renders in dark mode by default; ThemeSwitch toggle still works (cycles light/dark/system).

- [ ] **Step 4: Stop dev server. Commit**

```bash
git add data/siteMetadata.js
git commit -m "feat(theme): default to dark mode

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: Rename existing `components/Card.tsx` to `ProjectCard.tsx`, free the `Card` name

**Why:** `components/Card.tsx` today is a project-specific card. We need `Card` as the generic surface primitive. Rename to `ProjectCard`, update imports.

**Files:**
- Rename: `components/Card.tsx` → `components/ProjectCard.tsx`
- Modify: `app/projects/page.tsx` (import + JSX)
- Modify: any other importers (search with grep)

- [ ] **Step 1: Find all importers**

Run: `grep -rn "from \"@/components/Card\"" app components layouts data 2>/dev/null`
Expected: list of files that import it. As of writing: `app/projects/page.tsx` and `layouts/ListLayoutWithTags.tsx` (the latter only as a type/name collision; verify).

- [ ] **Step 2: Move the file**

Run: `git mv components/Card.tsx components/ProjectCard.tsx`

- [ ] **Step 3: Update the component default export name and the importing files**

In `components/ProjectCard.tsx`, change `const Card = (...)` to `const ProjectCard = (...)` and the `export default Card` to `export default ProjectCard`.

In `app/projects/page.tsx`:
- Replace `import Card from "@/components/Card";` with `import ProjectCard from "@/components/ProjectCard";`
- Replace `<Card` with `<ProjectCard` and `</Card>` with `</ProjectCard>` (or self-close).

If `layouts/ListLayoutWithTags.tsx` imported it, repeat the same substitution there.

- [ ] **Step 4: Type-check + lint**

Run: `npm run lint`
Expected: 0 warnings, 0 errors.

- [ ] **Step 5: Smoke**

Run: `npm run dev`, visit `/projects` via Playwright MCP.
Expected: list of project cards renders identically to before (visual parity is fine for now — we restyle in a later task).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: rename Card to ProjectCard, free Card name for generic primitive

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: Add generic `Card` primitive

**Files:**
- Create: `components/Card.tsx`

- [ ] **Step 1: Create the file**

```tsx
import type { ElementType, ReactNode } from "react";

type CardProps = {
	as?: ElementType;
	padded?: boolean;
	interactive?: boolean;
	glow?: boolean;
	className?: string;
	children: ReactNode;
};

const baseClasses =
	"rounded-kj-2xl border border-border bg-card shadow-kj-sm";
const paddedClasses = "p-6 sm:p-8";
const interactiveClasses =
	"transition-all duration-300 hover:-translate-y-1 hover:shadow-kj-md";
const glowClasses = "shadow-kj-lg relative overflow-hidden";

export default function Card({
	as: Component = "div",
	padded = true,
	interactive = false,
	glow = false,
	className = "",
	children,
}: CardProps) {
	const classes = [
		baseClasses,
		padded ? paddedClasses : "",
		interactive ? interactiveClasses : "",
		glow ? glowClasses : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<Component className={classes}>
			{glow ? (
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
			) : null}
			{glow ? <div className="relative z-10">{children}</div> : children}
		</Component>
	);
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: 0 warnings.

- [ ] **Step 3: Commit**

```bash
git add components/Card.tsx
git commit -m "feat(ui): add generic Card primitive with padded/interactive/glow variants

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: Add `PageHeader` component

**Files:**
- Create: `components/PageHeader.tsx`

- [ ] **Step 1: Create the file**

```tsx
import type { ReactNode } from "react";

type PageHeaderProps = {
	eyebrow: string;
	title: string;
	description?: string;
	actions?: ReactNode;
};

export default function PageHeader({
	eyebrow,
	title,
	description,
	actions,
}: PageHeaderProps) {
	return (
		<header className="py-12 md:py-16">
			<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
				<div className="space-y-3 max-w-2xl">
					<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
						{eyebrow}
					</p>
					<h1 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
						{title}
					</h1>
					{description ? (
						<p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
							{description}
						</p>
					) : null}
				</div>
				{actions ? (
					<div className="flex flex-wrap gap-3">{actions}</div>
				) : null}
			</div>
		</header>
	);
}
```

- [ ] **Step 2: Lint + commit**

Run: `npm run lint` → expect 0 warnings.

```bash
git add components/PageHeader.tsx
git commit -m "feat(ui): add PageHeader for consistent subpage hero

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 5: Add `Pill` component

**Files:**
- Create: `components/Pill.tsx`

- [ ] **Step 1: Create the file**

```tsx
import type { ReactNode } from "react";

type PillTone = "default" | "primary" | "secondary" | "success" | "muted";

type PillProps = {
	tone?: PillTone;
	mono?: boolean;
	className?: string;
	children: ReactNode;
};

const toneClasses: Record<PillTone, string> = {
	default: "border-border bg-background text-muted-foreground",
	primary: "border-primary/30 bg-primary/10 text-primary",
	secondary: "border-secondary/30 bg-secondary/10 text-secondary",
	success: "border-success/30 bg-success-surface text-success",
	muted: "border-border bg-muted text-muted-foreground",
};

export default function Pill({
	tone = "default",
	mono = true,
	className = "",
	children,
}: PillProps) {
	const classes = [
		"inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
		mono ? "font-mono" : "",
		toneClasses[tone],
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <span className={classes}>{children}</span>;
}
```

- [ ] **Step 2: Lint + commit**

```bash
npm run lint
git add components/Pill.tsx
git commit -m "feat(ui): add Pill tag/status chip

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 6: Add `StatBadge` component

**Files:**
- Create: `components/StatBadge.tsx`

- [ ] **Step 1: Create the file**

```tsx
type StatBadgeProps = {
	value: string;
	label: string;
	accent?: "primary" | "secondary";
};

export default function StatBadge({
	value,
	label,
	accent = "primary",
}: StatBadgeProps) {
	const accentClass =
		accent === "primary" ? "text-primary" : "text-secondary";
	return (
		<div className="flex flex-col gap-1">
			<span
				className={`font-sans text-3xl font-bold tracking-tight sm:text-4xl ${accentClass}`}
			>
				{value}
			</span>
			<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
				{label}
			</span>
		</div>
	);
}
```

- [ ] **Step 2: Lint + commit**

```bash
npm run lint
git add components/StatBadge.tsx
git commit -m "feat(ui): add StatBadge for numeric highlights

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 7: Add `TechStackBar` + data source

**Files:**
- Create: `data/techStackData.ts`
- Create: `components/TechStackBar.tsx`

- [ ] **Step 1: Create data file**

`data/techStackData.ts`:
```ts
export interface TechStackItem {
	name: string;
	short?: string;
}

const techStackData: TechStackItem[] = [
	{ name: "TypeScript", short: "TS" },
	{ name: "Next.js" },
	{ name: "React" },
	{ name: "Node.js" },
	{ name: "Go" },
	{ name: "PostgreSQL" },
	{ name: "Docker" },
	{ name: "Kubernetes" },
];

export default techStackData;
```

- [ ] **Step 2: Create component**

`components/TechStackBar.tsx`:
```tsx
import techStackData from "@/data/techStackData";

export default function TechStackBar() {
	return (
		<div className="flex flex-wrap items-center gap-2 sm:gap-3">
			<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
				Tech Stack
			</span>
			<span className="text-muted-foreground/40">·</span>
			{techStackData.map((item) => (
				<span
					key={item.name}
					className="rounded-kj-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] font-semibold text-muted-foreground"
				>
					{item.short ?? item.name}
				</span>
			))}
		</div>
	);
}
```

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add data/techStackData.ts components/TechStackBar.tsx
git commit -m "feat(ui): add TechStackBar with techStackData

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 2 — Layout chrome

### Task 8: Sticky glass `Header`

**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Read current header**

Run: `cat components/Header.tsx`
Capture current structure. Goal: keep wiring to `headerNavLinks`, `SearchButton`, `ThemeSwitch`, `MobileNav`, but wrap in sticky glass container and add a primary CTA "Porozmawiajmy".

- [ ] **Step 2: Replace contents**

Replace the entire `components/Header.tsx` body with (preserve existing imports for `SearchButton`, `MobileNav`, `ThemeSwitch`, `Link`, `siteMetadata`, `headerNavLinks`, `NavLink`):

```tsx
import Link from "@/components/Link";
import MobileNav from "@/components/MobileNav";
import NavLink from "@/components/NavLink";
import SearchButton from "@/components/SearchButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";

export default function Header() {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-card/70 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
				<Link href="/" aria-label={siteMetadata.headerTitle ?? "Home"}>
					<span className="font-mono text-xl font-extrabold text-primary">
						KJ
					</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.map((link) => (
							<NavLink
								key={link.title}
								href={link.href}
								className="rounded-kj-md px-3 py-2 font-sans text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							>
								{link.title}
							</NavLink>
						))}
				</nav>

				<div className="flex items-center gap-2">
					<SearchButton />
					<ThemeSwitch />
					{siteMetadata.email ? (
						<Link
							href={`mailto:${siteMetadata.email}`}
							className="hidden items-center gap-2 rounded-kj-lg bg-primary px-4 py-2 font-sans text-sm font-semibold text-primary-foreground shadow-kj-glow transition-colors hover:bg-primary-hover md:inline-flex"
						>
							Porozmawiajmy
						</Link>
					) : null}
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
```

If `NavLink` is a default export with different prop shape, adapt minimally (its job here is just adding `aria-current` for active routes). If it lacks `className` passthrough, replace `NavLink` with `Link` and add an `aria-current` decided in this file using `usePathname` (but that requires `"use client"`); only add that complication if `NavLink` truly cannot accept className.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: 0 warnings.

- [ ] **Step 4: Smoke**

Run: `npm run dev`, visit `/` and `/blog` via Playwright MCP.
Expected: sticky header with KJ wordmark, centered nav, CTA visible on md+, mobile nav button on small screens, blur backdrop. Theme switch and search button work.

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx
git commit -m "feat(layout): sticky glass header with KJ wordmark and Porozmawiajmy CTA

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 9: 4-column `Footer`

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace contents**

Replace the entire `components/Footer.tsx` body with:

```tsx
import Link from "@/components/Link";
import SocialIcon from "@/components/social-icons";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";

const services = [
	{ label: "Full-Stack Development", href: "/projects" },
	{ label: "System Architecture", href: "/projects" },
	{ label: "Cloud & DevOps", href: "/projects" },
	{ label: "Technical Consulting", href: "/about" },
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-24 border-t border-border bg-card/40">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-4">
					{/* Brand column */}
					<div className="space-y-4">
						<Link href="/" className="inline-block">
							<span className="font-mono text-xl font-extrabold text-primary">
								KJ
							</span>
						</Link>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{siteMetadata.description}
						</p>
						<div className="flex flex-wrap gap-3 pt-2">
							{siteMetadata.email ? (
								<SocialIcon
									kind="mail"
									href={`mailto:${siteMetadata.email}`}
									size={5}
									className="text-muted-foreground transition-colors hover:text-primary"
								/>
							) : null}
							{siteMetadata.github ? (
								<SocialIcon
									kind="github"
									href={siteMetadata.github}
									size={5}
									className="text-muted-foreground transition-colors hover:text-primary"
								/>
							) : null}
							{siteMetadata.linkedin ? (
								<SocialIcon
									kind="linkedin"
									href={siteMetadata.linkedin}
									size={5}
									className="text-muted-foreground transition-colors hover:text-primary"
								/>
							) : null}
						</div>
					</div>

					{/* Navigation column */}
					<div className="space-y-4">
						<h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
							Navigation
						</h3>
						<ul className="space-y-2">
							{headerNavLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground transition-colors hover:text-primary"
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services column */}
					<div className="space-y-4">
						<h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
							Services
						</h3>
						<ul className="space-y-2">
							{services.map((s) => (
								<li key={s.label}>
									<Link
										href={s.href}
										className="text-sm text-muted-foreground transition-colors hover:text-primary"
									>
										{s.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact column */}
					<div className="space-y-4">
						<h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
							Contact
						</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							{siteMetadata.email ? (
								<li>
									<Link
										href={`mailto:${siteMetadata.email}`}
										className="transition-colors hover:text-primary"
									>
										{siteMetadata.email}
									</Link>
								</li>
							) : null}
							<li>Katowice, Polska</li>
						</ul>
					</div>
				</div>

				<div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
					<span>
						© {year} {siteMetadata.author}. Wszelkie prawa zastrzeżone.
					</span>
					<span>
						Built with{" "}
						<Link
							href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
							className="underline-offset-2 hover:text-primary hover:underline"
						>
							Tailwind Nextjs Theme
						</Link>
					</span>
				</div>
			</div>
		</footer>
	);
}
```

- [ ] **Step 2: Lint + smoke**

Run: `npm run lint` → 0 warnings.
Run: `npm run dev`, visit `/` via Playwright MCP, scroll to footer.
Expected: 4 columns on md+, stacks on mobile, brand bio + social icons render, all links work.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat(layout): rebuild footer as 4-column grid (brand/nav/services/contact)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 3 — Home tune-up

### Task 10: Add stats row + TechStackBar on home

**Files:**
- Modify: `app/Main.tsx`
- Modify: `components/Hero.tsx` (optional — only if stats should live inside hero card)

Decision: add stats row as a thin band **between** Hero and the "Services" section so it works on every viewport without crowding the hero card. Add `TechStackBar` directly below stats.

- [ ] **Step 1: Insert the stats + tech band**

In `app/Main.tsx`, immediately after the `<Hero />` element and before the `{/* Services Section */}` comment, insert:

```tsx
import StatBadge from "@/components/StatBadge";
import TechStackBar from "@/components/TechStackBar";
```

(Add these imports at the top with the other component imports.)

Then in the JSX, after `<Hero />`:

```tsx
<section className="border-y border-border bg-card/40 py-8">
	<div className="mx-auto grid max-w-5xl grid-cols-3 gap-6 px-2 sm:gap-12">
		<StatBadge value="5+" label="Lat doświadczenia" />
		<StatBadge value="10+" label="Zrealizowanych projektów" accent="secondary" />
		<StatBadge value="100%" label="Zaangażowania" />
	</div>
	<div className="mx-auto mt-8 flex max-w-5xl items-center justify-center px-2">
		<TechStackBar />
	</div>
</section>
```

- [ ] **Step 2: Lint + smoke**

Run: `npm run lint` → 0 warnings.
Run: `npm run dev`, visit `/` via Playwright MCP.
Expected: 3 stat badges visible just under the hero, tech stack pill row underneath, then existing Services section.

- [ ] **Step 3: Commit**

```bash
git add app/Main.tsx
git commit -m "feat(home): add stats band and tech stack bar between hero and services

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 4 — List pages

### Task 11: Redesign `/blog` list (`layouts/ListLayoutWithTags.tsx`)

**Files:**
- Modify: `layouts/ListLayoutWithTags.tsx`

- [ ] **Step 1: Replace contents**

Replace the entire `layouts/ListLayoutWithTags.tsx` body with:

```tsx
"use client";

import tagData from "app/tag-data.json";
import type { Blog } from "contentlayer/generated";
import { slug } from "github-slugger";
import { usePathname } from "next/navigation";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import Card from "@/components/Card";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";
import Pill from "@/components/Pill";
import siteMetadata from "@/data/siteMetadata";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}

interface ListLayoutProps {
	posts: CoreContent<Blog>[];
	title: string;
	initialDisplayPosts?: CoreContent<Blog>[];
	pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
	const pathname = usePathname();
	const basePath = pathname?.split("/")[1] ?? "blog";
	const prevPage = currentPage - 1 > 0;
	const nextPage = currentPage + 1 <= totalPages;

	return (
		<nav
			aria-label="Pagination"
			className="mt-12 flex items-center justify-between"
		>
			{prevPage ? (
				<Link
					href={
						currentPage - 1 === 1
							? `/${basePath}`
							: `/${basePath}/page/${currentPage - 1}`
					}
					className="rounded-kj-lg border border-border bg-card px-4 py-2 font-sans text-sm font-semibold text-foreground transition-colors hover:bg-muted"
					rel="prev"
				>
					← Previous
				</Link>
			) : (
				<span />
			)}
			<span className="font-mono text-xs text-muted-foreground">
				Page {currentPage} of {totalPages}
			</span>
			{nextPage ? (
				<Link
					href={`/${basePath}/page/${currentPage + 1}`}
					className="rounded-kj-lg border border-border bg-card px-4 py-2 font-sans text-sm font-semibold text-foreground transition-colors hover:bg-muted"
					rel="next"
				>
					Next →
				</Link>
			) : (
				<span />
			)}
		</nav>
	);
}

export default function ListLayoutWithTags({
	posts,
	title,
	initialDisplayPosts = [],
	pagination,
}: ListLayoutProps) {
	const pathname = usePathname();
	const tagCounts = tagData as Record<string, number>;
	const tagKeys = Object.keys(tagCounts);
	const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

	const displayPosts =
		initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Writing"
				title={title}
				description={siteMetadata.description}
			/>

			<div className="grid gap-8 lg:grid-cols-[260px_1fr]">
				<aside className="lg:sticky lg:top-24 lg:self-start">
					<Card padded>
						<h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
							Tags
						</h2>
						<ul className="space-y-1">
							<li>
								<Link
									href="/blog"
									className={`block rounded-kj-md px-2.5 py-1.5 font-sans text-sm transition-colors ${
										pathname === "/blog"
											? "bg-primary/10 text-primary font-semibold"
											: "text-muted-foreground hover:bg-muted hover:text-foreground"
									}`}
								>
									All posts
								</Link>
							</li>
							{sortedTags.map((tag) => {
								const tagSlug = slug(tag);
								const active = pathname === `/tags/${tagSlug}`;
								return (
									<li key={tag}>
										<Link
											href={`/tags/${tagSlug}`}
											className={`flex items-center justify-between rounded-kj-md px-2.5 py-1.5 font-sans text-sm transition-colors ${
												active
													? "bg-primary/10 text-primary font-semibold"
													: "text-muted-foreground hover:bg-muted hover:text-foreground"
											}`}
										>
											<span>#{tag.split(" ").join("-")}</span>
											<span className="font-mono text-[11px] text-muted-foreground">
												{tagCounts[tag]}
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</Card>
				</aside>

				<section className="space-y-6">
					{displayPosts.length === 0 ? (
						<p className="text-muted-foreground">No posts found.</p>
					) : null}
					{displayPosts.map((post) => {
						const { path, date, title, summary, tags, readingTime } = post;
						return (
							<Card key={path} as="article" interactive>
								<Link href={`/${path}`} className="group block space-y-3">
									<div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
										<time dateTime={date}>
											{formatDate(date, siteMetadata.locale)}
										</time>
										{readingTime ? (
											<>
												<span>·</span>
												<span>{Math.ceil(readingTime.minutes)} min read</span>
											</>
										) : null}
									</div>
									<h2 className="font-sans text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
										{title}
									</h2>
									{summary ? (
										<p className="text-sm leading-relaxed text-muted-foreground">
											{summary}
										</p>
									) : null}
									{tags && tags.length > 0 ? (
										<div className="flex flex-wrap gap-1.5 pt-1">
											{tags.map((t) => (
												<Pill key={t} tone="default">
													{t}
												</Pill>
											))}
										</div>
									) : null}
									<div className="pt-2 font-mono text-xs font-semibold text-primary">
										Read article →
									</div>
								</Link>
							</Card>
						);
					})}

					{pagination && pagination.totalPages > 1 ? (
						<Pagination
							currentPage={pagination.currentPage}
							totalPages={pagination.totalPages}
						/>
					) : null}
				</section>
			</div>
		</div>
	);
}
```

> **Note:** If `readingTime` isn't on `CoreContent<Blog>` after `allCoreContent` strips computed fields, drop the inline read-time block (the `readingTime` access guarded with `?` is safe at runtime, but TS may complain). If TS errors, remove the readingTime block in this task.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: 0 warnings. If TS complains about `readingTime` on `CoreContent<Blog>`, remove that block.

- [ ] **Step 3: Smoke**

Run: `npm run dev`, visit `/blog` via Playwright MCP in both light and dark mode.
Expected: header with eyebrow + title + description; left sidebar with tag list (counts); right column with vertical post cards; pagination at bottom if multiple pages.

- [ ] **Step 4: Commit**

```bash
git add layouts/ListLayoutWithTags.tsx
git commit -m "feat(blog): redesign list layout with PageHeader, sidebar tag rail, card stack

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 12: Redesign `/projects` page + add `status` to projectsData

**Files:**
- Modify: `data/projectsData.ts` (add optional `status` field)
- Modify: `app/projects/page.tsx`
- Modify: `components/ProjectCard.tsx`

- [ ] **Step 1: Extend `Project` interface**

In `data/projectsData.ts`, change the interface:
```ts
export type ProjectStatus = "shipped" | "in-progress" | "planned";

interface Project {
	title: string;
	description: string;
	href?: string;
	repoHref?: string;
	imgSrc?: string;
	tags?: string[];
	status?: ProjectStatus;
}
```

(Add `export` to `Project` if needed elsewhere: `export interface Project`.)

Leave existing entries unchanged — they default to no status (treated as `shipped`).

- [ ] **Step 2: Rewrite `components/ProjectCard.tsx`**

Replace contents with:
```tsx
import Image from "@/components/Image";
import Link from "@/components/Link";
import Pill from "@/components/Pill";
import Card from "@/components/Card";
import type { ProjectStatus } from "@/data/projectsData";

interface ProjectCardProps {
	title: string;
	description: string;
	imgSrc?: string;
	href?: string;
	repoHref?: string;
	tags?: string[];
	status?: ProjectStatus;
}

const statusLabel: Record<ProjectStatus, string> = {
	shipped: "Shipped",
	"in-progress": "In progress",
	planned: "Planned",
};

const statusTone: Record<ProjectStatus, "success" | "primary" | "muted"> = {
	shipped: "success",
	"in-progress": "primary",
	planned: "muted",
};

export default function ProjectCard({
	title,
	description,
	imgSrc,
	href,
	repoHref,
	tags = [],
	status = "shipped",
}: ProjectCardProps) {
	return (
		<Card as="article" interactive padded={false} className="flex flex-col overflow-hidden">
			<div className="relative aspect-[16/9] w-full bg-muted">
				{imgSrc ? (
					<Image
						src={imgSrc}
						alt={title}
						fill
						sizes="(min-width: 768px) 50vw, 100vw"
						className="object-cover"
					/>
				) : (
					<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
				)}
				<div className="absolute right-3 top-3">
					<Pill tone={statusTone[status]}>{statusLabel[status]}</Pill>
				</div>
			</div>

			<div className="flex flex-1 flex-col gap-3 p-6">
				{tags.length > 0 ? (
					<div className="flex flex-wrap gap-1.5">
						{tags.map((t) => (
							<Pill key={t}>{t}</Pill>
						))}
					</div>
				) : null}
				<h3 className="font-sans text-2xl font-bold text-foreground">
					{title}
				</h3>
				<p className="text-sm leading-relaxed text-muted-foreground">
					{description}
				</p>
				<div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
					{href ? (
						<Link
							href={href}
							className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-primary transition-colors hover:text-primary-hover"
						>
							Launch app →
						</Link>
					) : null}
					{repoHref ? (
						<Link
							href={repoHref}
							className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
						>
							View source →
						</Link>
					) : null}
				</div>
			</div>
		</Card>
	);
}
```

- [ ] **Step 3: Rewrite `app/projects/page.tsx`**

Replace contents with:
```tsx
import { genPageMetadata } from "app/seo";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projectsData";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Portfolio"
				title="Projects"
				description="A collection of projects I've worked on. Each project represents different challenges and learning experiences."
			/>

			<div className="grid gap-6 md:grid-cols-2">
				{projectsData.map((p) => (
					<ProjectCard
						key={p.title}
						title={p.title}
						description={p.description}
						imgSrc={p.imgSrc}
						href={p.href}
						repoHref={p.repoHref}
						tags={p.tags}
						status={p.status}
					/>
				))}
			</div>
		</div>
	);
}
```

- [ ] **Step 4: Lint + smoke**

Run: `npm run lint` → 0 warnings.
Run: `npm run dev`, visit `/projects`.
Expected: header, 2-col grid of project cards with status pill (top-right), tags row, title, description, dual CTAs.

- [ ] **Step 5: Commit**

```bash
git add data/projectsData.ts components/ProjectCard.tsx app/projects/page.tsx
git commit -m "feat(projects): card-based project list with status pill and image header

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 13: Redesign `/tags` index

**Files:**
- Modify: `app/tags/page.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import { genPageMetadata } from "app/seo";
import tagData from "app/tag-data.json";
import { slug } from "github-slugger";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";

export const metadata = genPageMetadata({
	title: "Tags",
	description: "Things I blog about",
});

export default async function Page() {
	const tagCounts = tagData as Record<string, number>;
	const tagKeys = Object.keys(tagCounts);
	const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Topics"
				title="Tags"
				description="Browse posts by topic. Counts reflect published articles."
			/>

			{tagKeys.length === 0 ? (
				<p className="text-muted-foreground">No tags found.</p>
			) : (
				<ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{sortedTags.map((t) => (
						<li key={t}>
							<Link
								href={`/tags/${slug(t)}`}
								className="group flex items-center justify-between rounded-kj-xl border border-border bg-card px-4 py-3 shadow-kj-sm transition-all hover:-translate-y-0.5 hover:shadow-kj-md"
								aria-label={`View posts tagged ${t}`}
							>
								<span className="font-sans text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
									#{t.split(" ").join("-")}
								</span>
								<span className="font-mono text-xs font-semibold text-muted-foreground">
									{tagCounts[t]}
								</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
```

- [ ] **Step 2: Lint + smoke + commit**

```bash
npm run lint
# visit /tags via Playwright MCP, light + dark
git add app/tags/page.tsx
git commit -m "feat(tags): grid of tag chip cards with counts

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 14: Update `/tags/[tag]` to surface active tag in PageHeader

**Files:**
- Modify: `app/tags/[tag]/page.tsx`

**Current state (verified):** The page resolves `tag = decodeURI(params.tag)`, computes a `title` (`tag[0].toUpperCase() + tag.split(" ").join("-").slice(1)`), and passes it to `<ListLayout title={title} ...>`. The new `ListLayoutWithTags` reads `title` straight into `PageHeader`. The `ListLayout` call also passes `filteredProjects` (unused by the new layout — safe to drop).

- [ ] **Step 1: Change the rendered title to be explicit about the tag**

In `app/tags/[tag]/page.tsx`, find the line that computes `title`:
```ts
const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
```

Replace with:
```ts
const displayTag = tag.split(" ").join("-");
const title = `Posts tagged: #${displayTag}`;
```

- [ ] **Step 2: Drop the unused `filteredProjects` from the ListLayout invocation**

Locate the JSX:
```tsx
<ListLayout
	posts={filteredPosts}
	initialDisplayPosts={initialDisplayPosts}
	pagination={pagination}
	title={title}
	// ... possibly more props
/>
```

Ensure only `posts`, `initialDisplayPosts`, `pagination`, `title` are passed. Remove any `filteredProjects` prop if present. Remove the line that computes `filteredProjects` if it's unused after that — and the `projectsData` import if no longer referenced.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: 0 warnings (no unused imports/vars).

- [ ] **Step 4: Smoke**

Run: `npm run dev`, visit `/tags/next-js` (or any existing tag slug) via Playwright MCP.
Expected: PageHeader shows eyebrow "Writing" and title "Posts tagged: #next-js"; sidebar highlights the active tag.

- [ ] **Step 5: Commit**

```bash
git add 'app/tags/[tag]/page.tsx'
git commit -m "feat(tags): surface active tag in page header, drop unused project filter

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 15: Redesign `/learning`

**Files:**
- Read first: `app/learning/page.tsx` and `data/coursesData.ts`
- Modify: `app/learning/page.tsx`

- [ ] **Step 1: Inspect existing**

Run: `cat app/learning/page.tsx data/coursesData.ts`
Identify shape: course entries with title, provider, date, certificate link.

- [ ] **Step 2: Replace page contents**

Use the pattern below; adapt field names to whatever `coursesData.ts` actually exposes (do not change the data file):

```tsx
import { genPageMetadata } from "app/seo";
import Link from "@/components/Link";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import Pill from "@/components/Pill";
import coursesData from "@/data/coursesData";

export const metadata = genPageMetadata({ title: "Learning" });

export default function Learning() {
	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Continuous Growth"
				title="Learning"
				description="Courses and certifications I've completed to stay sharp across the stack."
			/>

			<div className="grid gap-4 md:grid-cols-2">
				{coursesData.map((c) => (
					<Card key={c.title} as="article" interactive>
						<div className="flex flex-wrap items-start justify-between gap-3">
							<div className="space-y-1">
								<p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
									{c.provider}
								</p>
								<h2 className="font-sans text-lg font-bold text-foreground">
									{c.title}
								</h2>
							</div>
							{c.date ? <Pill>{c.date}</Pill> : null}
						</div>
						{c.href ? (
							<div className="pt-4">
								<Link
									href={c.href}
									className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
								>
									View certificate →
								</Link>
							</div>
						) : null}
					</Card>
				))}
			</div>
		</div>
	);
}
```

If `coursesData` field names differ (e.g. `name` instead of `title`), adjust references — do not edit `coursesData.ts` itself.

- [ ] **Step 3: Lint + smoke + commit**

```bash
npm run lint
# visit /learning via Playwright MCP
git add app/learning/page.tsx
git commit -m "feat(learning): card grid for courses with provider/date/certificate

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 5 — Detail layouts

### Task 16: Card-based `PostLayout`

**Files:**
- Modify: `layouts/PostLayout.tsx`

- [ ] **Step 1: Replace contents**

Replace the entire `layouts/PostLayout.tsx` body with:

```tsx
import type { Authors, Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import type { ReactNode } from "react";
import Card from "@/components/Card";
import Comments from "@/components/Comments";
import Image from "@/components/Image";
import Link from "@/components/Link";
import Pill from "@/components/Pill";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import SectionContainer from "@/components/SectionContainer";
import siteMetadata from "@/data/siteMetadata";

interface LayoutProps {
	content: CoreContent<Blog>;
	authorDetails: CoreContent<Authors>[];
	next?: { path: string; title: string };
	prev?: { path: string; title: string };
	children: ReactNode;
}

const editUrl = (path: string) =>
	`${siteMetadata.siteRepo}/blob/main/data/${path}`;

const discussUrl = (path: string) =>
	`https://mobile.twitter.com/search?q=${encodeURIComponent(
		`${siteMetadata.siteUrl}/${path}`,
	)}`;

export default function PostLayout({
	content,
	authorDetails,
	next,
	prev,
	children,
}: LayoutProps) {
	const { filePath, path, slug, date, title, tags } = content;
	const basePath = path.split("/")[0];

	return (
		<SectionContainer>
			<ScrollTopAndComment />
			<article className="space-y-8 py-8">
				<Card glow padded>
					<div className="space-y-4">
						{tags && tags.length > 0 ? (
							<div className="flex flex-wrap gap-1.5">
								{tags.map((t) => (
									<Pill key={t} tone="primary">
										{t}
									</Pill>
								))}
							</div>
						) : null}
						<h1 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
							{title}
						</h1>
						<div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
							<time dateTime={date}>
								{formatDate(date, siteMetadata.locale)}
							</time>
							{authorDetails.map((author) => (
								<span
									key={author.name}
									className="inline-flex items-center gap-2"
								>
									<span>·</span>
									{author.avatar ? (
										<Image
											src={author.avatar}
											width={20}
											height={20}
											alt="avatar"
											className="rounded-full"
										/>
									) : null}
									<span className="font-sans text-sm font-semibold text-foreground">
										{author.name}
									</span>
								</span>
							))}
						</div>
					</div>
				</Card>

				<Card as="section" padded className="prose prose-invert max-w-none dark:prose-invert">
					{children}
				</Card>

				<Card padded>
					<div className="flex flex-wrap items-center justify-between gap-4 text-sm">
						<Link
							href={discussUrl(path)}
							rel="nofollow"
							className="font-mono font-semibold text-muted-foreground transition-colors hover:text-primary"
						>
							Discuss on Twitter
						</Link>
						<Link
							href={editUrl(filePath)}
							className="font-mono font-semibold text-muted-foreground transition-colors hover:text-primary"
						>
							View on GitHub
						</Link>
					</div>
				</Card>

				{siteMetadata.comments ? (
					<Card padded>
						<Comments slug={slug} />
					</Card>
				) : null}

				{(prev || next) && (
					<Card padded>
						<div className="flex flex-wrap items-stretch justify-between gap-4">
							{prev ? (
								<Link
									href={`/${prev.path}`}
									className="group flex flex-col"
								>
									<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
										← Previous
									</span>
									<span className="font-sans text-base font-semibold text-foreground transition-colors group-hover:text-primary">
										{prev.title}
									</span>
								</Link>
							) : (
								<span />
							)}
							{next ? (
								<Link
									href={`/${next.path}`}
									className="group flex flex-col items-end text-right"
								>
									<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
										Next →
									</span>
									<span className="font-sans text-base font-semibold text-foreground transition-colors group-hover:text-primary">
										{next.title}
									</span>
								</Link>
							) : (
								<span />
							)}
						</div>
					</Card>
				)}

				<div className="pt-2">
					<Link
						href={`/${basePath}`}
						className="font-mono text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
					>
						← Back to the blog
					</Link>
				</div>
			</article>
		</SectionContainer>
	);
}
```

> **Notes:**
> 1. `prose prose-invert` applies the typography plugin's dark variant. If dark is the default theme, we leave `prose-invert` always on. To respect theme toggle, swap to `prose dark:prose-invert` — choose whichever your global styles already do.
> 2. The original `PostLayout` had a sidebar (TOC + author + tags). We're consolidating into vertical cards for visual cohesion with the rest of the site. If you want the sticky TOC back, add it as an `<aside>` wrapping a `Card` inside a `grid lg:grid-cols-[1fr_240px]` and reintroduce `TocInline` from `pliny/ui/TOCInline` (you'd need to pass `toc` through `content`).

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: 0 warnings.

- [ ] **Step 3: Smoke**

Run: `npm run dev`, visit `/blog/<existing-post-slug>` via Playwright MCP in dark and light.
Expected: card-stacked layout — hero card (tags pills, title, date, author), content card with prose, share card, prev/next card.

- [ ] **Step 4: Commit**

```bash
git add layouts/PostLayout.tsx
git commit -m "feat(blog): card-based PostLayout with hero/content/share/prev-next cards

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 17: `PostSimple` (minimal variant)

**Files:**
- Modify: `layouts/PostSimple.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import type { Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import type { ReactNode } from "react";
import Card from "@/components/Card";
import Comments from "@/components/Comments";
import Link from "@/components/Link";
import Pill from "@/components/Pill";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import SectionContainer from "@/components/SectionContainer";
import siteMetadata from "@/data/siteMetadata";

interface LayoutProps {
	content: CoreContent<Blog>;
	next?: { path: string; title: string };
	prev?: { path: string; title: string };
	children: ReactNode;
}

export default function PostSimple({
	content,
	next,
	prev,
	children,
}: LayoutProps) {
	const { path, slug, date, title, tags } = content;
	const basePath = path.split("/")[0];

	return (
		<SectionContainer>
			<ScrollTopAndComment />
			<article className="space-y-8 py-8">
				<Card glow padded>
					<div className="space-y-4">
						{tags && tags.length > 0 ? (
							<div className="flex flex-wrap gap-1.5">
								{tags.map((t) => (
									<Pill key={t} tone="primary">
										{t}
									</Pill>
								))}
							</div>
						) : null}
						<h1 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
							{title}
						</h1>
						<time
							dateTime={date}
							className="block font-mono text-xs text-muted-foreground"
						>
							{formatDate(date, siteMetadata.locale)}
						</time>
					</div>
				</Card>

				<Card as="section" padded className="prose dark:prose-invert max-w-none">
					{children}
				</Card>

				{siteMetadata.comments ? (
					<Card padded>
						<Comments slug={slug} />
					</Card>
				) : null}

				{(prev || next) && (
					<Card padded>
						<div className="flex flex-wrap items-stretch justify-between gap-4">
							{prev ? (
								<Link
									href={`/${prev.path}`}
									className="group flex flex-col"
								>
									<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
										← Previous
									</span>
									<span className="font-sans text-base font-semibold text-foreground transition-colors group-hover:text-primary">
										{prev.title}
									</span>
								</Link>
							) : (
								<span />
							)}
							{next ? (
								<Link
									href={`/${next.path}`}
									className="group flex flex-col items-end text-right"
								>
									<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
										Next →
									</span>
									<span className="font-sans text-base font-semibold text-foreground transition-colors group-hover:text-primary">
										{next.title}
									</span>
								</Link>
							) : (
								<span />
							)}
						</div>
					</Card>
				)}

				<div className="pt-2">
					<Link
						href={`/${basePath}`}
						className="font-mono text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
					>
						← Back to the blog
					</Link>
				</div>
			</article>
		</SectionContainer>
	);
}
```

- [ ] **Step 2: Lint + smoke + commit**

```bash
npm run lint
# visit a post that uses layout: PostSimple via Playwright MCP
git add layouts/PostSimple.tsx
git commit -m "feat(blog): redesign PostSimple as minimal card stack

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 18: `PostBanner` (banner image variant)

**Files:**
- Modify: `layouts/PostBanner.tsx`

- [ ] **Step 1: Read existing**

Run: `cat layouts/PostBanner.tsx`
Identify the props it receives (typically same as PostLayout but with `images`).

- [ ] **Step 2: Wrap in cards**

Replace its body using the same template as `PostSimple` (Task 17), but add a banner block at the top of the hero card:

```tsx
{content.images && content.images.length > 0 ? (
	<div className="-m-6 mb-6 overflow-hidden sm:-m-8 sm:mb-8">
		<Image
			src={content.images[0]}
			alt={title}
			width={1600}
			height={900}
			className="h-64 w-full object-cover sm:h-80 md:h-96"
		/>
	</div>
) : null}
```

(Place this as the first child of the hero `<Card glow padded>`, before the tags/title.)

Make sure to import `Image` from `@/components/Image`.

- [ ] **Step 3: Lint + smoke + commit**

```bash
npm run lint
# visit a post that uses layout: PostBanner via Playwright MCP
git add layouts/PostBanner.tsx
git commit -m "feat(blog): redesign PostBanner with banner image in hero card

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 6 — Static pages

### Task 19: Redesign `/about`

**Files:**
- Read first: `app/about/page.tsx`, `data/experienceData.ts`, `data/educationData.ts`, `data/skillsData.ts`, `data/siteMetadata.js`
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Inspect**

Run: `cat app/about/page.tsx`
Note the bio source (likely `data/authors/default.mdx` via Contentlayer or inline strings). Reuse whatever is currently there for the bio prose.

- [ ] **Step 2: Replace page with sectioned card layout**

```tsx
import { genPageMetadata } from "app/seo";
import { allAuthors } from "contentlayer/generated";
import { coreContent } from "pliny/utils/contentlayer";
import Card from "@/components/Card";
import Image from "@/components/Image";
import PageHeader from "@/components/PageHeader";
import Pill from "@/components/Pill";
import StatBadge from "@/components/StatBadge";
import educationData from "@/data/educationData";
import experienceData from "@/data/experienceData";
import skillsData from "@/data/skillsData";
import siteMetadata from "@/data/siteMetadata";

export const metadata = genPageMetadata({ title: "About" });

export default function About() {
	const author = coreContent(
		allAuthors.find((a) => a.slug === "default") ?? allAuthors[0],
	);

	return (
		<div className="space-y-10 pb-16">
			<PageHeader
				eyebrow="About"
				title={`Hi, I'm ${siteMetadata.author}`}
				description={siteMetadata.description}
			/>

			<Card padded glow>
				<div className="grid items-center gap-8 md:grid-cols-[200px_1fr]">
					{author.avatar ? (
						<Image
							src={author.avatar}
							alt={author.name}
							width={200}
							height={200}
							className="mx-auto rounded-kj-2xl border border-border shadow-kj-sm"
						/>
					) : null}
					<div className="space-y-4">
						<p className="text-base leading-relaxed text-muted-foreground">
							{author.occupation
								? `${author.occupation}${author.company ? ` at ${author.company}` : ""}.`
								: ""}
						</p>
						<div className="grid grid-cols-3 gap-6">
							<StatBadge value="5+" label="Years experience" />
							<StatBadge
								value="10+"
								label="Projects shipped"
								accent="secondary"
							/>
							<StatBadge value="100%" label="Commitment" />
						</div>
					</div>
				</div>
			</Card>

			<section className="space-y-6">
				<div className="space-y-2">
					<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
						Experience
					</p>
					<h2 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Where I've worked
					</h2>
				</div>
				<div className="space-y-4">
					{experienceData.map((entry) => (
						<Card key={`${entry.primaryText}-${entry.secondaryText}`} padded>
							<div className="space-y-3">
								<p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
									{entry.secondaryText}
								</p>
								<h3 className="font-sans text-lg font-bold text-foreground">
									{entry.primaryText}
								</h3>
								{entry.tags && entry.tags.length > 0 ? (
									<div className="flex flex-wrap gap-1.5">
										{entry.tags.map((t) => (
											<Pill key={t}>{t}</Pill>
										))}
									</div>
								) : null}
								{entry.link ? (
									<a
										href={entry.link.href}
										className="font-mono text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
									>
										{entry.link.text} →
									</a>
								) : null}
							</div>
						</Card>
					))}
				</div>
			</section>

			<div className="grid gap-6 md:grid-cols-2">
				<Card padded>
					<div className="space-y-4">
						<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
							Education
						</p>
						<ul className="space-y-3">
							{educationData.map((e) => (
								<li key={e.primaryText} className="space-y-0.5">
									<p className="font-sans text-base font-semibold text-foreground">
										{e.primaryText}
									</p>
									<p className="font-mono text-xs text-muted-foreground">
										{e.secondaryText}
									</p>
								</li>
							))}
						</ul>
					</div>
				</Card>

				<Card padded>
					<div className="space-y-4">
						<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
							Skills
						</p>
						<ul className="space-y-3">
							{skillsData.map((s) => (
								<li key={s.title} className="space-y-1">
									<div className="flex items-center justify-between">
										<span className="font-sans text-sm font-semibold text-foreground">
											{s.title}
										</span>
										<span className="font-mono text-xs text-muted-foreground">
											{s.percent}%
										</span>
									</div>
									<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full rounded-full bg-primary"
											style={{ width: `${s.percent}%` }}
										/>
									</div>
								</li>
							))}
						</ul>
					</div>
				</Card>
			</div>
		</div>
	);
}
```

> **Note:** If `allAuthors[0]` lacks `avatar`, `occupation`, or `company` typings, narrow with optional chaining as shown. If `coreContent` is not exported from `pliny/utils/contentlayer`, fall back to `allAuthors[0]` directly. Do not modify the MDX author file.

- [ ] **Step 3: Lint + smoke + commit**

```bash
npm run lint
# visit /about via Playwright MCP, light + dark
git add app/about/page.tsx
git commit -m "feat(about): card-based about page with bio/experience/education/skills

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 20: Redesign `/faq`

**Files:**
- Modify: `components/FAQAccordion.tsx`
- Modify: `app/faq/page.tsx`

- [ ] **Step 1: Rewrite `FAQAccordion.tsx`**

```tsx
"use client";

import { useState } from "react";
import type { FAQItem } from "@/data/faqData";

interface FAQAccordionProps {
	items: FAQItem[];
	category: FAQItem["category"];
}

export default function FAQAccordion({ items, category }: FAQAccordionProps) {
	const filtered = items.filter((i) => i.category === category);
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	if (filtered.length === 0) return null;

	return (
		<div className="space-y-3">
			{filtered.map((item, index) => {
				const open = openIndex === index;
				return (
					<div
						key={item.question}
						className="overflow-hidden rounded-kj-2xl border border-border bg-card shadow-kj-sm transition-shadow hover:shadow-kj-md"
					>
						<button
							type="button"
							onClick={() => setOpenIndex(open ? null : index)}
							aria-expanded={open}
							className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-muted/50"
						>
							<span className="font-sans text-base font-semibold text-foreground sm:text-lg">
								{item.question}
							</span>
							<svg
								className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<title>Toggle answer</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2.5}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
						{open ? (
							<div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
								{item.answer}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}
```

- [ ] **Step 2: Rewrite `app/faq/page.tsx`**

```tsx
import { genPageMetadata } from "app/seo";
import FAQAccordion from "@/components/FAQAccordion";
import PageHeader from "@/components/PageHeader";
import faqData from "@/data/faqData";

export const metadata = genPageMetadata({ title: "FAQ" });

const categories: { id: "technical" | "work" | "personal" | "contact"; title: string }[] = [
	{ id: "technical", title: "Technical Preferences" },
	{ id: "work", title: "Work & Experience" },
	{ id: "personal", title: "Personal" },
	{ id: "contact", title: "Contact & Process" },
];

export default function FAQ() {
	return (
		<div className="space-y-10 pb-16">
			<PageHeader
				eyebrow="FAQ"
				title="Frequently asked questions"
				description="Common questions about how I work, my preferences, and how to get in touch."
			/>

			{categories.map((cat) => (
				<section key={cat.id} className="space-y-4">
					<h2 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
						{cat.title}
					</h2>
					<FAQAccordion items={faqData} category={cat.id} />
				</section>
			))}
		</div>
	);
}
```

- [ ] **Step 3: Lint + smoke + commit**

```bash
npm run lint
# visit /faq via Playwright MCP, expand a few items
git add components/FAQAccordion.tsx app/faq/page.tsx
git commit -m "feat(faq): card-based accordion with category sections

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 21: Restyle `not-found.tsx`

**Files:**
- Modify: `app/not-found.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";

export default function NotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
			<PageHeader
				eyebrow="404"
				title="Page not found"
				description="The page you're looking for doesn't exist or has been moved."
			/>
			<Link
				href="/"
				className="inline-flex items-center gap-2 rounded-kj-lg bg-primary px-6 py-3 font-sans text-sm font-semibold text-primary-foreground shadow-kj-glow transition-colors hover:bg-primary-hover"
			>
				← Back to home
			</Link>
		</div>
	);
}
```

> **Note:** If the existing `not-found.tsx` is wrapped by the global layout, `PageHeader` already adds vertical padding — the wrapper above keeps it centered. If a `<SectionContainer>` is needed, wrap the contents.

- [ ] **Step 2: Lint + smoke + commit**

```bash
npm run lint
# visit /this-route-does-not-exist via Playwright MCP
git add app/not-found.tsx
git commit -m "feat(404): restyle not-found page with PageHeader and primary CTA

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 7 — Polish

### Task 22: Full visual sweep with Playwright

**Files:** none modified — verification only.

- [ ] **Step 1: Boot dev server**

Run: `npm run dev` (background).

- [ ] **Step 2: Visit each route in dark mode**

Using Playwright MCP, for each URL below: navigate, take a screenshot, check console for errors, verify the page renders the expected elements (sticky header, footer, content per spec).

URLs:
- `/`
- `/blog`
- `/blog/<a-real-slug>` (PostLayout)
- `/blog/<a-PostSimple-slug>` (if any exists)
- `/blog/<a-PostBanner-slug>` (if any exists)
- `/projects`
- `/about`
- `/faq`
- `/tags`
- `/tags/<a-real-tag>`
- `/learning`
- `/this-route-does-not-exist` (404)

- [ ] **Step 3: Toggle to light, repeat**

Click the ThemeSwitch on `/`, set to light, then revisit each URL. Verify amber/teal accents remain legible and no dark-specific styles bleed through.

- [ ] **Step 4: Capture findings**

Note any visual bugs (overflow, contrast, missing icons, broken images). For each bug, add a small follow-up commit on the same task touching the offending file. Keep commit messages narrow.

- [ ] **Step 5: Stop dev server**

---

### Task 23: Lint + build verification

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: 0 warnings, 0 errors.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: Contentlayer generates types, Next builds all routes, postbuild script writes `public/feed.xml`, exit code 0. Note any TypeScript errors or unused imports and fix them in a single follow-up commit.

- [ ] **Step 3: Serve and smoke**

Run: `npm run serve` (background), revisit `/` and `/blog/<slug>` via Playwright MCP.
Expected: identical visual to dev, no hydration warnings in console.

- [ ] **Step 4: Stop server**

---

### Task 24: Lighthouse check on `/`

- [ ] **Step 1: Run Lighthouse**

If the project has the `lighthouse-audit` skill, invoke it on `/` and `/blog/<slug>` and `/projects`. Otherwise, use Chrome DevTools via Playwright MCP `mcp__plugin_playwright_playwright__browser_evaluate` or skip if not feasible.

- [ ] **Step 2: Compare**

Expected: Performance / Accessibility / Best Practices / SEO scores within ±5 of the prior baseline (capture from `git stash` of pre-rollout main if available; otherwise document the new numbers).

- [ ] **Step 3: Commit findings (optional)**

If you generate a report file:
```bash
git add docs/superpowers/reports/2026-05-24-lighthouse-after-rollout.md
git commit -m "docs: capture lighthouse scores after kj/design rollout

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Spec coverage map

| Spec section | Task(s) |
|---|---|
| Foundations / tokens / typography | Reused as-is; verified in T8, T11, T16 |
| Theme dark default + toggle | T1 |
| `PageHeader` | T4; used in T11, T12, T13, T15, T19, T20, T21 |
| `Card` | T2 (free name), T3 (create); used everywhere |
| `StatBadge` | T6; used in T10, T19 |
| `TechStackBar` + `techStackData` | T7; used in T10 |
| `Pill` | T5; used in T11, T12, T16, T17, T18, T19 |
| Sticky glass Header | T8 |
| 4-column Footer | T9 |
| Home tune-up (stats + tech bar) | T10 |
| `/blog` redesign | T11 |
| `/blog/[slug]` PostLayout | T16 |
| PostSimple | T17 |
| PostBanner | T18 |
| `/projects` + projectsData status | T12 |
| `/about` | T19 |
| `/faq` | T20 |
| `/tags` index | T13 |
| `/tags/[tag]` | T14 |
| `/learning` | T15 |
| `not-found.tsx` | T21 |
| Verification (Playwright/lint/build/lighthouse) | T22, T23, T24 |
| Pre-commit hook fix | T0 |
