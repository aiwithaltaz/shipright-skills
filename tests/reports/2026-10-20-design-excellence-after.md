# Design Excellence implementation validation

Pack 1.4.0 Design Excellence draft. Implemented and inspected by Codex. No independent builder or human aesthetic judge participated. Nothing was pushed, tagged, deployed or published.

## Scope and context

Seven idea-to-design steps and seven templates now share a short planning summary. Steps 1 to 5 shrink from 1,768 to 975 instruction words. The router grows from 1,181 to 1,234 words, below its unchanged 1,600-word cap. The canonical app craft layer loads conditionally. 21 research-synthesis cards supplement the existing 445 cards without re-distilling them.

The supplied research is attributed as secondary synthesis. Evidence extracts keep its SHA-256 and JSON pointers. Card quotes are not represented as verified upstream quotations.

## Checks

- Required context/token checker passes with tiktoken 0.12.0 and cl100k_base. Largest dealt output: 931/1200 tokens. Largest declared UI mode path: 11159/12000 tokens. Frozen limits were not raised.
- Source validation passes, including preserved historical bytes and stable mode gate IDs. All 160 mutation self-tests pass, including new guards for required charts, honest score validity and preserving zero/false. The mutation run used a frozen disposable source copy; final source/link validation also runs on the final working tree.
- New focused suite: 3 Python test methods pass, including 20 real-browser cases for positive, negative and false-positive behavior. Card provenance, installed-card equality, priority dealing and spacing exceptions are exercised.
- Full regression run on a disposable copy: 98 methods executed, 94 passed, 4 failed, no skips. Two negative fixtures still used newly allowed 12px spacing; one runner treated the browser's implicit favicon request as a page failure; one legacy 3D/block test could not trust CDN certificates.
- After correcting those fixtures and the optional favicon response, the affected Phase 2 suite passes 5 of 6 methods. The sole remaining failure is the legacy CDN/3D block test. It reports ERR_CERT_AUTHORITY_INVALID for page-transition, product-3d and scroll-story. Blank canvas is a consequence of the failed script loads. No TLS verification was bypassed. Combining the full run with these affected reruns verifies 97 of the 98 test methods; the remaining method stays failed/blocked, not skipped or passed.
- Dealer rerun: 4 methods pass. Export rerun: 2 methods pass. Crawl rerun: 1 method passes. The fixture action runner passes all 11 assertions.
- Website production build passes with the existing lockfile. No site source was changed.
- Text patch applies cleanly to the original HEAD. Generated PNGs and the local skill archive are separate artifacts.

## Visual evidence

The authored CRM before fixture triggers 9 failures and 3 warnings across desktop and phone. The after fixture has 0 failures and 0 warnings. The same four labeled sample records appear in both; the after derives its stage-count chart from those records. Reports are under docs/design-excellence/evidence.

Captures and comparisons: examples/before-after/design-excellence/. All six PNGs were opened and inspected. The first after capture revealed tiny phone SVG labels and duplicate desktop navigation. Both were corrected, recaptured and inspected. The final phone chart uses readable labels, nav has a visible scroll hint, and table comparison remains in a labeled contained scroller.

These authored fixtures illustrate written rules and checker behavior. They are not the original missing A/B artifacts, independently generated builds, user research, or evidence of a universal visual win. Actual reference-product screenshot comparison and independent taste are Not verified. No 8/10 aesthetic score is claimed for this maintenance task. The new workflow requires that comparison for future product builds.

## Remaining environment blocker

The system Chromium certificate store lacks the environment proxy CA. Automatic approval review rejected importing that trusted environment certificate because the persistent change broadens browser trust beyond the repository changes. No import occurred and trust settings remain unchanged. Adding that CA requires explicit user authorization; until then, the legacy CDN/3D test remains blocked. It would allow Chromium to trust certificates signed by that proxy CA, so the change affects browser trust beyond one fixture.

Runtime: Node 24.19.0, Python 3.12.14, Playwright 1.58.2, system Chromium 154.0.8037.57. Runners now honor the same optional SHIPRIGHT_BROWSER override as check-ui. Default browser behavior is unchanged when the variable is absent.

## Reproduce

From the repository root, install evals/requirements-context.txt and Playwright 1.58.2 with Chromium. Set NODE_PATH to the external Playwright node_modules when using a separate tools directory; SHIPRIGHT_BROWSER may select an installed Chromium. Preserve TLS verification.

Run source validation with --self-test, check_context.py, unittest discovery, and git diff --check. Run full discovery in a disposable copy because the existing block tests regenerate screenshots and the fixture runner writes a tracked report. The new focused suite is `python3 -m unittest discover -s tests -p test_design_excellence.py -v`.

For the illustration run `node scripts/check-ui.mjs tests/fixtures/design-excellence/after.html --root . --profile app --out /tmp/shipright-craft-after`. The before fixture is expected to fail. Build the site with `npm ci` and `npm run build` inside site/.

## A/B evidence

Not run. The separate protocol in docs/design-excellence/README.md freezes three arms, matching budgets and blind review. The reported 21/19 and 23/27 results remain owner-supplied and unverified. New rubric scores must not be equated to those totals without the original scoring criteria.
