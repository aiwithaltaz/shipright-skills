# Answer key: c7 (IVC desk app, v1 prototype)

**Never show this file to a run agent.** Only the pain-recall grader reads it.
Source: the owner's real review of this exact prototype (September 25 and October 4, 2026), recorded in `examples/ivc-2026-registration/feedback/shipright-learning.md` (F01 to F27) and `feedback/round1-corrections.md`.
The prototype contains fictional people and data. Some items depend on event policy the run could not know; those are marked **Policy** and count only if the run flags the question, not the exact answer.

## Pain points (recall set, 20 items)

| ID | Real pain the owner found | Counts as Found when the run... |
|---|---|---|
| F01 | Oversized sidebar logo and heavy title compete with the work | Says branding is too big for a work screen, or shrinks it |
| F02 | Date, time, venue, fees and shirts repeated and always taking space | Flags repeated reference facts on the desk screen |
| F03 | "Before you begin" panel adds little value | Flags the panel as filler or moves its rules into context |
| F05 | Lookup only by phone; phones can be wrong, unknown or shared | Adds name-based lookup or combinations |
| F06 | A 17-year-old learns about the parent signature too late | Surfaces prerequisites (parent signature) at lookup time |
| F07 | A blocked requirement (Code of Conduct) needs an action right there | Puts the fixing action on the blocked state |
| F08 | Staff may see proof on the attendee's phone and need to record it | Proposes a staff-attested completion with audit (who, when) |
| F09 | Inactive volunteers need facilitator evidence (Policy) | Flags inactive status as a decision with evidence needed |
| F10 | Adults also need a waiver; the prototype skipped it | Finds that adult waivers are skipped or asks about it |
| F11 | The side card should help verify what was entered | Turns the summary panel into a live check of entered details |
| F12 | Child-first entry needs adding a guardian without going back | Supports starting from a child and linking a guardian inline |
| F13 | A volunteer parent should reveal linked children | Shows linked family members when a parent is found |
| F14 | One guardian for several children; the guardian also attends | Handles one guardian across children and as an attendee |
| F15 | Family progress must show each person and let staff revisit them | Per-person progress (done, current, needs attention) |
| F17 | Parent not present needs a usable path | Send link, capture contact, or sign later, with a pending state |
| F19 | Money tendered is not money kept; change must be given | Shows change due; no automatic donation of change |
| F20 | Someone may want to donate without registering | Separate donation-only flow |
| F21 | Pending payment must be visible at search with a direct action | Shows the due amount and Collect payment on the search result |
| F22 | Same direct recovery for every missing condition | Shows all missing conditions and the next fix per person |
| F25 | Who did what and when (creation, verification, payment) | Proposes per-action audit (actor and time) |

## Keeps (what works, 3 items)

| ID | Owner said keep | Counts as Found when the run... |
|---|---|---|
| F04 | Regional context and scoped counts | Lists them as working or keeps them |
| F23 | Clean registrations list, View dialog and ticket preview | Lists them as working or keeps them |
| F26 | Reports structure | Lists reports as working or leaves them unchanged |

## Scoring

- Pain recall = (Found + 0.5 × Partly) / 20.
- Keep recall = Found / 3.
- Also count **false keeps**: items the run calls "working" that the owner asked to change (F01, F02, F03, F05).
- Report these numbers next to the rubric score. They do not change the rubric score.
