# AI slop tells - reference

**Status: DRAFT.** Used by `ux-critique` (and useful to `ui-ux-design`).  
**Pack:** ShipRight. Use with the **10-gate ship audit**.

These patterns show up often from vibe-coding UI tools (Claude Design, Figma AI, Google Stitch, generic Cursor/Codex UI, etc.). Spot them; ask for rewrites grounded in docs.

Visual patterns below are contextual prompts, not automatic failures. Approved purple palettes, gradients, emoji or a single typeface can be appropriate. Keep a brand color the user asked to keep, including purple. Explain the actual impact. Visual preferences cannot waive fabricated proof, inaccessible critical controls, or other integrity requirements.

Only these auto-fail: fake proof, unsourced proof shown as fact, hidden cost, and a dark pattern. Everything else is a tell. Judge it. Then decide.

## Count it

Fill this block on every screen review. A count is evidence. It is not a verdict by itself.

```text
Count it
- Eyebrow labels: N
- Identical card rows: N
- Accent colors: N
- Primary CTAs on this screen: N
- Numbered markers that are not a real sequence: N
- Fake data (Jane Doe, Acme, 99.99%, or similar): quote or "none"
- Proof with no source: quote or "none"
Judgment: one or two sentences. Name any integrity Fail. Do not auto-fail a gradient, a purple brand, or a card row.
```

## Five default looks (calibration)

These are common AI defaults. They are not automatic failures. Ask whether this brief chose them.

| Look | What you see |
| --- | --- |
| Warm editorial | Cream page, serif headlines, a clay or terracotta accent |
| Neon dark | Near-black page, one neon accent |
| Broadsheet | Hairline rules, tiny labels, newspaper columns |
| SaaS kit | Purple-blue gradient, three equal feature cards, soft shadow |
| Template chrome | All-caps eyebrows, "A · B · C" markers, an arrow on every link |

## Detect mode

Run Detect when the artifact has UI sentences, or when the user asks what is wrong with the copy. Quote the exact line. Name the pattern. Give a fix. Do not write "AI wrote this."

Pattern names and the portability test live in `../../ui-ux-design/references/ui-copy.md`. A rewrite must name this product's object or outcome, so the line cannot move to another product unchanged.

```text
Detect
- Line: "[exact words]"
  Pattern: Unsourced proof
  Why: The number has no source.
  Fix: Remove the line until the user supplies a real source.
```

Unsourced proof and fake customers are integrity failures. A gradient, an em dash, or three cards are tells. Explain them. Do not auto-fail them.

## Visual slop

| Tell | Why it’s a problem | Rewrite direction |
|------|--------------------|-------------------|
| Purple/pink neon gradients everywhere | Generic “AI aesthetic,” not product brand | Use tokens from doc 04 / real brand |
| Glassmorphism + blur on every card | Decoration, weak hierarchy | Flat surfaces; elevation only when needed |
| Hero with stock-looking abstract 3D shapes | Decoration meaning | Real product UI or simple diagram |
| Too many accent colors | No hierarchy | One primary CTA color; neutrals dominate |
| Ambiguous or inconsistently labeled icons | Meaning or accessible name unclear | Use the approved icon system with meaningful labels; emoji alone is not a failure |
| Random illustration style mix | Feels generated | One illustration system or none |
| Centered-everything sections | Symmetry as default = template feel | Bias layout when the job needs it |

## Layout & IA slop

| Tell | Why | Rewrite |
|------|-----|---------|
| Generic “Admin Dashboard” with 6 widgets unrelated to job | Invented product | Match screens in doc 04 only |
| Invented nav items (Blog, Community, Pricing) inside app chrome | Scope creep | Keep nav to approved doc 04 items |
| Cards inside cards inside cards | Noise | Flatten; one grouping level |
| Everything is equal weight | No primary action | One clear H1 + one primary CTA |
| Sidebar + top nav + tab + chips all at once | Over-chrome | Simplify to what doc 04 needs |
| Icon-tile feature card row (3 equal cards) as default | Universal AI template | Asymmetric or type-led; only if content needs cards |

## Flow & content slop

| Tell | Why | Rewrite |
|------|-----|---------|
| Happy path only | Breaks on error/empty | Add states from product-design table |
| “Get started” empty of meaning | Vague | Verb + object from PRD job |
| Fake testimonials / logos | Trust damage | Remove unless real and approved |
| Fake charts with round numbers | Misleading | Use empty/loading or real data shapes |
| Onboarding of 7 delight steps | Friction theater | Only steps required by job/security |
| Dark patterns (sneaky opt-out, fake urgency) | Harm + policy risk | Honest defaults; remove urgency theater |

## Component slop

| Tell | Why | Rewrite |
|------|-----|---------|
| Custom snowflake controls for standard tasks | Cost + inconsistency | Use design-system components |
| Hover-only actions | Fails touch/keyboard | Visible actions or focusable menus |
| Color-only error (red border, no text) | A11y fail | Text + icon + color |
| Disabled primary with no explanation | Dead end | Explain how to unlock |

## How to report a tell

In critique findings, name the tell, point to evidence on the screen, and give a **rewrite ask** that cites doc 01/04 when possible. A demonstrated defect keeps its related audit check Fail until fixed and retested. Missing evidence is Not verified. Review only the stage supported by the artifact; an assigned ticket does not make a check Pass.

---

*DRAFT - ux-critique/references/slop-tells.md - ShipRight*
