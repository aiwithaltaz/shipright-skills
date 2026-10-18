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

# Phase 2 log

Draft 1.3, not released. No merge, tag, release, or deploy.

Phase 1 answers, applied and left in place: keep the spine, keep the old gate-ID tables, keep the operator-workspaces redirect stub, keep the ChatGPT file to the spine. Claude runs stay pending.

## Plan

Do P2.1 through P2.13 from docs/rebuild-1.3/PLAN.md, then stop.

1. P2.1 Scope and pages. Core loop, value floor, named flows, page inventory groups.
2. P2.2 Architecture. Stage 5 already names stack, data, access, secrets, costs, and phases. Do not add a second website stack.
3. P2.3 Design system. Tokens with a measured scale, check-tokens.mjs, component states, two SIL OFL fonts.
4. P2.4 Patterns. A1 to A7 and W1 to W4, each with why, good, bad, and a check.
5. P2.5 Three options that differ by device, not color.
6. P2.6 Seventeen blocks, own code, each with a Playwright test and shots at 390 and 1280.
7. P2.7 Build stage. Removal test, no dev controls, labeled sample data, pain IDs.
8. P2.8 Test stage. run-tests.mjs writes test-report.md. Taste stays Not verified if no fresh reviewer.
9. P2.9 Feedback round. The ten steps were already in the Phase 1 file. Left as written.
10. P2.10 Taste file, opt-in. 12px is a kicker, not a gap.
11. P2.11 Seven layout moves, plus the removal test.
12. P2.12 components.md and consistency.mjs.
13. P2.13 Motion tokens, a job for every animation, app-motion-kit, and a tool table with sizes and licenses dated 2026-10-18.

Pack version stays 1.2.0. Token LIMITS stay frozen.

## What changed

### Rules

patterns/app-screens.md holds A1 to A7. Each has why, a good line, a bad line, and a check. It also forbids dev controls, an empty side panel, and unlabeled sample data.

patterns/web-pages.md holds W1 to W4 the same way, plus the six-act note and a block catalog.

patterns/layout-moves.md holds the seven layout moves the same way, plus the removal test.

patterns/copy.md, system-pages.md, and motion.md are the other pattern files. A stage links at most one of them. The others are named in backticks so they do not enter the word budget.

### Templates and stages

scope.md has the page groups: Public, Auth, Onboarding, App core, Account, System (404 and 500), Legal (needs legal review), Email, Meta.

Stage 6 requires a status table and a label table in DESIGN.md. components.md lists the states. check-tokens.mjs is a real command.

tokens.css uses the spacing scale 0, 4, 8, 16, 24, 32, 40, 48, 64. Body pairs are at least 4.5:1. UI pairs are at least 3:1.

Stage 4's required-headings line now names scope.md. The heading test was reading system-pages.md, the last link on that line, and failing. That was a test miss, not a missing template.

### Blocks

17 HTML files in skills/shipright/blocks/. No GSAP, Three, or Lenis inside a block, so the installed skill still runs if those files are not on the path. The motion pattern records when a project should add them.

product-stage is a code stand-in you can turn. It does not load a glTF. pinned-scene steps named beats. It does not scrub a GSAP timeline.

app-motion-kit includes selection, a stepper, list add and remove, a toast, a skeleton, a dialog, a count, move-up reorder, a success line, and one error shake. The Playwright test drives Add visit and expects the word "added".

Each block has a header comment, data attributes, a reduced-motion still, and a shot at desktop and phone under blocks/shots/.

Fonts: blocks/fonts/inter-latin-400.woff2 and fraunces-latin-400.woff2, SIL OFL, with fonts.css. Blocks themselves use system-ui so a test does not request a missing file.

### Scripts

check-tokens.mjs fails bad contrast and off-scale spacing. The starter tokens.css passes.

consistency.mjs flags the same visible label on two backgrounds, a data-action word that misses the label table, a badge color that is not a token, and off-scale margin or gap inside data-measure. A missing page fails. It does not pass an empty document. The first URL joined a leading slash onto a host that already ended in a slash, so the checker was reading a 404 and calling it a pass. That is fixed.

run-tests.mjs writes test-report.md with Steps, Rounds, and Limits. The fixture home screen passes.

### Taste

skills/shipright/taste/altaz.md is opt-in. SKILL.md says to open it only when the owner asks. It is not a markdown link, so it is not loaded into every stage path.

personal-taste/altaz.md still contains the exact line the self-test mutates: `4, 8, 12, 16, 24, 32 and 48`. A new sentence says 12px is a kicker, not a gap.

### Left as approved

