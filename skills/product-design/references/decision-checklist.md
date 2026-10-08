# Product decisions

## Before screen jobs

Identify the user, job, current alternative, useful mechanism and current phase from sources.
Show only material unknown premises. Each premise needing an answer counts as a question under shared intake.
Recommend the narrowest useful version. Explain effort and risk where they change the choice.
Do not force Small/Full/Different options or invent features to fill a comparison.
A supplied frame or delegated choice needs no second approval. Unapproved scope remains in notes, not build instructions.
Then derive necessary objects, their states, the journey and screen jobs. A feature list alone does not prove value.

## Worked cards, illustration only

These cards show the shape of a first reply. They are not requirements for every product.

Idea: "Clients should book appointments at my salon. Build it."

> Q1. Who books in this first version?
> Why it matters: the screen is different for a client and for the front desk.
> A. The client, on their own phone. Example: they choose a haircut and a time.
> B. Only the front desk. Example: staff book while the client is in the shop.
> C. Something else. Type your own.
> My pick: No pick yet.
> You decide: pick A or B and say why. Let me decide: leave this open.
>
> Q2. What must this phase finish?
> Why it matters: it decides the one screen job.
> A. A confirmed visit. Example: service, time, and name kept.
> B. A request the shop confirms later. Example: "Request sent."
> C. Something else.
> My pick: No pick yet.
>
> Q3. What stays out of this phase?
> Why it matters: it keeps later ideas out of the UI.
> A. Pay in the app.
> B. Reminders, reviews, and staff profiles.
> C. Something else.
> My pick: No pick yet.

Not in this reply: a home page, ratings, prices, or a list of screens.

## Interaction choices

| Choice | Decision rule |
| --- | --- |
| Confirm or undo | Confirm important irreversible effects. Use supported undo for reversible effects. Neither is needed for harmless actions. |
| Modal, panel or page | Match task length and context. Reuse the existing pattern for the same job. |
| Guided or free input | Use guidance when approved data constrains the answer. Do not invent a source or valid options. |
| One form or steps | Split only for meaningful dependencies or complexity, not a tiny form. |
| Validation timing | Help near the field; validate before commitment. Avoid error noise before the user starts. |
| Clear, reset or remove | Name the object, scope and saved effects. Resolve destructive ambiguity before build. |

Check meaningful risks yourself: missing prerequisites, wrong permissions, lost input, slow/offline behavior, duplicate submission and return visits.
Do not force the user to enumerate every edge case or invent support services to handle them.

## Handoff

- Every step and action has a current-phase source.
- State transitions say what changes and what remains.
- Exit, consistency and status follow [flow-rules.md](../../_shared/flow-rules.md).
- Unknown APIs, metrics and policy stay Unknown. Legal copy is not authored here.
- Relevant tickets carry testable acceptance checks. Readiness uses the shared contract, not a count of completed documents.
