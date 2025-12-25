---
name: lighthouse-audit
description: Run Lighthouse performance audits on Next.js pages and generate Core Web Vitals reports. Analyzes page speed, accessibility, best practices, and SEO. Use to identify performance bottlenecks and optimization opportunities.
---

# Lighthouse Audit Skill

## Purpose

Execute Lighthouse audits to measure and improve web performance, accessibility, and SEO.

## How to Use This Skill

### Prerequisites

1. Build the production version of the site:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run serve
   ```

### Running Lighthouse

**Option 1: Using Chrome DevTools**

1. Open Chrome DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Select device: Desktop or Mobile
5. Click "Analyze page load"

**Option 2: Using Lighthouse CLI** (if installed)

```bash
npx lighthouse http://localhost:3000 --view --preset=desktop
npx lighthouse http://localhost:3000 --view --preset=mobile
```

**Option 3: Using PageSpeed Insights API**
For production URLs after deployment.

## What to Analyze

### Core Web Vitals (Performance)

- **Largest Contentful Paint (LCP)**: < 2.5s (good)
- **First Input Delay (FID)** / **Interaction to Next Paint (INP)**: < 100ms (good)
- **Cumulative Layout Shift (CLS)**: < 0.1 (good)

### Performance Metrics

- **First Contentful Paint (FCP)**: Time to first content render
- **Speed Index**: How quickly content is visually populated
- **Time to Interactive (TTI)**: When page becomes fully interactive
- **Total Blocking Time (TBT)**: Time main thread is blocked

### Opportunities

Lighthouse identifies specific improvements:

- Image optimization
- Unused JavaScript
- Render-blocking resources
- Largest contentful paint optimization
- Reduce initial server response time

### Diagnostics

Additional information:

- Avoid enormous network payloads
- Minimize main thread work
- Reduce JavaScript execution time
- Avoid large layout shifts
- Properly size images

## Report Structure

### Performance Score (0-100)

- **90-100**: Good (green)
- **50-89**: Needs improvement (orange)
- **0-49**: Poor (red)

### Categories

1. **Performance**: Speed and optimization
2. **Accessibility**: WCAG compliance
3. **Best Practices**: Security, HTTPS, browser console errors
4. **SEO**: Metadata, mobile-friendly, structured data

## Common Issues and Fixes

### Performance Issues

| Issue               | Solution                                   |
| ------------------- | ------------------------------------------ |
| Large images        | Use Next.js Image component, WebP/AVIF     |
| Unused JavaScript   | Code splitting, tree shaking               |
| Render-blocking CSS | Optimize Tailwind CSS, inline critical CSS |
| Long tasks          | Break up JavaScript execution              |

### Accessibility Issues

| Issue               | Solution                               |
| ------------------- | -------------------------------------- |
| Missing alt text    | Add descriptive alt to all images      |
| Low contrast        | Ensure WCAG AA contrast ratios         |
| Missing ARIA labels | Add aria-label to interactive elements |
| Form labels         | Associate labels with inputs           |

### SEO Issues

| Issue                       | Solution                   |
| --------------------------- | -------------------------- |
| Missing meta description    | Add summary to frontmatter |
| Document doesn't have title | Ensure title in metadata   |
| Links not crawlable         | Use proper anchor tags     |
| Image alt missing           | Add alt text to images     |

## Instructions for Agents

When using this skill:

1. **Build production version first**

   ```bash
   npm run build
   npm run serve
   ```

2. **Run Lighthouse audit**
   - Use Chrome DevTools Lighthouse tab
   - Test both mobile and desktop
   - Focus on Performance and SEO categories

3. **Analyze results**
   - Note overall scores
   - Identify top opportunities
   - Check Core Web Vitals
   - Review diagnostics

4. **Generate report**
   - List current scores
   - Highlight critical issues (< 50 score)
   - List top 3-5 opportunities
   - Estimate impact of fixes

5. **Propose fixes**
   - Specific, actionable recommendations
   - Expected performance improvement
   - Implementation complexity

## Expected Output

```markdown
## Lighthouse Audit Results

### Scores

- Performance: 95/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

### Core Web Vitals

- LCP: 1.2s ✓ (good)
- FID: 8ms ✓ (good)
- CLS: 0.05 ✓ (good)

### Top Opportunities

1. **Reduce unused JavaScript** (-0.3s potential)
   - Remove unused dependencies
   - Optimize bundle with code splitting

2. **Properly size images** (-0.2s potential)
   - Resize hero image to appropriate dimensions
   - Use responsive images

### Recommendations

- All critical issues resolved
- Minor optimization opportunity in JavaScript bundle
- Consider implementing image CDN
```

## Project-Specific Context

### Next.js 16 Optimizations

- Static generation for blog posts
- Automatic image optimization (AVIF/WebP)
- Route-based code splitting
- optimizePackageImports in next.config.js

### Known Optimizations

- Caching headers for /static/ assets
- GPU-accelerated animations
- Fixed hero animation remount issue
- Tailwind CSS v4 optimization

### Pages to Test

- Homepage (/)
- Blog listing (/blog)
- Individual blog post (/blog/[slug])
- About page (/about)
- Projects page (/projects)
