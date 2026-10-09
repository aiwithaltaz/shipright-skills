# Phase 1 stronger evaluations and final checks

2026-10-09. Phase 1 only; version remains 0.6.2. The implementing agent records results; fresh independent AI agents graded anonymous responses.

## What changed

Only research-planning.md guidance changed in the final patch. Interview guides must explicitly separate recalled/reported past behavior from directly witnessed in-session behavior. Download-study instructions and tables share independent completion, prompted verification, assisted completion and setup or technical failure. Record incomplete tasks, withdrawals, timeouts and unobserved steps too.

The word-budget solution was confirmed before editing: replace repeated planning prose instead of increasing the cap. The final reference contains 319 words versus 318 before; the full skills tree is **15,996/16,000**. The historical **15,995/16,000** result remains valid for the earlier snapshot, not the current tree. Evidence and tests live outside the counted skills tree. No other skill guidance was changed in this final patch.

## Three distinct comparisons

The [original comparison](../results.md) remains unchanged. Baseline also passed R02/R05/R06. **Measurable improvement was not established by that original shared-case comparison.** Original failures and the R05 classification ambiguity remain preserved as historical evidence; they have not been retrospectively changed to Pass.

The approved [stronger pre-fix evaluation](pre-fix/ShipRight_Phase1_Stronger_Evaluation.md) ran identical prompts, three fresh trials per version, blind scoring and frozen criteria: baseline **110/120**, 13/15 useful passes; Phase 1 **117/120**, 15/15. Neither had critical failures. The +7 points came from checking measurement validity (E01) and making an afternoon plan conditional on participant availability (E02). E03 revealed the shared interview-guide gap; E04/E05 tied.

The final patched version reran all five unchanged stronger prompts, three fresh trials each: **120/120**, **15/15 useful passes**, **0 critical failures**. This is a separate follow-up, not a replacement baseline comparison. Original baseline and pre-fix scores are retained, not regraded. New blind graders assessed the final outputs; reviewer and sampling variation limit attribution of any score difference.

| Case | Frozen baseline | Pre-fix Phase 1 | Final Phase 1 |
| --- | --- | --- | --- |
| E01 | 19/24 | 24/24 | 24/24 |
| E02 | 22/24 | 24/24 | 24/24 |
| E03 | 21/24 | 21/24 | 24/24 |
| E04 | 24/24 | 24/24 | 24/24 |
| E05 | 24/24 | 24/24 | 24/24 |

All final stronger responses used the same frozen outcome rubric, 0-2 per criterion and maximum 8 each. A useful pass requires at least 6, no zero criterion and no critical failure. Percentage scores are rubric points, not UX quality or user completion rates. The final E03 guides carried the reported/observed distinction; no scored case declined. E04 already passed both old versions and does not demonstrate a new gain.

## Original tasks and existing dry-runs

All eight original R01-R08 tasks reran once in fresh threads. All eight materially passed the original rubric. R05 used the original full mobile-study request without naming the required categories; its response included matching prompting rules and all four outcome categories. R07's seven-question interview guide explicitly distinguished recalled reports from observed actions. Both fixes appeared without a targeted answer hint.

Minor findings are retained:
- R01: ["Card 3's option B heading names multiple integrations and unattended actions as exclusions, while its example describes exploring one tool with reviewed actions; this makes the proposed boundary less clear.", "Each card's You decide text delegates the choice to the assistant, while Let me decide keeps it with the user. These perspective labels can confuse who owns the decision, although the explanatory text preserves ownership."]
- R05: ['The prompted-verification table row says independent completion remains unverified without stating the already-witnessed-success exception within that row. The surrounding instructions to record and preserve initial outcomes supply the exception, but the row would be clearer with it explicit.']

The R05 row could repeat the exception for already-witnessed success more explicitly. Its surrounding instructions preserve the initial observed outcome, so the blind reviewer found no material contradiction. This is response clarity, not actual-session classification validation; actual sessions remain **Not verified**.

The existing two-idea/four-skill prompt pack also reran in eight independent threads: **70/80** under the unchanged Q/S/D/U/F rubric. That rubric has no pack-wide pass threshold. Do not turn this score into one. The initial blind grader recorded two material failures; these remain preserved and were independently adjudicated as a scoring/contract mismatch, with no material failures under the applicable first-reply contract. The old authored dry-run score is not a controlled paired baseline for these fresh model responses.

Initial dry-run findings (including the disputed deductions) are preserved:
- DB-product-design: ['One consequential card follows an explicitly clear frame, rather than the frozen zero-question clear-task pattern. The card is useful, but its count does not match the rubric.'][]
- DA-ship-check: ['Requests another artifact before using the supplied description for the check it supports.']['Does not assess the explicitly reported missing confirmation back control, competing filled buttons or ambiguous trash-only removal action.', 'Does not provide bounded launch checks, corrective actions or retest conditions; the absence of a build should limit runtime conclusions rather than prevent a specification-level review.']
- DB-ui-ux-design: ['Queue removal after successful packing should be conditional on the authoritative definition of open; the reply acknowledges that definition is unknown but does not carry that uncertainty into its success-state requirement.'][]
- DA-ui-ux-design: ['The first-version scope card lacks a concrete example demonstrating the offered boundaries.'][]
- DB-ship-check: ['The screenshot request postpones completion of a description-based assessment that is already possible.', 'The proposed corrections lack item-level statuses and retest conditions.']['Does not identify the reported missing return route as an evidenced critical launch defect or distinguish it clearly from runtime checks that remain unverified.', 'Does not provide a substantive structured launch check against the supplied artifact; unavailable build evidence is a valid limit on certification, not a reason to omit the bounded check.']

