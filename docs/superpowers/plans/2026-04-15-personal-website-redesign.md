# Personal Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the site as a senior-engineer portfolio with a clearer homepage narrative, stronger projects/writing presentation, and a cleaner modern visual system.

**Architecture:** Keep the existing Next.js App Router, MDX, and Contentlayer stack intact while refactoring the presentation layer into clearer homepage/page-specific sections. Introduce a small set of focused UI components and richer project metadata so the redesign improves structure and content hierarchy without rebuilding the content system.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Contentlayer, Vitest, Biome

---

## File Structure

### Existing files to modify

- `app/Main.tsx`
  Homepage composition and homepage-level SEO schema payloads.
- `app/layout.tsx`
  Global font wiring, background treatment, and layout shell behavior.
- `app/layout.css`
  Homepage-specific motion and section animation rules.
- `app/projects/page.tsx`
  Projects landing page structure and messaging.
- `app/blog/page.tsx`
  Route metadata and entry configuration for the Writing landing page.
- `app/about/page.tsx`
  About page framing and section ordering.
- `components/Header.tsx`
  Desktop navigation, contact CTA treatment, and header layout.
- `components/MobileNav.tsx`
  Mobile navigation structure and contact action.
- `components/NavLink.tsx`
  Active/inactive navigation treatment.
- `components/Footer.tsx`
  Secondary navigation and lower-priority destination links.
- `components/Hero.tsx`
  Existing hero will either be replaced or reduced to a thin wrapper around new homepage sections.
- `components/Card.tsx`
  Current generic project card; likely needs either a redesign or replacement.
- `layouts/ListLayoutWithTags.tsx`
  Writing page presentation, title/copy, and list/sidebar styling.
- `css/tailwind.css`
  Theme tokens, typography defaults, focus states, and reusable utility classes.
- `data/headerNavLinks.ts`
  Primary nav information architecture.
- `data/siteMetadata.js`
  Portfolio-forward metadata, title, and description.
- `data/projectsData.ts`
  Richer project content model and featured-project support.

### New files to create

- `components/home/HomeHero.tsx`
  Homepage hero focused on senior-engineer positioning.
- `components/home/HomeProofStrip.tsx`
  Compact credibility band for strengths, experience, and domains.
- `components/home/FeaturedProjects.tsx`
  Homepage-selected project showcase.
- `components/home/FeaturedWriting.tsx`
  Curated writing section for the homepage.
- `components/home/HomeWorkingStyle.tsx`
  Short professional profile / working style block.
- `components/home/HomeContactCta.tsx`
  Final homepage conversion section.
- `components/projects/ProjectShowcaseCard.tsx`
  Richer card variant for homepage/projects index if `components/Card.tsx` becomes too generic.
- `test/setup.ts`
  Shared Vitest DOM setup for component/page tests.
- `vitest.config.ts`
  Vitest config for jsdom/component testing if the current zero-config setup becomes limiting.
- `__tests__/header-navigation.test.tsx`
  Assertions for primary/secondary nav behavior.
- `__tests__/home-page.test.tsx`
  Assertions for homepage section order and key copy/CTA presence.
- `__tests__/projects-page.test.tsx`
  Assertions for featured project presentation and metadata rendering.
- `__tests__/writing-page.test.tsx`
  Assertions for Writing relabeling and list header behavior.

### Optional new data file if content in `siteMetadata` becomes too cramped

- `data/homepageData.ts`
  Centralized homepage proof-strip and working-style copy.

If homepage copy remains compact, skip this file and keep content local to the new homepage section components.

## Chunk 1: Foundation and Information Architecture

### Task 1: Add UI test scaffolding before redesign work

**Files:**
- Create: `vitest.config.ts`
- Create: `test/setup.ts`
- Modify: `package.json`
- Test: `__tests__/smoke.test.ts`

- [ ] **Step 1: Write the failing test setup expectations**

Add a minimal DOM-aware smoke test update in `__tests__/smoke.test.ts`:

```ts
import { render, screen } from "@testing-library/react";

it("renders basic DOM content in jsdom", () => {
  render(<button>hello</button>);
  expect(screen.getByRole("button", { name: "hello" })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run __tests__/smoke.test.ts -v`
Expected: FAIL because Testing Library or DOM matchers are not configured yet.

- [ ] **Step 3: Add minimal test dependencies and config**

Update `package.json` devDependencies to include:

