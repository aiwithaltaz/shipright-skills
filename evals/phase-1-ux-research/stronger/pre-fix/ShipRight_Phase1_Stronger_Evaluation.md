# ShipRight Phase 1: stronger evaluation

2026-10-09. Evaluation only. No ShipRight source changes, PR edits, merge or Phase 2 work.

## Decision

Phase 1 showed a small, focused improvement in this evaluation: 117/120 versus
110/120 for baseline, a gain of 7 points or 5.83 percentage points on this rubric.
The result supports a limited research-guidance upgrade. It does not establish
general UX superiority, actual usability improvement, or expert-level performance.

I recommend keeping PR #8 draft until the new evidence is recorded and the remaining
guide gaps are reviewed. There were no scored regressions or critical failures, so
this is not a finding that Phase 1 is unsafe or broadly worse. It is a recommendation
to reconcile the existing PR's evidence claims and minor guide limitations before merge.

## Scores

| Version | Score | Rubric percentage | Useful passes | Critical failures |
| --- | --- | --- | --- | --- |
| Frozen baseline | 110/120 | 91.67% | 13/15 | 0/15 |
| Frozen Phase 1 | 117/120 | 97.50% | 15/15 | 0/15 |

These percentages are rubric points, not overall UX quality or user success rates.
Each response had four practical criteria scored 0–2, maximum 8. A useful pass
required at least 6 points, no zero criterion, and no critical failure. Consequently,
two baseline responses scoring 6/8 failed the useful-pass rule because their
measurement-validity criterion scored zero. They were not classified as critical failures.

| Case | Baseline scores, repeats 1/2/3 | Phase 1 scores, repeats 1/2/3 | Total baseline / Phase 1 | Useful passes baseline / Phase 1 |
| --- | --- | --- | --- | --- |
| E01: implicit research triage | 6, 7, 6 | 8, 8, 8 | 19/24 / 24/24 | 1/3 / 3/3 |
| E02: feasible method under low traffic | 7, 7, 8 | 8, 8, 8 | 22/24 / 24/24 | 3/3 / 3/3 |
| E03: repair a biased interview guide | 7, 7, 7 | 7, 7, 7 | 21/24 / 21/24 | 3/3 / 3/3 |
| E04: operational completion categories | 8, 8, 8 | 8, 8, 8 | 24/24 / 24/24 | 3/3 / 3/3 |
| E05: desktop-only coverage limits | 8, 8, 8 | 8, 8, 8 | 24/24 / 24/24 | 3/3 / 3/3 |

## Where Phase 1 improved

E01 contributed five points. All three Phase 1 responses checked whether the reported
completion decline was measured reliably: event definitions, denominators, comparable
cohorts/time periods and/or current-version evidence. They treated the CEO's explanation
as a hypothesis and kept the next decision within approved onboarding scope.

Baseline t09 and t13 accepted the reported decline as an established problem without
proposing a measurement-validity check. Baseline t16 partially addressed comparability
but did not sufficiently validate the trend. This is a consequential distinction:
acting on a measurement artifact could lead to the wrong product correction. Baseline
still protected against accepting the CEO's causal explanation or expanding scope.

E02 contributed two points. All three Phase 1 plans made the afternoon's participant
sessions conditional on participants being available and supplied a preparation/review
fallback. Baseline t08 and t21 proposed useful diagnostic sessions but left same-day
recruitment feasibility unresolved. Baseline t07 already handled that dependency.
Both versions consistently rejected declaring a completion-rate winner from five people.

## Where Phase 1 regressed

No scored regression was observed across the five cases. Three cases tied.
This does not establish absence of regressions elsewhere or in other model configurations.
No points were awarded or deducted for response length, preferred labels or style.

E03 revealed a shared gap: all six guides failed to clearly explain how a participant's
recalled workflow differs from directly observed work. Both versions produced useful,
neutral, in-scope questions and avoided demand validation claims, but earned only partial
credit for evidence interpretation. Phase 1 did not improve this outcome in these trials.

E04 correctly distinguished independent completion, prompted verification/recovery,
directional help and setup failure in every response. Equivalent separate labels or
explicit flags/subcategories received equal credit. Some responses added events to their
explicitly fictional demonstrations; the blind grader accepted these as fictional variants,
not fabricated real observations. This scoring judgment is preserved in the original grades.

The E04 result does not retroactively resolve the earlier R05 full-guide limitation in
PR #8: its guide identified prompted verification but its outcome table omitted a separate
prompted-verification category. E04 explicitly supplied the four contrasting examples;
it establishes correct handling under that prompt, not spontaneous completeness of a
longer participant guide. Baseline also passed E04, so it demonstrates no improvement
in completion classification over baseline.

