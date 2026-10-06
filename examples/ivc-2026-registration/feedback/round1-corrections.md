# IVC registration desk: round-1 corrections

**Source:** Altaz, October 4, 2026. Feedback on a desk redesign. Project-specific: these are not default features for other apps.
The general lessons live in [operator-workspaces.md](../../../skills/ui-ux-design/references/operator-workspaces.md).

Images 1-6 are liked crops; image 7 is the full screen. Explicit corrections take priority over incidental content in them.
Images are kept in [evals/v0.6/screenshots](../../../evals/v0.6/screenshots/registration-full.png).

| Source | Exact correction | Acceptance |
| --- | --- | --- |
| Image 1 / full screen | No notification dot on the selected nav item. | Active styling remains; the dot is absent. |
| Image 2 | Keep the liked Escalations and Desk help treatment. | No unrelated help features are added. |
| Image 3 | Keep the liked Record donation treatment. | Styling is preserved without inventing payment behavior. |
| Image 4 | Remove "Filter: All Attendees". | No replacement dropdown, tabs or chips appear. |
| Image 5 | User's words: needs a "View all in progress" option, or a way to clear it. | Either one satisfies; both are not required. If clear is built, its object and saved effects are resolved first. |
| Image 6 | Give the selected row a clean border on all four sides. Remove filler such as "Query: Test". | No thick left accent; checkbox/focus remain clear; filler chip is absent. |
| Image 7 | Remove "Synced to event sheet". | Routine system plumbing is hidden; meaningful errors still have operator language. |
| Image 7 / explicit instruction | Profile only at bottom left; remove the top-right box. | One account home in this desktop layout. No box at top right. |
| Image 7 | Remove "Checked In" and "In Queue" counters for now. | No check-in counters in registration UI. |
| Image 7 | Remove "Name / Phone", "Scan QR" and "Family ID" tabs for now. | Existing name/phone fields stay; the tab strip is absent. |
| Image 7 | Remove printer and badge stock panel. | No replacement device panel. |
| General instruction | Build only the current registration phase. | Check-in ideas stay in notes, not UI. |

## Notes

- **Top-right box:** the image 7 profile card is already bottom left. The "top-right box" is likely the small "⌘K" square (shortcut box) next to Desk help. Remove it and keep the profile bottom left only.
- **Selected nav dot:** confirmed by Altaz at 12:28 PM CT: remove it.
- **Phase boundary:** apply it to the whole screen. Check-in-only row actions, badges and wording (Quick Check-In, Fast Track, Badge printed, In Queue, "badge print") stay out too.
- **Clear:** hiding a card, abandoning a draft and deleting a record are different effects. Propose a reversible choice; never claim it is approved or add bulk deletion.
