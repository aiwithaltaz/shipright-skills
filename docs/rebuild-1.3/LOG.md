# Phase 1 log

Draft 1.3, not released. No merge, tag, release, or deploy.

## Plan

Do P1.1 through P1.10 from docs/rebuild-1.3/PLAN.md, then stop.

1. P1.1 Baseline. Do not run Claude. Prepare the missing-arm prompts. Mark grading pending.
2. P1.2 Move check-ui into the skill. Keep a wrapper at scripts/check-ui.mjs. Put templates, patterns, and blocks in the zip.
3. P1.3 Replace SKILL.md. Route the six eval messages. Keep the five modes. One copy of the incomplete-pack line.
4. P1.4 Facts ladder in the operating contract. Keep intake as its own file. Keep every protected phrase.
5. P1.5 to P1.7 Stages 1 to 3, with research-brief, concepts, and risks.
6. P1.8 Shorten the ChatGPT file to 3,000 to 4,000 words. Do not delete the operator-workspaces stub (tests and frozen links need it). Move eval history to docs/HISTORY.md. Keep old gate ID tables. One website stack, in stages/05-architecture.md.
7. P1.9 Stage 0, discovery templates, and crawl.mjs. It must find sign-in, desk, registrations, and reports on the c7 app.
8. P1.10 Record templates and check-record.mjs. The live "read only the record" test waits for Altaz.

Word budgets go in context-policy.json as v13_layout. Token limits stay frozen.

## What changed

### P1.1 Baseline

Not graded. No scores in this log.

Runs already on disk: c1, c2, and c3 both arms; c4 Opus only; c6 both arms. pack-commit.txt for those runs says c38f1d692770e1296642abb369a54ef872a649cb.

Missing: c4 Sonnet, c5 both arms, c7 both arms, c8 both arms. Paste-ready prompts are in evals/v2/runs/baseline-1.2/prompts/. Each missing ShipRight arm says pack = v1.2 at commit 9cb0e47, not this working tree.

Results files: evals/v2/results/baseline-1.2.md and baseline-1.2.json. Status: not graded.

### P1.2 Tools

skills/shipright/scripts/check-ui.mjs is the checker. scripts/check-ui.mjs imports it. crawl.mjs and check-record.mjs sit beside it.

A crawl of evals/v2/cases/c7-ivc-app/app found 7 screens: sign-in ("Celebration of Service."), desk ("Welcome to the desk."), registrations, reports ("The day, accounted for."), close, and the public event page. The test is tests/test_v13_foundation.py.

check-record fails while Status is template, and passes after Status: current.

The wrapper still drives the old checker tests. A known bad page fails. A known clean page passes.

dist/shipright.zip lists scripts, templates, patterns, and blocks. Top folder is shipright/.

### P1.3 Router

skills/shipright/SKILL.md is 1,118 words. Pack version line stays 1.2.0. A draft line says 1.3, not released.

The six messages in the table open research, except "Rebuild the screen with these changes", which opens the feedback round. "just build it", "skip the plan", and "build in one go" do not skip a stage. The sentence "No step is skipped for a new project, even on request." is still there.

build-pack MODE.md no longer has "## Full flow for a new project". It points at SKILL.md. The five mode files no longer copy the core-rules fallback. That line lives once in SKILL.md.

### P1.4 Facts ladder

operating-contract.md is 884 words. intake.md is 594 words. Both are under 900.

The ladder kinds are Supplied, Verified, Assumed, Sample, and Illustrative. The four statuses are unchanged: Pass, Fail, Not verified, Not applicable.

Protected phrases used by evals/check_sources.py and tests/test_v1_safeguards.py are still present, including the lowercase lines "silence is not approval" and "unknown access, destructive effects and prices cannot become defaults".

Token check: always-loaded contract plus intake is 1,915 tokens (cap 3,000). The shared folder is 3,247 tokens (cap 5,000).

### P1.5 to P1.7 and the rest of the spine

Stages 00 to 10 and feedback-round.md are in skills/shipright/stages/. Each is under 1,200 words. Templates are under 600 words. Each stage names the headings its template must have. A test checks those headings exist.

