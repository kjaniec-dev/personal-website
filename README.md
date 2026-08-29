# Personal Website & Portfolio

A modern, high-performance personal portfolio website built with Next.js 16, featuring a blog, project showcase, and professional experience timeline.

## Tech Stack

- **Next.js 16** with App Router and React 19 Server Components
- **TypeScript** with strict type checking
- **Tailwind CSS v4** with custom design system (`@kjaniec-dev/ui` & `@kjaniec-dev/design`)
- **Contentlayer2** for type-safe MDX content management
- **Biome** for fast linting and code formatting
- **Vitest** for unit testing
- **Pliny** library for blog utilities
- **KBar** for command palette search
- **next-themes** for theme management

## Features

- **Blog System** - MDX-powered blog with syntax highlighting, math support, and table of contents
- **Tag-based Navigation** - Organize and filter posts by tags
- **Full-text Search** - KBar command palette for quick navigation
- **Project Portfolio** - Showcase of professional projects
- **Experience Timeline** - Career history with detailed role descriptions
- **Education & Skills** - Academic background and technical proficiency
- **Dark/Light Mode** - Seamless theme switching with system preference detection
- **SEO Optimized** - Structured data, sitemaps, and metadata for search engines
- **RSS Feed** - Auto-generated feed for blog subscribers
- **Performance Optimized** - Image optimization, code splitting, and caching strategies

## Getting Started

### Prerequisites

- Bun 1.0+ (or Node.js 24+)

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development Commands

**Development:**

```bash
bun run dev                # Start development server
bun run build              # Production build
bun run build:cloudflare   # Cloudflare production export build
bun run serve              # Start production server
bun run analyze            # Bundle analysis
```

**Testing & Code Quality:**

```bash
bun run lint         # Biome linter check
bun run lint:fix     # Auto-fix linting issues with Biome
bun run format       # Format code with Biome
bun run test        # Run unit tests with Vitest
```

## Content Management

### Adding Blog Posts

Create a new MDX file in `data/blog/`:

```mdx
---
title: 'Your Post Title'
date: '2024-01-07T15:32:14Z'
tags: ['nextjs', 'typescript']
draft: false
summary: 'Brief description of your post'
---

Your content here...
```

### Updating Projects

Edit the `data/projectsData.ts` file to add or modify projects.

### Managing Experience

Update career history in `data/experienceData.ts`.

### Site Configuration

Global settings can be modified in `data/siteMetadata.js`.

## Architecture

### Directory Structure

```
app/               # Next.js App Router pages & API routes
components/        # Reusable React components
css/               # Tailwind CSS v4 design tokens and styles
data/              # Content and configuration files
  ├── blog/        # MDX blog posts
  ├── authors/     # Author profiles
  └── *.ts         # Data files for projects, experience, skills, etc.
faq/               # FAQ markdown documents
layouts/           # Page layout components
scripts/           # Build and utility scripts
public/            # Static assets
```

### Key Components

- **Hero Section** - Animated landing section with glassmorphic design
- **SearchProvider** - KBar command palette integration
- **ThemeSwitch** - Dark/light mode toggle
- **MDXComponents** - Custom components for MDX rendering

## Accessibility

This site follows WCAG guidelines:
- Semantic HTML structure
- Descriptive link text
- Keyboard navigation support
- Color contrast compliance
- Screen reader optimization

## Performance

- Static site generation for optimal performance
- Next.js Image optimization with AVIF/WebP formats
- GPU-accelerated animations
- Efficient code splitting
- Security headers (CSP, HSTS, X-Frame-Options)

## SEO

- Auto-generated sitemaps and robots.txt
- JSON-LD structured data
- Open Graph and Twitter Card metadata
- RSS feed generation

## Performance & Monitoring

Web Vitals integration for Core Web Vitals performance measurement and monitoring.

## License

[MIT License](https://github.com/kjaniec-dev/personal-website) © [Krzysztof Janiec](https://kjaniec.dev)

## Credits

Originally based on the [Tailwind Nextjs Starter Blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog) by Timothy Lin, extensively customized and enhanced.
