# ShipRight site

Static preview for ShipRight 1.1.0. Three proposed directions. None is approved. It does not deploy itself.

## Develop

```bash
cd site
npm install
npm run dev
```

`npm run dev` and `npm run build` copy the gallery images from `examples/before-after/` into `public/gallery/`. That folder is gitignored.

Open `/` and choose Split, Night, or Press.

## Deploy on Vercel

Do not deploy until a direction is approved.

1. Import `aiwithaltaz/shipright-skills`.
2. Set the root directory to `site`.
3. Framework preset: Astro. Build command: `npm run build`. Output directory: `dist`.
4. Leave the production domain unset until you have one.
5. When the domain is known, set `site` in `astro.config.mjs` so the canonical URL and Open Graph image are absolute.

No environment variables. No database. The install commands live in [src/data/install.js](src/data/install.js).

## Check

From the repository root, after `npm run build` inside `site/`:

```bash
node scripts/check-ui.mjs site/dist/index.html --root site/dist
node scripts/check-ui.mjs site/dist/preview/split/index.html --root site/dist
node scripts/check-ui.mjs site/dist/preview/night/index.html --root site/dist
node scripts/check-ui.mjs site/dist/preview/press/index.html --root site/dist
```

Open the screenshots. Fix every failure.

## Docs

The build pack for this site is in [docs/shipright/](docs/shipright/01-prd.md) and [DESIGN.md](DESIGN.md).
