"""Distill fetched sources into draft rule cards with DeepSeek Flash. Reads DEEPSEEK_API_KEY from env; never prints it.
Writes drafts to knowledge/cards/drafts/<source>.json and usage to knowledge/sources/usage.json."""
import json, os, sys, urllib.request, concurrent.futures as cf
from pathlib import Path
K = Path(__file__).resolve().parents[1]
DRAFT = K / '.cache/drafts'; DRAFT.mkdir(parents=True, exist_ok=True)
MODEL = 'deepseek-flash'
STAGES = {'idea': '00-discover', 'research': '01-research', 'ux-fundamentals': '05-architecture', 'architecture': '05-architecture',
          'states': '05-architecture', 'saas': '04-scope-and-pages', 'design-systems': '06-design-system', 'modern-ui': '07-design-options',
          'motion': '08-build', 'slop': '09-test-and-critique'}
SYS = """You turn one design or product source into rule cards for an AI design skill. Output JSON only: {"cards":[...]}.
Each card: {"topic": short, "rule": one imperative sentence, "why": one sentence, "do": a concrete good example, "dont": a concrete bad example,
"example": a tiny scenario in a SaaS or web product, "source_quote": an EXACT verbatim span copied from the source text, 8 to 30 words, no edits,
"check_kind": "script" | "rubric" | "test", "check": how to verify it (for script: what a browser or file check measures with a number; for rubric: one yes/no question a reviewer answers from a screenshot or record),
"stage": one of 00-discover 01-research 02-brainstorm 03-problem-solving 04-scope-and-pages 05-architecture 06-design-system 07-design-options 08-build 09-test-and-critique 10-ship-check,
"tags": from [landing, saas, dashboard, mobile, app, form, content, motion, 3d, any]}.
Give 3 to 8 cards, only rules the source really supports. Skip fluff, marketing and anything generic. If the source has no usable rule, return {"cards":[]}."""
def call(src):
    out = DRAFT / f"{src['id']}.json"
    if out.exists(): return json.loads(out.read_text()).get('usage', {})
    text = (K / f".cache/raw/{src['id']}.txt").read_text()[:30000]
    body = {'model': MODEL, 'response_format': {'type': 'json_object'}, 'temperature': 0.2,
            'messages': [{'role': 'system', 'content': SYS}, {'role': 'user', 'content': f"Category: {src['category']} (default stage {STAGES[src['category']]})\nURL: {src['url']}\nTitle: {src.get('title','')}\n\nSOURCE TEXT:\n{text}"}]}
    req = urllib.request.Request('https://api.deepseek.com/chat/completions', json.dumps(body).encode(),
        {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + os.environ['DEEPSEEK_API_KEY']})
    for attempt in range(3):
        try:
            r = json.loads(urllib.request.urlopen(req, timeout=300).read())
            cards = json.loads(r['choices'][0]['message']['content']).get('cards', [])
            out.write_text(json.dumps({'source': src['id'], 'url': src['url'], 'category': src['category'], 'cards': cards, 'usage': r.get('usage', {})}, indent=1))
            print('ok', len(cards), src['url'], file=sys.stderr); return r.get('usage', {})
        except Exception as e: err = str(e)[:120]
    print('fail', src['url'], err, file=sys.stderr); return {}
srcs = [s for s in json.loads((K / 'sources/sources.json').read_text()) if s['status'] == 'ok']
with cf.ThreadPoolExecutor(8) as ex: usages = list(ex.map(call, srcs))
tin = sum(u.get('prompt_tokens', 0) for u in usages); tout = sum(u.get('completion_tokens', 0) for u in usages)
hit = sum(u.get('prompt_cache_hit_tokens', 0) for u in usages)
# Peak price used as an upper bound: $0.30 per 1M input (miss), $1.20 per 1M output (pricing page read 2026-10-19).
cost = (tin - hit) * 0.30 / 1e6 + hit * 0.03 / 1e6 + tout * 1.20 / 1e6
(K / 'sources/usage.json').write_text(json.dumps({'model': MODEL, 'calls': len(usages), 'input_tokens': tin, 'cache_hit_tokens': hit, 'output_tokens': tout, 'cost_upper_bound_usd': round(cost, 4)}, indent=1))
print(json.dumps({'input': tin, 'output': tout, 'usd_max': round(cost, 4)}))
