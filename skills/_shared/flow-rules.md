# Flow rules (must pass)

Canonical rules for product-design, ui-ux-design and ux-critique.
Apply relevant rules to every changed flow and state, including Quick fixes. Review only the affected scope.
The compact export block below is copied into project templates because the pack may not be installed in the user's app.

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## F1. Exit and recovery

An existing visible navigation route can provide the exit. Do not add a redundant Home button to every screen.
For a modal, provide Close or Cancel and keyboard dismissal. Preserve work or explain loss before it happens.
Do not trap the user to complete legal acceptance or payment. They can decline or leave the task.
If a submitted transaction cannot be cancelled, separate leaving from cancellation. Prevent duplicate submission and show how to check its result.
Browser Back should respect the flow. Escape dismisses an overlay, not the whole application or an irreversible transaction.

## F2. Reuse by context

Reuse words, components, action order and locations within comparable contexts.
Forms, dialogs, row actions and mobile navigation may have different recorded patterns. Each one is then used the same way everywhere.
Selection, keyboard focus, validation errors and unread notifications are different states. Never reuse one signal for another.
A new pattern is Proposed unless an existing delegation covers it. Record deliberate exceptions in DESIGN.md.

## F3. Useful status

List only background work relevant to the current task. Search, save, upload and payment can need feedback.
Routine sync destinations, queues, database names and device health do not belong in operator UI unless the operator must act on them.
If work lasts about a second or longer, show a truthful activity label. Use a count, percentage or estimate only when supported.
When duration is unknown, an indeterminate indicator plus plain words is enough. Do not invent a current step.
Show saved/unsaved state where edits can be lost. Confirm a meaningful result once, near the affected work.
Keep actionable failures visible. Say what is preserved only when known, and give a real recovery route.
Explain whether leaving stops or continues relevant work. Do not invent cancellation, notifications or background persistence.
Announce important updates without moving focus, using suitable status semantics. Avoid repeating every tiny progress change.

## Evidence and severity

Use [the operating contract](operating-contract.md). Pass requires evidence for the named stage.
A visible exit in a screenshot does not prove it works. Unsupported runtime claims stay Not verified.
A functional F1-F3 failure is Blocker on a critical flow, or when it can lose data, money or leave users stuck.
Otherwise it is Major. Cosmetic drift without functional impact can be Polish; do not call it a functional Flow rule failure.
A ticket cannot turn Fail into Pass.

## Gate mapping

| Skill | F1 | F2 | F3 |
| --- | --- | --- | --- |
| product-design | 4 | 3 | 5 |
| ui-ux-design | 6 | 5 | 4 |
| ux-critique | 5 | 7 | 5 |

Flow details live here. Do not maintain separate long copies in each skill.
