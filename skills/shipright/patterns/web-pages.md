# Web pages

Open this for a public site. Do not also open app-screens.md on the same pass.

A public page is a six-act story. Each act has a job. The act list is the architecture. Options change the story and the technique set, not the palette.

## W1. Supplied facts do work

Every fact the owner gave changes the page, not just the copy.
Why: hours in a footer do not help someone who arrives at night.
Good: a live "Closed, opens tomorrow at 7am" state. A 72-hour notice sets the earliest date in the form.
Bad: the hours as a paragraph while the form accepts any date.
Check: each Supplied fact is either behavior or labeled as not used yet, with a reason.

## W2. The product is on stage

The first screen shows the real product, and a person can touch it.
Why: a headline about the product is not the product.
Good: press a key and the matching key on the object moves. A still image remains when WebGL is off.
Bad: a gradient hero and the product three screens down.
Check: the first screen contains the product or a labeled Illustrative render. One control above the fold works on tap, not only hover.

## W3. Accent from the product

The accent color comes from the product or its world.
Why: a generic purple does not belong to this thing.
Good: keycap yellow, crust brown, field green.
Bad: the same purple gradient on every site.
Check: the palette line names the object or material the accent came from.

## W4. Each act is a new composition

Scroll changes the layout, not only the words.
Why: six acts that look like one long column teach nothing.
Good: hero, top-down layout, parts lifting, case opening, a detail sliding in.
Bad: the same centered heading and paragraph, six times.
Check: neighboring acts differ in composition. Name the block used for each act.

## Block catalog

| Act job | Block |
| --- | --- |
| Product on stage, turn or drag | product-stage |
| Parts come apart | exploded-view |
| One sticky scene, named beats | pinned-scene |
| Title arrives line by line | mask-reveal |
| A mask wipes off a heading | block-wipe |
| Questions, one open | hover-invert-faq |
| A row of cards driven by scroll | scroll-rail |
| A short warm-up before the page | counter-preloader |

Copy the block. Set its attributes. Do not rewrite it unless a test fails.
Phone first. The same words remain when motion is reduced and when JavaScript is off.
