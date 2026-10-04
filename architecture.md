# Architecture — ShipRight

**Status: Public draft (v0.5.0-draft).**
**Tagline:** Context before generate. Product before pixels.

This file is a map of the pack. It is not a tutorial and not application code architecture.

## What this pack is

A small system that forces **context before generate** and **product before pixels**. Three agent skills frame the product, decide behavior, craft UI specifications, write build inputs for AI design and coding tools, and critique what gets built with evidence-based checks. Five optional templates record context and decisions. The goal is to stop AI tools from inventing random UI and flows.

**ShipRight's job next to visual-craft packs (Taste Skill, Hallmark, UI UX Pro Max, Impeccable):** a multi-screen product frame (outcome → differentiating system → objects → journey → screen jobs), explicit decision ownership, and stage-bounded readiness, in plain Markdown with no install tooling. Pair with those packs; do not bundle them.

**Anti-slop** = capability language (checks that block generic AI UI). **ShipRight** = product name.

## Folder map

```text
pack/
├── README.md                 # Humans: pitch, how it works, install, related packs
├── LICENSE                   # MIT, Copyright 2026 Altaz Lavji
├── CHANGELOG.md              # Version history
├── architecture.md           # This file — pack map
├── AGENTS.md                 # Rules for AI editing this pack (not for end-user apps)
├── skills.md                 # Catalog of skills + workflow order
├── docs/                     # Optional templates for recording context and decisions
│   ├── 01-prd.md             # Outcome, differentiating system, objects, scope, decision log
│   ├── 02-technical-architecture.md
│   ├── 03-security-and-access.md
│   ├── 04-frontend-spec.md   # Screen jobs, components, design-system direction
│   ├── 05-feature-ticket-list.md
│   ├── 06-design-md.md       # DESIGN.md and PRODUCT.md import and export
│   └── README.md             # How the doc set and the exports work
├── personal-taste/           # Optional preference overlays
├── skills/
│   ├── _shared/
│   │   ├── intake.md             # Depth + 0–5 questions + decision ownership
│   │   └── operating-contract.md # Decision status, evidence, readiness, output shape
│   ├── product-design/       # Frame product, doc set; what the product should DO (+ 8-check gate)
│   │   └── references/       # states-and-flows, decision-checklist, doc-set, operational-flows, opportunity-research
│   ├── ui-ux-design/         # How screens LOOK and behave; DESIGN.md; UI copy; build handoff (+ 10-check pre-flight)
│   │   └── references/       # layout, state-coverage, operator-workspaces, anti-slop, ui-copy, references-and-design-system, build-handoff
│   └── ux-critique/          # Review, plan scores, copy detect, product audit, verification (+ 10-check audit)
│       └── references/       # slop-tells, plan-review, severity-rubric, bounded-verification, requirements-and-feedback
├── evals/                    # Focused behavior trials + source checks
└── examples/
    ├── idea-to-screen-jobs/  # Rough idea → frame → screen jobs → build pack → review
    ├── ivc-2026-registration/ # Historical prototype, owner feedback, revised brief and training candidates
    └── sample-saas-onboarding/
```

### Ownership

| Path | Owns | Does not own |
|------|------|--------------|
| `docs/` | Recorded context and decisions (requirements, systems, security, frontend, tickets) | Runtime code; approval by itself |
| `skills/_shared/` | Depth, intake, decision ownership, evidence and readiness | Skill-specific craft rules |
| `skills/product-design/` | Product frame, premises, three approaches, doc set, flows, states, decisions, risks, optional opportunity research, decision gate | Pixel styling, fake research, docs the user did not ask for |
| `skills/ui-ux-design/` | Layout, hierarchy, components, accessibility, references, design-system direction, DESIGN.md and PRODUCT.md, UI copy, build handoff pack, pre-flight | Product strategy, pricing, silent brand changes |
| `skills/ux-critique/` | Findings, severity, plan review, copy detect, product audit, bounded verification, audit | Inventing new product scope |
| `personal-taste/` | Optional preference overlays (merge, don’t rewrite cores) | Core skill bodies |
| `examples/` | Teaching samples | Source of truth for a real product |

