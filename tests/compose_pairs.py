#!/usr/bin/env python3
"""Place each before/after pair side by side for the README."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
VERSION = '0.6.2'
FONT = '/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf'
REGULAR = '/usr/share/fonts/truetype/macos/Inter-Regular.ttf'


def main():
    title_font = ImageFont.truetype(FONT, 18)
    label_font = ImageFont.truetype(REGULAR, 14)
    base = ROOT / 'examples' / 'before-after' / VERSION
    for skill in ['product-design', 'ui-ux-design', 'ux-critique', 'ship-check']:
        before = Image.open(base / skill / 'before.png').convert('RGB')
        after = Image.open(base / skill / 'after.png').convert('RGB')
        if before.size != after.size:
            raise SystemExit(skill + ' sizes differ: ' + str(before.size) + ' ' + str(after.size))
        w, h = before.size
        pad, gap, top = 28, 20, 72
        canvas_w = pad + w + gap + w + pad
        canvas = Image.new('RGB', (canvas_w, top + h + pad), '#ebe6de')
        draw = ImageDraw.Draw(canvas)
        name = draw.textbbox((0, 0), skill, font=label_font)
        draw.text(((canvas_w - (name[2] - name[0])) / 2, 14), skill, font=label_font, fill='#6b6560')
        draw.text((pad, 40), 'Before', font=title_font, fill='#1c1917')
        draw.text((pad + w + gap, 40), 'After', font=title_font, fill='#1c1917')
        canvas.paste(before, (pad, top))
        canvas.paste(after, (pad + w + gap, top))
        out = base / skill / 'compare.png'
        canvas.save(out, 'PNG')
        print(out.relative_to(ROOT), canvas.size)


if __name__ == '__main__':
    main()
