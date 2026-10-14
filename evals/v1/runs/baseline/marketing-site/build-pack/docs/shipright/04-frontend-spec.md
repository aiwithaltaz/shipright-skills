# 04 - Frontend specification

**Project path:** `docs/shipright/04-frontend-spec.md`
**Version/date:** 0.1, 2026-10-13
**Sources and approval:** R1 founder request; R2 delegation; decisions D1 to D11 in `docs/shipright/01-prd.md`. Visual preview: `index.html` (design preview, not production code).

## Current phase and allowed screens

**Current phase:** P1, Beta recruitment site.
**Excluded / later notes only:** pricing, sign-up/login, dashboard, testimonials, ratings, counts, sample gallery, FAQ, blog, newsletter, chat widget, analytics, social links, cookie banner (no cookies are set). Real samples, product walkthrough and privacy page wait for founder input.

| Screen ID | Job | Actor | Phase | Source |
| --- | --- | --- | --- | --- |
| S1 | Home: understand the beta deal and apply | Visitor / applicant | P1 | R1, D1, D11 |

## Navigation

| Label | Approved destination | Actor / phase | Active treatment |
| --- | --- | --- | --- |
| SocialGhost (wordmark) | `/` top of S1 | Visitor, P1 | None |
| Apply | `#apply` on S1 | Visitor, P1 | None |

Profile/account home: none. No sign-in in P1.
Do not add "Features", "Pricing", "Blog" or "Login" links.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Per-screen specification

**Screen ID / job / source:** S1 Home. Understand the beta deal and send an application. R1, D1, D11.
**Keep/remove/change/add:** Add all elements below. No earlier version exists.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Skip link "Skip to main content" | Keyboard users skip the header | Accessibility floor | Skip link, first in DOM |
| Wordmark "SocialGhost" | Know whose site this is | R1 | Header, left. Text in Space Grotesk 600, links to `/` |
| "Apply" | Jump to the form from anywhere at the top | R1 goal | Header, right. Button (secondary), link to `#apply` |
| Badge "Limited beta" | Know access is limited | R1 | Hero, above h1 |
| h1 "Make faceless YouTube videos with AI." | Know what SocialGhost does | R1 | Hero |
| Lead text (copy deck C1) | Know it is live and access is limited | R1 | Hero, under h1 |
| "Apply for the beta" | Main action | R1 goal | Hero, Button (primary), link to `#apply` |
| Note under button (C2) | Know the deal and commitment before clicking | R1 | Hero, small muted text |
| Illustration | Visual anchor only | D5 | Hero, right column. Decorative inline SVG |
| h2 "How the beta works" + 3 steps (C3) | Understand the deal end to end | R1, D3 | Ordered list, 3 columns at 900px+, stacked below |
| Deal line (C4) | Know what they get | R1 | Under the steps |
| h2 "Apply for the beta" + intro (C5) | Start the application | R1 | Apply section heading |
| "Apply if you" list (C6) | Self-select as a serious tester | R1, D9 | Apply section, left column |
| "Useful feedback is specific" list (C7) | Know what they owe | R1, D9 | Apply section, left column |
| Application form (fields below) | Send an application | R1, D4 | Apply section, right column, panel on surface |
| Footer: wordmark, "trysocialghost.com" | Close the page | R1 | Footer |
| Mobile apply bar | Reach the main action with a thumb | DESIGN.md Placement | Under 900px only, sticky bottom |

**Structure and reading order:** header, hero (badge, h1, lead, button, note, illustration), How the beta works, Apply (criteria, then form), footer. DOM order equals visual order at all widths.
**Sizing and alignment:** container 1120px max. Fields 100% of the form column, max 560px. Text blocks max 65 characters. Steps share a top edge.
**Actions:**
- "Apply" and "Apply for the beta" (page scope): move to `#apply` and focus the h2 of the Apply section (`tabindex="-1"`). No other effect.
- "Send application" (form scope): validates, then sends once to `POST /api/apply`. See states.
**Exit and saved work:** Header and normal scrolling are the exit. Nothing is saved before sending; the page never claims a draft is saved. After sending, the sent state offers "Back to top".

### Form fields

