# 04 - Frontend specification: SocialGhost beta site

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** 01-prd.md (D1 to D9, all Proposed or delegated). Visual and copy reference: the home preview, saved in the project as `design/home-preview.html`.

## Current phase and allowed screens

**Current phase:** beta recruitment site, release 1.
**Excluded / later notes only:** see 01-prd.md section 4.

| Screen ID | Job | Route | Source |
| --- | --- | --- | --- |
| S1 | Understand the deal, decide, apply | `/` | J1, J2 |
| S2 | Know the application arrived | `/applied` | J2 |
| S3 | Get back from a wrong link | `/404` | J3 |

## Navigation

Top bar on every screen: wordmark "SocialGhost" (link to `/`). S1 desktop also: "The deal" `#deal`, "How the beta works" `#how`, "FAQ" `#faq`, and outline button "Apply" `#apply`. Phone: wordmark and "Apply" only. S2 and S3: wordmark only. Footer on every screen: "SocialGhost", "trysocialghost.com", the same section links (on S2 and S3 they point to `/#deal` and so on). No account, no notifications.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Home

Copy is final unless marked. Write it exactly as in `design/home-preview.html`; that file is the copy source for every string below that is shortened here.

**S1.1 Hero.** Desktop: two columns, copy in columns 1 to 6, illustration in 7 to 12. Below 960: copy first, then illustration.
- H1 (display): "YouTube videos, no face needed." Two lines or fewer at every width.
- Lead (h3 size, 400): "SocialGhost is a live AI tool that makes faceless YouTube videos, and its limited beta is free for testers who send useful feedback within 2 to 3 days."
- Primary button "Apply for the beta" to `#apply`; text link "See the beta deal" to `#deal`. Phone: button full width, link centered below.
- Note (small, muted): "SocialGhost is live now. Places in the beta are limited."
- Illustration: dark 16:9 frame, inline SVG night landscape, dashed presenter outline with label "No one on camera", a play bar with a 38% accent track. `role="img"` with a title. Caption: "Illustration only, not a real SocialGhost video." Signature motion in DESIGN.md.

**S1.2 The deal** `#deal`. Heading column (1 to 4): H2 "The beta deal", muted intro. Definition list (5 to 12) in three columns with a 2px top rule: "You get", "We ask", "Places". Phone: one column.

**S1.3 Who should apply** `#who`. H2, one intro sentence, then two lists side by side: "Apply if" (check icons, 3 items) and "Maybe not yet if" (x icons, 3 items). Phone: stacked.

**S1.4 How the beta works** `#how`. Left (1 to 6): H2 and an ordered list of 5 steps, number then H3 and one line: Apply; We review your application; Make real videos; Send feedback within 2 to 3 days; Use it free. Right (8 to 12): sunken panel "What useful feedback looks like" with four numbered prompts and a muted hint each.

**S1.5 FAQ** `#faq`. H2 "Questions" (1 to 4); five `<details>` (5 to 12): Is it really free? What counts as useful feedback? Is SocialGhost finished? Do I need to show my face? What happens after I apply?

**S1.6 Apply** `#apply`, surface background. Left (1 to 5): H2 "Apply for the beta", one sentence, two check items. Right (7 to 12): the form.

| Field | Label | Rule | Error text |
| --- | --- | --- | --- |
| name | Name | required | "Error: enter your name." |
| email | Email; hint "We send beta access here." | valid email | "Error: enter an email address like name@example.com." |
| channel | YouTube channel link (optional); hint "Leave it blank if you have not started yet." | empty or http(s) URL | "Error: paste the full link, starting with https://" |
| plans | What videos do you want to make with SocialGhost?; hint "One or two sentences: the topic and who watches." | 20+ characters | "Error: tell us a little more, at least one full sentence." |
| commitment | I can try SocialGhost and send feedback within 2 to 3 days of getting access. | checked | "Error: the beta needs this commitment. Tick the box if you can make it." |

Privacy link: **Needs approval before build** (O3). Place it under the button as "How we use your details" linking to the owner's policy. Do not write the policy.

| State / trigger | User sees | Next action / exit |
| --- | --- | --- |
| Pristine | Empty fields, no errors | Fill in |
| Field left invalid (after typing) | Error text under the field, 2px danger border | Fix; error clears on valid input |
| Submit with errors | All errors shown, focus on the first bad field | Fix |
| Submitting | Button "Sending application...", disabled; polite status "Sending your application." | Wait; answers kept |
| Send failed | Alert above the button: "Your application was not sent. Check your connection and try again. Your answers are still here." | Submit again |
| Sent | Go to S2 | |

## S2 Application received (`/applied`)

One column, max 640, centered in the container. Success check icon and H1 (h2 size) "Application received". "Thanks for applying. We will email **{email}** if you are picked for the beta." Without a stored email: "Thanks for applying. We will email you if you are picked for the beta." Then "Typo in your email? [Send the form again](/#apply) with the right one." Text link "Back to the home page". `noindex`. Focus starts on the heading.

## S3 Not found (`/404`)

H1 "Page not found". "This page does not exist. The beta application is on the home page." Primary button "Go to the home page".

## All screens

**Responsive:** columns stack below 960; phone sizes below 760; nothing scrolls sideways at 320 to 1440. Headline stays at 2 lines or fewer.
**Accessibility:** one H1 per page, skip link, labels tied to fields, errors tied by `aria-describedby`, `aria-invalid` on bad fields, focus visible everywhere, targets 44px or larger, reduced motion honored.
**Do not add:** pricing, sign-in, testimonials, counts, logos, newsletter, chat, cookie banner, extra sections.

## Exact acceptance checks

| Check | Status | Evidence / next action |
| --- | --- | --- |
| Every claim on the page comes from the owner's request or a logged decision | Pass (spec) | 01-prd.md D1 to D9 |
| Form, states and S2 work as above | Not verified | T5 |
| Privacy link present before launch | Fail until O3 is supplied | Owner |
