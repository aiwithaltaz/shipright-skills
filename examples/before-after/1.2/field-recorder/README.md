# Field Recorder One · SAMPLE

Local educational product study. Owner selected Instrument, inspected. No publication, purchase, contact or recording simulator.

## Reproduce

Node 22.12 or newer. Dependencies remain outside this source tree. From a new workspace task:

```sh
npm install --prefix /workspace/.shipright-tools/field-recorder-deps --cache /workspace/.shipright-tools/npm-cache react@19.3.1 react-dom@19.3.1 three@0.186.1 gsap@3.15.0 lenis@1.3.26 vite@8.3.4
cd /workspace/shipright-skills/examples/before-after/1.2/field-recorder
/workspace/.shipright-tools/field-recorder-deps/node_modules/.bin/vite --configLoader native --host 0.0.0.0 --port 5174
```

The internal development server listens on port 5174. Build locally using:

```sh
/workspace/.shipright-tools/field-recorder-deps/node_modules/.bin/vite build --configLoader native
```

For an exact repeat of all direct and transitive packages, run `bash tooling/install.sh` instead of the npm install line above. It copies the retained tooling manifest and full lockfile to the external dependency directory and runs npm ci. Vite config resolves the exact external dependency path. package.json records direct dependency pins. Vite cache is stored at `/workspace/.shipright-tools/field-recorder-vite-cache`; production build output is stored at `/workspace/.shipright-tools/field-recorder-dist`, outside the checkout. Source, pack and evidence are retained. Verification requires Chromium at /usr/bin/chromium and Playwright via NODE_PATH=/workspace/.shipright-tools/node/node_modules:

```sh
NODE_PATH=/workspace/.shipright-tools/node/node_modules node evidence/verify.cjs
NODE_PATH=/workspace/.shipright-tools/node/node_modules node /workspace/shipright-skills/scripts/check-ui.mjs http://localhost:5174 --root . --profile premium --browser /usr/bin/chromium --out evidence/check-ui
```

The verification script saves screenshots, actual behavior results and temporary video frames. Encode the short scroll artifact with:

```sh
ffmpeg -y -framerate 10 -i .cache/video-frames/%04d.png -c:v libvpx-vp9 -b:v 0 -crf 38 evidence/scroll.webm
```

Exact initial response: initial-response.md. Approval: docs/shipright/owner-approval.md. Selected 1,076-word build prompt: docs/shipright/05-feature-ticket-list.md. Sample geometry is generated locally, and exact shape/port placement is illustrative. Physical product runtime, codec, capacity, price and certification remain unknown and omitted. Font provenance is recorded in docs/shipright/font-resolution.md.