| Field | Control | Required | Hint (visible, linked by `aria-describedby`) | Client check | Error text |
| --- | --- | --- | --- | --- | --- |
| Your name | `input type="text"`, `autocomplete="name"` | Yes | None | Not empty after trim | "Enter your name." |
| Email | `input type="email"`, `autocomplete="email"` | Yes | None. Any line about how the email is used comes from the privacy text (D8). | Not empty; valid format | "Enter your email address." / "Enter an email address like name@example.com." |
| YouTube channel link | `input type="url"`, `autocomplete="url"`, `inputmode="url"` | No | "Leave blank if you have not started a channel yet." | Empty, or starts with http(s):// after adding `https://` to bare domains | "Enter a full link, like https://youtube.com/@yourchannel." |
| What faceless videos do you want to make? | `textarea`, 4 rows, max 1000 characters | Yes | "Topic, format and how often you plan to post." | Not empty after trim | "Tell us what videos you want to make." |
| Commitment | `input type="checkbox"` | Yes | Label: "I can try SocialGhost and send feedback within 2 to 3 days of getting access." | Checked | "Tick this box to apply. The beta needs feedback within 2 to 3 days." |
| Honeypot `website` | text input inside a visually hidden, `aria-hidden` wrapper, `tabindex="-1"`, `autocomplete="off"` | No | None | Not checked on client | None |

Mark only the optional field in its label: "YouTube channel link (optional)". A line above the fields says "All fields are required unless marked optional." Required fields use the `required` attribute. Validate on submit, then live on each change for fields already marked invalid. Do not show errors before the first submit.

### States

| Reachable state / trigger | User sees | System effect | Next action / exit | Evidence needed |
| --- | --- | --- | --- | --- |
| Pristine (load) | Empty fields, "Send application" enabled | None | Fill form | Visual |
| Invalid (submit with problems) | Alert at top of form: "Check 2 answers" (count is real) with links to each field; inline error under each field; red 2px border + error icon in alert | Nothing sent. Focus moves to the alert | Fix fields; links move focus to the field | Keyboard and screen reader run |
| Sending (valid submit) | Button text "Sending application", `aria-disabled="true"`, status "Sending your application." in `role="status"` | One request. Further clicks ignored | Wait | Network throttle test |
| Sent (200) | Form replaced by: check-circle icon, h3 "Application sent", text C8 with the applicant's email, link "Back to top" | Application stored by endpoint | "Back to top" | Real endpoint test |
| Failed: field errors (400) | Same as Invalid, with server messages | Nothing stored | Fix and send again | Endpoint test |
| Failed: too many requests (429) | Alert: "Too many attempts. Wait a few minutes and try again. Your answers are still here." | Nothing stored | Send again later | Endpoint test |
| Failed: network or 500 | Alert: "Your application was not sent. Check your connection and try again. Your answers are still here." Button re-enabled | Nothing stored | Send again | Offline test |
| No endpoint configured (preview only) | Status: "Preview only. No application endpoint is connected, so nothing was sent." | Nothing sent | None | Visual |

Do not show the sent state unless the endpoint returned 200. Do not add a fake progress bar.

**Responsive behavior:**
- 900px and up: hero two columns; steps in 3 columns; Apply section two columns.
- Under 900px: single column in DOM order. Mobile apply bar active.
- Under 600px: 16px gutters; form button full width; h1 at its clamp minimum 2.5rem.
- 320px: no horizontal scroll; wordmark and "Apply" stay on one line (wordmark may shrink to 1.125rem).
**Difficult content:** long names and emails wrap inside the sent message (`overflow-wrap: anywhere`). Textarea grows vertically only. Error alert lists up to 5 links.
**Accessibility:** one h1; h2 per section; form fields with visible labels; hints and errors linked by `aria-describedby`; `aria-invalid="true"` on invalid fields; error summary with `role="alert"` and `tabindex="-1"`, focused after a failed submit; sending status in `role="status"`; sent heading focused after success; illustration `aria-hidden="true"`; focus ring 3px accent with 2px offset on all controls; all targets at least 44px tall; `prefers-reduced-motion` disables smooth scroll; 200% zoom and 320px reflow without loss.

### Copy deck

