# Step 0: Research (before PRODUCT.md)

Two kinds of job. Pick one.

## A. New product
1. One line: product type and the person who opens it. Name one real kind of person, not "users".
2. Find 3 to 5 real references of the same type and audience: direct competitors plus 1 or 2 award-level sites (Awwwards, Godly, Mobbin, App Store "App of the Day"). Use [product-references/](../product-references/README.md) to start.
3. For each: link, what it does well (type, layout, motion, proof), what people dislike. Verified with a link, or Assumed.
4. Write 3 lines into PRODUCT.md under Research. Do not copy any one reference.

## B. Redesign of an existing site or app (required: keep-what-works audit)
Never start drawing before this audit. A redesign must meet or beat the current craft. Downgrading craft is a failed job, even if the structure gets better.

1. Open the live product. Screenshot every main screen at 390 and 1280, plus 2 mid-animation frames per animated section. Save in `shots/before/`.
2. Read the source if you can (page source, scripts, network). List what it really uses.
3. Write `BASELINE.md` (200 words at most), one line per row:

| Area | What is there now | Keep / improve / drop | Why |
| --- | --- | --- | --- |
| Screens and sections | | | |
| Motion (GSAP, scroll, transitions) | | | |
| 3D / WebGL / canvas | | | |
| Media (video, demos, images) | | | |
| Proof (case studies, numbers, logos, links) | | | |
| Interactions (hover, cursor, toggles) | | | |
| Content and voice | | | |

4. **Craft bar:** one line naming the 3 strongest things on the current site. The redesign keeps all 3, or replaces each with something clearly better. Default is keep.
5. Only drop a craft item if it hurts the audience's real question (slow, confusing, hides the message). Say why in the table.
6. Fix what is weak (story, order, clarity, words), not what is strong.

Next: [Step 1](01-product.md).
