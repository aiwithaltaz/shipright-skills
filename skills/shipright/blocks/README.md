# Blocks

Copy a block and set its attributes. Do not load more of this folder than this file. Do not rewrite a block unless a test fails.

A premium site, a scroll story, or a 3D product uses scroll-story, product-3d, and page-transition. They load the pinned CDN in `patterns/motion.md`. If the CDN fails, or motion is reduced, the still in the block is the page. product-stage, pinned-scene, and exploded-view are the no-network stand-ins.

| Block | Job | Size | Attributes |
| --- | --- | --- | --- |
| scroll-story | Lenis plus a pinned GSAP story | 8 KB | data-beats |
| product-3d | CC0 glTF, orbit, scroll explode | 9 KB | data-model, data-accent |
| page-transition | Index into a case | 6 KB | data-from, data-to |
| product-stage | Stand-in product, drag or Turn | 5 KB | data-accent, data-label |
| exploded-view | Parts with numbered labels | 4 KB | data-gap |
| pinned-scene | Named beats, no library | 4 KB | data-beats |
| mask-reveal | Line-by-line title | 4 KB | data-lines |
| block-wipe | Stepped mask over a heading | 4 KB | data-steps |
| hover-invert-faq | One question open, tap or keys | 4 KB | data-single |
| scroll-rail | Cards step without widening the page | 4 KB | data-count |
| counter-preloader | Warm-up counter with Skip | 4 KB | data-duration |
| app-shell | Sidebar, no active dot, phone drawer | 4 KB | data-product |
| attention-list | Situation, versus normal, one action | 4 KB | data-demo |
| data-table | Sort, full-border selection, next step | 4 KB | data-selectable |
| week-board | Days, capacity, move a chip | 4 KB | data-days |
| context-rail | Work plus the next decision | 4 KB | data-decision |
| custom-select | Keyboard list, flips near the bottom | 5 KB | data-label |
| form-kit | Phone mask, blur error, Back and Next | 5 KB | data-mask |
| states-kit | Empty, loading, error, offline, 404, 500 | 4 KB | data-states |
| app-motion-kit | Selection, add, toast, count, dialog, reorder, shake | 8 KB | data-duration |

Fonts: `fonts/inter-latin-400.woff2` and `fonts/fraunces-latin-400.woff2`, SIL OFL, with `fonts/fonts.css`. The 3D model is `models/keel.glb`, CC0, with `models/LICENSE.txt`.
