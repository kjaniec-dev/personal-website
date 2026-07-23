# UI Kit Refactoring (@kjaniec-dev/ui) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify custom UI components (`Pill`, `Tag`, `ProjectCard`, `ThemeSwitch`, `FAQAccordion`) in `personal-website` by migrating them to native `@kjaniec-dev/ui` design kit primitives.

**Architecture:** Replace local custom component implementations with `@kjaniec-dev/ui` exported components (`Badge`, `Card`, `Segmented`, `Accordion`). Maintain backwards-compatible prop interfaces for existing callers.

**Tech Stack:** Next.js 16, React 19, `@kjaniec-dev/ui` (v0.9.0), Vitest, Biome.

---

### Task 1: Refactor `Pill.tsx` and `Tag.tsx` to use `@kjaniec-dev/ui` `Badge`

**Files:**
- Create: `__tests__/pill-tag.test.tsx`
- Modify: `components/Pill.tsx`
- Modify: `components/Tag.tsx`

- [ ] **Step 1: Write unit tests for Pill and Tag**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Pill from "@/components/Pill";
import Tag from "@/components/Tag";

describe("Pill and Tag Components", () => {
  it("renders Pill with correct variant mapping", () => {
    render(<Pill tone="success">Active</Pill>);
    expect(screen.getByText("Active")).toBeDefined();
  });

  it("renders Tag with text", () => {
    render(<Tag text="react" />);
    expect(screen.getByText("react")).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it passes or fails**

Run: `npx vitest run __tests__/pill-tag.test.tsx`
Expected: PASS (or fail if testing-library is missing, adjust accordingly)

- [ ] **Step 3: Update `components/Pill.tsx` and `components/Tag.tsx`**

Modify `components/Pill.tsx`:
```tsx
import type { ReactNode } from "react";
import { Badge } from "@/components/ClientUI";

type PillProps = {
  children: ReactNode;
  tone?: "primary" | "secondary" | "success" | "muted";
  className?: string;
};

const toneToVariantMap: Record<
  NonNullable<PillProps["tone"]>,
  "primary" | "secondary" | "success" | "neutral"
> = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  muted: "neutral",
};

export default function Pill({
  children,
  tone = "primary",
  className = "",
}: PillProps) {
  return (
    <Badge variant={toneToVariantMap[tone]} className={className}>
      {children}
    </Badge>
  );
}
```

Modify `components/Tag.tsx`:
```tsx
import { Badge } from "@/components/ClientUI";

type TagProps = {
  text: string;
};

export default function Tag({ text }: TagProps) {
  return <Badge variant="neutral">#{text}</Badge>;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run __tests__/pill-tag.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add components/Pill.tsx components/Tag.tsx __tests__/pill-tag.test.tsx
git commit -m "refactor: migrate Pill and Tag to @kjaniec-dev/ui Badge"
```

---

### Task 2: Refactor `ProjectCard.tsx` to use `@kjaniec-dev/ui` `Card` and `Badge`

**Files:**
- Create: `__tests__/project-card.test.tsx`
- Modify: `components/ProjectCard.tsx`

- [ ] **Step 1: Write test for ProjectCard**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "@/components/ProjectCard";

describe("ProjectCard Component", () => {
  it("renders ProjectCard with title, description, and status", () => {
    render(
      <ProjectCard
        title="Test Project"
        description="A cool project description"
        status="live-saas"
        tags={["react", "nextjs"]}
      />
    );
    expect(screen.getByText("Test Project")).toBeDefined();
    expect(screen.getByText("A cool project description")).toBeDefined();
    expect(screen.getByText("Live SaaS")).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify initial state**

Run: `npx vitest run __tests__/project-card.test.tsx`
Expected: PASS

- [ ] **Step 3: Refactor `components/ProjectCard.tsx`**

```tsx
import Card from "@/components/Card";
import Image from "@/components/Image";
import Link from "@/components/Link";
import { Badge } from "@/components/ClientUI";
import type { ProjectStatus } from "@/data/projectsData";

interface ProjectCardProps {
  title: string;
  description: string;
  imgSrc?: string;
  href?: string;
  repoHref?: string;
  tags?: string[];
  status?: ProjectStatus;
  priority?: boolean;
}

const statusLabel: Record<ProjectStatus, string> = {
  "open-source": "Open Source",
  "live-saas": "Live SaaS",
  "client-work": "Client Work",
  experiment: "Experiment",
};

const statusVariant: Record<
  ProjectStatus,
  "secondary" | "success" | "primary" | "neutral"
> = {
  "open-source": "secondary",
  "live-saas": "success",
  "client-work": "primary",
  experiment: "neutral",
};

export default function ProjectCard({
  title,
  description,
  imgSrc,
  href,
  repoHref,
  tags = [],
  status = "open-source",
  priority = false,
}: ProjectCardProps) {
  return (
    <Card
      as="article"
      interactive
      padded={false}
      className="flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/9] w-full bg-subtle">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        )}
        <div className="absolute right-3 top-3">
          <Badge variant={statusVariant[status]} dot={status === "live-saas"}>
            {statusLabel[status]}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
        <h3 className="font-sans text-2xl font-bold text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
          {href ? (
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-primary transition-colors hover:text-primary-hover"
            >
              Launch app →
            </Link>
          ) : null}
          {repoHref ? (
            <Link
              href={repoHref}
              className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
            >
              View source →
            </Link>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run __tests__/project-card.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add components/ProjectCard.tsx __tests__/project-card.test.tsx
git commit -m "refactor: simplify ProjectCard using @kjaniec-dev/ui Badge"
```

---

### Task 3: Refactor `ThemeSwitch.tsx` to use `@kjaniec-dev/ui` `Segmented`

**Files:**
- Create: `__tests__/theme-switch.test.tsx`
- Modify: `components/ThemeSwitch.tsx`

- [ ] **Step 1: Write test for ThemeSwitch**

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
  it("renders ThemeSwitch with options", () => {
    render(<ThemeSwitch />);
    expect(screen.getByRole("group")).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify failure/pass**

Run: `npx vitest run __tests__/theme-switch.test.tsx`
Expected: PASS

- [ ] **Step 3: Refactor `components/ThemeSwitch.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Segmented } from "@/components/ClientUI";

const SunIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SystemIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-[120px]" />;
  }

  const currentTheme = theme || "system";

  return (
    <Segmented
      aria-label="Theme selection"
      value={currentTheme}
      onChange={(newTheme) => setTheme(newTheme)}
      options={[
        { value: "light", label: <SunIcon /> },
        { value: "dark", label: <MoonIcon /> },
        { value: "system", label: <SystemIcon /> },
      ]}
    />
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run __tests__/theme-switch.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add components/ThemeSwitch.tsx __tests__/theme-switch.test.tsx
git commit -m "refactor: migrate ThemeSwitch to @kjaniec-dev/ui Segmented control"
```

---

### Task 4: Streamline `FAQAccordion.tsx`

**Files:**
- Create: `__tests__/faq-accordion.test.tsx`
- Modify: `components/FAQAccordion.tsx`

- [ ] **Step 1: Write test for FAQAccordion**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FAQAccordion from "@/components/FAQAccordion";

describe("FAQAccordion Component", () => {
  it("renders FAQ accordion questions", () => {
    const mockItems = [
      { question: "What is this?", answer: "A test FAQ item.", category: "general" as const },
    ];
    render(<FAQAccordion items={mockItems} category="general" />);
    expect(screen.getByText("What is this?")).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run __tests__/faq-accordion.test.tsx`
Expected: PASS

- [ ] **Step 3: Streamline `components/FAQAccordion.tsx`**

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
    <Accordion type="single" className="space-y-3">
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

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run __tests__/faq-accordion.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add components/FAQAccordion.tsx __tests__/faq-accordion.test.tsx
git commit -m "refactor: streamline FAQAccordion with @kjaniec-dev/ui Accordion styling"
```

---

### Task 5: Final Quality Verification & Build

**Files:**
- None (verification phase)

- [ ] **Step 1: Run full Vitest suite**

Run: `npx vitest run`
Expected: ALL PASS

- [ ] **Step 2: Run Biome linter check**

Run: `npm run lint`
Expected: 0 errors

- [ ] **Step 3: Run Next.js production build**

Run: `npm run build`
Expected: Successful build
