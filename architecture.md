# Pack architecture

**ShipRight 1.7.1**

This is a product, design and build-planning instruction pack, not an application framework.

| Path | Owns |
| --- | --- |
| README.md | Start, setup and evidence limits |
| skills.md | Task routing |
| AGENTS.md | Maintenance rules for this pack only |
| SOURCES.md | Provenance and credits. Never loaded by skills |
| skills/shipright/SKILL.md | The only installable skill. Routes to one stage, and still names the five modes |
| skills/shipright/stages/ | Draft 1.3 spine, stages 0 to 10 plus a feedback round. Not a released version |
| skills/shipright/templates/ | Fill-in files for a stage, including templates/record/ |
| skills/shipright/patterns/ | Phase 2 pattern files. The README is a placeholder |
| skills/shipright/blocks/ | Phase 2 tested blocks. Not loaded as prompt context |
| skills/shipright/scripts/ | check-ui.mjs, crawl.mjs, and check-record.mjs. scripts/check-ui.mjs is a wrapper |
| skills/shipright/modes/_shared/operating-contract.md | Authority, phase scope, exact feedback, facts and readiness |
| skills/shipright/modes/_shared/intake.md | One bounded intake across modes |
| skills/shipright/modes/_shared/flow-rules.md | Canonical F1-F3 behavior |
| skills/shipright/modes/_shared/output-folder.md | Authorized project writes and export paths |
| skills/shipright/modes/build-pack/ | Idea to build pack: sequence, stack choice, ticket prompts, pack contract |
| skills/shipright/modes/product-design/ | Framing, research and evidence, structure, journeys, flows and states |
| skills/shipright/modes/ui-ux-design/ | Design system, layout, components, states, motion and copy |
| skills/shipright/modes/ux-critique/ | Artifact findings and stage-specific verification |
| skills/shipright/modes/ship-check/ | Release evidence |
| scripts/check-ui.mjs | Measures a rendered page in real Chromium |
| docs/ | Templates exported into the user's project |
| personal-taste/ | Opt-in visual preferences |
| examples/ | Teaching cases, before/after images and explicitly historical artifacts |
| evals/ | Source checks, trials, evidence and limits |

## Loading

Load skills/shipright/SKILL.md, then one mode MODE.md, then the shared contract and intake once. Then load only the references the current step needs.
build-pack loads in three bounded stages: frame, flows, structure and stack; design system and screens; tickets and pack check.
For premium public web, stages are research and six-act story; three options with only selected technique recipes; the six-act prompt and pack check. These replace document marketing references. Each stage reuses the canonical reference owned by another skill instead of copying it.
Use existing project context instead of generating redundant documents. Do not load historical examples as current authority.

## One owner per rule

Scope and feedback live in the shared contract. Flow behavior lives in flow-rules.md.
The short F1-F3 export block is repeated only in frontend and build-rule templates so exported files work without the pack. The checker compares them exactly.
product-design owns research.md (evidence kinds, methods, plans, synthesis, decisions), structure.md (objects, routes, findability, access), journeys.md (one-map selection and map rules), framing.md and flows-and-states.md.
ui-ux-design owns design-system.md (whose system wins, foundations, references, DESIGN.md export, maintenance) and components.md (names and look-alike choices), plus layout, icons, states, copy, motion and operator guidance.
build-pack owns stack-choices.md, ticket-prompts.md and pack-contract.md.
Specialist gates keep stable IDs: product-design 8, ui-ux-design 10, ux-critique 10, ship-check 20, build-pack 10. They stay until Altaz approves retiring them. Stage files add a yes or no gate and do not replace those IDs yet.
The only website stack rule is in skills/shipright/stages/05-architecture.md. A premium public site with a product on stage uses Vite, plus Three.js or React Three Fiber, plus GSAP and Lenis. A calm content site, or a site with no product object, uses Astro. stack-choices.md points there. It does not keep a second default.
v1.0 merged 30 earlier references into 9, plus SOURCES.md for provenance. Every protected safety sentence kept its wording and moved with its rule; the checker maps old paths to their successors.

## Project exports

PRODUCT.md and DESIGN.md go at the app root. Other templates go under docs/shipright/.
A build pack uses the compact set and word budgets in pack-contract.md. Exported files must not depend on an absent pack-local skills/ tree.
Preserve another tool's existing format and sections; do not claim universal DESIGN.md parser compatibility.

## Evidence

Static source checks cover structure, selected rule contracts and known historical limitations.
check-ui measures rendered pages; it does not prove good design or full accessibility.
Controlled trials in evals/v1 compare frozen baseline output with the rebuild, graded blind. They are not client installation or cross-model benchmarks.
Historical logs remain historical. Hash mismatches and known defects are disclosed, never rewritten into old passes.

## Bounded context, growing knowledge

[context-policy.json](evals/context-policy.json) declares normal loading paths and conditional entry links. [check_context.py](evals/check_context.py) enforces limits using tiktoken 0.12.0 / cl100k_base, including frontmatter, tables, links and code. Provider token counts may differ.

| Guidance | Maximum tokens |
| --- | ---: |
| Router SKILL.md and each mode MODE.md | 4,500 |
| Each shared file | 2,000 |
| Always-loaded contract and intake together | 3,000 |
| Entire shared folder | 5,000 |
| Each reference file | 4,000 |
| Declared normal path, including entry and required shared rules | 12,000 |

Keep the existing 1,300-word entry check as a secondary safeguard. Stored reference collections and the repository have no hard aggregate cap. Review warnings begin at 50,000 reference tokens per consuming skill, 100 MB for the repository, or 10 MB for a file. Warnings request review; they do not fail a compliant collection.

Load only references relevant to the current task. Each mode MODE.md links directly to its references with a loading condition; related links within references are reminders, never the only access path. The checker flags broken links, orphan references, nested reference folders, missing conditions and undeclared reference use. Topic ownership is the containing mode directory. Other modes link to that file; detailed research rules stay with product-design, visual rules with ui-ux-design, critique rules with ux-critique, launch checks with ship-check. No complex duplicate detection.

A normal path is a declared guidance allowance, not a client-enforced context window. The checker conservatively includes linked skill-guidance dependencies from selected references. Include relevant dependencies when adding paths. Conversation, project artifacts, tool output, optional exported templates and opt-in taste files are outside these guidance totals. If a task needs more than a path allows, use bounded stages with concise decisions; never omit required safeguards or accessibility. Source checks cannot establish actual loading in every client.
