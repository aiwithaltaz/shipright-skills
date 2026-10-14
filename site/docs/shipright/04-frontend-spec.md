# Frontend specification

**Version:** 1.1.0 site preview. **Phase:** Design preview only.

## Screens

| ID | Job | Route |
| --- | --- | --- |
| S0 | Let the owner choose a direction | `/` |
| S1 | Show Air | `/preview/air` |
| S2 | Show Depth | `/preview/depth` |
| S3 | Show Grid | `/preview/grid` |

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S0 List

**Job:** Name Air, Depth, and Grid without pretending one is chosen.
**Order:** Title. One sentence. Three links. Footer.
**Exit:** Each link opens that direction. Footer links leave the site.

## S1, S2, S3

**Job:** Give the direction room, show a live 3D hero, then the proof and the install lines.
**Order:** Floating nav. Headline, one sentence, Install, 3D stage. Four slop lines. Four comparisons, one image each. Two empty IVC labels. Install rows. Footer.
**States:** Copy default, Copied, and Copy failed. A broken image keeps its alt text. No WebGL: the canvas goes away and the headline stays.
**Responsive:** One column below 760. The nav stays one row if it fits. Commands wrap. No sideways page scroll at 390 or 1280.
**Motion:** See DESIGN.md.
**Copy:** Trial lines from `src/data/gallery.js`. Install lines from `src/data/install.js`.

## Acceptance

- check-ui reports 0 failures at 390 and 1280 for `/`, `/preview/air`, `/preview/depth`, and `/preview/grid`.
- One h1 per page. One filled Install control on the first screen.
- The owner has not picked a direction.
