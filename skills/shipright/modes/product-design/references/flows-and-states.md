# Flows and states

Model reachable behavior within current-phase scope. Do not create features to fill rows.

## States

| State | Define |
| --- | --- |
| Empty | What belongs here and one approved next action, if any. A read-only list need not offer Create. |
| Loading | What is loading; no fake final values; no duplicate submission. |
| Success | The real content and the next permitted task. |
| Error | What failed, what changed, kept input and a real recovery action. |
| Permission denied | The limit, without exposing protected data, and an existing exit. |
| Partial | Working sections stay usable; the failure is isolated. |
| No matches | The search or filter result, with criteria the user can edit or clear. |
| Background work | A running system job with truthful, task-relevant feedback. |
| Saved unfinished work | A draft waiting for a person: what remains, and how to resume, edit or clear. |

Pending human work is not a loading spinner. Saved, valid, eligible, paid and complete are separate facts.

## Flow shape

Specify entry, steps, decision points, success destination, back or cancel effects and failure recovery.

`Trigger or state | User sees | System effect | Next action | Saved work and exit`

Check [Flow rules (must pass)](../../_shared/flow-rules.md): F1 exit, F2 consistency, F3 useful status.
A screen exit is separate from cancelling a submitted transaction. Do not trap users in legal or payment steps.
If a payment or send result is unknown after leaving, say how to check it before allowing a second attempt.

## Consequences

Confirm important irreversible actions, naming the object and consequence. Use real undo for reversible actions.
For bulk effects, show the affected scope and count. Do not invent undo the system cannot provide.
For clear, reset or remove, separate fields, selected rows, visible cards, drafts and permanent records.
Ambiguous destructive behavior stays unresolved while independent work continues.

## Forms and async work

Keep values after a recoverable failure when the system supports it; say honestly when it cannot.
Field errors sit inline; broader errors sit at the form or section. Prevent duplicate submission.
For autosave, show unsaved changes that matter. For upload or generation, show real progress and supported cancellation.
Do not invent notifications, retries, background persistence or consent.

## Related records and return visits

For staff tools or tasks spanning related people or records, check only the lenses that apply:

| Lens | Decide |
| --- | --- |
| Find the record | What if the identifier is missing, wrong, shared or stale? A match is not identity proof. |
| Start from either side | Can the user arrive from the other related record first? Link in context when allowed. |
| Existing or new | What prevents a duplicate person, record or charge? |
| Prerequisites | Which facts or people must be ready? Show blockers before the user invests in later steps. |
| Return with pending work | Show what is done, offer the outstanding action, keep valid earlier work. |
| Edit or leave | What stays saved, and what downstream evidence becomes invalid? |

Model independent states separately; do not collapse role, relationship, eligibility and payment to simplify a form.
Money flows only when in scope: amount due, tendered, allocated and change must reconcile. Extra money never implies consent to a tip, donation or fee.
