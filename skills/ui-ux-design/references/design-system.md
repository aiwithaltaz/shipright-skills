# Design system: reuse, establish and maintain

Load for a system choice, foundations, tokens, a supplied reference, or naming and maintenance.
Do not rewrite a system for a small correction. Never invent brand values or claim guessed tokens are existing values.

## Whose system wins

1. **The user's own system or Figma file always wins.** Inspect it first: components, CSS variables, design variables, screens.
2. **Existing app:** extract the current system, mark it Observed, and reuse it. Missing documentation is not evidence that no system exists.
3. **New app:** propose a small system, mark it Proposed, and show it for a quick OK before screens are built.

Choose reuse first, bounded extension for a supported gap, then Establish only for a new app or approved overhaul.
Do not rebrand or replace an existing system without approval. Observation is not approval of a defect.
Unknown versions, values and ownership stay Unknown. Use existing names; do not turn inspection into new token schemas or component contracts.
A broad "modernize" request does not silently approve replacing the brand or adding features.
Screenshots show appearance; they rarely establish exact fonts, tokens or icon libraries.

## Establish a new system

Pick one coherent direction tied to the job. For a new app, choose new values only under requested or delegated design authority, and keep them Proposed until the user agrees.
A build request with "you decide" delegates the values; still show the system first and record it as a delegated choice.
Choose existing components before inventing custom controls. A component kit such as shadcn/ui is a starting point, not the product's design system.

| Foundation | Decide |
| --- | --- |
| Color | Background, surface, text, border, action and status roles. Contrast passes; status never relies on color alone. |
| Type | Families, size steps, weights, line heights, tabular numbers for data. |
| Spacing | One scale. Space inside a group is smaller than space between groups. |
| Layout | Containers, grid, reading order, wrap and overflow at each width. |
| Radius and elevation | Shape by purpose; borders or shadows only where they show grouping or overlap. |
| Icons | One family, one style, one stroke. Record approved exceptions. |
| Imagery | Whether imagery serves the job. No-use is valid; do not invent logos or assets. |
| Motion | Whether motion explains a change, plus its reduced-motion fallback. |
| Density | Driven by the task; compact does not mean smaller everything. Targets and text stay usable. |

Do not force light/dark, brand or density modes into an unrelated task.
A reuse decision is not an accessibility Pass. Preserve isolated accessibility issues even if the rest of the system is consistent.

## Borrow from references

Use at most two or three. For each, name the property to borrow, why it fits this job and what must not carry over.
Never borrow identity, color, type or icons as a skin. A liked search form can supply spacing without approving its filter.
Useful property sources: Carbon, Atlassian, Primer and Polaris for dense tables and forms; Geist, shadcn/ui and Radix for restrained product UI; GOV.UK and USWDS for plain forms.
Component Gallery is a comparison/reference index, not an installable component library or usability proof. Credit in [SOURCES.md](../../../SOURCES.md).
External style tools produce proposals; check them against scope, accessibility and approved identity.

## DESIGN.md export

Template: [docs/DESIGN.md](../../../docs/DESIGN.md). Preserve an existing format and its unknown sections for compatibility.
Only sourced **Approved** or **Observed** values enter the YAML token map. **Proposed** values stay in labeled Markdown. **Unknown** values are listed as gaps.
Never insert placeholder hex codes, font names or sizes. Keep Icons and Placement in Markdown.

## Maintain it

Use one name for the same role. Preserve an existing schema and unrelated keys.
Fit governance to project size; do not invent a committee or require new tools. A solo project may need only a source file, change note and an agreed reviewer.
Reuse before contributing a new component; a new one needs a reason existing options fail.
Name a maintainer only when supplied; missing ownership stays Unknown. Unknown aliases, redirects, adapters or rollback support stay Unknown.
Updating documentation does not migrate or verify an implementation.
