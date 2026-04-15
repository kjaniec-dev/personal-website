# Personal Website Redesign Design

Date: 2026-04-15
Project: `personal-website`
Status: Approved in brainstorming, ready for implementation planning

## Goal

Redesign the site so it reads as a deliberate senior-engineer portfolio rather than a polished starter blog. The experience should feel modern, professional, and quietly premium while still serving a balanced audience of hiring managers, potential clients, and technical peers.

## Primary Positioning

- Primary signal: senior individual engineer with strong technical depth
- Secondary signals: thoughtful builder, strong writer, commercially credible executor
- Audience mix: balanced across recruiters/hiring managers, clients, and peers
- Desired impression: current, capable, rigorous, and intentional

## Core Outcome

The homepage should explain who Krzysztof is, what kind of engineering work he does, and why a visitor should keep exploring. Projects, writing, and contact paths should feel curated and purposeful, not evenly weighted by template defaults.

## Non-Goals

- Do not rebuild the content architecture
- Do not replace Next.js, MDX, or Contentlayer
- Do not remove supporting pages such as FAQ, Learning, or Tags
- Do not turn the site into a dark-first showcase or a luxury-brand editorial site

## Information Architecture

### Primary navigation

- `Home`
- `Projects`
- `Writing`
- `About`
- `Contact` as a visually emphasized action rather than a plain peer link

### Secondary navigation / footer destinations

- `FAQ`
- `Learning`
- `Tags`

### URL strategy

- Keep existing route structure where practical
- The `/blog` route can remain technically unchanged while the UI labels it `Writing`

## Experience Strategy

### Homepage job

- Establish senior-engineer positioning immediately
- Prove credibility through selected work and technical writing
- Offer clear next paths for different visitor intents
- End with a confident contact invitation

### Structural shift from the current site

- Move away from a blog-led homepage
- Reduce “starter blog with portfolio sections” cues
- Create a clearer hierarchy around work, thinking, and professional profile

## Homepage Composition

The homepage should use the following section order:

1. `Hero`
2. `Proof Strip`
3. `Featured Projects`
4. `Technical Writing`
5. `About / Working Style`
6. `Contact CTA`

### Hero

- Use a sharp, high-confidence headline focused on senior technical depth
- Support with concise copy about building resilient, thoughtful software systems
- Include one primary CTA toward work or profile
- Include one secondary CTA toward writing
- Prioritize clarity and hierarchy over decorative flourish

### Proof Strip

- Present compact, high-signal evidence
- Include experience level, core strengths, and selected technologies/domains
- Use this section as credibility reinforcement, not as a stats gimmick

### Featured Projects

- Highlight 2-3 strongest projects on the homepage
- Each card should communicate context, role, technical challenge, and outcome
- Cards should feel closer to lightweight case studies than generic portfolio tiles

### Technical Writing

- Frame writing as evidence of thinking and technical judgment
- Curate featured posts rather than relying on a generic “latest posts” presentation
- Keep the section clean and scannable

### About / Working Style

- Introduce how Krzysztof thinks, builds, and collaborates
- Emphasize engineering philosophy and approach, not only biography
- Keep this section concise on the homepage and deeper on the About page

### Contact CTA

- End with a simple, high-confidence invitation for opportunities and collaboration
- Make it easy to act without adding friction or visual clutter

## Page-Level Redesign

### Projects

- Make `Projects` the strongest destination after the homepage
- Improve grouping, card structure, and visual hierarchy
- Reduce the “list of items” feel in favor of more editorial case-study framing

### Writing

- Present the blog as `Writing` throughout the UI
- Reinforce that the content demonstrates technical depth and thinking
- Improve list and card presentation to feel more curated and less template-derived

### About

- Reframe the page as a stronger professional profile
- Cover experience, technical strengths, mindset, and working style
- Make it feel like an intentional profile, not just a biography

### FAQ, Learning, Tags

- Keep them live and accessible
- Lower their prominence in the main conversion path
- Surface them through footer navigation, About, or secondary linking

## Visual System

### Recommended direction

- Light-first
- Sharp and modern
- Quietly premium
- Product/agency base with a small premium edge

### Color system

- Use near-black neutrals and off-white surfaces
- Use cobalt blue as the main accent for actions and emphasis
- Keep color usage disciplined and sparse
- Avoid heavy gradient-led branding or decorative color noise

Suggested palette direction:

- Base text: near-black
- Primary surfaces: off-white / white
- Secondary neutrals: zinc/slate range
- Accent: cobalt blue

### Typography

- Move away from a serif-led hero direction
- Use a clean sans-led system with stronger modern/product cues
- Suitable directions include `Outfit` or `DM Sans` / `Work Sans` territory
- Premium feel should come from scale, weight, rhythm, and spacing rather than ornate type

### Layout language

- Stronger spacing rhythm
- Cleaner geometry
- Fewer translucent/glass-heavy cards
- More deliberate section composition
- More contrast between major content blocks

### Motion

- Reduce decorative reveal choreography
- Keep motion purposeful and restrained
- Favor hover polish, transitions, and section entrances that support comprehension
- Respect `prefers-reduced-motion`

## Interaction and Accessibility

- Ensure visible keyboard focus states
- Avoid hover behaviors that cause layout shift
- Maintain strong light-mode contrast
- Make touch targets and spacing work comfortably on mobile
- Use color as support, not as the only signal
- Preserve responsive clarity across mobile, tablet, laptop, and large desktop breakpoints

## Technical Approach

- Keep the current Next.js App Router architecture
- Keep the current MDX / Contentlayer content model
- Focus implementation on presentation, hierarchy, and shared UI patterns
- Rework the homepage composition, header/navigation, page templates, and project/blog presentation layers

## Likely Implementation Areas

- `components/Header.tsx`
- `components/Hero.tsx`
- `app/Main.tsx`
- Shared card, section, and link styling patterns
- `app/projects/page.tsx`
- `app/blog/page.tsx` and related list views
- `app/about/page.tsx`
- Global styling and typography setup in layout/global CSS

## Acceptance Criteria

- The homepage clearly reads as a senior-engineer portfolio first
- Primary navigation is simplified to the approved top-level structure
- `Projects`, `Writing`, and `About` feel more curated and intentional
- The visual system feels modern, professional, and premium without being flashy
- The redesign improves clarity on mobile and desktop
- Supporting pages remain accessible without diluting the primary path

## Verification Expectations

- Run `npm run lint`
- Run `npm run test`
- Run `npm run build`
- Review the key pages at mobile, tablet, laptop, and desktop widths
- Validate reduced-motion behavior and keyboard navigation

## Open Implementation Notes

- The redesign can be executed without changing URLs or content storage
- Copy can be rewritten more assertively during implementation if needed
- The homepage will need stronger editorial judgment in content selection, especially for projects and writing