## Progressive loading (how agents should read)

1. **Metadata** — skill `name` + `description` in each `SKILL.md` frontmatter (choose the right skill)
2. **Context and authority** — current request, relevant project sources and `skills/_shared/operating-contract.md`; then shared intake (state the depth)
3. **Instructions** — full `SKILL.md` body when the skill activates
4. **Personal taste** — load only a user- or project-selected profile using [the selection guidance](personal-taste/README.md); bundled files are not automatically active
5. **References** — files under `skills/*/references/` only when the depth or task calls for them
6. **Docs** — relevant context for the commitment; help draft missing sections without inventing approvals
7. **Gates** — run the skill's numbered gate at handoff or when readiness is requested

Do not load every reference on every turn. Keep the skill body lean; put depth in `references/`.

## Skill flow (simple)

```text
relevant context (approved decisions preserved) + depth
      │
      ▼
product-design  →  Frame product (premises, Small / Full / Different, stop)  →  user approves
      │            (optional opportunity research, only if the user agrees)
      │            (Doc set only if the user asks: one doc, then a stop)
      ▼
product-design  →  flows, states  →  8-check DECISION GATE at handoff
      │
      ▼
ui-ux-design    →  screen specs (+ optional references, design-system direction)  →  10-check PRE-FLIGHT
      │
      ▼
ux-critique     →  specification review
      │
      ▼
ui-ux-design    →  BUILD HANDOFF PACK (rules block + one prompt per screen)
      │
      ▼
your build tool →  screens / code
      │
      ▼
ux-critique     →  critique + bounded verification of the actual result (max 2 fix passes)
```

If critique finds a **wrong decision** (not just a visual issue), route back to **product-design**, not only to ui-ux-design.

## Countable gates summary

| Skill | Gate name | Checks | When |
|-------|-----------|--------|------|
| product-design | Decision gate | 8 | Product handoff |
| ui-ux-design | Pre-flight | 10 | Decided build handoff |
| ux-critique | Audit | 10 | Named review stage |

## Hard boundaries

**IS**

- Product frame and decisions with a clear trail
- Light guided intake sized by depth (never a novel questionnaire)
- State coverage (empty, loading, error, success, denied, partial)
- UI/UX specs and build inputs grounded in approved decisions
- Honest critique with severity and evidence
- Evidence-based checks with stable IDs

**IS NOT**

- Treating proposed scope, roles or screens as approved requirements
- Treating a competitor's missing feature as demand or scope
- Fake user interviews or fake metrics
- Dark patterns
- Legal, medical, or compliance advice as if it were certified
- A coding-agent framework, CLI, hooks or detector tooling
- Three divergent copies of the same skill for Claude / Cursor / Codex (one `skills/` source of truth)
- A bundle of other skill packs

## How to extend safely

1. Add depth in `references/`, not by growing `SKILL.md` past a readable length
2. Keep intake DRY via `skills/_shared/intake.md`
3. Put preference files in `personal-taste/` — do not fork core skills
4. Update `skills.md` catalog and `CHANGELOG.md`
5. Keep folder names `lowercase-with-hyphens` matching frontmatter `name`
6. Do not duplicate skill text into tool-specific folders — use copy or symlink from `skills/`
7. Use the shared evidence statuses/readiness rule; check counts are coverage, not proof of quality

## What rarely changes

- Method order: outcome → differentiating system → objects/states → journey → screen jobs → honest critique → preserved decisions
- No invented facts, validation or approval; unknowns block only affected commitments
- Split of ownership across the three skills
- Tagline: Context before generate. Product before pixels.

---

*Public draft — architecture.md — ShipRight*
