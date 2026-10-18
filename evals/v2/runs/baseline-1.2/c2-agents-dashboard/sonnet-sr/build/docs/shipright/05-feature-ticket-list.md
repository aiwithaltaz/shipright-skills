# Tickets

Paste one ticket at a time into your coding tool. Each is sized for one sitting. Standing rules: [build-rules.md](build-rules.md). Screens: [04-frontend-spec.md](04-frontend-spec.md). Order matters. T1 stops for your OK of the look.
A static visual reference, `index.html`, may sit beside this pack. It is a sample-data preview, not code to ship.

## T1. Foundation and look preview        After: none
Paste this into your coding tool:
---
Goal: The project exists with the Proposed look, and you can approve it on one page.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/02-technical-architecture.md.
Build:
1. Create the Next.js (TypeScript) app with Tailwind and shadcn/ui. Copy design/tokens.css and load it globally.
2. Route `/design`: type scale, color roles, status chips (all five), buttons (primary, outline, red), fields, an Alert, a Skeleton row.
Use only tokens from design/tokens.css. No other screens.
Do not add: dark mode, other fonts, icons beyond the set in DESIGN.md.
Done when: `/design` shows every item at 1280 and 390 wide; no hardcoded colors or spacing; focus ring shows on every control.
Stop: Do not start T2. Reply with changed files and how you checked. Wait for the owner's OK of the look.
---

## T2. Shell and sample data        After: T1
---
Goal: Route `/` loads the fleet through one function.
Read first: build-rules.md, 02-technical-architecture.md (Data model, Routes), DESIGN.md.
Build:
1. `data/agents.sample.json` with 29 clearly labeled sample agents across 7 teams and all five statuses.
2. `getFleet()` returns them. It is the only place that reads the source.
3. Top bar: "Agent Desk" and "Working name. Sample data." Page title H1 "Agents". Skip link "Skip to agents".
4. 404 page with a link to `/`.
Do not add: sign-in, database, realtime, nav links.
Done when: `/` renders the H1 and a count; an unknown route shows the 404 with a working link; no secrets in code.
Stop: Do not start T3.
---

## T3. S1 list, happy path        After: T2
---
Goal: The operator sees agents that need a person first.
Read first: build-rules.md, 04-frontend-spec.md (S1), DESIGN.md.
Build:
1. Segmented control Needs attention (n), Running (n), All (n). Default Needs attention if any exist, else All.
2. Table: Agent with purpose line, Status chip, Current work, Team, Last active. Sort Failed, Waiting for you, Running, Paused, Idle; newest first inside each.
3. Count line: "29 agents" or "Showing 9 of 29 agents".
4. Agent name is a native button (opens S2 in T6). Times are tabular and right aligned.
Do not add: summary cards, charts, feed, sort controls, bulk select, row menus.
Done when: 0, 1 and 29 rows fit at 390 and 1280 with no sideways scroll; first row is a Failed agent; Tab reaches each name; chip text is readable without color.
Stop: Do not start T4.
---

## T4. S1 search and team filter        After: T3
---
Goal: The operator finds one agent among many.
Read first: build-rules.md, 04-frontend-spec.md (S1), 02-technical-architecture.md (Routes).
Build:
1. Search input "Search agents" (name or purpose) and Select "Team" with visible labels.
2. Query params `q`, `team`, `view`. Keep `q` out of analytics and logs.
3. Counts in the control follow search and team. Polite live region announces the new count after a change.
4. No matches: "No agents match your search" and a button "Clear search and team" that clears only those two.
Do not add: saved views, extra filters, query chips.
Done when: typing "invoice" shows 2 of 29; Clear restores 29; the control counts update; keyboard only works end to end.
Stop: Do not start T5.
---

## T5. S1 states        After: T4
---
Goal: Every list state is covered.
Read first: build-rules.md, 04-frontend-spec.md (S1 States), DESIGN.md.
Build: Loading (8 skeleton rows, `aria-busy`, hidden "Loading agents"), Empty ("No agents yet" with its sentence, no action), Error (Alert, Try again), Needs attention empty ("Nothing needs you right now", button "Show all agents"). Add a dev-only switch to view each; remove it before launch.
Do not add: onboarding, retry timers.
Done when: each state renders at 390 and 1280; Try again reloads; no state shows an error on first view.
Stop: Do not start T6.
---

## T6. S2 agent panel, read only        After: T5
---
Goal: The operator opens an agent and understands it.
Read first: build-rules.md, 04-frontend-spec.md (S2), DESIGN.md.
Build: Drawer on Radix Dialog at `/?agent={id}`. Header, purpose, Request or Failure block (text only, no actions yet), facts, Recent runs. Close button, Escape, backdrop and Back close it. Focus to Close on open and back to the row name on close. Unknown id: "That agent was not found." Runs failed: Alert "Recent runs did not load." with Try again.
Do not add: logs, cost, edit, chat.
Done when: keyboard open and close returns focus; Tab stays inside; full screen at 390; Back closes without leaving the app.
Stop: Do not start T7.
---

## T7. S2 actions        After: T6        BLOCKED by access policy
---
Goal: The operator approves, declines, retries, pauses and resumes.
Read first: build-rules.md, 03-security-and-access.md, 04-frontend-spec.md (S2 Actions).
Do not start until the owner supplies who may do each action. Then:
1. Implement `canAct(user, agent, action)` from that policy. Check it on the server for every request.
2. Approve, Decline with inline confirm, Retry run, Pause agent with Undo, Resume agent. Disable the control while a request runs and keep the server idempotent.
3. Status line inside the drawer. Row updates behind the drawer. Failures keep the drawer open: "That did not go through. Try again."
Do not add: bulk actions, notifications.
Done when: a denied person sees the limit in plain words and a way back; double click sends one request; Pause then Undo restores the status.
Stop: Do not start T8.
---

## T8. QA pass        After: T7 (or T6 if T7 is blocked)
---
Goal: The built screens meet the checks.
Read first: build-rules.md, state-coverage criteria summarized there.
Do: keyboard pass through S1 and S2; 390 and 320 wide; text zoom 200 percent; contrast of every status chip; reduced motion; the project's own lint and tests. Fix defects only.
Done when: no sideways scroll; focus never hidden by the sticky header; every chip readable without color.
Stop: Report what was tested and what was not.
---

## T9. Launch check        After: T8
Hand to ship-check with a real URL. Nothing is deployed, published or paid for without the owner's OK.
