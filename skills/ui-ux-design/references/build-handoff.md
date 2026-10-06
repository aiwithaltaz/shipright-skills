# Build handoff

Compile current approved decisions for the user's design or coding tool. Do not add a new implementation workflow.
Use [output-folder.md](../../_shared/output-folder.md) when files are requested.
Template: [docs/build-rules.md](../../../docs/build-rules.md).

## Check scope first

Every screen and visible element needs a current-phase source. Reconcile exact feedback before writing prompts.
Later-phase ideas stay in notes, not rendered UI, hidden routes or data models.
Keep unresolved proposals separate under **Needs approval before build**.
An explicit approved correction is build scope, not a suggestion waiting for another yes.

## Shared builder context

Include the outcome, useful mechanism, current phase, jobs, allowed screens, exclusions and source versions.
Point to the existing design system and components. Use Approved or Observed values permitted by current instructions.
Copy the compact **Flow rules (must pass)** block from [flow-rules.md](../../_shared/flow-rules.md) into exported build rules.
Do not leave unresolved pack-local references in a user's project.
Preserve exact feedback with one acceptance check per item. Keep clear/reset effects unresolved if their meaning is not known.

## Screen brief

```text
Screen ID and job:
Current phase and source:
Keep / remove / change / add:
Allowed elements and source for each:
Structure and reading order:
Components and sourced tokens:
Actions: scope, label, effect and supported recovery:
States, including relevant background work and saved unfinished work:
Exit (F1), reused patterns (F2), useful status (F3):
Responsive order, sizing, wrapping and sticky behavior:
Accessibility criteria and evidence needed:
Do not add / later-phase notes:
Exact acceptance checks:
Unknowns and decisions reserved for the user:
```

Use requested device support. Do not invent mobile apps or desktop-only limits.
A visual tool needs representative frames for relevant states, not every possible combination.
A coding tool should reuse existing components and obey the project's actual implementation rules.
Do not install registries, call paid services or publish merely because the handoff is ready.
Images are visual evidence only; they cannot prove interaction or access behavior.

## Interaction floor

Use the accessibility criteria in [state-coverage.md](state-coverage.md).
Keep paste usable, input types and autocomplete appropriate, labels visible and errors associated with their fields.
Prevent duplicate submission while a request is running. Do not disable a necessary action without explaining why.
Preserve valid values and warn before losing unsaved work. Do not invent undo or persistence capabilities.
Preserve safe navigation state where useful. Never put sensitive phone/email searches, tokens or private records in URLs, analytics or logs by default.
Keep keyboard focus clear of sticky bars. Status updates should not move focus or expose internal plumbing.
Apply only existing/requested motion and reduced-motion behavior.

## Return loop

Check the built artifact against the same phase boundary and feedback list.
For implementation checks, use [bounded-verification.md](../../ux-critique/references/bounded-verification.md).
Fix authorized deviations from approved requirements. A defect need not appear on an old proposal list to be correctable.
New scope still needs a decision. Stop optional testing when the affected acceptance checks are satisfied.
Report unverified behavior and unresolved issues; do not claim a perfect or production-ready result from screenshots.
