# Frontend spec

Tokens and placement: [DESIGN.md](../../DESIGN.md) and [design/tokens.css](../../design/tokens.css). Product scope: [01-prd.md](01-prd.md). All names, times and post text below are sample data.

F1 to F3 (copied from the canonical export):
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.

## S0 Connect LinkedIn  (route `/`, not built in the preview)

- **Job and source:** Sign in and authorize posting. PRD J1.
- **Layout:** Product name, one heading "Plan, approve and schedule your LinkedIn posts", two sentences saying what it does and what it does not do, one filled button "Connect LinkedIn".
- **Copy:** "Posts go out through LinkedIn's official posting access, only after you approve each one. Postdesk does not send connection requests or messages, and does not read other people's profiles."
- **States:** Redirecting ("Taking you to LinkedIn"), Declined at LinkedIn ("LinkedIn access was not granted. Nothing was saved. Try again."), Error with Try again.
- **Exit (F1):** Declining returns here, nothing saved.
- **Accessibility:** One h1, button is a native button, focus on h1 after a failed return.
- **Do not add:** feature grid, testimonials, pricing, logos.

## S1 Queue  (route `/queue`, built in `index.html`)

- **Job:** See every upcoming post by day, open one, add one. PRD J2 to J5.
- **Layout, top to bottom:** Preview strip (preview only). Top bar: name, nav (Queue, Settings), connection status at the right end. Alert region (expired connection, or a failed post). Header: "Queue", one muted line with today and time zone, "New post" filled button on the right. Segmented control Upcoming (n) and Published (n). List grouped by day, with "Nothing planned" and "Add post" on empty weekdays. Editor panel at the right, 440 wide.
- **Row:** fixed 76 px time, first line of the post (weight 500), second line muted, status badge at the right. Whole row is one button. Selected row: tint, 1 px accent border, `aria-current`.
- **States:** populated, empty ("No posts yet. Write your first post to start your queue."), loading skeleton with "Loading your posts", failed post alert, expired connection alert with Reconnect. Published empty: "Nothing published yet."
- **Responsive:** under 900 px the editor becomes a full-screen drawer. Under 760 px rows become two lines (time and badge, then text) and "New post" moves to a bottom bar.
- **Accessibility:** list is plain buttons in `ul`; Tab reaches each row; opening a row moves focus to the editor heading; Back returns focus to that row.
- **Do not add:** summary cards, charts, activity feed, notification dots, search, filters beyond status.

## S2 Post editor  (beside the list, or a drawer)

- **Job:** Write, approve, return to draft, retry, delete a draft.
- **Layout:** Heading by status, badge, Close or Back to queue. Alert for the status. "Post text" textarea with count "n / 3,000". Date and Time inputs and the time zone. Footer: "Delete draft" at far left, secondary then primary at the right.
- **Actions by status:** Draft: Approve and schedule. Scheduled: Move back to draft, fields read only. Failed: Retry now and Move back to draft. Published: read only, no actions.
- **Disabled primary:** the reason appears under the buttons: "Add text, a date and a time to approve." Never a bare disabled button.
- **Delete:** native dialog "Delete this draft?" Cancel left, "Delete draft" right. Escape closes it. Focus returns to the trigger.
- **Status (F3):** "Draft saved in this preview" is prototype wording; production says "Saved" only after the server confirms, and "Not saved. Try again." on failure.
- **Over the limit:** count turns red with "Over by n", the text is kept, approval is disabled.

## S3 Settings  (route `/settings`, not built in the preview)

- **Job:** See the connection, reconnect, disconnect, set time zone. PRD J5.
- **Layout:** Connection row with state text and "Reconnect LinkedIn" or "Disconnect". Time zone select. Disconnect dialog: "Disconnect LinkedIn? Scheduled posts will not publish until you connect again. Your drafts and posts stay here."
- **States:** Connected, Expired, Disconnected, Saving time zone, Error.
- **Do not add:** billing, team, notification settings.
