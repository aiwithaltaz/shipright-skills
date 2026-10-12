#!/usr/bin/env python3
"""Screenshot the Phase 5.1 illustration fixtures. Not a model trial."""
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[3]
FIX = Path(__file__).resolve().parent
CHROME = 'google-chrome'
FONT = '/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf'
REGULAR = '/usr/share/fonts/truetype/macos/Inter-Regular.ttf'

JOBS = [
    ('ui-ux-design/before.html', ROOT / 'examples/before-after/phase-5-1-amendment/ui-ux-design/before.png', 390, 844),
    ('ui-ux-design/after.html', ROOT / 'examples/before-after/phase-5-1-amendment/ui-ux-design/after.png', 390, 844),
    ('ivc/before-person.html', ROOT / 'examples/ivc-2026-registration/figma-redesign/before-person-details.png', 1120, 760),
    ('ivc/after-person.html', ROOT / 'examples/ivc-2026-registration/figma-redesign/after-person-details.png', 1120, 860),
    ('ivc/before-search.html', ROOT / 'examples/ivc-2026-registration/figma-redesign/before-search-results.png', 1120, 780),
    ('ivc/after-search.html', ROOT / 'examples/ivc-2026-registration/figma-redesign/after-search-results.png', 1120, 780),
]


def shoot(html, png, width, height):
    png.parent.mkdir(parents=True, exist_ok=True)
    if png.exists():
        png.unlink()
    url = html.resolve().as_uri()
    profile = f'/tmp/shipright-chrome-{png.stem}'
    subprocess.run(['rm', '-rf', profile], check=False)
    cmd = [
        CHROME, '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
        '--hide-scrollbars', '--force-device-scale-factor=1', f'--window-size={width},{height}',
        f'--user-data-dir={profile}', '--virtual-time-budget=2000', f'--screenshot={png}', url,
    ]
    try:
        subprocess.run(cmd, check=False, timeout=12)
    except subprocess.TimeoutExpired:
        subprocess.run(['pkill', '-f', profile], check=False)
    if not png.is_file() or png.stat().st_size < 1000:
        raise SystemExit(f'screenshot failed: {png}')


def compare():
    before = Image.open(ROOT / 'examples/before-after/phase-5-1-amendment/ui-ux-design/before.png').convert('RGB')
    after = Image.open(ROOT / 'examples/before-after/phase-5-1-amendment/ui-ux-design/after.png').convert('RGB')
    if before.size != after.size:
        raise SystemExit(f'sizes differ: {before.size} {after.size}')
    w, h = before.size
    pad, gap, top = 28, 20, 72
    canvas = Image.new('RGB', (pad + w + gap + w + pad, top + h + pad), '#ebe6de')
    draw = ImageDraw.Draw(canvas)
    title = ImageFont.truetype(FONT, 18)
    label = ImageFont.truetype(REGULAR, 14)
    name = 'ui-ux-design'
    box = draw.textbbox((0, 0), name, font=label)
    draw.text(((canvas.width - (box[2] - box[0])) / 2, 14), name, font=label, fill='#6b6560')
    draw.text((pad, 40), 'Before', font=title, fill='#1c1917')
    draw.text((pad + w + gap, 40), 'After', font=title, fill='#1c1917')
    canvas.paste(before, (pad, top))
    canvas.paste(after, (pad + w + gap, top))
    out = ROOT / 'examples/before-after/phase-5-1-amendment/ui-ux-design/compare.png'
    canvas.save(out, 'PNG')
    print(out, canvas.size)


def main():
    for rel, png, width, height in JOBS:
        shoot(FIX / rel, png, width, height)
        print(png.relative_to(ROOT), png.stat().st_size)
    compare()


if __name__ == '__main__':
    main()
