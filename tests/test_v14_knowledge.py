"""1.4 knowledge system: card library, dealer, new check-ui rules and the base record check.
Each new check fails on a bad fixture and passes on a good one."""
import json
import re
import subprocess
import tempfile
import unittest
from pathlib import Path

import test_v131_checks as v131

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / 'skills/shipright'
LIB = SKILL / 'library/cards.json'
FIELDS = ('id', 'stage', 'rule', 'why', 'do', 'dont', 'source_url', 'source_quote', 'check', 'check_kind', 'tags', 'date')


def tokens(text):
    import tiktoken
    return len(tiktoken.get_encoding('cl100k_base').encode(text))


def deal(*args):
    return subprocess.run(['node', str(ROOT / 'scripts/deal.mjs'), *args], capture_output=True, text=True, timeout=60)


class LibraryTests(unittest.TestCase):
    def test_every_card_is_complete_sourced_and_checked(self):
        cards = json.loads(LIB.read_text())
        self.assertGreaterEqual(len(cards), 150)
        ids = set()
        for c in cards:
            for f in FIELDS:
                self.assertTrue(c.get(f), f'{c.get("id")}: {f}')
            self.assertNotIn(c['id'], ids); ids.add(c['id'])
            self.assertIn(c['check_kind'], ('script', 'rubric', 'test'))
            self.assertRegex(c['stage'], r'^(0\d|10)-')
            self.assertTrue(c['source_url'].startswith(('https://', 'knowledge/')), c['id'])
            self.assertLessEqual(len(c['source_quote'].split()), 40, c['id'])

    def test_every_stage_has_cards_and_base_is_strongest(self):
        cards = json.loads(LIB.read_text())
        by = {}
        for c in cards: by[c['stage'][:2]] = by.get(c['stage'][:2], 0) + 1
        for s in ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']:
            self.assertGreaterEqual(by.get(s, 0), 4, s)
        base = sum(v for k, v in by.items() if k in {'00', '01', '02', '03', '04', '05'})
        self.assertGreater(base, len(cards) * 0.4)

    def test_sources_list_has_urls_and_dates(self):
        rows = json.loads((ROOT / 'knowledge/sources/sources.json').read_text())
        ok = [r for r in rows if r['status'] == 'ok']
        self.assertGreaterEqual(len(ok), 50)
        for r in rows:
            self.assertTrue(r['url'].startswith('https://')); self.assertRegex(r['fetched'], r'^\d{4}-\d\d-\d\d$')

    def test_workflow_gaps_are_covered(self):
        ids = {c['id'] for c in json.loads(LIB.read_text())}
        for need in ('00-idea-brief-five-parts', '08-project-rules-file', '10-security-review', '10-preview-deploy-before-prod',
                     '10-monitoring-after-launch', '09-heading-words-match-color', '09-pin-length-cap'):
            self.assertIn(need, ids)


