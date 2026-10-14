# 05 - Feature tickets: SocialGhost beta site

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** 01-prd.md, 04-frontend-spec.md. Paste one ticket at a time into Cursor. Each one ends with a report and stops.

## Order

| ID | Ticket | Screen or capability | After |
| --- | --- | --- | --- |
| T1 | Foundation and /design preview | Tokens, base styles | none |
| T2 | Shell, Not found page | Layout, header, footer, S3 | T1 |
| T3 | Home: hero and the deal | S1.1, S1.2 | T2 |
| T4 | Home: who, how, FAQ | S1.3 to S1.5 | T3 |
| T5 | Application form and Application received | S1.6, S2 | T4 |
| T6 | Signature motion | S1.1 | T5 |
| T7 | QA pass | All | T6 |
| T8 | Privacy link and launch handoff | S1.6 | T7, owner's policy URL |

## Tickets

```text
T1. Foundation and /design preview        Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The project runs locally and the owner can check the look on /design before any page is built.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css, docs/shipright/02-technical-architecture.md.
Build:
1. Create an Astro project (current stable, TypeScript, static output) in this folder. Add Tailwind CSS (current stable).
2. Import design/tokens.css globally. Expose the tokens to Tailwind as theme values so utilities use them (colors, font, spacing, radius).
3. Load Instrument Sans 400, 500, 600, 700 (Google Fonts or @fontsource).
4. Base styles: body uses --color-bg, --color-text, --text-body, line height 1.55. Global focus ring: 2px --color-accent, 2px offset.
5. Route /design (noindex, not linked): every type size with its token name, every color swatch with name and hex, the spacing scale as bars, the primary button (default, hover, busy "Sending application..."), the outline button, a text link, a text field in default, focus and invalid states with error text, a checkbox, one FAQ disclosure.
6. Add .cursor/rules/shipright.mdc if missing: "Read docs/shipright/build-rules.md before any change."
Do not add: any other page, a component library, analytics.
Done when:
- npm run dev serves /design with no console errors.
- /design has no sideways scroll at 390px and 1280px.
- No hex or px values outside design/tokens.css.
Stop: Do not start T2. Reply with changed files, any decision you made, and how you checked. Ask the owner to OK the look.
---
```

