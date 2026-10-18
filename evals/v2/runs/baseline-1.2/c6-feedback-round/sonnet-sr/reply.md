The registration desk is rebuilt as `index.html` with your changes. I asked no questions, because every change you listed was clear.

**Removed**
- The dot on the selected nav item. It is now just the fill, bold text and a red icon.
- "Filter: All Attendees". Search Records and Clear are still there.
- "Query: Test" next to the results heading.
- "Synced to event sheet".
- The top-right box. Profile now appears once, bottom left.
- The Checked In and In Queue counters.
- The Name / Phone, Scan QR and Family ID tabs.
- The printer and badge stock panel.

**Kept as in your crops**
- Escalations and Desk help, and Record donation.
- The nav list from crop 1, including the "2" count on Registrations.

**Changed**
- The selected row has one even red border on all four sides, with no thick left bar. The checked checkbox also marks it, so it doesn't rely on color alone.
- In progress has a "View all" link under the card. It opens a side list of everything saved but unfinished, with Close, Esc and click-outside to leave. I chose this over a "clear" button, because clear could mean hide, abandon the draft or delete, and I didn't want to guess. Today the list shows the one real item.

**Things I decided that you may want to reverse**
- **Check-in items:** because check-in comes later, I also removed the Quick Check-In button on Karim's row and the "In Queue" tag on Sami.
- **Left in place, tell me if they are check-in too:** the "Fast Track" button on Rahim's row and the "Badge printed" tag on Aliyah's row.
- **Results count:** your screen said "7 people found" but showed 4 people, and I didn't invent three more. It now reads "4 people found" and "Select all 4".
- **Selection bar:** it said "...before proceeding to badge print", which points at a step that isn't in this phase. It now reads "Confirm the attending party before continuing." The bar also no longer hides the last row.
- **Placeholder text:** slightly darker than your screenshot, so it is easier to read.
- **Narrow screens:** below about 900px the sidebar becomes a strip across the top, and the profile moves to the bottom of the page.

**How it was checked:** I rendered it at 1600, 1280, 768 and 390 pixels wide, with no sideways scroll at any size. I also tried the interactions in a headless browser: View all, Esc, select all, Clear selection, and a search that finds nothing. The pack's own `check-ui.mjs` checker wasn't in the folder, so it was not run. I did not test screen readers or full keyboard tab order.

**Limits of this version:** Continue, Edit, View and the nav links aren't wired to anything. Search only filters the four sample people by first and last name, and Sort only has "Relevance". The logo is my approximation of yours.

Notes are in `build/change-record.md`.
