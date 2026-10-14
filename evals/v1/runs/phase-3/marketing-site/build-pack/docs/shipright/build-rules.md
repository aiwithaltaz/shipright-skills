# Build rules: SocialGhost beta site

**Version/date:** 1.0, 2026-10-13. **Sources and approval:** 01-prd.md decisions D1 to D7, all Proposed (delegated).

Read DESIGN.md, this file, the affected section of docs/shipright/04-frontend-spec.md and the ticket before any change.

## Current phase

**Phase:** Beta recruitment site, version 1.
**Allowed screens:** S1 Home (`/`), S2 Privacy notice (`/privacy`), S3 Not found, plus the `/design` preview from T1.
**Excluded:** pricing, sign-in or app links, example videos, feature lists, testimonials, user counts, logos, blog, newsletter, chat widget, analytics, cookie banner, dark mode.

Every visible element needs a source in the frontend spec. No extra sections, badges, counters, navigation, placeholders or hidden routes.
Never invent features, numbers, quotes, logos, prices or legal text. Use the spec copy word for word. If copy is missing, stop and ask.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Styling

- Use only tokens from `src/styles/tokens.css` (a copy of `design/tokens.css`). No raw colors, sizes or spacing in components.
- One filled button per view. Accent only on actions, links, focus and selected controls.
- No gradients, glows, glass, blur, pill badges or uppercase eyebrow labels. Motion only as DESIGN.md says.

## Interaction and accessibility

- Native controls, visible labels, correct input types and autocomplete. Paste works.
- Logical keyboard order; visible focus ring everywhere.
- Field errors under the field via `aria-describedby`; an error list at the top after a failed submit.
- Keep typed values after any failure. Block a second submit while sending.
- `role="status"` for sending and sent; `role="alert"` for failures. Never steal focus while typing.
- Contrast 4.5:1 text, 3:1 large text and field borders. Targets at least 44px.
- No sideways scroll at 320px; 200% zoom keeps the form usable.
- Never put names or emails in URLs, analytics or logs.

## Secrets and services

- Only `PUBLIC_FORM_ENDPOINT` exists. No other keys. Do not add services, packages or paid plans without asking.
- Do not sign up, deploy, buy a domain or publish. The owner does that.

## Needs approval before build

- The look (D3): approve the `/design` page after T1.
- Privacy notice text (owner): blocks T7 and launch.

## Verification

After each ticket: check the changed screen at 1280 and 390 wide, tab through it, and confirm its Done when list.
A screenshot does not prove sending or launch readiness. Report what you did not check.
