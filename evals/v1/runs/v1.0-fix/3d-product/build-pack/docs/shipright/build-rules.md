# Build rules

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** `docs/shipright/01-prd.md` decisions D1 to D7, all Proposed (delegated) by the owner.

Read this file, `DESIGN.md`, the relevant section of `docs/shipright/04-frontend-spec.md` and your ticket before any change.
`docs/shipright/reference/home-preview.html` shows the intended look and viewer behavior. Match it; do not copy its inline vendor paths.

## Current phase

**Phase:** Release 1, one-page product site: S1 Home (`/`) and S2 Not found (`/404`).
**Excluded:** cart, checkout, payments, accounts, reviews, ratings, configurator, FAQ, newsletter, blog, analytics, cookie banner, scroll animation, smooth scroll, extra languages.

- Every visible element needs a source in the spec. No extra links, badges, counters or sections.
- No disabled placeholders, hidden routes or data fields for later ideas.
- Product facts come only from `src/content/product.ts`. Never write a spec value, price, rating, quote or claim that is not there. Unknown values stay `null` and render "To confirm".
- Use tokens from `design/tokens.css` only. No raw hex, px spacing or font values in components.
- One filled button per view. Every Buy goes to `storeUrl`.
- Stack: Astro, TypeScript, plain CSS, plain three.js. Ask before adding any dependency, service or account.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction and accessibility

- Native links, buttons, headings and table markup. Visible labels. Skip link to main.
- Logical keyboard order and a visible 2px accent focus ring everywhere.
- Status updates use `role="status"` and never move focus.
- Text contrast 4.5:1 or more; button borders 3:1 or more.
- Targets 44 by 44 or larger. No sideways scroll at 320 to 1440 wide.
- Every animation has a reduced-motion version (see DESIGN.md Motion).

## 3D rules

Follow "3D viewer module" and "Performance budgets" in `docs/shipright/02-technical-architecture.md` and the viewer states in the S1 spec.
The front still renders first and stays whenever 3D cannot run. Reserve the stage size so nothing shifts.

## Verification and limits

Check each ticket's done-when list at 390 and 1280 wide, by keyboard, and with reduced motion on.
A screenshot does not prove frame rate, keyboard behavior or the final model. Report what you could not check.
Do not deploy, buy a domain, sign up for services or publish. The owner does that.
