# Phone app kit (habit, fitness, money, journal, any one-person phone app)

Working structure. Start from it. The kit gives layout, tap sizes and states. A style pack gives the look.

- `tokens.css`: sizes only (type steps, spacing, 48 px tap, max width).
- `components.css`: header with progress ring, core item row with a 48 px check, streak chip, 28-day grid, week bars with values, buttons, header add button, state legend, labeled 28-day grid, bottom tabs, form fields, day picker, empty state. No colors or fonts inside.
- `styles/`: 2 main style packs and 1 opt-in. Each has `style.css` (fonts, colors, edges, signature details), `ART.md` (who it is for, rules) and `reference.html` (a finished Today screen).

| Pack | Pick when the product and audience are |
| --- | --- |
| [editorial](styles/editorial/ART.md) | calm, reflective, adult |
| [poster](styles/poster/ART.md) (opt-in only) | clearly sport or competition, and the brand already looks like it. Never a default |
| [tactile](styles/tactile/ART.md) | friendly, playful, beginner, family |

## How to use
1. Read PRODUCT.md and its **Color** part ([Step 2a](../../steps/02a-color.md)). Pick the pack that fits the audience (see [Step 2](../../steps/02-design.md)). Write the scores and why in DESIGN.md.
2. Copy `tokens.css`, `components.css` and the pack's `style.css` into the project. Open the pack's `reference.html`.
3. Commit to the pack fully. Keep its fonts, colors and signature details on every screen. Replace the pack's colors with the PRODUCT.md palette. Keep its fonts, shapes and details.
4. Build each screen from the components. New components follow the pack's ART.md.
5. Never fall back to system fonts, generic blue, or grey floating cards. Never mix two packs.

## Structure rules (all packs)
- Phone first: one column, max 440 px. Desktop (900 px and up): use the width, 2 columns or a side panel (list left, progress and history right). No phone tab bar on desktop: use a top nav or side nav. Labels at least 13 px at every width.
- The core item and its one-tap action are on the first screen.
- One accent color for actions. Numbers show real values.
- Follow the [clarity rules](../../steps/clarity.md): `.legend` under the list, `.count` like "2 of 5 done", `.grid28` with weekday and date labels, `.add` button in the header (no floating button), a Habits manage screen, add sheet with `.seg` frequency (Every day, Weekdays, Pick days) and 7-day picker, opened as `.sheet` (bottom sheet on phone) with an example placeholder. `.legend` and `.count` are required on Today. Phone grids: `.grid28` cells 28 px or more. Done = filled check, never line-through.
