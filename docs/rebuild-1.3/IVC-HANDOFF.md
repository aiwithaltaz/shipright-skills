# ShipRight · Master handoff from the IVC 2026 project

**Owner:** Altaz Lavji · **Written:** Oct 15, 2026 · **Source project:** IVC 2026 Central USA (desk registration app + public event website)
**Purpose:** Hand everything learned on IVC 2026 to the ShipRight Skill project, so ShipRight can produce this level of product and design quality every time, even when run on a small model (Haiku).

> **How to read this file**
> - **Owner decision** = Altaz said it or picked it during IVC. These are real approvals for IVC, and strong evidence of his taste.
> - **Pattern** = a reusable rule drawn from those decisions. For ShipRight, every pattern is still **Proposed** until Altaz approves it in the ShipRight project.
> - **Gap** = something ShipRight doesn't do yet.
> - Nothing here is a ShipRight repo change yet. The repo (`karimflavji/shipright-skills`) is still at v0.4.1-draft.

---

## 0. TL;DR (the 12 rules that made IVC work)

1. **Ask, don't assume.** Batch questions (max 4), each with a recommended option. Silence is never approval.
2. **Change only what the owner points to.** Keep everything he likes. List any gap-filling defaults as *Proposed*.
3. **Crops are the spec.** When he shares small crops plus one full screenshot, copy the crops. The full screenshot is context only.
4. **Remove before you add.** Anything repeated, decorative without a job, from a future phase, internal plumbing, or unconfirmed goes.
5. **One clear next action per card or screen.** Put status and the fix right where the person is looking.
6. **Spacing is a system:** 4 / 8 / 16 / 24 / 32 / 40 / 48 / 64. Uneven gaps "look like AI slop". Measure it with a script.
7. **Premium comes from layout grammar and motion, not new colours.** The design system stays fixed.
8. **Every interactive feature gets its own entry point**, near where people will look. Never hide it only inside another feature.
9. **Games and interactions must be easy in the first 5 seconds.** Show where and when, and make the basic action automatic or one tap.
10. **Never animate what wasn't asked for.** Scope class names. Respect reduced motion.
11. **Before/after images every round, a test for every interaction, and push only when he says "push it".**
12. **Log every round** (feedback → decision → status → why), and turn the lessons into ShipRight rules.

---

## 1. How Altaz thinks (the owner model ShipRight should simulate)

### 1.1 What he optimises for
- **Clarity over cleverness.** "The form is the priority": title + deadline + form first, background info in a FAQ below.
- **Organised and structured.** He redesigned the Registrations table himself: Attendee (name, group · team) / T-shirt / Desk / Status / Payment / Donation / next-step button + ⋮ menu. "Organized, structured, less clutter."
- **Premium, alive and touchable on public pages.** References: why.zero.university ("best so far"), itomdev.com ("dream website"), jeskojets.com, benjamincreative.me, brand-studio.co, carterogunsola.com, ednaho.com, haoqi.design.
- **Consistency.** One design system for the desk app and the public site. Same labels, same status meanings, same buttons everywhere.
- **Honesty.** Nothing fake. No menu until the menu is confirmed ("Menu coming soon"). No counters or features that aren't built yet.
- **Phone first for public pages.** Most visitors are on phones, so every effect must work on tap, not just hover.

### 1.2 How he gives feedback
- Long, fast, numbered-ish messages mixing tiny CSS fixes ("margin-top 24px") with big ideas ("make the map the highlight").
- He shares screenshots, crops or Figma frames, and often names exact values.
- He says what he likes ("I like the balloon area, very pretty") as well as what's wrong. **Likes are locks: don't touch them.**
- He sometimes gives a *wrong cause* for a real problem. ShipRight should say so once, plainly, then do what he chooses.
- He decides fast when given 2–4 options with a recommended one and a short preview of each.
- He writes "push it" / "push it live" to ship. Nothing ships without it.

