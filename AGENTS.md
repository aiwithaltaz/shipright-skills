# AGENTS.md — Rules for AI working in this pack

**Pack:** **ShipRight** (name locked)  
**Status: Public draft (v0.5.0-draft).**
**Tagline:** Context before generate. Product before pixels.

These rules apply when an agent edits this skill-pack repo. The reusable product is the content under `skills/` and `docs/`. Do not copy this file into an end-user's app; the skills carry their own usage rules.

## Scope

- This file governs **this pack**, not the end-user’s application codebase.
- Prefer editing `SKILL.md` + `references/` + `docs/` templates. Do not maintain three divergent skill trees for Claude, Cursor, and Codex.

## Doc map

| File | Read when |
|------|-----------|
| `README.md` | Install, pitch, gap vs UI-only, example prompts |
| `architecture.md` | Folder ownership and loading order |
| `skills.md` | Which skill to run |
| `docs/01`–`05` | Optional templates for recording context and decisions; equivalent project sources are valid |
| `docs/06-design-md.md` | DESIGN.md and PRODUCT.md import and export |
| `skills/_shared/intake.md` | Decision ownership and focused intake |
| `skills/_shared/operating-contract.md` | Authority, evidence statuses and readiness |
| `skills/*/SKILL.md` | When that skill activates |
| `skills/*/references/` | Only as needed |
| `personal-taste/` | Optional overlays when files exist (do not block drafts) |
| `examples/` | Idea-to-screen-jobs walkthrough; fictional specification and evidence-limited sample reviews |

## Hard rules — Do

- [ ] Use relevant existing context; help draft missing sections without inventing facts or approvals
- [ ] Missing context blocks only the affected commitment; apply the shared operating contract
- [ ] Use shared intake: zero questions is valid; distinguish delegation, reserved choice and unresolved answers
- [ ] Follow workflow: context → light intake (depth stated) → product-design (Frame product when no approved outcome) → ui-ux-design → specification critique → build handoff → build → critique and verify the actual result
- [ ] Use countable gates at handoff or when readiness is requested: product-design **8-check decision gate**, ui-ux-design **10-check pre-flight**, ux-critique **10-check audit**. Do not add gate tables to Quick fixes or Frame product drafts
- [ ] Cover applicable states; use justified Not applicable rather than inventing behavior
- [ ] For ui-ux-design: one-line design read, optional useful dials, stage-specific 10-check pre-flight
- [ ] Personal taste can guide visual defaults, never override integrity requirements or approved project decisions
- [ ] Keep each `SKILL.md` lean; put long tables and checklists in `references/`
- [ ] Write simple, clear English (ESL-friendly). Short sentences. Define jargon in one line.
- [ ] Mark invented assumptions as **ASSUMPTION** and prefer asking over guessing
- [ ] Update `skills.md` and `CHANGELOG.md` when adding or changing a skill
- [ ] Keep user-facing brand as **ShipRight**; use “anti-slop” as capability language only (never as the product name)

## Hard rules — Don’t

- [ ] Do not invent facts or treat proposed features, navigation, roles or APIs as approved
- [ ] Do not dump huge questionnaires — intake stays 0–5 questions when needed
- [ ] Do not claim research, interviews, or metrics without listed sources
- [ ] Do not use dark patterns (sneaky opt-outs, fake scarcity, hidden fees)
- [ ] Do not invent fake user quotes in critiques
- [ ] Do not paste the same skill body into `.claude/`, `.cursor/`, and `.agents/` as separate sources of truth
- [ ] Do not make critical controls rely on color or hover alone; judge icon meaning and accessible labels
- [ ] Do not default to generic purple SaaS / mesh blob UI
- [ ] Do not block draft work waiting for personal-taste files
- [ ] Do not run research on Quick fix or Focused improvement work, and never without the user's agreement
- [ ] Do not bundle or copy other skill packs' text or files; name them as related packs
- [ ] Do not push, merge, tag or release without explicit maintainer approval
- [ ] Do not rename **ShipRight** without maintainer approval; keep anti-slop as capability language only

## Writing style for this pack

- Practical. Complete sentences. No hype words such as revolutionary, seamless, or delightful.
- Short sentences. Prefer 20 words or fewer. Use active voice.
- Keep the words not, never, no, and only. Dropping one of them changes the rule.
- Use a period, a colon, or a hyphen. Do not use an em dash in skill files or in skill output.
- Prefer checklists, tables, and concrete examples over abstract theory.
- Every skill description must start with **"Use this when"** (or include that phrase clearly) and name trigger tasks.
- Define a specialist term the first time you use it. Example: Proposed means a suggestion, not a decision.
- Keep the `-draft` version suffix until the maintainer approves a stable release.
- Tagline when useful: **Context before generate. Product before pixels.**

## How to add a new skill

1. Create `skills/<name>/` with `name` = folder name (lowercase, hyphens)
2. Add `SKILL.md` with YAML frontmatter: `name`, `description` (what + when)
3. Reference shared intake near the top; do not duplicate contradictory choice rules
4. Use the shared four-status evidence and readiness contract for relevant checks
5. Add `references/` only for depth that would bloat the skill body
6. Document When to Use / When NOT to Use
7. Do not invent facts or approved scope; missing context blocks only affected commitments
8. Update `skills.md` catalog table
9. Add a CHANGELOG entry under the next version
10. Optionally add a short example under `examples/`

## Done criteria (before claiming a change is finished)

- [ ] Frontmatter valid: `name` matches folder; `description` has triggers
- [ ] INTAKE section present and light
- [ ] Relevant checks use the shared statuses, evidence and readiness rule
- [ ] Relative links to `references/` and `docs/` work
- [ ] Catalog (`skills.md`) updated
- [ ] Version and status lines are accurate (README, CHANGELOG, skills.md, SKILL.md headers)
- [ ] Scope and decision ownership preserved; readiness does not authorize external actions
- [ ] Branding says **ShipRight**, not “Anti-Slop Product Design Skill Pack” as the product title

## Quality checks for generated product/UI work

Use `skills/_shared/operating-contract.md` as the common rule. State the reviewed artifact/version, stage, critical requirements and evidence limits. No critical failure can pass merely because an owner or ticket exists. Not verified is not Pass; Not applicable needs a reason. Keep the existing specialist checks proportionate to the requested task and its depth.

Preserve the user's product reasoning: owned outcome → differentiating system → objects/states → journey → screen jobs → honest critique → approved decisions. Do not introduce new workflows or personal-project details during a focused correction.

---

*Public draft — AGENTS.md — ShipRight*
