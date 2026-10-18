# Frontend spec

Tokens and component names: [DESIGN.md](../../DESIGN.md). Copy below is final unless marked sample. All agent data is **sample data**. Status vocabulary and actions: [01-prd.md](01-prd.md).

## S1. Agents list (route `/`)

**Job:** see which agents need a person, find one, open it. Serves J1, J5.
**Layout, top to bottom (1280):**
1. Top bar 48: "Agent Desk" left; "Working name. Sample data." right, muted.
2. Page header: H1 "Agents". No primary action.
3. Controls row: Segmented control "Needs attention (n) / Running (n) / All (n)", then Search input "Search agents", then Select "Team" (All teams plus each team).
4. Count line under controls, always visible: "29 agents", or "Showing 12 of 29 agents" when a view, search or team narrows it. A separate polite live region announces the new count after a change, never on load.
5. Table: Agent (name 600, purpose muted below), Status chip, Current work, Team, Last active (right, tabular). Order: Failed, Waiting for you, Running, Paused, Idle; newest activity first inside each. Default view: Needs attention if any exist, else All.
**Components:** Segmented control, Search input, Select, Table, Badge. Agent name is a native button that opens S2.
**States:**
- Loading: 8 skeleton rows, `aria-busy`, hidden text "Loading agents".
- Empty (no agents): "No agents yet. Agents appear here once they are connected to Agent Desk." No action.
- Error: Alert "Agents did not load. Check your connection and try again." with Try again.
- No matches: "No agents match your search. Clear search and filters" clears only those criteria.
- Needs attention empty: "Nothing needs you right now." and the All view stays one click away.
**Responsive:** below 760 the table becomes stacked rows: name and status line one; current work, team and time below. Controls stack, 44 px high. Primary task (opening an agent) stays at the top.
**Accessibility:** real table with `th scope`; sticky header does not hide focus (scroll padding 48). Radio group has a legend. Status never color alone. Focus ring 2 px accent.
**Do not add:** summary cards, charts, feed, welcome line, row menus, sort controls, bulk select.
**Acceptance:** 0, 1, 29 rows fit at 390 and 1280 without sideways scroll; a Failed agent is the first row; Tab reaches each agent name; Enter opens it.

## S2. Agent panel (drawer over S1, `/?agent={id}`)

**Job:** understand one agent and act. Serves J2 to J4.
**Layout:** header (name 16/600, status chip, Close button with icon and the word Close); status line (hidden until a result, then a message with Dismiss and, for Pause, Undo); purpose and team; Request block or Failure block when the status is Waiting for you or Failed; Recent runs (up to 4: time, outcome, summary); footer with Pause agent or Resume agent.
**Actions:**
- Waiting for you: **Approve** (filled) then **Decline** (outline). Decline swaps in "Decline this request? [Agent] will not [request] and its current run ends." with Cancel and **Decline request** (red filled).
- Failed: **Retry run** (filled). Cause in plain words above it.
- Footer: **Pause agent** (outline) except while a request is open; **Resume agent** when Paused. Pause result: "[Agent] is paused. Undo".
**States:** acting (control disabled, label "Approving..."), success (status line), runs failed to load ("Recent runs did not load. Try again." the rest stays usable), unknown agent ("That agent was not found.").
**Responsive:** full screen below 760, footer pinned.
**Accessibility:** modal dialog, focus to Close, Tab contained, Escape closes, focus returns to the agent's row name, or to the view control if that agent left the current view (then a polite announcement says so). After an action focus moves to Undo if offered, else to Close. Status line is `role="status"`.
**Do not add:** logs, cost, edit, delete, charts, chat with the agent.
**Acceptance:** Approve on a Waiting agent shows Running in the row behind; Pause then Undo restores the old status; Escape returns focus to the same name.

## Flow rules (F1 to F3)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->
