# Step 05: Architecture and display data

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 05 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Open [05-architecture.md](../templates/05-architecture.md).
Required headings in 05-architecture.md: Data, Access, Display, Screens.

Define current-release entities, relationships, operations, routes, access boundaries and integration failures. Enforce access on the server. Secrets are names only. State retention and destructive effects require evidence, not assumptions.

Add a display contract per field: meaning, formatter, units, precision, locale, missing value and freshness. Distinguish null, undefined, empty string, 0, false, not applicable and failed retrieval. Absent owner can be Unassigned; failed retrieval is an error, never zero.

In ARCHITECTURE.md keep Stack, Data, Access, Integrations, Secrets and Costs. Costs are sourced or Assumed, never invented. Keep Screens with Screen, Job, Primary action, Empty, Loading and Error, plus Project rules with Stack, Folders and Banned lines. Run check-record --base.

Website stack: existing code wins; choose a content stack for reading and a scene stack only for a justified product demonstration. Explain each motion dependency and its fallback. Do not mandate a 3D stack for a public website.

## Record

Reuse the router's decision summary. Update only changed project-record fields.

## Gate

The template answers the decisions above with evidence or explicit unknowns. No new features or facts were invented. Record updated.