class DealerTests(unittest.TestCase):
    def test_deals_5_to_8_checked_cards_inside_budget_for_every_stage(self):
        for s in ['00', '01', '03', '04', '05', '06', '07', '08', '09', '10']:
            p = deal('--stage', s, '--tags', 'saas,dashboard', '--n', '8')
            self.assertEqual(0, p.returncode, p.stderr)
            n = p.stdout.count('Check (')
            self.assertTrue(5 <= n <= 8, (s, n))
            self.assertLessEqual(tokens(p.stdout), 1200, s)

    def test_direction_picker_offers_three_and_is_seeded(self):
        a = json.loads(deal('--stage', '07', '--tags', 'landing,3d', '--json').stdout)
        b = json.loads(deal('--stage', '07', '--tags', 'landing,3d', '--json').stdout)
        c = json.loads(deal('--stage', '07', '--tags', 'landing,3d', '--seed', 'other', '--json').stdout)
        self.assertEqual(3, len(a['directions']))
        self.assertEqual(a, b)
        self.assertTrue(a['cards'] != c['cards'] or a['directions'] != c['directions'])
        self.assertTrue(all(x['check'] for x in a['cards']))

    def test_cards_without_a_check_never_load(self):
        with tempfile.TemporaryDirectory() as d:
            skill = Path(d) / 'skill'
            (skill / 'scripts').mkdir(parents=True); (skill / 'library').mkdir()
            (skill / 'scripts/deal.mjs').write_text((SKILL / 'scripts/deal.mjs').read_text())
            (skill / 'library/directions.json').write_text((SKILL / 'library/directions.json').read_text())
            base = {'stage': '05-architecture', 'why': 'w', 'do': 'd', 'dont': 'x', 'source_url': 'https://a', 'source_quote': 'q', 'tags': ['any'], 'check_kind': 'script'}
            cards = [dict(base, id=f'c{i}', topic=f't{i}', rule=f'Rule {i}', check='' if i % 2 else 'measured') for i in range(12)]
            (skill / 'library/cards.json').write_text(json.dumps(cards))
            p = subprocess.run(['node', str(skill / 'scripts/deal.mjs'), '--stage', '05', '--json'], capture_output=True, text=True)
            got = json.loads(p.stdout)['cards']
            self.assertTrue(got)
            self.assertTrue(all(c['check'] for c in got))

    def test_stages_call_the_dealer(self):
        for f in sorted((SKILL / 'stages').glob('[01]*.md')):
            self.assertIn('scripts/deal.mjs --stage', f.read_text(), f.name)


class RecordBaseTests(unittest.TestCase):
    def run_rec(self, name, *flags):
        return subprocess.run(['node', str(SKILL / 'scripts/check-record.mjs'), str(ROOT / 'tests/fixtures' / name), *flags], capture_output=True, text=True)

    def test_bad_record_fails_each_base_rule(self):
        p = self.run_rec('record-base-bad', '--base', '--ship')
        self.assertEqual(1, p.returncode)
        for msg in ('"Out of scope:" is missing', 'loading state does not name', 'error state has no way out', 'has no empty',
                    'more than one primary action', '"Banned:" is missing', '"## Monitoring"'):
            self.assertIn(msg, p.stderr)

    def test_good_record_passes(self):
        p = self.run_rec('record-base-good', '--base', '--ship')
        self.assertEqual(0, p.returncode, p.stderr)

    def test_base_is_opt_in(self):
        self.assertEqual(0, self.run_rec('record-base-bad').returncode)


class NewUiRuleTests(v131.CheckerBehaviorTests):
    def test_heading_names_its_own_background_color_fails_then_passes(self):
        css = '.band{background:#0a0a0a;color:#fafafa;padding:24px}'
        code, found = self.ids_for(css, '<section class="band"><h2>One step is black. The rest wait.</h2></section>')
        self.assertIn('heading-color-word', found); self.assertEqual(1, code)
        code, found = self.ids_for(css, '<section class="band"><h2>One step lights up. The rest wait.</h2></section>')
        self.assertNotIn('heading-color-word', found); self.assertEqual(0, code, found)

    def test_pin_length_fails_when_long_then_passes(self):
        bad = '<div class="pin-spacer" style="height:9000px"><div data-pin style="position:sticky;top:0;height:100vh;background:#fff"><p data-step>One</p><p data-step>Two</p></div></div>'
        code, found = self.ids_for('', bad)
        self.assertIn('pin-length', found); self.assertEqual(1, code)
        good = bad.replace('9000px', '3200px')
        code, found = self.ids_for('', good)
        self.assertNotIn('pin-length', found); self.assertEqual(0, code, found)


# Keep the inherited 1.3.1 tests running once, in their own module.
for name in [n for n in dir(v131.CheckerBehaviorTests) if n.startswith('test_')]:
    setattr(NewUiRuleTests, name, None)

if __name__ == '__main__':
    unittest.main()
