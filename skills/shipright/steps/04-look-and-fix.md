# Step 4: Look and fix (required, the build is not done without it)

Be a fresh critic. Ignore the plan; judge only what the screen shows.

## Leak check (required, every round and last)
Run `node <skill>/scripts/check-leaks.mjs . --render` (needs Node; `--render` finds Playwright and Chrome on its own, or set `PLAYWRIGHT_PATH` and `CHROME_PATH`; it reads text with uppercase styling turned off, so names match as written). It scans visible text for planning words ("Not listed", "placeholder", "TODO", "per PRODUCT.md", notes to self, design words) and fused labels like "streakWeekdays". FAIL blocks done: fix every hit and run again. No Node? Search your HTML and JS strings for the same words by hand and also read every screenshot, including open sheets and dialogs, for joined words. Paste the last result line into LOOK-REPORT.md.
Missing facts are left out, never shown as a note. Write them in `PRODUCT.md` under "Missing facts" instead.

## Round (do at least 1, at most 3)
1. **Screenshot** every main screen at 390 x 844 (phone) and 1280 x 800 (desktop). Save PNGs in `shots/round-N/`. If the page has motion, also capture 2 mid-animation frames per animated section (scroll halfway through, or pause at 50%), plus one with reduced motion on. Use any headless browser you have (Playwright, Puppeteer, Chrome `--screenshot`). If no browser can run, say so in the report and check the HTML at both widths by reading it line by line.
2. **Look** at each image. Compare side by side with the chosen pack's `reference.html`, or for a redesign with `shots/before/`.
3. **Critique** in 8 lines at most per width, as a picky art director AND a first-time user. Every round checks both.
   Taste:
   - Does it feel as premium and as clearly in the pack's style as `reference.html`? Same fonts, colors, signature details (see `ART.md`)? Any screen that drifts to a generic look?
   - Would a designer screenshot it to share? If not, name the weakest spot.
   - **Award bar:** put the shot next to the best reference screenshot from Research (`refs/` or `product-references/`). Would this win against an award-level site or app of this type? Answer win, tie or lose, and for lose name the 2 things the reference does better (type scale, spacing rhythm, image use, motion, detail). Lose is a top problem.
   - Any text over the [word limits](word-limits.md)? Any planning words or invented names on screen?
   Craft (redesigns, and any site with motion):
   - Does every "keep" row in BASELINE.md still work? Is each craft bar item kept or clearly beaten?
   - Side by side with before: is any screen flatter, emptier or more static? That is a top problem.
   - Do mid-animation frames look intended (no blank or broken frames)? Does reduced motion show full content?
   Overlap (every page, both widths, still and mid-animation frames), answer each yes or no:
   - Does any 3D, image, pinned or moving layer cover text or a button in any frame? Text must sit on a clear area at every frame.
   - On phone, does any floating button (chat, Ask, back to top, add) cover content? It must not. Move it into the header or footer, make it a small tab at the edge, or add bottom padding equal to its height so content scrolls clear.
   - Scroll to the bottom on phone: is the last line fully readable above any fixed bar?
   Clarity (see [clarity rules](clarity.md)), answer each yes or no:
   - Does every state have its own look and a visible legend (Done, Missed, Today, Ahead)?
   - Are counts plain ("3 of 5 done") and can none look wrong (like "5/4")?
   - Is every history grid labeled with weekdays and dates, with today marked?
   - Does Add offer Every day, Weekdays and a day picker? Is there a Habits screen to edit and delete?
   - Is any main text crossed out? Is any state shown by color only?
   - Can a first-time user mark a habit done in one tap? Is anything cut off, overlapping (add button over a card or under the tab bar), empty or broken?
   - Is the audience's whole scope (all habits, programs or features) visible together in one overview before any carousel or pinned one-at-a-time section?
4. **Fix** the top 3 problems in code. Any clarity "no", any overlap, any leak, an award-bar lose, and any craft downgrade is a top problem. Each round fixes at least one taste problem and every clarity "no". Next round.

At most 3 rounds. Stop early when a round finds nothing serious.

## LOOK-REPORT.md (must exist at the project root before you say done)
Keep it under 300 words:
```
# Look report
## Round 1
Shots: shots/round-1/390-today.png, shots/round-1/1280-today.png, ...
Leak check: PASS/FAIL (last line)
Award bar vs <reference>: win/tie/lose, why
Overlap: mid-animation y/n, floating button on phone y/n
Craft vs before: kept 3D y/n, kept motion y/n, kept media/proof y/n, flatter anywhere y/n (redesigns)
Clarity: legend y/n, plain counts y/n, labeled grids y/n, add + day picker y/n, Habits screen y/n, no strike y/n
Problems: 1. ... 2. ... 3. ...
Fixed: 1. ... 2. ... 3. ...
## Round 2
...
## Left as is
...
```
You are not done while the leak check fails or any overlap is left.
Delete `shots/` from the final zip only if it is too big; keep LOOK-REPORT.md.

Then reply: the result, why, the next step. See [reply.md](../templates/reply.md).
