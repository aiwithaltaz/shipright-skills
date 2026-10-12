# Token themes and modes

Load only for existing, requested or approved theme/mode mappings. Do not force dark mode, brand modes, density modes or new theme controls.
Start from actual project tokens, selectors, precedence and consumer behavior. Retain the existing theme-selection mechanism; do not invent persistence, OS following or a settings screen.

## Preserve roles, change mappings

Keep semantic purpose stable across supported themes. Map the same text/surface/action role to the relevant supplied or approved values; do not mechanically invert colors or rename a role for each theme. Preserve scoped brand/platform exceptions and actual nested theme/layer behavior.
Separate color theme, brand and density dimensions when the project supports them. Record allowed combinations and actual override order/defaults. Unknown mappings stay Unknown; do not manufacture a full cross-product of modes. Shared primitives can remain unchanged while affected semantic aliases vary.
For a proposed new mode, identify the user need, changed roles, numeric proposals and approval needed before screens. An existing light palette does not supply an approved dark palette.

## Check the resolved experience

Resolve aliases in each supported combination. Check missing mappings, name collisions, overrides and fallback behavior; do not quietly fall back to an unrelated theme.
Measure actual foreground/background pairs, including focus, status and relevant interaction treatments. A color token by itself cannot prove contrast. Retain non-color meaning and visible unobscured focus.
Density may change task spacing but must preserve readable text, usable targets, grouping and reflow. Do not shrink everything. Keep accessible system/forced-color behavior where supported; do not remove it to preserve a screenshot.
Use the project's existing reduced-motion behavior with sourced duration/easing tokens. Essential feedback must remain available without motion; a zero duration alone does not verify that behavior. Do not add animation to fill a token category.

## Output

Record role -> source alias/value -> supported mode, with source and decision status, allowed combinations and verification gaps. Reuse the existing format; no compulsory resolver or plugin installation. Written mappings can Pass specification checks while computed styles, keyboard behavior and assistive-technology support remain Not verified.
