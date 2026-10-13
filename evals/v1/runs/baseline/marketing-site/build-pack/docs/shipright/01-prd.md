# 01 - Product requirements

**Project path:** `docs/shipright/01-prd.md`
**Version/date:** 0.1, 2026-10-13
**Sources and approval:** Founder request, 2026-10-13 (R1). Founder delegation, 2026-10-13: "You decide. Use your recommended picks for everything you asked." (R2). Delegated picks are recorded in the decision log. Facts the founder has not supplied stay Unknown.

## 1. Problem and outcome

SocialGhost (trysocialghost.com) is a live AI tool that makes faceless YouTube videos (R1). It is in a limited beta (R1).
The founder needs serious beta testers who will use the tool and send useful feedback quickly (R1).

**Outcome for this phase:** serious testers find the site, understand the beta deal, and send an application.

## 2. Useful mechanism

**Beta deal (R1):** testers get free access if they give useful feedback within 2 to 3 days.
**Site mechanism:** one page that states the deal plainly, says who should apply, and holds a short application form. The form asks for a commitment to the 2 to 3 day feedback window, so casual sign-ups filter themselves out.

**Current alternative:** Unknown. How the founder recruits testers today was not supplied.
**Evidence that this page recruits better:** none yet. This is a hypothesis (H1 below).

## 3. Users and constraints

| Actor | Job | Source |
| --- | --- | --- |
| Visitor / applicant | Decide if the beta fits them and apply | R1 |
| Founder | Read applications and email access to selected testers | R1, D3 |

No sign-in for visitors. No admin screens in this phase; the founder reads applications in the storage tool chosen in D4.
Devices: phone and desktop browsers. Exact device support was not specified; build responsive from 320 CSS px up.

**Unknown product facts (owner: founder):**
- What a tester can do in SocialGhost step by step (inputs, outputs, export, YouTube upload or not).
- Video formats supported (long-form, Shorts or both).
- How access is delivered (account invite, link, code).
- How long the free access lasts and what happens after it ends.

Copy must not describe any of these until supplied.

## 4. Current phase

**Phase:** P1, Beta recruitment site.
**Approved now:**
- S1 Home page with the beta deal, how the beta works, who should apply, and the application form (R1, D1, D11).
- One application endpoint that stores each application and notifies the founder (D4).
- Form states: pristine, invalid, sending, sent, failed (D3, D4).

**Explicitly excluded:** pricing or plans, sign-up or login, product dashboard, testimonials, ratings, user or video counts, sample video gallery, blog, newsletter, chat widget, social proof logos, waitlist position, referral system, admin screens, analytics dashboards.

**Later notes only (no UI, routes or data models now):**
- Real sample videos made by SocialGhost, once the founder supplies them (D5).
- A "How it works" product walkthrough, once Q1 facts are supplied (D2).
- Privacy page at `/privacy`, once the founder supplies the text (D8). Required before launch.
- Open graph image, once a brand image exists.

## 5. Success evidence

| Signal | Baseline | Target | Source / method |
| --- | --- | --- | --- |
| Applications received | Unknown | Unknown (founder sets) | Count in the storage tool from D4 |
| Share of selected testers who send feedback within 2 to 3 days | Unknown | Unknown (founder sets) | Founder's own records |

No analytics tool is approved. Do not add one without a decision.

### Research basis

| Claim / hypothesis | Kind and source | Limits | Decision or test needed |
| --- | --- | --- | --- |
| H1. A required commitment checkbox for the 2 to 3 day window raises the share of testers who send feedback. | Hypothesis | No data | Compare feedback rate of the first selected group with any earlier group the founder has. |
| H2. Stating "If you are selected" keeps expectations right for a limited beta. | Hypothesis | No data | Watch for applicant emails asking about status. |

## 6. Objects and lifecycles

| Object | Independent states | Actor / owner |
| --- | --- | --- |
| Application | Draft in browser (not saved), Sent, Failed to send | Applicant creates; founder reads |
| Founder review of an application | Not reviewed, Selected, Not selected | Founder, outside the site (D3) |

The site shows only Draft, Sent and Failed. Review status is not shown on the site in this phase.

## 7. Jobs and journey

| Job ID | User job | Phase | Priority | Screen / flow |
| --- | --- | --- | --- | --- |
| J1 | Understand what SocialGhost is and what the beta deal is | P1 | P0 | S1 hero, How the beta works |
| J2 | Decide if I am the kind of tester they want | P1 | P0 | S1 Apply section, left column |
| J3 | Send an application | P1 | P0 | S1 application form |
| J4 | Know what happens next after sending | P1 | P0 | S1 sent state |

