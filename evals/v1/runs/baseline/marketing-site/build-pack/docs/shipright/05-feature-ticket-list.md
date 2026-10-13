# 05 - Feature tickets

**Project path:** `docs/shipright/05-feature-ticket-list.md`
**Version/date:** 0.1, 2026-10-13
**Sources and approval:** P1 scope in `docs/shipright/01-prd.md`; S1 in `docs/shipright/04-frontend-spec.md`.

P0 means required for this release. Build in this order.

## Ordered tickets

| ID | Change | Phase / job / screen | Depends on | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| T1 | Project setup, fonts, DESIGN.md tokens as CSS variables, base styles | P1 / all / S1 | Stack choice (accept proposal or name one) | Builder | Ready |
| T2 | Header, skip link, hero with illustration | P1 / J1 / S1 | T1 | Builder | Ready |
| T3 | How the beta works section | P1 / J1 / S1 | T1 | Builder | Ready |
| T4 | Apply section: criteria lists and form with all client states | P1 / J2, J3, J4 / S1 | T1 | Builder | Ready |
| T5 | `POST /api/apply` endpoint | P1 / J3 | D4 provider | Builder, founder | Partly blocked |
| T6 | Mobile apply bar | P1 / J3 / S1 | T2, T4 | Builder | Ready |
| T7 | Page metadata and footer | P1 / J1 / S1 | T1 | Builder | Ready |
| T8 | Privacy page and links | P1 / J3 / S1 | D8 text | Founder, builder | Blocked |
| T9 | Verification pass | P1 / all | T1 to T8 | Builder | Ready after T8 |

## Ticket detail

**T1**
- **Bounded change:** create the project; load Space Grotesk 600 and Inter 400/500/600; put every DESIGN.md value in `:root` CSS variables; base body, link and focus styles.
- **Preserve / do not add:** no CSS framework theme colors, no dark mode, no analytics, no cookie banner.
- **Acceptance checks:** every color, radius and font in the code comes from the variables; focus ring visible on all links and buttons.
- **Verification evidence needed:** search the CSS for hex values outside `:root`.

**T2**
- **Bounded change:** header (wordmark, "Apply" link-button), skip link, hero (badge, h1, C1, primary button, C2, SVG illustration).
- **Preserve / do not add:** no nav links beyond "Apply"; no logo image; no video embed; illustration has no text or numbers.
- **Acceptance checks:** copy matches C1 and C2 exactly; one primary button; illustration `aria-hidden="true"`; text first under 900px.
- **Verification evidence needed:** screenshots at 1280px and 375px.

**T3**
- **Bounded change:** h2 "How the beta works", ordered list of three steps (C3), deal line C4.
- **Preserve / do not add:** no cards with icons per step, no timeline graphics, no duration for free access.
- **Acceptance checks:** `ol` with three `li`; numbers visible as text; C4 says nothing about duration.
- **Verification evidence needed:** screenshot; text search for "forever", "lifetime", "months".

**T4**
- **Bounded change:** h2 "Apply for the beta" (`id="apply-title"`, `tabindex="-1"`), C5, C6 and C7 lists, form with five visible fields and the honeypot, all states from the spec.
- **Preserve / do not add:** no extra fields, no file upload, no phone number, no social login, no "how did you hear about us".
- **Acceptance checks:** errors appear only after first submit; error summary counts and links real errors; focus goes to the summary on failure and to "Application sent" on success; answers stay after any failure; double click sends one request; sent state needs a 200.
- **Verification evidence needed:** keyboard-only run; screen reader spot check; network log showing one request.
- **Open dependency:** T5 for real sending.

**T5**
- **Bounded change:** endpoint per `docs/shipright/02-technical-architecture.md`: validation, honeypot, rate limit, storage, founder notification.
- **Preserve / do not add:** no read route; no applicant data in logs or URLs; credentials in server environment variables only.
- **Acceptance checks:** 200 only after storage; 400 with field messages; 429 over the limit; 500 when storage fails; filled honeypot returns 200 and stores nothing.
- **Verification evidence needed:** request tests for each response.
- **Open dependency:** D4 storage and notification tool. Build the validation and a storage interface now; plug in the provider when chosen.

**T6**
- **Bounded change:** under 900px, sticky bottom bar with the primary "Apply for the beta" button. Shows after the hero button leaves the viewport; hides while the Apply section is visible.
- **Preserve / do not add:** no bar on desktop; no animation; no close button needed because it hides by itself.
- **Acceptance checks:** never overlaps a focused field (`scroll-padding-bottom: 88px`); not present in the accessibility tree when hidden.
- **Verification evidence needed:** 375px run, tabbing through the form.

**T7**
- **Bounded change:** `<title>` and meta description from the copy deck; `lang="en"`; footer with wordmark and "trysocialghost.com".
- **Preserve / do not add:** no social icons, no copyright company name (legal name Unknown), no open graph image until one exists.
- **Acceptance checks:** title and description match the copy deck.

**T8**
- **Bounded change:** `/privacy` page that shows the founder's supplied text; link "Privacy" in the footer and a line under the form: "Read how we handle your answers in our Privacy notice."
- **Preserve / do not add:** the builder does not write privacy text.
- **Acceptance checks:** link targets resolve; page shows the supplied text unchanged.
- **Open dependency:** D8. Launch blocker.

**T9**
- **Bounded change:** run the checks in `docs/shipright/build-rules.md` Verification.
- **Acceptance checks:** every row in 04 Exact acceptance checks is Pass or has a named reason.

## Critique follow-up

| Finding | Severity | Ticket / acceptance change | Evidence closing it |
| --- | --- | --- | --- |
| No privacy notice for a form that collects email | Blocker for launch | T8 | Founder text published and linked |

A ticket does not turn Fail into Pass. Check the changed artifact before closing the finding.
