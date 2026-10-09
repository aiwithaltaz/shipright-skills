# Phase 1 UX research evaluation, 2026-10-09

Base: ShipRight 0.6.2, b5e80000f3069e46dfd49005a0c83b05b5e94564.
This is a Phase 1 working change, not a new release or cross-model certification.

## Setup and raw evidence

- Three baseline fresh threads: R02/R05/R06, using the unchanged base checkout.
- Eight after fresh threads: R01-R08, using the Phase 1 pack.
- Each received only the applicable skill path, raw request and read-only boundary;
  no rubric, expected answers, parent conversation, suspected failure or diagnosis.
- Same inherited model configuration, no overrides. Exact serving model ID and seed
  were not available in these records. One initial attempt per case.
- Responses were frozen before rubric scoring. Follow-up turns only serialized the
  prior response and actually consulted file paths; decoded response text was not rewritten.
- Implementing agent scored results; a separate fresh reviewer read only
  inputs.json, rubric.md and outputs.jsonl, not implementation files.
- Raw records: [outputs.jsonl](outputs.jsonl). Criterion definitions: [rubric.md](rubric.md).
- [Source manifest](source-manifest.json) hashes consulted files for base and final sources.
  Initial-after hashes are explicitly reconstructed by reversing the two documented
  targeted edits, not described as a separately captured checkout.

## Initial response review

| Case | Status | Observed response evidence / limits |
| --- | --- | --- |
| R01 | Pass | Three decision cards only; unresolved audience, no screens or performed research |
| R02 | Pass | Scoped provisional direction, hypothesis, unperformed study, access/consent and stopping point |
| R03 | Pass | Reports versus described/uninspected recordings; checks sample overlap, analytics definitions and unsupported 30% lift |
| R04 | Pass | Exact label and bounded acceptance check; explicitly not run |
| R05 | Pass with a minor omission | Mobile/screen-reader guide, no recording, neutral task, assistance and stopping conditions; verification prompting could blur independent completion |
| R06 | Pass | Current-flow observation, reported ease, historical/version limits and unsupported competitor causality |
| R07 | Pass | Seven neutral participant questions, no extra founder intake; recalls versus witnessed actions |
| R08 | Pass with a minor omission | Reserved access choice and authorization not ready; unsupported reference to supplied invoice content |

Pass here covers the named response criteria, not executed research or verified app behavior.
Minor omissions remain part of the raw evidence. They were not removed from the records.

## Baseline comparison

All three shared baseline cases also materially pass. Therefore no pass/fail improvement
is established. R02 after adds consent/access, ownership and timebox but is longer.
R05 after adds outcome categories and stopping conditions; baseline more clearly separates
file verification from spontaneous completion. R06 after adds denominator/timeframe and
access coverage; baseline already protects behavioral/attitudinal and competitor limits.
These are mixed differences, not a claim of superior output quality.

Baseline R05 includes an em dash in its decoded raw response. This style miss is preserved
and disclosed; JSON escaping is serialization, not removal or proof of style compliance.

## Targeted corrections and reruns

Added explicit independent-completion-before-verification guidance and a missing-artifact
Unknown rule. R05/R08 are targeted regression reruns in fresh threads with the same raw
requests, without diagnosis or expected answers. Raw rerun records are appended in outputs.jsonl. R05 now records independent completion
before verification prompts and distinguishes prompted recovery; R08 explicitly keeps
invoice content and fields Unknown and uses labeled placeholders. Both satisfy the
affected criteria. Initial outputs remain historical to the earlier instruction bytes.
The independent reviewer confirmed both targeted criteria. R05 still has a minor
reporting gap: the guide identifies prompted verification, but its outcome table lacks
a separate prompted-verification category. Consistent use in actual sessions is Not verified.

## Source and visual checks

Final source checks, mutation counts and Phase 1 source regressions are recorded in the
[after report](../../tests/reports/2026-10-09-phase1-after.md). Structural tests cannot prove model interpretation.

The HTML teaching pair was rendered with WeasyPrint 70.0 and pdftoppm at 96 dpi and
visually inspected. Both 540x860 panels and the combined image were legible and unclipped.
Chrome was unavailable; its download failed, so these PNGs are print-rendered illustrations,
not browser screenshots. They do not depict actual baseline or after trial output.
Core skills require no new dependency; the optional illustration renderer has separate tooling.
The Chrome capture path was not exercised successfully in this environment.

## Limits

No real participants, recruitment, user sessions, observed usability improvement,
accessibility certification, runtime authorization, client installation or paid research was
established. Statements in task responses that no outreach/files occurred are not an
independent tool-action audit. Tests do not generalize across models or product categories.
After-only cases provide no baseline comparison. The broader enabled/disabled benchmark
remains Phase 13; research synthesis remains Phase 2.
