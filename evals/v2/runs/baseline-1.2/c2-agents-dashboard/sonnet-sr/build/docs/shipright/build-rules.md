# Build rules

Standing rules for the coding tool. Tickets link here instead of repeating them. Version 0.1, status Proposed until the owner approves the look and scope.

## Scope and facts

- Build only what [01-prd.md](01-prd.md) lists for release 1. Later ideas stay in "Not in this release": no placeholders, hidden routes or tables.
- All agent data is sample data until the owner names a source. Label it as sample in the UI. Never invent metrics, customers, prices or legal text.
- Access policy is unresolved. Default is deny. See [03-security-and-access.md](03-security-and-access.md).
- Do not install paid services, deploy, publish or send messages without the owner's OK.

## Look and code

- Use tokens from `design/tokens.css` only. No raw colors or spacing. Names and roles: [DESIGN.md](../../DESIGN.md).
- Status shows an icon, a text label and a tint. Never color alone.
- One filled button per scope. Primary side is left everywhere. Never two filled buttons side by side.
- Motion only as DESIGN.md lists it, with a reduced-motion version. Table data never animates.
- Copy: short, plain, no em dashes. Use the exact strings in the spec.

## Interaction floor

- Visible labels on every field. Errors sit next to the work, in plain words, with a next step.
- Prevent double submission. Explain any disabled action in text.
- Every task works by keyboard. Focus is visible and never hidden by the sticky header. Status updates use a polite live region and do not move focus.
- Dialogs and drawers: focus moves in, Tab stays inside, Escape closes, focus returns to the trigger or the nearest logical control.
- Contrast 4.5:1 for text, 3:1 for field borders and meaningful graphics. Targets at least 24 by 24 px, 44 on phones where space allows.
- Reflow at 320 px and text zoom to 200 percent without sideways scroll. Long names wrap.
- Private text (search queries, agent names, error text) stays out of URLs beyond the agent id, analytics and logs.

## Checks per ticket

Run lint and tests. Check 390 and 1280 wide with 0, 1 and 29 rows. Report what was not tested.

## Flow rules (F1 to F3)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->
