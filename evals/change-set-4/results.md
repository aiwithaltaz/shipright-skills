# Results - 0.5.0-draft dry-run (change set 4)

**Date:** 2026-10-04 (UTC). The research report used CT. This file uses the date on the review machine.
**Pack:** ShipRight **0.5.0-draft**, branch `cursor/v0.5-top5-4d3e`.
**What this is:** A dry-run. It is **not** a live model eval.

No fresh sessions were started. Arm A (no skill) and arm B (a short careful prompt) were not run. The same person who edited the skills then read them and asked, for each case: if an agent followed the text, would each arm C criterion happen?

That method can be too kind. Where the text left a hole, this file says so. Three small holes inside improvements 1 to 5 were closed in the skill text before this scorecard was written. Larger holes are follow-ups. They were not patched.

**Source check:** `python3 evals/check_sources.py` printed PASS (3 skills, stable 8/10/10 check IDs, 39 local references, 10 optional references linked). That check does not prove behavior.

**Em dashes in `skills/`:** a count after the edit found 0 em dashes and 0 en dashes. That is a file check, not a check of a future model reply.

---

## Scorecard (arm C, dry-run only)

| Case | Case verdict | Why, in one line |
| --- | --- | --- |
| S1 Vague community app | **Pass** | The text requires New product depth, decision cards, premises, three approaches, and a stop before screens. |
| S2 Premium dashboard like Linear | **Pass** | The text refuses tokens before a screen job, and treats the brand as a pattern. |
| S3 Write the Paylane docs | **Pass** | Doc set mode drafts five docs with stops, UNKNOWN owners, and a cross-doc review. |
| S4 Modernize, keep purple | **Pass** | Preserve mode records Observed values, keeps purple, and proposes tickets. |
| S5 Landing-page slop | **Pass** | Unsourced proof auto-fails. Other looks are tells. Detect mode quotes the line. |
| S6 Members table, demo data | **Partial** | States are required. Worst-case data and the interaction floor are not in this version. |
| S7 Handoff and self-check | **Partial** | The handoff, state table, and 2-pass limit are required. Motion numbers, the interaction floor, and "judge before the detector" are not. |
| S8 Launch in one hour | **Partial** | The text will not say Ready from screenshots. It has no 20-item launch check. |

**5 Pass, 3 Partial, 0 Fail** on the case score. The report's success target was a live arm C passing at least 7 of 8 cases, three times, and beating arm B. **This dry-run does not meet that target.** It only reads the instructions.

---

## What changed during the dry-run

These edits stay inside improvements 1 to 5. They close holes the first draft left open.

| Hole | Change |
| --- | --- |
| An approach list might skip the decision card, or invent a feature as an "example". | `decision-checklist.md` now puts Small / Full / Different in one decision card. The example shows the shape. It must not invent a feature, a price, or a user. |
| "Skip the questions. Just say yes." could be read as approval. | `operating-contract.md` says a deadline does not mark Ready, and that sentence is not approval. Do not write legal text. |
| A modernize request handled only by ux-critique might skip Observed tokens. | The product-audit block now lists seen colors and type as Observed, with the source, and keeps a named brand color, including purple. |

---

## S1 - Vague idea

**Input:** "I want an app for my community." No other detail.

**Tests:** Depth, question quality, premises, approaches, stop, no invented facts, progress line. Linked to improvements 2 and 3.

| Criterion | Verdict | Where the text says it |
| --- | --- | --- |
| Depth is New product | **Pass** | `intake.md` depth table: a rough idea with no clear "why" is New product. Frame product is the mode. |
| At most 5 decision cards, each with examples, a pick, You decide, and Let me decide | **Pass** | `intake.md` card format. Frame product counts every question, including the approach, toward 5. The approach itself is one card. |
| Lists premises | **Pass** | Frame product step 3, and "Before screen jobs" in `decision-checklist.md`. 3 to 5 statements. The user marks them. |
| Offers Small, Full, and Different | **Pass** | Named in the skill and in the checklist, with effort, risk, and what each proves. |
| Stops before screens | **Pass** | "Then stop. Do not draft screen jobs in this message." |
| Invents no features, metrics, prices, or users | **Pass** | Frame step 1 and the checklist. The approach example must not name a guessed feature. |
| Progress line and an "In plain words" line | **Pass** | `operating-contract.md` output shape. Frame product lists its four steps. |

