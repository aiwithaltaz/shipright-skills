Depth: **Focused improvement.** Mode: **Preserve.** Using ShipRight UI/UX Design for the staff equipment-hire form.

Make the active person unmistakable, use the right panel to verify entered details, and keep reference information in one predictable place. The notes below are a proposed screen refinement within the approved flow.

Design read: A compact staff workspace with clear person context, visible blockers and easy revisits.

Source: your brief. Stage: specification, version 1; no screenshot or implementation has been inspected. No personal-taste overlay is present. The approved 4px spacing system, small logo, table columns and revisitable flow are retained; other visual tokens and existing save behavior are unverified.

**Structure, top to bottom**

1. **Quiet header.** Keep the approved small logo and current navigation. Name the task “Equipment hire” and retain the existing case identifier. Branding should leave room for the work.
2. **Case table.** Keep exactly **Name · Equipment · Status · Balance**. Make each person’s name a persistent, keyboard-accessible way to open their details. Mark the selected row with an “Editing” label as well as the existing visual selection treatment. In Status, use separately labeled lines for training, details and payment where relevant; do not collapse these into one “Complete” badge. Keep Balance as the amount owed, with payment state stated separately: a zero balance alone does not establish that payment was made.
3. **Active-person heading above the form.** Show “Editing: [full name] · Person [position] of [total]” and a short remaining-work summary drawn from actual state. For example, “Training check needed; equipment selected; payment pending” is illustrative copy, not a new set of business rules. Repeat the person’s name in the existing save action or adjacent action context so staff can see whose record they will affect.
4. **One column of person-specific fields.** Keep training, equipment and payment in the approved order. Each person has their own values and progress; never carry one person’s training approval or payment state into another person’s record. Put a training blocker next to the affected equipment/action, state why it is blocked, and link to the existing place to resolve it. Preserve the product’s current restriction rules.
5. **Right panel: review entered details.** Replace repeated hours and policy prose with a compact summary of the active person’s training result, equipment choice, payment state and balance, using only information already collected. Give permitted completed sections explicit “Edit training”, “Edit equipment” and “Edit payment” links. Show any existing case-wide summary separately and label it clearly; person completion must not imply case completion.
6. **One reference location.** Keep workshop hours once in the existing sidebar. Add a plainly named “Hire instructions and policies” disclosure beside the form, using the existing disclosure/help component. Organize occasional instructions under short headings. Keep training blockers, errors and applicable payment amounts visible at the point of action even when help is closed.

**Behavior**

- Selecting a different person updates the form, heading, review summary and action context together. During loading, do not leave the previous person’s editable fields under the next person’s name.
- Completed details remain selectable for review and editing. Preserve valid work for every other person. After an edit, recheck only the dependencies it affects - for example, an equipment change may require a different training check under existing rules. Do not restart the entire case or silently mark unrelated people incomplete.
- Keep the existing save mechanism. Distinguish “Saving”, “Saved” and “Unsaved changes” truthfully; do not introduce autosave or claim persistence without support. On person switching or exit, preserve a draft if already supported; otherwise use the existing save/discard protection so edits cannot disappear silently.
- Keep the existing back/exit route visible. One primary action should match the current approved task; review links and help remain secondary. No new wizard or forced linear progression is needed.

**Relevant states**

| State | Structure and recovery |
|---|---|
| No person selected | “Select a person to edit their hire details”; leave the case table usable. If a case can contain no people, use its existing person-selection entry point rather than inventing a new creation flow. |
| Loading | Show progress in the affected person area and prevent edits to stale content. Keep loaded case rows available where safe. |
| Populated / saved | Show the named person’s real details and remaining work; confirm the saved person explicitly. |
| Training blocked / unknown | Display a text reason beside the affected action. Unknown is not approval; provide the existing training-check or retry action. |
| Invalid / save failed | Place errors by fields or at form level as appropriate, preserve entries and offer correction or retry. Announce the failure and focus the first relevant error. |
| Partial | Keep available details visible; isolate a failed training or payment lookup with a local retry. Never present an unavailable payment state as “Paid”. |
| Permission denied | If existing access rules deny editing, explain that state and offer the existing safe back route. Do not display it as an empty case or add new roles. |
| Filtered empty | Not applicable to this proposal: no filtering was requested or established. |

**Visual and accessibility notes**

Reuse the existing colors, typography, field controls, table, buttons and status styles. Use the approved **4px spacing system**, with closer spacing inside related groups and larger existing token gaps between training, equipment and payment. Do not substitute an 8px base or enlarge the logo.

Keep names readable, allow long names to wrap, and check several people with mixed pending states. On narrow supported screens, move the review below the form and preserve all four table fields through the system’s existing responsive treatment.

Person links, edit links and the help disclosure must work by keyboard, have visible focus and expose selected/expanded state. Use labels and text alongside status colors, associate errors with fields, and announce person switches and save outcomes without unnecessary focus jumps. Verify contrast in the actual screen. No new animation is needed.

The brief supports these structure changes. Rendered density, keyboard behavior, persistence and exact training/payment dependencies remain unverified; assess them against the existing screen when applying the notes.
