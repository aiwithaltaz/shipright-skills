# PRD

**Version:** 1.1.0 site preview. **Date:** 14 October 2026. **Status:** Proposed.

## Frame

- **Who:** A person choosing a tool (Claude Code, Cursor, Codex, VS Code, Antigravity, Gemini CLI, Claude.ai, or ChatGPT) who wants to install ShipRight.
- **Job:** See what the pack changes, then copy an install line.
- **What they do today:** Read the GitHub README.
- **This release finishes:** A refreshed pack and three proposed page directions. The owner picks one.
- **Out:** The approved page, critique, ship-check, deploy, accounts, pricing, a blog, search, legal pages, and IVC images.

## Success checks

- The owner can open three directions and see a before and after on the first screen of each.
- Each direction shows the four trial cases and the 1.1 install lines.
- Copy reports Copied, or a visible failure, without moving focus.

## Flows

| Step | Visitor sees | Effect | Next | Exit |
| --- | --- | --- | --- | --- |
| Land | Three named directions | None | Open one | GitHub stays in the footer |
| Direction | Hero, gallery, install | None | Copy or go back | All directions returns to the list. Nothing is saved |
| Copy | The command and Copy | Clipboard write, or a visible failure | Use it in the tool | Leaving does not undo a copy |
| Image missing | The alt text | That figure fails alone | Other figures stay | No retry service is invented |

## Decisions

| ID | Decision | Status |
| --- | --- | --- |
| D1 | Astro, static, plain CSS. Vercel root `site` when a deploy is later approved. | Proposed (delegated) |
| D2 | One editorial system (IBM Plex, starter blue). | Superseded by D7 |
| D3 | CSS-only motion. | Superseded by D8 |
| D7 | Three directions: Split, Night, Press. Tokens in `design/tokens-split.css`, `tokens-night.css`, `tokens-press.css`. | Proposed. Owner picks |
| D8 | GSAP ScrollTrigger for one move per direction, under the GSAP standard license, not the MIT pack. | Proposed. The brief asked for it |
| D4 | Install lines live in `src/data/install.js`. | Proposed (delegated) |
| D5 | Favicon is a flat dark square until a logo exists. | Proposed |
| D6 | Public domain is unknown, so `site` in `astro.config.mjs` stays unset. | Unresolved |
| D9 | Steps 3, 4, and 5 wait. The brief said to stop after the preview. | Approved for this pass |

## Open

- Which direction. Owner: Altaz.
- Production domain. Owner: Altaz.
- Logo file. Owner: Altaz.
- IVC 2026 images for Registration search results and Reports. Owner: Altaz. Not on these preview pages.
