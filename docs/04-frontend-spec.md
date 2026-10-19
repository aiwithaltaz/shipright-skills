# 04 - Frontend specification

**Status: Template (ShipRight 1.4.0).**
**Project path:** `docs/shipright/04-frontend-spec.md`

**Version/date:** <!-- -->  **Sources and approval:** <!-- -->


Use current explicit feedback, approved jobs and sourced components. Do not copy every control visible in a reference.

## Current phase and allowed screens

**Current phase:** <!-- -->
**Excluded / later notes only:** <!-- -->

| Screen ID | Job | Actor | Phase | Source |
| --- | --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> | <!-- --> |

## Navigation

| Label | Approved destination | Actor / phase | Active treatment |
| --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> |

Profile/account home: <!-- one canonical location per layout -->
An active nav item does not imply unread work. Notifications need their own real source.

For relevant IA handoff, retain stable node/object IDs, parent/related destinations, known routes versus views/states, access source and direct-entry/return behavior. Maps may be tables; no automatic new screens/routes. For authorized reorganization, record affected old/new labels/addresses, bookmarks and migration limits; unavailable redirect support stays Unknown. Search/filter fields, match and combination rules require a source or explicit Proposed status.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Per-screen specification

Copy only this block for each in-scope screen.

**Screen ID / job / source:** <!-- -->
**Keep/remove/change/add:** <!-- exact requested feedback -->

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> |

**Structure and reading order:** <!-- -->
**Sizing and alignment:** <!-- sourced containers/tokens, what grows and wraps -->
**Actions:** <!-- scope, label, effect, recovery; clear does not imply deletion -->
**Exit and saved work:** <!-- -->

| Reachable state / trigger | User sees | System effect | Next action / exit | Evidence needed |
| --- | --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> | <!-- --> |

Include applicable empty, loading, error, populated, denied, partial and no-match states.
Separate background work from saved unfinished human work. Do not add features merely to fill states.

**Responsive behavior:** <!-- task order, stacking, table handling, overflow and sticky clearance -->
**Difficult content:** <!-- relevant long/missing text, 0/1/many results and images -->
**Accessibility:** <!-- semantics, focus, keyboard, contrast, reflow, targets, announcements -->

## Design system

**Mode:** <!-- Preserve or authorized Establish -->
**Source:** `DESIGN.md` at the project root, or <!-- existing component/token source -->.
Use sourced Approved/Observed values permitted by current instructions. Proposed values stay labeled in Markdown.
Unknown values stay Unknown; do not invent brand values.
Carry the canonical system source/version if known, actual component locations, reuse/extension reason and approved exceptions. Preserve existing formats; do not create a replacement system for this screen.

## Exact acceptance checks

| Feedback/source | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- Pass/Fail/Not verified/Not applicable --> | <!-- --> |

## Handoff limits

<!-- Decisions reserved for the user, unverified implementation behavior and next stage. -->
Exported project paths are rooted at the app. This document requires no pack-local skills/ tree.
