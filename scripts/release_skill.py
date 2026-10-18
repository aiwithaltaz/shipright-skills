#!/usr/bin/env python3
"""Build the Claude.ai skill zip and the short ChatGPT fallback.

Claude.ai wants a zip whose top folder matches the skill name and contains
SKILL.md. The zip includes scripts, templates, patterns, blocks, stages, and modes.

ChatGPT Custom GPTs and projects have no skill folder. They get one short
Markdown file: the router, stages 0 to 3, the feedback round, and the core
templates. Stages 4 to 10 and the mode references stay in the zip. Inlining
them made the old file about 28,000 words.

    python3 scripts/release_skill.py
    python3 scripts/release_skill.py --out dist
"""
import argparse
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / 'skills' / 'shipright'
STAMP = (2026, 10, 14, 0, 0, 0)
# Short edition. Measured to stay inside 3,000 to 4,000 words.
CHATGPT_REL = (
    'SKILL.md',
    'stages/00-discover.md',
    'stages/01-research.md',
    'stages/02-brainstorm.md',
    'stages/03-problem-solving.md',
    'stages/feedback-round.md',
    'templates/research-brief.md',
    'templates/concepts.md',
    'templates/risks.md',
    'templates/discovery.md',
    'templates/pain-map.md',
    'templates/reply.md',
    'templates/record/CONTEXT.md',
    'templates/record/HANDOFF.md',
)


def skill_files():
    return sorted(p for p in SKILL.rglob('*') if p.is_file() and p.suffix != '.pyc' and '__pycache__' not in p.parts)


def chatgpt_text():
    parts = [
        '# ShipRight for ChatGPT',
        '',
        'Short edition for a Custom GPT or a ChatGPT project. It holds the router, stages 0 to 3, the feedback round, and the core templates.',
        'Stages 4 to 10, the mode references, and the scripts are in shipright.zip. When a step names one of those files, follow the step and say the file is in the full skill if this paste does not include it.',
        '',
        'Claude Code, Cursor, Codex, VS Code, Antigravity, and Gemini CLI should install the `shipright` skill instead of this file. The command is `/shipright`.',
        '',
    ]
    for rel in CHATGPT_REL:
        path = SKILL / rel
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
