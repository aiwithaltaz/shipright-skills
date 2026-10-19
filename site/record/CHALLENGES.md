# Challenges

Status: current

## Rows

- The answer key is long. This case study uses the count and a few ids, not a second review.
- There is no after screenshot. The page says so instead of pairing a different project's picture.
- Naming the real client is not allowed until the owner agrees. The page says "the desk prototype".
- Site: a replay hides beats with visibility, so the reduced-motion check failed. Fix: under reduced motion every beat shows in order and autoplay is off.
- Site: the pause button changed its text, so normal and reduced words differed. Fix: all three labels stay in the DOM and CSS shows one.
- Site: autoplay overrode a tap made in the first second. Fix: any tap stops autoplay for good. That was my bug.
- Site: at 1024 the built screen covered the last beat. Fix: below 1101px the screen sits above the window, not on top of it.
- Site: auto margins and 1px grid gaps read as off-scale spacing. Fix: grid rows and box-shadow lines.
