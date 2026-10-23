# Motion and depth pack

## When to use
| Product type | Motion and depth |
| --- | --- |
| Portfolio, agency, launch, marketing, product landing | Yes. Required if the current site already has it (see BASELINE.md). |
| Store, content site | Light: reveal on scroll, hover, page transitions. |
| Utility app, tracker, dashboard, admin, form | No 3D, no scroll scenes. Only quick state feedback (150 to 250 ms). |

## Purpose first
Every effect answers: what does it show? Good: 3D object that IS the work (a device, a model, a map), scroll that tells a story step by step, a demo video of the real product. Bad: random particles, floating blobs, spin for its own sake.

## Patterns
- **GSAP + ScrollTrigger:** section reveal (y 24 px, opacity, 0.6 s, stagger 0.06), pinned story with 3 to 5 steps, number count-up only for real numbers. `gsap.matchMedia()` for desktop vs phone.
- **Three.js / WebGL:** one hero scene, at most 1 per page. Lazy load after first paint. Cap pixel ratio at 2. Pause when off screen (IntersectionObserver) or tab hidden. Fallback: a still image of the same scene.
- **Video:** muted, playsinline, poster image, loads when near view. Real demos only.
- **Micro:** hover and press states on every link and button, 150 to 250 ms.

## Must
- `prefers-reduced-motion`: no scroll scenes, no 3D motion, show the end state. Content never depends on motion.
- Performance: first screen readable under 2.5 s on phone, no layout shift, 60 fps scroll. Do not block text on a 3D load.
- Phone: simplify the scene (fewer objects, no cursor effects), keep the story.
- Libraries from a CDN or bundled; pin versions.

Deeper recipes are in [extras/](../extras/README.md).
