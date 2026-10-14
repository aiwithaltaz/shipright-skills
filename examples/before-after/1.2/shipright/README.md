# ShipRight Product Manuscript proof

Owner approved direction A. Source is one Vite page with Three.js, GSAP ScrollTrigger and Lenis. No publication.

## Reproduce
Run from the repository root:

```sh
npm install --prefix /tmp/shipright-manuscript-tools --cache /workspace/.shipright-tools/npm-cache vite@8.3.4 gsap@3.15.0 lenis@1.3.26 three@0.186.1
/tmp/shipright-manuscript-tools/node_modules/.bin/vite --config examples/before-after/1.2/shipright/vite.config.mjs examples/before-after/1.2/shipright
```

The internal development server listens on 127.0.0.1 port 4176. The Vite filesystem allowlist and module imports intentionally address that external dependency directory. `package.json` records resolved dependency versions; no node_modules belongs in proof source.

Check with Node and supplied Playwright:

```sh
NODE_PATH=/workspace/.shipright-tools/node/node_modules SHIPRIGHT_BROWSER=/usr/bin/chromium node scripts/check-ui.mjs http://127.0.0.1:4176 --root examples/before-after/1.2/shipright --out examples/before-after/1.2/shipright/evidence/check-ui --profile premium
```

Evidence is retained under evidence/. Native anchors, mode accordions, clipboard success/failure, reduced motion and no-WebGL fallback are relevant behaviors. Physical phone FPS and assistive technology remain unverified. No deployment instruction is implied.

Build static output outside proof source:

```sh
/tmp/shipright-manuscript-tools/node_modules/.bin/vite build --config examples/before-after/1.2/shipright/vite.config.mjs examples/before-after/1.2/shipright --outDir /tmp/shipright-manuscript-build
```

Capture evidence with `capture.cjs` using supplied Playwright. If its bundled encoder is unavailable, provide the system encoder without editing the global cache:

```sh
mkdir -p /tmp/shipright-playwright/ffmpeg-1011
ln -sf /usr/bin/ffmpeg /tmp/shipright-playwright/ffmpeg-1011/ffmpeg-linux
PLAYWRIGHT_BROWSERS_PATH=/tmp/shipright-playwright NODE_PATH=/workspace/.shipright-tools/node/node_modules node examples/before-after/1.2/shipright/capture.cjs
```
