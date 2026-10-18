# PRD: Postdesk (working name)

Version 0.1, 2026-10-16. Status: Proposed (delegated), awaiting owner approval.
Phase: Release 1, "Write, approve, schedule".

## Frame

- **Who:** One person managing their own LinkedIn profile. Proposed (delegated).
- **Job:** Plan a week of posts, write each one, approve it, and have it published at the chosen time through LinkedIn's official posting API.
- **What they do today:** Unknown. Likely notes or a spreadsheet plus posting by hand. Owner to confirm.
- **This release finishes:** One screen where every upcoming post is visible by day, can be edited, approved with a time, and later shows whether it published.
- **What stays out:** see "Not in this release".
- **Success check (observable):** A new user connects LinkedIn, writes three posts, approves them with times, and sees each one move to Published at its time without opening LinkedIn.

## Platform limit, stated plainly

LinkedIn's rules prohibit bots and browser extensions that automate activity on the site, and scraping. The official route lets a signed-in member authorize an app to post for them. This product uses only that route. Every post needs the owner's explicit approval before it can publish. A request for auto-connect, auto-message, auto-comment, auto-like or profile scraping is declined for this product, not deferred. Source to re-check before build: LinkedIn Help, "Prohibited software and extensions", and the LinkedIn Developer Program terms. Owner is responsible for confirming current terms.

## Users and roles

One role: the owner of the account. No admin, no team, no sharing. Sign-in is LinkedIn sign-in only (see architecture). Hidden navigation is not access control; every row is filtered by the signed-in user on the server.

## Objects

| Object | Fields | States |
| --- | --- | --- |
| Post | text (max 3,000 characters), scheduled time (optional), status | Draft, Scheduled, Published, Failed |
| Connection | LinkedIn member, authorization state, expiry | Connected, Expired, Disconnected |
| Settings | time zone | n/a |

Draft means not approved. Scheduled means the owner approved it and a time is set. Published means LinkedIn accepted it. Failed means LinkedIn did not accept it and nothing was posted. These four are separate facts and never share one badge.

## Jobs and flows

| Job | Trigger | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- | --- |
| J1 Connect | First visit, or Reconnect | S0 with one button "Connect LinkedIn" | Sends the user to LinkedIn to approve access | Returns to Queue | Cancel at LinkedIn returns to S0, nothing saved |
| J2 Write | New post, or pick a row | S2 editor beside the list | Draft is saved as the user types | Approve, or leave as draft | Close returns to the list, draft kept |
| J3 Approve and schedule | Approve and schedule | Row becomes Scheduled with its time | Post is queued for that time | Back to draft if plans change | Scheduled posts can return to Draft |
| J4 Publish | The set time arrives | Row becomes Published or Failed | App calls the official API once | Failed: Retry now, or edit | Failed posts are never retried silently |
| J5 Reconnect | Connection expired | Alert on S1 | Posts due while expired do not publish | Reconnect | Due posts show as Failed with the reason |

Flow rules F1 to F3 are in [build-rules.md](build-rules.md). Duplicate publishing is prevented: Retry now is disabled while a publish is running, and a post that may already be on LinkedIn shows "Check LinkedIn before retrying".

## Release scope

- S0 Connect LinkedIn
- S1 Queue (the main screen): week list, filter by status, row selection
- S2 Post editor (beside the list on desktop, full screen on phone)
- S3 Settings: connection state, reconnect, disconnect, time zone

## Not in this release

Connection requests, direct messages, comments, likes, profile or lead scraping, browser extension, multiple profiles or clients, team approval, company pages, images and video, polls, analytics and impressions, AI that publishes without approval, AI that generates comments or messages, import from other tools, recurring schedules, billing. These are notes, not UI, disabled placeholders, hidden routes or data models.

Open for owner: "Draft with AI" in the editor. Proposed as in scope because it only fills the text box and the owner edits and approves. If the owner prefers none, remove ticket T8.

## Decision log

| ID | Decision | Status | Source |
| --- | --- | --- | --- |
| D1 | One person, own profile | Proposed (delegated) | "You decide everything" |
| D2 | Posting only, official API, approval on every post | Proposed (delegated) | Delegated, grounded in LinkedIn rules |
| D3 | Starter A "Calm dense", accent changed to deep teal | Proposed (delegated) | Delegated |
| D4 | Stack in architecture file | Proposed | Delegated |
| D5 | "Draft with AI" fills the text box only | Proposed | Delegated |
| D6 | Working name Postdesk | Proposed, placeholder | Delegated |

## Unknown, with owner

| Unknown | Owner |
| --- | --- |
| Product name, domain, logo | Owner |
| Price and plan, billing | Owner. Never delegated. |
| Privacy policy and terms text | Owner or qualified reviewer. Not written here. |
| Whether LinkedIn approves the developer app for the posting product, and the token lifetime and refresh rules granted | Owner, at LinkedIn Developer Portal. Design assumes tokens expire and need Reconnect. |
| Whether the owner wants "Draft with AI" and which model provider | Owner |
| Current way the owner posts today | Owner |
| Exact number of characters shown before "see more" | Unknown. Not shown in the UI. |

## Success checks per job

- J1: a user with no prior setup reaches S1 connected in under three clicks after sign-in. Method: walkthrough.
- J2: a draft survives closing the editor and reloading.
- J3: a Scheduled row shows its time and can be returned to Draft.
- J4: after the set time, the row shows Published or Failed with a reason. It never shows Scheduled for a past time.
- J5: with an expired connection, the user can reach Reconnect from S1 in one click.
