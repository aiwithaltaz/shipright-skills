#!/bin/sh
# Screenshot sample screens at 390 by 844, then build the README pair.
# Usage, from the pack root: sh tests/capture.sh 0.6.2-draft
set -eu
VERSION="${1:-0.6.2-draft}"
ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
CHROME="${CHROME:-google-chrome}"
python3 "$ROOT/tests/build_samples.py"
for skill in product-design ui-ux-design ux-critique ship-check; do
  for side in before after; do
    html="$ROOT/tests/fixtures/$VERSION/$skill/$side.html"
    png="$ROOT/examples/before-after/$VERSION/$skill/$side.png"
    profile="/tmp/shipright-chrome-$skill-$side"
    mkdir -p "$(dirname "$png")"
    rm -rf "$profile"
    # Chrome writes the PNG, then often stays open. Stop it once the file exists.
    timeout 15 "$CHROME" --headless=new --disable-gpu --no-sandbox --disable-dev-shm-usage \
      --hide-scrollbars --force-device-scale-factor=1 --window-size=390,844 \
      --user-data-dir="$profile" --virtual-time-budget=2000 \
      --screenshot="$png" "file://$html" || true
    rm -rf "$profile"
    test -s "$png"
  done
done
python3 "$ROOT/tests/compose_pairs.py"
echo "Wrote examples/before-after/$VERSION"
