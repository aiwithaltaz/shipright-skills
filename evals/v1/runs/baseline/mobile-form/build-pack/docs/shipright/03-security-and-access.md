# 03 - Security and access

**Project path:** `docs/shipright/03-security-and-access.md`
**Version/date:** v0.1, 2026-10-13. **Sources and approval:** D-03 and D-04, approved by owner delegation.

This records product access rules. It is not a security audit or legal review.

## Roles and authentication

| Actual role | User job | Sign-in requirement | Source |
| --- | --- | --- | --- |
| Visitor (not signed in) | Enter booking details | None. Details stay on the phone | D-02 |
| Customer | Send a request, see own requests | Email and password session | D-03 |
| Business staff | Confirm requests | Not in this app. Supabase dashboard only, until D-16 | D-16 |

Sign-in: Supabase email and password. Password minimum: 8 characters (Proposed, assistant; Supabase default is lower, set it in the project). Session kept with `expo-secure-store`. Password reset: Supabase reset email. Email confirmation: D-07, Unresolved.

## Permission matrix

| Action | Actual actor | Allowed scope | Denied behavior | Source |
| --- | --- | --- | --- | --- |
| Enter booking details | Visitor or customer | Own phone | Not applicable | D-02 |
| Create account | Visitor | One account per email | Email in use: "Log in instead" | D-03 |
| Send booking request | Customer | Own requests, status requested only | Session expired: go to S4 Log in, draft kept | D-01 |
| Read booking requests | Customer | Own requests only | Other rows never returned by row level security | D-04 |
| Change or cancel request | Nobody in app | None | S6 shows the contact route once D-12 supplies one | D-12 |
| Confirm request | Business staff | Dashboard | Not in app | D-16 |

## Data boundaries

| Data | Who may see/change it | Storage/logging/URL limits | Retention source |
| --- | --- | --- | --- |
| Email, password | Customer; Supabase Auth | Never log or put in URLs. Never store the password on the phone | Unknown (owner) |
| Full name | Customer | Not in URLs or logs | Unknown (owner) |
| Home address, date | Customer; business staff | Draft on phone in app storage. Never in URLs, analytics or logs | Unknown (owner) |
| Session tokens | App | Secure store only | Supabase default |

UI visibility is not access enforcement. Row level security in 02 is the boundary. Test it with two accounts before launch.

## Consequential actions

| Action/object | Effect | Confirmation or supported undo | Recovery | Authority |
| --- | --- | --- | --- | --- |
| Send request | Creates one booking request | Review screen S5 is the check. No undo in app | Contact route (D-12, Unknown) | D-01 |
| Log out | Ends the session on this phone. A sent request stays on the server | None needed | Log in again | D-03 |

No clear, reset or delete controls in Phase 1. The booking draft is cleared only after the server confirms the request exists.

## Risks and open choices

- Account deletion inside the app is expected by Apple for apps with sign-up. Decide before App Store submission. Owner: you.
- Privacy policy URL is needed for the app stores (D-15). We do not write it.
- Retention of addresses and accounts: Unknown. Owner: you.
