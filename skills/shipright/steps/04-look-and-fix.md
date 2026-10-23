# Step 4: Look and fix (required, the build is not done without it)

Be a fresh critic. Ignore the plan; judge only what the screen shows.

## Round (do at least 1, at most 3)
1. **Screenshot** every main screen at 390 x 844 (phone) and 1280 x 800 (desktop). Save PNGs in `shots/round-N/`. Use any headless browser you have (Playwright, Puppeteer, Chrome `--screenshot`). If no browser can run, say so in the report and check the HTML at both widths by reading it line by line.
2. **Look** at each image. Screenshot the chosen pack's `reference.html` at the same widths and compare side by side.
3. **Critique** in 8 lines at most per width, as a picky art director AND a first-time user. Every round checks both.
   Taste:
   - Does it feel as premium and as clearly in the pack's style as `reference.html`? Same fonts, colors, signature details (see `ART.md`)? Any screen that drifts to a generic look?
   - Would a designer screenshot it to share? If not, name the weakest spot.
   - Any text over the [word limits](word-limits.md)? Any planning words or invented names on screen?
   Clarity (see [clarity rules](clarity.md)), answer each yes or no:
   - Does every state have its own look and a visible legend (Done, Missed, Today, Ahead)?
   - Are counts plain ("3 of 5 done") and can none look wrong (like "5/4")?
   - Is every history grid labeled with weekdays and dates, with today marked?
   - Does Add offer Every day, Weekdays and a day picker? Is there a Habits screen to edit and delete?
   - Is any main text crossed out? Is any state shown by color only?
   - Can a first-time user mark a habit done in one tap? Is anything cut off, overlapping (add button over a card or under the tab bar), empty or broken?
4. **Fix** the top 3 problems in code. Any clarity "no" is a top problem. Each round fixes at least one taste problem and every clarity "no". Next round.

At most 3 rounds. Stop early when a round finds nothing serious.

## LOOK-REPORT.md (must exist at the project root before you say done)
Keep it under 250 words:
```
# Look report
## Round 1
Shots: shots/round-1/390-today.png, shots/round-1/1280-today.png, ...
Clarity: legend y/n, plain counts y/n, labeled grids y/n, add + day picker y/n, Habits screen y/n, no strike y/n
Problems: 1. ... 2. ... 3. ...
Fixed: 1. ... 2. ... 3. ...
## Round 2
...
## Left as is
...
```
Delete `shots/` from the final zip only if it is too big; keep LOOK-REPORT.md.

Then reply: the result, why, the next step. See [reply.md](../templates/reply.md).
