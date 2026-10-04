# Plan review - reference (optional)

**Status: Public draft.** Used by `ux-critique` when the user asks to score a plan.
**Pack:** ShipRight.

Plan review scores a frame, a doc set, or a written plan before build. It is not the 10-check audit. Do not use it on a quick fix. Do not use it when there is no plan to read.

## Three lenses

Score each lens from 0 to 10. If a fact is missing, write Unknown for that part. Do not invent a score.

| Lens | What you score | A 10 would have |
| --- | --- | --- |
| Product | Outcome, premises, scope, who decides | A named user, one mechanism, premises marked by the user, and no invented scope |
| Design | Screen jobs, states, hierarchy, slop risk | One job per screen, the required states, and no unsourced proof |
| Build | Unknowns, tickets, what engineering must not guess | Every P0 ticket tied to a screen job and a state. Stack marked UNKNOWN where nobody chose it |

Say the sentence "A 10 would have..." in your own words for this plan. One sentence per lens.

## Questions

For each lens under 8, ask one question. Use a decision card from shared intake. Do not add a second question for the same lens.

Then say what would move that score up by one point.

A ticket, an owner, or a high score does not make a check Pass. The verdict still uses the shared readiness rule. A high score is not Ready. Readiness does not authorize build, deploy, or payment.

## Output

```text
Plan review
- Product: N/10. A 10 would have: ...
- Design: N/10. A 10 would have: ...
- Build: N/10. A 10 would have: ...
Question for the lowest lens: [one decision card]
What moves it up by one point: ...
Verdict: [shared readiness rule]
In plain words: ...
```

---

*Public draft - ux-critique/references/plan-review.md - ShipRight*
