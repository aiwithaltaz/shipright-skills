The home page and the Cursor build pack are both done. Cursor can start on the page structure and the 3D viewer now. The site isn't ready to launch yet, because I still need five facts from you (listed below). I didn't make any of them up.

**See the page:** `index.html`. It's one file. Open it from a local web server so three.js can load.

## What's on the home page

1. A slim note at the top saying which content is placeholder.
2. Header: the name, a "Specs" link and a "Buy" button.
3. Hero: "Wireless speaker", the name, one line ("See it from every side before you buy. Drag the speaker to turn it."), and a large 3D viewer.
4. The 3D viewer: drag to turn it with a mouse or one finger. There's no zoom or pan, so it never takes over page scrolling. Turn left, Turn right and Reset view buttons, plus the arrow keys, give a way to rotate without dragging. If 3D can't run, a simple drawing and a plain message show instead, and the specs and Buy still work.
5. Specifications: "Connection: Wireless", then rows marked "To be confirmed".
6. Buy: price (to be confirmed) and "Buy on our store". In the prototype, the button says the store link isn't set yet. It doesn't pretend to open anything.

The speaker is a stand-in I built in code: graphite fabric, a brass band and a top with controls. The page says it's a stand-in.

## What I decided for you (you said "You decide")

- **D1** The main action is "Buy on our store". It opens the store you already use. This site has no cart or payment.
- **D2** One home page only. Cart, accounts, reviews, a color picker, newsletter, chat and extra pages are left out.
- **D3** Working name "Model 01" and a quiet dark look (warm brass accent, Instrument Serif and Inter). It's a stand-in, so swap it out when your brand is ready.
- **D4** Stack: a static Vite site with three.js. No framework.

## I need these from you before launch

Product name, price and currency, store link, real specs, and the 3D model file (.glb). A product designer or 3D artist can export it from CAD. Also tell me whether you want privacy/terms pages or analytics. I won't write legal text.

## Needs approval before build

- **D6** A short settle turn when the 3D view first loads, so people can see it rotates. It's off for reduced motion. It's in the prototype; say no and it goes.
- **D8** Size limit for the real 3D file: about 3 MB or less, compressed, textures 2048 px or less.

## Files for Cursor

Copy these into your project root, keeping the folders:

- `PRODUCT.md`: scope in one page
- `DESIGN.md`: colors, type, spacing, components, placement, motion
- `docs/shipright/01-prd.md`: jobs, phase, unknowns, decision log
- `docs/shipright/02-technical-architecture.md`: stack and 3D loading rules
- `docs/shipright/03-security-and-access.md`: public site, no data collected
- `docs/shipright/04-frontend-spec.md`: every element, state and acceptance check
- `docs/shipright/05-feature-ticket-list.md`: tickets T1 to T10 in order
- `docs/shipright/build-rules.md`: the instructions Cursor follows
- `index.html`: the visual reference

Prompt to start with in Cursor:

> Read PRODUCT.md, DESIGN.md and docs/shipright/build-rules.md. Use index.html as the visual reference. Build tickets T1 to T5 from docs/shipright/05-feature-ticket-list.md. Don't add anything that isn't in the frontend spec, and don't fill in any "To be confirmed" values.

## Checks (specification and prototype stage)

| UI check | Status | Note |
| --- | --- | --- |
| 1 Screen context | Pass | Job, phase and sources in 04 |
| 2 Design direction | Pass | Delegated stand-in, labeled |
| 3 Hierarchy | Pass (spec) | Rendered layout not verified |
| 4 States | Pass (spec) | Loading, unavailable, context lost, reduced motion, JS off |
| 5 Integrity | Pass | No invented specs, prices or claims |
| 6 Navigation | Pass (spec) | Anchors; Back returns from the store |
| 7 Accessibility | Pass (spec) | Keyboard, non-drag controls, contrast calculated; not tested |
| 8 Motion | Pass (spec) | D6 still Proposed |
| 9 Content and density | Pass (spec) | Rendered fit not verified |
| 10 Handoff | Pass | Decisions, exclusions and next stage listed |

Product checks: Context, Outcome, Scope, Recovery, States, Consequences and Decisions all Pass at specification stage. Empty results is Not applicable because there's no search or list.

**Limits:** I didn't render or test the page in a browser. Drag, keyboard, phone scrolling, contrast on screen and load time all need checking on the built page.

**Verdict:** Ready for build (T1 to T5). Launch readiness isn't established until the five facts above are in and T6 to T10 are done.
