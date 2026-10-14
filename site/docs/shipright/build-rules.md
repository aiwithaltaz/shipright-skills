# Build rules

**Status: Proposed (delegated), 14 October 2026.**
**Project path:** `docs/shipright/build-rules.md`

Read this file, DESIGN.md and the affected screen in `04-frontend-spec.md` before a change. Tokens live in `design/tokens.css`. Install commands live in `src/data/install.js`.

## Current phase

**Phase:** Public site, one marketing page and a design preview.
**Allowed:** copy, spacing, the gallery images already named, install lines, the design preview.
**Excluded:** deploy, accounts, pricing, a blog, dark mode, search, and IVC images until the files exist.

Every visible block needs a source in the PRD. Do not invent facts.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction

- Native buttons, links, labels and headings. Visible focus. No placeholder-only labels.
- One filled button per view. Copy buttons are secondary.
- Copy success and failure stay next to the button and do not move focus.
- Sticky header must not cover a focused control. Sections use scroll margin.
- Respect reduced motion. Do not start text at opacity 0.
- Do not add analytics, a form backend or a paid font.
