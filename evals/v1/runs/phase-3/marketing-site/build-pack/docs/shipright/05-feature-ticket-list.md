# 05 - Feature tickets: SocialGhost beta site

**Version/date:** 1.0, 2026-10-13. **Sources and approval:** 01-prd.md D1 to D7 (Proposed, delegated).

Paste one ticket at a time into Cursor. Each one finishes in one sitting, reports and stops.
Before T1, put these in the project: `DESIGN.md`, `design/tokens.css`, `docs/shipright/`, `.cursor/rules/shipright.mdc`, and the home page preview as `reference/home-preview.html`.

## Order

| ID | Ticket | Screen | After |
| --- | --- | --- | --- |
| T1 | Foundation and /design preview | Tokens | none |
| T2 | Shell, header, footer, Not found | S3, layout | T1 |
| T3 | Hero | S1.1 | T2 |
| T4 | How it works, Who, Questions | S1.2 to S1.4 | T3 |
| T5 | Apply form: fields and happy path | S1.5 | T4 |
| T6 | Apply form: states | S1.5 | T5 |
| T7 | Privacy notice (blocked on owner text) | S2 | T2 |
| T8 | Hero motion | S1.1 | T3 |
| T9 | QA pass | All | T8 |
| T10 | Launch check | All | T9 |

## Tickets

```text
T1. Foundation and /design preview      Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The project runs locally and /design shows the proposed look for the owner's OK.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css, docs/shipright/02-technical-architecture.md (Stack).
Build:
1. Create an Astro project (current stable version, static output, TypeScript strict) in this folder. No UI framework, no Tailwind.
2. Copy design/tokens.css to src/styles/tokens.css. Add src/styles/base.css with the base rules from reference/home-preview.html (Base, Buttons, focus, .container, .visually-hidden).
3. Load Instrument Sans 400, 500, 600 from Google Fonts with preconnect and display=swap.
4. Page src/pages/design.astro with noindex: color swatches with token names and hex values; the five type sizes with sample lines; the spacing scale as bars; primary button, secondary button, text link; text field, email field, textarea, radio group, checkbox, each in default, focus, invalid; danger and neutral Alerts.
5. Add .env.example with PUBLIC_FORM_ENDPOINT= and a README section "Run locally".
Do not add: any other page, analytics, packages beyond Astro.
Done when:
- npm run dev serves /design with no console errors.
- Every swatch and control uses tokens, no raw values in components.
- /design has no sideways scroll at 390px.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked. Ask the owner to approve the look.
---
```

