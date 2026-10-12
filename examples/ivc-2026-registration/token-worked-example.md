# IVC 2026: token record with an unresolved scale

Phase 6 builds on the [Phase 5.1 desk-frame record](figma-redesign/README.md). The IVC scale is **pending from Altaz**. That record explicitly describes the reconstructed HTML values as illustration sizes, not measured tokens. Historical v1 numeric scales are superseded, not current approval.

## Current record

| Candidate role | Layer | Actual IVC value or alias | Evidence / decision |
| --- | --- | --- | --- |
| Raw palette, type scale, spacing scale, radius and elevation | Primitive | Unknown; pending from Altaz | No current measured scale; Unresolved |
| Motion duration and easing, if used | Primitive | Unknown; pending from Altaz | No new animation authorized |
| Primary text and page/card surfaces | Semantic | Pending source mapping | Candidate purpose only; Proposed |
| Main action, focus, status text/surface | Semantic | Pending source mapping | Candidate purposes; preserve non-color status and focus |
| Within-result and between-result spacing | Semantic | Pending source mapping | Grouping purpose is known; numeric mapping unresolved |
| Component-specific token layer | Component | Not added | No demonstrated reuse need beyond semantic roles |

These descriptive names are proposed candidates, not new canonical token names. Keep the project's actual names once supplied. No Unknown value enters executable YAML/JSON and no illustration number is relabeled Observed or Approved for the IVC project.

Preserve the recorded structural decisions: status pills beside the name, one meta line, no extra nested guardian box. They do not establish a numeric system or approve new colors, fonts, radii, shadows, modes or tooling. Existing runtime components may be inspected as Observed, with their exact source/version and authority caveat; they cannot override Altaz's pending redesigned scale.

## Next step

Request Altaz's actual scale or canonical source; record supplied values, provenance and approval, then map only the affected roles before new screens. Do not fill the gap from historical v1, a screenshot, vendor defaults or the reconstruction.

The [desktop comparison](../before-after/phase-6-design-tokens/compare.png) and [phone comparison](../before-after/phase-6-design-tokens/compare-phone.png) render exact independently generated sample HTML using the same supplied illustration. These are sample illustrations, never approval of the pending IVC scale. [Results and limits](../../evals/phase-6-design-tokens/results.md) preserve all outputs and checks.
