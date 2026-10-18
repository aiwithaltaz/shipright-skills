# Fleet — AI Agent Control Room
Product brief · v1 · decisions made on the founder's behalf ("you decide")

## The problem
Companies now run dozens to hundreds of AI agents across departments (support, sales, finance, engineering, legal, HR). Each agent was launched by a different team, uses different tools and models, and fails in its own quiet way: a broken API, a loop that burns money, a queue of steps waiting for a human that nobody sees. Nobody has one place that answers **"Is our agent workforce healthy, what is it costing, and where does a human need to step in?"**

## Decisions (defaults chosen)
| Question | Decision | Why |
|---|---|---|
| Primary user | **AI Ops / Platform lead** (owns the fleet day to day) | They feel the pain daily and act on it; execs and dept heads are secondary readers of the same data |
| Secondary users | Department owners (see their agents), Finance/exec (spend + value) | Same screen, filtered by department |
| Agents in scope | Internally built agents plus third-party agents that emit run logs | Mixed fleets are the norm |
| #1 question | "What needs my attention right now?" | Health and approvals beat vanity metrics |
| Scale for design | ~60–500 agents, 6–10 departments | Must stay readable at 500 rows (filter, sort, search) |
| Actions | Yes, a few safe ones: **Pause / Resume, Approve / Reject pending step, Set spend cap** | A dashboard you can't act from becomes a tab nobody opens |
| Data source | Agents send run events (start, tool call, finish, cost, escalation) to one ingest API | Simple, vendor-neutral contract |
| Look | Calm, dense ops tool, light + dark, system fonts | Lives open all day on a second monitor |

## Jobs to be done
1. **Triage** — See what is broken, looping, overspending or blocked, ranked by severity, and fix it in one or two clicks.
2. **Unblock humans-in-the-loop** — See pending approvals and how long they've waited.
3. **Watch the fleet** — Find any agent fast; see status, volume, quality, cost and trend.
4. **Control spend** — Today's spend vs budget, by department, with early warning before a budget blows.
5. **Prove value** (later) — Tasks completed, human hours saved, cost per task.

## What success looks like
- Mean time to detect a failing agent < 5 min (alert surfaces in the attention queue).
- Mean time to act < 2 min from opening the dashboard (pause / approve inline).
- Approvals waiting > 30 min drop by half within a month of rollout.
- The ops lead keeps it open all day (daily active use by the owner team).

## Out of scope for v1
- Building or editing agents (prompts, tools) — link out to where they're built.
- Full trace debugger (step-by-step run replay) — v2; v1 links to raw logs.
- Billing / invoicing, multi-company tenancy, mobile app.

## Risks and honest caveats
- **Data quality is the product.** If agents don't emit consistent events (cost, outcome, escalation), every chart lies. The ingest contract must ship first.
- **"Success rate" is easy to fake.** v1 defines it narrowly: task finished with no error and no human escalation. Real quality needs sampling/evals later.
- **Pause must be real.** The pause button needs a kill switch the agent runtime actually honors, with an audit log.
- **Alert fatigue.** Start with 5 alert rules, tune thresholds per agent before adding more.
