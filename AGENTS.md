# Maintaining ShipRight

**Pack version: 1.3.0**
**Context before generate. Product before pixels.**

These rules govern this pack, not an end-user app. The installable skill is `skills/shipright/SKILL.md`. Preserve the five mode names (build-pack, product-design, ui-ux-design, ux-critique, ship-check) under `skills/shipright/modes/` and one canonical source tree. Do not publish those modes as separate skills.

## Editing

- Read current user instructions and affected files before editing. Preserve unrelated work and explicit decisions.
- Keep general rules in skills/shipright/modes/_shared/, specialist detail in each mode's references/, and copied project templates in docs/.
- The 1.3 draft also has skills/shipright/stages/, templates/, patterns/, blocks/, and scripts/. A normal stage loads SKILL.md, that stage, its templates, and at most one pattern. Do not copy those rules back into every mode.
- Keep provenance and credits in SOURCES.md. Skills cite it; they never load it.
- Every rule must change output. Prefer short, checkable rules and worked examples over theory.
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
Flow rules (must pass) live in skills/shipright/modes/_shared/flow-rules.md: F1 exit, F2 consistency and F3 useful status.
Keep the marked compact export blocks identical in docs/04-frontend-spec.md and docs/build-rules.md.
Do not maintain long Flow rule copies elsewhere.

## Validation

Run `python3 evals/check_sources.py`, `python3 evals/check_context.py`, and unittest discovery after changes. Visual guidance changes also run `node scripts/check-ui.mjs` on a rendered example. Install the pinned dependency in evals/requirements-context.txt. Token checks are required; unavailable token counting is not Pass. Update checks when rules or protected paths change.
For visual instruction changes, follow the screenshot guidance in tests/README.md. Architecture-only context-budget changes need source, boundary and loading evidence, not visual artifacts. Preserve older examples/before-after/ folders.
Use `python3 evals/check_sources.py --self-test` to confirm meaningful mutations are rejected.
Keep stable gate IDs: product-design 8, ui-ux-design 10, ux-critique 10, ship-check 20, build-pack 10. Stage files add a yes or no gate. Do not retire the old ID tables until Altaz approves that at a later gate. The source checker still requires the IDs.
Source checks are not behavior tests. Preserve raw controlled-trial output and state who wrote/scored it.
Fresh trial agents should receive only the pack, raw user task and relevant artifacts, not expected answers.
Do not reuse old Pass claims for new code or silently repair a historical manifest to match changed bytes.
Preserve historical failures with clear notices. A new release needs new evidence and explicit limits.

## Context budgets

Follow evals/context-policy.json. Token limits stay frozen: entries at most 4,500 tokens, shared files 2,000 each, contract plus intake 3,000, all shared rules 5,000, references 4,000 each, a declared normal path 12,000. Do not raise those numbers.
Word budgets for the 1.3 draft live in the same file under v13_layout. SKILL.md is at most 1,600 words. Each stage is 1,200. Each template is 600. Each pattern is 1,500. A stage path (SKILL.md + one stage + the templates it links + at most one pattern) is 5,000 words. Mode MODE.md files stay at 1,300 words.
Link every consumed reference directly from its mode MODE.md with a task-specific condition. Keep reference files directly under that mode's references/ folder. The router SKILL.md links the stage it selects, and it also links the five modes so old installs still resolve. Add or update loading paths for new task families. Preserve required safeguards. Divide large tasks into bounded stages rather than dropping essential rules. Detailed rules have one canonical owner. Reuse links instead of copied passages. Keep compact fallback text in SKILL.md only, and keep the synchronized F1-F3 exports. No automated semantic duplicate detector is required.
