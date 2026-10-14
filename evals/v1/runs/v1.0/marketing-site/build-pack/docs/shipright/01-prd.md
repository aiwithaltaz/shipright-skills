# 01 - Product requirements: trysocialghost.com

**Version/date:** 1.0, 2026-10-13
**Sources:** the owner's request of 2026-10-13. Frame choices Q1 to Q3 were delegated ("You decide. Use your recommended picks"), so they are **Proposed (delegated)**.

## 1. Frame

| | |
| --- | --- |
| **Who** | YouTube creators who run a faceless channel, or are about to start one, and can make a real video within days of getting access. |
| **Job** | Understand what SocialGhost is and what the beta deal asks, then apply in one pass. |
| **What they do today** | Unknown. Owner to confirm which tools or workflows applicants use now. |
| **This release finishes** | A one-page marketing site at trysocialghost.com with an application form that delivers each application to the owner. |
| **What stays out** | Pricing, sign-in, blog, sample-video gallery, testimonials, newsletter, chat bubble, analytics. |

## 2. Known facts

- SocialGhost is a **live** AI tool that makes faceless YouTube videos.
- It is in **limited beta**.
- Testers get **free access** if they give **useful feedback within 2 to 3 days**.
- Goal of the site: get **serious** beta testers to apply.

Everything else about the product (inputs, outputs, features, video length, voice, upload) is **Unknown**. The site does not describe features it cannot source.

## 3. Mechanism

The site sells the deal, not a feature list: free access in return for fast, specific feedback.
The form filters for seriousness with three signals: a channel or a plan for one, a topic, and how many videos they plan to make in the first 3 days, plus an explicit feedback commitment.
Hypothesis: asking for the commitment up front lowers application volume but raises the share of testers who send feedback. Test: compare feedback rate of the first beta cohort with any earlier testers. Owner holds the data.

## 4. Current phase

**Phase:** Site v1.
**Approved now:** S1 Home with the apply form (route `/`), S2 Not found (`404`), D1 design preview (`/design`, not linked, `noindex`).
**Excluded:** see "What stays out" above.
**Later notes only:** real sample videos from SocialGhost; a sign-in link for accepted testers; a reply to applicants who are not picked; analytics with consent. No placeholders or hidden routes for these.

## 5. Objects

| Object | States | Owner |
| --- | --- | --- |
| Application | Draft in the browser (not saved), Submitting, Sent, Failed to send | Applicant creates; owner reads in the Netlify Forms inbox |

Picking testers and sending access happen outside the site, by the owner. The site never claims an applicant is accepted.

## 6. Core flow: apply

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Lands on `/` | Headline, deal, "Apply for the beta" | None | Scroll or jump to `#apply` | Nav and footer links stay available |
| Fills the form | Five questions with labels and help | Nothing sent | Submit | Not saved until sent. Leaving the page loses answers; no warning needed for five short questions (Proposed) |
| Submits with errors | Error text under each failed field, focus on the first | Nothing sent | Fix and submit | All typed values kept |
| Submitting | Button reads "Sending..." and is disabled | One POST to Netlify Forms | Wait | Double submit blocked |
| Sent | "Application sent" panel in place of the form, with the email used | Application stored in Netlify Forms | "Back to top" link | Nothing more to do. The panel does not promise acceptance or a reply time |
| Failed | Error under the button: "Your application did not send. Your answers are still here. Try again." | Nothing stored | Try again | All values kept |

F1, F2 and F3 hold: every state has a next step, the same button and error patterns are used throughout, and status names only what is true.

## 7. Success checks

| Signal | Baseline | Target | Method |
| --- | --- | --- | --- |
| A fitting visitor applies on a 390px phone in one pass without help | Unknown | Pass in a 3-person hallway test | Owner watches 3 people |
| Every submitted application arrives with all fields | None | 5 of 5 test submissions arrive | Netlify Forms inbox |
| Share of accepted testers who send feedback within 2 to 3 days | Unknown | Owner sets | Owner's records |

No traffic or conversion targets are set; there is no analytics in this release.

## 8. Open questions

| # | Gap | Effect | Owner |
| --- | --- | --- | --- |
| O1 | Privacy policy URL | The form collects emails. **Blocks launch (T9)**, not building | Owner |
| O2 | Contact email | Footer has no contact line until supplied | Owner |
| O3 | How long free access lasts, and pricing after the beta | Page says only "free access". FAQ does not answer "what after" | Owner |
| O4 | What happens if a tester misses the 2 to 3 day window | FAQ omits it | Owner |
| O5 | How testers send feedback (form, email, call) | Page lists the questions, not the channel | Owner |
| O6 | Reply time, and whether unpicked applicants hear back | Success panel promises nothing about timing | Owner |
| O7 | Logo and brand assets | Text wordmark "SocialGhost" until supplied | Owner |
| O8 | Real SocialGhost sample videos | Hero uses a labeled illustration. Real output is the strongest proof | Owner |
| O9 | Who owns videos made in the beta, and data use | FAQ omits it | Owner |

## 9. Decision log

| ID | Decision | Status | Source |
| --- | --- | --- | --- |
| D1 | Serious tester = has a channel or is starting one, and can make a real video in 2 to 3 days | Proposed (delegated) | Q1, 2026-10-13 |
| D2 | One home page with the form on it, plus 404. Exclusions as in section 1 | Proposed (delegated) | Q2 |
| D3 | Editorial light look, indigo accent, Geist, code-built video frame | Proposed (delegated) | Q3 |
| D4 | Astro static site on Netlify, Netlify Forms for applications | Proposed | 02-technical-architecture.md |
| D5 | No analytics | Proposed | Stack default |
