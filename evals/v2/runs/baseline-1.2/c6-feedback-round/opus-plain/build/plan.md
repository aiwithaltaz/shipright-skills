# Registration desk — feedback round plan

User reply to questions: "You decide anything I did not say. Build it now."

## Requested changes (from the user)
| # | Change | Done how |
|---|--------|----------|
| 1 | Remove dot on selected nav item | Active item keeps tint + icon colour only |
| 2 | Keep Escalations + Desk help (crop 2) | Unchanged, top bar right |
| 3 | Keep Record donation (crop 3) | Unchanged, page header right |
| 4 | Remove "Filter: All Attendees" (crop 4) | Removed; Search + Clear only |
| 5 | In progress needs View all / way to clear (crop 5) | "View all" link in header opens a side panel; each saved item has Remove (with Undo); panel has Clear all (with Undo) |
| 6 | Selected row: clean border all round, no thick left bar | 1.5px accent border on all sides + light tint |
| 7 | Remove "Query: Test" chip (crop 6) | Removed |
| 8 | Remove "Synced to event sheet" | Removed |
| 9 | Profile only bottom left; remove top-right box | ⌘K box removed; profile card stays bottom left |
| 10 | Remove Checked In / In Queue counters | Removed |
| 11 | Remove Name / Phone, Scan QR, Family ID tabs | Removed; the form is the only search mode |
| 12 | Remove printer / badge stock panel | Removed; right column is In progress only |
| 13 | Registration only, check-in later | See decisions below |

## Decisions I made (user said "you decide")
- **Check-in wording swapped for registration wording**
  - Quick Check-In / Fast Track → "Register" (only on people not yet registered)
  - "In Queue" tag → "In progress" (matches the In progress panel)
  - "Badge printed" tag → "Registered"
  - Bottom bar line → "Review the party, then continue to registration"
  - Subtitle → "Find a person, register them, and finish what they still need."
- **Clear = remove from In progress, with Undo** (5 s toast). Safer than a hard delete with no way back.
- **View all = side panel on this screen**, so the desk person doesn't lose their search.
- **Panel shows the newest saved item**; the count badge shows the total (3 in demo data).
- **Session #488** moved from the panel header into the card meta line, to make room for "View all".
- **Selection** only from the checkbox (or Select All), so clicking buttons in a row doesn't select it by accident.
- **Bottom selection bar** only shows when 1+ people are selected, and the page gets bottom padding so it never covers the last row (it did in the old screen).
- All 7 results are listed (old screen said 7 but showed 4).
- Buttons that lead to screens not built yet (View, Edit, Continue, Record donation, etc.) show a short toast instead of going nowhere.

## Layout
- Sidebar 300px: logo block, nav (Registration desk active, Registrations 2, Reports, Cash close, Escalations, FAQ), profile card at bottom.
- Top bar: breadcrumb (Central USA / Dallas HQ desk) left; Escalations + Desk help right.
- Header: title + subtitle left; Record donation right.
- Row: Find a person card (wide) + In progress card (360px).
- Results: "N people found", Sort by, Select all N; row cards.
- Narrow screens: In progress stacks under search (<1180px); sidebar becomes a top strip (<820px).

## States covered
- Search with results / no matches / nothing typed yet
- Selected row, multiple selected, none selected
- In progress: items, empty (after clear), undo
- Field clear (x) buttons, Enter to search, Esc closes the side panel
