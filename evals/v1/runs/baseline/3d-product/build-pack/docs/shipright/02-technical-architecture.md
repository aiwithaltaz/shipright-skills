# 02 - Technical architecture

**Project path:** `docs/shipright/02-technical-architecture.md`

**Version/date:** v0.1 draft, 2026-10-13  **Sources and approval:** D4 stack (delegated Q4). D8 file budget is Proposed.

## Systems and stack

| Component | Responsibility | Chosen technology or Unknown | Source / owner |
| --- | --- | --- | --- |
| Site | One static home page | HTML, CSS, JavaScript modules, built with Vite (vanilla template) | D4 |
| 3D viewer | Render and rotate the speaker | three.js with `OrbitControls`, `RoomEnvironment`; `GLTFLoader` once the real file exists | D4, D5 |
| 3D model | The speaker shape and materials | Phase 1: built in code (stand-in). Launch: one .glb file from the owner | D5, D8 |
| Fonts | Display and body type | Google Fonts: Instrument Serif, Inter | D3 |
| Store | Cart, checkout, payment | The owner's existing store. URL Unknown | D1 |
| Hosting | Serve static files over HTTPS | Unknown. Any static host works | Owner |

Pin exact versions of `three` and `vite` in `package.json` when the project is created. The version is Unknown until then.

## Data and integrations

| Object / system | Read/write direction | Approved fields or Unknown | Access boundary | Failure behavior |
| --- | --- | --- | --- | --- |
| Product facts | Read only, written into the page at build time | Name, price, specs. Values Unknown | Public | Placeholders stay visible until confirmed |
| 3D model file | Read only, loaded by the browser | One .glb. Unknown | Public | Show the "3D view unavailable" state; specs and Buy still work |
| Store link | Outbound link only | Product URL. Unknown | Public | Prototype shows "store link isn't set yet" |

Flow: page loads, HTML and text render first, then the 3D module loads, then the model renders. The page never waits on 3D to show text or the Buy link.
No forms, no visitor data, no API calls in this phase.

## Constraints

- Phone and desktop browsers. WebGL is needed for 3D; without it the page still works.
- Load three.js as a module after the text. Do not block first paint on 3D.
- Cap device pixel ratio at 2. Render only while the viewer is on screen.
- No zoom on scroll and no pan, so the page scroll is never hijacked. One-finger drag on the viewer rotates; the page scrolls outside it.
- Proposed (D8): real .glb about 3 MB or less, compressed with Draco or Meshopt, textures 2048 px or less. Measure on a mid-range phone.

## Dependencies and open decisions

| Unknown / decision | Blocks what | Owner | Next evidence |
| --- | --- | --- | --- |
| 3D model file | T8, launch | Owner | .glb file |
| Store URL | T7, launch | Owner | URL |
| Hosting | Launch only | Owner | Choice of host |
| D8 file budget | T8 | Owner approval | Approve or change |
