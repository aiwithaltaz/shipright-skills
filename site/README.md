# ShipRight website

Draft 1.3 rebuild. Not deployed. The root `vercel.json` still builds this folder. `site/vercel.json` is unchanged.

```sh
cd site
npm ci
npm run dev
npm run build
```

Fonts are self-hosted in `public/fonts` (Inter and Fraunces, SIL OFL). The Keel model in `public/models` is the CC0 sample from the skill blocks.

## Stage 9

From the repo root, after `npm run build` inside `site/`:

```sh
node skills/shipright/scripts/check-ui.mjs site/dist/index.html --root site/dist --profile premium
node skills/shipright/scripts/check-ui.mjs site/dist/case-study.html --root site/dist --profile premium
node skills/shipright/scripts/run-tests.mjs site/record/test-plan.json --out site/record
node skills/shipright/scripts/consistency.mjs site/dist/index.html
node skills/shipright/scripts/check-record.mjs site/record
```

Section shots: `node site/scripts/shots-v13.mjs`. Output: `site/evidence/v1.3/`.

The page has no account, form, analytics, or cookies. No domain was invented. 1.3 scores are not on the page. The line is "results coming".
