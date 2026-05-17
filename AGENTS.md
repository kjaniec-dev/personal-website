# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development:**

```bash
npm run dev          # Start development server
npm run build        # Production build (runs contentlayer + next build + postbuild script)
npm run serve        # Start production server
npm run analyze      # Bundle analysis with ANALYZE=true
```

**Code Quality:**

```bash
npm run lint         # ESLint check (must pass with 0 warnings)
npm run lint:fix     # Auto-fix linting issues
```

**Pre-commit:**

- Husky runs lint-staged automatically on commit
- Formats JS/JSX/TS/TSX/JSON/CSS/MD/MDX with Prettier
- Lints and fixes JS/JSX/TS/TSX with ESLint

## Architecture Overview

This is a Next.js 16 (App Router) personal portfolio website built with TypeScript, Tailwind CSS v4, and Contentlayer2 for MDX content management.

### Key Technologies

- **Next.js 16** with App Router (React Server Components)
- **Contentlayer2** for type-safe MDX content processing
- **Tailwind CSS v4** for styling
- **TypeScript** with strict null checks
- **Pliny** library for common blog utilities
- **KBar** for command palette search
- **next-themes** for dark/light mode

### Directory Structure

```
app/               # Next.js App Router pages & API routes
  ├── blog/        # Blog listing and [slug] routes
  ├── tags/        # Tag pages
  ├── about/       # About page with experience/education/skills
  ├── projects/    # Portfolio projects
  ├── faq/         # FAQ page
  └── learning/    # Completed courses

components/        # Reusable React components
  ├── Hero.tsx     # Hero section with animations
  ├── SearchProvider.tsx  # KBar search setup
  ├── ThemeSwitch.tsx     # Dark/light mode toggle
  └── ...

data/              # Content and data files
  ├── blog/        # MDX blog posts
  ├── authors/     # MDX author profiles
  ├── siteMetadata.js     # Global site config
  ├── projectsData.ts     # Projects array
  ├── experienceData.ts   # Experience timeline
  ├── educationData.ts    # Education timeline
  ├── skillsData.ts       # Skills with proficiency %
  ├── coursesData.ts      # Learning history
  └── faqData.ts          # FAQ content

layouts/           # Layout components for different page types
  ├── PostLayout.tsx      # Full blog post layout
  ├── PostSimple.tsx      # Minimal post layout
  └── ListLayoutWithTags.tsx  # Blog list with tag filtering

scripts/           # Build scripts
  └── postbuild.mjs       # Post-build: RSS generation
```

### TypeScript Path Aliases

```typescript
@/components/*  → components/*
@/data/*        → data/*
@/layouts/*     → layouts/*
@/css/*         → css/*
contentlayer/generated → .contentlayer/generated
pliny/*         → node_modules/pliny/*
```

## Content Management

### Blog Posts

- **Location:** `data/blog/*.mdx`
- **Processing:** Contentlayer processes MDX files into type-safe objects
- **Generated types:** `.contentlayer/generated/Blog`

**Frontmatter structure:**

```yaml
---
title: 'Post Title'
date: '2024-01-07T15:32:14Z'
lastmod: '2024-01-07'
tags: ['tag1', 'tag2']
draft: false
summary: 'Post summary'
layout: 'PostSimple' | 'PostLayout' | 'PostBanner'
authors: ['author-slug']  # References data/authors/*.mdx
images: ['/image.jpg']
---
```

### Data-Driven Sections

Edit TypeScript data files to update content:

- **Projects:** `data/projectsData.ts`
- **Experience:** `data/experienceData.ts`
- **Education:** `data/educationData.ts`
- **Skills:** `data/skillsData.ts`
- **Courses:** `data/coursesData.ts`
- **FAQ:** `data/faqData.ts`

### Site Configuration

- **Global settings:** `data/siteMetadata.js` (title, author, URLs, analytics)
- **Navigation:** `data/headerNavLinks.ts`

## Contentlayer Pipeline

**Configuration:** `contentlayer.config.ts`

**Document types:** Blog, Authors

**Processing flow:**

