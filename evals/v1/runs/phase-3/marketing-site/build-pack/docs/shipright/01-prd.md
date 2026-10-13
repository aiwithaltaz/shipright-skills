# 01 - Product requirements: SocialGhost beta site

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** the owner's request of 2026-10-13. Choices Q1 to Q3 were delegated ("You decide"). They are recorded as Proposed (delegated) in the decision log.

## 1. Frame

| | |
| --- | --- |
| **Who** | YouTube creators who run a faceless channel or are ready to start one (D1). |
| **Job** | Understand what SocialGhost is and what the beta asks, then apply in one visit. |
| **What they do today** | Unknown. No research was supplied. |
| **This release** | One marketing page at trysocialghost.com with the application form on it. A privacy notice page and a not-found page. |
| **What stays out** | See section 4. |

**Product facts we have (source: owner):**
- SocialGhost is a live AI tool that makes faceless YouTube videos.
- It is in a limited beta.
- Testers get free access if they give useful feedback within 2 to 3 days.
- The site's goal is to get serious beta testers to apply.
- Domain: trysocialghost.com.

Everything else about the product is Unknown. The site does not describe features, steps inside the tool, video lengths, voices or formats until the owner supplies them.

## 2. Useful mechanism

The page states the deal plainly and asks a few questions that show who is serious. Hypothesis, not evidence: clear terms put off casual visitors and keep the review list short.

## 3. Users and roles

| Actor | What they do | Access |
| --- | --- | --- |
| Visitor | Reads the page, sends one application. | Public. No sign-in. |
| Owner | Reads applications in the form service inbox. | The form service account only. Not part of the site. |

## 4. Current phase

**Phase:** Beta recruitment site, version 1.
**Approved now:** S1 Home with the application form, S2 Privacy notice (owner text), S3 Not found.
**Explicitly excluded:** pricing, sign-in or app links, example videos, feature lists, testimonials, user counts, logos of other companies, blog, newsletter, chat widget, analytics, cookie banner (no cookies are set), dark mode.
**Later notes only:** a sign-in link once the app URL is shared; real example videos or screen recordings; tester quotes once testers agree to share them; pricing after the beta.

## 5. Success checks

| Job | Observable check | Baseline | Source / method |
| --- | --- | --- | --- |
| J1 Understand the deal | A first-time visitor can say what they get and what they owe after reading the first screen and "How the beta works". | Unknown | 5-person hallway test (owner) |
| J2 Apply | A visitor sends a valid application on a phone in one sitting without help. | Unknown | Form service inbox, plus one test on a real phone |
| J3 Know what happens next | After sending, the visitor sees that the application was received and when they will hear back. | Unknown | Visual check of the success state |

No targets are set. The owner can add a target once the first week of applications is known.

## 6. Objects

| Object | States | Owner |
| --- | --- | --- |
| Application | Draft in the browser (not saved), Sending, Sent, Failed to send | Visitor creates it; owner reviews it in the form service |

The site keeps no database. Picked or not picked is tracked by the owner outside the site (D6).

## 7. Jobs and flows

| Job ID | Job | Priority | Screen |
| --- | --- | --- | --- |
| J1 | Understand what SocialGhost is and the beta deal | P0 | S1 |
| J2 | Apply for the beta | P0 | S1, section Apply |
| J3 | Read how personal details are handled | P0 for launch | S2 |

### J2 Apply

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Clicks "Apply for the beta" | The page scrolls to the Apply section. Focus moves to the section heading. | None | Fill the form | Nothing saved. Any link or Back leaves. |
| Sends with missing or wrong fields | An error list above the form and a message under each field. Focus moves to the list. | Nothing sent | Fix and send again | Typed values stay. |
| Sends a valid form | Button reads "Sending..." and is disabled. | One request to the form service. | Wait | Values stay until a result arrives. |
| Service accepts | The form is replaced by "Application sent" with the email used and the next step. | Stored in the form service | "Back to top" link | Nothing more to do. |
| Service fails or network drops | "Your application was not sent." with the reason in plain words and "Try again". | Nothing stored | Send again | All values stay. No second request runs while one is in progress. |
| Leaves during sending | Browser default | The request may or may not arrive. | Return and apply again | A second application from the same email is fine; the owner removes duplicates (D6). |

## 8. Risks and unknowns

| Gap | Effect | Owner | Needed |
| --- | --- | --- | --- |
| Privacy notice text | Blocks launch. The form collects names and emails. | Owner | Text from the owner or their adviser. Not written here. |
| How long free access lasts, and what happens after the beta | Visitors will ask. FAQ stays silent until known. | Owner | One sentence |
| Contact email for the footer | No contact route besides the form. | Owner | An address |
| How testers get access (email with a link?) | Success copy says "we will email you". | Owner | Confirm or correct |
| What "useful feedback" covers | The page lists four points (D4). | Owner | Confirm or edit |
| Start of the 2 to 3 days | The page says "of getting access". | Owner | Confirm |
| Logo, brand colors, fonts | Proposed system used instead (D3). | Owner | Assets, if they exist |
| Real product proof | No screen recording or example video yet. Hero uses a drawn illustration. | Owner | A short screen recording or example video |
| Number of beta spots | Page says "Spots are limited." with no number. | Owner | A number, only if true and wanted |

## 9. Dependencies

A hosted form service account (owner signs up; see 02-technical-architecture.md). Static hosting. Domain trysocialghost.com (owned by the owner; DNS access Unknown).

## 10. Feedback acceptance

The owner's three requirements (applications as the goal, the beta terms, "live" status) are acceptance checks in 04-frontend-spec.md.

## 11. Decision log

| ID | Decision | Status | Source/date | Affects |
| --- | --- | --- | --- | --- |
| D1 | Audience: existing faceless channel owners and new creators. The form asks which. | Proposed (delegated) | Q1, 2026-10-13 | S1, form |
| D2 | One page with the form at the end, plus S2 and S3. | Proposed (delegated) | Q2, 2026-10-13 | All |
| D3 | Look: light editorial marketing system, ink-indigo accent, Instrument Sans. | Proposed (delegated) | Q3, 2026-10-13 | DESIGN.md, tokens |
| D4 | "Useful feedback" covers: what you tried to make, where you got stuck, what the video got right and wrong, whether you would post it. | Proposed (delegated) | Assistant, 2026-10-13 | S1 How, FAQ |
| D5 | Stack: Astro, plain CSS tokens, hosted form service, static hosting. | Proposed (delegated) | Assistant, 2026-10-13 | 02, T1 |
| D6 | No database. Owner reviews and picks testers in the form service inbox. | Proposed (delegated) | Assistant, 2026-10-13 | 02 |
| D7 | Hero visual: a drawn faceless video frame until a real recording exists. | Proposed (delegated) | Assistant, 2026-10-13 | S1 hero |

Document completion is not implementation readiness. The privacy notice text blocks launch.