Spine, gate-ID tables, redirect stub, ChatGPT file list. dist/shipright-chatgpt.md is 3,754 words (it was 3,722). Stages 4 to 10, patterns, and blocks are in the zip only.

## Commands

python3 evals/check_context.py

PASS. tiktoken 0.12.0, cl100k_base. 101 files. Always shared 1,915. All shared 3,247. Largest normal paths stay under 12,000. ui-ux-design is 11,132. build-pack is 9,359.

python3 evals/check_sources.py

FAIL, same missing historical images as the attached zip. Diff against that baseline: 0 new errors. 6 old README errors stay gone.

python3 -m unittest discover -s tests

67 tests. 2 failures, 55 errors, before the stage 4 heading fix.

One failure was test_stage_required_headings_exist (stage 4 pointed at the wrong file). After the one-line fix, that test passed. The other failure is test_current_sources_pass. The 55 errors are test_historical_evidence_unchanged. Both are the image files left out of the zip. Those checks were not deleted. On the real repo, Phase 1 was 52 tests, OK.

After the heading fix and the motion-kit edit: tests.test_phase2 is 6 tests, OK, including blocks: pass 17. tests.test_release_skill matched a fresh dist build before the last motion-kit edit, then dist was rebuilt again.

python3 scripts/release_skill.py

dist/shipright.zip and dist/shipright-chatgpt.md rewritten. ChatGPT file: 3,754 words.

The 157-mutation self-test was not re-run. check_sources.py returns on the missing-image FAIL before --self-test. The personal-taste fixture string is still in the file.

## Pending for Altaz in Claude Code

- Smoke eval: Sonnet plus this 1.3 draft on c2 (dashboard), c5 (3D site), and c8 (improve an existing app). Three graders. Not run. No scores.
- Before and after shots of the same case, v1.2 against this draft. Not run. They wait on that smoke eval.
- Phase 1 baseline arms and the c1, c3, c7 smoke still pending from the Phase 1 gate.

## Phase 2 gate

Not a release. Stages 4 to 9, the patterns, the 17 blocks, and the three checkers are in the tree. Block tests pass. Smoke scores do not exist.

## Questions

1. Keep these 17 blocks as plain HTML, and load GSAP, ScrollTrigger, Lenis, or Three only when a project needs a scroll story or a real 3D object? Recommended: yes. product-stage is a stand-in, not a glTF loader.
2. Keep taste opt-in, keep the historical spacing sentence in personal-taste/altaz.md, and use 4, 8, 16, 24, 32, 40, 48, 64 for new gaps, with 12px only as a kicker? Recommended: yes.
3. Leave the ChatGPT file on the spine at 3,754 words, with stages 4 to 10 and the blocks only in the zip? Recommended: yes. This matches the Phase 1 answer. The file grew by 32 words because SKILL.md grew.

# Phase 2b log

Draft 1.3, not released. No merge, tag, release, or deploy. Phase 3 has not started.

Phase 2 answers, applied: app blocks stay plain HTML. Taste stays opt-in, with the historical spacing sentence kept and 12px only as a kicker. The ChatGPT file stays on the spine. Premium sites do not use the stand-in blocks.

## Plan

1. P2b.1 Three premium blocks. Each loads a pinned CDN build, and falls back when the CDN fails or motion is reduced.
2. P2b.2 Polish every block with the starter type, the spacing scale, and a balanced width. Retake shots at 390 and 1280.
3. P2b.3 Point stage 8, stage 5, the motion pattern, and the web pattern at those blocks for a premium or 3D site.

## What changed

### Premium blocks

`scroll-story` loads gsap@3.12.5, ScrollTrigger@3.12.5, and lenis@1.1.18 from jsDelivr. Lenis runs on a fine pointer only. A pinned section scrubs text and three images. Reduced motion, or a failed CDN, leaves the beats in normal flow.

`product-3d` loads three@0.169.0 and GLTFLoader from the same CDN. It draws `models/keel.glb` with studio lights, drag orbit, and a scroll that turns the body and lifts the cap. The model is original, CC0 1.0, and noted in `models/LICENSE.txt`. It is not a scan. Reduced motion, or a failed load, shows the poster in the block. The canvas uses preserveDrawingBuffer so a shot is not empty.

`page-transition` loads gsap@3.12.5 and moves from an index into a case. Without GSAP, or with reduced motion, the swap is instant. Both views are in the page.

### Polish

The other 17 blocks now use Inter and Fraunces from `fonts/fonts.css`, the 40px display line, a 12px kicker, spacing on 4, 8, 16, 24, 32, 40, 48, 64, and a 960px column. Sample pages are marked Demo data. The primary action uses the starter accent. Shots were retaken at 390 and 1280.

### Guidance

