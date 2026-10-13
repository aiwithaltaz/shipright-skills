# 05 - Feature tickets: trysocialghost.com

**Version/date:** 1.0, 2026-10-13. Paste one ticket at a time into Cursor. Each ends with a stop line.
Standing rules live in `docs/shipright/build-rules.md`; tickets do not repeat them.

| ID | Ticket | Screen | After |
| --- | --- | --- | --- |
| T1 | Foundation and `/design` preview | D1 | none |
| T2 | Shell: header, footer, 404 | S1, S2 | T1 |
| T3 | Hero with static video frame | S1 | T2 |
| T4 | Content sections | S1 | T3 |
| T5 | Apply form, happy path | S1 | T4 |
| T6 | Form states | S1 | T5 |
| T7 | Motion | S1 | T6 |
| T8 | QA pass | all | T7 |
| T9 | Launch check | all | T8, owner supplies privacy policy URL |

## T1. Foundation and /design preview

```text
T1. Foundation and /design preview        Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The owner can open /design and approve the look before any page is built.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css, docs/shipright/02-technical-architecture.md.
Build:
1. Create an Astro project (current stable, TypeScript strict, static output) in the repo root. Add netlify.toml with build command "npm run build" and publish "dist".
2. Keep design/tokens.css as the only token source. Import it in src/styles/global.css with a small reset, body font var(--font-sans), color var(--color-text) on var(--color-bg), and the focus ring rule.
3. Load Geist (400, 500, 600) and Geist Mono (400) from Google Fonts with preconnect and display=swap in src/layouts/Base.astro.
4. Create src/pages/design.astro with meta robots noindex. Show: color swatches with token name, hex and contrast from DESIGN.md; the five type sizes with sample text "Make faceless YouTube videos"; the spacing scale as bars; primary, secondary and text buttons in default, hover, focus and busy ("Sending..."); a text field in default, focus and error ("Enter an email address like name@example.com."); a radio group and a checkbox.
Do not add: Tailwind, a UI kit, any other page.
Done when:
- npm run build passes; /design renders at 390 and 1280 with no sideways scroll.
- No hex values outside design/tokens.css.
Stop: Do not start T2. Reply with changed files, decisions made, and how you checked. Ask the owner to OK the look.
---
```

## T2. Shell: header, footer, 404

```text
T2. Shell                                  Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: Every page has the same header, footer and a way home.
Read first: docs/shipright/build-rules.md, DESIGN.md (Placement), docs/shipright/04-frontend-spec.md (S1 Header and Footer, S2).
Build:
1. src/components/Header.astro: skip link "Skip to content", text wordmark "SocialGhost" linking to /, links "How it works" (/#how), "FAQ" (/#faq), secondary button "Apply" (/#apply). Sticky, 64 tall; adds a 1px bottom border after the page scrolls. Under 760px show only the wordmark and "Apply".
2. src/components/Footer.astro with the footer copy and links from the spec.
3. src/pages/index.astro with empty sections #how, #fit, #feedback, #faq, #apply inside main#content, each with scroll-margin-top: 80px.
4. src/pages/404.astro with the S2 copy and the primary button "Go to the home page".
5. Title "SocialGhost: make faceless YouTube videos with AI (beta)" and a meta description using the hero lead sentence.
Do not add: a logo image, a menu drawer, contact or copyright lines.
Done when:
- Tab order starts with the skip link; every header link lands on its section with the heading visible below the header.
- /404 renders and its button returns home.
Stop: Do not start T3. Reply with changed files, decisions made, and how you checked.
---
```

## T3. Hero with static video frame

```text
T3. Hero                                   Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: A visitor sees in one screen what SocialGhost is, the beta deal, and the Apply action.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S1 Hero), docs/shipright/reference-home.html (hero markup and SVG).
Build:
1. src/components/Hero.astro: H1, lead, primary "Apply for the beta" (/#apply), text link "How the beta works" (/#how), meta line. Copy verbatim from the spec.
2. src/components/VideoFrame.astro: figure, 16:9, radius var(--radius-panel), the night-scene SVG (aria-hidden), caption box showing the last line "This is a faceless video.", progress bar full, timecode "0:09 / 0:09", and the figcaption. Port the SVG from the reference page.
3. Layout: 5/7 columns at 1024px and up, stacked below with text first. Phone: button full width.
Do not add: animation (T7), a play button that plays real video, a badge above the H1.
Done when:
- H1 is two lines or fewer at 390 and 1280.
- One filled button in the hero view.
- The figcaption says the frame is an illustration.
Stop: Do not start T4. Reply with changed files, decisions made, and how you checked.
---
```

## T4. Content sections

```text
T4. Content sections                       Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: A visitor understands the steps, whether they fit, what feedback means, and gets objections answered.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (#how, #fit, #feedback, #faq).
Build:
1. #how: ordered list of four steps, 4 columns at 1024+, 2 at 760, 1 below, joined by a 1px line. Number in a 32px outlined circle.
2. #fit: two lists, "A good fit" with check icons and "Not a fit yet" with minus icons (inline SVG, 1.75 stroke). Stack under 760.
3. #feedback: full-width sunken band; H2 and intro left, ordered questions right at 20px.
4. #faq: five native details elements, all closed, max width 760.
Copy verbatim from the spec. Each section uses a different composition.
Do not add: cards around steps, icons on headings, extra FAQ questions, testimonials.
Done when:
- All copy matches the spec word for word.
- FAQ opens and closes with Enter and Space.
- No sideways scroll at 320.
Stop: Do not start T5. Reply with changed files, decisions made, and how you checked.
---
```

