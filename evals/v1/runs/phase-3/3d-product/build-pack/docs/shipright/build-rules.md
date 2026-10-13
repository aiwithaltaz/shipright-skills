# Build rules

**Version/date:** 0.1, 2026-10-13  **Sources and approval:** PRD D1-D9, Proposed (delegated) by the owner.

Read DESIGN.md, this file, the ticket and the spec section it names before any change.

## Current phase

**Phase:** 1, one home page `/` plus `/design`. Screens S0-S4 in `docs/shipright/04-frontend-spec.md`.
**Excluded:** the list in `docs/shipright/01-prd.md` section 4.

Every visible element needs a current-phase source. No extra features, sections, filters, counters or navigation.
No disabled placeholders, hidden routes or data models for later ideas.
Never invent the product name, price, specs, reviews, ratings, press, logos, legal text or claims about sound.
Facts live only in `src/content/product.ts`. Missing optional facts are not rendered; missing required facts fail `npm run check:content`.
Proposed choices stay labeled until the owner approves them.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Code and style

- Use only tokens from `design/tokens.css`. No hardcoded colors, sizes or durations in components.
- One filled button per view. No gradients, glows, glass or shadows.
- No em dashes in UI copy. Copy comes from the spec or `product.ts`.
- Three.js work goes in `src/components/viewer/`. Render on demand, pixel ratio capped at 2, dispose geometry and textures on unmount.

## Interaction and accessibility

- Native buttons and links, visible labels, logical heading order.
- Visible focus on every control; nothing sticky covers it.
- Status updates use `role="status"` and never move focus.
- Text contrast 4.5:1, large text and control boundaries 3:1. Targets at least 44 by 44.
- Reflow at 320 px and 200% text without sideways scroll.
- Respect `prefers-reduced-motion`: no automatic movement, instant view changes.
- The page works fully without WebGL or JavaScript, using the still image.

## Limits

- Never put secret keys in the project. `PUBLIC_CHECKOUT_URL` is the only environment variable.
- Do not install analytics, call paid services, sign up for accounts, deploy or publish.
- Check each ticket at 390 and 1280 wide, by keyboard, and with reduced motion. Report what you did not verify.
