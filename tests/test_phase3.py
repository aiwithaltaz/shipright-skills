#!/usr/bin/env python3
"""Phase 3 guardrails: case study numbers, pitch blanks, record ids. No scores."""
import subprocess
import tempfile
import textwrap
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / 'skills/shipright/scripts/check-record.mjs'
SIX = ['CONTEXT.md', 'ARCHITECTURE.md', 'DECISIONS.md', 'CHALLENGES.md', 'CHANGELOG.md', 'HANDOFF.md']


def write_record(folder, decisions, changelog):
    folder.mkdir(parents=True, exist_ok=True)
    bodies = {
        'CONTEXT.md': '# Context\n\nStatus: current\n\n## Facts\n\n- Case 7. Pains 20. Keeps 3. Shots desktop-1.png desktop-2.png desktop-3.png.\n',
        'ARCHITECTURE.md': '# Architecture\n\nStatus: current\n\n## Stack\n\n- Static page.\n',
        'DECISIONS.md': '# Decisions\n\nStatus: current\n\n## Rows\n\n' + decisions,
        'CHALLENGES.md': '# Challenges\n\nStatus: current\n\n## Rows\n\n- None invented.\n',
        'CHANGELOG.md': '# Changelog\n\nStatus: current\n\n## Entries\n\n' + changelog,
        'HANDOFF.md': '# Handoff\n\nStatus: current\n\n## Next\n\n- Wait for a real run.\n',
    }
    for name, text in bodies.items():
        (folder / name).write_text(text, encoding='utf-8')


def run(folder):
    return subprocess.run(['node', str(SCRIPT), str(folder)], capture_output=True, text=True)


class Phase3RecordTests(unittest.TestCase):
    def test_approved_needs_date_and_decider(self):
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp)
            write_record(
                folder,
                '| ID | Date | Decision | Options | Why | Status | Who | Pain |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| D1 | | Publish | wait | | Approved | | F01 |\n',
                '| Date | Change | Why | Test | Shot |\n| --- | --- | --- | --- | --- |\n| 2026-10-18 | Noted the pain list | F01 | not measured | none |\n',
            )
            result = run(folder)
            self.assertEqual(1, result.returncode, result.stdout + result.stderr)
            self.assertIn('no date', result.stderr)
            self.assertIn('no decider', result.stderr)

    def test_changelog_needs_an_id(self):
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp)
            write_record(
                folder,
                '| ID | Date | Decision | Options | Why | Status | Who | Pain |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| D1 | 2026-10-18 | Wait | go | no score yet | Proposed | owner | F01 |\n',
                '| Date | Change | Why | Test | Shot |\n| --- | --- | --- | --- | --- |\n| 2026-10-18 | Rewrote the desk | it felt better | pass | shot.png |\n',
            )
            result = run(folder)
            self.assertEqual(1, result.returncode, result.stderr)
            self.assertIn('no pain or decision id', result.stderr)

    def test_case_study_rejects_a_new_number_and_a_missing_shot(self):
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp)
            write_record(
                folder,
                '| ID | Date | Decision | Options | Why | Status | Who | Pain |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| D1 | 2026-10-18 | Wait | go | no score yet | Proposed | owner | F01 |\n',
                '| Date | Change | Why | Test | Shot |\n| --- | --- | --- | --- | --- |\n| 2026-10-18 | Noted the pain list | F01 | not measured | none |\n',
            )
            (folder / 'case-study.md').write_text(textwrap.dedent('''\
                # Case study

                Status: current

                ## Results

                - Load time 2.4 seconds.
                - ![Desk](missing-shot.png)
                '''), encoding='utf-8')
            result = run(folder)
            self.assertEqual(1, result.returncode, result.stderr)
            self.assertIn('number 2.4', result.stderr)
            self.assertIn('missing screenshot', result.stderr)

    def test_pitch_deck_blocks_an_unsourced_market_number(self):
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp)
            write_record(
                folder,
                '| ID | Date | Decision | Options | Why | Status | Who | Pain |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| D1 | 2026-10-18 | Wait | go | no score yet | Proposed | owner | F01 |\n',
                '| Date | Change | Why | Test | Shot |\n| --- | --- | --- | --- | --- |\n| 2026-10-18 | Noted the pain list | F01 | not measured | none |\n',
            )
            (folder / 'pitch-deck.md').write_text(
                '# Pitch deck\n\nStatus: current\n\n## Market\n\n- The market is 40 billion.\n',
                encoding='utf-8')
            bad = run(folder)
            self.assertEqual(1, bad.returncode, bad.stderr)
            self.assertIn('Market', bad.stderr)
            (folder / 'pitch-deck.md').write_text(
                '# Pitch deck\n\nStatus: current\n\n## Market\n\n- [Add your real numbers]\n\n## Ask\n\n- 12 pilots, Assumed, owner said this in the brief.\n',
                encoding='utf-8')
            good = run(folder)
            self.assertEqual(0, good.returncode, good.stderr)

    def test_sample_c7_case_study_passes(self):
        record = ROOT / 'site/record'
        result = run(record)
        self.assertEqual(0, result.returncode, result.stderr)
        for name in SIX:
            self.assertTrue((record / name).is_file(), name)


if __name__ == '__main__':
    unittest.main()