### 1.3 How he edits a design (his moves)
| Move | IVC examples | Pattern for ShipRight |
|---|---|---|
| **Reorder by priority** | Perform page became title + deadline + form, then FAQ. Phone hero: title (+ logo beside it) → description → facts → deadlines → countdown → scroll. Register moved up, after "The day at a glance". Games moved below the map once the map became the highlight. | Order sections by what the visitor needs first. Re-check the order whenever a feature's importance changes. |
| **Group related things** | "Emergency contact" and "Other details" sections; Home JK, Team and T-shirt in 3 columns; status badges on the name row; meta line below. | Group by meaning; put secondary facts beside their primary fact. |
| **Move controls to where the work happens** | Next action on the search card (COC, facilitator, guardian). All row actions in one bottom row. Phone chips moved out of the map so the map stays big. | The fix lives where the problem shows. |
| **Align to the grid** | Review card starts level with the form card. Bottom bar content matches the results column width. "Clear filters" lines up with the fields. | Edges line up across columns. |
| **Make the key thing bigger** | "The map is the highlight of the whole website": bigger, dark stage, glow. Snakes & Ladders became the featured card. | Give the hero feature size and contrast. Demote the rest. |
| **Simplify interaction** | Tick-to-select replaced add-to-visit → visit card → start visit. Table tennis went from swipe-to-hit to auto-hit with a target ring. | Fewer steps. Show the target. Make the basic action automatic. |
| **Make state obvious** | Finished step = green check. Disabled value = disabled dropdown, not loose text. Selected card = full even border, not an accent bar. | State must be visible and look like what it is. |

### 1.4 What he removes (and why)
| Removed | Category | Rule |
|---|---|---|
| Explanatory "Visit" note panel; "/ Twelve things /"; repeated hero copy; names line under the visit title (already in tabs); "(included)"; "after checking for duplicates" | Repetition / filler | Each fact gets one home. |
| Stamps (Explorer / Foodie / Fan / Player) | Redundant feature | The "Pick a spot" list already did the job. |
| Two hero buttons; outro buttons | Competing CTAs | Once a nav and a floating CTA exist, drop extra CTAs. |
| "Synced to event sheet"; printer/badge panel; Query chip; filter dropdown from a mockup | Internal plumbing / mockup noise | Front-line users never see system plumbing. |
| Checked-in / In-queue counters; Scan-QR tabs | Future phase | Show only what the current phase uses. |
| Menu dishes; 7:30 row; carrom; "PSA 2 · not to scale" | Unconfirmed or extra facts | Only confirmed facts; "coming soon" beats invented content. |
| Dark/light toggle on the public site | Unneeded option | Light only unless asked (desk keeps dark as an option). |
| Dot on the active nav tab | Wrong meaning | A dot means "needs attention", not "you are here". |
| Kicker "Warm up for Nov 22" | Extra label | One heading + one line is enough. |
| Activities hover subtext | Extra text | Keep the always-visible one-liner only. |

**The removal test (Pattern):** For every element, ask in order:
1. Does it repeat something already on screen?
2. Does it have a job the user needs right now?
3. Is it real and confirmed?
4. Is it for this phase?
5. Is it for this audience?
6. Does it compete with the primary action?

One bad answer means it goes. If in doubt, ask.

---

## 2. The process that worked (ShipRight loop, as actually run)

### 2.1 Stages (project rule)
`product-design` → `ui-ux-design` → `ux-critique`, in order. Every decision stays **Proposed** until the owner approves. Silence is never approval.

### 2.2 One feedback round, step by step
1. **Parse** the owner message into a numbered list (one item per change). Quote exact values.
2. **Classify** each item: clear change / needs a decision / bug I caused / out of scope.
3. **Ask** about the needs-a-decision items in one batch (max 4 questions, 2–4 options each, recommended first, a short preview of what each option looks like). Don't ask about things with an obvious default; state the default instead.
4. **Checkpoint**: back up files and keep "before" images.
5. **Build** only what's agreed. Add features behind a switch when the owner wants to compare ("give me both" → Soft / Strong ripple; v1 / v2 home).
6. **Test**: update the automated checks (one per changed behaviour), run the full regression, and autoplay any game.
7. **After images**: desktop 1440 + phone 390, full page, plus close-ups of what changed.
8. **Report**: one short list of what changed, anything that differs from the ask and why, test counts, and what's still waiting on the owner.
9. **Log**: add a row per item (feedback → change → status) to the feedback log, plus lessons for ShipRight.
10. **Ship only on "push it"**, then verify the live site actually has the change (live file check), and mark the log row with the commit.

