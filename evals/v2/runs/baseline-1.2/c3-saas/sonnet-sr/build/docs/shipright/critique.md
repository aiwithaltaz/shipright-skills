# UX critique: index.html (S1 Schedule, S2 Invoices, S3 to S5 overlays)

Artifact: `index.html` preview, 16 Oct 2026, static page with sample data. Stage: implementation of a preview (no back end). Evidence: Chromium through Playwright at 320, 390, 768, 1000, 1100, 1280 and 1536 wide, source reading, and a scripted keyboard walk. The pack's `scripts/check-ui.mjs` is not in this pack copy, so the pack is incomplete for that step. I measured the same rules myself: horizontal overflow, text contrast on every text node, target size, console errors, focus return.

## Fixed in the loop (3 rounds)

| # | Finding | Severity | Fix | Retest |
| --- | --- | --- | --- | --- |
| 1 | S2 showed 13 filled "Invoice this job" buttons, breaking one filled button per view (F2). | Major | Row action is secondary. | Pass, visible in screenshot. |
| 2 | Sample data made 13 jobs "not invoiced" and put done jobs in the past under "Needs a crew". Noise hid the real signal and implied a crew-less job was finished. | Major | Seed has 5 not-invoiced jobs; crew-less jobs sit on upcoming days. | Pass: summary reads "5 finished jobs not invoiced". |
| 3 | Phone drawer left a 34 px gap on the left, so it was not a full sheet. | Major | `max-width:100%` on the drawer. | Pass at 390. |
| 4 | Phone form dialog hid its Cancel and Save job buttons below the scroll. | Blocker on phone (F1) | Form is a flex column; only the body scrolls. | Pass at 390: footer stays visible. |
| 5 | Schedule scrolled sideways at 320 (367 wide). | Major | Toolbar buttons wrap; nav counts hide on phones. | Pass: 320 shows no overflow on both screens. |
| 6 | Customer name buttons in S2 were 20 px tall. | Polish | 32 px minimum. | Pass: no target under 24 px. |
| 7 | An Undo toast opened inside the drawer would sit behind the modal and be unreachable. | Major | No Undo in the drawer; the drawer has "Mark as not paid". | Pass by source. |

## Checks that pass

- Contrast: every rendered text node meets 4.5:1 (script found 0 failures at 1280).
- Keyboard: Enter opens a job, focus lands in the panel, Escape closes it and focus returns to that job. Invoice send, discard confirm and save keep focus sensible.
- Flow rules: F1 every dialog has Close or Cancel and Escape; discard and delete name their object and effect. F2 one placement for primary actions. F3 over-hours and not-invoiced have text and icon, "Sending" while a send runs, and the toast says nothing left the page.
- Scope: no drag and drop, filters, charts, summary cards, notification dots or customer list.

## Left open

- Warn: S1 at 1000 to 1100 wide wraps status text to two lines inside job items. Readable, not elegant. Fix when real data exists.
- Warn: in the preview the Sent invoice date is capped at today, so sample dates can look odd for a few days of the week.
- Not verified: screen reader output, Safari and Firefox, 200% text size, forced colors, real network failure, persistence, and anything with a real back end. A screenshot cannot show these.

Verdict: Ready for the owner's design review of the preview. Not a product: no data is saved and no email is sent.