Stage 8 says a premium site, a scroll story, or a 3D product must copy the three new blocks, not product-stage, pinned-scene, or exploded-view. Stage 5 names the same files for the website stack. `patterns/motion.md` records the pins, the measured CDN sizes, and the CC0 model. `patterns/web-pages.md` adds the three blocks to the catalog. Those notes are in backticks where a second pattern link would break the one-pattern rule.

## Commands

python3 evals/check_context.py

PASS. Always shared 1,915. All shared 3,247. Largest normal path stays 11,132.

python3 evals/check_sources.py

0 new errors against the image-less zip baseline. 6 old README errors stay gone.

NODE_PATH=/workspace/node_modules node tests/blocks/test-blocks.mjs

blocks: pass 20.

python3 -m unittest tests.test_phase2 tests.test_v13_foundation.FoundationTests.test_stage_required_headings_exist

7 tests, OK. That includes the block run, token checks, and the stage heading check.

## Pending

Smoke eval on c2, c5, and c8 is still not run. No scores. Phase 3 has not started.

# Phase 3 log

Draft 1.3, not released. No merge, tag, release, or deploy. No pull request was opened.

Phase 2 is approved. The limits on this pass: do not launch Claude, do not invent a score, do not deploy, do not open the PR.

## Plan

1. P3.1 to P3.3. Prepare run folders and prompts for 8 cases times Sonnet, Opus, and Haiku, plus 2 hidden cases. Write a one-page run guide. Leave grading, the fix loop, and the variance check pending.
2. P3.3b. Case study and pitch deck templates. Guardrails in check-record.mjs. A sample case study from the c7 baseline only.
3. P3.4. Rebuild site/ on the 1.3 draft. Stage 9 tests. Screenshots at 390 and 1280.
4. P3.5. README, changelog, release notes. No 1.3 zip. People use the repo.
5. P3.6. PR title and body in docs/rebuild-1.3/PR.md. Altaz opens the PR.

## What changed

### Evals

`evals/v2/runs/release-1.3/` has 30 prompt files (10 cases, 3 arms) and a STATUS file in each run folder. Hidden cases are `h1-groomer` and `h2-ceramic` in `evals/v2/hidden-cases.json`. They are not in the frozen cases.json.

`evals/v2/results/release-1.3.md` says not graded. No score is written anywhere in that file.

`evals/v2/tools/prepare_release.py` builds the work folders Altaz's Claude Code sessions expect.

### Case study and pitch

Templates: `templates/case-study.md`, `templates/case-study.html`, `templates/pitch-deck.md`. Stage 9 names them in backticks so they do not enter the stage word path.

`check-record.mjs` now requires a date and a decider on every Approved row, a pain or decision id on every changelog row, real screenshot files, no new number in the case study, and no market or traction number without Verified, Assumed, or `[Add your real numbers]`.

The sample is `site/case-study.html` plus `site/record/`. It uses the owner review dates, the pain count 20, the keep count 3, and the before shots. It says the rebuild was not measured. No client name.

### Site

`site/` is a new page on the same Vite project. Self-hosted Inter and Fraunces. The hero is a pinned run (prompt, cards, You decide, stages, then two real baseline shots). The slider is the c6 owner screen against the baseline Sonnet shot, with the three owner requests as notes. The process list pins. The Keel model is the product-3d block. The case study link wipes, which is the page-transition block. Lenis runs on a fine pointer. GSAP ScrollTrigger does the pins.

Proof copy says "results coming". No 1.3 score is shown.

Stage 9 on the built pages: premium check-ui 0 fails and 0 warns on home and the case study, at 390 and 1280. run-tests 18 of 18. consistency pass. check-record pass. Shots are in `site/evidence/v1.3/`. vercel.json was not edited. Nothing was deployed.

Taste is Not verified.

## Commands

python3 evals/check_context.py

Recorded in the gate report after this log was written.

node skills/shipright/scripts/check-ui.mjs, run-tests.mjs, consistency.mjs, check-record.mjs

Results above. Not a grade of the skill.

## Pending

- Phase 2 smoke eval on c2, c5, and c8 is still not run. No scores.
- P3.1 grading. 3 blind graders. Not started. No scores.
- P3.2 fix loop. Not started. No grader sentences.
- P3.3 variance. Not started. The two closest cases are not known yet.
- Haiku scores. Not started. The prompts exist.
- Pain recall on c7. Not started. No 1.3 run.
- The win check. Not passed. Do not claim it.

## Phase 3 gate

Stopped here, as asked. The PR file is `docs/rebuild-1.3/PR.md`. Altaz opens it. The title that says the draft beats Opus is blocked until a real grade exists.



