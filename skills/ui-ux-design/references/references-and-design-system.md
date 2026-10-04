# References and design-system direction - reference (optional)

**Status: Public draft.** Used by `ui-ux-design`.
**Pack:** ShipRight.

Taste comes from real references and exact values, not from asking for "premium". Product comes first. Do not choose tokens, hex values, or type scales before the screen jobs exist.

A named brand is a pattern reference. "Like Linear" or "make it look like Stripe" does not mean copy that brand. Borrow a pattern. Reject the identity. If the user insists on a look before screen jobs exist, mark the sketch **Proposed / concept only**. It is not Ready.

## Reference analysis

Use at **New surface** or **New product** depth, or when the user supplies references. Ask for one line of feeling (for example, calm, precise, trustworthy) and 1 or 2 real products or sites that have it. Use at most 3 references, supplied or approved by the user.

| Reference | Problem it solves | Borrow (pattern, not look) | Reject (why) | Fit to our screen job |
| --- | --- | --- | --- | --- |

- Borrow patterns: spacing rhythm, hierarchy, how one action is made obvious.
- Never copy brand identity, logos, illustrations, copy, or a distinctive layout.
- A public DESIGN.md from a brand collection is inspiration only. It is not your brand.
- A reference cannot add screens, sections, or features. Section lists come from screen jobs, not from a template.
- "Proof" sections need real, approved proof. Otherwise leave them out.

## Design-system direction - pick one mode and say it

### Preserve (existing product - the default when an app exists)

Record what is actually in use from inspected screens, code, or an imported DESIGN.md.

- Color roles (background, surface, text, muted, accent, success, warning, danger)
- Type sizes and weights, spacing steps, radius, elevation, motion
- Key components and their states (buttons, inputs, tables, modals, toasts, empty states)

Mark each value **Observed** and name the source (screenshot, URL, file, computed style, or tool). What you cannot see is **Unknown**. Do not guess a hex from a blurry screenshot.

Flag inconsistencies as findings. Propose only the smallest additions the task needs. An observed brand color stays, including purple. Purple is not a slop failure.

**Never changes silently.** These stay as they are unless the user approves each one in its own decision:

- URLs and routes
- Primary navigation labels
- Form field names and their order
- The logo
- Legal copy

Do not write legal text. Do not rewrite it. "Make it modern" does not approve this list.

Record tokens in `docs/04` sections 4 and 5. For a modernize or improve request, also include:

- Top 3 problems, by user impact
- What is working, including the brand color the user asked to keep
- Patch or rethink, in one line
- Proposed changes as a ticket list, not as code

### Establish (new product with no visual authority)

A small set only. Every value is **Proposed** until the user approves it.

- Color roles as above, with contrast targets (text at least WCAG AA)
- 3 or 4 type sizes, one spacing scale, one radius system, elevation rules
- Motion: purpose, duration range, and reduced-motion behavior
- Components with required states
- Exact brand values (hex, font names) once approved, so build tools do not guess

## DESIGN.md and PRODUCT.md

Follow [docs/06-design-md.md](../../../docs/06-design-md.md).

**Export.** From Approved or Proposed tokens in doc 04 sections 4 and 5, write DESIGN.md in the open format: YAML tokens, then Markdown that says why. Put screen exceptions under Screen notes. Do not repeat the whole system per screen.

**Import.** Read an existing DESIGN.md. Map each value to Observed plus the source. Never replace an Approved value silently. Show a conflict as a decision card.

**PRODUCT.md.** Export from doc 01 only when the user agrees. A fact you did not get from the user is Observed plus its source.

Unknown tokens are omitted from the YAML. List them under Unknown. Do not invent a hex or a font.

## Output

Keep it short: the mode, the feeling line, the reference table (if used), the token list with statuses and sources, the never-change list, and open questions. Put approved values in `docs/04`. The build handoff pack reads them from there, and from DESIGN.md when that file exists.

---

*Public draft - ui-ux-design/references/references-and-design-system.md - ShipRight*
