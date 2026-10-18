# ShipRight website

The 1.3.1 site (released in the repo). Not deployed. The root `vercel.json` still builds this folder. `site/vercel.json` is unchanged. There is no zip.

```sh
cd site
npm ci
npm run dev
npm run build
```

Fonts are self-hosted in `public/fonts` (Inter and Fraunces, SIL OFL). `public/models/keel.glb` remains the CC0 sample from the skill blocks. This page does not load it. The first screen draws the five files a run writes.

## Stage 9

From the repo root, after `npm run build` inside `site/`:

```sh
node skills/shipright/scripts/check-ui.mjs site/dist/index.html --root site/dist --profile premium --release-state released --pack-version 1.3.1
node skills/shipright/scripts/check-ui.mjs site/dist/case-study.html --root site/dist --profile premium --release-state released --pack-version 1.3.1
node skills/shipright/scripts/run-tests.mjs site/record/test-plan.json --out site/record
node skills/shipright/scripts/consistency.mjs site/dist/index.html
node skills/shipright/scripts/check-record.mjs site/record
```

Section shots: `node site/scripts/shots-v131.mjs`. Output: `site/evidence/v1.3.1/`.

The page has no account, form, analytics, or cookies. No domain was invented. Eval scores are pending. The page does not invent a winner.
