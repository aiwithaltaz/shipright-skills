# ShipRight

**Status: Public draft - v0.5.0-draft.** See [CHANGELOG.md](./CHANGELOG.md).

**Tagline:** Context before generate. Product before pixels.

---

## One-line pitch

ShipRight takes you from a rough idea to build-ready product decisions, the way a senior product team would, then checks what your AI tool actually builds.

It works with Claude Design, Figma, Cursor, Claude Code, Codex, Antigravity, VS Code agents and similar tools. ShipRight decides what to build and why, then writes the build inputs. Your tool draws the screens.

**Anti-slop** is a capability (evidence-based checks for unsupported scope, misleading content and weak UX), not the product name.

## How it works

```text
rough idea
  → Frame product: outcome, premises, Small / Full / Different, then objects, journey, screen jobs   (product-design)
  → optional opportunity research (only if you agree)
  → optional doc set: PRD, architecture, access, frontend spec, tickets, one doc at a time            (product-design)
  → flows + states for each screen job                                                               (product-design)
  → screen specs + optional references + design-system direction                                     (ui-ux-design)
  → optional PRODUCT.md and DESIGN.md export                                                         (ui-ux-design)
  → build handoff pack: rules block + one prompt per screen                                          (ui-ux-design)
  → your build tool makes the screens
  → critique + screenshot check of what was built, max 2 fix passes                                  (ux-critique)
```

You approve decisions along the way. Suggestions stay **Proposed** until you say yes. Silence is never approval.

## Right-sized work

ShipRight matches effort to the request:

| Depth | Example | What you get |
| --- | --- | --- |
| Quick fix | "Better label for this button" | A short answer. No research, no check tables |
| Focused improvement | "This page feels cluttered; we launch this week" | Top problems, what to keep, what to ship now |
| New surface | "Design the invite flow" | Flow, states, spec, checks at handoff |
| New product | "I have a rough idea" | A one-page product frame first. Premises and three approaches, then a stop. Research only if you agree |

## Related packs (pair with them; we don't bundle them)

