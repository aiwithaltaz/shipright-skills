# ShipRight site

Static home page for ShipRight 1.1.0. The approved look is Depth. It does not deploy itself.

## Develop

```bash
cd site
npm install
npm run dev
```

`npm run dev` and `npm run build` copy the gallery images from `examples/before-after/` into `public/gallery/`. That folder is gitignored.

Open `/`.

## Deploy on Vercel

Do not deploy until the owner asks. Then import the repo, set the root directory to `site`, use the Astro preset, and leave environment variables empty. The build command is `npm run build`. The output is `dist`.

## Check

From the repository root, after `npm run build` inside `site/`:

```bash
node scripts/check-ui.mjs site/dist/index.html --root site/dist
```

Open the screenshots. Fix every failure.