```text
T2. Shell, header, footer, Not found      Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: Every page shares one header and footer, and wrong addresses land on a helpful page.
Read first: docs/shipright/build-rules.md, DESIGN.md (Placement), docs/shipright/04-frontend-spec.md (Navigation, Footer, S3, Accessibility).
Build:
1. src/layouts/Base.astro: skip link "Skip to content", header, <main id="main" tabindex="-1">, footer. Props: title, description, noindex.
2. Header: wordmark "SocialGhost" to /#top; links "How it works", "Who it's for", "FAQ" (hidden under 760px); secondary button "Apply" to /#apply. Not sticky.
3. Footer copy and links exactly as the spec.
4. src/pages/404.astro per S3, noindex.
5. Head on /: title and description from 02-technical-architecture.md (SEO), canonical https://trysocialghost.com/.
Do not add: a mobile menu, a logo image, social links, a contact address.
Done when:
- /nope shows S3 and "Go to the home page" works.
- Tab order: skip link, wordmark, nav links, Apply. Focus ring visible on each.
- 390px: header fits on one line.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T3. Hero                                  Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: A first-time visitor sees what SocialGhost is, the beta deal and one way to apply.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S1.1), reference/home-preview.html (hero markup and SVG).
Build:
1. src/components/Hero.astro on /, section id="top", copy word for word from S1.1.
2. "Apply for the beta" primary button to #apply; "How the beta works" link to #how.
3. The inline SVG frame and caption from the reference, in its final state. No animation yet.
4. Layout 6/6 columns; stack under 900px; full-width button under 640px.
Do not add: badges, a second filled button, stats, a video embed, animation.
Done when:
- H1 is at most two lines at 1280 and 390.
- The SVG has role="img" and a title.
- No sideways scroll at 320px.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T4. How it works, Who, Questions          Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: Visitors learn the steps, what useful feedback means, whether they fit, and the answers to common doubts.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S1.2, S1.3, S1.4), reference/home-preview.html.
Build:
1. HowItWorks.astro (#how, sunken): H2, deal line, <ol> of four steps with numbered discs, feedback list.
2. WhoShouldApply.astro (#who): heading column and two lists with decorative icons (aria-hidden).
3. Questions.astro (#faq, sunken): <dl>, two columns, five answers exactly as the spec.
4. Responsive rules from each spec block.
Do not add: accordions, icon cards, testimonials, extra questions or answers.
Done when:
- Copy matches the spec word for word.
- Steps read 1 to 4 with a screen reader as a list.
- 1280, 900, 560 and 390 widths match the responsive rules with no overlap.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T5. Apply form: fields and happy path     Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: A visitor fills six fields and their application reaches the owner's form inbox.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S1.5), docs/shipright/02-technical-architecture.md (Data, Environment variables).
Build:
1. Apply.astro (#apply): copy column and white form panel as the spec.
2. Fields, labels, help, types and autocomplete exactly as the field table. Honeypot _gotcha.
3. A small client script: on submit, prevent default, POST JSON to import.meta.env.PUBLIC_FORM_ENDPOINT with Accept: application/json.
4. On 2xx only: replace the form with the Sent block, fill name and email with textContent, focus its heading.
5. "Apply for the beta" and header "Apply" scroll to #apply and focus its H2.
Do not add: extra fields, a captcha, file upload, a database.
Done when:
- With a test endpoint from the owner, one submit creates one entry with all seven keys.
- The Sent block shows the typed name and email.
- The whole form works by keyboard.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T6. Apply form: states                    Size: one sitting   After: T5
Paste this into your coding tool:
---
Goal: The form never loses answers, never sends twice and never claims success it did not get.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S1.5 states and error messages).
Build:
1. Validation on submit with the exact messages; error list Alert focused; links focus each field; aria-invalid and aria-describedby; re-check on change.
2. Sending: button text "Sending...", aria-disabled, ignore further submits, polite status.
3. Failed: danger Alert with the offline or server message; keep every value.
4. Endpoint empty: neutral Alert "This form is not connected yet. Nothing was sent."
Do not add: toasts, autosave, retries in the background.
Done when:
- An empty submit lists five problems (name, email, channel, first video, feedback box), and focus lands on the list.
- With the network offline in DevTools, the failed Alert shows and values stay.
- Double-clicking Send creates one request.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T7. Privacy notice                        Size: one sitting   After: T2
Blocked until the owner supplies the privacy text. Do not write it.
Paste this into your coding tool:
---
Goal: Applicants can read how their details are handled before sending.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S2).
Build:
1. src/pages/privacy.astro with H1 "Privacy notice", the owner's text pasted unchanged in a 66ch column, the owner's "Last updated" date.
2. Link "Back to the application" to /#apply.
Do not add: cookie banners, invented clauses, placeholder text.
Done when:
- The text matches the owner's file exactly.
- The form's and footer's privacy links open /privacy.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T8. Hero motion                           Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: The hero shows the "faceless" idea once, quietly, and never hides content.
Read first: DESIGN.md (Motion), reference/home-preview.html (keyframes).
Build:
1. CSS-only keyframes inside @media (prefers-reduced-motion: no-preference): outline fades out, ghost fades in and rises 10px, progress and playhead run. 2.4 s, once, on load.
2. Default styles are the final frame, so reduced motion and no JavaScript show it at once.
Do not add: loops, scroll reveals, parallax, GSAP or other libraries.
Done when:
- With reduced motion on, the final frame shows with no movement.
- Animation uses only opacity and transform.
- CLS stays 0 in the hero.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T9. QA pass                               Size: one sitting   After: T8
Paste this into your coding tool:
---
Goal: The site holds up on phones, keyboards and slow connections.
Read first: docs/shipright/build-rules.md (Interaction and accessibility), docs/shipright/04-frontend-spec.md (Exact acceptance checks).
Check and fix:
1. Screenshots of /, /privacy and 404 at 1280 and 390. No sideways scroll at 320.
2. Keyboard only: reach and send the form; every focus ring visible.
3. 200% zoom: the form stays usable.
4. Lighthouse mobile on /: LCP under 2.5 s, CLS under 0.1.
5. Search the codebase for raw hex values and em dashes in copy.
Do not add: new features or copy.
Done when:
- Each acceptance check in 04-frontend-spec.md has Pass, Fail or Not verified with evidence.
Stop: Do not start the next ticket. Reply with the check table and anything still failing.
---
```

```text
T10. Launch check                         Size: one sitting   After: T9
Paste this into your coding tool:
---
Goal: The owner knows exactly what is left before going live.
Read first: docs/shipright/01-prd.md (Risks and unknowns).
Build:
1. List each open item from 01-prd.md section 8 as Done or Open.
2. Confirm PUBLIC_FORM_ENDPOINT is set in hosting settings, /privacy has the owner's text, and /design is removed or noindex.
Do not: deploy, sign up for services or change DNS. The owner does that.
Done when:
- A short launch list is in docs/shipright/ship-check.md.
Stop: Reply with the list. Do not deploy.
---
```
