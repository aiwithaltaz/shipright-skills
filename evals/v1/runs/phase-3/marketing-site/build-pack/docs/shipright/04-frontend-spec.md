# 04 - Frontend specification: SocialGhost beta site

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** 01-prd.md (D1 to D7, Proposed delegated). Reference build: `index.html` home page preview from the same date.

## Current phase and allowed screens

**Current phase:** Beta recruitment site, version 1.
**Excluded / later notes only:** see 01-prd.md section 4.

| Screen ID | Job | Actor | Route | Source |
| --- | --- | --- | --- | --- |
| S1 | Understand the beta and apply (J1, J2) | Visitor | `/` | Owner request, D2 |
| S2 | Read how personal details are handled (J3) | Visitor | `/privacy` | Required by the form. Text from owner. |
| S3 | Recover from a wrong address | Visitor | 404 | Site hygiene |

## Navigation

| Label | Destination | Notes |
| --- | --- | --- |
| SocialGhost (wordmark) | `/#top` | Text wordmark. Logo Unknown. |
| How it works | `/#how` | Hidden under 760px; the page is one scroll. |
| Who it's for | `/#who` | Hidden under 760px |
| FAQ | `/#faq` | Hidden under 760px |
| Apply | `/#apply` | Secondary button. Always visible. |

Header is not sticky. On S2 and S3 the same header links point to `/#...`.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Home

Argument, one line per section: (1) It makes faceless YouTube videos, and it is live: proof is the owner's statement and the drawn frame. (2) The deal is free access for feedback in 2 to 3 days: proof is the terms. (3) It is for people who will use it this week: proof is the fit lists. (4) Objections answered: FAQ. (5) Apply.
Reading order = DOM order: header, S1.1 to S1.5, footer. One filled button per view.

### S1.1 Hero

| Element | Copy / content | Component |
| --- | --- | --- |
| H1 | "Faceless YouTube videos by AI." | 64/600, 38 on phone, max two lines at every width |
| Lead | "SocialGhost is live and in a limited beta. Testers get free access in return for useful feedback within 2 to 3 days." | Body 18 |
| Primary | "Apply for the beta" | Primary button to `#apply`; moves focus to the Apply heading |
| Text link | "How the beta works" | Link to `#how` |
| Figure | Inline SVG video frame, 16:9, stage tokens. Caption: "A faceless video: no presenter on camera." | `role="img"` with a title |

Layout: 6 columns copy, 6 columns figure, centered vertically. Under 900px: copy, then figure. Under 640px: the button is full width.
Motion: see DESIGN.md Motion. Reduced motion shows the final frame.

### S1.2 How the beta works (`#how`, sunken band)

H2 "How the beta works". Deal line (20/500): "Free access, in return for useful feedback within 2 to 3 days of getting access."
Ordered list of four steps, numbered discs joined by a line on desktop:
1. **Apply.** "Answer six short questions at the end of this page."
2. **Get picked.** "The beta is limited. We email the testers we pick."
3. **Make a real video.** "Use SocialGhost free on a video you actually want to make."
4. **Send feedback.** "Tell us how it went within 2 to 3 days of getting access."

Below a divider: H3 "What useful feedback covers", note "Short and honest beats long and polite.", then a two-column list (D4): what you tried to make and for which channel; where you got stuck and what you did next; what the video got right and wrong; whether you would post it and why.
Responsive: 4 steps, then 2 by 2 under 900px, then one column with the disc beside the text under 560px.

### S1.3 Who should apply (`#who`)

Heading column (4 of 12): H2 "Who should apply", muted line "The beta needs people who will actually use it this week."
Two lists (8 of 12), each row divided by a border, check or cross icon plus text (icon is decorative; the heading carries meaning):
- **A good fit if you:** run a faceless YouTube channel, or are ready to start one; have a real video idea you want to make this week; will make at least one video with SocialGhost; can send honest feedback within 2 to 3 days of getting access.
- **Not a fit if you:** only want a quick look around; cannot make time in the next few days; would rather wait until the beta is over.
Under 900px the heading sits on top; under 640px the lists stack.

### S1.4 Questions (`#faq`, sunken band)

H2 "Questions" left; a `<dl>` in two columns right. Answers always visible, no accordion.

| Question | Answer |
| --- | --- |
| Does it cost anything? | No. Beta testers get free access. In return, we ask for useful feedback within 2 to 3 days of getting access. |
| Do I have to be on camera? | No. SocialGhost makes faceless videos, so you never appear on screen. |
| Is SocialGhost ready to use? | Yes. It is live now. The beta is limited, so not everyone who applies gets a spot. |
| Do I need a YouTube channel already? | No. New creators can apply. The form asks whether you have a channel. |
| What happens after I apply? | We review applications and email the testers we pick, at the address you give us. |