Stage 3 says every risk needs a decision and a test. It does not allow "monitor" or "TBD" as a row. Platform verdicts are Allowed, Risky, or Banned.

Stage 5 is the only website stack rule: a premium public site with a product on stage uses Vite, plus Three.js or React Three Fiber, plus GSAP and Lenis. A calm content site, or a site with no product object, uses Astro. stack-choices.md points there.

Show exactly three options. They differ in story or layout, not in color.

### P1.8 Bloat

dist/shipright-chatgpt.md is 3,722 words. It inlines SKILL.md, stages 0 to 3, the feedback round, and the core templates (research, concepts, risks, discovery, pain-map, reply, record CONTEXT and HANDOFF). Stages 4 to 10 and the mode references stay in the zip. Putting them in the short file would pass 4,000 words.

The operator-workspaces redirect stub was not deleted. tests/test_full_flow.py and the frozen example links still need it.

Eval history moved to docs/HISTORY.md. README still has the heading "## How it improved". Five comparison images named in that history are not in this zip, so HISTORY does not link them (a link would be a new broken-path error).

Old gate ID tables stay in the mode files. The source checker still requires them.

### P1.9 and P1.10

Discover, pain-map, and user-test-script templates are in place. The worked pain row is the late parent-signature case. It does not use the banned IVC strings.

Record templates: CONTEXT, ARCHITECTURE, DECISIONS, CHALLENGES, CHANGELOG, HANDOFF. Each starts as Status: template.

tests/reports/smoke/PENDING.md says the Haiku routing run and the record-continuation run are not done.

### Checkers

evals/check_context.py classifies stages, templates, patterns, and blocks. It enforces v13_layout. It does not raise LIMITS.

A stage path may link more than two small templates. Discover does. The path still has to stay under 5,000 words. At most one pattern.

evals/check_sources.py no longer requires the core-rules fallback inside each MODE.md. It requires that line in SKILL.md. The router cap is 1,600 words. Mode files stay at 1,300.

## Commands

python3 evals/check_context.py

PASS. tiktoken 0.12.0, cl100k_base. 93 files. Always shared 1,915. All shared 3,247. Largest normal paths stay under 12,000. ui-ux-design is the tight one, at 11,656.

python3 evals/check_sources.py

FAIL, same missing historical images and trial files as the attached zip before these edits. Diff against that baseline: 0 new errors. 6 old README errors are gone (the zip link, because dist/shipright.zip now exists, and five image links that moved into the history note and are not linked).

python3 self-test of evals/check_sources.py (called directly, because a failing source check returns before --self-test): 157 mutations rejected.

python3 -m unittest discover -s tests

52 tests. 1 failure, 55 errors, 1 skip.

The failure is test_current_sources_pass. The errors are test_historical_evidence_unchanged. Both are the missing binary files in the attached zip (figma images, evidence pngs, and similar). Those checks were not deleted.

New tests passed: routing, template headings, word budgets, crawl on c7, check-record, release zip, full-flow rush phrases, and the checker fixtures.

## Pending for Altaz in Claude Code

- The seven missing baseline arms, then three blind graders per case, then pain recall on both c7 runs.
- Smoke eval: Sonnet plus this draft on c1, c3, and c7. Pain recall on c7. Target in the plan: research and concept at 8 or higher, and higher than Opus; c7 pain recall 60 percent or more.
- Haiku (or Grok) read of a filled record folder. No smoke record exists yet, so this was not run.

## Phase 1 gate

Not a release. The spine, the facts ladder, stages 0 to 3, the templates, and the tools inside the skill are in the tree. Baseline scores do not exist yet. Smoke scores do not exist yet.

## Questions

1. Is this spine the direction to keep: stages 0 to 3, the facts ladder, and the SKILL routing table? Recommended: yes.
2. Keep the old mode gate-ID tables until Phase 2? The checker still requires them. Recommended: yes.
3. Keep the operator-workspaces redirect stub? Frozen links and a test need that path. Recommended: yes. Do not delete it.
4. Keep the ChatGPT file to the spine (stages 0 to 3, feedback, and the core templates, 3,722 words), with stages 4 to 10 only in the zip? Recommended: yes.
