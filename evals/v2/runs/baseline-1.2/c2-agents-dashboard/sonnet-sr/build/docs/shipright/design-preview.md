# Design preview: three directions

Step 2 of the full flow. No human is available to choose, so one direction is picked below with a reason and marked **Proposed, awaiting owner approval**. Your own design system or Figma file replaces all three.

The job is the same in each: scan a long list, spot the few agents that need a person, act in two clicks. The directions differ in density, color, type and motion.

## Direction A: Calm light (picked)

- **Type:** system sans stack. 12 caption, 13 table meta, 14 body, 16 section, 20 page title. Tabular numbers on every count and time.
- **Color:** white table on pale grey page, dark grey text, one teal accent. Status uses text, an icon shape and a soft tint: green Running, amber Waiting for you, red Failed, grey Paused and Idle.
- **Space:** 40 px rows with a second muted line in the Agent cell, 12 px cell padding, 24 px page gutter. Borders separate; shadows only on the drawer.
- **Motion:** drawer slides 24 px and fades in 240 ms. Nothing else moves. Reduced motion: fade only.
- **Why it fits:** an operator may keep this open all day. Light, low contrast chrome keeps the red and amber statuses the loudest things on screen.

## Direction B: Dispatch board (dark)

- **Type:** same stack, plus a monospace face for agent IDs and times. 12 and 13 sizes dominate.
- **Color:** slate background, light text, status colors lifted for dark contrast, accent ice blue.
- **Space:** 32 px rows, 8 px padding, 16 px gutter. Densest of the three: about 25 percent more rows per screen.
- **Motion:** none. Panels appear instantly.
- **Trade-off:** more rows visible, but dark screens with colored status chips are harder to read in a bright office and drift toward a generated "ops console" look.

## Direction C: Plain and large

- **Type:** system sans at 16 body, 24 page title, heavy 600 names.
- **Color:** white page, black text, thick 2 px borders, one dark blue accent.
- **Space:** 56 px rows, 16 px padding, wide gutters. Fewest rows per screen.
- **Motion:** none.
- **Trade-off:** strongest legibility and touch targets, but a long agent list needs a lot of scrolling, which fights the "many agents" premise.

## Decision

**A.** The list is long and the answer is in the status column, so the screen should be dense, calm and quiet around the status. B packs more but adds a mood the job does not need. C is the best fit if most users are on phones or have low vision, which is Unknown, owner: you.
Switch point: if the owner supplies a design system, tokens in [DESIGN.md](../../DESIGN.md) are replaced, not merged.
