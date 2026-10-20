# Stage 8: Build

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 08 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Build from the layout spec. Open [build-prompt.md](../templates/build-prompt.md), [screen-spec.md](../templates/screen-spec.md), and [app-screens.md](../patterns/app-screens.md) for an app.
For a website, open `patterns/web-pages.md` instead of the app pattern. Do not open both. Use `patterns/copy.md` for labels. Copy blocks from `blocks/README.md`. Set attributes. Adapt a block when the approved visual contract or visible evidence requires it, then rerun its checks.
Required headings in build-prompt.md: Goal, Steps, Done when, Stop.
Required headings in screen-spec.md: Job, Layout, States, Copy.

## Steps

1. Build the design system preview first (`/design`), then the screens in core-loop order.
2. Use only the components you listed. Reuse a tested block when it fits the visual contract. Adapt typography, geometry and responsiveness when screenshot evidence shows a mismatch; record why and retest. A passing old test does not protect a visible defect.
3. Run the removal test on every screen. No empty side panel. No dev, test, or preview control visible. A state switcher for review goes behind `?review=1`.
4. Sample data is domain-true and labeled "Demo data" or "Sample" near the title. Supplied facts become behavior: hours become an open or closed state; a notice period becomes the earliest date; prices become totals.
5. For a coding tool, write one prompt per ticket (goal, read first, steps, states, do not add, done when, stop). A website prompt is 550 to 1,700 words and follows the six acts. App tickets stay short.
6. Each change on an existing app names its pain ID in CHANGELOG.md.

## Premium sites

For an approved scroll story or 3D product demonstration, use the matching `scroll-story`, `product-3d`, or `page-transition` block. A premium label alone does not require these dependencies. Do not swap in `product-stage`, `pinned-scene`, or `exploded-view` for those jobs. Those three are the no-network stand-ins. Set the block attributes. Adapt a block when the approved visual contract or visible evidence requires it, then rerun its checks. The libraries load from the pinned CDN in `patterns/motion.md`. If that CDN fails, or the person asks for reduced motion, keep the still that is already in the block.

## Gate

Matches the layout spec and visual contract. For apps run `check-ui.mjs --profile app`. Set `data-ui="app"`, `data-screen="dashboard"` on dashboards, and `data-chart` on actual chart regions. Use `data-min-width` on cells for minimum widths and `data-atomic` on single-line values. Scrolling nav uses `data-scroll-hint="hint-id"` and `aria-describedby="hint-id"` with visible text. These annotations enable checks; they do not prove behavior. Labeled sample data. No dev controls. Pain IDs on existing-app changes. Record updated.