## Dry-run scoring disagreement

The initial grader treated written screen descriptions as sufficient to require a substantive launch review, scoring the eight replies 70/80 and flagging both ship-check replies. Ship-check explicitly says that if no URL, build or screenshot is supplied, ask one artifact question and stop. Neither raw task supplied one. An independent anonymous review assessed the same frozen first-reply rubric and this unchanged scope contract, retaining the original scores and failures rather than overwriting them.

The [adjudicator](final/adjudication/review.json) found a scoring/contract mismatch: both ship-check responses scored 9/10 and had no material failures under that contract. With other scores untouched, the separate adjudicated total is **75/80**, versus the preserved initial **70/80**. Remaining weaknesses include not presenting the four statuses and a minor pre-artifact scope concern in the warehouse reply. This post-result adjudication is disclosed, not counted as a new blind experiment or a change to the rubric. No perfect score or invented pack pass threshold is claimed. All initial negative findings remain inspectable.

## Executed source and preservation checks

- `python3 evals/check_sources.py --self-test`: Pass; 52 mutations rejected, including the five new guide guards.
- `python3 tests/test_phase1_research.py`: Pass; all 18 source regressions.
- `python3 -m unittest discover -s tests -p 'test_*.py'`: Pass; same 18 tests discovered, not 18 additional tests.
- `git diff --check`: Pass.
- 15,996 skill words; four skill names, gate IDs 8/10/10/20 and F1-F3 unchanged.
- All 31 final source copies and raw records verified unchanged; grade sums/caps/pass rules verified; no scoring corrections.
- All 58 pre-fix archive entries preserved byte-for-byte; original tracked Phase 1 records, historical reports and prior research PNGs match the pre-patch Git bytes.

Intermediate source checks caught unresolved links in copied rubric/prompt files and the quoted scope-contract excerpt. Frozen rubric and raw input bytes were retained; their linked prompt/README files were copied beside them, and the contract display was fenced as quoted Markdown. Exact original adjudication inputs remain in original-inputs.zip and scope-contract.txt. The staged whitespace check also flagged original frozen rubric EOF blanks and patch context lines. Exact bytes were preserved with file-specific Git whitespace attributes for those six evidence files; active source checks were not relaxed. The final full checks passed. No skill changes or answer retries were made after the trial freeze.

## Evidence and limitations

[Final protocol/source freeze](final/freeze.json), [exact source hashes and invocations](final/manifest.json), [patch tested](final/patch.diff), [31 complete response records](final/outputs.jsonl), [anonymous grading packets](final/blind), [scores](final/scored-results.json), [summary](final/summary.json), [integrity checks](final/integrity-checks.json) and [check log](final/checks.txt) retain all outputs and omissions. Per-trial response.json files are byte-for-byte originals. The full [pre-fix bundle](pre-fix) retains 30 responses, five graders, frozen protocol and failed baseline outcomes.

Final trials used 31 fresh threads with no inherited conversation, expected answer or rubric. Fifteen stronger trials, eight original tasks and eight existing dry-runs received only their skill tree and raw task. Seven initial fresh graders received only anonymous response text, prompt and frozen rubric. An eighth fresh reviewer adjudicated the two dry-run scoring disputes using the unchanged applicable scope contract; its independent result is reported separately. All grades were frozen before joining opaque IDs to trial IDs. The implementing agent checked arithmetic and analyzed after unblinding; it did not overwrite original scores. Stronger-case points had no corrections; dry-run adjudication is disclosed separately. The approved two guide contracts were frozen before the original-task rerun.

One inherited model configuration; exact serving model ID, seeds and sampling settings unavailable. Isolation was fresh-thread and instructed file boundaries on a shared host, not OS-enforced. Consulted paths are self-reported. One AI grader per packet; no measured inter-rater agreement or human adjudication. Response content might reveal guidance differences despite metadata removal. Chosen tasks are a small, selected instruction-following sample.

No actual research, participant recruitment, user outcome gains, mobile/accessibility certification, client install or runtime authorization was verified. No broad reliability, causal superiority or statistical-significance claim follows from these scores. Existing historical app.js hash mismatch and F03 quotation-style failure remain unchanged. New before/after PNGs are authored print-rendered illustrations, not browser screenshots or model outputs. WeasyPrint fallback rendered a single page per side; every PNG was visually checked. Historical capture helpers/fixtures remain unchanged.

No material regression was observed in the final behavior checks. The narrow fixes and recorded source results support completing Phase 1 under the user's conditional merge approval; they do not prove absence of regressions elsewhere. Phase 2 was not started.
