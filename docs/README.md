# Docs — ShipRight

**Status: Public draft (v0.5.0-draft).**
**Tagline:** Context before generate. Product before pixels.

These files are optional templates. A project may already have its own PRD or spec. Use the facts you have. Missing files do not block a draft. They also do not approve anything.

## The five docs

| File | Records |
| --- | --- |
| `01-prd.md` | Outcome, differentiating system, objects, scope, decision log |
| `02-technical-architecture.md` | Systems and stack. Unknown stack stays UNKNOWN. |
| `03-security-and-access.md` | Roles and who can do what |
| `04-frontend-spec.md` | Navigation, screen jobs, tokens |
| `05-feature-ticket-list.md` | P0 to P2 tickets and acceptance checks |

Draft them with **product-design**, mode **Doc set**. See `skills/product-design/references/doc-set.md`.

The mode writes one doc at a time and stops for a yes. It fills only known facts. It marks the rest `UNKNOWN - owner: <who>`. It does not overwrite Approved sections.

## Exports

`06-design-md.md` explains two optional files:

- `PRODUCT.md` from doc 01
- `DESIGN.md` from doc 04 sections 4 and 5, in the open DESIGN.md format (YAML tokens, then why)

Write an export only when the user asks or agrees. Imported values are Observed plus a source. They do not replace an Approved value on their own.

---

*Public draft - docs/README.md - ShipRight*
