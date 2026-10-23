#!/usr/bin/env node
// Turn grader JSON files into the README results table. The script does all the math; graders only label.
// Usage: node evals/audit/tools/score.mjs <grade-dir> [--label name] [--out evals/audit/results]
// Reads <grade-dir>/.map.json and <grade-dir>/<case>/<code>/grade.json. Writes <out>/<label>.md and .json.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const bench = resolve(here, '..');
const repo = resolve(bench, '..', '..');
const args = process.argv.slice(2);
const gradeDir = args[0] && resolve(args[0]);
if (!gradeDir) { console.error('usage: node evals/audit/tools/score.mjs <grade-dir> [--label name] [--out dir]'); process.exit(2); }
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const label = flag('--label', 'results');
const outDir = resolve(flag('--out', join(bench, 'results')));

const config = JSON.parse(readFileSync(join(bench, 'cases.json'), 'utf8'));
const keys = Object.fromEntries(config.cases.map(c => [c.id, JSON.parse(readFileSync(resolve(repo, c.answer_key), 'utf8'))]));
const map = JSON.parse(readFileSync(join(gradeDir, '.map.json'), 'utf8'));

const median = xs => { const v = xs.filter(x => x !== null && !Number.isNaN(x)).sort((a, b) => a - b); if (!v.length) return null; const m = Math.floor(v.length / 2); return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2; };
const pct = x => x === null ? 'n/a' : `${Math.round(x * 100)}%`;
const num = x => x === null ? 'n/a' : (Math.round(x * 10) / 10).toString();

// Per-run metrics. Unknown or missing labels count as Missed, so a sloppy grade can only lower the score.
function metrics(key, g) {
  const status = id => g.pains?.[id] ?? 'Missed';
  const found = key.pains.filter(p => status(p.id) === 'Found').length;
  const partly = key.pains.filter(p => status(p.id) === 'Partly').length;
  const keepFound = key.keeps.filter(k => g.keeps?.[k.id] === 'Found').length;
  const falseKeeps = (g.false_keeps || []).filter(id => key.false_keep_ids.includes(id)).length;
  const reported = Number(g.reported_problems) || 0;
  const matched = found + partly;
  const precision = reported ? Math.min(1, (matched + (Number(g.extra_real) || 0)) / reported) : null;
  const evidence = reported ? Math.min(1, (Number(g.with_location) || 0) / reported) : null;
  const sev = Number(g.severity_checked) > 0 ? (Number(g.severity_within_one) || 0) / Number(g.severity_checked) : null;
  return {
    recall: (found + 0.5 * partly) / key.pains.length,
    keep_recall: keepFound / key.keeps.length,
    false_keeps: falseKeeps,
    precision, evidence, severity: sev,
    reported, not_real: Number(g.extra_not_real) || 0
  };
}

const runs = [];
let missingGrades = 0;
for (const [code, meta] of Object.entries(map)) {
  const f = join(gradeDir, meta.case, code, 'grade.json');
  if (!existsSync(f)) { missingGrades++; continue; }
  runs.push({ ...meta, ...metrics(keys[meta.case], JSON.parse(readFileSync(f, 'utf8'))) });
}
if (!runs.length) { console.error('score: no grade.json files found'); process.exit(1); }

const FIELDS = ['recall', 'precision', 'keep_recall', 'false_keeps', 'evidence', 'severity', 'not_real'];
const group = (rows, by) => {
  const out = {};
  for (const r of rows) (out[by(r)] ??= []).push(r);
  return Object.fromEntries(Object.entries(out).map(([k, rs]) => [k, { n: rs.length, ...Object.fromEntries(FIELDS.map(f => [f, median(rs.map(r => r[f]))])) }]));
};
const byCell = group(runs, r => `${r.case}|${r.model}|${r.arm}`);
const byArm = {};
// Overall per arm: the median across cases and models of each cell's median, so every case weighs the same.
for (const [k, v] of Object.entries(byCell)) (byArm[k.split('|')[2]] ??= []).push(v);
const armRows = Object.fromEntries(Object.entries(byArm).map(([arm, cells]) => [arm, {
  runs: cells.reduce((s, c) => s + c.n, 0), ...Object.fromEntries(FIELDS.map(f => [f, median(cells.map(c => c[f]))]))
}]));

