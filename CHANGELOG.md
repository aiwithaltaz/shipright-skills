# Changelog

All notable changes to this pack will be documented in this file.

Format based on Keep a Changelog. Versioning follows SemVer.

**Status:** Public draft. Historical notes below describe their time.
**Product name:** **ShipRight** (locked).

## [0.5.0-draft] - 2026-10-04 - doc set, decision cards, premises, DESIGN.md, slop counts

### Added

- **Doc set** mode in product-design. It drafts the five docs one at a time, stops for a yes, marks unknown facts as `UNKNOWN - owner`, and does not overwrite Approved sections. See `skills/product-design/references/doc-set.md` and `docs/README.md`.
- Decision cards in shared intake. Each card has a question, why it matters, options with examples, a pick, and **You decide** / **Let me decide**.
- A progress line and one "In plain words" line in the shared output shape. A writing floor: short sentences, active voice, keep not / never / no / only.
- Frame product now checks premises, names the narrowest first version, and offers Small, Full, and Different. It stops before screen jobs.
- Optional **Plan review** in ux-critique. It scores Product, Design, and Build from 0 to 10.
- DESIGN.md and PRODUCT.md import and export. Guide: `docs/06-design-md.md`. Imported values are Observed plus a source. Brand files are inspiration only. Preserve mode lists what never changes silently.
- A countable slop catalog and UI copy rules. Count block, five common default looks, banned filler, a portability test, and Detect mode that quotes the line. Visual tells stay evidence. Only integrity problems auto-fail.
- Dry-run stress notes in `evals/change-set-4/`. This is not a live model trial.

### Changed

- Skill files no longer use em dashes.
- Catalog, pack map, README, and current-version lines now say **0.5.0-draft**.
- The source checker also requires links to `doc-set.md`, `ui-copy.md`, and `plan-review.md`.
- The 8 / 10 / 10 check IDs are unchanged. No new skill, hook, CLI, or bundled detector.

### Validation

- `python3 evals/check_sources.py` checks source shape only.
- `evals/change-set-4/results.md` is a careful dry-run of the written instructions. It is not a live three-arm eval.

## [0.4.1-draft] — 2026-09-25 — optional personal design profile

### Added

- `personal-taste/altaz.md` captures the owner's reusable preferences: simple organized screens, restrained branding, little repetition, discoverable help, useful summaries, clear progress/exits, consistency and an 8-point layout default.
- Selection and installation guidance explains how to reuse the profile across projects and sessions.

### Changed

- UI/UX profile loading is explicitly selected by the user or project instructions. Bundled profiles do not automatically impose the owner's taste on every user.
- Current instructions and approved project systems take precedence, including a different spacing scale. IVC-specific business rules remain outside the profile.
- Catalog, pack map and current-version metadata updated; three skills and 8/10/10 checks retained.

### Validation

- Pack source and skill-frontmatter checks; review of profile selection, existing-system precedence and linked files. No new model trial or application change is claimed for this focused documentation update.

## [0.4.0-draft] — 2026-09-25 — operational flows and field feedback

### Added

- Optional references for alternate lookup/entry, related-person setup, prerequisite resolution, direct pending-work recovery and explicit cash allocation.
- Operator-workspace guidance for useful summaries, contextual help, object-level progress and audit detail.
- Feedback-to-requirement-to-regression workflow; distinguish implementation conformance from completeness of the specification.
- IVC 2026 field example with its original runnable fake-data prototype and evidence, revised brief, owner feedback, reusable lessons and tool-neutral training candidates.
- Focused behavior trials and source validation under `evals/change-set-3/`.

### Changed

- Shared intake asks agents to reason about material edge cases before sending policy questions to the owner; existing requirements can already establish the frame.
- Existing 8/10/10 gates now explicitly cover applicable entry/return variants and evidence limits. No new skill, gate count, backend or paid dependency.
- PRD and frontend templates can record entry conditions, preserved work, per-person progress and visible/reference content.
- Historical IVC passes are labeled as evidence for the original specification, not validation of the owner's revised requirements. The live prototype is unchanged by this documentation/skill update.

### Validation limits

- Source/frontmatter checks and recorded behavior trials are evidence for this draft only; see the evaluation results for exact scope.
- Training candidates are authored examples, not a training run. Compatibility with the owner's intended Soup repository is not established until that repository is identified.

## [0.3.0-draft] — 2026-09-23 — idea to build handoff

### Added

- **Frame product** mode in product-design: outcome → differentiating system → core objects & lifecycle → journey → screen jobs, before flows or gates. A feature list is challenged until there is a real mechanism.
- **Depth** in shared intake (Quick fix, Focused improvement, New surface, New product). Depth sizes questions, optional research and review output.
- Optional references, loaded only when depth or task calls for them:
  - `product-design/references/opportunity-research.md` — sourced, labeled, never scope by itself
  - `ui-ux-design/references/references-and-design-system.md` — reference borrow/reject and design-system direction (Preserve or Establish)
  - `ui-ux-design/references/build-handoff.md` — rules block + one prompt per screen for Claude Design, Figma, Cursor, Claude Code, Codex, Antigravity and VS Code agents
  - `ux-critique/references/bounded-verification.md` — desktop + mobile screenshot check, max 2 fix passes
