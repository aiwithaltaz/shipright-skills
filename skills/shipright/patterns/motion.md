# Motion

Checked 2026-10-18 against vendor files in this pack and the public license pages.

## Tokens

120ms for a small state. 200ms to enter or leave. 320ms for a panel or a dialog. 600ms and up only for scroll and story.
Enter: cubic-bezier(.22, 1, .36, 1). Exit: cubic-bezier(.4, 0, 1, 1). Stagger 70ms.
Check: durations in tokens.css match these, or the design system names an override.

## Every animation has a job

Feedback (it worked), orientation (where it went), continuity (same thing, new place), or one-time delight.
No job, no animation. Scope the class. Never animate a control the owner did not ask to move.
Everything readable with no JavaScript. Off under reduced motion. A tilted 3D object lies flat when the page is zoomed.
Check: reduced motion shows the same words. A still stands in for WebGL.

## App catalog

Use the app-motion-kit block: selection, stepper, list add and remove, toast, skeleton to content, dialog, count-up, drag to reorder, success check, error shake once.
Check: the block's test passes before you copy it.

## Premium blocks

Checked 2026-10-18 against the jsDelivr files named here.

A brief that asks for a premium site, a scroll story, or a 3D product must copy these blocks. Do not use the stand-in blocks for that job.

| Block | Pin | Fallback |
| --- | --- | --- |
| scroll-story | gsap@3.12.5 and lenis@1.1.18 | beats in normal flow |
| product-3d | three@0.169.0 | the poster in the block |
| page-transition | gsap@3.12.5 | an instant swap |

`blocks/models/keel.glb` is an original model, CC0 1.0, noted in `blocks/models/LICENSE.txt`. It is not a scan. CDN sizes the same day: gsap.min.js 71 KB, ScrollTrigger.min.js 42 KB, lenis.min.js 13 KB, three.module.js 1,274 KB.

## Tool table

| Need | Use | Size checked | License | Reduced motion |
| --- | --- | --- | --- | --- |
| Small state | CSS | none | none | instant |
| List reorder | Web Animations API | none | platform | instant |
| Scroll story | GSAP 3.12.5 plus ScrollTrigger | gsap.min.js 71 KB, ScrollTrigger 42 KB on jsDelivr, 2026-10-18 | Standard no-charge license. Commercial use is allowed. Do not build a visual animation competitor. | content in normal flow |
| Smooth scroll on a marketing page | Lenis 1.1.18, fine pointer only | lenis.min.js 13 KB on jsDelivr, 2026-10-18 | MIT | off |
| A 3D product | Three.js 0.169.0, block product-3d | three.module.js 1,274 KB on jsDelivr, 2026-10-18 | MIT | still image |
| State machines from a designer | Rive runtime | confirm the wasm you ship | MIT runtime | first frame |
| Playback from a designer | Lottie (lottie-web) | confirm the build you ship | MIT | first frame |
| A game or particles | Canvas 2D | none | none | still |
| Video for marketing, not in-app UI | Remotion | n/a | Free for an individual or a firm of up to 3 people. A larger firm needs a company license. | n/a |

Do not add a library the table does not name. Record the date you rechecked.
