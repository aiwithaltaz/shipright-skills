# Technical architecture

All choices are **Proposed**. "Current stable version" for every package. The user has named no tool or codebase, so the stack follows the data-heavy dashboard default. Build tool: any coding tool that reads `AGENTS.md`.

## Stack

| Choice | Reason | Switch when |
| --- | --- | --- |
| Next.js (App Router), TypeScript | One stack coding tools know well. Server code for the access check sits next to the pages. | You only need a static page: use Vite. |
| Tailwind CSS with `design/tokens.css` variables | Tokens stay in one file. | You already have a CSS system. |
| shadcn/ui on Radix: Dialog as the drawer, Select, Tooltip | Focus trap, Escape and focus return come built in. | Your own system supplies these. |
| TanStack Table | Row rendering and filtering for the list. | Over about 10,000 rows on screen: virtualize. Over about 200 agents: move search and filters to the server. |
| Sample data in `data/agents.sample.json` behind `getFleet()` | The real data source is Unknown. A swappable function keeps T2 to T6 unblocked. | The source is known: replace the function body only. |
| No database, no auth service, no realtime in this release | None has a job yet. | Access policy and source are decided: add auth first, then storage if the source needs it. |
| Static hosting or Vercel preview | Free tier is enough for a preview. Never deploy without your OK. | Real company data: choose a host that fits your data rules. |

## Data model (objects from the PRD only)

- **Agent:** `id`, `name`, `purpose` (one short line), `team`, `status` (Running, Waiting for you, Failed, Paused, Idle), `statusDetail` (plain words for the Current work column), `lastActiveAt`, `pausedFrom` (status before the pause).
- **Request** (zero or one open per agent): `id`, `agentId`, `summary`, `detail`, `askedAt`.
- **Run** (recent four per agent): `id`, `agentId`, `startedAt`, `outcome` (Completed, Failed, Running), `summary`.

Cardinality beyond this and retention: Unknown, owner: platform owner.

## Routes

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | S1 | List. Search, team and status control live in query params `q`, `team`, `view`. |
| `/?agent={id}` | S2 over S1 | Opens the drawer. Back closes it. Unknown ID shows "That agent was not found." with a Close control. |
| `/api/fleet` | none | Returns agents. Server-side check first. |
| `/api/agents/{id}/{action}` | none | Actions: approve, decline, retry, pause, resume. Idempotent on repeat. Blocked until T7. |
| Not found | 404 | Plain page with a link to `/`. |

Search text is a private query: keep `q` out of analytics and logs.

## Access

Unresolved. See [03-security-and-access.md](03-security-and-access.md). Default is deny.

## Environment variables (names only)

`AGENT_SOURCE_URL`, `AGENT_SOURCE_TOKEN`: only when the source is known, server side only. Never in front-end code.

## Performance budget

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile, measured on real pages. The drawer code loads with the page; no third-party scripts, no web fonts in release 1 (system font stack).

## Risks

- **Stale data looks live.** A monitoring screen that is out of date is worse than none. Until the update mechanism is known, no freshness label is shown (D9). Decide this before launch.
- **Wrong status mapping.** If the platform has more states than five, an agent can look Idle while it is stuck. Map every platform state in one function and fail loudly on an unknown one.
- **Action sent twice.** Disable the control while a request is in flight and keep the server idempotent.
- **Scale.** The preview shows 29 sample agents. Real fleets can be larger. The switch point above applies.
