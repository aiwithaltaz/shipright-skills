# Stage 6: Design system

One system, measured, then used. Open [DESIGN.md](../templates/DESIGN.md) and [tokens.css](../templates/tokens.css).
Required headings in DESIGN.md: Choice, Tokens, Components, Status table, Label table.

## Choice

One decision card: (a) the owner's system, (b) a known system, (c) a ShipRight starter adapted to the product. For an existing app, default to (a): extract what is already there and mark it Observed. Do not rebrand it without approval.
Map their names to token roles (bg, surface, text, muted, border, accent, success, warning, danger, focus) so checks still run. For (c), take the accent from the product or its world (a keycap yellow, a crust brown, a field green), not from a generic purple.

## Tokens

Type scale with size and line-height. Spacing scale 4, 8, 16, 24, 32, 40, 48, 64. No 2, 6, 10, or 12 gaps. Radii and motion durations as numbers.
Run `node <skill>/scripts/check-tokens.mjs tokens.css` when that script exists (Phase 2). Until then, measure contrast yourself: 4.5:1 for body text, 3:1 for large text and UI borders. Write the ratios in DESIGN.md.

## Components

Button, field, select, table row, badge, toast, dialog, empty, error, skeleton. Each lists default, hover, active, focus, disabled, and loading or error where it applies.
One status table: one meaning, one label, one color role, one icon. One label table: the same job uses the same word (Save, Continue, Cancel, Remove).

## Record

Note the system choice in DECISIONS.md. Status Proposed until the owner agrees.

## Gate

System choice recorded. Contrast written down. Spacing on the scale. Every component has its states. Record updated.
