# 05 - Feature tickets

**Status: Template (ShipRight 1.3.1).**
**Project path:** `docs/shipright/05-feature-ticket-list.md`

**Version/date:** <!-- -->  **Sources and approval:** <!-- -->

Each ticket is one prompt to paste into the coding tool. The tool finishes it in one sitting, reports and stops.
Use approved current-phase jobs only. Later ideas stay in the PRD's "Not in this release" list, not here.
Order: T1 foundation and `/design` preview (stop for a quick OK of the look), shell, core job, states, secondary jobs, motion, QA, launch check.
Open reversible choices use the Proposed default and name where to change it. Only prices, legal text, access policy and payments block their own ticket.

## Order

| ID | Ticket | Screen or capability | After | Size |
| --- | --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> | <!-- one sitting --> |

## Tickets

Copy this block per ticket:

```text
T<n>. <title>            Size: one sitting   After: T<n-1>
Paste this into your coding tool:
---
Goal: <who can do what when this is done>
Read first: docs/shipright/build-rules.md, DESIGN.md, <spec section>
Build:
1. <ordered, testable step with the real route, file or copy>
Use: <tokens and existing components>
States: <loading, empty, error, permission, as the spec requires>
Do not add: <nearby ideas that are out of scope>
Done when:
- <observable check: route, keyboard path, width, value or test>
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

A proposed map change is not an approved ticket. Preserve unresolved dependencies and verification needs.

## Critique follow-up

| Finding | Severity | Ticket / acceptance change | Evidence closing it |
| --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> |

A ticket does not turn Fail into Pass. Check the changed artifact before closing the finding.
For a launch task, reference `docs/shipright/ship-check.md`.
