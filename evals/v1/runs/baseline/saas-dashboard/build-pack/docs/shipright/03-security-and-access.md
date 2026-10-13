# 03 - Security and access

**Project path:** `docs/shipright/03-security-and-access.md`

**Version/date:** v0.1, 2026-10-13. **Sources and approval:** D1 (approved by delegation). D7 is Unresolved: delegation does not cover access policy.

This records product access rules. It is not a security audit or legal review.

## Roles and authentication

| Actual role | User job | Sign-in requirement | Source |
| --- | --- | --- | --- |
| Staff member | J1 to J5 | Email magic link (Proposed, D8). Public sign-up off. Only invited emails can sign in. | D1, D8 |

There is one role in Phase 1. No Owner/Admin split is built unless D7 asks for it.
Session length, recovery and sign-out on all devices: Unknown, use the provider defaults and record them once chosen.

## Permission matrix

| Action | Actual actor | Allowed scope | Denied behavior | Source |
| --- | --- | --- | --- | --- |
| View projects (active and completed) | Staff | All projects | Not signed in: redirect to S0, then back to the page asked for | D1 |
| Add project | Staff | Any client | Not signed in: as above | D3; edit rights D7 Unresolved |
| Edit project fields, including budget and spent | Staff | Any project | Not signed in during save: "You were signed out. Sign in again, then save." Values stay on screen. | D3; D7 Unresolved |
| Mark Completed / Active | Staff | Any project | As above | D3; D7 Unresolved |
| Add client (by typing a new name) | Staff | Clients table | As above | D3 |
| Delete project or client | Nobody in Phase 1 | Not applicable | No control exists | D10 Proposed |

**Proposed for D7:** every staff member may do every action above. If the owner wants only some people to change budgets, that adds a role and a server check; do not build it until decided.

## Data boundaries

| Data | Who may see/change it | Storage/logging/URL limits | Retention source |
| --- | --- | --- | --- |
| Projects, budgets, spent | Signed-in staff (D1; change rights D7) | Never put amounts in URLs or analytics. No client-side logging of form values. | Unknown, owner to decide |
| Client names | Signed-in staff | Same | Unknown |
| Staff names and emails | Signed-in staff (for Lead select) | Emails never in URLs or logs | Provider defaults |

UI visibility is not access enforcement. Required server-side boundaries:
- Row-level security on `projects`, `clients`, `staff`: `select`, `insert`, `update` only for `authenticated` users who have a `staff` row. No `delete` policy.
- Server actions check the session before every write.
- The browser never holds a service-role key.

## Consequential actions

| Action/object | Effect | Confirmation or supported undo | Recovery | Authority |
| --- | --- | --- | --- | --- |
| Save project | Overwrites the project's fields | None; it is an edit. Conflict check stops silent overwrite of someone else's save. | Edit again | D3 |
| Mark Completed | Project leaves the Active view and shows in Completed | None | Set status to Active again | D3 |
| Close S2 with unsaved changes | Typed changes are lost; nothing saved changes | Inline prompt: "You have unsaved changes." Keep editing / Discard changes | Keep editing returns to the form | F1 |

## Risks and open choices

- D7 edit rights: owner. Blocks T3.
- Budget figures are commercially sensitive. Keep invited-only sign-in and no public sign-up. Not a compliance claim.
- Retention and removal of old projects: Unknown, later.
