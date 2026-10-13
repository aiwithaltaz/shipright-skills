# Build rules

**Project path:** `docs/shipright/build-rules.md`

**Version/date:** v0.1 draft, 2026-10-13  **Sources and approval:** `docs/shipright/01-prd.md` D1 to D10 (Q1 to Q4 delegated by the owner on 2026-10-13).

Project paths below are relative to the app root. Read PRODUCT.md, DESIGN.md, this file, the affected frontend specification and ticket.
Visual reference: `index.html` (the phase 1 prototype). Match its structure and behavior. Its placeholder content is not final.

## Current phase

**Phase and source:** 1, product home page (owner request; D2).
**Allowed changes and screens:** H-01 Home only. Tickets T1 to T10.
**Keep:** structure, tokens and viewer behavior from the prototype.
**Remove/change/add:** Add the rotatable 3D model (owner request). Replace placeholders only with owner-confirmed facts.
**Excluded / later notes only:** cart, checkout, payment, accounts, reviews, ratings, testimonials, finish picker, newsletter, waitlist, chat, comparison, extra pages, analytics.

Every visible element needs a current-phase source. No extra features, filters, tabs, counters, chips or navigation.
No disabled placeholders, hidden routes or data models for later phases.
Do not invent brand values or data. Use labeled sample data only for a requested prototype or test.
Use existing sourced components. Proposed choices stay separate until approved or covered by explicit delegation.
Reuse the canonical project system first. Carry its source/version if known and approved exceptions from DESIGN.md or the actual system record. Do not rebrand or replace it without approval; preserve unrelated schema keys. A documentation change does not migrate or verify consumers.

Project-specific:
- Stack: Vite (vanilla), plain HTML, CSS and JavaScript modules, three.js. No framework (D4).
- Never write specs, battery life, materials, awards, reviews, quotes or prices that the owner has not supplied. Keep "To be confirmed" until then.
- The 3D viewer must never block text, specs or the Buy link. Load it after the page content.
- No scroll hijacking: no zoom on wheel, no pan, no scroll-linked animation.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction and accessibility

- Use native semantics, visible labels, suitable input types and autocomplete. Keep paste usable.
- Provide logical keyboard order and visible focus. Sticky bars must not hide focused controls.
- Modal focus enters, stays within while open, and returns on dismissal. Provide a visible exit and Escape support.
- Explain field errors with associated text. Preserve valid input and prevent duplicate submission.
- Distinguish selection, focus and errors with non-color cues and correct control semantics.
- Announce relevant status without stealing focus. Hide routine system plumbing, not actionable failures.
- Measure text contrast at 4.5:1, or 3:1 for large text; relevant UI graphics/boundaries need 3:1, subject to applicable exceptions.
- Use at least 24 by 24 CSS pixel pointer targets or a justified WCAG exception. Prefer 44 by 44 for touch-heavy use.
- Check 200% text resizing and 320 CSS pixel reflow where applicable, plus supported product widths.
- Respect reduced motion and meaningful image alternatives. These checks are not complete compliance certification.
- Do not put sensitive phone/email searches, tokens or private records in URLs, analytics or logs by default.

3D viewer specifics: give a non-drag way to rotate (Turn left, Turn right, Reset view) and arrow keys when the viewer is focused. Keys act only on the focused viewer. The canvas is hidden from assistive technology; the viewer group has a label and help text.

## Consequences and pending work

For clear/reset/remove, define the object, scope, saved effects and recovery. Clearing selection is not deleting records.
Saved unfinished work is different from a running background job. Do not invent cancellation, undo, persistence or notifications.
"Reset view" only changes the camera angle. Nothing else is reset.

## Screen brief

```text
Screen ID and job: H-01 Home. Understand the speaker, turn it in 3D, check facts, go to the store.
Current phase and source: 1. Owner request; D1, D2, D7.
Keep / remove / change / add: Add rotatable 3D model.
Allowed elements and source for each: see 04-frontend-spec.md "Visible element" table.
Structure and reading order: prototype note, header, hero copy, viewer + help + controls, Specifications, Buy, footer.
Components and sourced tokens: DESIGN.md components and YAML tokens.
Actions: Buy (header) scrolls to #buy. Buy on our store opens store URL, same tab. Turn left/right 22.5 degrees. Reset view to default angle. Drag rotates. No zoom or pan.
States: 3D loading, ready, unavailable, context lost, off screen paused, reduced motion, JS off, unconfirmed fact.
Exit (F1): header links and browser Back. Fallback state links to specs.
Reused patterns (F2): one filled button per area; all viewer controls secondary; status text under its control.
Useful status (F3): "Loading 3D view"; plain fallback messages; "View reset." announced. No technical errors shown.
Responsive: stack under 860 px; viewer 340 to 520 px tall on narrow screens; full-width Buy button; no sticky elements.
Accessibility: see above and 04-frontend-spec.md.
Do not add / later-phase notes: see Excluded above.
Exact acceptance checks: 04-frontend-spec.md "Exact acceptance checks".
Unknowns and decisions reserved for the user: name, price, store URL, specs, 3D file, brand, D6, D8, D9, D10.
```

## Needs approval before build

- **D6** Settle turn on first load (1.6 s, 40 degrees, off for reduced motion). It is in the prototype. Build it behind one constant so it can be turned off.
- **D8** Real 3D file budget: one .glb, compressed, about 3 MB or less, textures 2048 px or less.

## Verification and limits

Check each requested change and excluded item. Check affected state, keyboard and responsive behavior with available evidence.
Use realistic difficult content appropriate to the task. Do not create a broad test project for a small fix.
A screenshot does not prove saving, permissions, keyboard behavior or release readiness.
Report unverified behavior. Readiness never authorizes deployment, publication, payment or live messages.
