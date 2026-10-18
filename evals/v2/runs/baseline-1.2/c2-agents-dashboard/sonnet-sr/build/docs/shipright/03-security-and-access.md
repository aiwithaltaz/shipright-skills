# Security and access

Status: **Unresolved**. Access policy is never delegated. Nothing here is a default.

## What is known

- The screen reads agent status and can change it: approve or decline a request, retry a run, pause, resume. Those are write actions on a company's automated work.
- Actors: the operator. Other roles: Unknown, owner: you.

## What the owner must decide

| Question | Owner | Blocks |
| --- | --- | --- |
| Who may sign in and see the list | you | T2 sign-in |
| Who may approve or decline a request | you | T7 |
| Who may retry a run, pause or resume | you | T7 |
| Whether people see only their team's agents | you | T3 |
| What a denied person sees | you | T7 |

## Build rules until decided

- Read paths and write paths each pass through one server-side function, `canAct(user, agent, action)`. Until the policy exists it denies every action and T7 stays unstarted.
- Hiding a button is never access control. The server checks every request.
- Show a denied person the limit in plain words, no protected content, and a way back (F1).
- Agent names, requests and error text can contain company data. Do not put them in URLs beyond the agent ID, analytics or logs.
- No secrets in front-end code. Environment variable names are listed in [02-technical-architecture.md](02-technical-architecture.md).
