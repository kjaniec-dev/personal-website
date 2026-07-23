# Header, Mobile Navigation & Breadcrumbs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `MobileNav.tsx`, `SearchButton.tsx`, `Header.tsx`, and post layouts to use `@kjaniec-dev/ui` primitives (`Drawer`, `Kbd`, `Button`, `Breadcrumb`).

**Architecture:** Replace custom dialogs/buttons/kbd tags with re-exported `@kjaniec-dev/ui` components from `@/components/ClientUI`.

**Tech Stack:** Next.js 16, React 19, `@kjaniec-dev/ui` (v0.9.0), Vitest, Biome.

---

### Task 1: Refactor `MobileNav.tsx` to use `@kjaniec-dev/ui` `Drawer`

**Files:**
- Modify: `components/MobileNav.tsx`
- Create: `__tests__/mobile-nav.test.tsx`

- [ ] **Step 1: Write test for MobileNav**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MobileNav from "@/components/MobileNav";

describe("MobileNav Component", () => {
  it("renders mobile menu trigger button", () => {
    render(<MobileNav />);
    expect(screen.getByRole("button", { name: /toggle menu/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test `npx vitest run __tests__/mobile-nav.test.tsx`**

- [ ] **Step 3: Update `components/MobileNav.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button, Drawer } from "@/components/ClientUI";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle Menu"
        onClick={() => setOpen(true)}
        className="md:hidden text-foreground hover:bg-subtle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6"
        >
          <title>Menu icon</title>
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </Button>

      <Drawer open={open} onClose={() => setOpen(false)} side="right">
        <div className="flex flex-col space-y-6 pt-6 px-4">
          <nav className="flex flex-col space-y-4">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-xl font-bold tracking-wider text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </Drawer>
    </>
  );
}
```

- [ ] **Step 4: Run test `npx vitest run __tests__/mobile-nav.test.tsx`**

- [ ] **Step 5: Commit changes**

```bash
git add components/MobileNav.tsx __tests__/mobile-nav.test.tsx
git commit -m "refactor: migrate MobileNav to @kjaniec-dev/ui Drawer"
```

---

### Task 2: Refactor `SearchButton.tsx` and `Header.tsx` CTA

**Files:**
- Modify: `components/SearchButton.tsx`
- Modify: `components/Header.tsx`

- [ ] **Step 1: Update `components/SearchButton.tsx` to use `Kbd` & `Button`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Button, Kbd } from "@/components/ClientUI";
import { useSearch } from "./SearchProvider";

export default function SearchButton() {
  const { toggleSearch } = useSearch();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.userAgent.includes("Mac"));
  }, []);

  return (
    <Button
      variant="ghost"
      onClick={toggleSearch}
      aria-label="Search"
      className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-subtle hover:text-foreground md:px-3.5"
    >
      <svg
        className="h-4 w-4 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>Search icon</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span className="hidden sm:inline">Search</span>
      <Kbd className="hidden md:inline-flex text-[10px]">{isMac ? "⌘K" : "Ctrl+K"}</Kbd>
    </Button>
  );
}
```

- [ ] **Step 2: Update `Header.tsx` "Let's talk" CTA button**

Modify `components/Header.tsx` lines 65-72 to use `Button`:
```tsx
{siteMetadata.email ? (
  <Button
    as={Link}
    href={`mailto:${siteMetadata.email}`}
    size="sm"
    className="hidden rounded-full font-sans text-xs font-semibold md:inline-flex"
  >
    Let&apos;s talk
  </Button>
) : null}
```

- [ ] **Step 3: Run Vitest suite**

Run: `npx vitest run`

- [ ] **Step 4: Commit changes**

```bash
git add components/SearchButton.tsx components/Header.tsx
git commit -m "refactor: use @kjaniec-dev/ui Kbd and Button in SearchButton and Header CTA"
```

---

### Task 3: Add `Breadcrumb` to Blog Post Layouts

**Files:**
- Modify: `layouts/PostLayout.tsx`
- Modify: `layouts/PostSimple.tsx`

- [ ] **Step 1: Update `layouts/PostLayout.tsx` and `layouts/PostSimple.tsx`**

Add `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbSeparator` at top of post layouts:
```tsx
<Breadcrumb className="mb-6">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem active>{title}</BreadcrumbItem>
</Breadcrumb>
```

- [ ] **Step 2: Run Vitest suite & Next.js production build**

Run: `npx vitest run && npm run build`

- [ ] **Step 3: Commit changes**

```bash
git add layouts/PostLayout.tsx layouts/PostSimple.tsx
git commit -m "refactor: add @kjaniec-dev/ui Breadcrumb to blog post layouts"
```
