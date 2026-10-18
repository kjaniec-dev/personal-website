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
| AI & Process Automation (new) | "Automate the work your team shouldn't be doing manually" | Pilot on one process, production rollout with monitoring, ROI calculator | dokufakt as a case study (no live demo) |

AI page outline: hero, problems I solve (invoice/document intake, email and ticket triage, RAG assistant over internal knowledge, report/offer generation, legacy integrations, human-in-the-loop agents), how it works (process audit, pilot, production with monitoring, handover), why me vs a no-code shop (code in client repo, tests and model evals, security/GDPR, no vendor lock-in), case study, FAQ, CTA "Book a free 30-min process audit".

## Sprints

- [x] **1. `ServicePage` component** with data in one file, no real copy yet (placeholder data for one service, one unit test for the data/slug lookup)
- [ ] **2. AI & Process Automation page** at `/services/ai-automation`, to test the template. Copy needs owner approval.
- [ ] **3. Home cards link to pages**: `components/Services.tsx` gets a "Learn more" button; `mailto` stays as a smaller secondary button. Check the grid with 5 entries.
- [ ] **4. Full-Stack Development** page
- [ ] **5. System Architecture** page
- [ ] **6. Cloud & DevOps** page
- [ ] **7. Technical Consulting repackaged** into 2-3 fixed offers (Technical Audits & Advisory)
- [ ] **8. Per-page metadata**: own title, description and Schema.org `Service` JSON-LD for each page; add the pages to `app/sitemap.ts` and the search index
- [ ] **9. Internal links**: projects link to services and services link to projects
- [ ] **10. Blog posts linked** to the relevant services

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

### ROI calculator (client-side, zero token cost)

1. Fix 4-5 inputs and the formula (manual cost vs automation cost): documents/month, minutes each, hourly rate, error rate
2. Pure calculation function with unit tests (Vitest)
3. Form with live result
4. Chart of cumulative cost, manual vs automated, with break-even point
5. Assumptions section (no unfounded promises)
6. CTA with `mailto` carrying the entered values in the subject/body
7. Link from the AI page and Featured Work
8. Last, optional: email the result (needs a backend)

### Sitewide AI mentions

- Hero tagline / meta description: add "AI Automation" (`data/siteMetadata.js` currently says "Software engineer crafting elegant solutions...")
- A paragraph in About about automation
- 3 questions in `data/faqData.ts` (data privacy / model providers, cost and ROI, what happens when the model is wrong)
- Optional PL page (`/pl/automatyzacja-ai`) for local SEO

## Open questions for the owner

- Does the Claude Docs plan imply the `/services/...` URL structure, or should it be flat (`/ai-automation`)?
- Which dokufakt numbers can be published?
- Is the legacy-migration pattern approved for an anonymous write-up?
- Booking CTA: plain `mailto` or a calendar link?
