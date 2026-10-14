# 03 - Security and access

**Project path:** `docs/shipright/03-security-and-access.md`

**Version/date:** v0.1 draft, 2026-10-13  **Sources and approval:** D1, D2. This is not a security audit or legal review.

## Roles and authentication

| Actual role | User job | Sign-in requirement | Source |
| --- | --- | --- | --- |
| Visitor | View the page, rotate the model, go to the store | None | D2 |

No sign-in, sessions or accounts in this phase.

## Permission matrix

| Action | Actual actor | Allowed scope | Denied behavior | Source |
| --- | --- | --- | --- | --- |
| View page and rotate model | Visitor | Whole page | Not applicable: public | D2 |
| Open store | Visitor | Outbound link | Not applicable: public | D1 |

## Data boundaries

| Data | Who may see/change it | Storage/logging/URL limits | Retention source |
| --- | --- | --- | --- |
| Visitor data | Not collected in phase 1 | No cookies, analytics or tracking scripts until D9 is decided | Not applicable |
| Store URL | Public | Plain link, no tokens or tracking IDs unless the owner supplies them | Owner |

No secrets in frontend code. The site has none to hold.

## Consequential actions

| Action/object | Effect | Confirmation or supported undo | Recovery | Authority |
| --- | --- | --- | --- | --- |
| Buy on our store | Leaves this site for the store | None needed | Browser Back returns to the page | D1 |

## Risks and open choices

- D9 analytics: adding it may need consent and a privacy page. Owner decides. Not in phase 1.
- D10 legal links: whether the site needs privacy or terms pages is Unknown. No legal text is written here.