const ARM_NAME = { 'a-plain': 'No skill', 'b-careful': 'Careful prompt', 'c-skill': 'shipright-audit' };
const armOrder = ['a-plain', 'b-careful', 'c-skill'].filter(a => armRows[a]);
const row = (name, m) => `| ${name} | ${pct(m.recall)} | ${pct(m.precision)} | ${pct(m.keep_recall)} | ${num(m.false_keeps)} | ${pct(m.evidence)} | ${pct(m.severity)} | ${m.runs ?? m.n} |`;
const head = '| Arm | Pain recall | Precision | Keep recall | False keeps | Evidence | Severity match | Runs |\n|---|---|---|---|---|---|---|---|';

const cases = [...new Set(runs.map(r => r.case))];
const models = [...new Set(runs.map(r => r.model))];
const losses = [];
for (const c of cases) for (const m of models) {
  const s = byCell[`${c}|${m}|c-skill`], b = byCell[`${c}|${m}|b-careful`], a = byCell[`${c}|${m}|a-plain`];
  if (s && b && s.recall < b.recall) losses.push(`${c} on ${m}: skill ${pct(s.recall)} vs careful prompt ${pct(b.recall)} pain recall`);
  if (s && a && s.recall < a.recall) losses.push(`${c} on ${m}: skill ${pct(s.recall)} vs no skill ${pct(a.recall)} pain recall`);
}

const s = armRows['c-skill'], plain = armRows['a-plain'];
const headline = s && plain
  ? `Finds ${pct(s.recall)} of known UX problems in an existing app, vs ${pct(plain.recall)} with no skill.`
  : 'Not enough arms graded for a headline yet.';

let md = `# shipright-audit results: ${label}\n\n${headline}\n`;
md += `Measured on ${cases.length} apps, ${models.length} models (${models.join(', ')}), ${armOrder.length} arms, ${runs.length} graded runs, median reported. Date: ${new Date().toISOString().slice(0, 10)}.\n\n`;
md += `## Overall\n\n${head}\n${armOrder.map(a => row(ARM_NAME[a], armRows[a])).join('\n')}\n\n`;
md += `Pain recall = (Found + 0.5 x Partly) / answer-key pains. Precision = (matched + extra real problems) / problems reported. Evidence = problems naming a screen or element. Severity match = found pains rated within 1 level of the key.\n\n`;
md += `## Per case and model\n\n`;
for (const c of cases) {
  md += `### ${c}\n\n| Model | Arm | Pain recall | Precision | Keep recall | False keeps | Evidence | Severity match | Runs |\n|---|---|---|---|---|---|---|---|---|\n`;
  for (const m of models) for (const a of armOrder) {
    const v = byCell[`${c}|${m}|${a}`]; if (!v) continue;
    md += `| ${m} | ${ARM_NAME[a]} | ${pct(v.recall)} | ${pct(v.precision)} | ${pct(v.keep_recall)} | ${num(v.false_keeps)} | ${pct(v.evidence)} | ${pct(v.severity)} | ${v.n} |\n`;
  }
  md += '\n';
}
md += `## Where it loses\n\n${losses.length ? losses.map(l => `- ${l}`).join('\n') : '- No case where the skill scored lower pain recall than another arm.'}\n`;
if (missingGrades) md += `\n${missingGrades} blinded runs had no grade.json and are not counted.\n`;

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, `${label}.md`), md);
writeFileSync(join(outDir, `${label}.json`), JSON.stringify({ label, overall: armRows, cells: byCell, runs, losses }, null, 2) + '\n');
console.log(md);