```json
{
  "@testing-library/jest-dom": "^6",
  "@testing-library/react": "^16",
  "@testing-library/user-event": "^14"
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
  },
});
```

Create `test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));
```

If `Header` tests become noisy because `SearchButton` triggers lazy imports, add a lightweight component stub:

```ts
vi.mock("@/components/SearchButton", () => ({
  default: () => <button type="button">Search</button>,
}));
```

- [ ] **Step 4: Run the smoke test to verify it passes**

Run: `npx vitest run __tests__/smoke.test.ts -v`
Expected: PASS with DOM matcher support active.

- [ ] **Step 5: Commit the scaffolding**

```bash
git add package.json vitest.config.ts test/setup.ts __tests__/smoke.test.ts
git commit -m "test: add ui testing setup"
```

### Task 2: Lock the approved navigation and metadata strategy

**Files:**
- Modify: `data/headerNavLinks.ts`
- Modify: `data/siteMetadata.js`
- Modify: `components/Header.tsx`
- Modify: `components/NavLink.tsx`
- Modify: `components/MobileNav.tsx`
- Modify: `components/Footer.tsx`
- Test: `__tests__/header-navigation.test.tsx`

- [ ] **Step 1: Write the failing navigation test**

Create `__tests__/header-navigation.test.tsx` with assertions like:

```tsx
it("shows Home, Projects, Writing, About in primary navigation", () => {
  render(<Header />);
  expect(screen.getByRole("link", { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /writing/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /faq/i })).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the new navigation test to verify it fails**

Run: `npx vitest run __tests__/header-navigation.test.tsx -v`
Expected: FAIL because current nav still exposes `Blog`, `FAQ`, and `Tags`.

- [ ] **Step 3: Update the data sources**

Change `data/headerNavLinks.ts` to:

```ts
const headerNavLinks = [
  { href: "/", title: "Home" },
  { href: "/projects", title: "Projects" },
  { href: "/blog", title: "Writing" },
  { href: "/about", title: "About" },
];
```

Update `data/siteMetadata.js` title/description to be portfolio-forward instead of blog-forward.

- [ ] **Step 4: Update header/mobile/footer rendering**

Implement:
- Header contact action as a button-style link to `/#contact`
- Mobile nav including the same top-level destinations plus contact action
- Footer secondary links for `FAQ`, `Learning`, and `Tags`
- Cleaner active-state treatment in `NavLink.tsx`

- [ ] **Step 5: Run navigation tests to verify they pass**

Run: `npx vitest run __tests__/header-navigation.test.tsx -v`
Expected: PASS with approved IA reflected in desktop and shared nav rendering.

- [ ] **Step 6: Commit the IA changes**

```bash
git add data/headerNavLinks.ts data/siteMetadata.js components/Header.tsx components/NavLink.tsx components/MobileNav.tsx components/Footer.tsx __tests__/header-navigation.test.tsx
git commit -m "feat: update portfolio navigation structure"
```

## Chunk 2: Visual Foundation and Homepage Sections

### Task 3: Replace the global visual tokens with the approved light-first system

**Files:**
- Modify: `css/tailwind.css`
- Modify: `app/layout.tsx`
- Modify: `app/layout.css`
- Test: `__tests__/header-navigation.test.tsx`

- [ ] **Step 1: Write the failing visual token test**

Extend `__tests__/header-navigation.test.tsx` (or add a small `__tests__/theme-shell.test.tsx` if preferred) to assert the shell exposes the new contact CTA and expected body/main landmarks after refactor.

Example:

```tsx
expect(screen.getByRole("main")).toBeInTheDocument();
expect(screen.getByRole("link", { name: /contact/i })).toHaveClass("rounded-full");
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run __tests__/header-navigation.test.tsx -v`
Expected: FAIL until the new header/button treatment is implemented.

- [ ] **Step 3: Replace the current purple-accent token system**

In `css/tailwind.css`:
- Replace purple/pink-heavy primary tokens with near-black neutrals + cobalt accent
- Remove unnecessary accent token usage that drives decorative gradients
- Keep focus/focus-visible rules strong in both themes
- Add 1-2 reusable utilities for section spacing and panel surfaces if needed

- [ ] **Step 4: Simplify the layout shell**

In `app/layout.tsx`:
- Swap `Space_Grotesk` for the approved sans direction (`Outfit` or `DM Sans`/`Work Sans`)
- Tone down or remove the current ambient gradient blobs
- Keep accessibility hooks such as skip-link and `main` landmark intact

