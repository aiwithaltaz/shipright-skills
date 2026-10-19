# Stage 10: Ship check

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 10 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Launch readiness, not a new design pass. Open [ship-check.md](../templates/ship-check.md).
Required headings: Items, Verdict, Limits.

Follow [ship-check mode](../modes/ship-check/MODE.md) for the 20 items and the evidence rules. If there is no URL, build, or screenshot, ask one question for that artifact and stop.
Every item is Pass, Fail, Not verified, or Not applicable, with evidence. Needs decision is a verdict, not an item status.
**Deadline rule:** urgency does not change evidence.
Readiness does not authorize deployment, publication, or payment. Nothing ships without the owner's OK.

## Security, preview, monitoring

In HANDOFF.md add `## Security` (access control, input validation, OWASP Top 10), `## Preview and QA` (preview URL, screens and states tested) and `## Monitoring` (errors, latency, and an Owner: line). Run `node <skill>/scripts/check-record.mjs <record> --base --ship`.

## Record

Update HANDOFF.md: what is verified, what is not, and the next check. Do not mark the product Approved because the table is full.

## Gate

20 items have a status and evidence. Critical gaps are named. Record updated.
