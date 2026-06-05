---
name: content-checks
description: Validate MDX blog post frontmatter, verify Contentlayer generation, check internal links, and ensure content metadata completeness. Use to ensure blog posts are properly formatted and ready for publication.
---

# Content Validation Skill

## Purpose

Ensure blog posts and MDX content are properly formatted and ready for publication.

## Content Validation Checks

### 1. Frontmatter Validation

**Required fields for blog posts:**

```yaml
---
title: string (50-60 chars ideal)
date: ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)
tags: array of strings (lowercase, hyphenated)
draft: boolean
summary: string (150-160 chars)
---
```

**Optional fields:**

```yaml
lastmod: ISO 8601 format
authors: array of author slugs
images: array of image paths
layout: PostSimple | PostLayout | PostBanner
canonicalUrl: string
bibliography: path to .bib file
```

**Validation commands:**

```bash
# Check for blog posts missing required fields
grep -r "^---" data/blog/*.mdx | head

# Validate date format
grep -r "^date:" data/blog/*.mdx
```

### 2. Date Format Validation

**Correct format:** ISO 8601

```yaml
date: '2024-01-07T15:32:14Z'
lastmod: '2024-01-07'
```

**Common mistakes:**

```yaml
# ❌ Wrong: Missing quotes
date: 2024-01-07

# ❌ Wrong: Incorrect format
date: 01/07/2024

# ✓ Correct: ISO 8601 with quotes
date: '2024-01-07T15:32:14Z'
```

**Check script:**

```bash
# Look for dates without proper format
grep "^date:" data/blog/*.mdx | grep -v "T.*Z"
```

### 3. Tag Format Validation

**Correct format:**

- Lowercase
- Hyphen-separated
- Array format

```yaml
# ✓ Correct
tags: ['next-js', 'typescript', 'web-development']

# ❌ Wrong: Uppercase
tags: ['Next.js', 'TypeScript']

# ❌ Wrong: Spaces
tags: ['next js', 'type script']
```

**Validation:**

```bash
# Check tag format
grep "^tags:" data/blog/*.mdx
```

### 4. Contentlayer Generation Check

**Verify Contentlayer processes content:**

```bash
# Run dev server to trigger Contentlayer
npm run dev

# Check for generated files
ls -la .contentlayer/generated/Blog/
ls -la .contentlayer/generated/Authors/
```

**Expected output:**

- `.contentlayer/generated/Blog/*.json` - One file per blog post
- `.contentlayer/generated/index.mjs` - Generated types
- `app/tag-data.json` - Tag frequency counts
- `public/search.json` - Search index

**Common Contentlayer errors:**

```
Error: Missing required field "title"
Error: Invalid date format in frontmatter
Error: Syntax error in MDX content
```

### 5. Internal Link Validation

**Check for broken internal links:**

```bash
# Find all internal links in blog posts
grep -r "\[.*\](/" data/blog/*.mdx

# Common link patterns
/blog/[slug]
/tags/[tag]
/about
/projects
```

**Validation:**

- Ensure linked blog posts exist
- Verify tag pages exist
- Check relative paths are correct

### 6. Image Path Validation

**Check image references:**

```bash
# Find image references
grep -r "!\[.*\](" data/blog/*.mdx
grep -r "<Image" data/blog/*.mdx
```

**Expected image locations:**

- `/public/static/images/` - Static images
- Remote URLs properly configured in next.config.js

**Validation:**

- Image files exist at specified paths
- Alt text present for all images
- Image paths in frontmatter images array

### 7. Author References

**Check author references:**

```bash
# Find author references
grep "^authors:" data/blog/*.mdx
```

**Validation:**

- Author slug exists in `data/authors/`
- Author MDX file has required fields
- Author slug matches filename

**Author file format:**

```yaml
---
name: string
avatar: path to image
occupation: string
company: string
email: string
twitter: url (optional)
linkedin: url (optional)
github: url (optional)
---
```

### 8. Summary Length Check

**Optimal summary length:** 150-160 characters for SEO

**Check script:**

```bash
# Extract summaries
grep "^summary:" data/blog/*.mdx
```

**Validation:**

- Summary present
- Length between 120-160 characters
- Compelling and descriptive
- No special characters that break meta tags

### 9. Draft Status Check

**Find all draft posts:**

