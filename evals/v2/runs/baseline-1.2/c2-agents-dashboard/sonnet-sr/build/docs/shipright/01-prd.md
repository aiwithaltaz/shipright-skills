# PRD: Agent Desk (working name)

Version 0.1. Phase: release 1, watch and act. Every choice below the frame is **Proposed (delegated)** unless marked otherwise. The user said "You decide everything" after intake.

## Frame

- **Who:** the person at the company who watches the AI agents and steps in when one needs a human. Role title and headcount: Unknown, owner: you.
- **Job:** know which agents need a person right now, open one, and act on it.
- **Today:** Unknown, owner: you. No claim is made about the current tools.
- **This release finishes:** one screen where the operator sees every agent, the ones that need attention come first, and the operator can approve or decline a request, retry a failed run, or pause and resume an agent.
- **What stays out:** see "Not in this release".

## Jobs and success checks

| ID | Job | Observable success check |
| --- | --- | --- |
| J1 | See what needs me | On load, with no clicks, agents that are Failed or Waiting for you are listed first and counted in the Needs attention control. |
| J2 | Open one agent | One click or Enter on an agent name opens its detail panel, and Close or Escape returns to the same row. |
| J3 | Act on a request or failure | From the panel, the operator approves or declines a request, or retries a failed run, and the list row shows the new status without leaving the page. |
| J4 | Stop or restart an agent | Pause agent changes the status to Paused and offers Undo. Resume agent restores it. |
| J5 | Find one agent among many | Typing part of a name or choosing a team narrows the list and shows how many match. Clearing removes only those criteria. |

## Screens

| ID | Name | Route (Proposed) | Serves |
| --- | --- | --- | --- |
| S1 | Agents list | `/` | J1, J5 |
| S2 | Agent panel (drawer over S1) | `/?agent={id}` | J2, J3, J4 |

State of S1 and S2 only. There is no third screen in this release.

## Status vocabulary (Proposed)

Running, Waiting for you, Failed, Paused, Idle. Needs attention means Failed or Waiting for you. The real platform's statuses are Unknown, owner: whoever runs the agent platform. Map them to these five in one place.

## Not in this release

Cost and budgets. Charts and trend views. Activity feed. Creating, editing, deleting or configuring agents. Logs and run transcripts. Bulk actions. Alerts and notifications. Multiple companies or workspaces. Dark mode. Saved views. Column sorting.
These are notes, not UI, routes or data tables.

## Roles

Who may approve, decline, retry or pause is an access policy. It is **Unresolved**, owner: you. Not delegated. See [03-security-and-access.md](03-security-and-access.md).

## Decision log

| ID | Decision | Status | Source |
| --- | --- | --- | --- |
| D1 | Release is an operator triage screen, not an executive overview | Proposed (delegated) | Intake Q1 |
| D2 | Watch and act only; no cost, no charts | Proposed (delegated) | Intake Q2 |
| D3 | Calm dense light direction with a teal accent | Proposed, awaiting owner approval | Intake Q3, [design-preview.md](design-preview.md) |
| D4 | Pause is reversible, so it uses Undo, not a confirm dialog | Proposed | Operating contract, interaction rules |
| D5 | Decline asks for inline confirmation, because it ends a run and is not undone by the dashboard | Proposed | Same |
| D6 | Pause is not offered while a request is open | Proposed, behavior Unknown | Platform owner to confirm |
| D7 | Resume restores the status before the pause | Proposed, behavior Unknown | Platform owner to confirm |
| D8 | Decline ends the current run and the agent shows Idle | Proposed, behavior Unknown | Platform owner to confirm |
| D9 | No freshness indicator or Refresh control until the update mechanism is known | Proposed | A "Updated" label would be unsupported |

## Open questions (match the reply)

1. **Access policy.** Who can approve, decline, retry, pause? Owner: you. Blocks T7 only.
2. **Where agent status comes from.** The agent platform, its API, how fresh the data is. Owner: you or the platform owner. T2 uses sample data behind one function until known.
3. **What Decline, Pause and Resume really do** on your platform (D6 to D8). Owner: platform owner.
4. **Real teams, agent names and status names.** All data in the preview is sample data.
5. **Brand.** A name, logo or Figma file replaces the working name and the Proposed look.