Do not add answers about price after the beta, data use, video ownership or access length until the owner supplies them.

### S1.5 Apply (`#apply`)

Left (5 of 12): H2 "Apply for the beta" (`tabindex="-1"`, focus target). "Free access for testers who send useful feedback within 2 to 3 days of getting access." Muted: "Six questions. Spots are limited."
Right (7 of 12): white panel, 12 radius, 32 padding (24/20 on phone). Fields in this order, labels above, help below:

| Field | Label | Type and rules | Help |
| --- | --- | --- | --- |
| name | Name | text, `autocomplete="name"`, required, max 80 | |
| email | Email | email, `autocomplete="email"`, required | "If you are picked, we send beta access here." |
| channel_status | Do you have a YouTube channel? | radio: "Yes, a faceless channel" / "Yes, but not faceless" / "Not yet", required | |
| channel_url | Channel link (optional) | url, must start with https:// if given | "Leave it empty if you do not have a channel yet." |
| first_video | What video do you want to make first? | textarea, 10 to 500 characters | "One or two sentences is enough." |
| feedback_commitment | "I will send useful feedback within 2 to 3 days of getting access." | checkbox, required | |

Then "Send application" (primary, left aligned, full width on phone) and "See how we handle your details in our privacy notice." linking `/privacy`. Hidden honeypot `_gotcha`.

| State / trigger | User sees | System effect | Next action |
| --- | --- | --- | --- |
| Pristine | Empty fields, no errors | None | Fill in |
| Invalid submit | Alert "Please fix these before sending:" with linked messages; message under each field; red 2px border | Nothing sent; focus to the alert | Each link focuses its field. Errors re-check on change. |
| Sending | Button "Sending...", `aria-disabled`, polite status "Sending your application." | One POST | Wait; extra clicks ignored |
| Sent (2xx only) | Form replaced by "Application sent", "Thanks, {name}. We will email {email} if you are picked.", "There is nothing else to do for now.", "Back to top" | Stored by the service | Focus to the heading |
| Failed | Alert "Your application was not sent." plus, when offline, "You seem to be offline. Reconnect and send it again. Your answers are still here." Otherwise "Something went wrong on our side. Send it again in a minute. Your answers are still here." | Nothing stored | Values kept; focus to the Alert; send again |
| Not connected (endpoint empty) | Neutral alert "This form is not connected yet. Nothing was sent." | None | Never fakes success |

Error messages: "Enter your name." / "Enter your email address." / "Enter an email address like name@example.com." / "Choose whether you have a YouTube channel." / "Enter the full link, starting with https://, or leave it empty." / "Tell us what video you want to make first." / "Add a little more detail. One sentence is enough." / "Tick this box to confirm you can send feedback within 2 to 3 days."

### Footer

"SocialGhost" and "trysocialghost.com"; links "Privacy notice" and "Back to top". No contact address until the owner supplies one.

## S2 Privacy notice

Job: show the owner's privacy text for the application form. Layout: header, H1 "Privacy notice", the owner's text in a 66ch column, "Last updated" date from the owner, link "Back to the application" to `/#apply`, footer.
Blocked: the text is not written here. Until it exists, the page is not published and the form does not go live.

## S3 Not found

H1 "This page does not exist." Line: "The link may be old or mistyped." Primary button "Go to the home page" to `/`. `noindex`. Same header and footer.

## Accessibility (all screens)

Skip link "Skip to content". Landmarks: header, nav "Main", main, footer. One H1 per page. Native controls with visible labels; help and errors linked by `aria-describedby`; `aria-invalid` on invalid controls. Focus ring 2px accent, 2px offset. Targets at least 44px. Reflow at 320px with no sideways scroll; 200% zoom keeps the form usable. Status via `role="status"`; failures via `role="alert"`. Reduced motion respected.

## Exact acceptance checks

| Source | Check | Status | Evidence |
| --- | --- | --- | --- |
| Owner: goal is applications | Only "Apply for the beta" and "Send application" are filled buttons on S1 | Pass (visual artifact) | `index.html` |
| Owner: beta terms | "free access" and "within 2 to 3 days" appear in hero, How, FAQ and Apply | Pass (visual artifact) | `index.html` |
| Owner: tool is live | Hero and FAQ say it is live | Pass (visual artifact) | `index.html` |
| F3 | Success shows only after a 2xx response | Not verified | Needs the connected form in T6 |
| Layout | H1 at most two lines at 1280 and 390; no sideways scroll | Not verified | Screenshots in T9 |

## Handoff limits

Privacy text, access length, contact email and real product proof are open (01-prd.md section 8). Runtime behavior is untested until built.
