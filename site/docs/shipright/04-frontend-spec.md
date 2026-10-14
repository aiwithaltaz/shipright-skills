# Frontend specification

**Version:** 1.1.0 site preview. **Phase:** Design preview only.

## Screens

| ID | Job | Route |
| --- | --- | --- |
| S0 | Let the owner choose a direction | `/` |
| S1 | Show Split: hero, gallery, install | `/preview/split` |
| S2 | Show Night: hero, gallery, install | `/preview/night` |
| S3 | Show Press: hero, gallery, install | `/preview/press` |

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S0 List

**Job:** Name the three directions without pretending one is chosen.
**Order:** Title. One sentence. Three links: Split, Night, Press. Footer.
**Exit:** Each link opens that direction. Footer links leave the site.
**Copy:** "Three directions. None is approved."

## S1 Split, S2 Night, S3 Press

**Job:** Show a before and after immediately, then the four cases, then the install lines.
**Order:** All directions. Direction name and "proposed". Headline on two lines. One sentence. Install. The hero image. Gallery with the trial note. Install rows.
**Hero images:** Split uses the SaaS desktop comparison. Night uses the 3D re-run. Press uses the marketing grid desktop and phone comparisons.
**States:** Copy default, Copied, and Copy failed. Select the line if copy fails. A broken image keeps its alt text. Other cases stay.
**Responsive:** One column below 760. Press drops the table head and stacks each path. Commands wrap. No sideways page scroll at 390 or 1280.
**Motion:** See DESIGN.md. Text opacity stays 1.
**Copy:** Trial lines from `src/data/gallery.js`. Install lines from `src/data/install.js`.

## Acceptance

- check-ui reports 0 failures at 390 and 1280 for `/`, `/preview/split`, `/preview/night`, and `/preview/press`.
- One h1 per page. One filled Install control on the first screen of S1, S2, and S3.
- The owner has not picked a direction, so none of these pages is the public home.
