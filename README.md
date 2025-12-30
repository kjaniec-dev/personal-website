# Personal Website & Portfolio

A modern, high-performance personal portfolio website built with Next.js 16, featuring a blog, project showcase, and professional experience timeline.

## Tech Stack

- **Next.js 16** with App Router and React Server Components
- **TypeScript** with strict null checks
- **Tailwind CSS v4** for styling with dark/light theme support
- **Contentlayer2** for type-safe MDX content management
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
- **Learning Journey** - Completed courses and certifications
- **Dark/Light Mode** - Seamless theme switching with system preference detection
- **SEO Optimized** - Structured data, sitemaps, and metadata for search engines
- **RSS Feed** - Auto-generated feed for blog subscribers
- **Performance Optimized** - Image optimization, code splitting, and caching strategies

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development Commands

**Development:**

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run serve        # Start production server
npm run analyze      # Bundle analysis
```

**Code Quality:**

```bash
npm run lint         # ESLint check (must pass with 0 warnings)
npm run lint:fix     # Auto-fix linting issues
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
data/              # Content and configuration files
  ├── blog/        # MDX blog posts
  ├── authors/     # Author profiles
  └── *.ts         # Data files for projects, experience, skills, etc.
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

## Analytics

Umami Analytics integration for privacy-friendly visitor tracking and Web Vitals monitoring.

## License

[MIT License](https://github.com/kjaniec-dev/personal-site) © [Krzysztof Janiec](https://kjaniec.dev)

## Credits

Originally based on the [Tailwind Nextjs Starter Blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog) by Timothy Lin, extensively customized and enhanced.
