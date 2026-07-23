# Design Spec: Dependency Updates

## Objective
Safely update outdated production and development dependencies in `personal-website` using `bun`, while pinning TypeScript to `v6.x` (avoiding breaking changes from TypeScript 7.0 major release).

## Target Dependency Updates

### Production Dependencies
- `@algolia/client-search`: `5.55.1` → `5.56.0`
- `@next/bundle-analyzer`: `16.2.10` → `16.2.11`
- `@tailwindcss/postcss`: `4.3.2` → `4.3.3`
- `algoliasearch`: `5.55.1` → `5.56.0`
- `next`: `16.2.10` → `16.2.11`
- `postcss`: `8.5.16` → `8.5.22`
- `react`: `19.2.7` → `19.2.8`
- `react-dom`: `19.2.7` → `19.2.8`
- `tailwindcss`: `4.3.2` → `4.3.3`
- `web-vitals`: `5.3.0` → `6.0.0`

### Dev Dependencies
- `@biomejs/biome`: `2.5.2` → `2.5.5`
- `@vitejs/plugin-react`: `6.0.1` → `6.0.4`
- `@vitest/ui`: `4.1.4` → `4.1.10`
- `jsdom`: `29.0.2` → `29.1.1`
- `lint-staged`: `17.0.8` → `17.2.0`
- `vitest`: `4.1.4` → `4.1.10`

### Explicitly Excluded
- `typescript`: Keep at `6.0.3` (do NOT update to `7.x`).

## Verification Strategy
1. **Vitest Unit Tests**: `npx vitest run` must pass 100%.
2. **Biome Linter Check**: `npm run lint` / modified files check.
3. **Next.js Production Build**: `npm run build` must compile successfully.
