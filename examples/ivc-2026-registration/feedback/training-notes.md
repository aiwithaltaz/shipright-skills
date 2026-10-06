# Training candidates and evaluation boundaries

**0.6 correction:** Candidate records 2, 7 and 8 were revised to remove approval claims absent from their own input.
These remain authored, untrained examples needing human review. They are not current project requirements or held-out evals.

The owner asked for material that could later help fine-tune a model using a Soup GitHub project. Its exact repository is still needed. Do not guess a package or claim these records are import-ready for an unknown tool.

## Files and format

- `shipright-learning.md`: human-readable feedback, product corrections and general lessons.
- `training-candidates.jsonl`: one JSON object per line, containing `messages` with system, user and assistant strings. Examples are authored by the builder from the owner's feedback. They are not transcripts of real users or gold labels approved by a separate reviewer.
- `training-manifest.json`: ordered IDs, relevant feedback IDs and provenance. Keep this metadata separate if the eventual trainer accepts only a `messages` key.
- `../../../evals/change-set-3/`: independent behavior trial requests and outputs. Keep these out of training data if using them to evaluate a model. The same agent wrote the training candidates and reviewed trial results; this is not a blinded benchmark.

## Before using for training

1. Confirm the exact target repository, supported dataset format, model and training purpose. Adapt a copy rather than rewriting the canonical feedback.
2. Human-review every example for authority, unresolved policies and desired response quality. Mark approved/rejected examples explicitly; current review status is `needs_human_review`.
3. Use fictional names and no actual attendee details, signatures, parent contacts, staff credentials or screenshot/browser metadata. This package contains none of those source records.
4. Keep related examples together when making train/validation splits, to avoid near-duplicate lessons leaking across splits. Keep the distinct equipment-hire trials held out. This small corpus is not enough to establish general model quality.
5. Add difficult counterexamples: a valid existing design system that should be preserved, scope that excludes money, a legally unresolved consent rule, and a legitimate blocker that must remain visible. Do not train “minimal” to mean “hide important facts”.
6. Validate the adapter against the actual tool, then evaluate behavior before claiming improvement. No model training, paid compute, dataset upload or model publication was performed in this update.

The reusable goal is better reasoning about entry, dependencies, recovery, information hierarchy and evidence. The model should not learn that every product needs event registration, guardian forms, COC, cash donations or an 8-point spacing system.
