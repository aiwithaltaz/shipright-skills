# ShipRight Phase 1 stronger evaluation protocol

Frozen before launching trials or reading any response. Date: 2026-10-09.

## Sources and design

Baseline commit b5e80000f3069e46dfd49005a0c83b05b5e94564.
Phase 1 commit 9ef5a8e523a242bf49c2d91d723826a4d56af5ac.
Five unchanged approved prompts. Three fresh trials per case per version: 30 responses.
Use fresh agent threads with no inherited conversation, rubric, expected answer or version label.
No model overrides; exact serving model ID/seed unavailable unless exposed by runtime.
Each trial gets a separate neutral directory containing only the frozen skills tree.
No browsing, external actions, unrelated filesystem reads or implementation. Output-file writes only.
The same wrapper requests an answer plus an unedited response record and consulted paths.
Do not change skill sources, retries or criteria based on results. Operational failures retained;
any replacement trial must be disclosed separately and not substituted for a weak answer.

## Scoring frozen in advance

Each case has four outcome criteria, 0–2 each. Maximum 8 points per response.
0 = absent, unusable, or substantively wrong; 1 = usable in part, material gap;
2 = decision-useful and executable within supplied constraints.
Judge consequences and usefulness, not vocabulary, preferred labels, verbosity or style.
Equivalent defensible methods/categories earn equal credit; asking bounded material questions
is allowed, but questions alone do not replace the requested deliverable.

Shared critical failures: invented research/findings/rates; treating plans or simulations as
completed research; unauthorized external actions; scope expansion presented as approved;
claiming statistical/usability/accessibility validation unsupported by this setup.
Case-specific critical failures are listed below. A critical failure caps the response total
at 4/8 (keep uncapped criterion sum too). A useful pass requires >=6/8, no 0 criterion,
and no critical failure. Report raw totals, capped totals, useful passes and failures.

Each version maximum: 15 responses x 8 = 120. Report score out of 120 and percent.
Do not call this percentage overall UX quality or a population success estimate.

## E01: implicit research triage

Prompt: Our approved onboarding collects company details before showing value. Completion is falling. The CEO thinks users dislike the form and wants fewer fields. Recommend our next step within the existing scope.

Criteria:
1. Does not adopt CEO explanation as a demonstrated cause; offers a testable explanation with alternatives.
2. Checks completion definition, denominator/time window/version or instrumentation quality before trusting the trend; treats missing data as missing.
3. Offers a small, feasible current-flow investigation that can inform whether fields should change (observation and/or appropriately bounded existing evidence).
4. Gives an actionable next step and a decision/stopping rule within approved onboarding scope without committing to an unsupported redesign.
Critical: claims CEO cause proven; commits to removing fields as an evidence-based fix without checking their purpose/evidence; promises completion lift.

## E02: choose a feasible method

Prompt: We need to know which of two onboarding versions produces higher completion. We have 12 active users per week and one afternoon. The founder suggests testing five people and declaring the winner. Recommend a feasible plan.

Criteria:
1. Explains that a small convenience usability study cannot reliably establish a completion-rate winner and avoids universal five-person proof.
2. Provides an afternoon plan that yields useful diagnostic evidence; artifacts/participants available only if confirmed; no impossible statistically conclusive plan.
3. Makes comparison fair enough for its limited purpose: equivalent task/success, relevant participants, and addresses learning/order effects if participants see both versions.
4. Specifies honest provisional decision/stopping criteria and what additional traffic/instrumentation/statistical planning would be needed for a rate claim.
Critical: declares statistical winner from five people or 12 weekly users without an adequate plan; conflates reported preference with higher completion.

## E03: repair biased guide

Prompt: Improve this interview guide for our proposed freelancer invoice tool: 'Would you use our faster app?' 'How frustrating is your current process?' 'Would automated reminders help?' We only have approval to explore invoice creation and download.

Criteria:
1. Produces an actual neutral replacement guide about recent real work, including a concrete task/context prompt.
2. Avoids faster/frustrating assumptions, sales and speculative future intention as demand proof; probes what happened rather than flattering the solution.
3. Removes reminders from approved exploration and remains within invoice creation/download; allows useful current alternatives without adding features.
4. Explains how to use answers honestly: reports versus observed work, optional privacy-safe demonstration/artifact only with consent/access, and no validation claim.
Critical: treats positive future-intent answers as demonstrated demand; retains leading framing as primary questions; presents reminders as approved scope.

## E04: operational completion categories

Prompt: Write a short download-study protocol and outcome table. Demonstrate how it handles four fictional examples: someone independently downloads and reopens the file; someone only finds it after 'show where you would open it'; someone needs directional help; someone cannot start because the test account fails.

Criteria:
1. Protocol establishes independent behavior before verification/help; task wording avoids naming route/control; success concerns correct usable file rather than tap/message alone.
2. Protocol and table consistently distinguish independent completion from prompted verification and directional assistance. Separate labels or explicit flags/subcategories acceptable; no required magic wording.
3. Correctly maps all four fictional examples including setup failure as not assessed/environment issue, not demonstrated product task failure.
4. Gives minimal runnable observation record and uncertainty handling: time/order of prompt, help and outcome; fictional examples not session findings; appropriate stop/withdrawal/setup handling.
Critical: counts prompted verification or directional help as independent completion; treats setup inability as observed product usability failure; presents fictional examples as real findings.

## E05: impossible coverage claim

Prompt: We can run four desktop sessions tomorrow. Our product is mainly used on phones, including by screen-reader users. Give us a lightweight study plan and explain what we can honestly conclude before launch.

Criteria:
1. Offers a feasible, useful four-desktop-session plan for tomorrow with relevant task/success/observation and prerequisites.
2. Bounds conclusions to observed desktop/task/sample/version contexts; no population or mobile generalization.
3. Keeps mobile and assistive-technology coverage unverified unless actually included; expert review and desktop tests are not substitutes for mobile user evidence/accessibility certification.
4. Names smallest relevant additional mobile/assistive-technology checks and a proportionate conditional launch decision; no invented blanket release rule or impossible recruitment guarantee.
Critical: claims overall/mobile usability or accessibility readiness from desktop-only sessions; hides untested access groups; claims four sessions proves representative completion.

## Blind scoring and reporting

After all outputs are frozen, randomize the six responses within each case into opaque IDs.
Separate fresh graders get only this rubric, raw case prompt, and anonymous response text.
They receive no source paths, version labels, trial-agent IDs, mapping, prior results or skill files.
Require criterion points, specific response evidence, critical failures, uncapped/capped totals,
and useful-pass outcome for every response. Do not modify scoring after unblinding to favor a version.
Parent checks arithmetic and rubric consistency; preserve original grader output and disclose any correction.
No score should award checklist words without an actionable outcome.
This small single-configuration evaluation supports a scoped comparison, not proof of usability
improvement, causal skill attribution, generalization, or a guaranteed merge decision.
