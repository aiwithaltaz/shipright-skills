# 05 Feature ticket list: SocialGhost beta site

**Version:** 1.0 (ShipRight 1.0.0). Paste one ticket at a time into Cursor. Run in order. Standing rules are in `docs/shipright/build-rules.md`, so tickets link to them. Reference page: `design/reference/home.html`.

| Ticket | Title | After |
| --- | --- | --- |
| T1 | Foundation and /design preview | none |
| T2 | Shell: head, header, footer | T1 |
| T3 | Hero and beta terms | T2 |
| T4 | What it is and How the beta works | T3 |
| T5 | Who should apply and FAQ | T4 |
| T6 | Apply form | T5 |
| T7 | QA pass | T6 |
| T8 | Launch check | T7 |

---

**T1. Foundation and /design preview** Size: one sitting. After: none.
Paste this into your coding tool:
```text
Goal: A running Astro + Tailwind project whose look the owner can approve on /design.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css, docs/shipright/02-technical-architecture.md.
Build:
1. Create an Astro static project with Tailwind CSS. Keep design/tokens.css as the source and map the Tailwind theme to its names.
2. Self-host Instrument Sans (400, 500, 600, 700) with Fontsource. font-display: swap.
3. Base styles from the reference: body, headings, links, focus ring, skip-link style, reduced-motion rule.
4. Components: Button, Text link, Panel, Text field, Textarea, Checkbox, Accordion item. Props only for what DESIGN.md lists.
5. Route /design (dev only, noindex, excluded from build) showing type scale, color swatches with names, spacing, each component in each state.
Do not add: pages, icons, animation libraries, analytics, a CMS.
Done when:
- npm run dev serves /design; npm run build succeeds and has no /design.
- No raw hex values outside design/tokens.css.
- Every component shows default, hover, focus, disabled and invalid where DESIGN.md lists them.
Stop: Do not start T2. Reply with changed files and decisions. Owner approves the look first.
```

**T2. Shell: head, header, footer** Size: one sitting. After: T1.
```text
Goal: Page frame at / with correct head, header and footer.
Read first: docs/shipright/build-rules.md, DESIGN.md, 04-frontend-spec.md (Navigation, S1 Header and Footer).
Build:
1. Layout with lang="en", title "SocialGhost beta: free access for useful feedback", the meta description from design/reference/home.html, canonical https://trysocialghost.com/, no og:image.
2. Skip link to #main. Header: wordmark text "SocialGhost" left; links "How the beta works" (#how), "FAQ" (#faq), "Apply" (#apply). The first two hide below 761px.
3. Footer: "SocialGhost · trysocialghost.com" and "Limited beta".
4. Empty <main id="main"> with section anchors #top, #what, #how, #who, #faq, #apply.
Do not add: logo image, legal links, social icons, cookie banner.
Done when:
- Tab order: skip link, wordmark, links. Focus visible. 44px targets.
- No horizontal scroll at 390px and 1280px.
Stop: Do not start T3. Reply with changed files and how you checked.
```

**T3. Hero and beta terms** Size: one sitting. After: T2.
```text
Goal: First screen answers what it is, who it is for and what it costs.
Read first: docs/shipright/build-rules.md, DESIGN.md, 04-frontend-spec.md (S1 Hero), design/reference/home.html (hero and .terms).
Build:
1. h1 "Make faceless YouTube videos. Free in beta." sentence "SocialGhost is a live AI tool in limited beta, and testers get free access for useful feedback within 2 to 3 days."
2. Filled button "Apply for the beta" to #apply, text link "See how the beta works" to #how, note "Four short questions. No account needed to apply."
3. "Beta terms" panel: rows Cost to you / Free access; What we ask / Useful feedback within 2 to 3 days; Who / Serious testers. Spots are limited.; Status / SocialGhost is live now.
4. 3-day bar: "Use SocialGhost" (2/3), "Feedback due" (1/3), labels Day 1, Day 2, Day 3. The accent part fills once on load from 30% to 100%, 900 ms, transform only. Text alternative on the bar.
Do not add: badge above h1, second filled button, imagery, stats.
Done when:
- h1 is two lines or fewer at 390px and 1280px.
- Reduced motion: bar shows full, no animation. Text visible at first paint.
- Terms panel sits below the copy on phone.
Stop: Do not start T4. Reply with changed files and how you checked.
```

