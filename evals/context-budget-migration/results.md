# Context-budget migration results

Date: 2026-10-11. Implemented and scored by the maintaining agent. Three fresh task agents had no parent history, rubric or expected answers. No screenshots, HTML fixtures, before/after images, complex duplicate detector, Phase 2 knowledge or installed personal-skill changes.

## Baseline and source scope

Branch based on merged Phase 1 commit 8e575c232cf489dc90a5d3fa3f4a46750f519997. Its tree matched the local tree before editing. Baseline source validation passed all 52 mutation self-tests and all 18 Phase 1 tests. Stored skill words were 15,996 under the prior 16,000 cap. All original Phase 1 evaluations, failures, historical bytes, specialist references, shared rules, gate IDs and F1-F3 exports remain unchanged.

Only the UI and ship-check entries gained conditional links. UI also needs a direct severity-rubric link because slop-tells uses it. No detailed specialist knowledge was added. The 1,300-word entry safeguard remains; only the aggregate source failure and obsolete Phase 1 aggregate assertion were replaced.

## Executed checks

| Check | Result |
| --- | --- |
| Standard-library source validation and existing mutations | Pass, 52 mutations rejected |
| Required pinned context/token checker | Pass, 33 skill Markdown files |
| Unittest discovery | Pass, 46 tests: 18 existing Phase 1 and 28 new context tests |
| Missing tokenizer, actual command `python3 -S evals/check_context.py` | Expected Fail, exit 1; no estimated Pass |
| Inclusive and one-token-over limits | Pass for entries, shared files, references, normal paths and shared totals |
| Linked guidance dependencies in loading totals | Pass; unlisted dependencies count conservatively |
| Bigger compliant knowledge collection above 16,000 words | Pass; no global cap |
| Link, orphan, nested-reference, condition, ownership and path checks | Pass |
| Wrong tokenizer version and relaxed limits | Rejected |

Whitespace validation passed with `git diff --check`. The source checker also passed under `python3 -S`, confirming it remains standard-library only. CI is configured to run the same required source, token and regression checks; remote execution is recorded in the PR rather than inferred from local tests.

## Counts

Tokenizer: tiktoken 0.12.0 / cl100k_base, full file content including frontmatter, links, tables and code. Entry maximum: 4,500; normal path maximum: 12,000.

| Skill | Entry tokens | Largest declared path tokens |
| --- | ---: | ---: |
| product-design | 1124 | 5595 |
| ship-check | 1209 | 5950 |
| ui-ux-design | 1442 | 10719 |
| ux-critique | 1214 | 6426 |

Always-loaded contract and intake: 1678/3,000. All shared rules: 2986/5,000. Largest shared file: 989/2,000. Largest reference: 1099/4,000. Stored knowledge totals are informational, with no hard repository or per-skill aggregate cap. Review-only thresholds remain 50,000 reference tokens per consuming skill, 100 MB per repository and 10 MB per file.

## Fresh selective-loading smoke tests

[Protocol](protocol.md) was written before trials. [Raw replies and exact prompts](outputs.jsonl) preserve every response and self-reported file list. Four criteria: task relevance, avoiding bulk loading, scope/evidence boundaries and verification honesty. All three responses met these criteria.

| Case | Self-reported guidance tokens | Outcome |
| --- | ---: | --- |
| C1 | 5427 | Pass |
| C2 | 7591 | Pass |
| C3 | 5146 | Pass |

C1 made only the label correction and kept rendered/accessibility verification unresolved. It loaded the UI copy and state references without unrelated research or visual modules.
C2 selected state, bounded-verification, severity and review guidance; it also routed to ux-critique. It found the missing modal behavior and distinguished source findings from untested runtime operation. Both skill entries are included in its count. Source-observed absence, rather than predicted user behavior, supports its failure finding.
C3 loaded launch-item, accessibility and bounded-verification guidance for the narrow request, avoiding unrelated research. It did not infer a missing-focus defect or certify accessibility from the provided description. Its input was transcribed screenshot observations, not an actual image; the visual Pass is conditional on those supplied observations, not an independently inspected image.

These are one-run smoke tests on one inherited model configuration, scored by the implementer without blinding. Read lists are self-reported, not independently audited tool traces. The source-only trial folders were isolated from evaluations and repository maintenance instructions. This does not establish client installs, cross-model loading compliance, UX improvement or real user validation.

## Test-development failures retained

An initial source run found a report link before its target had been written; writing this report resolved it. After adding conservative dependency totals, three new shared-boundary fixtures also exceeded the separate normal-path limit. Those fixtures were given headroom in unrelated references so each threshold could be tested in isolation; production limits were unchanged. A new dependency-overflow fixture initially removed the links it meant to test; it now appends content while preserving those links. All corrected fixtures pass, and the separate combined-budget/dependency cases reject overflows.

## Limits and readiness

Static checks establish direct links, visible routing text and bounded declared paths. They do not prove the semantic quality of every condition or control client loading. A path counts linked reference/shared dependencies conservatively; it excludes conversation, project data, tool results and optional exports/taste files. Large tasks require bounded stages rather than dropping safeguards. Canonical ownership is documented; semantic duplication remains a review responsibility. Historical app.js hash mismatch and quoted F03 style limitation stay disclosed.

The change is ready for draft review with these limitations. It does not authorize merge, release or Phase 2.
