#!/bin/sh
# Screenshot sample screens at 1280 by 800.
# Usage, from the pack root: sh tests/capture.sh 0.6.2-draft
set -eu
VERSION="${1:-0.6.2-draft}"
ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
CHROME="${CHROME:-google-chrome}"
for skill in product-design ui-ux-design ux-critique ship-check; do
  for side in before after; do
    html="$ROOT/tests/fixtures/$VERSION/$skill/$side.html"
    png="$ROOT/examples/before-after/$VERSION/$skill/$side.png"
    mkdir -p "$(dirname "$png")"
    # Chrome writes the PNG, then often stays open. Stop it once the file exists.
    timeout 12 "$CHROME" --headless=new --disable-gpu --no-sandbox --disable-dev-shm-usage \
      --hide-scrollbars --force-device-scale-factor=1 --window-size=1280,800 \
      --virtual-time-budget=2000 --screenshot="$png" "file://$html" || true
    test -s "$png"
  done
done
echo "Wrote examples/before-after/$VERSION"
