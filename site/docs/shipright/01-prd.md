# PRD

**Version:** 1.1.0 site preview. **Date:** 14 October 2026. **Status:** Proposed.

## Frame

- **Who:** A person choosing Claude Code, Cursor, Codex, VS Code, Antigravity, Gemini CLI, Claude.ai, or ChatGPT, who wants to install ShipRight.
- **Job:** See what the pack changes, then copy an install line.
- **What they do today:** Read the GitHub README.
- **This release finishes:** A design system and three new open directions. The owner picks one.
- **Out:** The approved page, critique, ship-check, deploy, accounts, pricing, a blog, search, and legal pages.

## Success checks

- The owner can open Air, Depth, and Grid and see a floating nav, open space, and a 3D hero on each.
- Each page shows the real v1.0 comparisons, four short slop lines, empty IVC labels, and the 1.1 install lines.
- Copy reports Copied, or a visible failure, without moving focus.

## Flows

| Step | Visitor sees | Effect | Next | Exit |
| --- | --- | --- | --- | --- |
| Land | Three named directions | None | Open one | GitHub stays in the footer |
| Direction | Nav, hero, gallery, install | None | Copy or go back | ShipRight returns to the list. Nothing is saved |
| Copy | The command and Copy | Clipboard write, or a visible failure | Use it in the tool | Leaving does not undo a copy |
| Image missing | The alt text | That figure fails alone | Other figures stay | No retry service is invented |
| No WebGL | The headline and the still page | The canvas is removed | Read or install | Text does not depend on the canvas |

## Decisions

| ID | Decision | Status |
| --- | --- | --- |
| D1 | Astro, static, plain CSS. Vercel root `site` only after a later deploy approval. | Proposed (delegated) |
| D7 | Split, Night, and Press. | Superseded. Owner rejected them as congested |
| D10 | Shared scale in `design/tokens.css`. Three themes: Air, Depth, Grid. | Proposed. Owner picks |
| D11 | Vanilla Three.js, GSAP ScrollTrigger, and Lenis. GSAP is not MIT. | Proposed. The brief required them |
| D4 | Install lines live in `src/data/install.js`. | Proposed (delegated) |
| D5 | Favicon is a flat dark square until a logo exists. | Proposed |
| D6 | Public domain is unknown, so `site` in `astro.config.mjs` stays unset. | Unresolved |
| D9 | Steps 3, 4, and 5 wait until a direction is picked. | Approved for this pass |

## Open

- Which direction. Owner: Altaz.
- Production domain. Owner: Altaz.
- Logo file. Owner: Altaz.
- IVC 2026 images for Registration search results and Reports. Owner: Altaz.
