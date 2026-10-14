# Build rules

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** 01-prd.md decision log. Read this file, DESIGN.md, the affected part of 04-frontend-spec.md and the ticket before every change.

## Current phase

**Phase:** SocialGhost beta recruitment site, release 1.
**Allowed screens:** S1 Home `/`, S2 Application received `/applied`, S3 Not found `/404`, plus the `/design` token preview.
**Excluded:** pricing, sign-in, blog, sample gallery, testimonials, counts, logos, newsletter, chat, analytics, cookie banner.

Every visible element needs a source in 01-prd.md or 04-frontend-spec.md. No extra sections, badges, counters or navigation. No disabled placeholders or hidden routes for later ideas.
Never invent facts about SocialGhost: features, steps, prices, numbers, quotes, logos or legal text. If copy needs a fact that is not in the spec, stop and ask.
Use only tokens from `design/tokens.css`. No raw hex, px spacing or font values in components.
The copy source is `design/home-preview.html`. Match its words exactly.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction and accessibility

- Native elements: `<a>`, `<button>`, `<input>`, `<details>`. Visible labels; placeholders are examples only.
- Correct `type`, `inputmode` and `autocomplete` on every field. Paste always works.
- Errors: text under the field, tied with `aria-describedby`, `aria-invalid="true"`, and the word "Error:". On submit, focus the first bad field. No errors before the user types.
- Prevent double submission: disable the button and change its label while sending.
- Status updates use `role="status"` or `role="alert"` and do not steal focus.
- Visible focus ring on every interactive element: 2px accent, 2px offset.
- Text contrast 4.5:1, large text and UI borders 3:1. Targets 44 by 44 or larger.
- Works at 320px wide and at 200% text size with no sideways scroll.
- Every animation has a `prefers-reduced-motion: reduce` version. Content is never invisible at load.
- One filled button per view. Hover styles only under `(hover: hover) and (pointer: fine)`.
- Never put names or emails in URLs, logs or analytics.

## Needs approval before build

- Privacy policy link under the submit button (O3). The site must not collect applications publicly without it.
- All Proposed (delegated) design tokens: approved when the owner OKs `/design` in T1.

## Verification and limits

After each ticket: check its "Done when" list at 390px and 1280px, by keyboard, and with reduced motion on. Report what you could not check.
A screenshot does not prove the form submits. Only a real test submission on the deployed site does.
Never deploy, connect the domain, sign up for services or send messages for the owner.
