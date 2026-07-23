# Design Spec: UI Kit Refactoring (@kjaniec-dev/ui)

## Objective
Simplify custom UI components in `personal-website` by migrating them to native primitives from the `@kjaniec-dev/ui` design kit (v0.9.0). This reduces boilerplate, ensures theme token consistency, and removes redundant styling logic.

## Scope of Changes

### 1. `components/Pill.tsx` and `components/Tag.tsx`
- **Target Files**: `components/Pill.tsx`, `components/Tag.tsx`
- **Refactor**: Re-implement `Pill` and `Tag` on top of `@kjaniec-dev/ui`'s `Badge` component.
- **Mapping**:
  - `Pill` tone `primary` / `secondary` / `success` / `muted` → `Badge` `variant="primary"` / `"secondary"` / `"success"` / `"neutral"`.
  - `Tag` → `Badge` `variant="neutral"`.

### 2. `components/ProjectCard.tsx`
- **Target File**: `components/ProjectCard.tsx`
- **Refactor**: Replace local custom card styling with `@kjaniec-dev/ui` `Card` and `Badge` components.
- **Details**: Use `Card` with `interactive` mode and `@kjaniec-dev/ui` `Badge` for status and technology tags.

### 3. `components/ThemeSwitch.tsx`
- **Target File**: `components/ThemeSwitch.tsx`
- **Refactor**: Replace custom button toggle markup with `@kjaniec-dev/ui`'s `Segmented` control component.
- **Options**: `light` (sun icon), `dark` (moon icon), `system` (monitor icon).

### 4. `components/FAQAccordion.tsx`
- **Target File**: `components/FAQAccordion.tsx`
- **Refactor**: Streamline accordion item wrapping by adopting `@kjaniec-dev/ui` `Accordion`, `AccordionItem`, `AccordionTrigger`, and `AccordionContent` default styling.

## Verification & Testing
1. Run static analysis/linting (`npm run lint` / `biome check .`).
2. Run test suite (`npm test` / `vitest run`).
3. Run project build (`bun run build`) to confirm full compilation with no TypeScript or layout regressions.
