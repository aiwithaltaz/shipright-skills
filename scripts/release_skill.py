#!/usr/bin/env python3
"""Build the Claude.ai skill zip and the single-file ChatGPT fallback.

Claude.ai wants a zip whose top folder matches the skill name and contains
SKILL.md. ChatGPT Custom GPTs and projects have no skill folder, so they get
one Markdown file with every mode and reference inlined.

    python3 scripts/release_skill.py
    python3 scripts/release_skill.py --out dist
"""
import argparse
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / 'skills' / 'shipright'
STAMP = (2026, 10, 14, 0, 0, 0)


def skill_files():
    return sorted(p for p in SKILL.rglob('*') if p.is_file() and p.suffix != '.pyc' and '__pycache__' not in p.parts)


def chatgpt_text():
    parts = [
        '# ShipRight for ChatGPT',
        '',
        'This is the whole ShipRight skill in one file. Paste it into Custom GPT instructions, or attach it to a ChatGPT project, when the tool cannot load a skill folder.',
        '',
        'When a section says to read another file, find the matching `Source:` heading later in this file and read that section. Follow one mode. Leave the other modes unread.',
        '',
        'Claude Code, Cursor, Codex, VS Code, Antigravity, and Gemini CLI should install the `shipright` skill instead of this file. The command is `/shipright`.',
        '',
    ]
    for path in skill_files():
        rel = path.relative_to(SKILL).as_posix()
        parts.append('---')
        parts.append('')
        parts.append(f'# Source: {rel}')
        parts.append('')
        parts.append(path.read_text(encoding='utf-8').rstrip())
        parts.append('')
    return '\n'.join(parts).rstrip() + '\n'


def write_zip(destination: Path):
    destination.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(destination, 'w') as archive:
        for path in skill_files():
            rel = 'shipright/' + path.relative_to(SKILL).as_posix()
            info = zipfile.ZipInfo(rel, STAMP)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.create_system = 3
            info.external_attr = (0o644 & 0xFFFF) << 16
            archive.writestr(info, path.read_bytes())
    return destination


def build(out: Path):
    out.mkdir(parents=True, exist_ok=True)
    bundle = out / 'shipright-chatgpt.md'
    bundle.write_text(chatgpt_text(), encoding='utf-8')
    archive = write_zip(out / 'shipright.zip')
    return archive, bundle


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', type=Path, default=ROOT / 'dist')
    args = parser.parse_args()
    archive, bundle = build(args.out)
    print(f'Wrote {archive}')
    print(f'Wrote {bundle}')


if __name__ == '__main__':
    main()
