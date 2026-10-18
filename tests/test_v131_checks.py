"""Stage 9 checks added in 1.3.1. Bad fixtures match the 1.3.0 site bugs. The fixed site must pass."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / 'skills/shipright'
CHECK = ROOT / 'scripts/check-ui.mjs'


def node_env():
    parts = [os.environ.get('NODE_PATH', '')]
    for raw in ('/workspace/node_modules', '/opt/node22/lib/node_modules',
                '/opt/app-template/node_modules', '/usr/lib/node_modules'):
        base = Path(raw)
        if (base / 'playwright' / 'package.json').exists() or (base / 'playwright-core' / 'package.json').exists():
            parts.append(str(base))
    return dict(os.environ, NODE_PATH=os.pathsep.join(dict.fromkeys(p for p in parts if p)))


SHELL = '''<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Check</title><style>
body{margin:24px;background:#fff;color:#171717;font:16px/1.5 system-ui}
a,button{min-height:44px;min-width:44px}
a:focus-visible,button:focus-visible,input:focus-visible{outline:2px solid #111;outline-offset:2px}
h1{font-size:32px}
__EXTRA__
</style><a href="#next">Next</a><h1>Sample</h1>__BODY__</html>'''


def page(extra, body):
    return SHELL.replace('__EXTRA__', extra).replace('__BODY__', body)


class RuleTextTests(unittest.TestCase):
    def test_tokens_and_blocks_force_hidden(self):
        tokens = (SKILL / 'templates/tokens.css').read_text()
        self.assertIn('[hidden]', tokens)
        self.assertIn('display: none !important', tokens)
        blocks = list((SKILL / 'blocks').glob('*.html'))
        self.assertGreaterEqual(len(blocks), 17)
        for block in blocks:
            text = block.read_text()
            self.assertIn('[hidden] { display: none !important; }', text, block.name)

    def test_stage9_names_the_craft_rubric_and_bug_classes(self):
        text = (SKILL / 'stages/09-test-and-critique.md').read_text()
        for phrase in (
            'First screen shows the product',
            'Each act is a new composition',
            'The accent comes from the product',
            'No empty cards',
            'display: none !important',
            'fallback poster',
            'Pinned scenes',
            'object-fit',
            'Phone nav',
            'release-state',
        ):
            self.assertIn(phrase, text)


class CheckerBehaviorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with tempfile.TemporaryDirectory() as d:
            path = Path(d) / 'probe.html'
            path.write_text(page('', '<p>Ready</p>'))
            proc = cls.run_page(path, d)
            if proc.returncode == 2:
                raise unittest.SkipTest(proc.stderr)

    @staticmethod
    def run_page(path, root, profile='standard', extra=None):
        cmd = ['node', str(CHECK), str(path), '--root', str(root), '--out', str(Path(root) / 'out'),
               '--profile', profile, '--json']
        if extra:
            cmd.extend(extra)
        return subprocess.run(cmd, env=node_env(), capture_output=True, text=True, timeout=180)

    def ids_for(self, extra, body, profile='standard', extra_args=None):
        with tempfile.TemporaryDirectory() as d:
            path = Path(d) / 'page.html'
            path.write_text(page(extra, body))
            proc = self.run_page(path, d, profile, extra_args)
            self.assertIn(proc.returncode, (0, 1), proc.stderr[-1500:])
            report = json.loads(proc.stdout)
            found = {item['id'] for view in report['report']['viewports'].values() for item in view['results']}
            return proc.returncode, found

    def test_hidden_display_fails_on_the_130_pattern_and_passes_when_forced(self):
        # The 1.3.0 site: .run-state { display: flex } beat the hidden attribute.
        bad_css = '.run-state{display:flex;flex-direction:column}'
        bad_body = '<p class="run-state">One</p><p class="run-state" hidden>Screens land</p>'
        code, found = self.ids_for(bad_css, bad_body)
        self.assertEqual(1, code)
        self.assertIn('hidden-ignored', found)
        good_css = '[hidden]{display:none !important}.run-state{display:flex}'
        code, found = self.ids_for(good_css, bad_body)
        self.assertNotIn('hidden-ignored', found)
        self.assertEqual(0, code, found)

    def test_poster_under_live_canvas_fails_then_passes(self):
        bad_css = '.poster{display:grid;width:200px;height:160px}canvas{display:block}'
        body = '<canvas width="200" height="160" style="width:200px;height:160px" aria-label="Model"></canvas><div class="poster" data-poster hidden>Still</div>'
        code, found = self.ids_for(bad_css, body)
        self.assertEqual(1, code)
        self.assertIn('poster-under-model', found)
        good_css = '[hidden]{display:none !important}.poster{display:grid;width:200px;height:160px}'
        code, found = self.ids_for(good_css, body)
        self.assertNotIn('poster-under-model', found)
        self.assertEqual(0, code, found)

    def test_pinned_frame_clip_fails_then_passes(self):
        bad = '<div class="pin-spacer" style="height:1800px"><div data-pin style="position:fixed;top:0;left:0;width:100%;height:1400px;background:#fff"><h1 style="font-size:32px">Top</h1><p style="margin-top:1100px">Screens land</p></div></div>'
        code, found = self.ids_for('', bad)
        self.assertIn('pin-clip', found)
        self.assertEqual(1, code)
        good = '<div class="pin-spacer" style="height:100vh"><div data-pin style="position:fixed;top:0;left:0;right:0;height:100vh;background:#fff;padding:24px"><p>All of this fits in the frame.</p></div></div>'
        code, found = self.ids_for('', good)
        self.assertNotIn('pin-clip', found)
        self.assertEqual(0, code, found)

    def test_slider_mismatch_fails_and_object_fit_passes(self):
        svg_a = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='700'%3E%3Crect width='400' height='700' fill='%23ccc'/%3E%3C/svg%3E"
        svg_b = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='400'%3E%3Crect width='900' height='400' fill='%23999'/%3E%3C/svg%3E"
        bad_css = '.frame{position:relative;height:360px;background:#000;overflow:hidden}.frame img{width:100%;height:auto;max-width:none}'
        bad = f'<div class="frame"><img alt="After" src="{svg_b}"><img alt="Before" src="{svg_a}" style="width:70%"><input type="range" aria-label="Compare"></div>'
        code, found = self.ids_for(bad_css, bad)
        self.assertIn('slider-align', found)
        self.assertEqual(1, code)
        good_css = '.frame{position:relative;height:280px;background:#111}.frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}'
        good = f'<div class="frame"><img alt="After" src="{svg_b}"><img alt="Before" src="{svg_a}"><input type="range" aria-label="Compare" style="position:absolute;left:0;bottom:0;height:44px"></div>'
        code, found = self.ids_for(good_css, good)
        self.assertNotIn('slider-align', found)
        self.assertEqual(0, code, found)

    def test_phone_nav_wrap_fails_then_passes(self):
        bad_css = 'nav{display:flex;flex-wrap:wrap;width:180px;gap:8px}nav a{padding:12px}'
        bad = '<nav aria-label="Main"><a href="#a">Work</a><a href="#b">Process</a><a href="#c">Proof</a><a href="#d">Install</a><a href="#e">Case study</a></nav>'
        code, found = self.ids_for(bad_css, bad)
        self.assertIn('nav-wrap', found)
        self.assertEqual(1, code)
        good_css = 'nav{display:flex;flex-wrap:nowrap;gap:8px}nav a{padding:12px}'
        good = '<nav aria-label="Main"><a href="#a">Work</a><a href="#b">Proof</a></nav>'
        code, found = self.ids_for(good_css, good)
        self.assertNotIn('nav-wrap', found)
        self.assertEqual(0, code, found)

    def test_stale_release_claims_fail_then_pass(self):
        # Phrases taken from the 1.3.0 home page.
        bad = '<meta name="release-state" content="released"><meta name="pack-version" content="1.3.1"><p>Draft 1.3. Not released. The draft is this repository. The 1.3 runs are prepared and not started.</p>'
        code, found = self.ids_for('', bad)
        self.assertIn('stale-claim', found)
        self.assertEqual(1, code)
        good = '<meta name="release-state" content="released"><meta name="pack-version" content="1.3.1"><p>1.3.1 is released. Eval scores are pending.</p>'
        code, found = self.ids_for('', good)
        self.assertNotIn('stale-claim', found)
        self.assertEqual(0, code, found)

    def test_premium_craft_fails_a_text_hero_and_passes_a_product(self):
        bad = '''<section data-act="one"><h1>Headline only</h1><p>Same column.</p></section>
        <section data-act="two"><h2>Another column</h2><p>Same column.</p></section>'''
        code, found = self.ids_for('', bad, profile='premium')
        self.assertEqual(1, code)
        self.assertIn('craft-product', found)
        self.assertIn('craft-accent', found)
        good_css = ':root{--accent:#9d3419}section[data-act="two"]{background:#111;color:#fff}.seal{background:var(--accent);color:#fff;display:inline-block;padding:8px 12px}'
        good = '''<div data-product-hero aria-label="Sample product"><svg width="220" height="160" role="img" aria-label="Product"><rect width="220" height="160" fill="#ddd"/></svg></div>
        <p class="seal">Wax</p>
        <section data-act="one"><p>Opening fact.</p></section>
        <section data-act="two"><p>Different act.</p></section>'''
        # data-accent-source has to live on the document element. The shell's html tag does not, so pass it via body by rewriting.
        html = page(good_css, good).replace('<html lang="en">', '<html lang="en" data-accent-source="sample sealing wax">', 1)
        with tempfile.TemporaryDirectory() as d:
            path = Path(d) / 'page.html'
            path.write_text(html)
            proc = self.run_page(path, d, 'premium')
            self.assertEqual(0, proc.returncode, proc.stdout[-2000:] + proc.stderr[-800:])
            found = {item['id'] for view in json.loads(proc.stdout)['report']['viewports'].values() for item in view['results']}
        for rule in ('craft-product', 'craft-composition', 'craft-accent', 'craft-empty'):
            self.assertNotIn(rule, found)


class FixedSiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Build into a temp folder so the test leaves no site/dist behind for later tests to scan.
        cls._out = tempfile.TemporaryDirectory()
        cls.dist = Path(cls._out.name) / 'dist'
        env = dict(os.environ, SHIPRIGHT_SITE_OUT=str(cls.dist))
        build = subprocess.run(['npm', 'run', 'build'], cwd=ROOT / 'site', env=env, capture_output=True, text=True, timeout=180)
        if build.returncode != 0:
            cls._out.cleanup()
            raise unittest.SkipTest(build.stderr[-500:])

    @classmethod
    def tearDownClass(cls):
        cls._out.cleanup()

    def test_home_and_case_pass_premium_checks(self):
        for name in ('index.html', 'case-study.html'):
            with tempfile.TemporaryDirectory() as d:
                proc = subprocess.run(
                    ['node', str(CHECK), str(self.dist / name), '--root', str(self.dist),
                     '--profile', 'premium', '--release-state', 'released', '--pack-version', '1.3.1',
                     '--out', d, '--json'],
                    env=node_env(), capture_output=True, text=True, timeout=180,
                )
                self.assertNotEqual(2, proc.returncode, proc.stderr[-1500:])
                report = json.loads(proc.stdout)
                self.assertEqual(0, report['fails'], name + ' ' + proc.stdout[-2500:])
                self.assertEqual(0, report['warns'], name)


if __name__ == '__main__':
    unittest.main()
