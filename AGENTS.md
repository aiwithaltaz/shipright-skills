# Maintaining ShipRight

**Pack version: 0.6.2**
**Context before generate. Product before pixels.**

These rules govern this pack, not an end-user app. Preserve the four skill names and one canonical source tree.

## Editing

- Read current user instructions and affected files before editing. Preserve unrelated work and explicit decisions.
- Keep general rules in skills/_shared/, specialist detail in references/, and copied project templates in docs/.
- Preserve outcome, useful mechanism, objects/states, journey, screen jobs and evidence-based critique.
- Build only the current phase. Convert exact feedback to acceptance checks; keep later ideas out of UI.
- Never invent brand values, data, features, research, legal text or approval.
- Use simple English and short sentences. No em dashes. Remove redundant ceremonies and rule copies.
- Keep personal preferences opt-in. Case-specific placement and policy must not become universal product rules.
- Keep names, triggers, relative links, metadata, catalog and changelog aligned.
- Do not modify installed personal skills or publish a repository merely because a zip is being edited.
- External publication, tags, releases and paid calls require authorization for those actions.

## Source ownership

The operating contract owns authority, phase scope, exact feedback, evidence and readiness.
Shared intake owns 0-5 total questions before starting. Do not restart intake at each skill boundary.
Flow rules (must pass) live in skills/_shared/flow-rules.md: F1 exit, F2 consistency and F3 useful status.
Keep the marked compact export blocks identical in docs/04-frontend-spec.md and docs/build-rules.md.
Do not maintain long Flow rule copies elsewhere.

## Validation

Run `python3 evals/check_sources.py` after changes. Update checks when rules or protected paths change.
When a skill's instructions change, add before and after screenshots. Follow tests/README.md. Keep older folders under examples/before-after/.
Use `python3 evals/check_sources.py --self-test` to confirm meaningful mutations are rejected.
Keep stable gate IDs: product-design 8, ui-ux-design 10, ux-critique 10, ship-check 20.
Source checks are not behavior tests. Preserve raw controlled-trial output and state who wrote/scored it.
Fresh trial agents should receive only the pack, raw user task and relevant artifacts, not expected answers.
Do not reuse old Pass claims for new code or silently repair a historical manifest to match changed bytes.
Preserve historical failures with clear notices. A new release needs new evidence and explicit limits.
