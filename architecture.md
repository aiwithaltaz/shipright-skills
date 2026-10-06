# Pack architecture

**ShipRight 0.6.1-draft**

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
| skills/product-design/ | Outcome, mechanism, flows and state effects |
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

## One owner per rule

Scope and feedback live in the shared contract. Detailed flow behavior lives in flow-rules.md.
The short F1-F3 export block is repeated only in frontend/build templates, so exported files work without the pack.
The checker compares these export blocks exactly. Skills and other references link to the canonical details.
Specialist gates retain 8/10/10/20 IDs. Their criteria point to shared policy; they do not redefine readiness.

## Project exports

PRODUCT.md and DESIGN.md go at the app root. Other requested templates go under docs/shipright/.
Exported references use app-root paths and carry required behavior. They must not depend on an absent pack-local skills/ tree.
Preserve another tool's existing format and sections; do not claim universal DESIGN.md parser compatibility.

## Evidence

Static source checks cover structural integrity, selected rule contracts and known historical limitations.
Controlled trials exercise instruction behavior on specified requests. They are not client installation or cross-model benchmarks.
Historical test logs remain historical. Hash mismatches and known defects must be disclosed, never rewritten into old passes.
