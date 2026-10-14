"""Premium rules and measured behavior. Hooks do not verify factual truth or taste."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
MODES = ROOT / 'skills/shipright/modes'


class PremiumTextTests(unittest.TestCase):
    def test_intake_and_story(self):
        text = (MODES / 'product-design/references/product-brief.md').read_text()
        for card in ('Visitor', 'Product hero', 'Scroll story', 'Assets', 'References, only if blocked'):
            self.assertIn(card, text)
        for rule in ('0-5 question cap', 'decision cards only', 'Let me decide reserves', 'Silence is not approval', 'asks zero'):
            self.assertIn(rule, text)
        self.assertIn('single-page information architecture', text)
        self.assertIn('first screen', text)

    def test_individual_recipes_and_progressive_loading(self):
        policy = json.loads((ROOT / 'evals/context-policy.json').read_text())
        names = ('pinned-scroll-scene', 'camera-flight', 'object-in-front-of-text', 'block-wipe', 'text-scramble',
                 'hover-invert', 'entry-gate', 'cursor-reactive-3d', 'sound-toggle', 'page-transition')
        for name in names:
            ref = f'skills/shipright/modes/ui-ux-design/references/{name}.md'
            text = (ROOT / ref).read_text()
            for part in ('When to use', 'When NOT to use', 'Step-by-step prompt recipe', 'Performance, accessibility and reduced motion'):
                self.assertIn(part, text)
            for mode in ('ui-ux-design', 'build-pack'):
                self.assertIn('For chosen', policy['skills'][mode]['conditional_references'][ref]['when'])
        for mode in ('ui-ux-design', 'build-pack'):
            for path in policy['skills'][mode]['normal_paths']:
                if path['task'].startswith('Premium'):
                    self.assertFalse(any('/marketing-pages.md' in p or '/motion.md' in p or '/anti-slop-rules.md' in p for p in path['references']))

    def test_prompt_example_and_app_cap(self):
        text = (MODES / 'build-pack/references/act-prompts.md').read_text()
        example = text.split('### Stack and subject', 1)[1]
        self.assertGreaterEqual(len(example.split()), 550)
        self.assertLessEqual(len(example.split()), 1700)
        for act in ('Opening', 'Second act', 'Third act', 'Detail', 'Close', 'Footer'):
            self.assertIn('### ' + act, text)
        contract = (MODES / 'build-pack/references/pack-contract.md').read_text()
        self.assertIn('App tickets retain the 220-word cap', contract)

    def test_choice_and_taste_blocker(self):
        options = (MODES / 'ui-ux-design/references/premium-web.md').read_text()
        self.assertIn('exactly three options, not three palette swaps', options)
        self.assertIn("Stop for the user's choice", options)
        taste = (MODES / 'ux-critique/references/taste-check.md').read_text()
        for question in ('Is the product on stage?', 'Does the scroll teach something?', 'Does each act have a job?'):
            self.assertIn(question, taste)
        self.assertIn('first screen is a **Blocker**', taste)


BASE = '''<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sample product</title><style>body{margin:24px;background:#fff;color:#171717;font-family:system-ui}a{display:inline-block;padding:14px}a:focus-visible{outline:3px solid #111}h1{font-size:44px}.hero{width:220px;height:160px;border:2px solid #111} .label{text-transform:uppercase;font-size:13px;letter-spacing:2px} .reveal{opacity:0}@media(prefers-reduced-motion:reduce){.reveal{opacity:1}}</style>
<a href="#detail">Detail</a><h1>Sample interface</h1><div class="hero" data-product-hero aria-label="Sample real interface">Actual interface fragment</div>
<section data-act="opening"><p class="label" data-product-fact>Step one</p><p class="label" data-product-fact>Step two</p><p class="label" data-product-fact>Step three</p></section><section id="detail" data-act="detail"><p class="reveal">Same fact after reveal</p></section></html>'''


class PremiumCheckerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / 'probe.html'; p.write_text(BASE)
            proc = cls.run_page(p, d)
            if proc.returncode == 2:
                raise unittest.SkipTest(proc.stderr)

    @staticmethod
    def run_page(p, d, profile='premium'):
        return subprocess.run(['node', str(ROOT / 'scripts/check-ui.mjs'), str(p), '--root', d, '--out', str(Path(d) / 'out'),
                               '--profile', profile, '--json'], env=os.environ.copy(), capture_output=True, text=True, timeout=180)

    def check(self, html, expected, rule=None, profile='premium'):
        with tempfile.TemporaryDirectory() as d:
            p=Path(d)/'page.html'; p.write_text(html)
            proc=self.run_page(p,d,profile)
            self.assertEqual(expected,proc.returncode,proc.stdout + proc.stderr)
            report=json.loads(proc.stdout)
            ids={r['id'] for v in report['report']['viewports'].values() for r in v['results']}
            if rule:self.assertIn(rule,ids)
            return report,ids

    def test_premium_reveal_and_fact_labels_pass(self):
        report,ids=self.check(BASE,0)
        self.assertNotIn('eyebrows',ids)
        self.assertNotIn('hidden-content',ids)
        self.assertEqual(0,report['warns'])

    def test_standard_profile_retains_hidden_content_rule(self):
        self.check(BASE,1,'hidden-content',profile='standard')

    def test_headline_and_sphere_fails_product_hook(self):
        self.check(BASE.replace('data-product-hero','data-ornament'),1,'product-first-screen')

    def test_offscreen_product_fails(self):
        self.check(BASE.replace('width:220px','margin-top:200vh;width:220px'),1,'product-first-screen')

    def test_fake_proof_fails(self):
        self.check(BASE.replace('</html>','<p>Trusted by 500 teams</p></html>'),1,'unsupported-proof')

    def test_declared_claim_requires_source(self):
        self.check(BASE.replace('</html>','<p data-proof-claim>Supplied specification</p></html>'),1,'unsupported-proof')

    def test_reduced_motion_must_expose_words(self):
        self.check(BASE.replace('.reveal{opacity:1}', '.reveal{opacity:0}'),1,'premium-reduced-content')

    def test_phone_overflow_still_fails(self):
        self.check(BASE.replace('width:220px','width:900px'),1,'overflow')

    def test_gradient_text_still_fails(self):
        self.check(BASE.replace('h1{font-size:44px}', 'h1{font-size:44px;background:linear-gradient(red,blue);background-clip:text;color:transparent}'),1,'gradient-text')


if __name__ == '__main__':
    unittest.main()
