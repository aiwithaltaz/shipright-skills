# Tickets

Paste one at a time into your coding tool. Standing rules: [build-rules.md](build-rules.md). A reference build of S1 exists as `index.html` in the project root; match its look and copy, not its in-memory data.

## T1. Foundation and /design page        Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: Project set up with the approved look, shown on a preview page.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css.
Build:
1. Next.js (App Router), TypeScript, Tailwind. Wire Tailwind to the variables in design/tokens.css.
2. Route /design showing type scale, color roles, spacing, buttons (primary, secondary, text, danger text), text input, textarea with count, date and time inputs, segmented control, four status badges, Alert, Dialog, skeleton rows.
Do not add: any product screen, sign-in, database.
Done when:
- /design renders at 390 and 1280 px without sideways scroll.
- No hardcoded colors or spacing values.
- Every control shows a visible focus ring.
Stop: Reply with changed files and how you checked. Wait for the owner's OK of the look.
---

## T2. Sign-in with LinkedIn and app shell        Size: one sitting   After: T1
---
Goal: An owner signs in with LinkedIn and lands on an empty Queue.
Read first: build-rules.md, 02-technical-architecture.md, 04-frontend-spec.md (S0, S1 header).
Build:
1. Supabase tables and row-level security from the architecture file. Only profiles and connections now.
2. `/` shows S0 copy. "Connect LinkedIn" starts OAuth; `/api/linkedin/callback` stores the connection, token encrypted.
3. `/queue` shows the top bar and the header with no posts.
Env names only, from the architecture file. Do not add: email sign-in, any publishing.
Done when: a declined authorization returns to S0 with the written message; a signed-out visit to /queue redirects to /.
Stop: report, do not start T3.
---

## T3. Queue list        Size: one sitting   After: T2
---
Goal: Posts appear grouped by day with status badges.
Read first: build-rules.md, 04-frontend-spec.md (S1), index.html.
Build: `posts` table and RLS; server-load upcoming and published; rows, day groups, "Nothing planned", segmented counts.
Do not add: search, filters, summary cards.
Done when: 0, 1 and 40 posts render at 390 and 1280 px; Tab reaches every row; selected row has aria-current.
Stop: report.
---

## T4. Editor and drafts        Size: one sitting   After: T3
---
Goal: Create, edit and delete drafts.
Read first: build-rules.md, 04-frontend-spec.md (S2).
Build: New post, editor panel and phone drawer, autosave with truthful status, 3,000 limit with count, delete dialog.
Done when: a draft survives reload; over 3,000 keeps the text and disables approval with the written reason; Escape closes the dialog and focus returns to its trigger.
Stop: report.
---

## T5. Approve, schedule, back to draft        Size: one sitting   After: T4
---
Goal: Approval is the only way a post becomes Scheduled.
Read first: build-rules.md, 04-frontend-spec.md (S2).
Build: Approve and schedule validates text, limit and a future time in the saved time zone; Scheduled is read only; Move back to draft.
Done when: a past time is refused with the written error; a Scheduled post cannot be edited until moved back; the live region announces each change without moving focus.
Stop: report.
---

## T6. Publisher        Size: one sitting   After: T5
---
Goal: Due, approved posts publish once through the official API.
Read first: build-rules.md, 02-technical-architecture.md.
Build: `/api/cron/publish` guarded by CRON_SECRET; picks due Scheduled posts; one call each; store LinkedIn post id; Failed with a reason; unknown outcome sets "Check LinkedIn" and no automatic retry; Retry now disabled while running.
Done when: a test run with a stubbed LinkedIn client shows Published, Failed and unknown-outcome paths and never publishes twice.
Stop: report. Do not call the real LinkedIn API without the owner's OK.
---

## T7. Connection states and Settings        Size: one sitting   After: T6
---
Goal: Expiry is visible and recoverable.
Read first: build-rules.md, 04-frontend-spec.md (S1 alerts, S3).
Build: Expired alert with Reconnect, approval disabled with its reason, S3, disconnect dialog, loading, empty and error states from the spec.
Done when: with an expired connection, Reconnect is one click from S1 and due posts become Failed with the reason.
Stop: report.
---

## T8. Draft with AI (only if the owner says yes)        Size: one sitting   After: T4
---
Goal: A button fills the text box from a short idea. The owner edits and approves.
Build: one server route, key in AI_API_KEY, never in the browser; label output "Draft"; no auto-approve.
Done when: output lands as an editable Draft and is never Scheduled automatically.
Stop: report.
---

## T9. QA pass        Size: one sitting   After: T7
---
Goal: Checks on every screen.
Build: keyboard-only run of J1 to J5, 390 and 320 px, 200% text, contrast measured, reduced motion, project checks.
Done when: a written list of Pass, Fail and Not verified with evidence. Fix every Fail.
Stop: report.
---

## T10. Launch check
Hand to ship-check once a URL exists. Not started without the owner's OK.