- **C1:** "SocialGhost is live and in limited beta. We are looking for serious testers."
- **C2:** "Free access for testers who send useful feedback within 2 to 3 days."
- **C3 steps:**
  1. "Apply" / "Tell us what faceless videos you make or plan to make."
  2. "Get access if selected" / "We read applications and email access to the testers we pick."
  3. "Test and send feedback" / "Make videos with SocialGhost. Send us useful feedback within 2 to 3 days of getting access."
- **C4:** "In return, you get free access to SocialGhost." (Duration Unknown, D7. Do not add "forever", "lifetime" or a number of months.)
- **C5:** "Places are limited. Tell us a little about you and your videos."
- **C6 Apply if you:** "make faceless YouTube videos, or plan to start soon"; "can try SocialGhost in the days after you get access"; "will tell us plainly what worked and what did not".
- **C7 Useful feedback is specific:** "what you tried to make"; "where you got stuck, or where the video missed"; "what you would change first".
- **C8 sent:** "Thanks, {name}. If you are selected, we will email access to {email}."
- **Meta title:** "SocialGhost beta: make faceless YouTube videos with AI"
- **Meta description:** "SocialGhost is a live AI tool that makes faceless YouTube videos. Apply for the limited beta. Testers get free access for useful feedback within 2 to 3 days."

Words to avoid: seamless, unlock, revolutionary, game-changing, viral, effortless, "in seconds", any claim of speed, quality, earnings or views.

## Design system

**Mode:** Establish, under delegation (D6).
**Source:** `DESIGN.md` at the project root. Use its CSS variables only. No other colors, fonts, radii or shadows.

## Exact acceptance checks

| Feedback/source | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| R1 beta deal | Hero states limited beta, free access, useful feedback within 2 to 3 days | Pass (spec and preview copy) | Recheck in build |
| R1 goal | Only one primary-styled button visible per area; all CTAs lead to `#apply` | Pass (spec) | Recheck in build at desktop and 375px |
| R1 live | No "coming soon", "waitlist" or "launching" wording | Pass (spec) | Text search in build |
| D2 | No feature, step, format or output claim beyond the supplied description | Pass (spec) | Copy review in build |
| D5 | No testimonials, ratings, counts, logos or fake screenshots | Pass (spec) | Visual review in build |
| D3 | No reply-time promise anywhere | Pass (spec) | Text search in build |
| D4 | Sent state shows only after a 200 from `/api/apply` | Not verified | Endpoint test with success, 400, 429, 500 and offline |
| D4 | Double click on "Send application" sends one request | Not verified | Network log in build |
| D4 | Applicant data never appears in a URL or analytics | Not verified | Network log in build |
| D8 | Privacy link next to the form and in the footer | Fail | Blocked on founder text. Launch blocker |

## Pre-flight (specification stage)

| # | Gate | Status | Evidence / next action |
| --- | --- | --- | --- |
| 1 | Screen context | Pass | S1 job, phase P1, sources R1/R2, decisions logged |
| 2 | Design direction | Pass | Delegated system in DESIGN.md; no invented logo |
| 3 | Hierarchy | Pass | One primary action; supporting sections lead to the form |
| 4 | States | Pass (spec) / Not verified (runtime) | All form states above; endpoint not built |
| 5 | Integrity and consistency | Pass (spec) | Copy limited to supplied facts; one button pattern; one label per action ("Apply for the beta", "Send application") |
| 6 | Navigation | Pass (spec) | In-page anchors, sent state has "Back to top" |
| 7 | Accessibility | Pass (spec) / Not verified (runtime) | Criteria above; no keyboard or screen reader run yet |
| 8 | Motion | Not applicable | No motion approved (D10); reduced-motion turns off smooth scroll |
| 9 | Content and density | Pass (spec) / Not verified (render) | Wrap rules set; rendered fit not inspected |
| 10 | Handoff | Pass | Version 0.1, decisions, exclusions and next stage listed |

**Verdict:** Ready for build of S1 and `/api/apply`. Launch: Needs decision (D4 provider, D7, D8). The privacy link check is Fail until D8 is supplied.

## Handoff limits

Reserved for the founder: D2 product facts, D4 storage and notification tool, D7 free access terms, D8 privacy text.
The `index.html` preview shows layout and copy. It does not prove keyboard order, screen reader output, sending or storage.
Exported project paths are rooted at the app. This document requires no pack-local skills/ tree.
