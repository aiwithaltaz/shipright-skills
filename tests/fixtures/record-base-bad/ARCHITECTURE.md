# Architecture

Status: current

## Screens

| Screen | Job | Primary action | Empty | Loading | Error |
| --- | --- | --- | --- | --- | --- |
| Leads | See who to call next | Add lead | No leads yet, import a CSV or add one | Loading... | Something went wrong |
| Pipeline | Move deals forward | Move deal and add note | - | Skeleton columns | Save failed, undo or retry |

## Project rules

- Stack: Next.js, Postgres, tokens.css.
- Folders: app/, components/, lib/, record/.
