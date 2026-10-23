#!/usr/bin/env node
// Create one folder per run: app copy, skill copy (skill arm only), and the exact prompt to paste.
// Usage: node evals/audit/tools/prepare.mjs <out-root> <label> [--cases a,b] [--models a,b] [--arms a,b] [--runs N] [--skill dir]
// Defaults: all cases in cases.json, models haiku,sonnet,opus, arms a-plain,b-careful,c-skill, 3 runs,
// skill = evals/audit/skill/shipright-audit. Never copies answer keys into run folders.
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const bench = resolve(here, '..');
const repo = resolve(bench, '..', '..');
const args = process.argv.slice(2);
const [outRoot, label] = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
if (!outRoot || !label) {
  console.error('usage: node evals/audit/tools/prepare.mjs <out-root> <label> [--cases ...] [--models ...] [--arms ...] [--runs N] [--skill dir]');
  process.exit(2);
}
const flag = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const list = (name, def) => flag(name, def).split(',').map(s => s.trim()).filter(Boolean);

// The markdown files are the single source of truth for prompt text.
const blocks = file => [...readFileSync(file, 'utf8').matchAll(/```text\n([\s\S]*?)```/g)].map(m => m[1].trimEnd());
const [runTemplate, careful] = blocks(join(bench, 'arms', 'run-prompt.md'));
const config = JSON.parse(readFileSync(join(bench, 'cases.json'), 'utf8'));

const caseIds = list('--cases', config.cases.map(c => c.id).join(','));
const models = list('--models', 'haiku,sonnet,opus');
const arms = list('--arms', 'a-plain,b-careful,c-skill');
const runs = Number(flag('--runs', '3'));
const skillDir = resolve(repo, flag('--skill', 'evals/audit/skill/shipright-audit'));
const KNOWN_ARMS = ['a-plain', 'b-careful', 'c-skill'];

for (const a of arms) if (!KNOWN_ARMS.includes(a)) { console.error(`prepare: unknown arm "${a}". Use ${KNOWN_ARMS.join(', ')}.`); process.exit(2); }
if (arms.includes('c-skill') && !existsSync(join(skillDir, 'SKILL.md'))) { console.error(`prepare: no SKILL.md in ${skillDir}`); process.exit(2); }

const root = resolve(outRoot, label);
const manifest = [];
for (const id of caseIds) {
  const c = config.cases.find(x => x.id === id);
  if (!c) { console.error(`prepare: unknown case "${id}"`); process.exit(2); }
  for (const model of models) for (const arm of arms) for (let n = 1; n <= runs; n++) {
    const out = join(root, id, model, arm, `run-${n}`);
    mkdirSync(out, { recursive: true });
    cpSync(resolve(repo, c.app), join(out, 'app'), { recursive: true });
    if (arm === 'c-skill') cpSync(skillDir, join(out, 'pack', 'shipright-audit'), { recursive: true });
    const armLine = arm === 'c-skill'
      ? `A skill called shipright-audit is installed at ${out}/pack/shipright-audit. Read ${out}/pack/shipright-audit/SKILL.md first and follow it.`
      : '';
    const message = arm === 'b-careful' ? `${c.message}\n\n${careful}` : c.message;
    const prompt = runTemplate
      .replace('{ARM_LINE}\n', armLine ? armLine + '\n' : '')
      .replaceAll('{OUT}', out)
      .replace('{MESSAGE}', message)
      .replace('{SCRIPTED_REPLY}', config.scripted_reply);
    writeFileSync(join(out, 'PROMPT.md'), prompt + '\n');
    const run = { case: id, model, arm, run: n, folder: out, effort: model === 'opus' ? 'high' : 'default' };
    writeFileSync(join(out, 'RUN.json'), JSON.stringify(run, null, 2) + '\n');
    manifest.push(run);
  }
}

writeFileSync(join(root, 'manifest.json'), JSON.stringify({ label, created: new Date().toISOString(), runs: manifest }, null, 2) + '\n');
const rows = manifest.map(r => `| ${r.case} | ${r.model} (${r.effort}) | ${r.arm} | ${r.run} | \`${r.folder}/PROMPT.md\` |`).join('\n');
writeFileSync(join(root, 'LAUNCH.md'), `# Launch list: ${label}\n\nOne fresh session per row. Paste the prompt file's text as the first message. Use the model shown.\n\n| Case | Model | Arm | Run | Prompt |\n|---|---|---|---|---|\n${rows}\n`);
console.log(`prepared ${manifest.length} runs in ${root}\nnext: launch each row in ${join(root, 'LAUNCH.md')}`);
