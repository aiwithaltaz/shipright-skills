---
version: "1.7.1"
name: ""
description: ""
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

<!-- ShipRight 1.7.1 template. Project path: DESIGN.md.
Fill identity fields from sources; do not leave placeholders in a finished export.
Only sourced Approved/Observed values permitted by current instructions enter YAML.
Proposed values stay labeled in Markdown. Unknown values stay out of YAML.
Preserve an existing project's schema and unrelated sections. This template does not certify compatibility with other tools. -->

## Overview

<!-- Screen jobs, mode Preserve/Establish and authority. No invented brand personality. -->

## System source and reuse

<!-- Only when relevant: canonical location/version, actual component sources, approved identity,
reuse or bounded extension reason, source conflicts and authorized exception scope.
Missing documentation alone does not authorize a replacement. Unknown facts stay Unknown. -->

## Colors

<!-- Sourced semantic roles, uses and measured contrast. No placeholder hex values. -->

## Typography

<!-- Sourced family, size, weight, line height and role. -->

## Layout

<!-- Containers, grid, spacing, reading order, responsive priorities and overflow behavior. -->

## Elevation & Depth

<!-- Sourced borders/shadows and their purpose. -->

## Shapes

<!-- Sourced radius and deliberate exceptions. -->

## Components

<!-- Short inventory before screens. Each control uses a canonical name or an existing app component. Handoff also names the library equivalent, for example Modal = shadcn Dialog. If a control cannot be named, justify it or remove it. Existing component source, variants and applicable default/hover/focus/selected/disabled/busy/error states. -->

## Icons

<!-- Fill from sources. Unknown stays Unknown; a new choice stays Proposed until approved. No invented values. -->

- **Icon set:** <!-- coherent primary family, or Unknown / Proposed; preserve approved role/platform/brand exceptions -->
- **Icon exceptions:** <!-- role, family, source/authority and reason; no unapproved mixing -->
- **Style:** <!-- line or filled; filled for the selected state only if recorded here -->
- **Stroke weight:** <!-- one weight for line icons, or Unknown -->
- **Sizes:** <!-- tied to the adjacent text size token -->
- **Icon and label spacing:** <!-- one step from the spacing scale -->
- **Icon-only allowed:** close, search, menu, more, back <!-- plus approved additions. Each has an accessible name and a tooltip. -->
- **Never icon-only:** destructive and uncommon actions. They get a visible text label.
- **Emoji:** <!-- not used / used only in [place] -->
- **Status:** text + icon + color, never color or icon alone.

## Placement

<!-- Decide once. Use the same way on every screen (Flow rule F2). Unknown or Proposed until decided.
Follow the platform convention when one applies. Record a deliberate exception under Screen notes. -->

- **Primary action side:** <!-- left or right, for forms and dialogs -->
- **Button order:** <!-- e.g. secondary then primary. Never two filled buttons side by side. -->
- **Form actions:** <!-- end of the form; sticky on long forms or mobile: yes / no -->
- **Dialog actions:** <!-- buttons name the action, not "OK"; Cancel easy to find -->
- **Destructive actions:** <!-- where they live, apart from the primary -->
- **Search and filters:** <!-- only when approved; near their results, with a count; no duplicate query chips -->
- **Toasts and status messages:** <!-- one place for the whole app; never over the primary action or navigation -->
- **Empty states:** <!-- where the content would be, with one next action -->
- **Navigation:** <!-- side bar / top bar / bottom bar on mobile; same place on every screen -->
- **Profile/account:** <!-- one home per layout -->
- **Selection, focus, notifications:** <!-- separate states; no notification dot on the selected nav item -->
- **Mobile primary action:** <!-- within thumb reach: lower screen or bottom bar -->
- **Sticky elements:** <!-- must not hide controls or focus -->

## Do's and Don'ts

- Do keep the filled accent style for the main action in each area, not for decoration.
- Do keep text contrast at WCAG AA (4.5:1 body, 3:1 large text and UI parts).
- Do show a visible focus ring on every interactive element.
- Don't add gradients, glass effects or extra accent colors that are not listed here.
- Don't use sample names, logos or numbers that look real in shipped UI.
- Don't add icons from outside the icon set above, or icons on every heading.
- <!-- add product-specific rules -->

## Motion

<!-- Existing/requested motion only: purpose, tokens, interruption and reduced-motion behavior. -->

## Imagery and density

<!-- Only relevant decisions: imagery purpose/type/source, permissions and alternatives, or no-use;
task/content density, grouping, readable text, usable targets and supported width/input differences.
Do not invent assets or force modes. Use observed or authorized values, not guessed brand facts. -->

## Accessibility

<!-- Measurable contrast, semantics, keyboard/focus, error/status announcements, target sizes and reflow requirements.
Record what is specified versus actually verified. -->

## Screen notes

<!-- Deliberate exceptions by screen ID. Exact feedback overrides obsolete observed values. -->

## Reference properties

<!-- Properties borrowed from supplied references, and incidental features/identity not adopted. -->

## Maintenance

<!-- Only when useful/requested: known maintainer or Unknown, canonical names, change note,
affected uses, approved exceptions and migration/verification gaps. No mandatory council/tooling.
Detailed token architecture is Phase 6; component contracts are Phase 7. -->

## ShipRight status

| Token or rule | Value / proposal / gap | Evidence status | Decision status | Source / owner |
| --- | --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- Observed/Unknown --> | <!-- Approved/Proposed/Unresolved --> | <!-- --> |

Keep Proposed and Unknown entries here, outside YAML. A delegated choice records its scope and source.
The current phase and explicit corrections override old observations. Preserve unrelated approved decisions.
