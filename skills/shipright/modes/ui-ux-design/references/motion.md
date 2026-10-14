# Motion and 3D

Load for requested or existing animation, scroll motion, or a 3D or immersive page. Do not add motion because this file exists.
Use the product's motion tokens when they exist. For a new system, start from the starter-system motion tokens.

## Should it move?

| How often the user sees it | Decision |
| --- | --- |
| Many times a day, or keyboard-triggered | No animation, or under 120 ms |
| Several times a session (menus, rows, tabs) | Subtle: 120 to 180 ms, opacity and small movement |
| Occasionally (dialogs, sheets, toasts) | Standard: 180 to 260 ms |
| Once (first visit, launch page, success moment) | This is where expressive motion belongs |

Name the purpose in one word before building: feedback, orientation (where it came from or went), state change, continuity, explanation or delight. No purpose, no motion.
Data the user is reading or acting on never moves for style. Numbers do not animate through fake values.

## How it moves

- Animate `transform` and `opacity`. `clip-path` is fine for reveals. Never `transition: all`.
- Enter with ease-out, move on screen with ease-in-out, never ease-in for UI. Start from `scale(.96)` with opacity 0, never `scale(0)`.
- Popovers and menus grow from their trigger (`transform-origin`); dialogs stay centered.
- Interruptible: a second click reverses from where it is. Use transitions for repeated actions, not restarting keyframes.
- Exit the way it entered, a little faster than the entrance.
- Hover effects only under `(hover: hover) and (pointer: fine)`.
- **Reduced motion ships with every animation:** under `prefers-reduced-motion: reduce`, drop movement and keep content, using opacity or an instant change. No information depends on motion.

## Marketing and launch pages

- **One signature move**, tied to the product idea: a demo that types, a product that turns, a headline that resolves line by line. Done once, done well.
- **Quiet section entrances, optional:** heading, then text, then media, staggered 60 to 90 ms, rising 12 to 24 px, triggered once. **Never start content invisible:** animate transform only, or opacity from 0.6 or higher, so a page whose animation never runs, a screenshot or a search crawler still shows every word. check-ui fails text that is invisible at load.
- **Scroll motion:** GSAP ScrollTrigger inside `gsap.matchMedia()` so reduced-motion users get the static version. At most one or two pinned sections per page. Never hijack scroll direction or speed for core content.
- **Smooth scroll:** Lenis only on marketing pages, driven from the GSAP ticker, with its reduced-motion handling left on. Never on app screens or long forms.
- Loops (marquee, ambient video) need pause on hover and focus, stop under reduced motion, and a pause control if they run longer than 5 seconds.
- Pattern ideas worth borrowing, not copying: line-by-line text reveal, clip-path image reveal, a dock or spotlight navigation highlight, a short reveal loader under 1 second. Credit in [SOURCES.md](../../../../../SOURCES.md).

## 3D and immersive pages

Use 3D when shape, material or configuration helps the decision: a product to inspect, a space to understand, an option to see. Decorative 3D on a task screen is slop.

| Topic | Rule |
| --- | --- |
| Stack | three.js through React Three Fiber and drei, or plain three.js for one scene. glTF models with Draco or Meshopt; KTX2 textures. |
| Budget | Model under 3 MB compressed, textures under 2 MB total, under 100 draw calls, under 300k triangles desktop and 100k phone. 3D code loads after first paint. |
| Frame rate | 60 fps desktop target, 30 fps or better on a mid-range phone. Pixel ratio capped at 2 (1.5 on phones). Lower it when frames drop. |
| Idle | Render on demand when nothing moves. Pause when the canvas is off screen or the tab is hidden. Dispose geometry and textures on unmount. |
| Loading | A still image of the model shows first and is the LCP element. The canvas fades in when ready. Reserve its size: no layout shift. |
| Fallback | No WebGL, low power or reduced motion: the still image stays, with buttons for front, side and back views. No auto-rotation. Error and fallback controls (Try again, Open 3D view) appear only in their own state. |
| Input | Drag rotates with damping. On touch, vertical swipes still scroll the page. No zoom on the wheel unless the canvas is focused. A visible Reset view button. |
| Keyboard and screen readers | The canvas is focusable with a visible focus ring; arrow keys rotate. `role="img"` and an `aria-label` describing the object. A short visible hint: "Drag or use arrow keys to turn." |
| Look | Image-based lighting (a room environment) plus one key light; ACES tone mapping; sRGB output. Real materials over glow effects. |
| Layout | The canvas sits edge to edge in its section, not in a bordered card. Text never sits over busy geometry. |

## Handoff

For each motion: trigger, purpose, element, duration and easing token, interruption behavior, reduced-motion version.
For 3D: model source or placeholder, budgets above, fallback image, controls, keyboard map, and how it was checked.
A written motion note is not proof of smooth implementation. Check frame rate and reduced motion on the built page.
