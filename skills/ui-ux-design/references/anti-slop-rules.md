# Anti-slop rules - reference

**Status: DRAFT.** Hard rules for `ui-ux-design`. Aligns with critique lens in `ux-critique/references/slop-tells.md`.  
**Pack:** ShipRight. Anti-slop = capability, not the product name.  
Inspired by Taste Skill / Hallmark / UI UX Pro Max ideas (paraphrased - not copied verbatim).

## Purpose

Vibe-coding tools invent pretty, generic UI. These rules force craft back to **your** product docs, design dials, and the **10-gate pre-flight**.

**Tagline:** Context before generate. Product before pixels.

## Integrity requirements

Do not present fabricated research, testimonials, customers, metrics or capabilities as real. Label synthetic prototype fixtures. Do not hide material costs, permissions or consequences. Keep critical controls usable through supported input methods. Docs and personal taste cannot waive truthfulness or accessibility.

Do not add unapproved navigation or features merely to satisfy a checklist. Apply the shared operating contract for decision ownership and evidence.

## Visual heuristics

Purple palettes, gradients, cards, blur, symmetry, emoji, a single font and motion are not automatic failures. An observed or approved brand color, including purple, stays. Evaluate product purpose, brand fit, content hierarchy, accessible interaction and actual use. Prefer approved tokens and components. Explain a concrete problem before recommending a visual change. Numerical dials are optional aids, not proof of quality.

## Count it

Fill this block before a build handoff, and whenever you review a screen. A count is evidence. Judge it in context. Only fake proof, unsourced proof, hidden cost, and a dark pattern auto-fail.

```text
Count it
- Eyebrow labels: N
- Identical card rows: N
- Accent colors: N
- Primary CTAs on this screen: N
- Numbered markers that are not a real sequence: N
- Fake data (Jane Doe, Acme, 99.99%, or similar): quote or "none"
- Proof with no source: quote or "none"
Judgment: say what the counts mean for this job. Do not fail a color or a card row by count alone.
```

Common default looks, used as calibration, not as bans: cream page with a serif and a clay accent; near-black page with one neon accent; newspaper hairlines and tiny labels; a purple-blue gradient with three equal cards; template chrome (all-caps eyebrows, "A · B · C" markers, arrows on every link). Ask: "Is this a choice for this brief?"

UI sentences follow [ui-copy.md](ui-copy.md). Quote a bad line. Name the pattern. Do not guess that a model wrote it.

## Prefer instead

| Instead of slop | Prefer |
|-----------------|--------|
| Random gradient hero | Token background + clear H1 + CTA |
| Three equal feature cards by default | Layout that matches VARIANCE dial + real content structure |
| Six unrelated widgets | Widgets mapped to PRD metrics only |
| “Submit” | Verb + object from the job |
| Custom snowflake controls | Design-system components |
| Color-only status | Text + icon + color |
| Centered long essay | Short context + structured content |
| Motion dial high but nothing moves | Real motion notes - or lower MOTION |

## Product-type sanity

Match seriousness to the product in the PRD:

| Product vibe in PRD | Avoid |
|---------------------|-------|
| Finance / health / admin | Neon playfulness, joke copy |
| Consumer social | Dense enterprise table overload without need |
| Internal tools | Marketing landing chrome inside the app shell |

If direction is unresolved, start neutral and clear. Preserve approved brand choices; use dials only when useful.

## Pre-generate check (actionable)

Before calling Figma / Stitch / Claude Design / Cursor / Claude Code UI generate (for the full pack, see `build-handoff.md`):

- [ ] Current screen scope identified from doc 04 or equivalent context; proposals distinguished from approvals
- [ ] One-line design read; optional dials if useful
- [ ] Tokens / brand pointed to  
- [ ] Integrity requirements and relevant visual rationale stated in the prompt
- [ ] State requirements listed in the prompt  
- [ ] **10-gate pre-flight** in the skill uses Pass, Fail, Not verified or justified Not applicable with evidence

Example prompt fragment:

> Follow current screen decisions in docs/04 or equivalent context. Design read: [one line]. Screens only: [list]. Use the approved brand, accessible controls and no unapproved navigation. Include the applicable states from the product specification. Primary CTA: [verb + object]. Add dials only if they clarify direction.

## After generate

Run **ux-critique** (10-gate ship audit). Convert blockers/majors into doc 05 tickets or design revisions.

## Honest failure

If the model output is mostly slop, say so. Do not “lightly edit” a wrong product into existence - return to docs + product-design. Fail pre-flight honestly.

---

*DRAFT - ui-ux-design/references/anti-slop-rules.md - ShipRight*
