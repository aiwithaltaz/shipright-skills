# Bounded verification - reference (optional)

**Status: Public draft.** Used by `ux-critique` at the implementation or visual-artifact stage.
**Pack:** ShipRight.

Use when a built result exists and the user wants it checked. ShipRight records evidence; it does not bring its own test framework.

## 1. Plan (state it before running)

- At most 5 critical paths, taken from the approved screen jobs.
- For each path, the evidence needed: viewport (desktop and a supported mobile width such as 390px), browser, keyboard, role, failure case.

## 2. Inspect with what is available

- A browser tool (for example Playwright), screenshots, a running build, or the user's QA notes.
- Do not install tools or call paid services without approval.
- No tool available → give the user a short manual checklist and mark those items **Not verified**.

Look for these defect types on desktop **and** mobile: spacing inconsistency, overflow or clipping, misalignment, unreachable primary action, missing states, wrong or unwired fonts, placeholder images or proof shown as real, color-only meaning, broken focus.

## 3. Record

- Artifact/version and exactly what was exercised.
- Status per path: only what was observed. No inferred passes.
- Before and after screenshots for each fix.

## 4. Fix loop (only if the user authorized fixes)

- Fix only findings from this review, within approved scope. No refactors, new features or new dependencies.
- Re-verify the affected path after each pass.
- **Stop after 2 passes**, or earlier when only Polish remains. Report what is left.

## 5. Verdict

Use the shared readiness rule. Verification never authorizes deploy, publish or payment.

---

*Public draft - ux-critique/references/bounded-verification.md - ShipRight*
