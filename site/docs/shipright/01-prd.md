# PRD

**Version:** 1.0.0 site. **Date:** 14 October 2026. **Status:** Proposed (delegated).

## Frame

- **Who:** A person using Claude Code, Cursor, Codex, ChatGPT or another AI coding tool, with an idea for a website, a SaaS app, a mobile app or a 3D site.
- **Job:** Understand what ShipRight is and install the pack.
- **What they do today:** Read the GitHub README.
- **This release:** One page that states the product, the five modes, the safety rules, the real trial images and the install lines, plus a `/design` preview.
- **Out:** Deploy, accounts, pricing, newsletter, blog, dark mode, search, legal pages, and IVC images until the files exist.

## Success checks

- The first screen says what ShipRight is, who it is for, and offers Install.
- The gallery shows the named comparison images and the blind total 93 and 112 of 120, with the trial limits on the page.
- A visitor can copy an install line and see Copied, or follow the zip link.

## Flows

| Step | Visitor sees | Effect | Next | Exit |
| --- | --- | --- | --- | --- |
| Land | Headline, pack table, Install | None | Read or install | Header links stay available |
| Copy | The command and Copy | Clipboard write, or a visible failure | Install in the tool | Leaving the page does not undo a copy |
| Design | Token specimens | None | Wordmark returns home | Wordmark is the exit |
| Gallery image missing | The alt text | That figure fails alone | Other figures stay | No retry service is invented |

## Decisions

| ID | Decision | Status |
| --- | --- | --- |
| D1 | Astro, static, plain CSS. Vercel root `site`. | Proposed (delegated) |
| D2 | Editorial starter, IBM Plex Sans, starter blue. | Proposed (delegated) |
| D3 | CSS motion, not GSAP. | Proposed (delegated) |
| D4 | Install lines in `src/data/install.js`, with skills CLI agent flags. | Proposed (delegated) |
| D5 | Favicon is a flat accent square until a logo exists. | Proposed |
| D6 | Public domain is unknown, so canonical URLs wait. | Unresolved |

## Open

- Production domain. Owner: Altaz.
- Logo file. Owner: Altaz.
- Claude Code plugin install name, when ShipRight 1.1 names it. Owner: Altaz.
- IVC 2026 images for Registration search results and Reports. Owner: Altaz.