### 2.3 Preview without breaking production
- Public visitors stayed on the approved page (perform-only) while new versions were reviewed through a `/preview` cookie with a preview bar (v1/v2, Soft/Strong, Exit preview).
- Unfinished features sit behind flags (`ACTS_STEP`, `PARENT_LINK`) so they can be switched on without new code.
- Big redesigns start from a tagged checkpoint, so a revert is one step.

### 2.4 Logs and docs that made it repeatable
- Feedback log per surface (desk doc 10, home doc 19): every round, every item, status, why.
- Design system doc (doc 15): tokens, components, a public-site layer with component statuses.
- Premium web design playbook (pattern library + UX lessons + definition of done).
- Saved "parked" patterns (the swipe carousel the owner loved but removed "for now") stay in the system with status **Saved, not on the page**.

---

## 3. Product decision patterns (from the desk app)

| # | Pattern | IVC evidence |
|---|---|---|
| P1 | **Put the next action on the search result.** Show status and one-tap fixes on the card. | COC / facilitator / guardian fixes on result cards |
| P2 | **Batch-select beats add-to-cart** for groups. Show *why* Continue is disabled. | Tick-to-select + bottom selection bar |
| P3 | **The happy path sets the steps.** Don't show a step most people skip; move rare work to where it's triggered. | Family step removed; guardian chosen on the card |
| P4 | **Every create needs an undo.** Edit, remove and delete (with reason, who, and money effects) belong in the first spec. | Soft delete with refund correction and an audit list |
| P5 | **Stricter rule when trust is at stake.** Keep the looser option behind a switch. | Parent must be present for teens; phone-link code kept, switched off |
| P6 | **Pre-fill from the source list, but allow an event-only override**, and say so on the field. | Home JK / Team preselected and changeable for the event only |
| P7 | **Ask for the data model early** (e.g. full DOB). It removes guesswork questions. | DOB replaced "Is X 18 today?" |
| P8 | **Shared logins change the audit model.** Ask how people sign in before designing "who did it" fields. | JK shared accounts → name fields in pop-ups |
| P9 | **Hide system plumbing from front-line users.** | "Synced to sheet" removed |
| P10 | **Only show what the current phase uses.** | Check-in counters deferred |
| P11 | **Lists that grow need a way out** ("View all" and/or "Clear"). | In progress → View all + Clear with confirm |
| P12 | **Deadlines and money are sensitive.** Bold, specific and scoped (which form closes, which price applies when). Equal visual weight for both prices. | "Performance sign-ups close…" vs "Register by Nov 20"; $20 / $30 equal blocks; sports has no deadline |
| P13 | **Role-based access is product design.** Decide per role which tabs exist. | JK logins: desk, registrations, activities, reports + cash close for own JK |
| P14 | **Every risky bulk action shows who will be affected first**, and logs every result. | Send dialog "Who will get it (N)"; Email log tab |
| P15 | **Respect external limits in the design** (rate limits, quotas). Stop at the first push-back with a clear "try again in about an hour". | Gmail pooling, 1 email/second |

---

## 4. Visual system rules (owner-approved on IVC; reusable defaults)

### 4.1 Foundations
- **Spacing:** 4 / 8 / 16 / 24 / 32 / 40 / 48 / 64, with a meaning per step (inside a line / inside a group / between groups / card padding / between stacked sections = 40 / between page sections). Line heights on a 4px grid. Ban 2, 6, 10 and 12-style gaps unless they sum onto the grid. **Measure it:** a script walks sibling gaps and flags off-grid values.
- **Type:** Inter for UI, EB Garamond for display (IVC). Section titles clamp(44px, 6.4vw, 88px), **line-height 1.2** (tighter clips g, y, p). Kickers 12px uppercase, 0.14em tracking.
- **Icons:** Lucide only, 1.5 stroke, text colour. No coloured icons unless the icon *is* the state (green check = done).
- **Theme:** light by default. Dark is optional (desk app only). Public site: light only.
- **Radii:** 12 (fields, buttons), 16 (tabs, notices), 24 (cards), 32 (big cards), 40 (result cards).
- **Focus:** 1px. Fields: the border turns brand. Buttons/links: 1px brand outline, 2px offset. Thick rings were rejected.
- **Scrollbar gutter always reserved.** Use `overscroll-behavior:none` in work tools (no page bounce).

