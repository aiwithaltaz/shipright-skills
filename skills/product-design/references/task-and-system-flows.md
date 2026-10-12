# Task flows and known system processes

Choose a task flow when the decision concerns one user's actions and branches toward a goal. Choose a system process when it concerns known automatic work, triggers and state changes. Do not generate both automatically. In one selected representation, distinguish user actions from system steps when they intersect; a navigation hierarchy is not either sequence.

Name actor/job, approved phase, source and entry/exit. Derive sequence, decisions and success from supplied behavior or clearly labeled authorized proposals. Preserve alternate entry, interruption, return and recovery. Do not invent screens, routes, actors or actions to connect gaps. Missing branches remain Unknown.

For a task flow, a compact step table can record actor action, known system result, branch, preserved work/exit and evidence/open question. Include only applicable rows. Use existing states-and-flows.md for state effects and shared flow-rules.md for F1-F3; this reference owns choosing the representation, not a second state contract.

For a known system process, record sourced trigger/input, component or actor, processing/state change, output, dependency and failure/return consequences. Technology and ownership are Unknown unless supplied. Do not choose a stack or data model from a map. A planned system step is Proposed, not an observed capability.

Never invent APIs, queues, retries, cancellation, notifications or persistence. A failed response does not prove the remote action failed. Preserve unknown payment outcome and prevent unsupported duplicate attempts. Leaving a page does not cancel a submitted transaction. A recovery recommendation requiring reconciliation or resumption is a proposed decision whose capability must be established before build; do not imply it already exists.

Human pending work is not a background job. Separate transferred, accepted, in progress and completed only where those facts are known. Use operational-flows.md for related records, prerequisites and human handoffs. Known dependency is not proof it is available or permission to change a read-only source. Do not hide unresolved effects behind a generic success state or spinner.

Preserve isolated accessibility/safety risks and conflicting records. A successful task elsewhere does not close them. Apply actual access boundaries to direct entry, return and recovery; hidden navigation never authorizes access. Private identifiers or records belong only in authorized artifacts, not public map summaries or logs.

Keep current-state evidence separate from future-state proposals. A map, ticket or written recovery plan is not runtime verification. Give concise scoped decisions, risks and verification needs; hide routine internal plumbing from product users while retaining useful consequences. Use doc-set.md only for requested exports, not an automatic architecture document.

Original guidance and limitations: mapping-sources.md.
