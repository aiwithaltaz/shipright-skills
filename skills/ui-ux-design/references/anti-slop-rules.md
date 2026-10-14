# Prevent invented and generic UI

Every visible element earns its place through a current-phase job or an explicit requirement.
Read [the operating contract](../../_shared/operating-contract.md) for scope, exact feedback and facts.

## Hard failures

Unsupported features, fabricated proof, hidden costs, misleading consequences and inaccessible critical controls are defects.
Never invent metrics, user counts, ratings, testimonials, customer logos, press, prices or legal text. Label sample data as sample data.
When a name or price is unknown, use a clearly labeled working name ("Working name: Model 01") and leave the price out, rather than bracket placeholders in headlines. Note it once in a sample-data line.
A checklist cannot authorize extra navigation, filters, counters, widgets or notifications.

## Measured tells

`scripts/check-ui.mjs` measures these. Fix a FAIL; fix a WARN or defend it in one sentence.

| Tell | Instead |
| --- | --- |
| Gradient text, gradient buttons, gradient blobs | Flat color; a neutral scrim only under text on media |
| Colored glow shadows | A tone step; shadows only on what floats |
| Tiny uppercase letter-spaced labels above headings | Put the fact in the heading or sentence |
| Two filled buttons side by side | One filled primary, one secondary or text button |
| More than two type families | One family, or a display face plus a text face |
| Sideways scroll on a phone, clipped controls | Wrap, stack or scroll inside the container |
| Motion with no reduced-motion handling | A reduced-motion fallback with the same content |
| Content invisible until a scroll animation runs | Visible at load; animate transform only |
| Em dashes in UI copy | A period, comma or colon |

## Looked-for tells

Look at the screenshots for these. They are defaults, not decisions.

- Identical rounded cards with soft gray shadows for everything; a card around every section.
- A row of icon-topped feature cards; numbered 01 / 02 / 03 markers on content that is not a sequence.
- Pill badges ("New", "Beta") above the headline; a styled accent word in a headline.
- Fake dashboards of gray bars, decorative charts, random status dots, emoji as icons.
- Glass panels, floating pill navigation, backdrop blur used as decoration.
- Huge empty bands between sections; a page that is mostly padding.
- Duplicate profile boxes, query chips that repeat visible input, counters with no source.
- The generated-look palettes: cream with serif and terracotta; near-black with one acid accent; purple to pink.

Removing ornament is half the job. Fill the space with the real content, the real product, or a larger main element, not with another ornament.
A familiar pattern can be the right choice. Preserve approved identity; explain a concrete problem before changing it.

## Default screens to leave out

These layouts show up when the idea is still vague. Do not use them unless the current phase asks for that region.

Booking or shop idea. Leave out a marketing hero, rating stats, a testimonial carousel, pricing tiers, a newsletter, and a chat bubble. Build the task: what they book, when, who it is for, and how they confirm or go back.

Internal desk or dashboard idea. Leave out a welcome line, four summary cards, a chart row, an activity feed, and a sync chip. Build the task: the list they act on, the row they open, the status they set, and a way back.

A form, list or table is fine when it matches the job. Do not make delete or remove icon-only.

## Component overuse

Do not use a carousel when a visible list or grid works. Badges are only for real status.
Critical information is never only in a tooltip or popover.
Read [slop-tells.md](../../ux-critique/references/slop-tells.md) for concrete review prompts.

## Before handoff

Check the exact change list, phase exclusions, sourced system values, applicable states and accessibility.
Separate Proposed scope from approved builder instructions. Do not fill blank areas with features.
