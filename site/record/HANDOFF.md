# Handoff

Status: current

## Where we are

- Site rebuild for 1.3.1 is on branch feat/site-1.3.1-run. Built and tested. Not deployed to production.
- All 9 Now items in site-pain-map.md are built. Each has a CHANGELOG row.

## Done

- Discovery, pain map, three options, layout spec, build, stage 9 checks.
- Before shots: site/evidence/v1.3.1-site/before/. After shots: site/evidence/v1.3.1-site/after/.

## Next

- Owner reviews the preview and says "push it", or sends changes.
- When 1.3 eval runs are graded, replace the proof status line with the real table.
- A real c7 run with ShipRight 1.3, then pain recall, then after shots for the case study.

## Open decisions

- D4 to D8 are Proposed. D1 and D2 (case study) are still Proposed.
- Whether the case study may name the client.

## How to run

- cd site, npm ci, npm run build.
- Checks: see site/README.md, Stage 9.

## Verified

- The before shots exist. The pain count and the keep count match the answer key.

## Not verified

- Any improvement on the c7 desk. Any score. Taste on the new site, until a fresh reviewer looks.