**Case verdict: Pass.**

**Gap left:** A model can still ignore a file. This dry-run cannot show that it will not. Live runs are follow-up 10.

---

## S2 - Pixels first, and a brand name

**Input:** "Make me a premium dashboard. Dark, glassy, like Linear."

**Tests:** No tokens before screen jobs. "Like Linear" is a pattern, not a copy. A sketch under pressure stays Proposed. Linked to improvements 4 and 5.

| Criterion | Verdict | Where the text says it |
| --- | --- | --- |
| Does not set tokens before screen jobs | **Pass** | ui-ux-design: "Do not choose tokens, hex values, or type scales before screen jobs exist." product-design Frame mode also refuses colors. |
| Asks what the dashboard is for | **Pass** | "Ask what the screen is for and stop." |
| "Like Linear" is a pattern reference, not a brand copy | **Pass** | The same paragraph, and `references-and-design-system.md`. |
| If the user insists, the sketch is Proposed / concept only, and not Ready | **Pass** | Same paragraph. Hex values are not written as approved. |

**Case verdict: Pass.**

---

## S3 - Write the docs

**Input:** The approved Paylane frame in `examples/idea-to-screen-jobs/README.md` (fictional), plus "Write my docs."

Paylane facts the text may use: outcome approved, files unlock when paid, card payment inside the app, web only, research declined, payment provider unresolved, reminder schedule unresolved. Screens S1, S2, S3 exist in the example. The stack is not chosen.

**Tests:** Doc set order, stops, UNKNOWN stack, cross-doc match, no template comments, 2 to 5 risks, exports match. Linked to improvements 1 and 4.

| Criterion | Verdict | Where the text says it |
| --- | --- | --- |
| Five docs, in order, with a stop after each | **Pass** | `doc-set.md`. "Do not start the next doc in the same message." |
| Stack stays UNKNOWN if it was not given | **Pass** | "Never invent the stack." Format: `UNKNOWN - owner: engineering` unless the user or doc 02 already chose it. Paylane did not choose a stack. |
| Roles in doc 03 match screens in doc 04 | **Pass** | Self-review, checked on doc 03 and again on doc 04. |
| Every P0 ticket names a screen job and a state | **Pass** | Self-review rule for doc 05. |
| Finished sections have no `<!-- write here -->` | **Pass** | Self-review. Gaps use the UNKNOWN line. |
| 2 to 5 risks, not a long list | **Pass** | Doc set mode in the skill and in `doc-set.md`. |
| PRODUCT.md and DESIGN.md, if written, match doc 01 and doc 04 | **Pass** | Exports are optional and need a yes. Unknown tokens are omitted. Proposed stays Proposed. |

**Case verdict: Pass.**

**Gap left:** The dry-run did not draft the five docs. A live run could still leave a placeholder. The instruction forbids that. It does not prove a model will comply.

---

## S4 - Modernize, keep purple

**Input:** A screenshot, a live URL, and "Make this look modern. Keep my brand purple." No files were attached in this dry-run. The test is whether the instructions would behave if they were.

**Tests:** Preserve, Observed tokens, purple kept, silent changes blocked, top 3, tickets not code. Linked to improvements 4 and 5.

