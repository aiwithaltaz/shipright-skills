# Build rules

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** PRD D1-D7. Read this file, `DESIGN.md`, the ticket and its spec section before every change.

## Current phase

**Phase:** Release 1, one home page for the Model 01 speaker (working name).
**Allowed screens:** S0 `/design`, S1 `/`, S2 404. See `docs/shipright/04-frontend-spec.md`.
**Excluded:** cart, checkout on this site, accounts, reviews, newsletter, chat, color picker, analytics, cookie banner. Do not add routes, data or disabled controls for them.

Every visible element needs a source in the spec. Product facts come only from `content/product.ts`; never type a price, spec, quote, rating or logo into a component. Unknown values stay `null`.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Styling

Use only tokens from `design/tokens.css` through Tailwind theme mappings. No raw hex, px spacing or font names in components. Follow the Do's and Don'ts in `DESIGN.md`. No em dashes in copy.

## 3D and motion

- The SVG still always renders first and stays as the fallback. The canvas loads after first paint with `next/dynamic` and `ssr: false`.
- Keep the budgets in `02-technical-architecture.md`. Render on demand; pause off screen and in hidden tabs; dispose on unmount.
- No zoom, no pan, no auto-rotation. `touch-action: pan-y` on the canvas.
- Every animation has a `prefers-reduced-motion` version. Use `gsap.matchMedia()`; Lenis only on `/`.
- Animate `transform` and `opacity` only.

## Interaction and accessibility

- Native links and buttons, real headings, one h1 per page. Visible focus on every interactive element and the canvas.
- Targets at least 44 by 44. Text contrast 4.5:1, large text 3:1, control borders 3:1.
- Status updates use `role="status"` and never move focus.
- Check 320 px reflow and 200% text size. No sideways scroll at 390.

## Safety

- No secrets exist. Never add keys to front-end code.
- Do not install unrequested packages, sign up for services, deploy or publish. The owner deploys.

## Report

After each ticket, reply with changed files, decisions and how you checked, including what you could not verify. Then stop.
