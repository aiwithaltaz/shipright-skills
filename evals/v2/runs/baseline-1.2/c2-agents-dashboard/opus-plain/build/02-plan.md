# Fleet — Full plan
Information architecture, main screen spec, data model, and build phases.

## 1. Information architecture
| Area | Purpose | v1? |
|---|---|---|
| **Overview** (main screen) | Attention queue, KPIs, volume + spend charts, fleet table, live activity | **Built now** |
| Agents | Full fleet list + agent detail page (runs, tools, permissions, owner, versions) | v1 (detail starts as the drawer on Overview) |
| Approvals | Inbox of steps waiting for a human, with SLA timers | v1 |
| Runs | Searchable run log; link to raw traces | v1 basic, v2 trace replay |
| Spend | Budgets per department and agent, caps, forecasts | v1 basic |
| Policies | Alert rules, autonomy levels, spend caps, kill switch | v1.5 |
| Settings | Users, roles, API keys, integrations | v1 |

## 2. Main screen (Overview) — layout, top to bottom
1. **Top bar**: page title, time range (Today / 7 days / 30 days), department filter, search, theme toggle.
2. **Needs attention** (most important panel, first thing you read). Ranked list, severity = critical / serious / warning, each with icon + label (never color alone), what happened, since when, and 1–2 inline actions (Pause, Set cap, Review). Resolved items leave the list with an undo toast.
3. **KPI row** (5 tiles): Agents running · Tasks completed · First-pass success · Spend vs budget · Waiting on a human. Each with comparison to the previous period.
4. **Charts**
   - *Tasks completed over time* — line, current period vs previous period (2 series, legend + direct labels, hover crosshair).
   - *Spend by department* — horizontal bars with a budget-pace marker per department; hover tooltip; "over pace" text flag.
5. **Agent fleet table** — status chips filter (All / Needs attention / Running / Idle / Paused), sortable columns: Agent + department, Status, Autonomy level, Tasks, Success, Cost, 24h trend sparkline, Owner. Row click opens the **agent drawer**.
6. **Agent drawer** — status, owner, model tier, autonomy, key stats, recent runs, tools it can use, and actions (Pause/Resume, Set spend cap).
7. **Live activity** — streaming feed of notable events (completions, hand-offs, errors) with pause control. Sits beside the attention queue so "right now" lives in one row.

All panels respect the department filter. The time range drives the KPIs and both charts; the fleet table always shows today (live). Multi-day comparisons are weekday-aligned (30 days is compared with the same days 4 weeks earlier), and the in-progress hour/day is left off the line so it doesn't fake a drop.

## 3. Definitions (so numbers mean one thing)
- **Running**: agent processed a task in the last 15 min and is not paused.
- **Task completed**: run ended with outcome `success` or `escalated_resolved`.
- **First-pass success**: `success` ÷ all finished runs (no error, no human escalation).
- **Waiting on a human**: runs in `awaiting_approval` state right now.
- **Spend**: model tokens + tool/API costs attributed to the run.
- **Budget pace**: daily budget × fraction of the day elapsed.

## 4. Autonomy levels (shown on every agent)
- **L1 Suggest** — drafts only, human sends.
- **L2 Approve** — acts after a human approves each risky step.
- **L3 Autonomous** — acts alone within caps; audited.

## 5. Alert rules v1 (feed the attention queue)
1. Failure rate > 3× its 7-day baseline over 30 min → critical.
2. Spend today > 2.5× usual by this hour (likely loop) → serious.
3. Approval waiting > 30 min → warning.
4. Escalation rate > 2× baseline → warning.
5. Agent silent > 2 h during its normal working hours → warning.

## 6. Data model (minimum)
- `agent` (id, name, department, owner, model_tier, autonomy, status, daily_cap, version)
- `run` (id, agent_id, started_at, ended_at, outcome, cost_usd, tokens, escalated, error_code)
- `approval` (id, run_id, requested_at, decided_at, decided_by, decision)
- `alert` (id, agent_id, rule, severity, opened_at, resolved_at, resolved_by)
- `budget` (department, period, amount_usd)
- `audit_log` (actor, action, target, at) — every pause / approve / cap change

## 7. Architecture (recommended)
- **Ingest**: one HTTPS endpoint + SDK snippet agents call on run start/finish/escalate.
- **Store**: Postgres (agents, approvals, alerts) + a time-series rollup table (per agent per 5 min).
- **App**: web front end polling every 10–15 s (websocket later); role-based access (Admin, Owner, Viewer).
- **Control**: pause/caps written to a `control` table the agent runtime checks before each run.

## 8. Build phases
| Phase | Scope | Exit criteria |
|---|---|---|
| 0 · Prototype (this) | Clickable Overview with realistic fake data | Founder + 3 ops leads react to it |
| 1 · Data contract | Ingest API + SDK, 5 real agents reporting | Numbers on screen match logs |
| 2 · Overview live | KPIs, charts, table, attention queue on real data | Used daily by one ops team |
| 3 · Act | Pause/resume, approvals inbox, spend caps, audit log | Every action logged and reversible |
| 4 · Value | Hours saved, cost per task, department reports | Monthly exec report generated from it |

## 9. Validation plan
- Show the prototype to 5 people who run agents in production; ask them to find "the agent that's burning money" and "the oldest pending approval" — time it.
- Ask which KPI tile they'd delete. Delete it.
