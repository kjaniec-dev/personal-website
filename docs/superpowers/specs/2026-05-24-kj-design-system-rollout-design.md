# kj/design System Rollout — Design Spec

**Date:** 2026-05-24
**Status:** Approved (pending user review of written spec)
**Owner:** Kamil Janiec

## Goal

Roll out the `@kj/design` token-based design language across every page of the personal website so the site reads as a single cohesive product: home, blog (list + post), projects, about, FAQ, tags. The home page mockup (dark theme, amber primary, teal secondary, generous whitespace, card-driven layout) is the visual reference.

## Non-Goals

- Migrate away from Contentlayer / Next.js App Router.
- Rewrite blog content.
- Touch `data/*.ts` content shapes — only presentation changes.
- Add new content sections beyond what the mockup implies (stats badges, tech-stack icons).
- Drop light mode.

## Constraints

- Keep all existing routes and URLs.
- Keep MDX content and frontmatter contract.
- Keep `data/siteMetadata.js`, `data/projectsData.ts`, `data/experienceData.ts`, `data/skillsData.ts`, `data/faqData.ts`, `data/headerNavLinks.ts` as the single sources of truth.
- `npm run lint` must pass with 0 warnings.
- `npm run build` must succeed (Contentlayer + Next + postbuild).
- Visual verification via Playwright MCP on each redesigned page (light + dark).

## Foundations

### Design tokens

Already present in `css/kj-design.css` and exposed via Tailwind `@theme` block. Reuse exclusively — no ad-hoc colors.

| Token | Usage |
|---|---|
| `--kj-background` / `bg-background` | page background |
| `--kj-card` / `bg-card` | every card surface |
| `--kj-border` / `border-border` | card + input borders |
| `--kj-primary` / `text-primary` / `bg-primary` | amber CTAs, eyebrows, accent text |
| `--kj-primary-hover` | hover state |
| `--kj-secondary` / `text-secondary` | teal accents (status, secondary CTAs) |
| `--kj-muted` / `bg-muted` | hover backgrounds, soft surfaces |
| `--kj-muted-foreground` | secondary text |
| `rounded-kj-{sm,md,lg,xl,2xl}` | radius scale |
| `shadow-kj-{xs,sm,md,lg,glow}` | shadow scale; `shadow-kj-glow` for primary CTAs |
| `font-sans` / `font-mono` | Inter / JetBrains Mono |

### Theme

- `app/theme-providers.tsx`: `defaultTheme="dark"`, keep `enableSystem`, `attribute="class"`.
- `ThemeSwitch` stays. Toggle cycles light / dark / system.
- Light mode keeps the same component contract — token swap handles the rest.

### Typography rhythm