- PRD sections for outcome, differentiating system, core objects and a decision log; screen-job and objects columns in the frontend spec.
- Optional product-audit block in ux-critique (top 3 problems, what's working, root cause, patch or rethink).
- Example `examples/idea-to-screen-jobs/`.
- Short inline core rules in each SKILL.md for installs where `_shared` is missing.

### Changed

- A failure on a stage-critical requirement is always a **Blocker** (no more "Major, but critical").
- New verdict **Needs decision (D#)** when only the user's own open decisions block readiness.
- Answers lead with the verdict and next action; gate tables appear only at handoff or when readiness is requested.
- Builder handoffs list Proposed items under "Needs approval before build".
- Install instructions link `_shared` alongside the skills; AGENTS.md is no longer copied into apps.
- Positioning: precise "Related packs" table (Taste Skill, Hallmark, UI UX Pro Max, Impeccable) instead of "UI-only packs skip product process".
- "Locked/mandatory" template wording replaced with "approved/recorded"; missing docs never block drafting.
- Personal-taste folder made generic for public use.
- Sample example findings relabeled as Blockers; check attribution corrected.

### Validation

- See `evals/change-set-2/`. Single fresh-context runs; instruction-following evidence, not a reliability rate or runtime test.

## [0.2.2-draft] — 2026-09-23 — decision ownership and review evidence (PR #1, merged as a6ae2a1)

### Changed

- Separate delegated choices, user-reserved choices and unanswered questions; preserve latest scoped corrections.
- Apply one shared evidence contract: Pass, Fail, Not verified and justified Not applicable, tied to review stage and artifact version.
- Remove pass-by-ticket/owner/fix-plan rules and taste exceptions for fabricated proof or inaccessible critical controls.
- Correct fictional examples and narrow claims to evidence actually supplied.
- Keep the existing three specialists and 8/10/10 check IDs. No new workflow, dependency, installer or application implementation.

### Validation

- Targeted source checks and task-local behavioral trials are recorded with this change set. These do not certify client installation or production behavior.

## [0.2.1-draft candidate] — historical rename-only

### Changed

- **Name locked: ProductCraft → ShipRight** everywhere in the pack
- Removed “Working name — Altaz may rename” / provisional language
- Suggested repo names: `shipright` or `shipright-skills`
- Anti-slop remains capability/feature language only (not the product name)
- Tagline unchanged: **Context before generate. Product before pixels.**

### Notes

- Still **DRAFT**. Still **no GitHub publish**. Still **no commit** until Altaz says yes.
- Content otherwise same as 0.2.0-draft (rename-only pass).

## [0.2.0-draft] — 2026-09-20

### Added

- **Working brand: ProductCraft** (provisional at the time; later locked as **ShipRight** — see 0.2.1-draft)
- Tagline everywhere it helps: **Context before generate. Product before pixels.**
- Countable Pass/Fail gates (not vibes):
  - product-design: **8-check decision gate**
  - ui-ux-design: **10-gate pre-flight**
  - ux-critique: **10-gate ship audit**
- Killer README: gap vs UI-only packs (Taste / Hallmark / Pro Max), text workflow diagram, copy-paste install for Claude Code / Cursor / Codex, universal SKILL.md note
- Demo expansion: `examples/sample-saas-onboarding/` before/after narrative + `sample-skill-outputs.md`
- Clearer **you decide / let me decide** behavior table in shared intake

### Changed

- User-facing titles: “Anti-Slop Product Design Skill Pack” → **ProductCraft** (working); anti-slop kept as capability language
- README, architecture, AGENTS, skills catalog, personal-taste, docs templates rebranded
- All three skills bumped to pack **0.2.0-draft** with gate sections
- References deepened (named slop tells, pre-generate lock, decision-gate pointer)

### Notes

- Still **DRAFT**. Still **no GitHub publish**. Still **no commit** until Altaz approves.
- Open at the time: final name, personal-taste `.skill` files, publish yes.
- Suggested repo names (later locked): `shipright` or `shipright-skills`.

## [0.1.1-draft] — 2026-09-20

### Added

- Light intake pattern: `skills/_shared/intake.md` (3–5 questions, examples + “you decide / let me decide”)
- INTAKE section near the top of all three skills (`product-design`, `ui-ux-design`, `ux-critique`)
- `personal-taste/` stub + README for future Altaz `.skill` / preference overlays (do not block drafts)
- Taste Skill–inspired pieces in `ui-ux-design`: brief inference, design dials (VARIANCE / MOTION / DENSITY), hard pre-flight gate, anti purple SaaS language
- Dual quality bar callouts in README / architecture (Taste Skill philosophy + UI UX Pro Max depth)

### Changed

- README, architecture.md, skills.md, AGENTS.md updated for intake + personal-taste + dual quality bar
- Skill pack versions marked `0.1.1-draft`
- Refuse-to-invent clarified: still required for empty docs; light intake fills partial gaps only

### Notes

- Still DRAFT. Still **no GitHub publish**. Still **no commit** until Altaz approves.
- Personal taste files from Claude / Cursor / ChatGPT are pending — hooks only.

## [0.1.0] — 2026-09-20

### Added

- Root pack files: README, architecture.md, AGENTS.md, skills.md, LICENSE, CHANGELOG
- Before-build doc templates (`docs/01`–`05`): PRD, Technical Architecture, Security & Access, Frontend Spec, Feature Ticket List
- Skill `product-design` with references for states/flows and decision checklist
- Skill `ui-ux-design` with references for layout, state coverage, and anti-slop rules
- Skill `ux-critique` with references for slop tells and severity rubric
- Example: sample SaaS onboarding (README + filled PRD excerpt)

### Notes

- Draft for Altaz review. Pack name and Altaz’s existing Claude/Codex UX skill files still open.
- No GitHub publish until Altaz approves.
