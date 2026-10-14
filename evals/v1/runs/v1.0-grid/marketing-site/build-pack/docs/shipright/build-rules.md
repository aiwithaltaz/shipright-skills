# Build rules: SocialGhost beta site

**Version:** 1.0 (ShipRight 1.0.0). **Status:** Proposed (delegated). Read this file, `DESIGN.md`, the screen in `docs/shipright/04-frontend-spec.md` and your ticket before any change. Paths are relative to the app root.

## Current phase

**Phase:** release 1, one-page beta application site. **Allowed:** S1 Home, S2 Apply form, `/design` preview (dev only). **Excluded, notes only:** everything under "Not in this release" in `docs/shipright/01-prd.md`.

Every visible element needs a source in the frontend spec. No extra sections, badges, counters, filters, nav items, disabled placeholders or hidden routes.

## Facts

Only these product facts exist: SocialGhost is a live AI tool that makes faceless YouTube videos; limited beta; testers get free access for useful feedback within 2 to 3 days. Never invent features, numbers, quotes, logos, customers, press, prices, spots, deadlines or legal text. Unknown stays out of the page. Do not write privacy or terms text. Use the reference copy word for word, and ask before changing a claim.

## Design

Use `design/tokens.css` names only. No raw hex, px colors or font names in components. One font family. One accent. Flat color: no gradients, glow, glass or blur. One filled button per area. No em dashes in copy.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction and accessibility

- Native elements. Visible labels, never placeholders as labels. Right input types and `autocomplete`. Paste works.
- Logical tab order, visible focus, skip link. Nothing sticky.
- Field errors are text tied to the field with `aria-describedby`. Keep valid input. Block double submit. Say why a button is disabled.
- Status uses `role="status"` and never moves focus, except focus goes to the first invalid field on a failed submit and to the result block on success.
- Text contrast 4.5:1, large text and UI borders 3:1. Targets 44 by 44 preferred, 24 minimum.
- Works at 320px wide and 200% text. No sideways scroll at 390px.
- Motion: CSS `transform` and `opacity` only, never `transition: all`. Content is visible at load. `prefers-reduced-motion: reduce` removes the animation and shows the end state.
- Never put the applicant's email in a URL, log or analytics event. No analytics.

## Process

One ticket per change. Do not install paid services, create accounts, deploy or publish. Report changed files, decisions made and what you did not verify. A screenshot does not prove the form works.
