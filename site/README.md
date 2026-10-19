# ShipRight website

The 1.3.1 site. The root `vercel.json` builds this folder. `site/vercel.json` is unchanged. There is no zip.

```sh
cd site
npm ci
npm run dev
npm run build
```

No runtime libraries. Fonts are self-hosted in `public/fonts` (Inter and Fraunces, SIL OFL).

## Acts

1. Run: a replay of the real c3 run (Sonnet with ShipRight 1.2), five tappable steps, the built screen behind it.
2. Two ways in: new idea, or an app you already built.
3. What lands in your folder: real excerpts from the c3 run files.
4. Before and after: four pairs in one slider (0.6.2 to 1.0 product site and dashboard, the c6 feedback round, the IVC Figma redesign).
5. Eleven stages and the file each writes.
6. Proof: three baseline 1.2 pairs against Opus alone, what 1.2 missed, and what 1.3 changed. 1.3 scores are pending and the page says so once.
7. Install. 8. Questions. Footer.

## Stage 9

From the repo root, after `npm run build` inside `site/`:

```sh
node skills/shipright/scripts/check-ui.mjs site/dist/index.html --root site/dist --profile premium --release-state released --pack-version 1.3.1
node skills/shipright/scripts/check-ui.mjs site/dist/case-study.html --root site/dist --profile premium --release-state released --pack-version 1.3.1
node skills/shipright/scripts/run-tests.mjs site/record/test-plan.json --out site/record
node skills/shipright/scripts/consistency.mjs site/dist/index.html
node skills/shipright/scripts/check-record.mjs site/record
```

Section shots: `node site/scripts/shots.mjs site/dist <out-folder> index.html case-study.html`. Before and after shots of this rebuild: `site/evidence/v1.3.1-site/`.

The page has no account, form, analytics, or cookies.
