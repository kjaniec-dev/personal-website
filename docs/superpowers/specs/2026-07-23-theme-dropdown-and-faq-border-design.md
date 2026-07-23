# Design Spec: Theme Switch Dropdown & FAQ Accordion Border Refinement

## Objective
Refine the UI design of `ThemeSwitch` and `FAQAccordion` to align with modern UX best practices and remove visual artifacts.

## Scope of Changes

### 1. `components/ThemeSwitch.tsx`
- **Refactor**: Replace the 3-button `Segmented` control with `@kjaniec-dev/ui`'s `DropdownMenu` components (`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`).
- **Behavior**:
  - Render a compact icon button (`<Button size="icon" variant="ghost">`) showing the active theme icon (Sun ☀️ for light, Moon 🌙 for dark, Monitor 🖥️ for system).
  - Open a sleek dropdown menu displaying Light, Dark, and System choices with a checkmark indicating the current active selection.

### 2. `components/FAQAccordion.tsx`
- **Refactor**: Remove default outer `<Accordion>` border container by applying `className="border-none bg-transparent rounded-none space-y-3"`.
- **Behavior**: Eliminates double border around FAQ sections; each `AccordionItem` renders cleanly as an independent floating card (`border border-border rounded-xl bg-surface shadow-sm`).

## Verification & Testing
1. Run Vitest suite (`npx vitest run`).
2. Run Next.js build (`npm run build`).