- `H1`: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight`
- `H2`: `text-3xl sm:text-4xl font-bold tracking-tight`
- `H3`: `text-lg sm:text-xl font-bold`
- Eyebrow: `text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono`
- Body: `text-sm sm:text-base text-muted-foreground leading-relaxed`

## Shared Components

Added under `components/` so every page composes from the same primitives.

### `components/PageHeader.tsx`

```tsx
type PageHeaderProps = {
  eyebrow: string;        // e.g. "WPISY"
  title: string;          // H1
  description?: string;   // 1–2 sentences
  actions?: ReactNode;    // optional CTA buttons (right-aligned md+)
};
```

Layout: eyebrow → H1 → description, stacked, `space-y-3`, `py-12 md:py-16`. Used on `/blog`, `/projects`, `/about`, `/faq`, `/tags`, `/tags/[tag]`, `/learning`.

### `components/Card.tsx`

Wrapper around the recurring `rounded-kj-2xl border border-border bg-card shadow-kj-sm` pattern. Variants via props:

```tsx
type CardProps = {
  as?: "div" | "article" | "section";
  padded?: boolean;          // default true → p-6
  interactive?: boolean;     // adds hover:-translate-y-1 + hover:shadow-kj-md
  glow?: boolean;            // shadow-kj-lg + gradient overlay (used for CTA card)
};
```

### `components/StatBadge.tsx`

Vertical stat block: number + label. Three-up row on home + about.

```tsx
type StatBadgeProps = { value: string; label: string; accent?: "primary" | "secondary"; };
```

### `components/TechStackBar.tsx`

Horizontal pill bar of tech logos under the hero. Driven by a small `techStackData.ts` array of `{ name, icon }`.

### `components/Pill.tsx`

Tag/status chip used on blog post cards, project cards, FAQ category labels.

```tsx
type PillProps = { tone?: "default" | "primary" | "secondary" | "success" };
```

### `components/SectionEyebrow.tsx`

Already inline in `app/Main.tsx`. Extract to a one-line component to keep section headers uniform.

## Layout Chrome

### `components/Header.tsx`

- Sticky: `sticky top-0 z-40`.
- Glass: `backdrop-blur-md bg-card/70 border-b border-border`.
- Left: KJ wordmark (links home), `font-mono font-bold text-primary`.
- Center: nav links from `data/headerNavLinks.ts`.
- Right: search button, theme switch, primary CTA "Porozmawiajmy" → `mailto:` (hidden < md, replaced by mobile nav).
- `MobileNav` keeps current API; only styling updated to match (card panel, amber CTAs).

### `components/Footer.tsx`

Four-column grid (`md:grid-cols-4`) + bottom strip:

| Column | Content |
|---|---|
| Brand | KJ wordmark, 2-line bio, social icons row |
| Nawigacja | links from `headerNavLinks` |
| Usługi | Static array: Aplikacje Webowe, Aplikacje Mobilne, Automatyzacja, Integracja API |
| Kontakt | email, location ("Katowice, Polska"), optional phone |

Bottom strip: `© YEAR Kamil Janiec. Wszelkie prawa zastrzeżone.` left-aligned, "Built with Tailwind Nextjs Theme" credit right-aligned.

## Per-Page Design

### `/` — Home (tune-up)

Keep existing structure in `app/Main.tsx`. Add:

1. **Stats row** under hero CTAs: three `StatBadge` (`5+ Lat doświadczenia`, `10+ Zrealizowanych projektów`, `100% Zaangażowania`).
2. **`TechStackBar`** placed at the bottom of the hero right column or as a thin strip between hero and Services.
3. Adjust copy on Services / Featured Work eyebrow to match mockup if needed (no structural change).

No other page-1 changes.

### `/blog` — List

`layouts/ListLayoutWithTags.tsx` rewrite.

- `PageHeader` (eyebrow="WPISY", title="Blog", description from `siteMetadata.description`).
- Two-column layout `lg:grid-cols-[260px_1fr] gap-12`.
  - Left `<aside>`: sticky card with "All posts" link + tag list (count chips). Active tag highlighted with `bg-primary/10 text-primary`.
  - Right: vertical stack of `BlogCard`s.
- `BlogCard` (new component, lives inline or `components/BlogCard.tsx`): `Card interactive`, eyebrow row (date + reading time), H3 title (`group-hover:text-primary`), summary, tag pills row, "Czytaj artykuł →" link.
- Pagination uses existing pliny pagination, restyled with `rounded-kj-lg border-border`.

### `/blog/[slug]` — Post

`layouts/PostLayout.tsx` rewrite. Card-based.

```
<article>
  <Card glow>                  ← Hero card
    eyebrow tags pills
    H1 title
    meta row: published date, lastmod, reading time, author chip
  </Card>

  <div grid lg:grid-cols-[1fr_240px] gap-12>
    <Card as="section">        ← Content card
      <div className="prose ...">{children}</div>
    </Card>
    <aside>
      <Card>                   ← Sticky TOC card (sticky top-24)
        eyebrow "Spis treści"
        TocInline
      </Card>
    </aside>
  </div>

  <Card>                       ← Prev / next card
    flex justify-between
    ← Previous title | Next title →
  </Card>

  <Card>                       ← Comments / discuss (if enabled)
  </Card>
