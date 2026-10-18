I planned a dashboard for watching many AI agents and built its main screen as `index.html`. Every agent in it is sample data.

**What it does:** the person watching the agents sees the failed and waiting-for-approval agents first, finds one by name or team, opens it, and approves, declines, retries, pauses or resumes. Open it from any static server.

**What's in the pack (`build/`):**
- `docs/shipright/01-prd.md`, `02-technical-architecture.md`, `03-security-and-access.md`, `04-frontend-spec.md`, `05-feature-ticket-list.md` (T1 to T9, paste-ready), `build-rules.md`
- `DESIGN.md`, `design/tokens.css`, `AGENTS.md`
- `docs/shipright/design-preview.md` (three directions), `critique.md`, `ship-check.md`

**Decisions I made for you (all Proposed):**
- Release is a triage screen for the operator: no cost, no charts, no agent editing.
- Look: calm light direction with a teal accent, system fonts. Marked awaiting your approval; I picked it with no one to ask.
- Pause is undoable. Decline asks for confirmation inline.
- Stack: Next.js, Tailwind, shadcn/ui, TanStack Table, sample JSON behind one function. No database or sign-in yet.

**Only you can confirm:**
1. Who may approve, decline, retry or pause. I did not decide this. It blocks ticket T7 only.
2. Where agent status comes from, and how fresh it is.
3. What Pause, Resume and Decline really do on your platform.
4. Real team names, agent names and status names. Your design system or brand replaces my look.

**Checked:** no sideways scroll at 1280, 640, 390 and 320 wide, no text under 4.5:1 contrast, keyboard open, close and focus return, reduced motion, no console errors. **Not verified:** screen readers, 200% text zoom, other browsers, real data. The pack's `check-ui.mjs` was missing, so I ran those checks by hand. One small polish item is open: the view control shifts about 2 px when you change selection.

**Next:** approve the look, or tell me what to change, before the T1 to T8 build starts. Nothing is deployed or published.
