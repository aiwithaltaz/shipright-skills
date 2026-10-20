# Step 03: PRD and scope

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 03 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Open [03-prd.md](../templates/03-prd.md).
Required headings in 03-prd.md: Outcome, Requirements, Risks.

Write a short PRD: the outcome, core loop, this release, non-goals and requirement IDs with acceptance checks. Each screen and visible region must support one of those requirements.

Keep risk rows for integration failure, empty or huge data, abuse/access and growing cost. Each has a decision and a test. Unknown access, destructive effects and prices stay unresolved; do not invent defaults. For third-party features, record Allowed, Risky or Banned with source/date when evidence exists, otherwise Not verified. A banned feature is removed, not hidden behind a toggle.

List Needed, Not needed or Later surfaces with a reason. Keep first-use, no results, restricted, loading and failure distinct. Preserve F1 exit, F2 consistency and F3 useful status. Record only changed decisions in DECISIONS.md.

## Record

Reuse the router's decision summary. Update only changed project-record fields.

## Gate

The template answers the decisions above with evidence or explicit unknowns. No new features or facts were invented. Record updated.
