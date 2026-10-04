# Build handoff pack - reference

**Status: Public draft.** Used by `ui-ux-design` when approved specs go to a build tool.
**Pack:** ShipRight.

ShipRight does not draw the screens. It compiles approved decisions into inputs that Claude Design, Figma, Cursor, Claude Code, Codex, Antigravity, VS Code agents and similar tools can follow. Run this after the product frame and the screen specs are approved.

## 1. Project rules block (paste once)

Paste into the tool's rules or instructions: `CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, or the Figma / Claude Design project instructions.

- **Outcome and differentiating system** (2 lines)
- **Core objects** and their states
- **Screens in scope** (IDs + one-sentence screen jobs); nothing else
- **Design direction:** feeling line, color roles with exact values, fonts by name, type sizes, spacing scale, radius, key components (from `docs/04`). If `DESIGN.md` exists, paste the Approved tokens from it. Do not paste an Observed or Proposed value as if it were approved. Put screen exceptions in that screen's prompt, not in the shared rules.
- **Hard rules:** approved navigation only; no invented features, data, testimonials or metrics; every listed state; label any sample data; text contrast at least WCAG AA; keyboard reachable; no hover-only critical actions; respect reduced motion
- **Do not resolve:** list every open decision (ID + owner). The tool must leave these alone.
- **Needs approval before build:** every item still Proposed

## 2. One prompt per screen (in build order)

Write it like a creative director's brief built from the approved docs:

```text
Screen [ID] - [name]
Screen job: [one sentence]
Objects shown: [...]
Feeling: [one line] · Reference: [what to borrow from which reference]
Structure (top → bottom): 1. … 2. … 3. …
Primary action: [verb + object]  Secondary: [...]
States: empty · loading · success · error (with recovery) · permission denied · [others that apply] - copy direction for each
Exact values: spacing [e.g. 8/16/24/48], section gap [...], radius [...], fonts [...], colors [...]
Accessibility: focus order, labels, error announcement, touch targets on mobile
Do not add: [nav items, sections, features, fake proof]
Build: desktop and mobile. Then [verification instruction, below].
Acceptance: [3-5 checks tied to the screen job]
```

## 3. Tool notes

- **Visual tools (Claude Design, Figma):** ask for every state as its own frame, on desktop and mobile. If Figma MCP is connected, the tool can read or write the file; otherwise export or screenshot.
- **Code agents (Cursor, Claude Code, Codex, Antigravity, VS Code agents):** build one screen at a time. No new dependencies, routes or data models without approval. Wire web fonts properly for production.
- **If a browser tool such as Playwright is available:** ask the tool to screenshot desktop and mobile and fix spacing, overflow and alignment before showing results, following `../../ux-critique/references/bounded-verification.md` (max 2 fix passes).

## 4. If the result looks generic

| Symptom | Likely cause | Fix in the pack |
| --- | --- | --- |
| Looks like an AI template | No references or feeling line; sections from a template | Add feeling + 1-2 references; derive sections from the screen job |
| Cramped or misaligned | No exact spacing values; mobile not checked | Give exact spacing numbers; require desktop + mobile screenshots |
| Fake-looking images or proof | Placeholders presented as real | Use real approved images, or label samples; remove unapproved proof |
| Fonts wrong when live | Fonts named but not wired | Ask to wire the web fonts for production |
| Extra pages or features | Scope not stated | List screens in scope and a "Do not add" line |

## 5. Return loop

After each screen is built, bring back a screenshot, link or build. Review it with **ux-critique** at the matching evidence stage, and use bounded verification for implemented screens. Only items listed under "Needs approval before build" may change, and only after the user approves them.

---

*Public draft - ui-ux-design/references/build-handoff.md - ShipRight*