## Recommended fixes, not applied

1. Make participant-guide outputs include a short, useful distinction between reported
   experience and directly observed behavior. The source already discusses this distinction;
   the missing behavior is carrying it into a practical guide. Review the guide/output rules
   in skills/product-design/references/research-planning.md. Avoid adding a mandatory
   paperwork exercise or requiring a demonstration when inappropriate.
2. Reconcile the earlier R05 guide's outcome table with its prompting instructions. Keep
   prompted verification, directional assistance and setup failures operationally distinct
   from independent completion. Add a regression using the original full-guide task without
   telling the trial agent which categories to include.
3. Record this evaluation separately in PR #8's evidence. Preserve the original comparison:
   the original three shared baseline cases passed, and that original comparison did not
   establish improvement. Describe this new +7-point result as narrow observed evidence,
   not proof of a generally superior UX skill.

Do not add instructions merely to increase the score on these five prompts. Any approved
fix should be checked with fresh, differently phrased tasks. The unchanged word budget
is 15,995/16,000; any new wording needs equivalent trimming, not a cap increase.

## Method and controls

Baseline: b5e80000f3069e46dfd49005a0c83b05b5e94564.
Phase 1: 9ef5a8e523a242bf49c2d91d723826a4d56af5ac.

The five approved prompts were unchanged. Each ran three times against each frozen
version, producing 30 fresh task threads. No parent conversation, rubric, expected answer,
version label or diagnosis was given to task agents. No model override was used.
Trial order was randomized before launch. Repeat numbers identify independent trials,
not matched seeds. There were no answer retries, replacement trials or operational failures.

Each task agent received its own neutral directory containing only that commit's skills
tree, not evaluation files, Git history or sibling responses. The common wrapper restricted
reads to that tree, browsing/external actions were prohibited, and the only permitted write
was its own response record. The wrapper's paths differed; the user-task text and other
instructions were identical. Frozen copies were generated with git archive, and source
file bytes were checked against their original SHA-256 hashes after all trials.

Thirty source copies remained unchanged. All 30 outputs were frozen and hashed before
grading. The protocol was written and hashed before launching any trial:
159b1adbac9d3e3ee79c7eb4e7133374062539c819cd15fa7292892e7280abaa.

Five fresh grading agents each scored the six responses for one case. They received only
the applicable frozen rubric/prompt and randomly ordered anonymous response text. Version,
trial identifiers, source paths, consulted-file lists, mappings, old evaluations and skill
files were omitted. All graders' artifacts were frozen before joining scores to versions.
The implementing agent checked IDs, criterion ranges, sums, caps and pass rules, then
computed the comparison. No scoring corrections were made.

All Phase 1 task agents reported consulting relevant new research references. Every
reported consulted path stayed within its assigned skills tree. Consulted-file records are
self-reported; they are not an independent full tool-action audit.

## Limits

- This is a small, selected five-case evaluation using one inherited model configuration.
  Exact serving model ID, sampling settings and seed were not exposed. No cross-model
  or population-level inference, confidence interval or significance claim is justified.
- Isolation was fresh-thread and instructed filesystem boundaries on a shared host,
  with separate source/output directories. It was not OS-enforced sandbox isolation.
- Blinding removed metadata. Response contents could still suggest instruction differences;
  perfect concealment was not established. One AI grader handled each case; independent
  inter-rater agreement and human adjudication were not measured.
- The author wrote the rubric before results, then analyzed after unblinding. The cases
  were chosen to challenge known new guidance; they are not a representative UX workload.
  E03/E04/E05 remain poor discriminators because both versions tied.
- Scores assess useful research decisions and plans, not real participants, usability gains,
  runtime behavior, accessible implementation or user-facing product quality.
- No source changes were made, so existing source checks were not rerun. The previous
  PR checks are historical results, not newly executed checks for this evaluation. Instead,
  frozen source hashes and the unchanged repository working tree were verified.
- PR #8 was verified open, draft and unmerged at the same head commit after grading.
  No changes to the PR, repository remote or installed skills were published.
- Phase 2 was not started. No fixes were applied. Further changes require approval.

## Evidence bundle

The archive includes this report; the frozen protocol and prompts; trial invocations,
source hashes and randomized condition mapping; all 30 original response.json files;
the consolidated raw-response records; all five anonymous grading packets and original
grades.json files; freeze hashes; unblinded criterion scores; summary and integrity checks.

Every omission and failed useful-pass outcome is preserved. Decoded response text is not
edited. Original per-trial files are retained byte-for-byte, independent of consolidated
JSON serialization. The original PR #8 evaluation files and failures remain unchanged.
