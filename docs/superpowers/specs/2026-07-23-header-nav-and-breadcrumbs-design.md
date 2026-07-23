# Design Spec: Header, Mobile Navigation & Breadcrumb Refactoring (@kjaniec-dev/ui)

## Objective
Migrate remaining navigation, search trigger, and CTA controls in `personal-website` to native primitives from `@kjaniec-dev/ui` (v0.9.0).

## Scope of Changes

### 1. `components/MobileNav.tsx`
- **Refactor**: Replace `@headlessui/react` `Dialog` and `Transition` with `@kjaniec-dev/ui`'s `Drawer` components (`Drawer`).
- **Behavior**: Provides smooth sliding mobile navigation drawer from the right, clean backdrop blur, accessible focus trap, and automatic body scroll management.

### 2. `components/SearchButton.tsx`
- **Refactor**: Replace raw unstyled `<kbd>` tags and custom button styling with `@kjaniec-dev/ui`'s `Kbd` (`<Kbd>⌘K</Kbd>`) and `Button` components.
- **Behavior**: Standardizes keybinding indicator styling across light and dark themes.

### 3. `components/Header.tsx`
- **Refactor**: Replace manual `Link` styling for the "Let's talk" CTA button with `@kjaniec-dev/ui`'s `Button` using `as={Link}` or `variant="primary"`.

### 4. `layouts/PostLayout.tsx` & `layouts/PostSimple.tsx`
- **Refactor**: Add `@kjaniec-dev/ui`'s `Breadcrumb`, `BreadcrumbItem`, and `BreadcrumbSeparator` components to blog post header layouts for structured navigation.

## Verification & Testing
1. Run Vitest suite (`npx vitest run`).
2. Run Biome linting (`npx biome check .`).
3. Run Next.js production build (`npm run build`).
