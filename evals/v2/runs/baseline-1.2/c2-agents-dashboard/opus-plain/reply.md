Done. I made the calls myself, wrote up the plan, and built the main screen. Here's what you've got.

## What I decided
- **Who it's for:** the AI Ops / platform lead who keeps the agent fleet healthy. Department heads and execs read the same screen through a department filter.
- **The one question it answers:** *"What needs me right now?"* So the screen opens with a ranked **Needs attention** queue, not vanity charts.
- **You can act from it**, not just look: pause an agent, set a daily spend cap, approve or reject steps waiting on a human. Every action has an undo.
- **Scale:** designed for 50 to 500 agents across 6 to 10 departments. The demo company, "Northwind Co.", runs 50 agents in 8 departments.

## The main screen (`index.html`)
- **Needs attention:** ranked by severity, with an icon and label on each item so it never relies on color alone. The demo items are a failing agent (an ERP API is down), a likely retry loop that's burning money, approvals waiting over 30 min, a jump in hand-offs to humans, and an agent that went quiet. Fix buttons sit inline.
- **Live activity:** a running feed of what agents are finishing, handing off or failing on. You can pause it.
- **5 KPIs:** agents active, tasks completed, first-pass success, spend vs budget (with a pace marker), and a count of items waiting on a human that you can click.
- **Charts:**
  - Tasks over time against last week, with hover details.
  - Spend by department, with a "budget pace" marker so you see overspend before the day ends.
- **Agent fleet table:**
  - Filter chips, search and sortable columns.
  - Status, autonomy level (L1 Suggest / L2 Approve / L3 Autonomous), tasks, success, cost, a 24-hour trend line and owner.
  - Click a row to open a side panel with stats, recent runs, tools, a spend cap and pause/resume.
- **Approvals inbox:** oldest first, with Approve and Reject.
- **Controls:** Today / 7 days / 30 days, a department filter, and a light/dark switch. It works on mobile.

## Planning docs (in `build/`)
- **01-product-brief.md:** the problem, the decisions above, jobs to be done, success metrics, what's out of scope, and the risks.
- **02-plan.md:** the full screen map, the main screen spec, metric definitions, alert rules, data model, recommended architecture and a 5-phase build plan.

## Two caveats
1. **Everything on screen is demo data.** The clock is pinned to 14:20 so the story stays the same every time you open it. The real product depends on every agent reporting the same events: start, finish, cost, outcome and hand-off. That reporting setup is phase 1 in the plan. Without it, every chart is unreliable.
2. **"Success rate" here is a narrow measure:** the task finished with no error and no human hand-off. Measuring real quality takes spot-checking or automated evals later. Don't let the number oversell itself.

## Next step
Show it to 3–5 people who run agents in production. Time how long it takes them to find "the agent that's burning money" and "the oldest pending approval." Then ask which KPI tile they'd delete, and delete it.
