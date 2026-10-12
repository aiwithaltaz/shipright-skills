# Pack architecture

**ShipRight 0.6.2**

This is a product/design instruction pack, not an application framework.

| Path | Owns |
| --- | --- |
| README.md | Start, setup and evidence limits |
| skills.md | Task routing |
| AGENTS.md | Maintenance rules for this pack only |
| skills/_shared/operating-contract.md | Authority, phase scope, exact feedback, facts and readiness |
| skills/_shared/intake.md | One bounded intake across skills |
| skills/_shared/flow-rules.md | Canonical F1-F3 behavior |
| skills/_shared/output-folder.md | Authorized project writes and export paths |
| skills/product-design/ | Outcome, research judgment, mechanism, flows and state effects |
| skills/ui-ux-design/ | Layout, system use, UI states and handoff |
| skills/ux-critique/ | Artifact findings and stage-specific verification |
| skills/ship-check/ | Release evidence |
| docs/ | Optional templates exported into the user's project |
| personal-taste/ | Opt-in visual preferences |
| examples/ | Teaching cases and explicitly historical artifacts |
| evals/ | Source checks, trial inputs, evidence and limits |

## Loading

Load the active SKILL.md, shared contract and intake once. Then load only references required by the task.
Use existing project context instead of generating redundant documents. Do not load historical examples as current product authority.
Keep the entire pack accessible so relative links resolve. Native discovery is a client concern, not verified by source checks.

Phase 1 research remains inside product-design. Its SKILL.md directly links evidence, method,
planning and source-register references, each loaded only for the current need.
The shared contract still owns truthfulness, approval and gate statuses; evidence kinds are not new statuses.
Research plans are not performed research. Optional synthesis inside product-design separates records, patterns, findings and decisions. Its three references link directly from SKILL.md and load only for supplied-record interpretation, affected product commitments or provenance. research-evidence owns Phase 1 evidence kinds; research-synthesis owns grouping/finding discipline; research-to-decisions owns evidence-linked commitments under the shared authority contract. Do not copy these detailed rules into other skills. Optional Phase 3 IA also lives in product-design: information-architecture owns objects/relationships, taxonomy/labels and structural maps; findability owns retrieval contracts; roles-and-navigation applies existing access authority to destinations; ia-research owns optional IA study detail; ia-sources owns provenance. Each reference links directly from SKILL.md with a narrow condition. Shared authority and ui-ux-design visual ownership remain. Optional Phase 4 mapping stays in product-design: mapping-types owns one-map selection, journey-mapping owns experience over time, task-and-system-flows owns user/system distinctions, service-blueprints owns delivery layers/handoffs and mapping-sources owns provenance. Each loads directly from SKILL.md only when relevant. Existing state/dependency rules and Phase 3 navigation retain ownership. Phase 5 and later knowledge are outside this change.

## One owner per rule

Scope and feedback live in the shared contract. Detailed flow behavior lives in flow-rules.md.
The short F1-F3 export block is repeated only in frontend/build templates, so exported files work without the pack.
The checker compares these export blocks exactly. Skills and other references link to the canonical details.
Specialist gates retain 8/10/10/20 IDs. Their criteria point to shared policy; they do not redefine readiness.

## Project exports

Phase 5 system work stays in ui-ux-design. references-and-design-system owns inspection and reuse/extension/Establish selection; design-foundations owns coordinated foundation decisions; design-system-governance owns naming, proportionate contribution and maintenance; design-system-sources owns provenance and comparison. Each reference loads directly from SKILL.md only for the current task. Preserve shared authority, existing layout/icon/motion owners and approved exceptions. Small corrections do not trigger a full system exercise. Token architecture and component contracts remain later phases.

PRODUCT.md and DESIGN.md go at the app root. Other requested templates go under docs/shipright/.
Exported references use app-root paths and carry required behavior. They must not depend on an absent pack-local skills/ tree.
Preserve another tool's existing format and sections; do not claim universal DESIGN.md parser compatibility.

## Evidence

Static source checks cover structural integrity, selected rule contracts and known historical limitations.
Controlled trials exercise instruction behavior on specified requests. They are not client installation or cross-model benchmarks.
Historical test logs remain historical. Hash mismatches and known defects must be disclosed, never rewritten into old passes.

## Bounded context, growing knowledge

[context-policy.json](evals/context-policy.json) declares normal loading paths and conditional entry links. [check_context.py](evals/check_context.py) enforces limits using tiktoken 0.12.0 / cl100k_base, including frontmatter, tables, links and code. Provider token counts may differ.

| Guidance | Maximum tokens |
| --- | ---: |
| Each SKILL.md | 4,500 |
| Each shared file | 2,000 |
| Always-loaded contract and intake together | 3,000 |
| Entire shared folder | 5,000 |
| Each reference file | 4,000 |
| Declared normal path, including entry and required shared rules | 12,000 |

Keep the existing 1,300-word entry check as a secondary safeguard. Stored reference collections and the repository have no hard aggregate cap. Review warnings begin at 50,000 reference tokens per consuming skill, 100 MB for the repository, or 10 MB for a file. Warnings request review; they do not fail a compliant collection.

Load only references relevant to the current task. Each consuming SKILL.md links directly to its references with a loading condition; related links within references are reminders, never the only access path. The checker flags broken links, orphan references, nested reference folders, missing conditions and undeclared reference use. Topic ownership is the containing skill directory. Cross-skill consumers reuse the original file; detailed research rules stay with product-design, visual rules with ui-ux-design, critique rules with ux-critique, launch checks with ship-check. No complex duplicate detection.

A normal path is a declared guidance allowance, not a client-enforced context window. The checker conservatively includes linked skill-guidance dependencies from selected references. Include relevant dependencies when adding paths. Conversation, project artifacts, tool output, optional exported templates and opt-in taste files are outside these guidance totals. If a task needs more than a path allows, use bounded stages with concise decisions; never omit required safeguards or accessibility. Source checks cannot establish actual loading in every client.
