# Frontend specification

**Version:** 1.0.0 site. **Phase:** Public site.

## Screens

| ID | Job | Route |
| --- | --- | --- |
| S1 | Explain ShipRight and offer install | `/` |
| S2 | Show the proposed system before treating it as settled | `/design` |

## Navigation

Wordmark to `/`. Pack, Gallery, Install, Design. Design is current on S2. Footer: GitHub, Changelog, Releases, Credits, MIT license.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Home

**Job:** Say what it is, show the proof, let the visitor copy an install line.
**Order:** Headline and sentence. Install, then See the gallery. Pack table. Modes. Safety. Slop lines. Scores and gallery. IVC slots. Install rows. Closing line.
**States:** Copy default, Copied, and Copy failed. Select the line. IVC slots say the image is not added yet. A broken image keeps its alt text.
**Responsive:** One column below 760. Commands wrap. Phone shots cap at 640. No sideways page scroll at 390 or 1280.
**Copy:** Real lines from the pack and the trial. No invented quotes or counts.

## S2 Design

**Job:** Show type, color, space, controls, fields and motion.
**Order:** Status sentence. Type. Color table. Spacing. Controls. Default field, then a labeled error field. Motion note.
**States:** Primary, secondary, disabled, focus ring, valid field, error field. Sample values are labeled as samples.
**Exit:** Wordmark returns to S1.
**Do not add:** a second brand, dark mode, or icons.

## Acceptance

- check-ui reports 0 failures at 390 and 1280 for both routes.
- One h1 per page. One filled button in the first screen of S1.
- Install text matches `src/data/install.js`.
