# 04 - Frontend specification: trysocialghost.com

**Version/date:** 1.0, 2026-10-13. **Sources:** 01-prd.md (D1 to D3, delegated). **System:** `DESIGN.md`, `design/tokens.css`.
**Reference page:** the home page preview `index.html` sent with this pack. Save it as `docs/shipright/reference-home.html`. Match its layout, copy and motion; this spec wins if they differ.

| Screen | Route | Job |
| --- | --- | --- |
| S1 Home | `/` | Understand the deal and apply |
| S2 Not found | `/404` | Get back to the home page |
| D1 Design preview | `/design` | Owner checks the look (T1) |

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Home

The page is an argument. Each section makes one claim with real proof:

| Section | Claim | Proof |
| --- | --- | --- |
| Hero | It makes faceless YouTube videos, it is live, testers use it free | Owner's facts, plus a labeled illustration of the video type |
| `#how` | The deal is simple and fast | The four real steps |
| `#fit` | We want people who will actually use it | Plain fit and not-fit lists |
| `#feedback` | We know what useful feedback means | The questions we want answered |
| `#faq` | Objections: cost, channel, time, next step, readiness | Answers from known facts only |
| `#apply` | Apply now | The form and the one deciding fact |

**Header** (sticky, 64 tall): text wordmark "SocialGhost" (links to top); right: links "How it works" (`#how`), "FAQ" (`#faq`), secondary button "Apply" (`#apply`). Under 760px: wordmark and "Apply" only. Skip link "Skip to content" first in tab order.

**Hero** (two columns at 1024+, text 5 of 12, frame 7 of 12; stacked below, text first):
- H1: "Make faceless YouTube videos" (2 lines at every width).
- Lead: "SocialGhost is a live AI tool that makes faceless YouTube videos. It is in limited beta. Testers get free access in return for useful feedback within 2 to 3 days."
- Primary button "Apply for the beta" (`#apply`), then text link "How the beta works" (`#how`). Phone: button full width, link below.
- Meta line: "Five questions. Free for testers we pick."
- Video frame, 16:9, radius 12: night scene of flat SVG layers (moon, three hill layers), caption box near the bottom, player bar with progress line, timecode in Geist Mono "0:00 / 0:09", and one player button labeled Pause while playing, Play when paused and Replay at the end (the 9 s play is longer than 5 s, so it must be pausable). Caption lines, one at a time: "No face on camera." / "Just the story, the visuals and the words." / "This is a faceless video."
- Figure caption (meta): "Illustration of a faceless video, made for this page. Not SocialGhost output."

**`#how` "How the beta works"**: ordered list, 4 columns at 1024+, 2 at 760, 1 on phone, joined by a 1px line.
1. **Apply.** Answer five questions about your channel and your plans.
2. **We pick testers.** Places are limited. We choose people who can use it right away.
3. **Make real videos.** If you are picked, we email you access. Use SocialGhost for your own channel.
4. **Send feedback within 2 to 3 days.** That is the deal for free access.

**`#fit` "Who we are looking for"**: H2 and "The beta works when testers make real videos and tell us what happened." in the left 4 columns; two lists side by side in the right 8 (all stacked under 760). Check icon for fit, minus icon for not.
- "A good fit": "You run a faceless YouTube channel, or you are about to start one." / "You can make at least one real video in your first 2 to 3 days." / "You will tell us plainly what worked, what broke and what was slow."
- "Not a fit yet": "You want to look around but have no time this week." / "You do not plan to publish on YouTube." / "You would rather not send feedback."

**`#feedback` "What useful feedback looks like"** (sunken band, full width): left H2 and "Short and specific beats long and polite. Good feedback answers these four questions." Right: ordered list in 20px: "What video were you trying to make?" / "Where did you get stuck or slow down?" / "Would you post the result as it is? Why or why not?" / "What would make you use it every week?"

**`#faq` "Questions"**: native `details`, all closed, single column, max 760:
- "What does it cost?" "Nothing for testers we pick. Free access is the deal, in return for useful feedback within 2 to 3 days."
- "Do I need a YouTube channel already?" "No. If you are about to start one, say so in the form and tell us what it will cover."
- "How much time does it take?" "Enough to make at least one real video and tell us how it went, within 2 to 3 days of getting access."
- "What happens after I apply?" "We read the applications and pick testers. If you are picked, we email you access."
- "Is SocialGhost ready to use?" "Yes. It is live. Access is limited during the beta."

**`#apply` "Apply for the beta"**: two columns at 1024+ (left 5: H2, "It is free. The only cost is 2 to 3 days of honest feedback.", "If you are picked, we email you access."; right 7: form panel, white, 1px border, radius 12). Stacked on phone.

| Field | Label | Help | Error |
| --- | --- | --- | --- |
| `email` | Email | We send access here if you are picked. | Enter an email address like name@example.com. |
| `channel_url` (optional) | YouTube channel link (optional) | Leave it empty if you have not started yet. | Paste the full link, starting with https:// |
| `topic` | What will your videos be about? | Example: short history stories | Tell us what your videos will be about. |
| `planned_videos` | How many videos do you plan to make in your first 3 days? (radios: 1, 2 to 3, 4 or more) | | Pick how many videos you plan to make. |
| `feedback_commitment` | I can send useful feedback within 2 to 3 days of getting access. | | Tick this box to apply. Feedback within 2 to 3 days is the deal for free access. |

Submit: primary "Apply for the beta", full width in the panel.

| State | User sees | Next action |
| --- | --- | --- |
| Pristine | Empty fields, no errors | Fill in |
| Invalid on submit | Errors under fields, focus on the first invalid field. Errors also show on leaving a touched field | Fix |
| Submitting | Button "Sending...", disabled, `aria-busy="true"` | Wait |
| Sent | Panel replaced by H3 "Application sent", "If you are picked, we email access to {email}.", link "Back to top". Focus moves to the H3 | Leave |
| Failed | Under the button, danger text with alert icon: "Your application did not send. Your answers are still here. Try again." Button returns to "Apply for the beta" | Submit again |

**Footer**: wordmark, "A live AI tool for faceless YouTube videos. In limited beta.", links How it works, FAQ, Apply. Privacy policy link added in T9 once supplied (PRD O1). No copyright line or contact until supplied.

**Responsive:** design at 1280 and 390. Nothing scrolls sideways at 320. The video frame keeps 16:9 and full column width. Tap targets 44+.
**Accessibility:** one H1; H2 per section; the video frame is a `figure` with a `figcaption`; the scene SVG is `aria-hidden`; caption lines are plain text, not a live region; Replay is a real button. Status uses `role="status"`; the failed message uses `role="alert"`.
**Do not add:** testimonials, logos, counts, pricing, newsletter, chat bubble, sign-in, a video gallery, cookie banner (no cookies are set).

**Acceptance checks**
- Headline is two lines or fewer at 390 and 1280.
- Exactly one filled button visible in the hero view and in the apply view.
- Every copy line above appears verbatim; no claim beyond the PRD facts.
- Form completes by keyboard alone; errors are read with their fields.
- Double clicking submit sends one request.
- Reduced motion shows the final frame and all content, with no player button.

## S2 Not found

H1 "This page does not exist." Body "The link may be old or mistyped." Primary "Go to the home page" (`/`). Same header and footer.

## D1 Design preview

Built in T1: colors with contrast values, type sizes, spacing scale, primary, secondary and text buttons in default, hover, focus and busy, a text field in default, focus and error, radio group, checkbox, the video frame. `noindex`.
