# Stage 6: Design system

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 06 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

One system, measured, then used. Open [DESIGN.md](../templates/DESIGN.md), [components.md](../templates/components.md), [tokens.css](../templates/tokens.css), and [motion.md](../patterns/motion.md) when anything moves.
Required headings in DESIGN.md: Choice, Tokens, Components, Status table, Label table.
Required headings in components.md: Variants, States, Screens.

## Choice

One decision card: (a) the owner's system, (b) a known system, (c) a ShipRight starter adapted to the product. For an existing app, default to (a): extract what is already there and mark it Observed. Do not rebrand it without approval.
Map their names to token roles (bg, surface, text, muted, border, accent, success, warning, danger, focus) so checks still run. For (c), take the accent from the product or its world (a keycap yellow, a crust brown, a field green), not from a generic purple.

## Tokens

Type scale with size and line-height. Spacing scale 4, 8, 16, 24, 32, 40, 48, 64. No 2, 6, 10, or 12 gaps. Radii and motion durations as numbers.
Run `node <skill>/scripts/check-tokens.mjs <tokens.css>`. Body text at least 4.5:1. Large text and UI borders at least 3:1. Off-scale spacing fails. Then build a `/design` page that shows every token and state, and screenshot it.
Fonts: use the two SIL OFL families in `blocks/fonts/` (Inter for UI, Fraunces for headlines) with the `@font-face` file there. Do not depend on a font that exists only on one operating system.

## Components

Button, field, select, table row, badge, toast, dialog, empty, error, skeleton. Each lists default, hover, active, focus, disabled, and loading or error where it applies.
One status table: one meaning, one label, one color role, one icon. One label table: the same job uses the same word (Save, Continue, Cancel, Remove).

## Record

Note the system choice in DECISIONS.md. Status Proposed until the owner agrees.

## Gate

System choice recorded. Contrast written down. Spacing on the scale. Every component has its states. Record updated.
