# PRD

**Version:** 1.1.0 site. **Date:** 14 October 2026. **Status:** Depth approved.

## Frame

- **Who:** A person choosing Claude Code, Cursor, Codex, VS Code, Antigravity, Gemini CLI, Claude.ai, or ChatGPT, who wants to install ShipRight.
- **Job:** See what the pack changes, then copy an install line.
- **What they do today:** Read the GitHub README.
- **This release finishes:** The Depth home page, with the real comparisons and the 1.1 install lines.
- **Out:** Air, Grid, Split, Night, Press, deploy, accounts, pricing, a blog, search, and legal pages.

## Success checks

- The home page shows a floating nav, open space, and a metal 3D form.
- It shows the real v1.0 comparisons, four short slop lines, empty IVC labels, and the 1.1 install lines.
- Copy reports Copied, or a visible failure, without moving focus.

## Flows

| Step | Visitor sees | Effect | Next | Exit |
| --- | --- | --- | --- | --- |
| Land | Headline, Install, the form | None | Install, gallery, or GitHub | Footer links leave the site. Nothing is saved |
| Compare | 0.6.2 on the left, 1.0 on the right | The range moves the split | Switch Desktop or Phone | Leaving does not save a position |
| Copy | The command and Copy | Clipboard write, or a visible failure | Use it in the tool | Leaving does not undo a copy |
| Image missing | The alt text | That figure fails alone | Other figures stay | No retry service is invented |
| No WebGL | The still image and a sentence | The canvas is removed | Read or install | Text does not depend on the canvas |
| Unknown address | A missing-page heading | None | Back to ShipRight | The footer also leaves |

## Decisions

| ID | Decision | Status |
| --- | --- | --- |
| D1 | Astro, static, plain CSS. Vercel root `site` only after a later deploy approval. | Proposed (delegated) |
| D7 | Split, Night, and Press. | Superseded. Owner rejected them as congested |
| D10 | Air, Depth, and Grid as open previews. | Superseded. Owner picked Depth |
| D12 | Depth is the site. Familjen Grotesk, navy, the shared 4px scale. | Approved. Owner, 14 October 2026 |
| D11 | Vanilla Three.js, GSAP ScrollTrigger, and Lenis. GSAP is not MIT. | Approved. The brief required them |
| D4 | Install lines live in `src/data/install.js`. | Approved for this page |
| D5 | Favicon is a flat navy square until a logo exists. | Approved until a logo file exists |
| D6 | Public domain is unknown, so `site` in `astro.config.mjs` stays unset. | Unresolved |
| D9 | Steps 3, 4, and 5 run on the Depth page. Do not deploy. | Approved. Owner, 14 October 2026 |

## Open

- Production domain. Owner: Altaz.
- Logo file. Owner: Altaz.
- IVC 2026 images for Registration search results and Reports. Owner: Altaz.
