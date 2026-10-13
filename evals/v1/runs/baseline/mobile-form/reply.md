I used my picks, as you said. The build pack for Cursor is written, and `index.html` shows the key screen, Booking details, at phone size (390 by 844).

**What the app does in this first version**
A new person enters where and when they want a cleaning. Next they create an account with email and password. Then they review and send a booking request. The request shows as "Waiting for confirmation" until your business marks it Confirmed.

**Picks I made for you**
1. They send a request, and your business confirms it. There is no list of open times yet, so instant booking would promise times nobody has checked.
2. Booking details come first and the account comes just before sending. The details stay on the phone in between. This is a guess to measure, not a known result.
3. Sign-up uses email and password.
4. The stack is Expo (React Native, TypeScript) with Supabase.
5. The design system is plain and neutral, with no app name or logo until you send them. It is in DESIGN.md and is easy to replace.

**Files**
- `PRODUCT.md`: scope, screens and what is left out.
- `DESIGN.md`: colors (contrast measured), type, spacing, components, icons and placement.
- `docs/shipright/01-prd.md`: outcome, objects, journey, risks and the decision log.
- `docs/shipright/02-technical-architecture.md`: tables, row level security SQL, sign-up flow, and a send flow that cannot create duplicates.
- `docs/shipright/03-security-and-access.md`: who can see and do what.
- `docs/shipright/04-frontend-spec.md`: every screen with its elements, copy, states and errors.
- `docs/shipright/05-feature-ticket-list.md`: 12 ordered tickets with acceptance checks.
- `docs/shipright/build-rules.md`: rules for Cursor and a prompt to paste for each ticket.
- `.cursor/rules/project.mdc`: makes Cursor read the files above on every change.

Copy the `build-pack` contents into your project root. Then give Cursor one ticket at a time, starting with T1.

**Needs you before launch (I did not decide these)**
- D-10: what price, if any, people see before sending. No price shows now.
- D-11: how and when people pay. Not built.
- D-12: how someone changes or cancels a sent request. Until you decide, the status screen has no way to do this. That is the main gap in the flow.
- D-15: terms and privacy links and wording. The app stores need a privacy policy, and I do not write legal text.
- D-16: who confirms requests, and what happens if you cannot do one.
- Also open: the areas you serve (D-13), hours for Morning and Afternoon (D-14), home size fields (D-17), and whether Supabase requires email confirmation (D-07). The flow already handles both email settings.
- Before App Store release, plan in-app account deletion. Apple expects it for apps with sign-up.

**Checks (specification and one prototype file)**

| Product check | Status | Note |
| --- | --- | --- |
| 1 Context | Pass | Your request and delegation; unknowns listed |
| 2 Outcome | Pass | New customer sends a first cleaning request |
| 3 Scope and consistency | Pass | Every screen traces to a decision; one set of words |
| 4 Recovery | Fail | No change or cancel route after sending (D-12) |
| 5 States | Pass | Waiting for confirmation is shown as status, not a spinner. Runtime Not verified |
| 6 Empty results | Not applicable | No search or filters. The status screen has an empty state |
| 7 Consequences | Pass | Review before send; the draft is cleared only after the server has the request |
| 8 Decisions | Pass | Each open choice has an ID and owner |

| Screen check | Status | Note |
| --- | --- | --- |
| 1 Screen context | Pass | Job, phase, sources |
| 2 Design direction | Pass | Neutral system you delegated; no invented brand |
| 3 Hierarchy | Pass (spec) | One filled button at the bottom; groups Where and When |
| 4 States | Pass (spec) | Errors, storage failure, sending, unknown result |
| 5 Integrity | Pass | No prices, ratings, hours or brand name |
| 6 Navigation | Fail | Back keeps the draft, but sent requests have no exit route yet (D-12) |
| 7 Accessibility | Pass (spec) | Labels, linked errors, focus to first error, radio roles. Not tested on devices |
| 8 Motion | Not applicable | Platform defaults only |
| 9 Content and density | Pass (spec) | Wrapping and stacking rules; 0, 1 and many requests. Rendered fit Not verified |
| 10 Handoff | Pass | Decisions, exclusions and tickets aligned |

**Verdict:** Needs decision (D-12, D-15, D-16) before release. Cursor can start T1 to T11 now. T7 gets the legal links and T10 gets the change or cancel route once you decide.

**Limits:** nothing has been built or run. I did not render or screenshot `index.html`. In the prototype, Continue checks the form and Back keeps your entries. The next screens are not included.