Main path: land on S1, read the hero, select "Apply for the beta", fill the form, select "Send application", see the sent message.

| Starting state | Missing dependency | Permitted next action | Preserved work | Completion condition |
| --- | --- | --- | --- | --- |
| Arrives from a shared link to `/#apply` | Has not read the deal | Read the left column next to the form; the form repeats the 2 to 3 day commitment | Nothing yet | Sends form |
| Sending fails (network or server) | Working endpoint | Select "Send application" again | All answers stay in the fields | Sent state shows |
| Leaves the page before sending | None | Come back later | Nothing is saved; this is stated nowhere because no save is offered | Sends form on return |
| Applies twice with the same email | None | Sees the same sent state | Both stored; founder sees duplicates | Founder dedupes by email |

## 8. Risks and unknowns

| Gap | Effect | Owner | Decision or evidence needed |
| --- | --- | --- | --- |
| Product facts (D2) | Page cannot explain what the tool does beyond one line | Founder | Steps and real samples |
| Free access duration (D7) | Testers may assume free forever | Founder | Exact terms. This is access policy and was not delegated |
| Privacy text (D8) | Collecting names and emails without a privacy notice. Launch blocker | Founder and adviser | Privacy page text. Not written by the designer |
| Storage and notification tool (D4) | Endpoint cannot be finished | Founder | Pick one tool |
| Reply time | Applicants may wait without knowing | Founder | Keep copy free of a reply time until decided |
| Spam submissions | Founder inbox fills | Builder | Honeypot field plus server rate limit (D4) |

## 9. Dependencies

- A storage tool the founder can read, and a way to notify the founder (D4). Provider Unknown.
- Hosting for the domain trysocialghost.com. Provider Unknown.
- Privacy page text (D8).

## 10. Feedback acceptance

| Source/date | Keep/remove/change/add | Element | Exact acceptance check |
| --- | --- | --- | --- |
| R1, 2026-10-13 | Add | Beta deal | The hero states: limited beta, free access, useful feedback within 2 to 3 days. |
| R1, 2026-10-13 | Add | Goal: serious testers apply | Exactly one primary action on the page: "Apply for the beta". It leads to the form. |
| R1, 2026-10-13 | Add | Live tool | The hero says SocialGhost is live. No "coming soon" wording anywhere. |
| R2, 2026-10-13 | Add | Delegated picks | Each delegated pick below appears in the build as recorded, and nothing else is added. |

## 11. Decision log

| ID | Scope / decision | Status | Source/date | Replaces | Affected artifacts |
| --- | --- | --- | --- | --- | --- |
| D1 | Current phase is P1, Beta recruitment site. Goal: serious testers apply. | Approved | R1, 2026-10-13 | None | All |
| D2 | Product capabilities beyond "live AI tool that makes faceless YouTube videos". Copy stays at that level until supplied. | Unresolved (fact; cannot be delegated) | Q1, 2026-10-13 | None | S1 copy, later notes |
| D3 | After applying, the founder reviews and emails access to selected testers. No reply time is promised. | Approved by delegation | Q2, R2 | None | S1 steps, sent state |
| D4 | On-site form posts to one endpoint `POST /api/apply`. Endpoint validates, stores and notifies the founder. Honeypot and rate limit. Storage and notification provider: founder picks. | Approved by delegation; provider Unresolved | Q3, R2 | None | S1 form, 02, 03, T5 |
| D5 | No samples, quotes, ratings or counts. Hero uses a coded abstract illustration, hidden from assistive tech, not styled as a product screenshot. Real samples later. | Approved by delegation | Q4, R2 | None | S1 hero, DESIGN.md |
| D6 | Visual system in DESIGN.md: text wordmark, Space Grotesk and Inter, ink primary button, one indigo accent. | Approved by delegation | Q5, R2 | None | DESIGN.md, S1 |
| D7 | Free access duration and terms after the beta. Copy repeats only the supplied deal. | Unresolved (access policy; not delegable) | R1 | None | S1 copy |
| D8 | Privacy page text and form privacy line. Not authored here. | Unresolved; launch blocker | Contract rule: no legal text | None | T8 |
| D9 | "Apply if you" and "Useful feedback is specific" lists on S1. Founder may edit the wording. | Approved by delegation | R2 | None | S1 Apply section |
| D10 | No animation. Smooth in-page scroll only when reduced motion is not requested. | Approved by delegation | R2 | None | DESIGN.md |
| D11 | One page (S1). Navigation is in-page anchors only. | Approved by delegation | R2 | None | S1, 04 |

Document completion is not implementation readiness. Launch needs D4 provider, D7 and D8.
