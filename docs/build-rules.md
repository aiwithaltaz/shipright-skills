# Build rules

**Status: Template (ShipRight 0.6.1-draft).**
**Project path:** `docs/shipright/build-rules.md`

**Version/date:** <!-- -->  **Sources and approval:** <!-- -->


Project paths below are relative to the app root. Read PRODUCT.md, DESIGN.md, this file, the affected frontend specification and ticket.
Do not copy the pack's maintenance AGENTS.md into the app.

## Current phase

**Phase and source:** <!-- -->
**Allowed changes and screens:** <!-- -->
**Keep:** <!-- -->
**Remove/change/add:** <!-- exact feedback -->
**Excluded / later notes only:** <!-- -->

Every visible element needs a current-phase source. No extra features, filters, tabs, counters, chips or navigation.
No disabled placeholders, hidden routes or data models for later phases.
Do not invent brand values or data. Use labeled sample data only for a requested prototype or test.
Use existing sourced components. Proposed choices stay separate until approved or covered by explicit delegation.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction and accessibility

- Use native semantics, visible labels, suitable input types and autocomplete. Keep paste usable.
- Provide logical keyboard order and visible focus. Sticky bars must not hide focused controls.
- Modal focus enters, stays within while open, and returns on dismissal. Provide a visible exit and Escape support.
- Explain field errors with associated text. Preserve valid input and prevent duplicate submission.
- Distinguish selection, focus and errors with non-color cues and correct control semantics.
- Announce relevant status without stealing focus. Hide routine system plumbing, not actionable failures.
- Measure text contrast at 4.5:1, or 3:1 for large text; relevant UI graphics/boundaries need 3:1, subject to applicable exceptions.
- Use at least 24 by 24 CSS pixel pointer targets or a justified WCAG exception. Prefer 44 by 44 for touch-heavy use.
- Check 200% text resizing and 320 CSS pixel reflow where applicable, plus supported product widths.
- Respect reduced motion and meaningful image alternatives. These checks are not complete compliance certification.
- Do not put sensitive phone/email searches, tokens or private records in URLs, analytics or logs by default.

## Consequences and pending work

For clear/reset/remove, define the object, scope, saved effects and recovery. Clearing selection is not deleting records.
Saved unfinished work is different from a running background job. Do not invent cancellation, undo, persistence or notifications.

## Screen brief

<!-- Job/source; element list; reading order; components/tokens; actions/effects; applicable states;
responsive order, wrapping and sticky clearance; exact acceptance checks; evidence needed. -->

## Needs approval before build

<!-- Only unresolved proposals. Current explicit corrections already authorize their scope. -->

## Verification and limits

Check each requested change and excluded item. Check affected state, keyboard and responsive behavior with available evidence.
Use realistic difficult content appropriate to the task. Do not create a broad test project for a small fix.
A screenshot does not prove saving, permissions, keyboard behavior or release readiness.
Report unverified behavior. Readiness never authorizes deployment, publication, payment or live messages.
