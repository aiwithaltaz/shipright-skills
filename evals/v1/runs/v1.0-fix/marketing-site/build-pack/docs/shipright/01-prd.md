# 01 - Product requirements: SocialGhost beta site

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** owner request of 2026-10-13. Choices marked "Proposed (delegated)" were delegated by the owner with "You decide". They become Approved when the owner OKs the `/design` preview in T1.

## 1. Frame

| | |
| --- | --- |
| **Who** | Creators who run, or are about to start, a faceless YouTube channel and can test within days. Proposed (delegated). |
| **Job** | Understand what SocialGhost and the beta deal are, decide if they fit, and apply in one short form. |
| **What they do today** | Unknown. Owner to supply if known (other tools, editors, doing it by hand). |
| **This release finishes** | A public site at trysocialghost.com that explains the beta deal and collects applications. |
| **What stays out** | See section 4. |

**Known facts (source: owner request):** SocialGhost is a live AI tool. It makes faceless YouTube videos. It is in limited beta. Testers get free access if they give useful feedback within 2 to 3 days. The site goal is to get serious beta testers to apply.

## 2. Useful mechanism

A clear deal (free access for useful feedback) traded for applications. The page filters as much as it invites: a "who should apply" list, a required commitment and a feedback template. Hypothesis, not evidence; section 5 tests it.

## 3. Users and constraints

- Visitor: may apply. No accounts or roles on the site.
- Owner: reads applications in the form service. Only the owner's hosting account has access.
- Devices: phone and desktop browsers.

## 4. Current phase

**Phase:** Beta recruitment site, release 1.
**Approved now (delegated):** S1 Home with the application form at the end, S2 Application received (`/applied`), S3 Not found (`/404`). One application form. No analytics.
**Explicitly excluded:** pricing, sign-in or app link, blog, sample gallery, waitlist or newsletter, testimonials, logos, user counts, chat widget, cookie banner (none needed without analytics), multiple languages.
**Later notes only:** a "See a real video" section once the owner supplies a real sample. A "How it works" section once the owner supplies the real steps (see O1, O2).

## 5. Success evidence

| Signal | Baseline | Target | Source / method |
| --- | --- | --- | --- |
| A first-time visitor can say what SocialGhost is and what the deal is after the first screen | Unknown | 3 of 3 people in a 5-second test | Owner shows the page to 3 creators |
| A qualified creator applies on a phone without help | Unknown | Under 2 minutes, no questions asked | Owner watches 2 people apply |
| Every submission reaches the owner with all fields | None yet | 100% of test submissions | 3 test submissions after T5 |
| Accepted testers who send useful feedback within 2 to 3 days | Unknown | Owner sets | Owner's own tracking, outside the site |

## 6. Objects and lifecycles

| Object | Independent states | Actor / owner |
| --- | --- | --- |
| Application | Draft in the browser (not saved), Sending, Received, Failed to send | Visitor creates; owner reads |
| Tester selection | Not reviewed, Picked, Not picked | Owner, outside the site |

Application fields: name, email, YouTube channel link (optional), what videos they want to make, commitment checkbox. Proposed (delegated).

## 7. Jobs and journey

| Job ID | User job | Priority | Screen / flow |
| --- | --- | --- | --- |
| J1 | Understand the product and the deal | P0 | S1.1 to S1.5 |
| J2 | Apply | P0 | S1.6, then S2 |
| J3 | Recover from a wrong link | P2 | S3 |

**Flow J2: apply**

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Taps "Apply for the beta" (hero or header) | The form at #apply | Scrolls to the form | Fill five fields | Nothing saved yet. Header and page stay usable. |
| Submits with a problem | Error text under each bad field; focus on the first | Nothing sent | Fix and resubmit | Answers stay in the fields |
| Submits valid form | Button reads "Sending application..." and is disabled | POST to the form service | Wait | Answers stay until success |
| Send fails | Alert: "Your application was not sent..." | Nothing received | Try again | Answers stay |
| Send succeeds | S2: "Application received" with their email | Owner gets the application | Back to the home page | Done. Typo: send the form again. |

## 8. Risks and unknowns

Owner of every open question: the SocialGhost founder.

| ID | Gap | Effect | Decision or evidence needed |
| --- | --- | --- | --- |
| O1 | How SocialGhost works: what the user gives it, what comes out, the steps | No "How it works" section yet | The real 3 to 4 steps in plain words |
| O2 | A real sample video or real screenshots | The page has no product proof, only an illustration | One real video or screenshots |
| O3 | Privacy policy and where application data is kept | **Blocks launch of the form** (it collects names and emails). Not authored here. | Owner's privacy policy URL; link it next to the submit button |
| O4 | Contact email | Footer has no contact | An address to publish |
| O5 | How testers send feedback, and what happens if they miss the 2 to 3 days | FAQ cannot answer it | Owner's process |
| O6 | How long free access lasts; price after the beta | Not stated anywhere on the site | Owner's terms, if they want them public |
| O7 | How many places, how testers are picked, how fast replies come | Copy stays general | Owner's process |
| O8 | Company legal name, logo, favicon, social preview image | Footer and sharing use text only | Brand files |

## 9. Dependencies

Hosting and form service: Netlify, Proposed. Domain trysocialghost.com: owner must point it at the host. No other systems.

## 10. Decision log

| ID | Decision | Status | Source/date | Affected artifacts |
| --- | --- | --- | --- | --- |
| D1 | Audience: creators with or starting a faceless channel who can test within days | Proposed (delegated) | Owner "You decide", 2026-10-13 | PRD, S1 |
| D2 | Scope: S1 Home with form, S2 /applied, S3 /404 | Proposed (delegated) | Same | All |
| D3 | Look: editorial light starter, record-red accent #B42318, Instrument Sans | Proposed (delegated) | Same | DESIGN.md, tokens |
| D4 | Stack: Astro, Tailwind CSS, Netlify hosting and Netlify Forms | Proposed | Assistant recommendation | 02 |
| D5 | Five form fields as in section 6 | Proposed (delegated) | Same | S1.6 |
| D6 | The 2 to 3 days start when the tester gets access, not when they apply | Proposed. Owner to confirm. | Reading of the owner's request | S1, FAQ |
| D7 | Four-question feedback template on the page | Proposed (delegated) | Same | S1.4 |
| D8 | No analytics in this release | Proposed | Stack default | 02 |
| D9 | Hero picture is a code-drawn illustration, labeled as such, not a fake interface | Proposed | No real screenshots supplied | S1.1 |
| D10 | Copy says applications are reviewed and picked testers get access by email | Proposed. Owner to confirm (O7). | Reading of "apply" in the request | S1.4, S1.5, S2 |