**T4. What it is and How the beta works** Size: one sitting. After: T3.
```text
Goal: Explain the product and the four beta steps with real terms only.
Read first: docs/shipright/build-rules.md, 04-frontend-spec.md (#what, #how), design/reference/home.html.
Build:
1. #what: h2 "A live tool that makes faceless YouTube videos", two paragraphs from the reference, the inline SVG drawing with its caption "Illustration of a faceless video. Not a screenshot of SocialGhost." and a role="img" label.
2. #how: h2 "How the beta works", intro "Four steps. The last one decides whether access stays free." Ordered list: Apply; We pick testers; Make videos; Send feedback (copy from reference).
3. Panel "What useful feedback includes" with the five lines from the reference.
Do not add: invented UI screenshot, feature list, icons, step numbers outside the ordered list.
Done when:
- Sections stack in reading order at 390px, no overflow.
- Numbers come from the list counter, not typed text.
Stop: Do not start T5. Reply with changed files and how you checked.
```

**T5. Who should apply and FAQ** Size: one sitting. After: T4.
```text
Goal: Visitors can self-select and get honest answers.
Read first: docs/shipright/build-rules.md, 04-frontend-spec.md (#who, #faq), design/reference/home.html.
Build:
1. #who: h2 "Apply if you will use it and report back"; two ruled columns "Apply if" and "Skip this beta if" with three lines each from the reference.
2. #faq: h2 "Questions before you apply"; six native details elements with the questions and answers from the reference, all closed, answers in the DOM.
Do not add: new questions, pricing, spot counts, testimonials, JavaScript.
Done when:
- Enter and Space toggle each item; focus visible; target 56px tall.
- Answers read in full with items open at 390px.
Stop: Do not start T6. Reply with changed files and how you checked.
```

**T6. Apply form** Size: one sitting. After: T5.
```text
Goal: A visitor applies and sees a truthful result.
Read first: docs/shipright/build-rules.md, 04-frontend-spec.md (S2), docs/shipright/02-technical-architecture.md.
Build:
1. #apply band with h2 "Apply for the beta", line "Free access if you send useful feedback within 2 to 3 days.", and the form from S2 (four fields, honeypot).
2. Read PUBLIC_FORM_ENDPOINT at build time into data-endpoint. Post JSON {email, channel, make, feedback_window_ok}. Under 5 KB of JavaScript.
3. All states in S2 with the exact copy. Block double submit. Keep answers on failure.
4. If the endpoint is empty, show the dev status text and send nothing.
Do not add: extra fields, account, newsletter, CAPTCHA, analytics.
Done when:
- Empty submit shows four inline errors and focus on Email.
- Endpoint off: failure copy, answers kept. Endpoint on: success block and focus move.
- Keyboard-only completion works at 390px.
Stop: Do not start T7. Reply with changed files, the service you wired (ask the owner first), and how you checked.
```

**T7. QA pass** Size: one sitting. After: T6.
```text
Goal: Prove the build meets the rules.
Read first: docs/shipright/build-rules.md, DESIGN.md.
Check and fix, at 390 and 1280 wide:
1. No horizontal scroll. Contrast of every text pair. Focus visible on every control. Targets 44px.
2. Keyboard path from skip link to submit. Reduced motion on.
3. Page is complete with JavaScript off, except the form.
4. Lighthouse or equivalent: LCP under 2.5 s, CLS under 0.1.
Do not add: features. Fix defects only.
Done when: a table of checks with Pass, Fail or Not verified and evidence. No Fail remains.
Stop: Reply with the table.
```

**T8. Launch check** Size: one sitting. After: T7.
```text
Goal: List what must exist before going live. Do not deploy.
Read first: docs/shipright/01-prd.md (Open questions Q-1 to Q-9).
Do: list each open question with its owner status. Confirm the endpoint, privacy text, contact and domain are supplied by the owner, not invented.
Do not: deploy, buy, configure DNS or publish.
Done when: a list the owner can answer. Stop: Reply with the list and wait for the owner's OK.
```
