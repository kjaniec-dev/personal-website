---
name: next-validation
description: Validate Next.js configuration, build output, and runtime behavior. Checks for build errors, TypeScript issues, linting problems, and route generation. Use to ensure the Next.js application builds and runs correctly.
---

# Next.js Validation Skill

## Purpose

Verify that the Next.js application builds successfully and follows best practices.

## Validation Checks

### 1. TypeScript Compilation

Check for type errors:

```bash
npx tsc --noEmit
```

**Expected output:** No errors

**Common issues:**

- Type mismatches
- Missing type definitions
- Incorrect imports
- Any types that should be properly typed

### 2. ESLint Validation

Check code quality and style:

```bash
npm run lint
```

**Expected output:** 0 errors, 0 warnings (--max-warnings=0 enforced)

**Common issues:**

- Unused variables
- Missing dependencies in useEffect
- Incorrect hook usage
- Import order violations

### 3. Production Build

Test full production build:

```bash
npm run build
```

**What this checks:**

- Contentlayer MDX processing
- Next.js compilation
- Static page generation
- Post-build scripts (RSS generation)
- TypeScript types
- Bundle optimization

**Expected output:**

- Build completes successfully
- No errors in console
- All routes generated
- Blog posts processed by Contentlayer

**Build output includes:**

- Route generation summary
- Static pages list
- Bundle sizes
- Warnings (should be minimal)

### 4. Development Server

Start and verify dev server:

```bash
npm run dev
```

**What to check:**

- Server starts on port 3000
- No compilation errors
- No console warnings
- Hot reload works
- Contentlayer processing succeeds

### 5. Route Generation

Verify all routes generate correctly:

**Static routes:**

- / (home)
- /about
- /blog
- /projects
- /faq
- /learning
- /tags

**Dynamic routes:**

- /blog/[...slug] for each blog post
- /tags/[tag] for each tag

**Check build output for route list**

### 6. Contentlayer Processing

Verify MDX content processes correctly:

**Blog posts:**

- All .mdx files in data/blog/ processed
- Frontmatter parsed correctly
- No missing required fields
- Reading time calculated
- TOC generated
- Slugs created

**Authors:**

- All .mdx files in data/authors/ processed
- Author data available

**Generated files:**

- .contentlayer/generated/Blog/
- .contentlayer/generated/Authors/
- app/tag-data.json
- public/search.json

### 7. Bundle Analysis (Optional)

Analyze bundle size:

```bash
npm run analyze
```

**What to check:**

- No unexpectedly large packages
- Tree shaking working
- Code splitting effective
- Client vs server bundles appropriate

## Common Issues and Solutions

### Build Failures

**Issue: Contentlayer processing error**

```
Solution: Check MDX frontmatter format, ensure all required fields present
```

**Issue: TypeScript compilation error**

```
Solution: Run npx tsc --noEmit to see detailed type errors
```

**Issue: ESLint max warnings exceeded**

```
Solution: Run npm run lint:fix to auto-fix, then address remaining issues
```

**Issue: Module not found**

```
Solution: Check imports, verify path aliases in tsconfig.json
```

### Runtime Warnings

**Issue: Hydration mismatch**

```
Solution: Ensure server and client render same content, check useEffect dependencies
```

**Issue: Missing Image alt attribute**

```
Solution: Add alt text to all Next.js Image components
```

**Issue: Invalid href**

```
Solution: Ensure all Link components have valid href props
```

## Validation Checklist

Run these commands in order:

1. **Lint check**

   ```bash
   npm run lint
   ```

   ✓ Should pass with 0 warnings

2. **Type check**

   ```bash
   npx tsc --noEmit
   ```

   ✓ Should pass with 0 errors

3. **Build**

   ```bash
   npm run build
   ```

   ✓ Should complete successfully
   ✓ All routes generated
   ✓ No errors in console

4. **Serve production**
   ```bash
   npm run serve
   ```
   ✓ Server starts on port 3000
   ✓ Pages load correctly
   ✓ No console errors

## Instructions for Agents

When using this skill:

1. **Run lint check first**
   - Quick feedback on code quality
   - Fix any issues before building

2. **Check TypeScript**
   - Catches type errors early
   - Prevents runtime issues

3. **Run full build**
   - Most comprehensive validation
   - Tests entire pipeline

4. **Review build output**
   - Check for warnings
   - Verify route generation
   - Note bundle sizes

5. **Report results**
   - List any errors/warnings
   - Propose fixes for issues
   - Note successful validations

## Expected Output

```markdown
## Next.js Validation Results

### ✓ ESLint Check

- No errors
- No warnings
- All files pass

### ✓ TypeScript Check

- No type errors
- All imports resolved
- Strict mode compliant

### ✓ Production Build

- Build completed in 45s
- 15 blog posts processed
- All routes generated successfully
- Bundle sizes:
  - First Load JS: 285 kB
  - Total: 1.2 MB

### ✓ Route Generation

- Static routes: 8 pages
- Dynamic blog routes: 15 pages
- Tag pages: 12 pages

### ⚠ Warnings

- None

### 🎯 Recommendations

- Build successful, ready for deployment
- Consider monitoring bundle size growth
```

## Project-Specific Context

### Build Configuration

- **Next.js 16** with App Router
- **Contentlayer2** for MDX processing
- **TypeScript** strict mode (with strict null checks)
- **Turbopack** enabled in next.config.js

### Build Scripts

- `npm run dev` - Development server with hot reload
- `npm run build` - Production build + post-build scripts
- `npm run serve` - Serve production build
- `npm run lint` - ESLint with --max-warnings=0
- `npm run analyze` - Bundle size analysis

### Pre-commit Hooks

- **Husky** runs lint-staged
- **lint-staged** formats and lints changed files
- Prevents commits with linting errors

### Key Files

- `next.config.js` - Next.js configuration
- `contentlayer.config.ts` - Content processing
- `tsconfig.json` - TypeScript configuration
- `package.json` - Scripts and dependencies
