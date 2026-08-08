# Update README.md and CLAUDE.md Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `README.md` and `CLAUDE.md` to accurately reflect the removal of Umami analytics, add missing build commands, and complete the directory structure.

**Architecture:** Update documentation files to match current codebase implementation and structure.

**Tech Stack:** Markdown, Next.js 16, Tailwind CSS v4

---

### Task 1: Update README.md and CLAUDE.md

**Files:**
- Modify: `README.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Edit README.md**

Update `README.md`:
- Add `npm run build:cloudflare` under Development Commands.
- Add `css/` and `faq/` to Directory Structure.
- Replace `## Analytics` with `## Performance & Monitoring` focused on Web Vitals.

- [ ] **Step 2: Edit CLAUDE.md**

Update `CLAUDE.md`:
- Remove references to Umami Analytics.

- [ ] **Step 3: Run linter and formatting check**

Run: `npm run lint`
Expected: 0 errors.