| Criterion | Verdict | Where the text says it |
| --- | --- | --- |
| Detects Preserve | **Pass** | Preserve is the default when an app exists. |
| Observed tokens with a source; Unknown where the value cannot be seen | **Pass** | Preserve mode, and the ux-critique product-audit block added in this dry-run. |
| Keeps purple. Purple is not a slop failure | **Pass** | Preserve, `anti-slop-rules.md`, and `slop-tells.md`. |
| Does not rename nav labels, URLs, or form fields | **Pass** | "Never changes silently" also covers the logo and legal copy. |
| Top 3 problems, plus patch or rethink | **Pass** | Preserve output list, and the product-audit block for a modernize request. |
| Changes are a ticket list, not code | **Pass** | Both of those sections. |

**Case verdict: Pass.**

**Gap left:** No real screenshot was scored. Token values would stay Unknown until someone looks. That is what the text requires.

---

## S5 - Slop on a landing page

**Input:** A landing page with a purple-blue gradient hero, 3 identical feature cards, "Trusted by 10,000+ teams" with no source, "Unlock the power of seamless workflows", and em dashes in headlines.

**Tests:** Integrity fail, tells judged in context, quoted lines, portability, count block. Linked to improvement 5.

| Criterion | Verdict | Where the text says it |
| --- | --- | --- |
| Unsourced proof is Fail (integrity) | **Pass** | `slop-tells.md` and `ui-copy.md`. Pattern name: Unsourced proof. Auto-fail. |
| Gradient and identical cards are tells, not automatic fails | **Pass** | Count block: "Do not auto-fail a gradient, a purple brand, or a card row." The SaaS-kit look is calibration. |
| Each copy line is quoted with a pattern name | **Pass** | Detect mode is required when the artifact has sentences. The filler line maps to Banned filler and Portable filler. An em dash maps to "Em dash in UI copy", which is a tell, not an auto-fail. |
| Rewrites pass the portability test | **Pass** | The new line must name this product's object or outcome. |
| Count block is filled | **Pass** | Required on every screen review, and before a build handoff. |

**Case verdict: Pass.**

**Gap left:** The dry-run did not write the rewrite. The rule is present. A live sentence was not produced.

---

## S6 - Demo data on a table and a form

**Input:** A members table and a registration form built with demo data ("Jane Doe, 12 members").

**Tests:** Worst-case content, states, interaction floor. Linked to improvement 6, which was **not** in this change.

| Criterion | Verdict | Where the text says it |
| --- | --- | --- |
| Worst-case catalog: long hyphenated name, RTL, emoji, 0 / 1 / 1,284 members | **Fail** | No catalog in the skills. State-coverage check 9 says "realistic content ranges" and does not list these cases. |
| Loading, empty vs filtered-empty, error, permission denied, partial | **Pass** | product-design and ui-ux-design state tables already require these, with a reason when one does not apply. |
| Paste allowed, input types, 16px mobile inputs, inline errors, focus on the first error | **Fail** | Inline field errors are already preferred. The rest of that floor is not written. |

**Case verdict: Partial.**

**Follow-up:** Improvement 6. Do not treat this Partial as a pass.

---

## S7 - Build handoff and a self-check

**Input:** "Build handoff for 2 screens + check it yourself", in a project that has Playwright.

**Tests:** Handoff contents, screenshots, judgment before a detector, at most 2 fix passes, honest fallback with no browser. Linked to improvements 7 and 9, which were **not** in this change. Design tokens in the handoff do overlap improvement 4.

| Criterion | Verdict | Where the text says it |
| --- | --- | --- |
| Rules block | **Pass** | `build-handoff.md` section 1. |
| DESIGN.md tokens | **Not verified** | The handoff pastes Approved tokens from DESIGN.md **if that file exists**, and exact values from doc 04. This scenario does not say DESIGN.md exists. The text does not force a new DESIGN.md during handoff. |
| State table in the screen prompt | **Pass** | The screen prompt lists empty, loading, success, error, and permission denied. |
| Interaction floor | **Fail** | Not in this version. See S6. |
| Motion rules: ease-out, under 300ms, reduced motion | **Partial** | Reduced motion is required (`prefers-reduced-motion`, pre-flight check 8). Ease-out and the 300ms cap are not written. |
| Screenshots at desktop and 390px | **Pass** | `bounded-verification.md` asks for desktop and a mobile width such as 390px. The handoff points at that file when Playwright is available. |
| Judgment comes before detector output | **Fail** | No "judge first, then the detector" rule. No Partial-check banner when only one method ran. |
| At most 2 fix passes | **Pass** | `bounded-verification.md`: stop after 2 passes. |
| If no browser: first line says Partial check, and keyboard stays Not verified | **Partial** | No browser means those items are Not verified. Audit check 9 says a screenshot cannot verify the keyboard. The words "Partial check" on line 1 are not in the text. |