```bash
grep "^draft: true" data/blog/*.mdx
```

**Validation:**

- Draft posts excluded from production build
- Draft status intentional
- Ready to publish posts have draft: false

### 10. Code Block Syntax

**Check code blocks have language specified:**

````bash
# Find code blocks without language
grep -r "^```$" data/blog/*.mdx
````

**Correct format:**

````markdown
```typescript
// Code here
```
````

**Common languages:**

- typescript / javascript / jsx / tsx
- bash / shell
- json / yaml
- python / go / rust

## Validation Checklist

Run these checks for new or updated blog posts:

1. **Frontmatter complete**
   - ✓ All required fields present
   - ✓ Date in ISO 8601 format
   - ✓ Tags lowercase and hyphenated
   - ✓ Summary 150-160 chars
   - ✓ Draft status correct

2. **Content quality**
   - ✓ Code blocks have language
   - ✓ Images have alt text
   - ✓ Internal links valid
   - ✓ No broken external links

3. **Contentlayer processing**
   - ✓ No generation errors
   - ✓ Post appears in .contentlayer/generated/
   - ✓ Search index updated

4. **SEO ready**
   - ✓ Title 50-60 chars
   - ✓ Summary compelling
   - ✓ Tags relevant
   - ✓ Images optimized

## Common Issues and Solutions

### Issue: Contentlayer build fails

**Error:** `Missing required field "title"`
**Solution:** Add title to frontmatter

### Issue: Date format error

**Error:** `Invalid date format`
**Solution:** Use ISO 8601: `'2024-01-07T15:32:14Z'`

### Issue: Tags with spaces

**Error:** Tag pages not generating correctly
**Solution:** Use hyphens: `next-js` not `next js`

### Issue: Broken internal links

**Error:** 404 on link click
**Solution:** Verify blog post slug, check path format

### Issue: Missing image

**Error:** Image not loading
**Solution:** Check image exists in /public/static/images/

### Issue: Author not found

**Error:** Author data missing
**Solution:** Create author file in data/authors/[slug].mdx

## Instructions for Agents

When using this skill:

1. **Check frontmatter first**
   - Read the blog post file
   - Verify all required fields present
   - Check date and tag formats

2. **Validate content structure**
   - Code blocks have languages
   - Images have alt text
   - Links are valid

3. **Test Contentlayer generation**
   - Run `npm run dev`
   - Check for errors in console
   - Verify generated files exist

4. **Report findings**
   - List missing fields
   - Note format issues
   - Propose corrections

## Expected Output

```markdown
## Content Validation Results

### ✓ Frontmatter Check

- Title: "Building a Modern Blog with Next.js" (46 chars)
- Date: 2024-01-07T15:32:14Z (valid ISO 8601)
- Tags: ['next-js', 'typescript', 'web-dev'] (valid format)
- Summary: "Learn how to build a modern blog..." (158 chars)
- Draft: false

### ✓ Content Structure

- 3 code blocks with language specified
- 5 images with alt text
- 8 internal links (all valid)
- 2 external links (verified)

### ✓ Contentlayer Generation

- No errors
- Generated: .contentlayer/generated/Blog/\_index.mdx.json
- Search index updated

### ⚠ Issues Found

None - content ready for publication

### 🎯 Recommendations

- Summary length optimal for SEO
- Consider adding one more relevant tag
- All validation checks passed
```

## Project-Specific Context

### Content Location

- **Blog posts:** `data/blog/*.mdx`
- **Authors:** `data/authors/*.mdx`
- **Images:** `/public/static/images/`
- **Bibliography:** `data/references-data.bib`

### Contentlayer Config

- **File:** `contentlayer.config.ts`
- **Document types:** Blog, Authors
- **Computed fields:** slug, readingTime, toc, structuredData
- **Plugins:** 11 remark/rehype plugins

### Generated Files

- `.contentlayer/generated/Blog/` - Processed blog posts
- `.contentlayer/generated/Authors/` - Processed authors
- `app/tag-data.json` - Tag counts
- `public/search.json` - Search index

### Tag Naming Convention

- Lowercase only
- Hyphen-separated (not spaces or underscores)
- Examples: `next-js`, `typescript`, `web-development`
- Avoid: `Next.js`, `TypeScript`, `web_development`
