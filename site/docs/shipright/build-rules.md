# Build rules

**Status: Approved Depth, 14 October 2026.**
**Project path:** `docs/shipright/build-rules.md`

Read this file, DESIGN.md, and the home screen in `04-frontend-spec.md` before a change. Tokens live in `design/tokens.css`. Install commands live in `src/data/install.js`.

## Current phase

**Phase:** The public home page, in Depth.
**Allowed:** The home page, the missing-page recovery, the named gallery images, empty IVC labels, and the 1.1 install lines.
**Excluded:** Air, Grid, Split, Night, Press, deploy, accounts, pricing, a blog, and search.

Every visible block needs a source in the PRD. Do not invent facts.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction

- Native buttons, links, headings, tabs, and the compare range. Visible focus.
- One filled control on the first screen. Copy, tabs, and view buttons are text buttons.
- Copy success and failure stay next to the command and do not move focus.
- Respect reduced motion. Do not start text at opacity 0.
- Three.js, GSAP, and Lenis only as DESIGN.md describes. Leave Lenis `respectReducedMotion` on.
- Do not add analytics, a form backend, or a paid font.
