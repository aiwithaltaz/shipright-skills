# Site pain map

Status: current

Source: site-discovery.md. Rank = impact x confidence / effort.

## Themes

1. Show the product working: S01, S02, S06.
2. Proof you can trust: S03, S05, S07, S04.
3. Lighter and answered: S08, S09.

## Rows

| ID | Pain | Evidence | Cause | Fix options | Chosen fix | Pattern | Screen and component | Test | I | C | E | When |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S01 | Hero is blank paper | 1280-index-run.png | missing feature | (a) pinned scroll replay (b) tap-through replay window | (b) a replay window that plays once and works on tap | W2, one live moment on tap | Hero, run window | Tapping each step shows that step. Reduced motion shows all words. | 5 | 5 | 3 | Now |
| S02 | No "what you get", no two ways in | walk 1 | copy | (a) one long list (b) two doors plus a real file list | (b) | Removal test, group by meaning | Doors act, folder act | Both commands visible at 390. Folder lists the 8 real file names. | 5 | 4 | 2 | Now |
| S05 | Opus looks stronger with no story | 1280-index-proof.png | trust | (a) hide the pairs (b) say what 1.2 missed and what 1.3 changed | (b) | Facts ladder, honest copy | Proof act | Each pair names one real difference from the screens. | 5 | 4 | 2 | Now |
| S03 | Defensive copy repeated | page source | copy | (a) delete (b) say it once in proof | (b) | Removal test | Whole page | "pending" appears once in visible copy. | 4 | 5 | 1 | Now |
| S07 | Older before/after shots dropped | owner ask | missing feature | (a) grid (b) tabs with a drag slider | (b) | One composition per act | Work act | Four tabs work by tap and arrow keys. | 4 | 5 | 2 | Now |
| S04 | c6 halves do not line up | 1280-index-compare.png | layout | (a) same box, cover, top-left (b) side by side | (a) for all four pairs | Slider check | Work act | Both images share one box at 390 and 1280. | 3 | 4 | 1 | Now |
| S06 | Stages missing | 1280-index-process.png | copy | (a) pinned list (b) a grid of 11 stages with the file each writes | (b) | W4 | Stages act | 11 stages listed with a file. | 3 | 4 | 2 | Now |
| S08 | Heavy 3D bundle | build output | performance | (a) lazy load (b) remove three.js | (b) | Removal test | Hero | Build has no chunk over 100 kB. | 3 | 5 | 1 | Now |
| S09 | No FAQ | walk 1 | missing feature | (a) FAQ block (b) skip | (a) hover-invert-faq | Block catalog | FAQ act | One open at a time, works by tap. | 3 | 4 | 1 | Now |
