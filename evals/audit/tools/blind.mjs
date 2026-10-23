#!/usr/bin/env node
// Copy finished runs into a blind grading folder: random codes, no arm or model names, tool names scrubbed.
// Usage: node evals/audit/tools/blind.mjs <runs-label-dir> <grade-dir>
// Writes <grade-dir>/<case>/<code>/run/ (the run's outputs), GRADE-PROMPT.md (filled grader prompt),
// and <grade-dir>/.map.json (code to case, model, arm, run). Keep .map.json away from graders.
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, statSync, renameSync } from 'node:fs';
import { resolve, dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';

const here = dirname(fileURLToPath(import.meta.url));
const bench = resolve(here, '..');
const repo = resolve(bench, '..', '..');
const [runsDir, gradeDir] = process.argv.slice(2).map(p => p && resolve(p));
if (!runsDir || !gradeDir) { console.error('usage: node evals/audit/tools/blind.mjs <runs-label-dir> <grade-dir>'); process.exit(2); }

const manifest = JSON.parse(readFileSync(join(runsDir, 'manifest.json'), 'utf8'));
const config = JSON.parse(readFileSync(join(bench, 'cases.json'), 'utf8'));
const template = readFileSync(join(bench, 'grader', 'grader-prompt.md'), 'utf8').match(/```text\n([\s\S]*?)```/)[1].trimEnd();
const SKIP = new Set(['app', 'pack', 'PROMPT.md', 'RUN.json']);
const SCRUB = /shipright[\w-]*|ship ?right/gi;
const TEXT = new Set(['.md', '.txt', '.json', '.html', '.csv']);

// Scrub tool names from file text and from file and folder names, so the path cannot reveal the arm.
function scrubTree(dir) {
  for (const name of readdirSync(dir)) {
    let p = join(dir, name);
    if (SCRUB.test(name)) { const q = join(dir, name.replace(SCRUB, 'review')); renameSync(p, q); p = q; }
    SCRUB.lastIndex = 0;
    if (statSync(p).isDirectory()) scrubTree(p);
    else if (TEXT.has(extname(p).toLowerCase())) writeFileSync(p, readFileSync(p, 'utf8').replace(SCRUB, 'the reviewer'));
  }
}

const map = {};
let missing = 0;
for (const r of manifest.runs) {
  const outputs = readdirSync(r.folder).filter(n => !SKIP.has(n));
  if (!outputs.includes('reply.md')) { console.warn(`blind: no reply.md in ${r.folder}, skipped`); missing++; continue; }
  const code = randomBytes(3).toString('hex');
  const dest = join(gradeDir, r.case, code);
  mkdirSync(join(dest, 'run'), { recursive: true });
  for (const n of outputs) cpSync(join(r.folder, n), join(dest, 'run', n), { recursive: true });
  scrubTree(join(dest, 'run'));
  const c = config.cases.find(x => x.id === r.case);
  const prompt = template
    .replace('{ANSWER_KEY}', resolve(repo, c.answer_key))
    .replace('{RUN_DIR}', join(dest, 'run'))
    .replace('{APP}', resolve(repo, c.app))
    .replace('{OUT_FILE}', join(dest, 'grade.json'));
  writeFileSync(join(dest, 'GRADE-PROMPT.md'), prompt + '\n');
  map[code] = { case: r.case, model: r.model, arm: r.arm, run: r.run };
}
mkdirSync(gradeDir, { recursive: true });
writeFileSync(join(gradeDir, '.map.json'), JSON.stringify(map, null, 2) + '\n');
console.log(`blinded ${Object.keys(map).length} runs into ${gradeDir}${missing ? ` (${missing} skipped, no reply.md)` : ''}`);
console.log('next: run one fresh grader per GRADE-PROMPT.md, then score.mjs');
