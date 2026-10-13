# 03 - Security and access

**Project path:** `docs/shipright/03-security-and-access.md`
**Version/date:** 0.1, 2026-10-13
**Sources and approval:** R1, R2, D3, D4 in `docs/shipright/01-prd.md`.

This records product access rules. It is not a security audit or legal review.

## Roles and authentication

| Actual role | User job | Sign-in requirement | Source |
| --- | --- | --- | --- |
| Visitor / applicant | Read S1, send one application | None | R1 |
| Founder | Read applications in the storage tool, email selected testers | Signs in to the storage tool chosen in D4. No sign-in on this site. | D3, D4 |

No other roles. No admin pages on this site.

## Permission matrix

| Action | Actual actor | Allowed scope | Denied behavior | Source |
| --- | --- | --- | --- | --- |
| Send application | Anyone | One request at a time, within the rate limit | 429: form shows "Too many attempts. Wait a few minutes and try again." Answers stay. | D4 |
| Read applications | Founder only | All applications | No public route returns applications | D4 |
| Change or delete an application | Founder, in the storage tool | Any | Not possible from the site | D4 |

## Data boundaries

| Data | Who may see/change it | Storage/logging/URL limits | Retention source |
| --- | --- | --- | --- |
| Name, email, channel URL, plans | Founder | Never in URLs, query strings, analytics or server logs. Send in the request body only. Logs may record request time and status code. | Unknown. Founder decides (part of D8). |
| Honeypot value | Nobody | Discard | Not stored |

The storage tool's credentials live in server environment variables only. Never in client code.
UI visibility is not access enforcement. The endpoint has no read method.

## Consequential actions

| Action/object | Effect | Confirmation or supported undo | Recovery | Authority |
| --- | --- | --- | --- | --- |
| Send application | Stores one application and notifies the founder | None needed. Low risk, not destructive | Applicant can send again with corrected answers; founder sees both | D4 |

There is no clear, reset or delete action on the site.

## Risks and open choices

- **Privacy notice (D8):** the form collects names and emails. A privacy notice written by the founder or an adviser must be linked from the form and footer before launch. Launch blocker.
- **Spam:** honeypot plus rate limit. If spam continues, the founder may approve a challenge tool later. Not in this phase.
- **Retention:** Unknown. Part of the privacy decision.
