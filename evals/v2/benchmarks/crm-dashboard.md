# Product benchmark: B2B CRM dashboard (fixed prompt)

Added in 1.4. Idea from the Muzli 2026 review (https://medium.muz.li/6-best-ai-ui-design-tools-i-tested-with-the-same-prompt-2026-review-b68309af284a): give every tool the same multi-screen product prompt, because landing pages are easy and real products test hierarchy, navigation and workflows.

Use the prompt as is. One try. No extra hints. Run it with and without ShipRight and compare.

## Prompt

```text
Design and build a B2B CRM dashboard for a small sales team (5 to 20 people) that sells yearly software contracts.
It needs these 8 areas, connected by one navigation:
1. Overview
2. Leads
3. Pipeline
4. Team analytics
5. Revenue
6. Tasks
7. Notifications
8. Settings
Use realistic sample data and label it as sample. Make it work at 1280 and 390 wide.
```

## Rubric (score each 0 to 4, judge from screenshots plus the record, blind to which run used the skill)

| Area | 0 | 4 |
| --- | --- | --- |
| UX thinking | Pretty screens, no jobs | Each screen has one job and one primary action, written in the record |
| Information architecture | 8 tabs with no grouping | Grouped nav, clear current place, labels match user words |
| Flows | Screens do not connect | Lead to deal to task flow works by click, with back paths |
| States | Only the happy path | Empty, loading and error exist for every list and chart, each error has a way out |
| Design quality | Generic kit, same card everywhere | One direction, real hierarchy, numbers readable, passes check-ui |
| Phone | Desktop squeezed | Thumb-reach actions, 44px targets, nav fits one line or a menu |
| Honesty | Invented customers or growth claims | Sample data labeled, no fake logos or scores |

## Machine checks

- `node <skill>/scripts/check-record.mjs <record> --base` passes (idea brief, screens with states, project rules).
- `node <skill>/scripts/check-ui.mjs <each screen>` has 0 FAIL.
- `node <skill>/scripts/crawl.mjs <index.html>` reaches all 8 areas with no console errors.

## Results

None yet. Scores are added only from real runs.
