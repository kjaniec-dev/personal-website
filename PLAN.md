# PLAN: service pages on kjaniec.dev

Source: planning doc "Podstrony usług na kjaniec.dev" (Claude Docs). Work in small sprints: one sprint = one session = one branch = one PR. Tick the box when a sprint is merged.

## Goal

Every service gets its own page on a shared template, and **AI & Process Automation** is added as a fifth service. Today services are a static list in `components/Services.tsx` with `mailto` buttons only: a visitor cannot see what they get, and Google has nothing to index.

## Rules

- Site copy is in **English**. Plan and notes are in Polish or English.
- Do not invent facts, numbers or client names. Copy is drafted by the owner or approved before merge. Missing facts go in as `TODO(owner)` and block the sprint.
- No live demos that call paid AI APIs (token abuse). Use static case studies, "replay" of stored results, or client-side tools.
- Client projects (e.g. COBOL migration) never appear by name. Anonymous write-ups only with the owner's approval.
- Follow `CLAUDE.md` conventions: Biome (`bun run lint`), Vitest (`bun run test`), `genPageMetadata()` for page SEO, `<SectionContainer>` for layout.

## Shared template (`ServicePage`)

One component, data in separate files (e.g. `data/servicesData.ts`), so a new service is data entry, not layout work.

1. **Hero**: the outcome for the client, not the technology
2. **Who it's for**: 2-3 situations in which someone comes to me
3. **What you get**: concrete deliverables (diagrams, ADRs, pipelines, repos)
4. **How I work**: 3-4 steps
5. **Proof**: 1-2 projects from Featured Work (`data/projectsData.ts`)
6. **FAQ + CTA**: `mailto` with a per-service subject line

Route: `/services/[slug]` (statically generated via `generateStaticParams()`).

## Service content outline

| Service | Positioning | Deliverables | Proof |
| --- | --- | --- | --- |
| Full-Stack Development | "Product build, from idea to production" | MVP with agreed scope and timeline | Protokolator, Planning Poker |
| System Architecture | "Architecture that survives growth" | Diagrams, ADRs, migration plan | Planning Poker (WebSocket cluster, Redis pub/sub, Kubernetes); anonymous legacy pattern if approved |
| Cloud & DevOps | "Reliable delivery, predictable cloud bills" | Pipelines, IaC, monitoring, cost review | Planning Poker infra, own deployments |
| Technical Audits & Advisory (was: Technical Consulting) | Fixed-scope, fixed-duration offers instead of vague "consulting" | Architecture Review, Code & Security Audit, Performance Audit | Audit as the easiest entry point for a new client |
| AI & Process Automation (new) | "Automate the work your team shouldn't be doing manually" | Pilot on one process, production rollout with monitoring, ROI calculator (separate repo) | dokufakt as a case study (no live demo) |

AI page outline: hero, problems I solve (invoice/document intake, email and ticket triage, RAG assistant over internal knowledge, report/offer generation, legacy integrations, human-in-the-loop agents), how it works (process audit, pilot, production with monitoring, handover), why me vs a no-code shop (code in client repo, tests and model evals, security/GDPR, no vendor lock-in), case study, FAQ, CTA "Book a free 30-min process audit".

## Sprints

- [x] **1. `ServicePage` component** with data in one file, no real copy yet (placeholder data for one service, one unit test for the data/slug lookup)
- [x] **2. AI & Process Automation page** at `/services/ai-automation`, to test the template. Draft copy: review before relying on it.
- [x] **3. Home cards link to pages**: `components/Services.tsx` gets a "Learn more" button; `mailto` stays as a smaller secondary button. Check the grid with 5 entries.
- [x] **4. Full-Stack Development** page
- [x] **5. System Architecture** page
- [x] **6. Cloud & DevOps** page
- [x] **7. Technical Consulting repackaged** into 2-3 fixed offers (Technical Audits & Advisory)
- [x] **8. Per-page metadata**: own title, description and Schema.org `Service` JSON-LD for each page; add the pages to `app/sitemap.ts` and the search index
- [x] **9. Internal links**: projects link to services and services link to projects
- [x] **10. Blog posts linked** to the relevant services (tag-based, both directions; no new post written)

If time is short: do sprints 1-3, then only the AI page. Add the other services one at a time.

## AI-specific work (can run in parallel to sprints 2 and later)

### dokufakt case study (no live demo)

Not in `data/projectsData.ts` yet.

1. Owner collects 2-3 numbers from tests (extraction accuracy, time per invoice, cost per document) - **required before writing**
2. One flow diagram: input -> OCR/LLM -> validation -> KSeF
3. Featured Work card (tags: `gcp` `gemini` `ocr` `ksef` `python` `automation`), no "Launch App" button
4. Case study page: problem, decisions (Google Vision vs Gemini multimodal evaluation, FA(2)/FA(3) schema mapping), numbers
5. Link it as the first proof on `/services/ai-automation`

Optional: "replay" demo that plays back stored pipeline results for 3-4 synthetic invoices, with no model calls.

### ROI calculator (already built, separate repo)

Lives in [kjaniec-dev/roi-calculator](https://github.com/kjaniec-dev/roi-calculator), so it is not part of this plan except for the links:

1. Link it from `/services/ai-automation` ("Estimate your savings") and from the CTA
2. Add a Featured Work card for it in `data/projectsData.ts` (client-side, zero token cost)
3. Decide how it is hosted (own subdomain vs embedded) and whether it passes the entered values into the `mailto` subject/body

### Sitewide AI rollout checklist

Order from the planning conversation; items that overlap with the sprints above are cross-referenced.

1. Tagline `Full-stack · Architecture · DevOps · AI Automation` and meta description in `data/siteMetadata.js` (currently "Software engineer crafting elegant solutions...") - 15 min
2. Fifth card on the home page in `components/Services.tsx` (sprint 3 covers the links; check the grid with 5 entries). Draft copy: "Turning repetitive, manual work into reliable pipelines: document processing, data workflows, internal tools and LLM-powered assistants, integrated with the systems you already run. Production-grade, measurable, and built with data privacy in mind."
3. `/services/ai-automation` skeleton: hero + problems list (sprint 2)
4. "How it works" and "Why me, not a no-code shop" sections (sprint 2)
5. FAQ on the page, plus 3 questions in `data/faqData.ts`: data privacy / model providers, cost and how to recognise ROI, what happens when the model is wrong
6. One Featured Work card for an AI project, tagged `ai` (dokufakt, see above)
7. A paragraph in About about automation
8. CTA "Book a free 30-min process audit" with its own `mailto` subject
9. First blog post, e.g. "Where LLMs actually save time in business processes"; optional anonymous post "Designing a multi-agent pipeline for legacy code migration" (IR schema, dependency graph, equivalence verification) - only with client approval
10. Optional PL page (`/pl/automatyzacja-ai`) for local SEO

Naming: keep **AI & Process Automation**. "AI Automation" blends in with no-code agencies, and "Intelligent Automation" sounds corporate. Alternative: "AI Workflow Automation".

## Open questions for the owner

- Does the Claude Docs plan imply the `/services/...` URL structure, or should it be flat (`/ai-automation`)?
- Which dokufakt numbers can be published?
- Is the legacy-migration pattern approved for an anonymous write-up?
- Booking CTA: plain `mailto` or a calendar link?
