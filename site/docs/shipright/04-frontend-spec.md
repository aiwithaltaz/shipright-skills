# Frontend specification

**Version:** 1.1.0 site. **Phase:** Approved Depth home page.

## Screens

| ID | Job | Route |
| --- | --- | --- |
| S1 | Show what ShipRight is, the proof, and how to install | `/` |
| S2 | Recover from an unknown address | `/404` |

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Home

**Job:** Say what ShipRight is, show the real before and after, and copy an install line.
**Order:** Floating nav. Two-line headline, one sentence, Install, metal form. Four slop lines. Four compare sliders. Two empty IVC labels. Install tabs. Footer.
**States:** Copy default, Copied, and Copy failed. A missing image keeps its alt text. No WebGL: the still image stays and a sentence says the 3D view is unavailable. Reduced motion: one still frame, plus Front, Side, and Back.
**Responsive:** One column below 760. Headline stays two lines. Commands wrap. Tabs scroll inside their row. No sideways page scroll at 390 or 1280.
**Motion:** See DESIGN.md. Drag, arrow keys, and scroll turn the form. Reset view clears the drag.
**Copy:** Trial lines from `src/data/gallery.js`. Install lines from `src/data/install.js`.

## S2 Missing page

**Job:** Say the address is wrong and offer a way back.
**Order:** One heading, one sentence, Back to ShipRight. Footer.
**Exit:** The button and the footer links leave the missing page.

## Acceptance

- check-ui reports 0 failures at 390 and 1280 for `/`.
- One h1. One filled Install control on the first screen.
- Air, Grid, Split, Night, and Press are not routes.
