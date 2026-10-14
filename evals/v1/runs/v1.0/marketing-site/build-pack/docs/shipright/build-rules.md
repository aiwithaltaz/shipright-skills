# Build rules: trysocialghost.com

**Version/date:** 1.0, 2026-10-13. Read this file, `DESIGN.md` and the ticket's spec section before every change.

## Current phase

**Phase:** Site v1. **Screens:** S1 Home `/`, S2 Not found, D1 `/design` (see `docs/shipright/04-frontend-spec.md`).
**Excluded:** pricing, sign-in, blog, video gallery, testimonials, logos, counts, newsletter, chat bubble, analytics, cookie banner.
No disabled placeholders, hidden routes or data models for later ideas.

## Facts only

The only product facts are in `docs/shipright/01-prd.md` section 2. Do not add features, numbers, quotes, reply times, durations or prices.
Copy comes verbatim from the frontend spec. If a sentence is missing, ask; do not write a new claim.
The video frame is an illustration and keeps its caption saying so.

## Code

- Astro, static output. Styles use only variables from `design/tokens.css`. No raw hex, px font sizes or spacing in components, except 1px borders.
- One filled button per view. Never two filled buttons side by side.
- Native HTML first: `a`, `button`, `input`, `fieldset`, `details`. No UI library or framework runtime. Client JavaScript lives in `src/scripts/`.
- The form markup lives in the static HTML so Netlify can detect it.
- No secrets, keys or environment variables. Never log form values.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction and accessibility

- Visible labels, `type="email"`, `type="url"`, `autocomplete="email"`. Paste always works.
- Validate on leaving a touched field and on submit. Typing only clears a fixed error. Error text sits under the field, linked by `aria-describedby`, with `aria-invalid="true"`.
- On submit with errors, focus the first invalid field.
- Disable submit only while sending, with the label "Sending...". One request per submit.
- Keep every value after a failed send.
- Visible 2px accent focus ring with 2px offset on every interactive element. Sticky header never covers a focused element (`scroll-margin-top: 80px`).
- Contrast 4.5:1 for text, 3:1 for large text and field borders. Targets 44px or more. No sideways scroll at 320px; text resizes to 200%.
- Every animation has a `prefers-reduced-motion: reduce` version with the same content. Content is visible without JavaScript.
- Announce "Application sent" with `role="status"`; announce the send failure with `role="alert"`.

## Needs approval before build

Nothing blocks building. Before launch (T9): privacy policy URL (PRD O1).

## Verification and limits

After each ticket check the named routes at 390 and 1280, by keyboard and with reduced motion on. Report what you could not check.
Never deploy, buy, or connect the domain yourself.