| Pack | Strong at | ShipRight's different job |
| --- | --- | --- |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) | Anti-slop frontend taste, including redesigns of existing projects | Decides *what* each screen must do before taste is applied |
| [Hallmark](https://github.com/nutlope/hallmark) | Anti-slop UI rules | Same |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Style and design-system suggestions by product type (Python CLI) | Preserves *your* decisions and evidence instead of a generated style |
| [Impeccable](https://github.com/pbakaus/impeccable) | Product context file, design commands, deterministic detectors (CLI + hooks) | Multi-screen product frame, decision ownership, stage-bounded readiness; plain Markdown, no install tooling |

Taste packs make it look right. ShipRight makes it be right, then tells your tool exactly what to build. Use them together if you like. If you have Figma MCP or Playwright connected, ShipRight's build and verification steps can use them; they are optional.

## Who this is for

- Product designers, product owners, founders and vibe-coders using AI design and coding tools
- Teams tired of generic "AI purple dashboard" output
- Anyone who wants **context before generate**

## Who this is not for

- Pure backend / infra with no product surface
- Brand illustration or logo art alone
- Inventing fake user research or legal/medical advice

## What's inside

| Layer | Path | Job |
| --- | --- | --- |
| Templates | `docs/01`-`06` | Record context and decisions so AI does not invent them. Doc set drafts them one at a time. `06` covers DESIGN.md and PRODUCT.md |
| Product decisions | `skills/product-design/` | Frame product, flows, states, **decision gate** |
| UI/UX craft | `skills/ui-ux-design/` | Screen specs, references, design-system direction, **build handoff pack**, **10-check pre-flight** |
| Critique | `skills/ux-critique/` | Reviews, product audit, screenshot verification, **10-check audit** |
| Shared intake | `skills/_shared/intake.md` | Depth, 0-5 decision cards, You decide / Let me decide |
| Shared contract | `skills/_shared/operating-contract.md` | Decision status, evidence and readiness rules |
| Personal taste | `personal-taste/` | Your optional preference files |
| Catalog | `skills.md` | Which skill + prompts |
| Map | `architecture.md` | How the pack is organized |
| Maintainer rules | `AGENTS.md` | Rules for editing this pack (not for your app) |
| Examples | `examples/` | Idea-to-screen-jobs walkthrough; fictional invite specification with honest reviews |

## In practice

[IVC 2026 registration prototype](examples/ivc-2026-registration/README.md) is a real project brief carried through the full workflow: product frame, flows and states, screen handoff, implementation, and bounded review. The example includes the original runnable fake-data source, screenshots and test evidence, followed by owner feedback, a revised brief and targeted skill improvements. The original demo does not yet implement the revised requirements. It does not claim production readiness or independent validation.

## Quality checks

| Skill | Checks | Used when |
| --- | --- | --- |
| product-design | 8 | Before a product handoff |
| ui-ux-design | 10 | Before a decided build handoff |
| ux-critique | 10 | Reviewing a specification, visual artifact or implementation |

Statuses: **Pass**, **Fail**, **Not verified**, **Not applicable** (with a reason). A ticket, owner or fix plan never turns a failure into Pass. A failure on a stage-critical requirement is a **Blocker**. A screenshot cannot prove keyboard behavior, persistence or release readiness.

Verdicts: **Re-decide**, **Fix first**, **Needs decision (D#)**, **Not established**, **Ready for [next stage]**. Readiness never authorizes deploy, publish or payment.

## Decision ownership

- **You decide** delegates only the named choice.
- **Let me decide** leaves the choice with you.
- Blank or skipped answers stay unresolved; silence is not approval.
- Your latest explicit correction supersedes older decisions within its scope.

See [shared intake](skills/_shared/intake.md) and the [operating contract](skills/_shared/operating-contract.md).

## Install (copy-paste ready)

Keep **one** canonical copy of this pack. Link the three skills **and** the `_shared` folder; the skills read `../_shared/`.

```bash
PACK=/path/to/shipright-skills   # replace with your real path

# --- Claude Code (personal) ---
mkdir -p ~/.claude/skills
for d in product-design ui-ux-design ux-critique _shared; do
  ln -s "$PACK/skills/$d" ~/.claude/skills/$d
done

# --- Claude Code (project) ---
mkdir -p .claude/skills
for d in product-design ui-ux-design ux-critique _shared; do
  ln -s "$PACK/skills/$d" .claude/skills/$d
done

# --- Cursor ---
mkdir -p .cursor/skills
for d in product-design ui-ux-design ux-critique _shared; do
  ln -s "$PACK/skills/$d" .cursor/skills/$d
done

# --- Codex / Agent Skills ---
mkdir -p .agents/skills
for d in product-design ui-ux-design ux-critique _shared; do
  ln -s "$PACK/skills/$d" .agents/skills/$d
done
```

If a tool can only take one skill folder (for example, a single-folder upload), each skill still carries a short inline copy of the core rules and will say that the shared files are missing. For full behavior, include `_shared`.

Do **not** copy `AGENTS.md` into your app: it contains rules for maintaining this pack.

Exact paths can vary by tool version.

## Optional personal design preferences

The pack includes [Altaz's personal-taste profile](personal-taste/altaz.md). To use it, say: “Use ShipRight with Altaz's personal-taste profile.” You can also record that choice in your existing project instructions for future sessions. It covers simple organized screens, restrained branding, discoverable help, useful summaries, progress and 8-point layout spacing when no approved system already exists.

The profile stays optional for other users. Keep the file accessible when using a skills-only installation; see [selection and installation guidance](personal-taste/README.md). No IVC eligibility or registration policy is inherited.

## Example prompts

**1 — Start from a rough idea (product-design)**
> Use the product-design skill. I have a rough idea: [one sentence]. No docs yet. Frame the product first.

**2 — Improve an existing screen before launch (ux-critique)**
> Use the ux-critique skill. Audit our [page] before launch. Approved and frozen: [colors, shapes, nav]. I want changes I can ship this week, not a redesign.

**3 — Hand approved specs to a build tool (ui-ux-design)**
> Use the ui-ux-design skill. Our frame and screen specs are approved in docs/. Make the build handoff pack for [Cursor / Claude Design / Figma].

**4 - Check what got built (ux-critique)**
> Use the ux-critique skill. Here are desktop and mobile screenshots of [screen] built from the pack. Compare them with the approved screen job and states.

**5 - Write the five docs (product-design)**
> Use the product-design skill, Doc set mode. The frame is approved. Write the docs one at a time. Mark unknown facts as UNKNOWN with an owner. Do not invent the stack.

## Boundaries

Follow the shared operating contract for decision authority and readiness.

- **Do not** turn proposed scope, roles or screens into approved requirements
- **Do not** turn a competitor's missing feature into required scope
- **Do not** claim user research was done unless sources are listed
- **Do not** use dark patterns (trick opt-outs, fake urgency, hidden costs)
- **Do** ask only material unanswered questions and preserve who owns each choice
- **Do** cover applicable empty / loading / error / success / permission-denied behavior
- **Do** resolve critical failures and verify critical requirements before claiming readiness
- **Do** write in simple, clear English

## Version

- Current: **v0.5.0-draft**
- See [CHANGELOG.md](./CHANGELOG.md)

---

*Public draft — ShipRight — © 2026 Altaz Lavji — MIT*
*Context before generate. Product before pixels.*
