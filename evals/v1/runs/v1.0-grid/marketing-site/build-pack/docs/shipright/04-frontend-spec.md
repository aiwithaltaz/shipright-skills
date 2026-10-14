# 04 Frontend specification: SocialGhost beta site

**Version:** 1.0 (ShipRight 1.0.0). **Status:** Proposed (delegated). **Visual reference:** `design/reference/home.html`. Match its structure and copy. Rebuild it in Astro and Tailwind with tokens from `design/tokens.css`. Do not copy its inline style block.

## Current phase and allowed screens

**Current phase:** release 1, beta application page. **Excluded / later notes only:** see `01-prd.md`, "Not in this release".

| Screen ID | Job | Actor | Phase | Source |
| --- | --- | --- | --- | --- |
| S1 | Explain the beta and its terms | Visitor | 1 | Owner request, J1, J4 |
| S2 | Collect an application and show its result | Visitor | 1 | Owner request, J2, J3 |

## Navigation

| Label | Destination | Active treatment |
| --- | --- | --- |
| SocialGhost (wordmark) | `#top` | none |
| How the beta works (desktop only) | `#how` | none |
| FAQ (desktop only) | `#faq` | none |
| Apply (text link, accent, underlined) | `#apply` | none |

No profile, no notifications.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Home

**Job:** a visitor learns what SocialGhost is, what the beta costs and what is asked, then applies or leaves. New page.

| Region | Claim and proof | Layout |
| --- | --- | --- |
| Header | Wordmark text | Wordmark left, 3 text links right (1 on phone) |
| Hero | Free in beta for useful feedback. Proof: owner's terms | Left: h1 "Make faceless YouTube videos. Free in beta.", one sentence, filled "Apply for the beta", link "See how the beta works", note "Four short questions. No account needed to apply." Right (5 cols): "Beta terms" panel, four rows, 3-day bar. Copy first on phone |
| `#what` | It is live. Proof: owner statement, labeled drawing | Text 5 cols, drawing 7 cols, caption "Illustration of a faceless video. Not a screenshot of SocialGhost." |
| `#how` | Four steps, last decides free access | Numbered list 7 cols, tinted "What useful feedback includes" panel 4 cols |
| `#who` | Self-select | Two ruled columns: "Apply if", "Skip this beta if" |
| `#faq` | Objections, known facts only | h2 left, six native `details` right |
| `#apply` | Apply now | See S2 |
| Footer | Who and where | "SocialGhost · trysocialghost.com", "Limited beta" |

Copy is in the reference file. Do not reword product claims. **States:** static. The terms bar animates once and is full under reduced motion. **F1:** anchors reach every section. **F2:** one wording, "Apply for the beta". **F3:** no status here. **Responsive:** one column below 761px, same order. **Accessibility:** one `h1`, an `h2` per section, skip link, text alternative on the bar. **Do not add:** badges, icon cards, logos, testimonials, counters, pricing, video, chat, cookie banner. **Acceptance:** at 1280 the first screen shows h1, sentence, Apply button and the terms rows. At 390 it shows h1, sentence and Apply button, and the terms follow.

## S2 Apply form and result

**Job:** collect four answers and report the result truthfully. Inside `#apply`: heading and one fact left (5 cols), form panel right (6 cols).

| Field | Label | Type and rule |
| --- | --- | --- |
| email | Email | `email`, `autocomplete="email"`, required, valid shape |
| channel | Your YouTube channel, or the channel you want to start | text, hint "Paste a link, or describe the topic in a few words.", required |
| make | What do you want to make with SocialGhost? | textarea, max 600, hint "Two or three sentences is enough.", required |
| window | I can try SocialGhost and send useful feedback within 2 to 3 days. | checkbox, required |
| company | hidden honeypot | If filled, send nothing |

| State | User sees | System effect | Next action |
| --- | --- | --- | --- |
| Pristine | Empty form | None | Fill in |
| Invalid | Red text under the field, 2px border, status "Fix the highlighted answers and try again." Focus on first invalid field | None | Fix |
| Submitting | Button disabled, `aria-busy`, "Sending your application..." | POST JSON to `PUBLIC_FORM_ENDPOINT` | Wait |
| Success | "Application received", "If we pick you for the beta, we will email you at (email).", link "Back to the top". Focus moves to the block | Owner receives it | Leave |
| Failure | Form stays, "Your application was not sent. Your answers are still here. Try again." | None | Retry |
| No endpoint (dev) | "This preview is not connected to a form service, so nothing was sent. Your answers are still here." | None | n/a |

**F1:** answers are not saved before send. **F3:** never show success before a 2xx response. **Do not add:** extra fields, newsletter opt-in, account, upload, CAPTCHA. **Accessibility:** visible labels, `aria-describedby` errors, `role="status"`. **Acceptance:** with the endpoint off, nothing claims success and answers stay.

## Open decisions

Q-1 to Q-9 in `01-prd.md`. Q-1, Q-2 and Q-3 affect the terms bar, step 2 and step 4.