```text
T2. Shell and Not found page               Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: Every page shares one header, footer and skip link, and a wrong link lands on a useful page.
Read first: docs/shipright/build-rules.md, DESIGN.md (Placement), docs/shipright/04-frontend-spec.md (Navigation, S3).
Build:
1. src/layouts/Base.astro: lang="en", title and description props, Open Graph title and description, skip link "Skip to content" to #main.
2. Header: wordmark "SocialGhost" links to /. Prop showSections: on / it shows "The deal", "How the beta works", "FAQ" (hidden under 760px) and the outline "Apply" button to #apply.
3. Footer: "SocialGhost", "trysocialghost.com", links to /#deal, /#how, /#faq, /#apply.
4. src/pages/404.astro (S3): H1 "Page not found", "This page does not exist. The beta application is on the home page.", primary button "Go to the home page".
5. src/pages/index.astro: empty main for now, title "SocialGhost beta: faceless YouTube videos made with AI".
Do not add: a hamburger menu, sign-in, social icons, a logo image.
Done when:
- Tab from the top reaches the skip link first, then the wordmark.
- /404 and / render at 390px and 1280px with no sideways scroll.
Stop: Do not start T3. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T3. Home: hero and the deal                Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: A visitor sees what SocialGhost is, the beta offer and the Apply button in the first screen.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/04-frontend-spec.md (S1.1, S1.2), design/home-preview.html (copy and SVG).
Build:
1. src/components/Hero.astro: copy exactly as the preview. Two columns from 960px; stacked below. Phone: button full width, link centered below it.
2. src/components/FacelessFrame.astro: copy the preview's inline SVG and play bar. Use media tokens. role="img" with its title. Caption "Illustration only, not a real SocialGhost video." No animation yet.
3. src/components/Deal.astro (#deal): heading column plus a <dl> with "You get", "We ask", "Places", 2px top rule, three columns, one under 760px.
States: none apply (static content).
Do not add: badges, labels above the headline, a fake app screenshot, numbers, gradients.
Done when:
- The headline is 2 lines or fewer at 320, 390, 960 and 1280px.
- "Apply for the beta" is visible without scrolling at 390 by 844 and 1280 by 800.
- Text matches the preview word for word.
Stop: Do not start T4. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T4. Home: who, how, FAQ                    Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: A visitor can judge if they fit, see the beta steps and the feedback standard, and get answers to common doubts.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S1.3 to S1.5), design/home-preview.html.
Build:
1. Who.astro (#who): two lists with inline line icons (check, x) at 20px, aria-hidden. Headings "Apply if" and "Maybe not yet if".
2. How.astro (#how): an <ol> of 5 steps with tabular numbers, and the sunken panel "What useful feedback looks like" with 4 prompts. Two columns from 960px.
3. Faq.astro (#faq): five native <details>, plus icon turns 45 degrees when open (--dur-menu).
Copy exactly as the preview. Each section separated by a 1px top border and --space-section padding.
Do not add: icon cards, testimonials, a pricing question, answers the spec does not contain.
Done when:
- FAQ items open and close with Enter and Space; focus ring visible.
- Each section looks different from its neighbor at 1280px.
- No sideways scroll at 320px.
Stop: Do not start T5. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T5. Application form and Application received   Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: A creator applies in under 2 minutes, sees clear errors, and lands on a confirmation that shows their email.
Read first: docs/shipright/build-rules.md, docs/shipright/02-technical-architecture.md (Data, Submission flow), docs/shipright/04-frontend-spec.md (S1.6, S2).
Build:
1. Apply.astro (#apply): left copy, right form name="beta-application", method POST, action="/applied", data-netlify="true", netlify-honeypot="company", hidden form-name input, hidden honeypot.
2. Five fields with labels, hints, autocomplete and error texts exactly as the spec table.
3. Small script: validate on blur after typing and on submit, focus first bad field; disable button with "Sending application..."; POST url-encoded to "/"; on 2xx save email to sessionStorage "sg-applied-email" and go to /applied; otherwise show the alert and keep answers.
4. src/pages/applied.astro (S2, noindex): copy from the spec; read and then remove the stored email.
Do not add: extra fields, a privacy text you write yourself, a newsletter checkbox, a redirect with the email in the URL.
Done when:
- Without JavaScript, the form still posts and lands on /applied.
- Double-clicking submit sends once.
- Offline submit shows the alert and keeps every answer.
- Keyboard alone can complete the form.
Stop: Do not start T6. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T6. Signature motion                       Size: one sitting   After: T5
Paste this into your coding tool:
---
Goal: The hero illustration shows "no one on camera" once, and reduced-motion users see the same end state.
Read first: DESIGN.md (Motion), design/home-preview.html (the .presenter rules).
Build:
1. In FacelessFrame.astro, animate only the dashed presenter group: opacity 1 to 0.14, translateY 0 to -8px, delay 700ms, --dur-signature, --ease-out, runs once.
2. Under prefers-reduced-motion: reduce, no animation; opacity 0.14.
Do not add: GSAP, Lenis, scroll animations, looping motion, section entrance effects.
Done when:
- The label "No one on camera" is visible at load in both modes.
- With reduced motion on, nothing moves.
Stop: Do not start T7. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T7. QA pass                                Size: one sitting   After: T6
Paste this into your coding tool:
---
Goal: The site meets build-rules.md at phone and desktop widths before launch.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md.
Build:
1. Check /, /applied, /404 and /design at 320, 390, 960 and 1280px for sideways scroll, clipped text and overlaps.
2. Keyboard-only: skip link, every link, every FAQ item, the whole form, error focus.
3. Measure contrast of every text pair actually rendered. Check 200% zoom.
4. Run Lighthouse on / (mobile). Fix anything over the budgets in 02-technical-architecture.md.
5. Search the code for raw hex or px values outside tokens.css and replace them.
Do not add: new features or copy.
Done when:
- A short report lists each check as Pass, Fail or Not verified, with what you did.
Stop: Do not start T8. Reply with the report and changed files.
---
```

```text
T8. Privacy link and launch handoff        Size: one sitting   After: T7 and the owner's privacy policy URL
Paste this into your coding tool:
---
Goal: The form shows the owner's privacy policy link, and the owner has a checklist to go live.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S1.6).
Blocked until: the owner gives the privacy policy URL (O3). Do not write a policy.
Build:
1. Under the submit button add the link "How we use your details" to the owner's URL.
2. Write docs/shipright/ship-check.md as a checklist for the owner: connect the repo to Netlify, point trysocialghost.com at it, confirm the form appears in Netlify Forms, turn on email notifications, send 3 test applications, confirm all fields arrive.
Do not: deploy, sign up, or change DNS yourself.
Done when:
- The link opens the policy in the same tab and is reachable by keyboard.
Stop: Reply with changed files and the checklist.
---
```