### 4.2 Components and behaviour
- **No native dropdowns.** Custom dropdown with full keyboard support (arrows, Home/End, type-ahead, Enter, Escape), a check on the selected item, flips up near the bottom, works inside dialogs.
- **Fields:** cream fill when empty, white + brand border when filled or focused, clear ×. Label 14px regular above.
- **Field formats from day one:** phone `(000) 000-0000` while typing; email check; name character rules. Errors show on blur or submit, never while typing, and clear as soon as fixed. An error under one field never pushes its neighbour.
- **Buttons:** Back starts with ←; Next/Continue ends with → and says where it goes ("Next: Sami →", "Next: Waivers →").
- **Selection:** a full, even border, never an accent bar.
- **Chips** replace checkbox lists for choices (with icons).
- **Disabled = looks disabled** (a disabled dropdown, never loose text).
- **Tables:** bold first line + muted sub-line 4px below (13/18), 16px cell padding, middle-aligned, next-step button + ⋮ menu (View / Edit / Delete).
- **Link hover fill** gets 12px side padding.
- **Fixed bars** are pinned to the screen, with the content padded underneath; their content width matches the column.
- **App shell (internal tools):** left sidebar (logo, role tabs with icons, count pills, soft filled active tab, profile bottom-left) + slim top bar (context + help). Account, notifications and log out live in the profile menu. Demo-only tools go under a "Demo only" label in that menu.

---

## 5. Premium public pages (landing / marketing)

### 5.1 Quality bar
- Big confident display type, one **live touchable moment** above the fold (works on tap), motion with purpose, calm structure (section padding 120 desktop / 80 phone), and a fixed design system.

### 5.2 Pattern library (status on IVC)
| Pattern | Use | Spec notes |
|---|---|---|
| Dot-field hero + ripple | Brand heroes | Canvas dots pull toward the cursor; a tap or move sends a ripple; letters + logo lift as it passes. Soft by default; Strong as an option. Runs only while visible. |
| HUD chips | Date · place · time | Frosted glass on busy backgrounds; replace hero buttons when a floating CTA exists. |
| Scroll cue | Hero bottom | Centered, "SCROLL" + vertical animated line, clickable, goes to the highlight section. |
| Marquee band | Brand rhythm | 24px words, 14px 8-point star, gap 32px, slow constant loop. Never a glyph that looks like another brand's logo. |
| Word-light statement | One promise | Words light up while scrolling. No repeated copy. |
| Numbered list + preview | What's included | (01) title + always-visible one-liner + plus button; the desktop preview follows the cursor; phone taps to open; illustrated placeholders until photos arrive. |
| Interactive map showcase | The highlight | Dark warm stage, glow, raised 3D blocks, bobbing pins, place list with Play/View on every row; zoom lies flat (sharp); characters per spot (chef, desk volunteer, dancers). |
| Mini-game cards | Games | A featured big card first, a wide card last, an illustration per card. **Cards never move on hover; only the picture zooms.** |
| Sticky timeline | Schedule | Sticky title, the line fills on scroll, small note pills for extras. |
| Clean door cards | Sign-ups | White, 1px line, no busy pattern behind text, gentle 3D tilt on desktop. |
| Equal price blocks | Pricing changes | Same size; never hide the later price. |
| Direction-aware FAQ | Questions | The fill wipes in from the side the mouse enters; one open at a time. |
| Floating islands header + CTA pill | Long pages | Pill at the bottom on desktop, top right on phone; hidden over sheets and overlays. |
| Giant word outro | Ending | Huge faint word sliding behind the closing line. |
| Swipe carousel | Content rails | Saved; owner loved it but parked it. |

