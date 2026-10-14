# Architecture
One route `/`, six acts A1–A6. No server data, roles, credentials, integrations or environment variables.

Proposed (delegated): Vite with semantic HTML, CSS and JavaScript; GSAP ScrollTrigger for one optional scroll timeline and Lenis for one animation driver. Software has no useful physical product object: do not add WebGL or React Three Fiber merely to satisfy a fashionable stack. A real DOM output fragment is immediately accessible and cheaper to render. Switch to Astro if content expands across public routes; use React only if stateful product UI is added in an authorized phase. Keep dependencies outside tracked tree using supplied tool cache.

Clipboard uses the browser Clipboard API and a selectable text fallback. Native anchors remain functional without JavaScript. Fonts: locally available system sans/serif/monospace; no external font service. Assets consist of authored HTML/CSS, no model/textures. A single optional progress-driven animation controls chosen act transitions. Reduced motion disables smooth scrolling and scrub; all acts stay in normal flow. Hidden-tab animation work pauses; destroy listeners/timeline on cleanup. No sound.

Target desktop 1280 and phone 390. Check real scroll, reverse scroll, keyboard, copy success/error and repository links; save screenshots and short scroll WebM. Device FPS and assistive technology remain Not verified unless measured on relevant devices. Dependencies and dev server never imply publication.

## Approved stack clarification
The initial no-WebGL proposal above is Superseded by owner clarification; see decision-clarification.md. Final implementation adds Three.js 0.186.1 for one decorative paper-depth canvas, GSAP 3.15.0 and Lenis 1.3.26, with Vite 8.3.4. No model/textures; no-WebGL leaves the actual DOM manuscript intact.
