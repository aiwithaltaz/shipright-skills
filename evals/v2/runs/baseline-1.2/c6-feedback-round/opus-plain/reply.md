I rebuilt the registration desk as `index.html` with all your changes. It's a single file with no outside fonts or libraries, so it opens from any static server.

**Your changes**
- **Nav:** no dot on the selected item. It still has the tint and the rust-coloured icon.
- **Kept as they were:** Escalations + Desk help (top right) and Record donation.
- **Removed:**
  - Filter: All Attendees
  - Query: "Test"
  - Synced to event sheet
  - the ⌘K box at the top right
  - the Checked In and In Queue counters
  - the Name / Phone, Scan QR and Family ID tabs
  - the printer and badge stock panel
- **Profile:** only at the bottom left now.
- **Selected row:** an even border on all four sides with a light tint behind it. The thick left bar is gone.
- **In progress:**
  - **View all** in the header opens a side panel listing every saved registration
  - each one has an **×** to remove it
  - the panel has **Clear all**
  - every removal can be undone for a few seconds

**Things you didn't specify, so I chose**
- **Registration only:** I took out the remaining check-in wording.
  - "Quick Check-In" and "Fast Track" became **Register**, shown only for people who aren't registered yet
  - the "In Queue" tag became **In progress**, to match the panel
  - "Badge printed" became **Registered**
  - the bottom bar now says "Review the party, then continue to registration"
- **What "clear" does:** removing an item only takes it off this list. I added undo because a desk volunteer could easily tap × by accident.
- **View all** opens a side panel on this screen, so you don't lose your search results.
- **Panel contents:** the panel shows the newest saved item, and the badge shows the total. I put 3 in the demo so View all has something to show.
- **Session #:** I moved it onto the card to make room for View all.
- **All 7 results are listed.** The old screen said 7 but only showed 4.
- **Bottom bar:** it only appears when someone is selected. The page also has room at the bottom now, so the bar no longer covers the last row.

**What works in the demo**
- Search filters by name, phone or email
- Clear empties the form and shows an empty state
- Sort, Select all and the per-row checkboxes work
- On phones, the sidebar collapses into a top strip

Buttons for screens that don't exist yet (View, Edit, Register, Continue, Record donation and so on) show a short message instead of doing nothing.

**Worth checking:** Escalations is still in both the sidebar and the top bar, as you asked. If one place is enough, I'd keep it in the sidebar.
