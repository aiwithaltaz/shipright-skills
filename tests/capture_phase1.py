#!/usr/bin/env python3
"""Render authored research illustrations. Never runtime or benchmark evidence.

Chrome mode: --browser /path/to/chrome
Explicit print-renderer fallback: --renderer weasyprint (requires WeasyPrint,
Pillow and pdftoppm). Print-rendered PNGs are not browser screenshots.
Existing 0.6.2 capture scripts and fixtures are untouched.
"""
import argparse
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
REL = Path('phase-1-ux-research/product-design')


def capture(args):
    source = ROOT / 'tests/fixtures' / REL
    out = ROOT / 'examples/before-after' / REL
    out.mkdir(parents=True, exist_ok=True)
    for side in ('before', 'after'):
        target = out / (side + '.png')
        target.unlink(missing_ok=True)
        with tempfile.TemporaryDirectory(prefix='shipright-phase1-capture-') as tmp:
            if args.renderer == 'chrome':
                browser = args.browser or shutil.which('google-chrome') or shutil.which('chromium')
                if not browser:
                    raise SystemExit('No browser. Provide --browser or explicitly select --renderer weasyprint.')
                cmd = [browser, '--headless=new', '--no-sandbox', '--disable-gpu',
                       '--disable-dev-shm-usage', '--hide-scrollbars',
                       '--force-device-scale-factor=1', '--window-size=540,860',
                       '--user-data-dir=' + tmp, '--screenshot=' + str(target),
                       (source / (side + '.html')).as_uri()]
                try:
                    subprocess.run(cmd, check=True, timeout=20, capture_output=True)
                except subprocess.TimeoutExpired:
                    if not target.is_file():
                        raise
            else:
                from weasyprint import HTML
                document = HTML(filename=str(source / (side + '.html'))).render()
                if len(document.pages) != 1:
                    raise RuntimeError(f'{side}: illustration spans {len(document.pages)} pages')
                pdf = Path(tmp) / 'view.pdf'
                document.write_pdf(str(pdf))
                subprocess.run(['pdftoppm', '-r', '96', '-f', '1', '-singlefile', '-png',
                                str(pdf), str(Path(tmp) / 'view')], check=True, capture_output=True)
                shutil.copyfile(Path(tmp) / 'view.png', target)
        with Image.open(target) as im:
            if im.size != (540, 860):
                raise RuntimeError(f'{side}: unexpected dimensions {im.size}')
    with Image.open(out / 'before.png') as first, Image.open(out / 'after.png') as second:
        pair = Image.new('RGB', (1112, 916), '#e6ebed')
        pair.paste(first.convert('RGB'), (8, 48))
        pair.paste(second.convert('RGB'), (564, 48))
        draw = ImageDraw.Draw(pair)
        font = ImageFont.truetype('DejaVuSans.ttf', 17)
        draw.text((14, 15), 'Before: unsupported claims', font=font, fill='#172128')
        draw.text((570, 15), 'After: bounded research', font=font, fill='#172128')
        pair.save(out / 'compare.png')
    print(json.dumps({'renderer': args.renderer, 'output': str(out.relative_to(ROOT)),
                      'evidence': 'authored illustration only; no runtime or user validation'}))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--renderer', choices=('chrome', 'weasyprint'), default='chrome')
    parser.add_argument('--browser')
    capture(parser.parse_args())