## T5. Apply form, happy path

```text
T5. Apply form                             Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: A fitting visitor applies and the owner receives the application in Netlify Forms.
Read first: docs/shipright/build-rules.md, docs/shipright/02-technical-architecture.md (Data, Submit request), docs/shipright/04-frontend-spec.md (#apply).
Build:
1. In #apply, the left column copy and a form name="beta-application" with data-netlify="true", netlify-honeypot="bot-field", a hidden form-name input, and the five fields from the spec with labels and help text.
2. src/scripts/apply.ts: on submit, POST urlencoded to "/" as specified. On 2xx replace the form with the Sent panel, put the typed email in it, and move focus to its H3.
3. Native required attributes stay as a fallback when JavaScript is off.
Do not add: a name field, file upload, captcha, a thank-you page.
Done when:
- On a Netlify deploy preview, one test submission appears in the dashboard with all five fields.
- The Sent panel shows the exact email typed.
Stop: Do not start T6. Reply with changed files, decisions made, and how you checked.
---
```

## T6. Form states

```text
T6. Form states                            Size: one sitting   After: T5
Paste this into your coding tool:
---
Goal: Applicants can fix mistakes and recover from a failed send without losing answers.
Read first: docs/shipright/build-rules.md (Interaction), docs/shipright/04-frontend-spec.md (#apply states table).
Build:
1. Add novalidate when JS runs. Validate on blur of touched fields and on submit using the spec's error copy, with aria-invalid and aria-describedby. Focus the first invalid field on submit.
2. Submitting: label "Sending...", disabled, aria-busy. Ignore further submits until done. 15 s timeout counts as failed.
3. Failed: role="alert" message under the button from the spec; button returns; all values kept.
4. Honeypot field visually hidden and skipped by keyboard.
Do not add: toasts, a retry counter, saving drafts.
Done when:
- Each error appears with its field and is read by a screen reader.
- With the network offline in devtools, the failed message shows and values stay.
- A double click sends one request.
Stop: Do not start T7. Reply with changed files, decisions made, and how you checked.
---
```

## T7. Motion

```text
T7. Motion                                 Size: one sitting   After: T6
Paste this into your coding tool:
---
Goal: The video frame shows once what a faceless video is; sections enter quietly.
Read first: docs/shipright/build-rules.md, DESIGN.md (Motion), docs/shipright/reference-home.html (script).
Build:
1. src/scripts/frame.ts: on load, play once for 9 s: hill layers drift up to 12px, the three caption lines show one after another, progress bar and timecode advance. End on the last frame. One player button: "Pause" while playing, "Play" when paused (resumes), "Replay" at the end (restarts from 0). Only transform and opacity.
2. Section entrance: heading, text, then media, 80 ms stagger, rise 20px, 600 ms, once. Hide an element only after the first user scroll and only if it is below the viewport, then reveal it when it comes into view (see the reference page script).
3. Under prefers-reduced-motion: reduce, show the last frame, hide the player button, skip entrances.
Do not add: GSAP, Lenis, loops, scroll pinning.
Done when:
- With reduced motion on, every word is visible at once.
- With JS off, all content is visible.
- Pause, Play and Replay work by keyboard.
Stop: Do not start T8. Reply with changed files, decisions made, and how you checked.
---
```

## T8. QA pass

```text
T8. QA pass                                Size: one sitting   After: T7
Paste this into your coding tool:
---
Goal: The site meets the spec's acceptance checks.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (Acceptance checks).
Build:
1. Check /, /404 and /design at 320, 390, 760 and 1280: no sideways scroll, nothing clipped, H1 two lines or fewer.
2. Keyboard only: skip link, every link, FAQ, every field, submit, Sent panel, player button.
3. Measure contrast of every text and field border pair against DESIGN.md.
4. Run Lighthouse on a deploy preview; record LCP, CLS and total JS.
5. Search the copy for any claim not in the spec.
Fix what fails inside this ticket's scope; list the rest.
Done when:
- A short table lists each check as Pass, Fail or Not verified with evidence.
Stop: Do not start T9. Reply with the table and changed files.
---
```

## T9. Launch check

```text
T9. Launch check                           Size: one sitting   After: T8 and PRD O1
Paste this into your coding tool:
---
Goal: The owner can decide to launch with known gaps listed.
Read first: docs/shipright/build-rules.md, docs/shipright/01-prd.md (Open questions).
Blocked until the owner supplies the privacy policy URL (O1). Do not write policy text.
Build:
1. Add "Privacy policy" to the footer and a line under the submit button: "See our privacy policy." linking to the supplied URL.
2. Add the contact email to the footer if supplied (O2).
3. List for the owner: connect trysocialghost.com in Netlify, turn on form email notifications, send one real test application.
Do not: deploy, change DNS, or turn on paid features yourself.
Done when:
- The privacy link works from the footer and the form.
- The owner has a checklist of the three launch actions.
Stop: Reply with changed files and the checklist.
---
```