### 5.3 Motion rules
- Titles: line-by-line mask reveal (with bottom padding inside the mask so descenders aren't clipped). Blocks: fade up 24px, staggered 70ms. Easing cubic-bezier(.22,1,.36,1).
- **Everything is visible with no JS.** Everything is off under `prefers-reduced-motion`.
- Smooth scroll (Lenis on IVC) on desktop with a fine pointer only, never on touch or under reduced motion; it pauses while overlays are open.
- **Scope every animation class** (IVC bug: a `.note` music-note animation leaked onto the hero `.note` text and made it loop). Add a test that key text stays still.
- **3D-tilted elements blur when zoomed** (the browser rasterises once, then stretches). Lay them flat while zoomed.
- Bump the cache-busting version on every changed script (`games.js?v=N`).

### 5.4 UX lessons from real users
1. People missed the games inside the map → they got their own section, and the map got bigger with Play/View on every place.
2. Hover states vanish on busy backgrounds → filled hover (white fill, brand text).
3. Nav hover must not be white on cream → brand fill.
4. Descenders clip at tight line heights → 1.2.
5. Too many hero CTAs compete → chips instead.
6. Phone hero order matters.
7. Games were too hard → auto-hit, target ring, approach ring, tap to serve, slower start.

---

## 6. Interactive features and mini-games (what made them good)

- **Entry points:** a dedicated section *and* places on the map. Loaded only on first tap (lazy script).
- **Easy first 5 seconds:** show where (target ring, glowing hitting spot, predicted path) and when (approach ring, glow peak). The basic action is automatic or one tap; skill controls (spin, power, lift) are a bonus.
- **Controls per device:** drag + tap on phone, keyboard on desktop (arrows / Space / W A S D).
- **Juice:** particles, screen shake on big moments, squash and stretch, pop text (SIX!, SPIKE!), synth sounds (Web Audio, no files, start after the first tap).
- **Fair AI:** reaction delay plus mistakes that grow with difficulty; difficulty ramps with score or rounds.
- **The end screen order is fixed:** celebration (confetti) → score counting up → stats tiles → event line ("Come play for real on Nov 22!") → registered? Yes / Not yet → **Play again last**.
- **Test by autoplay:** a scripted player confirms both sides score, no errors, and outcomes vary (cricket: 6s, 4s, runs, edges, catches, bowled).
- **Clear boards:** Snakes & Ladders became a chessboard (white / light cream), green = ladder start, red = snake bite, numbers in a corner with a halo, a legend, and "you are here".

---

## 7. Engineering habits that protect design quality

- **Test every interaction**, on phone (390) and desktop (1440). IVC ended with 131 home checks, 54 map/game checks and 16 regression suites.
- **Measure, don't eyeball:** spacing script, sharpness check (edge variance) for blur, computed-style checks (margins, transforms, animation names), centering checks (text box vs pill box).
- **Before/after images every round**, kept in a folder per build.
- **Verify the live deploy** after pushing (fetch the live file and look for the new code), not just the push.
- **Keep reverts cheap:** checkpoints, flags, switchable variants, CSS blocks labelled by round ("Round 6 · fit to screen").

---

## 8. How to talk to Altaz (output style ShipRight should use)
- Smart-friend tone, simple English, short. Bullets and tables over paragraphs.
- Lead with the result; then why; then what's next.
- Don't recap every step. One line per change.
- Say mistakes plainly ("that was my bug").
- Don't show raw internal URLs. Avoid "genuinely", "honestly" and "straightforward".
- Guide one step at a time when he's doing something in a tool UI; ask "Is this exactly what you're seeing?" first.

---

## 9. Essential pages for any new app (proposed baseline: stress-test this)

ShipRight should output a **page inventory** at the product-design stage, then mark each page *Needed / Not needed / Later* with the owner.

| Group | Pages / surfaces |
|---|---|
| Public | Landing; pricing (if paid); about; contact / support; FAQ / help; changelog (optional); blog (optional) |
| Auth | Sign up; sign in; forgot password; reset password; verify email; magic-link / OTP screens if used; logout confirmation |
| Onboarding | Welcome / first-run; set up profile or workspace; an empty-state first task |
| App core | App shell (nav, profile menu); dashboard / home; the main object list + detail + create / edit / delete (with undo); search; notifications |
| Account | Profile; settings; security (password, sessions, 2FA); billing / plan / invoices (if paid); team / members / roles (if multi-user); delete account / export data |
| System states | Loading; empty; error; offline; permission denied (403); **404**; **500**; maintenance; rate-limited / "try again later" |
| Legal | **Privacy policy; Terms of service; Cookie policy + consent banner** (only if non-essential cookies are used); acceptable use; refund policy (if paid); accessibility statement. *Templates with clear placeholders, marked "needs legal review". ShipRight is not a lawyer.* |
| Email / messages | Welcome; verify; password reset; receipts; notifications; one email per important state change |
| Meta | Favicon (from the real logo), app icons, OG / social images, page titles + descriptions, sitemap, robots, web manifest |

For each page, specify: job, primary action, states (empty / loading / error / success), mobile layout, and copy.

---

## 10. Making ShipRight produce great results on Haiku (proposed design for the skill)

Small models follow explicit structure well and fill gaps badly. So:
1. **Short SKILL.md, with detail in references.** The main file holds the steps, gates and output order; patterns, tokens and page templates live in reference files it opens when needed.
2. **Numbers, not adjectives.** "Gap 24px between groups", not "generous spacing". "Title line-height 1.2", not "comfortable".
3. **Templates over prose.** A fill-in page spec, a fill-in feedback-log row, a fill-in question batch, a fill-in page inventory.
4. **If → then rules.** "If a section repeats a fact already on screen → remove it." "If a CTA competes with the primary action → demote it."
5. **Gates with yes/no checks** before handoff (the removal test, spacing grid, one primary action, states covered, reduced motion, phone 390).
6. **Worked examples** (before → after pairs from IVC) for every major rule.
7. **A fixed output order** (inventory → flows → specs → design tokens → build prompts → checks), so the model never skips a step.
8. **Tell the model what not to do** (no native selects, no accent-bar selection, no dot on the active nav, no invented content, no unrequested animation).
9. **Eval it:** build the same small app with Haiku and Opus and compare against the definition of done (section 12).

---

## 11. Research brief for the next chat (motion and animation libraries)

Altaz will share resources. For each library or skill below, the next chat should find out (from official docs / GitHub only):
- what it's best at;
- licence and cost;
- size / performance;
- reduced-motion and accessibility support;
- framework fit (React / Next.js / plain HTML);
- whether a small model can use it reliably;
- **when ShipRight should recommend it vs not**, and one Haiku-safe usage template.

| Named by Altaz | Questions to settle |
|---|---|
| Animate (confirm which: Animate.css, Animate UI, Motion/"Framer Motion", or another) | Which one he means; CSS vs JS; scroll reveals |
| Rive skills | Interactive vector animation with state machines; when it beats Lottie; runtime size |
| GSAP skills | Timelines, ScrollTrigger; licence terms (now free?), React integration |
| Claude Design skills | What they cover; overlap with ShipRight's ui-ux-design stage |
| Wiggle | What it is exactly (confirm the source) |
| Claude Remotion skill | Video-from-code; for marketing videos / social, not in-app UI |
| Text to Lottie | Generated Lottie animations; quality, editing, file size |
| Three.js animation | Real 3D (vs the pseudo-3D canvas used on IVC); when the cost is worth it |
| Already proven on IVC | Lenis (smooth scroll), Canvas 2D games with no library, CSS keyframes, Web Audio synth sounds |

Output wanted: a **motion decision table** (need → recommended tool → fallback → reduced-motion behaviour), to go into ShipRight's ui-ux-design references.

---

## 12. Definition of done for any ShipRight-built app (proposed)
- [ ] Page inventory agreed (section 9), every page built or marked *Later*.
- [ ] Every screen: one job, one primary action, all states (empty / loading / error / success).
- [ ] Removal test passed (section 1.4); no repeated facts; no invented content.
- [ ] Spacing on the 8-point grid (script-checked); title line-height 1.2; Lucide 1.5; focus 1px; no native selects.
- [ ] Forms: masks, validation on blur/submit, errors that don't shift neighbours, Back ← / Next →.
- [ ] Phone 390 and desktop 1440: no sideways scroll; hover effects have tap equivalents.
- [ ] Motion: purposeful, scoped class names, off under reduced motion, page readable with no JS.
- [ ] Legal pages + 404 / 500 + favicon / OG / meta present.
- [ ] Automated checks for every interaction; before/after images; feedback log row.
- [ ] Live deploy verified.

---

## 13. Known gaps in ShipRight today (from this project)
1. The premium web design playbook and these lessons exist only in IVC project knowledge, not in the repo.
2. `personal-taste/altaz.md` is missing most of the taste in sections 1, 4 and 5 (removal test, motion rules, hover rules, map/game patterns, public-page order).
3. There is no **page inventory** step, so 404 / legal / auth pages are easy to forget.
4. There is no **feedback-round protocol** (section 2.2) or feedback-log template.
5. There is no **motion / animation guidance** or library decision table.
6. There is no guidance for **interactive features and games**.
7. It hasn't been tuned for **small models** (section 10).
8. There is no eval that builds a full app end to end and scores it against a definition of done.

---

## 14. Appendix A · IVC decision timeline (short)

**Desk app (Sep 27 → Oct 13)**
- R1: app shell, profile menu, custom dropdowns, field formats, phone drawer.
- R2: tick-to-select, status badges, COC/facilitator pop-ups, DOB-based ages, waiver first.
- R3: Details → Waivers → Cash; parent present; edit/delete everywhere with refund audit.
- R4: mockup crops = spec; remove plumbing / future features; full-border selection; no nav dot; View all; 8-point spacing measured.
- R5 (Figma): radii, fields, Lucide, Inter + EB Garamond, compact In progress, numbered stepper, "Next: Name →", receipt-style review; one design system for desk + public site; chips; 1px focus; table standard.
- R6: fit to screen; JK = desk access; venue → home JK; send Perform link; reports redesign.
- R7: Gmail pooling + email log; Perform email with the ticket; reports for JK logins.

**Public home (Oct 13 → Oct 15)**
- Build 1: map + zone cards + food character + 4 games + end flow.
- Build 2: premium v2 from the references (**approved**: "You designed it really really good… make sure it produces this kind of design every single time").
- Build 3: ripple Soft/Strong, counter under the seal, marquee star, includes list, carousel, clean cards, bold deadlines, equal prices, light only.
- Build 4: chips replace hero buttons, 1.2 headings, centered scroll cue, copy refined, carousel parked, timeline fixes, sports has no deadline, one-open FAQ.
- Build 5: frosted chips, 3D map with pins + list, slingshot soccer/basketball, puzzle, Snakes & Ladders, confetti end screen, photo ops, "Menu coming soon".
- Build 6: games below the map, featured Snakes & Ladders, picture-zoom cards, stamps removed, bigger dark-stage map, View buttons, dancers, check-in volunteer, table tennis / pickleball / volleyball.
- Build 7: chessboard Snakes board, sharp zoom, map note removed, hero loop bug fixed, Play tag centered, table tennis auto-hit, 3D cricket.

## 15. Appendix B · First message for the new ShipRight chat (copy-paste)

> Here is the master handoff from my IVC 2026 project (attached). I'll also share more resources: Animate, Rive skills, GSAP skills, Claude Design skills, Wiggle, Claude Remotion skill, Text to Lottie, and Three.js animation.
>
> 1. Analyse the handoff and stress-test every pattern: what's IVC-specific vs universal, what's missing, and what conflicts with the current ShipRight repo.
> 2. Research each library from official docs/GitHub and build the motion decision table (section 11).
> 3. Propose the ShipRight changes as a numbered list (file → change → why), all **Proposed**, and ask me max 4 questions at a time with a recommended option.
> 4. After I approve, update the skills (product-design, ui-ux-design, ux-critique, _shared, personal-taste) so they work on Haiku (section 10), including the page inventory (section 9) and the definition of done (section 12).
> 5. Then we'll test it by building a full new app with Haiku and score it against section 12.