In `app/layout.css`:
- Remove or reduce decorative hero choreography that conflicts with the new direction
- Keep only motion that supports section entrance clarity and `prefers-reduced-motion`

- [ ] **Step 5: Run targeted tests**

Run: `npx vitest run __tests__/header-navigation.test.tsx -v`
Expected: PASS with updated shell and nav CTA assumptions.

- [ ] **Step 6: Commit the visual foundation**

```bash
git add css/tailwind.css app/layout.tsx app/layout.css components/Header.tsx components/NavLink.tsx components/MobileNav.tsx __tests__/header-navigation.test.tsx
git commit -m "feat: establish redesigned visual foundation"
```

### Task 4: Build the homepage section components

**Files:**
- Create: `components/home/HomeHero.tsx`
- Create: `components/home/HomeProofStrip.tsx`
- Create: `components/home/FeaturedProjects.tsx`
- Create: `components/home/FeaturedWriting.tsx`
- Create: `components/home/HomeWorkingStyle.tsx`
- Create: `components/home/HomeContactCta.tsx`
- Optional Create: `data/homepageData.ts`
- Test: `__tests__/home-page.test.tsx`

- [ ] **Step 1: Write the failing homepage structure test**

Create `__tests__/home-page.test.tsx`:

```tsx
it("renders the homepage narrative in the approved order", async () => {
  render(<Home posts={mockPosts} />);
  expect(screen.getByRole("heading", { name: /senior/i })).toBeInTheDocument();
  expect(screen.getByText(/featured projects/i)).toBeInTheDocument();
  expect(screen.getByText(/technical writing/i)).toBeInTheDocument();
  expect(screen.getByText(/working style/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the homepage test to verify it fails**

Run: `npx vitest run __tests__/home-page.test.tsx -v`
Expected: FAIL because the current homepage still renders `Hero` + `Latest Posts`.

- [ ] **Step 3: Create the new focused homepage sections**

Implement small components with single responsibilities. Example skeleton:

```tsx
export default function HomeProofStrip() {
  return (
    <section aria-labelledby="proof-strip">
      <h2 id="proof-strip">Proof at a glance</h2>
      {/* experience, strengths, domains */}
    </section>
  );
}
```

If homepage content is too dense to hardcode cleanly, create `data/homepageData.ts` to hold proof-strip and working-style content.

- [ ] **Step 3a: Give the homepage CTA block a stable anchor target**

In `components/home/HomeContactCta.tsx`, expose a stable section id:

```tsx
export default function HomeContactCta() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Let's talk</h2>
      {/* contact actions */}
    </section>
  );
}
```

- [ ] **Step 4: Rebuild `app/Main.tsx` using the approved section order**

Compose the homepage in this order:
- `HomeHero`
- `HomeProofStrip`
- `FeaturedProjects`
- `FeaturedWriting`
- `HomeWorkingStyle`
- `HomeContactCta`

Keep JSON-LD intact and adapt it only if the hero copy materially changes metadata language.

- [ ] **Step 5: Run the homepage test to verify it passes**

Run: `npx vitest run __tests__/home-page.test.tsx -v`
Expected: PASS with the new narrative order and CTAs.

- [ ] **Step 6: Commit the homepage section build**

```bash
git add app/Main.tsx components/home __tests__/home-page.test.tsx data/homepageData.ts
git commit -m "feat: rebuild homepage narrative sections"
```

If `data/homepageData.ts` is not created, omit it from the commit command.

### Task 5: Enrich the project data model for homepage and projects page use

**Files:**
- Modify: `data/projectsData.ts`
- Create or Modify: `components/projects/ProjectShowcaseCard.tsx`
- Modify: `components/Card.tsx`
- Test: `__tests__/projects-page.test.tsx`

- [ ] **Step 1: Write the failing projects metadata test**

Create `__tests__/projects-page.test.tsx` with expectations like:

```tsx
it("renders project role and outcome metadata", () => {
  render(<ProjectsPage />);
  expect(screen.getByText(/role/i)).toBeInTheDocument();
  expect(screen.getByText(/impact/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the projects test to verify it fails**

Run: `npx vitest run __tests__/projects-page.test.tsx -v`
Expected: FAIL because current `projectsData` only exposes title/description/tags.

- [ ] **Step 3: Expand `data/projectsData.ts`**

Add fields such as:

```ts
interface Project {
  title: string;
  description: string;
  role: string;
  impact: string;
  timeframe?: string;
  featured?: boolean;
  href?: string;
  repoHref?: string;
  tags?: string[];
}
```

Mark the 2-3 strongest projects as `featured: true`.

- [ ] **Step 4: Build or adapt the richer project card**

Prefer a dedicated `components/projects/ProjectShowcaseCard.tsx` if the new card would make `components/Card.tsx` too overloaded.

```tsx
<dl>
  <div><dt>Role</dt><dd>{project.role}</dd></div>
  <div><dt>Impact</dt><dd>{project.impact}</dd></div>
</dl>
```

- [ ] **Step 5: Run the projects test to verify it passes**

Run: `npx vitest run __tests__/projects-page.test.tsx -v`
Expected: PASS with richer project metadata visible.

- [ ] **Step 6: Commit the project model changes**

```bash
git add data/projectsData.ts components/projects/ProjectShowcaseCard.tsx components/Card.tsx __tests__/projects-page.test.tsx
git commit -m "feat: enrich project showcase content"
```

If `components/Card.tsx` is fully replaced, stage the replacement path instead.

## Chunk 3: Projects and Writing Page Refresh

### Task 6: Rebuild the Projects landing page around case-study framing

**Files:**
- Modify: `app/projects/page.tsx`
- Modify: `components/projects/ProjectShowcaseCard.tsx`
- Test: `__tests__/projects-page.test.tsx`

- [ ] **Step 1: Extend the failing projects page test**

Add assertions for:
- page headline
- supporting copy
- presence of featured metadata and project CTAs

```tsx
expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
expect(screen.getByText(/selected work/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run the projects page test to verify it fails**

Run: `npx vitest run __tests__/projects-page.test.tsx -v`
Expected: FAIL until the new copy and structure are in place.

- [ ] **Step 3: Rewrite `app/projects/page.tsx`**

Implement:
- stronger intro copy
- clear section spacing
- featured-project-first presentation
- optional secondary grouping for the remaining projects

- [ ] **Step 4: Verify the page test passes**

Run: `npx vitest run __tests__/projects-page.test.tsx -v`
Expected: PASS with the new projects framing.

- [ ] **Step 5: Commit the Projects page redesign**

```bash
git add app/projects/page.tsx components/projects/ProjectShowcaseCard.tsx __tests__/projects-page.test.tsx
git commit -m "feat: redesign projects landing page"
```

### Task 7: Reframe Blog as Writing in the UI

**Files:**
- Modify: `app/blog/page.tsx`
- Modify: `layouts/ListLayoutWithTags.tsx`
- Test: `__tests__/writing-page.test.tsx`

- [ ] **Step 1: Write the failing writing-page test**

Create `__tests__/writing-page.test.tsx`:

```tsx
it("labels the blog index as Writing in the UI", async () => {
  render(<ListLayoutWithTags posts={mockPosts} title="Writing" />);
  expect(screen.getByRole("heading", { name: /writing/i })).toBeInTheDocument();
  expect(screen.getByText(/technical thinking/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the writing-page test to verify it fails**

Run: `npx vitest run __tests__/writing-page.test.tsx -v`
Expected: FAIL because the current route/page still uses `Blog` and “All Posts”.

- [ ] **Step 3: Update route metadata and list layout copy**

Implement:
- `app/blog/page.tsx` metadata title aligned with `Writing`
- `ListLayoutWithTags` header/copy updated to the new positioning
- sidebar wording that supports the new framing

- [ ] **Step 4: Keep route behavior unchanged**

Do not rename the `/blog` route yet. Only update labels, metadata, and page copy.

- [ ] **Step 5: Run the writing-page test to verify it passes**

Run: `npx vitest run __tests__/writing-page.test.tsx -v`
Expected: PASS with Writing-first UI labels.

- [ ] **Step 6: Commit the Writing refresh**

```bash
git add app/blog/page.tsx layouts/ListLayoutWithTags.tsx __tests__/writing-page.test.tsx
git commit -m "feat: reframe blog as writing"
```

## Chunk 4: About Page, Footer Polish, and End-to-End Verification

### Task 8: Turn the About page into a stronger professional profile

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `data/experienceData.ts`
- Modify: `data/skillsData.ts`
- Test: `__tests__/home-page.test.tsx`

- [ ] **Step 1: Extend homepage/about assertions**

If homepage tests already reference “working style,” add a companion assertion for About page profile copy after extracting a reusable phrase or render target.

Example:

```tsx
expect(screen.getByText(/how i work/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run the impacted tests to verify failure**

Run: `npx vitest run __tests__/home-page.test.tsx -v`
Expected: FAIL after adding assertions for new profile framing.

- [ ] **Step 3: Rewrite the About page framing**

Implement:
- stronger intro framing
- tighter relationship between biography, experience, and strengths
- less “CV dump”, more “professional profile”

If needed, lightly adjust `data/experienceData.ts` / `data/skillsData.ts` labels for better readability in the new layout. Keep YAGNI: do not rebuild the data model unless the page truly needs it.

- [ ] **Step 4: Run tests to verify pass**

Run: `npx vitest run __tests__/home-page.test.tsx -v`
Expected: PASS with the updated profile cues in place.

- [ ] **Step 5: Commit the About refresh**

```bash
git add app/about/page.tsx data/experienceData.ts data/skillsData.ts __tests__/home-page.test.tsx
git commit -m "feat: strengthen about page profile"
```

### Task 9: Finish footer polish and secondary navigation consistency

**Files:**
- Modify: `components/Footer.tsx`
- Modify: `components/Header.tsx`
- Modify: `components/MobileNav.tsx`
- Test: `__tests__/header-navigation.test.tsx`

- [ ] **Step 1: Add failing assertions for secondary destinations**

Extend `__tests__/header-navigation.test.tsx`:

```tsx
expect(screen.getByRole("link", { name: /faq/i })).toBeInTheDocument();
expect(screen.getByRole("link", { name: /learning/i })).toBeInTheDocument();
expect(screen.getByRole("link", { name: /tags/i })).toBeInTheDocument();
```

- [ ] **Step 2: Run the navigation test to verify it fails**

Run: `npx vitest run __tests__/header-navigation.test.tsx -v`
Expected: FAIL if the footer/secondary links are not fully wired yet.

- [ ] **Step 3: Implement the footer secondary link block**

Add a simple secondary-nav cluster in the footer and confirm the contact path remains more prominent than these lower-priority destinations.

- [ ] **Step 4: Run the navigation test to verify it passes**

Run: `npx vitest run __tests__/header-navigation.test.tsx -v`
Expected: PASS with primary vs secondary IA clearly encoded.

- [ ] **Step 5: Commit the footer/navigation polish**

```bash
git add components/Footer.tsx components/Header.tsx components/MobileNav.tsx __tests__/header-navigation.test.tsx
git commit -m "feat: polish secondary navigation"
```

### Task 10: Run full verification and capture final cleanup

**Files:**
- Modify only if verification exposes problems in earlier files
- Test: all existing and new tests

- [ ] **Step 1: Run focused component/page tests**

Run:

```bash
npx vitest run __tests__/header-navigation.test.tsx __tests__/home-page.test.tsx __tests__/projects-page.test.tsx __tests__/writing-page.test.tsx -v
```

Expected: PASS on all targeted redesign tests.

- [ ] **Step 2: Run the complete test suite**

Run: `npm run test`
Expected: PASS with all smoke and redesign tests green.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: PASS with no new Biome issues.

- [ ] **Step 4: Run the production build**

Run: `npm run build`
Expected: PASS with static generation/postbuild succeeding.

- [ ] **Step 5: Perform responsive and interaction QA**

Manually review at:
- mobile: ~375px
- tablet: ~768px
- laptop: ~1024px
- desktop: ~1440px

Check:
- header/contact CTA hierarchy
- homepage section rhythm
- projects/writing readability
- focus-visible behavior
- reduced-motion behavior
- no horizontal scroll on mobile

- [ ] **Step 6: Commit final verification fixes**

```bash
git add .
git commit -m "fix: finalize portfolio redesign polish"
```

Only stage files changed by verification fixes. Do not blindly stage unrelated worktree changes.

## Manual Review Notes

- The repo currently has minimal tests, so introducing component/page-level coverage is part of the redesign work rather than an afterthought.
- The current Husky/lint-staged setup fails on some docs paths because `biome check --write` exits non-zero when passed ignored files. Do not assume hook failures always indicate application problems; verify whether the changed path is actually lintable before fixing product code.
- There are unrelated worktree changes in `app/tag-data.json`, `next-env.d.ts`, and untracked tooling directories. Do not revert or stage them unless the redesign work genuinely requires it.

## Suggested Execution Order

1. Foundation and tests
2. Navigation and global visual system
3. Homepage rebuild
4. Project data/card changes
5. Projects page
6. Writing page
7. About/footer polish
8. Full verification
