# Design tokens

Load for token extraction, a proposed system's token record, or an affected token gap. Keep the required design-system-first step; tokens write down that system, not a new visual direction.
Existing app: extract the actual tokens and mark them Observed. Preserve names, aliases, formats, components and identity. Unknown source versions stay Unknown. Missing documentation does not permit replacement.
New app: propose a small primitive and semantic record, mark it Proposed, and get the user's OK before screens. Never treat a proposal, illustration or old screenshot as an approved scale. A small correction reuses the affected system without a full extraction.

## Small layers

| Layer | Record |
| --- | --- |
| Primitive | Raw color, spacing, typography, radius, shadow and motion values from the actual source or authorized proposal. Record type and units; typography may combine family, size, weight, line height and tracking. Shadows may combine offsets, blur, spread and color; motion may combine duration and easing. |
| Semantic | Purpose-based roles, such as text-primary, surface-default, action-danger, space-group, radius-control or motion-feedback. Reuse the project's vocabulary and aliases; these names are examples, not compulsory renames. Same raw value does not mean two different purposes should share one role. |
| Component | Add only with a clear reuse reason that a semantic role cannot express. Prefer an alias to an existing semantic token. Do not generate a component layer for every control, screen or CSS property. Component contracts remain Phase 7. |

Use primitives plus semantic roles by default; do not retrofit layers into an existing flat system just to match this model.
For each affected token, record name/layer, purpose, type/unit, value or alias, source/version, evidence and decision status, supported mode and actual consumer. Keep Unknown values out of executable maps and Proposed values outside the approved/Observed export. A proposed alias to an unknown target is unresolved, not usable code.
Do not invent defaults to complete a table. New values need scoped design authority and the new-system approval step. Observed is not Approved, and consistent values do not establish accessibility Pass.

## Reuse and exceptions

Use the canonical token or an existing approved theme utility at the consumer. Avoid arbitrary hardcoded design values, including unexplained arbitrary utility values. Raw values belong in the canonical definitions, not scattered across consumers.
Do not tokenize every literal: structural zero/full-width, content-dependent layout calculations and approved optical/platform differences can be appropriate. Check the actual project's rules and document a design exception's scope, reason, value/source, authority, affected uses and review trigger when useful. Governance owns change/exception records; do not add a council or global audit.
Do not normalize an approved exception away, silently rename shared tokens, or promote an accessibility defect because it was observed. Resolve an affected gap within authorization; otherwise record it and the decision needed. No one-off screen tokens without a supported reuse reason.

## Evidence and handoff

Carry the small token record into the existing system document and affected handoff, not a parallel source of truth. State unavailable source/version or approval explicitly. Preserve unrelated keys and historical evidence. A documented mapping is not a consumer migration or runtime verification.
Keep the records behind the scenes; show concise decisions, material gaps and the next step. Theme and implementation details load separately through SKILL.md when needed.
