# ShipRight website

Continues the owner-approved Product Manuscript proof. The historical proof stays unchanged.

Run with Node 22.12+ or 24:

```sh
cd site
npm ci
npm run dev
npm run build
npm run preview
```

Import the repository into Vercel with its default root. The root vercel.json installs and builds site/ and serves site/dist as static files. If the project root is set to site/, its own vercel.json supports that setup too. No deployment was performed.

Downloads are byte-for-byte copies of the released files in ../dist. Gallery images are copies of repository evidence. IVC frames are documented reconstructions, not original Figma exports. Update these copies when their source changes.

The page has no account, public form, analytics or cookies. Production host, canonical URL, sitemap and legal applicability remain owner decisions. No domain or policy has been invented.

## Verification

Build first, then serve the static output with a server that returns the supplied 404.html with HTTP status 404. The browser verification targets this static server, not Vite's SPA fallback. It checks controls, downloads, motion fallbacks, six widths and 200% reading text.

```sh
NODE_PATH=/path/to/playwright/node_modules SHIPRIGHT_BROWSER=/path/to/chromium \
SHIPRIGHT_SITE_URL=http://127.0.0.1:4181 node site/scripts/verify.cjs
```

Playwright 1.58.2 was used. The script writes temporary evidence under /tmp/shipright-site-check, or the SHIPRIGHT_EVIDENCE directory when supplied. The repository's premium checker is a separate gate. See [critique](evidence/ux-critique.md) and [ship check](evidence/ship-check.md).
