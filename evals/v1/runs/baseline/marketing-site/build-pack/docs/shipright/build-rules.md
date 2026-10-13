# Build rules

**Project path:** `docs/shipright/build-rules.md`
**Version/date:** 0.1, 2026-10-13
**Sources and approval:** R1 founder request; R2 delegation; decisions D1 to D11 in `docs/shipright/01-prd.md`.

Project paths below are relative to the app root. Read PRODUCT.md, DESIGN.md, this file, `docs/shipright/04-frontend-spec.md` and the ticket you are working on.
`index.html` is a design preview of S1. Match its layout and copy. Do not copy its preview-only code (the "no endpoint" notice and `?preview=` states).

## Current phase

**Phase and source:** P1, Beta recruitment site (D1).
**Allowed changes and screens:** S1 Home and `POST /api/apply`. Later, `/privacy` with founder text (T8).
**Keep:** the beta deal in the founder's words: limited beta, free access, useful feedback within 2 to 3 days. SocialGhost is live.
**Remove/change/add:** add S1 and the endpoint exactly as specified. Nothing else.
**Excluded / later notes only:** pricing, sign-up/login, dashboard, testimonials, ratings, user or video counts, sample gallery, FAQ, blog, newsletter, chat widget, analytics, social links, cookie banner, extra nav links.

Every visible element needs a current-phase source. No extra features, filters, tabs, counters, chips or navigation.
No disabled placeholders, hidden routes or data models for later phases.
Do not invent brand values or data. Use labeled sample data only for a requested prototype or test.
Use existing sourced components. Proposed choices stay separate until approved or covered by explicit delegation.
Reuse the canonical project system first. Carry its source/version if known and approved exceptions from DESIGN.md or the actual system record. Do not rebrand or replace it without approval; preserve unrelated schema keys. A documentation change does not migrate or verify consumers.

**Product claims:** describe SocialGhost only as "a live AI tool that makes faceless YouTube videos" until the founder supplies more (D2). No claims about speed, quality, views, earnings, voices, scripts, editing or uploads.

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

## Consequences and pending work

S1 has no clear, reset or delete action. Nothing is saved before "Send application" succeeds; do not add drafts or local storage.
Sending is the only background work. Show "Sending your application." while it runs. Show "Application sent" only after a 200.

## Screen brief

```text
Screen ID and job: S1 Home. Understand the beta deal and send an application.
Current phase and source: P1. R1, D1, D11.
Keep / remove / change / add: add all elements in 04 element table. Nothing else.
Allowed elements and source for each: see 04 element table.
Structure and reading order: header, hero, How the beta works, Apply (criteria then form), footer.
Components and sourced tokens: DESIGN.md components and CSS variables.
Actions: "Apply" / "Apply for the beta" go to #apply and focus its heading. "Send application" sends once to POST /api/apply.
States: pristine, invalid, sending, sent, failed 400 / 429 / network-500.
Exit (F1): header and scrolling; sent state has "Back to top"; failures keep answers.
Reused patterns (F2): one primary button style, one label per action, all status inside the form above the button.
Useful status (F3): "Sending your application." then "Application sent" or a plain failure with retry.
Responsive: two columns at 900px+; single column below; sticky mobile apply bar below 900px.
Accessibility: see 04 Accessibility line; keyboard and screen reader checks are required evidence.
Do not add / later-phase notes: real samples, product walkthrough, privacy page text from founder.
Exact acceptance checks: 04 Exact acceptance checks table.
Unknowns reserved for the founder: D2, D4 provider, D7, D8.
```

## Needs approval before build

Nothing blocks building S1. These block launch:
- **D4 provider:** which tool stores applications and notifies the founder.
- **D7:** how long free access lasts. Until then, say only "free access".
- **D8:** privacy text and links (T8).

Founder may also edit the delegated wording of C6 and C7 (D9) at any time.

## Verification and limits

Check each requested change and excluded item. Check affected state, keyboard and responsive behavior with available evidence.
Use realistic difficult content: a 60-character name, a long email, a pasted channel link without https, an empty textarea with spaces only.
Test widths 320, 375, 768, 1024 and 1440px. Test sending with success, 400, 429, 500 and offline.
A screenshot does not prove saving, permissions, keyboard behavior or release readiness.
Report unverified behavior. Readiness never authorizes deployment, publication, payment or live messages.
