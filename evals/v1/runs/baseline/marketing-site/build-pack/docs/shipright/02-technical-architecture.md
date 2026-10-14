# 02 - Technical architecture

**Project path:** `docs/shipright/02-technical-architecture.md`
**Version/date:** 0.1, 2026-10-13
**Sources and approval:** R1 founder request; R2 delegation; D4 in `docs/shipright/01-prd.md`.

A one-page site with one form endpoint. Keep it small.

## Systems and stack

| Component | Responsibility | Chosen technology or Unknown | Source / owner |
| --- | --- | --- | --- |
| Web framework | Serve S1 and one server endpoint | Unknown. Proposed if the founder has no preference: Next.js (App Router), TypeScript, plain CSS with the DESIGN.md variables. Any framework that serves static HTML plus one server route works. | Founder |
| Hosting and domain | Serve trysocialghost.com over HTTPS | Unknown | Founder |
| Application endpoint | Validate, store, notify | `POST /api/apply` (D4) | D4 |
| Application storage | Keep applications where the founder can read them | Unknown. Founder picks one tool (D4) | Founder |
| Founder notification | Tell the founder a new application arrived | Unknown. Founder picks (D4) | Founder |
| Analytics | None approved | Not added | D1 exclusions |
| Fonts | Space Grotesk and Inter | Google Fonts, or self-hosted copies of the same families | D6 |

## Data and integrations

| Object / system | Read/write direction | Approved fields | Access boundary | Failure behavior |
| --- | --- | --- | --- | --- |
| Application | Browser writes once to `/api/apply`; endpoint writes to storage | `name`, `email`, `channel_url` (optional), `plans`, `feedback_commitment` (true), `submitted_at` (server time) | Public write only. No public read. | Endpoint returns an error; the form keeps all answers and shows "Your application was not sent." |
| Honeypot `website` field | Browser sends; endpoint discards | Must be empty | Hidden from people and assistive tech | If filled, endpoint returns the normal success response and stores nothing |

### Endpoint contract

```text
POST /api/apply
Content-Type: application/json
Body: { name, email, channel_url, plans, feedback_commitment, website }

Server validation (repeat of client rules, server is the authority):
  name: required, trimmed, 1 to 100 characters
  email: required, valid email format, up to 254 characters
  channel_url: optional; if present, must be an http(s) URL, up to 300 characters
  plans: required, trimmed, 1 to 1000 characters
  feedback_commitment: must be true
  website: honeypot; must be empty

Responses:
  200 { ok: true }                         stored and founder notified (or notification queued)
  400 { ok: false, fields: { name: "..." } } field errors in plain words
  429 { ok: false }                        too many requests from this client
  500 { ok: false }                        storage failed; nothing stored
```

Return 200 only after the application is stored. If notification fails but storage worked, still return 200 and log the notification failure without applicant details.
Duplicate emails are stored as separate rows. The founder dedupes by email.

## Constraints

- Responsive from 320 CSS px. No horizontal scroll at any width.
- Page must work without JavaScript for reading. The form needs JavaScript for inline states; without JavaScript it posts normally to `/api/apply` and the endpoint may redirect to `/#apply-sent`. Proposed, optional.
- No third-party scripts other than fonts.
- Rate limit: Proposed 5 requests per 10 minutes per IP. Exact value is the builder's call.

## Dependencies and open decisions

| Unknown / decision | Blocks what | Owner | Next evidence |
| --- | --- | --- | --- |
| Framework and hosting | T1 setup | Founder | Name the stack, or accept the proposal |
| Storage and notification tool (D4) | T5 endpoint finish | Founder | Name the tool |
| Privacy text (D8) | Launch | Founder and adviser | Supplied text |
