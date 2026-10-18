# Stage 8: Build

Build from the layout spec. Open [build-prompt.md](../templates/build-prompt.md), [screen-spec.md](../templates/screen-spec.md), and [app-screens.md](../patterns/app-screens.md) for an app.
For a website, open `patterns/web-pages.md` instead of the app pattern. Do not open both. Use `patterns/copy.md` for labels. Copy blocks from `blocks/README.md`. Set attributes. Do not rewrite a block unless a test fails.
Required headings in build-prompt.md: Goal, Steps, Done when, Stop.
Required headings in screen-spec.md: Job, Layout, States, Copy.

## Steps

1. Build the design system preview first (`/design`), then the screens in core-loop order.
2. Use only the components you listed. Copy a tested block when one exists. Set its attributes. Do not rewrite it unless a test fails.
3. Run the removal test on every screen. No empty side panel. No dev, test, or preview control visible. A state switcher for review goes behind `?review=1`.
4. Sample data is domain-true and labeled "Demo data" or "Sample" near the title. Supplied facts become behavior: hours become an open or closed state; a notice period becomes the earliest date; prices become totals.
5. For a coding tool, write one prompt per ticket (goal, read first, steps, states, do not add, done when, stop). A website prompt is 550 to 1,700 words and follows the six acts. App tickets stay short.
6. Each change on an existing app names its pain ID in CHANGELOG.md.

## Gate

Matches the layout spec. Labeled sample data. No dev controls. Pain IDs on existing-app changes. Record updated.
