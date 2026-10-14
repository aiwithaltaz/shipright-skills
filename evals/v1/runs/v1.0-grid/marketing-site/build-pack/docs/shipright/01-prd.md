# 01 PRD: SocialGhost beta site

**Version:** 1.0, ShipRight pack 1.0.0. **Status:** Proposed (delegated) unless marked Approved. The owner said "you decide" on the frame.

## Frame

- **Who:** creators who run, or plan to start, a faceless YouTube channel and can test within a short window. Proposed (delegated).
- **Job:** apply for the SocialGhost limited beta.
- **What they do today:** Unknown. Owner to say how testers are found now.
- **This release finishes:** a one-page site at trysocialghost.com that explains the beta terms and collects applications.
- **Stays out:** see "Not in this release".

## Product facts from the owner

- SocialGhost is a live AI tool that makes faceless YouTube videos.
- It is in limited beta.
- Testers get free access if they give useful feedback within 2 to 3 days.
- The site goal is to get serious beta testers to apply.

Nothing else about the product is known. Copy must not claim inputs, outputs, video length, voices, languages, integrations or results.

## Users and jobs

| ID | Visitor | Job | Success check (observable) |
| --- | --- | --- | --- |
| J1 | Faceless-channel creator | Understand what the beta is, what it costs and what is asked | After reading the first screen, a visitor can state: it is free, in return for useful feedback within 2 to 3 days |
| J2 | Same visitor | Apply | A visitor on a phone completes the form in one sitting and sees a clear result |
| J3 | Owner | Receive usable applications | Each application arrives with email, channel or topic, what they want to make, and the feedback-window yes |
| J4 | Casual visitor | Self-select out | The page says who should skip, so weak applications drop |

## Release scope

One page, `/`, with these sections in order: header, hero with beta terms, what SocialGhost is, how the beta works, who should apply, FAQ, apply form, footer. Screens: S1 Home, S2 Apply form and its result states. See `04-frontend-spec.md`.

## Not in this release (notes only, no UI, no routes, no data)

Pricing or plans. Sign-in or tester dashboard. Blog. Testimonials, ratings, logos, user counts. Product screenshots or demo video (none supplied). Waitlist for non-selected people. Newsletter. Analytics. Multiple pages. Application review tool. Privacy, terms or cookie pages until the owner supplies the text. Live chat.

## Core flow: apply

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Lands on `/` | Hero with terms and one Apply button | None | Apply, or read on | Header links reach every section |
| Reads on | Sections in order | None | Jump to form from any section | Nothing to save |
| Opens form | Four questions, labeled | None | Fill in | Leaving loses typed answers. Not saved until sent |
| Submits with a gap | Inline error per field, status line, focus on first | None sent | Fix and resubmit | Answers kept |
| Submits valid | Button busy, "Sending your application..." | Posts to form service | Wait | Double submit blocked |
| Send succeeds | "Application received", email shown, back-to-top link | Owner gets the application | Leave | Page is done |
| Send fails | "Your application was not sent. Your answers are still here. Try again." | None | Retry | Answers kept |

F1 exit, F2 consistency and F3 status are in `build-rules.md`.

## Decision log

| ID | Decision | Status | Source | Replaces |
| --- | --- | --- | --- | --- |
| D1 | Audience is faceless-channel creators who can test in the window | Proposed (delegated) | Q1, "you decide" | none |
| D2 | One page only, apply form on the same page | Proposed (delegated) | Q2 | none |
| D3 | Look: light editorial marketing, one family, deep teal accent | Proposed (delegated) | Q3 | none |
| D4 | Form asks four things: email, channel or topic, what to make, feedback-window yes | Proposed (delegated) | Goal "serious testers" | none |
| D5 | No product imagery. One labeled illustration of a faceless video | Proposed (delegated) | No assets supplied | none |
| D6 | Stack: Astro, Tailwind CSS, static host, hosted form service | Proposed (delegated) | Stack default for marketing sites | none |

## Open questions (owner answers; none block T1 to T7)

| ID | Question | Why it matters | Blocks |
| --- | --- | --- | --- |
| Q-1 | When does the 2 to 3 day clock start: when access is granted, or when they apply? | The terms panel says "within 2 to 3 days" and draws a 3-day bar from access | Copy accuracy |
| Q-2 | Where do testers send feedback (form, email, other)? | Step 4 names the action but no channel | Copy completeness |
| Q-3 | How are testers chosen and how do you reply? | The page says "We email the people we choose" | Copy accuracy |
| Q-4 | Which form service or inbox receives applications? | The form needs an endpoint | T6 (needs account) |
| Q-5 | Privacy notice text, contact email, any terms link | The form collects an email. Legal text is never written by this pack | T8 launch |
| Q-6 | A real screenshot or short demo clip of the tool | Replaces the illustration, adds proof | Optional |
| Q-7 | Number of spots, and whether to state it | The FAQ says it is not listed | Optional |
| Q-8 | Say anything about pricing after the beta? | The FAQ says it is not published | Optional |
| Q-9 | Hosting account and DNS for trysocialghost.com | Needed to go live. Nothing deploys without your OK | T8 launch |
