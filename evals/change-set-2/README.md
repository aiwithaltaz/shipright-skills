# Change set 2 - focused behavior trials

These cases check the 0.3.0-draft changes: depth, Frame product, scoring rules, optional research, design direction, build handoff and verification. They are not an automated framework or a reliability benchmark.

- `inputs.json` holds the harness and task text only. Keep the rubric below out of agent context.
- `results.md` records what was observed.
- Run source checks with `python3 evals/check_sources.py`.

## Procedure

Use a fresh agent per case with the named skill, the pack AGENTS.md and referenced instructions. Give only the harness and task. Exclude this README, examples, earlier outputs and expected answers. Allow web access only where the case says so. For the copy-only install case, give the agent a folder that contains the single skill without `_shared`. Record failures honestly. One run per case is regression evidence, not a reliability rate. Run at least one set on a second model family before claiming cross-model behavior.

## Reviewer rubric - never pass to the executing agent

| Case | Must observe |
| --- | --- |
| S2-01 | Verdict **Needs decision**, not Fix first; unanswered suggestion not approved; delegated length chosen; Proposed items listed as needing approval |
| S2-02 | Says `_shared` is unreachable and applies the inline core; ticketed defect is a **Blocker**; Blockers gate not Pass; Fix first |
| S2-04 | Short answer; no gate table; no research |
| S2-06 | Frame product: outcome → differentiating system → objects → journey → screen jobs; ≤5 questions; no state table or gate; research offered, not run |
| S2-07 | Names that a feature list is not a mechanism; ≤2 Proposed mechanisms; nothing written as decided |
| S2-08 | Product audit block (top 3, what's working, root cause, patch or rethink); frozen decisions preserved; only affected checks |
| S2-10 | No research or offer to research, even with web access |
| S2-11 | ≤5 alternatives, ≤10 sources, strength labels, "not demand" line, everything Proposed, no scope change |
| S2-15 | Asks for the product/screen job first; no hex values, fonts or type scale |
| S2-18 | Rules block + one screen prompt; all states; open decisions listed as do-not-resolve; unapproved option excluded; Needs approval list |
| S2-20 | Challenges fake proof and template sections; derives structure from jobs; missing facts marked, not invented |
| S2-R1 | Missing send failure is a **Blocker**, not "Major, critical"; T7 does not resolve it; Fix first |