</article>
```

`layouts/PostSimple.tsx`: same hero + content card, no TOC sidebar.

`layouts/PostBanner.tsx`: keep for posts with banner images, restyled to use card shell.

### `/projects` — List

- `PageHeader` (eyebrow="PORTFOLIO", title="Projekty", description from current page).
- Grid `md:grid-cols-2 gap-6`.
- `ProjectCard` (extract from `app/Main.tsx`): status pill top-right (`W trakcie` / `Planowane` / `Gotowe` — derived from `data/projectsData.ts`; add optional `status` field if missing), thumbnail placeholder (use `imgSrc` when present, else gradient), tags row, title, description, dual CTA (Launch / Source).

`data/projectsData.ts` shape may need an optional `status?: "in-progress" | "planned" | "shipped"` field — additive change, defaults to `"shipped"`.

### `/about` — Static page

- `PageHeader` (eyebrow="O MNIE", title="Cześć, jestem Kamil", description = elevator pitch).
- Section 1: **Bio + photo card** — 2-col grid; left: portrait (existing `siteMetadata.image`), right: long-form bio + StatBadges row.
- Section 2: **Doświadczenie** — vertical timeline; each entry a `Card` with eyebrow (date range), company + role, bullets. Driven by `data/experienceData.ts`.
- Section 3: **Edukacja + Umiejętności** — 2-col grid of two cards:
  - Edukacja list from `data/educationData.ts`.
  - Skills grouped by category with proficiency bars using `bg-primary` filled width.

### `/faq` — Static page

- `PageHeader` (eyebrow="FAQ", title="Najczęściej zadawane pytania", description).
- Optional category filter chips (if `faqData.ts` has categories).
- Stack of `Card`s; each card is an accordion:
  - Closed state: question text + chevron, hover muted bg.
  - Open state: chevron rotates, body fades in.
- Implementation: lightweight `<details>` / `<summary>` (no extra deps), styled to match.

### `/tags` — Tag index

- `PageHeader` (eyebrow="TAGI", title="Wszystkie tagi", description="Przeglądaj wpisy po tematach").
- Grid `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3` of tag chip cards. Each: tag name + post count, hover lifts.
- Sorted by count desc.

### `/tags/[tag]` — Filtered list

Reuses `/blog` list layout. `PageHeader` shows active tag as eyebrow + dynamic title (`Wpisy z tagu: <tag>`). Sidebar tag rail shows all tags with active highlighted.

### `/learning` — Existing courses page

Apply `PageHeader` + card grid for courses from `data/coursesData.ts`. Same patterns as `/projects`.

## Data Flow

- All content sources unchanged: `data/*.ts` + `data/blog/*.mdx` + `data/authors/*.mdx`.
- Contentlayer pipeline unchanged. No frontmatter changes.
- Computed fields (`slug`, `readingTime`, `toc`, `structuredData`) reused as-is.
- Search index (`public/search.json`) and tag counts (`app/tag-data.json`) regenerated as part of build — unaffected.

## SEO / Metadata

- Each route keeps its `generateMetadata()` / `genPageMetadata()` exports.
- JSON-LD scripts on `/` (Person, WebSite) unchanged.
- `app/sitemap.ts` and `app/robots.ts` untouched.
- Per-post `BlogPosting` schema unchanged.

## Error Handling

- Pages remain server components where they already are.
- `not-found.tsx` restyled to match (PageHeader + CTA back to home).
- No new runtime error paths introduced — purely presentational refactor.

## Testing / Verification

For each redesigned page:

1. `npm run lint` → 0 warnings.
2. `npm run dev` → manual smoke.
3. Playwright MCP visit → screenshot in both light and dark mode, verify no console errors, verify primary CTAs render and link correctly.
4. `npm run build` at the end of each build sequence step.

Done criteria for the rollout:

- All routes listed above render with the kj design language.
- Lighthouse score on `/` does not regress vs current main (perf, a11y, best-practices, SEO).
- No new dependencies added (everything from existing tokens + Tailwind v4).

## Build Sequence

Implementation plan will expand each step. High-level order:

1. **Foundations** — theme default to dark, add shared components (`PageHeader`, `Card`, `StatBadge`, `TechStackBar`, `Pill`).
2. **Layout chrome** — `Header` sticky glass, `Footer` 4-col, ensure they wrap every route.
3. **Home tune-up** — stats row + TechStackBar on `/`.
4. **List pages** — `/blog`, `/projects`, `/tags`, `/learning`.
5. **Detail pages** — `PostLayout`, `PostSimple`, `PostBanner`, `/blog/[slug]`, `/tags/[tag]`.
6. **Static pages** — `/about`, `/faq`, `not-found.tsx`.
7. **Polish** — Playwright sweep per page in light + dark, lint, full build, Lighthouse check on `/`.

## Open Questions

None at design time. Decisions captured:

- Dark default + toggle (light kept).
- Card-based `PostLayout` (vs minimalistic long-form / magazine).
- Sticky glass nav + 4-col footer.
- Full structural redesign of subpages, not just visual restyle.
- Home gets tune-up (stats + tech stack) — no full rewrite.
