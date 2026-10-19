# Architecture

Status: current

## Screens

| Screen | Job | Primary action | Empty | Loading | Error |
| --- | --- | --- | --- | --- | --- |
| Leads | See who to call next | Add lead | No leads yet, import a CSV or add one | 8 skeleton rows | Could not load leads. Retry |
| Pipeline | Move deals forward | Move deal | No deals, add a lead first | Skeleton columns | Save failed, undo or retry |

## Project rules

- Stack: Next.js, Postgres, tokens.css.
- Folders: app/, components/, lib/, record/.
- Banned: gradient text, purple glow, fake logos.
