# Clarity rules (hard, every style pack)

The look comes from the style pack. These rules do not change with the look. A first-time user must read every screen without guessing.

## States
- Every state a mark can have gets its own clear look AND a visible legend on the same screen: **Done, Missed, Today, Ahead** (and **Off** for days the item is not due).
- Done uses a filled mark with a check icon. Never cross out the main text (no line-through). Done text stays fully readable.
- Never show a state by color alone. Add an icon, a fill or an outline, plus the legend.

## Numbers
- Plain counts in words: "3 of 5 done", "12-day streak", "18 of 28 days". Not "3/5", "5/4", "60%" alone.
- No ratio or count that can look wrong (a count above its total, a streak bigger than the history shown). Check sample data for this.
- Every number has a label next to it.
- **One count only:** never show the same metric twice in different forms on one screen (no ring "3/5" plus "3 of 5 done" plus "60%"). Pick one form, show it once.

## History grids and charts
- Label every grid: weekday letters on top (M T W T F S S) and the date range ("Sep 24 to Oct 21") below or above.
- Today is outlined in the grid. Days after today show as Ahead, not as Missed.
- Phone grids are calm: at most 4 weeks, cells at least 28 px with 6 px gaps, one mark per cell, no extra text inside cells. Fewer, bigger cells beat a busy grid.
- Charts have values on each bar and a title that says what is counted.

## Add and edit
- The add form has a name field, a frequency choice (**Every day**, **Weekdays**, **Pick days**) and a 7-day picker for Pick days. Show which days are picked with fill plus a check, not color only.
- The same form edits a habit. Delete asks to confirm.

- Phone: the form opens as a bottom sheet (slides up, full width, Save reachable by thumb). Desktop: a centered dialog.
- The name field has an example placeholder like "e.g. Read 10 pages", and the sheet opens with **Every day** picked; **Weekdays** is one tap.

## Desktop (1280)
- Use the width: 2 columns or a side panel. Never a 440 px phone column floating in the middle.
- No phone bottom tab bar on desktop: top nav or side nav.
- Labels, legends and grid letters are at least 13 px at every width.

## Sample data
- On first open, show a small notice: "This is sample data" with two buttons, **Keep sample** and **Start fresh** (clears it). The choice is saved.

## Required screens
- **Today**: items due today, one-tap done, a count like "2 of 5 done", the state legend, the week's progress and recent history (last 7 days per item or a small strip). Progress is on Today, not only on another tab.
- **Week** (or Progress): the week across all items with labeled values.
- **Habits** (manage): every item with its frequency, edit and delete. This screen is required; it is not optional.

## Add button
- The add button sits in the header next to the title (a labeled button "Add", not a floating circle). It never covers content and never sits under the tab bar at any width.
