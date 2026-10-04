# Decision checklist - reference

**Status: Public draft.** Use during **Decision review** mode, during **Frame product**, and before marking product-design done.
**Pack:** ShipRight. Pairs with the skill's **8-check decision gate**.

## Before screen jobs (Frame product)

Run this before objects, the journey, or screen jobs. Then stop. Do not draft screens in the same message.

### Premises

Write 3 to 5 short statements the plan depends on. The user marks each one agree, disagree, or unknown. Do not mark them yourself.

```text
1. One person sets this up for the group. Mark: ___
2. Members already share one list. Mark: ___
```

If a premise is unknown, anything that depends on it stays Unknown. Do not invent a user or a feature to fill the gap.

### Narrowest first version

One or two sentences. This is the smallest version that still proves the differentiating system. Mark it Proposed until the user agrees. It is not a feature list.

### Three approaches

Show all three. Recommend one. Say what evidence would change your pick. Then stop.

| Approach | What it is | Effort | Risk | What it proves |
| --- | --- | --- | --- | --- |
| Small | The narrowest version above | Low, if the mechanism is already clear | It may leave later jobs unproved | The differentiating system, and nothing else |
| Full | The later jobs you can already name from the user's words | Higher | More unknown decisions | Whether the whole path holds |
| Different | Another mechanism that could cause the same outcome | Varies | It may abandon the user's idea | Whether a simpler mechanism works |

Put this choice in one decision card. Give each approach one example of its shape. Use the user's words. Do not name a feature, a price, or a user they did not state. If they only said "an app for my community", the Small example is: the smallest version that proves the mechanism, after the mechanism is known. It is not a guessed feature.

My pick names Small, Full, or Different, plus one sentence tied to the user's words. If you have no basis, say "No pick yet".

**You decide** selects only this approach. **Let me decide** means you wait. Do not draft screen jobs until the user picks, or delegates this one choice.

Do not invent prices, user counts, or features to make an approach look complete.

If the user asks to score the plan, route to ux-critique Plan review. Do not score it here.

## Interaction choices

| Question | Options | Pick when… |
|----------|---------|------------|
| Confirm vs undo? | Confirm modal / Undo toast / Neither | Irreversible → confirm; reversible → undo; low risk → neither |
| Modal vs inline? | Modal / Inline panel / Full page | Short interrupt → modal; complex task → page/panel |
| Autocomplete vs plain field? | Auto / Plain | Known finite set → prefer guided input |
| Single page vs wizard? | One page / Steps | Few fields → one page; clear phases or legal gates → steps |
| Soft vs hard validation? | On blur / On submit / Both | Prefer help before submit; block submit on hard rules |

## Risk prompts (answer in writing)

- [ ] What is the worst user mistake on this flow?  
- [ ] Can they recover without support?  
- [ ] What data is destroyed or exposed on failure?  
- [ ] What does a guest / wrong role see? (doc 03)  
- [ ] What happens offline or on slow network?  
- [ ] Is there a double-submit risk?  

## Scope discipline

- [ ] Every step maps to an approved or explicitly provisional job; non-goals stay excluded
- [ ] No “while we’re here” features  
- [ ] No invented navigation destinations  
- [ ] Assumptions labeled `ASSUMPTION`  

## Handoff completeness

- [ ] State table present  
- [ ] Primary action named per key state  
- [ ] Error copy ownership noted (who writes final strings)  
- [ ] Analytics events only if in docs - else UNKNOWN  
- [ ] Tickets suggested for `docs/05`  
- [ ] **8-check decision gate** uses the shared four statuses with evidence and next action

## Severity for leftover issues

Use the same impact-based severity as ux-critique. Severity describes harm or friction; P0/P1/P2 describe delivery priority.

| Level | Meaning |
|-------|---------|
| Blocker | The supported core job cannot complete, access fails, material harm is likely, or any stage-critical requirement fails |
| Major | Noncritical: substantial friction with a usable, understood workaround |
| Polish | Clarification or craft that does not block the job |

Critical failures block the affected handoff even when tracked in a ticket. Use the shared readiness rule; assigning a priority does not resolve a failure.

## Never invent

- Legal copy, medical claims, guaranteed SLAs  
- Fake research quotes  
- APIs and field names not in doc 02 (mark UNKNOWN)  

---

*DRAFT - product-design/references/decision-checklist.md - ShipRight*
