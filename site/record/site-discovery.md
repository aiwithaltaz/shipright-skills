# Site discovery

Status: current

Stage 0 on the live ShipRight site (shipright-psi.vercel.app, commit 294b4db, release 1.3.1). Run by Claude on 2026-10-18. Shots: site/evidence/v1.3.1-site/before/.

## Screen table

| Screen | Job | Primary action | Actions | States seen |
| --- | --- | --- | --- | --- |
| Home, run act | Say what ShipRight is | Install ShipRight | 2 buttons, drag | 3D paper stack, still poster, 5 text steps |
| Home, work act | Show a before and after | Drag the bar | 1 slider | One c6 pair |
| Home, process act | Show the steps | Tap a step | 5 buttons | One sentence per step |
| Home, proof act | Show Opus vs ShipRight | None | 0 | 3 baseline 1.2 pairs |
| Home, install act | Install | Copy command | 8 tabs, copy | Copy ok, copy denied |
| Case study | Show what a run writes | Back to home | 2 links | c7 before shots |

## Task walks

| Task | Steps | Where it breaks |
| --- | --- | --- |
| What is this and is it for me? | Read hero, scroll 2 acts | The hero shows blank paper. The page never says what files you get or that it can improve an app you already built. |
| Does it work? | Scroll to proof | The pairs show Opus alone looking stronger, with no explanation. The page repeats "not a grade" or "pending" over and over. |
| Install in Cursor | Install act, tab, copy | Works in 3 steps. |

## Keeps

- K1 Paper, ink and sealing-wax palette, Inter and Fraunces self-hosted. Reason: calm, owned, already passes contrast.
- K2 Headline "Turn an idea into a tested product your AI builds right." Reason: says the job in one line.
- K3 Filled Install button in the hero. Reason: the main action is first.
- K4 Install tabs per tool with one Copy button and a status line. Reason: 3 steps to install.
- K5 Phone Menu button. Reason: the nav stays one row at 390.
- K6 Honest labels on every picture. Reason: the facts ladder.
- K7 The c7 case study page.

## Pains

| ID | What happens | Where | Severity | Cause | How often |
| --- | --- | --- | --- | --- | --- |
| S01 | The hero object is a blank paper stack. No run, no product output. | Home, run | Major | missing feature | Found |
| S02 | The page never lists what a run gives you, or the two ways in (new idea, existing app). | Home | Major | copy | Found |
| S03 | "Not a grade", "pending" or "will not invent a winner" appears 23 times in the page source, including alt text. It reads as defensive. | Whole page | Major | copy, trust | Found |
| S04 | The c6 slider pairs two shots at different scales. The halves do not line up. | Home, work | Major | layout | Found |
| S05 | The proof pairs show Opus alone looking stronger, with no story about why or what changed. | Home, proof | Major | trust | Found |
| S06 | The process act shows 5 words and one sentence. The 11 stages and what each writes are missing. | Home, process | Polish | copy | Found |
| S07 | The older before/after screenshots (0.6.2 vs 1.0, IVC Figma redesign) were dropped. | Home | Major | missing feature | Reported by owner, 2026-10-18 |
| S08 | A 500 kB 3D bundle loads for a paper stack. | Home, run | Polish | performance | Found |
| S09 | No answers to free, license, which tools, does it write code. | Home | Polish | missing feature | Found |

## Missing jobs

- Show a real run, start to finish.
- Show what lands in your folder.
- Answer the basic questions before install.