1. MDX files → Contentlayer processes with remark/rehype plugins
2. Generates TypeScript types in `.contentlayer/generated`
3. Post-build hooks create:
   - `app/tag-data.json` - Tag frequency counts
   - `public/search.json` - Search index for KBar

**Computed fields:**

- `slug` - URL slug from filename
- `readingTime` - Estimated reading time
- `toc` - Table of contents hierarchy
- `structuredData` - JSON-LD for SEO

**Plugins:**

- Remark: GFM, Math, GitHub blockquote alerts, image optimization
- Rehype: Slug generation, autolink headings, KaTeX math, Prism syntax highlighting

## Search System

- **Provider:** KBar (command palette)
- **Index:** Generated at build time in `public/search.json`
- **Includes:** Blog posts + projects
- **Trigger:** SearchButton component or keyboard shortcut
- **Implementation:** `components/SearchProvider.tsx`

## Theme System

- **Provider:** `next-themes` wrapped in `app/theme-providers.tsx`
- **Modes:** light, dark, system
- **Persistence:** localStorage
- **Toggle:** `components/ThemeSwitch.tsx`
- **Styling:** Tailwind `dark:` utility classes

## Component Patterns

### Hero Section

- `components/Hero.tsx` with animations
- `components/HeroAnimationWrapper.tsx` prevents animation remount on mobile
- Recent fix (commit `caa5fa3`): Resolved double-play animation issue

### Navigation

- Flow: `data/headerNavLinks.ts` → `components/Header.tsx` → `components/NavLink.tsx`
- Mobile nav: `components/MobileNav.tsx`
- Active state detection built-in

### MDX Components

- Custom components defined in `components/MDXComponents.tsx`
- Includes: Image, Link, Tables, Code blocks, TOC
- Rendered via `pliny/mdx-components` MDXLayoutRenderer

## Build Process

```bash
npm run build
```

1. Contentlayer processes MDX → generates types
2. Next.js builds app (static generation for blog posts)
3. Post-build script (`scripts/postbuild.mjs`) generates RSS feed
4. Tag counts and search index generated via contentlayer hooks

## Performance Optimizations

- **Images:** Next.js Image component with AVIF/WebP formats
- **Code splitting:** `optimizePackageImports` for large libraries
- **Static generation:** `generateStaticParams()` for blog routes
- **GPU-accelerated animations:** CSS `willChange` property
- **Security headers:** CSP, HSTS, X-Frame-Options (see `next.config.js`)
- **Caching:** Static assets cached for 1 year

## SEO & Metadata

- **Root metadata:** `app/layout.tsx`
- **Page metadata:** Each route uses `generateMetadata()` or `genPageMetadata()` helper
- **Structured data:** JSON-LD schemas (Person, WebSite, BlogPosting, BreadcrumbList)
- **Sitemaps:** Auto-generated via `app/sitemap.ts`
- **Robots.txt:** `app/robots.ts`
- **RSS:** Generated in post-build step

## Common Tasks

### Add a new blog post

1. Create `data/blog/my-post.mdx` with frontmatter
2. Run `npm run dev` to see draft
3. Set `draft: false` when ready to publish
4. Build regenerates search index and tag counts

### Update navigation

Edit `data/headerNavLinks.ts` array

### Add a project

Add entry to `data/projectsData.ts` array

### Modify site metadata

Edit `data/siteMetadata.js`

### Add a new page

1. Create `app/my-page/page.tsx`
2. Use `genPageMetadata()` for SEO
3. Wrap content in `<SectionContainer>` for consistent layout

## Recent Fixes

- **Hero animation double-play (commit `caa5fa3`):** Fixed mobile remount issue with HeroAnimationWrapper
- **Hero redesign (commit `d8e119e`):** Modern glassmorphic design, improved theme switch and search button

## Analytics

- **Provider:** Umami Analytics
- **Config:** `data/siteMetadata.js` (analytics.umamiAnalytics)
- **Wrapper:** `components/AnalyticsWrapper.tsx` (dynamic import)
- **Web Vitals:** Tracked via `components/WebVitals.tsx`
