# Stage 3: Problem solving

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 03 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Find the hard problems and answer each one. Open [risks.md](../templates/risks.md).
Required headings: Risks, Platform verdict, Required rows.

A risk without a decision is a wish. "Monitor" and "TBD" are not decisions.

## Columns

Risk, type, how likely, how bad, design or tech decision, test that proves it.
Type is one of: platform, abuse, failure, edge case, money, data and privacy, cost, season or time, people.

## Required rows

Every product gets these, even if the answer is short:

- The main integration fails (API down, timeout, bad payload). What does the user see, and what is saved?
- Data is empty, huge, or wrong. What is on screen?
- Who could abuse it, and how is that limited?
- Which costs grow with usage, and what is the cap?

## Platform verdict

When a third-party platform is involved (a social network, a payment provider, an app store), add a row per planned feature: Allowed, Risky, or Banned, with the source and date. A banned feature does not ship behind a toggle. Change the concept instead.

## Decisions

Each decision is concrete: a limit, a state, a copy line, a server check, or a cut from the first release. Write the test that would fail if the decision is ignored.
Unknown access, destructive effects, and prices stay unresolved. They cannot become defaults. See the operating contract.

## Record

Add each hard problem to CHALLENGES.md when you meet it while building. The risk row is the plan. The challenge row is what actually happened.
Required headings in CHALLENGES.md: Rows.

## Gate

Every risk row has a decision and a test. No row says "monitor" or "TBD". Platform features have a verdict when a platform is in scope. Record updated.
