# Skill dry-runs

These checks compare written skill behavior. They are not a model benchmark and they do not prove a client install.

Say who scored the run, which pack version they read, and the date.
Do not edit an older report so the new score looks better.

## Prompts

Copy the raw prompts in [prompts.md](prompts.md).
Two ideas: a small-business booking app, and an internal order desk.
Run all four skills. Do not carry one skill's answer into the next skill.

## Rubric

Score each skill on each idea. Five checks, 0 to 2. Skill max is 20. Pack max is 80.

| Check | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Q. Questions | More than 5, or none when the idea is still vague | Right topic, missing examples or Let me decide | 0 when the task is already clear, otherwise 3 to 5 cards with an example and Let me decide |
| S. Stop | Full docs, flows, or a finished screen arrive before the frame | Questions and a large draft in the same reply | Cards only on a vague idea, then the real work. No extra stop after each file |
| D. Deliverable | Wrong artifact for that skill | Partial | Product frame and requested docs, a screen spec, a critique, or launch evidence |
| U. Invention | New features, people, metrics, quotes, or legal text | A few extras | Only the current job. Unknown stays Unknown |
| F. Format | No shape a later run can match | Some of the shape | Decision cards, four statuses, or a finding with location, severity, correction, and retest |

A clear fix may score 2 on Q with zero questions. That is correct.
Write the first reply you would actually send, then the score, then one sentence on the weak spot.

## Reports

Before editing skills, write `tests/reports/YYYY-MM-DD-baseline.md`.
After editing, write `tests/reports/YYYY-MM-DD-after.md` with the same rubric.
Keep both files.

## Before and after screenshots

Do this for every skill whose instructions changed.

1. Pick one test idea.
2. Build the same screen twice, at phone width 390 by 844 or a normal desktop width. Once as the old skill would allow it. Once as the new skill would allow it.
3. Both sides need real layout, spacing, and a named font. The before side should look like polished generic UI: a gradient, invented stats, two competing buttons, unlabeled fields. The after side should show the task: clear hierarchy, labeled fields, one primary action.
4. If the skill's output is questions, a critique, or a check list, render that as a card or chat screen. Do not paste plain text.
5. Save the pages under `tests/fixtures/<version>/<skill>/before.html` and `after.html`.
6. Screenshot each. Save `examples/before-after/<version>/<skill>/before.png` and `after.png`.
7. Build `compare.png` in that same folder, before and after side by side, narrow enough that a README does not shrink the type away.
8. Open every PNG and look at it. If type fell back to the browser default, or spacing collapsed, the CSS did not apply. Fix it before you commit.
9. Link the pair, and the side-by-side image, from the CHANGELOG entry and from the README section `How it improved`.
10. Add a new version folder. Do not replace older screenshots.
11. Use sample labels. The after screen must not invent ratings, quotes, prices, customers, or legal pages.

Capture command, from the pack root:

```bash
sh tests/capture.sh 0.6.2
```

The script writes the HTML, screenshots it with headless Chrome, and builds the side-by-side images.
State in the after report that the screenshots illustrate the written rules. They are not a second model's output.

Save examples/before-after/ only after the PNG files exist. README links must resolve.
