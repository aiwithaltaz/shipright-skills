# ShipRight history

**Version 1.2.0**

This note keeps older eval results out of the start page. It does not change those results, and it is not a new grade. Draft 1.3 is not released.

## Blind scores, 0.6.2 against v1.0

Same four requests, run by fresh agents with the old pack (0.6.2) and the new pack, then graded blind by separate agents who did not know which was which.

| Case | 0.6.2 | v1.0 |
| --- | ---: | ---: |
| SaaS dashboard | 24 | 29 |
| Mobile form flow | 24 | 29 |
| Marketing site | 22 | 28 |
| 3D product site | 23 | 26 (after fix; first run 19, see below) |
| **Total of 120** | **93** | **112** |

The first final 3D run hid its content behind a scroll animation and was marked unshippable. The motion rule and the checker were fixed, and a fresh blind re-check scored 26. An earlier trial after Phase 3 scored 107 against 94.

Replies got about half as long. Build packs got about a quarter shorter.
Full results and limits: [final trial](../evals/v1/results-final.md) and [Phase 3 trial](../evals/v1/results-phase-3.md).

**SaaS dashboard.** More projects visible, each with its next deadline and budget, in one calm table. The comparison image is examples/before-after/v1.0/saas-dashboard/compare-desktop.png. That file is not in this zip.

**Marketing site.** No pill badge or glow. The real beta terms and steps are on the first screen. The comparison image is examples/before-after/v1.0/marketing-site/compare-desktop.png. That file is not in this zip.

**3D product site.** The comparison image is the re-run after the motion fix, not the first final run (which scored 19 and hid its content). Path: examples/before-after/v1.0/3d-product-fixed/compare-desktop.png. That file is not in this zip. Buy is in the hero, view buttons sit under the model, and it uses a working name instead of placeholders.

**Mobile form flow.** Phone comparison path: examples/before-after/v1.0/mobile-form/compare-phone.png. That file is not in this zip. Phase 3 images sit in examples/before-after/v1.0-phase-3/.

These are actual generated outputs from identical frozen prompts, not authored illustrations.
Earlier phases keep their own folders under examples/before-after/. One 0.6.2 comparison is examples/before-after/0.6.2/ui-ux-design/compare.png. That file is not in this zip.
