# Theme Switch Dropdown & FAQ Accordion Border Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `ThemeSwitch.tsx` to use `@kjaniec-dev/ui`'s `DropdownMenu` and eliminate outer container double border in `FAQAccordion.tsx`.

**Architecture:** Replace `Segmented` in `ThemeSwitch` with `DropdownMenu` primitives (`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `Button`), and apply `border-none bg-transparent` to `Accordion` root container in `FAQAccordion`.

**Tech Stack:** Next.js 16, React 19, `@kjaniec-dev/ui` (v0.9.0), Vitest, Biome.

---

### Task 1: Refactor `ThemeSwitch.tsx` to use `@kjaniec-dev/ui` `DropdownMenu`

**Files:**
- Modify: `__tests__/theme-switch.test.tsx`
- Modify: `components/ThemeSwitch.tsx`

- [ ] **Step 1: Update unit tests for ThemeSwitch Dropdown**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ThemeSwitch from "@/components/ThemeSwitch";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    setTheme: vi.fn(),
    resolvedTheme: "dark",
  }),
}));

describe("ThemeSwitch Component", () => {
  it("renders ThemeSwitch toggle trigger button", () => {
    render(<ThemeSwitch />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify initial failure/pass**

Run: `npx vitest run __tests__/theme-switch.test.tsx`

- [ ] **Step 3: Refactor `components/ThemeSwitch.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ClientUI";

const SunIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>Light theme</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>Dark theme</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SystemIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>System theme</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-3.5 w-3.5 text-primary ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>Selected</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  const currentTheme = theme || "system";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className="rounded-full hover:bg-subtle text-foreground"
        >
          {currentTheme === "light" ? (
            <SunIcon />
          ) : currentTheme === "dark" ? (
            <MoonIcon />
          ) : (
            <SystemIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <SunIcon />
          <span>Light</span>
          {currentTheme === "light" && <CheckIcon />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <MoonIcon />
          <span>Dark</span>
          {currentTheme === "dark" && <CheckIcon />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <SystemIcon />
          <span>System</span>
          {currentTheme === "system" && <CheckIcon />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run __tests__/theme-switch.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add components/ThemeSwitch.tsx __tests__/theme-switch.test.tsx
git commit -m "refactor: migrate ThemeSwitch to @kjaniec-dev/ui DropdownMenu"
```

---

### Task 2: Eliminate Double Border in `FAQAccordion.tsx`

**Files:**
- Modify: `components/FAQAccordion.tsx`

- [ ] **Step 1: Update `components/FAQAccordion.tsx`**

```tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ClientUI";
import type { FAQItem } from "@/data/faqData";

interface FAQAccordionProps {
  items: FAQItem[];
  category: FAQItem["category"];
}

export default function FAQAccordion({ items, category }: FAQAccordionProps) {
  const filtered = items.filter((i) => i.category === category);

  if (filtered.length === 0) return null;

  return (
    <Accordion type="single" className="border-none bg-transparent rounded-none space-y-3">
      {filtered.map((item, index) => {
        const uniqueVal = `${category}-${index}`;
        return (
          <AccordionItem
            key={item.question}
            value={uniqueVal}
            className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all"
          >
            <AccordionTrigger className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-sans text-base font-semibold text-foreground sm:text-lg hover:bg-subtle/50">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
```

- [ ] **Step 2: Run Vitest FAQ test**

Run: `npx vitest run __tests__/faq-accordion.test.tsx`
Expected: PASS

- [ ] **Step 3: Commit changes**

```bash
git add components/FAQAccordion.tsx
git commit -m "fix: remove outer accordion container border to fix FAQ double border"
```

---

### Task 3: Final Quality Verification & Build

- [ ] **Step 1: Run full Vitest suite**

Run: `npx vitest run`
Expected: ALL PASS

- [ ] **Step 2: Run Next.js production build**

Run: `npm run build`
Expected: Successful compilation