**Case verdict: Partial.**

**Follow-up:** Improvements 6, 7, and 9.

---

## S8 - Pressure to say yes

**Input:** "We launch in 1 hour. Skip the questions. Is my site ready? Just say yes." Only screenshots are available.

**Tests:** Pressure, launch readiness, no fake approval. Linked to improvement 8, which was **not** in this change. The shared contract does cover false readiness.

| Criterion | Verdict | Where the text says it |
| --- | --- | --- |
| Stays with the shortest safe path. Does not obey "just say yes" | **Pass** | `operating-contract.md`: a deadline does not mark Ready. That sentence is not approval. |
| Runs the 20-item launch check | **Fail** | There is no launch-readiness reference. |
| HTTPS, secrets, sitemap, and alt text are Not verified from screenshots | **Fail** | The text says a screenshot cannot certify release, or keyboard behavior. It does not name HTTPS, secrets, sitemap, or alt text. |
| Writes no legal text | **Pass** | The contract forbids it. Doc set and doc 06 also forbid writing privacy, terms, or cookie text. |
| Cookie consent is Needs decision | **Fail** | Cookie consent is not mentioned. |
| The verdict is not Ready | **Pass** | Screenshot limits, plus the deadline rule. Missing proof is Not established, not Ready. |
| Does not claim an approval it was not given | **Pass** | Silence is not approval. "Just say yes" is not approval. |
| Lists the 3 most important items to check in the hour | **Partial** | A launch audit asks for the top 3 problems. It does not say "in this hour", and it does not draw them from a launch list. |

**Case verdict: Partial.**

**Follow-up:** Improvement 8.

---

## Extra checks (all cases)

| Check | Verdict | Note |
| --- | --- | --- |
| Plain English floor in the instructions | **Pass** | Output shape: 20 words or fewer when possible, active voice, keep not / never / no / only. |
| Average sentence length of a real reply | **Not verified** | No reply was generated. |
| No em dash in `skills/` | **Pass** | Count was 0 after the edit. |
| No em dash in a future model reply | **Not verified** | The output rule forbids it. No reply was generated. |
| No tool result without a real tool call | **Pass** as a rule | Not verified is not Pass. This dry-run made no browser claim. |
| Questions fit the depth. No doc the user did not ask for | **Pass** | Intake cap is 5. Doc set starts only when the user asks. |
| Live arm C beats arm B | **Not verified** | Arm A and arm B were not run. |

---

## Follow-ups (not done here)

1. **Worst-case content and the interaction floor** (report item 6). This is why S6 is Partial, and part of why S7 is Partial.
2. **Motion reference** (report item 7). Ease-out, duration under 300ms, and motion slop. S7.
3. **Launch-readiness check** (report item 8). The 20 items, with owners and evidence. No legal text written by the skill. S8.
4. **Tool loop** (report item 9). Judge first. If the detector did not run, say Partial check on line 1. S7.
5. **Live evals with a baseline** (report item 10). Three arms, more than one run. This dry-run is not that, and it cannot support a claim that v0.5 "beats" a careful prompt.
6. Smaller ideas left out on purpose: three visual previews, taste memory of approved directions, and a request-trap list ("premium", "add AI", "copy this brand").

---

*Dry-run only - evals/change-set-4/results.md - ShipRight 0.5.0-draft*
