# Portfolio UI conventions

The website uses `@kjaniec-dev/ui` and `@kjaniec-dev/design` (currently 0.9.3).
Import theme tokens from the design package; do not introduce a parallel brand palette.

## Color roles

- Primary: main calls to action, active navigation and filters, page-header accents.
- Secondary (teal): technology badges, editorial topic links, supporting quote borders.
- Neutral: surfaces, separators, body text and ordinary metadata.
- Success, warning, danger and info: semantic statuses; do not replace them with brand teal.

Use the same roles in light and dark themes. A page does not need equal amounts of primary and secondary.

## Shared compositions

- `PortfolioPageHeader`: the editorial header for projects, about, FAQ, tags and blog listings. The kit's `PageHeader` has a fixed layout, so this composition uses its tokens without overriding its internals.
- `ContactCTA` / `ContactLink`: the shared contact panel and semantic email link. The link uses the kit's primary `buttonVariants`; its small client boundary is required because the kit exports them from a client entry point.
- `TechnologyBadge`: the kit's secondary `Badge`, with typography and shape adjusted for portfolio content.
- `TopicLink`: a plain teal editorial link using the canonical tag slug, not a badge or selected-filter control.

Prefer kit variants for colors, interaction and focus states. Local overrides should describe layout, sizing or an intentional composition, not negate the selected variant. For example, a neutral floating action uses `outline`, not a recolored `secondary`.

These conventions describe the installed packages. They do not assume that an unpinned `@kjaniec-dev/ui-mcp` serves documentation for the same version.
