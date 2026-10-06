# States and flows

Model reachable behavior within current-phase scope. Do not create features to fill rows.

| State | Behavior to define |
| --- | --- |
| Empty | What belongs here and an approved next action, if any. A read-only list need not offer Create. |
| Loading | What is loading, without fake final values or duplicate submission. |
| Populated/success | The actual content structure and permitted next task. |
| Error | What failed, what changed, preserved input and a real recovery action. |
| Permission denied | Explain the limit without exposing protected data; provide an existing exit. |
| Partial | Keep working sections usable; isolate the failure. |
| No matches | Explain the search/filter result and allow editing or clearing existing criteria. |
| Background work | A running system job with truthful, task-relevant feedback. |
| Saved unfinished work | A draft waiting for a person; show remaining work and approved resume/edit/clear behavior. |

Pending human work is not a loading spinner. Saved, valid, eligible, paid and complete are separate facts.
Only include applicable states. An empty state does not authorize creation, import or a new help destination.

## Flow shape

Specify entry, necessary steps, decision points, success destination, back/cancel effects and failure recovery.
Use this compact table where helpful:

| Trigger/current state | User sees | System effect | Permitted action | Saved work / exit |
| --- | --- | --- | --- | --- |

## Flow rules (must pass)

Read [flow-rules.md](../../_shared/flow-rules.md): F1 exit route, F2 consistency and F3 useful system status.
A screen exit is separate from cancelling a submitted transaction. Do not trap users in legal or payment steps.
Specify what happens after leaving, including an unknown payment result, before allowing a duplicate attempt.

## Consequences

Confirm important irreversible actions with the object and consequence. Use supported undo for reversible actions.
For bulk effects, show the affected scope and count. Do not invent undo where the system cannot provide it.
For clear/reset/remove, distinguish fields, selected rows, visible cards, drafts and permanent records.
Ambiguous destructive behavior stays unresolved while independent work continues.

## Forms and async work

Keep values after a recoverable failure when the system supports it. Describe lost values honestly if it cannot.
Use inline field errors; place broader errors at the form or affected section.
Prevent duplicate submission. A failed response does not prove a payment or send failed at its destination.
Use a real status lookup/recovery path when available; otherwise mark the missing capability, never claim success.
For autosave, expose unsaved changes that matter. For upload/generation, show actual work and supported cancellation.
Do not invent notifications, retries, background persistence or consent.
