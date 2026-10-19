#!/usr/bin/env node
// ShipRight dealer. Picks a small, fitting slice of the card library for one stage so the big library never enters context.
// Usage: node <skill>/scripts/deal.mjs --stage 05 [--tags saas,dashboard] [--n 6] [--seed text] [--directions 3] [--json]
// Cards with no check never load. Output stays under about 900 tokens.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d; };
const stageArg = flag('--stage');
if (!stageArg) { console.error('usage: deal.mjs --stage 05 [--tags saas,dashboard] [--n 6] [--seed x] [--directions 3] [--json]'); process.exit(2); }
const stage = String(stageArg).padStart(2, '0').slice(0, 2);
const tags = (flag('--tags', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const n = Math.min(8, Math.max(5, parseInt(flag('--n', '6'), 10) || 6));
const nDir = Math.min(3, parseInt(flag('--directions', stage === '07' ? '3' : '0'), 10) || 0);
const seedText = flag('--seed', `${stage}|${tags.join(',')}`);
const lib = join(here, '..', 'library');
const cards = JSON.parse(readFileSync(join(lib, 'cards.json'), 'utf8'));
const directions = JSON.parse(readFileSync(join(lib, 'directions.json'), 'utf8'));

// Small seeded PRNG so the same project gets the same deal, and different projects get different ones.
let h = 2166136261; for (const ch of seedText) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
const rand = () => { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; h = Math.imul(h ^ (h >>> 13), 3266489909) >>> 0; return ((h ^= h >>> 16) >>> 0) / 4294967296; };

const KIND = { script: 3, test: 2.5, rubric: 1.5 };
const eligible = cards.filter(c => c.check && c.check.trim() && c.stage.slice(0, 2) === stage);
const scored = eligible.map(c => {
  const overlap = tags.length ? (c.tags || []).filter(t => tags.includes(t)).length : 0;
  const any = (c.tags || []).includes('any') ? 0.5 : 0;
  return { c, s: (KIND[c.check_kind] || 1) + overlap * 2 + any + (c.origin === 'manual' ? 1 : 0) + rand() * 1.5 };
}).sort((a, b) => b.s - a.s);
const picked = []; const topics = new Set();
for (const { c } of scored) { if (picked.length >= n) break; const t = (c.topic || '').toLowerCase(); if (topics.has(t)) continue; topics.add(t); picked.push(c); }
for (const { c } of scored) { if (picked.length >= n) break; if (!picked.includes(c)) picked.push(c); }

let dealt = [];
if (nDir) {
  const ranked = directions.map(d => ({ d, s: (d.tags || []).filter(t => tags.includes(t)).length * 2 + rand() * 2 })).sort((a, b) => b.s - a.s);
  dealt = ranked.slice(0, nDir).map(x => x.d);
}

if (args.includes('--json')) { console.log(JSON.stringify({ stage, tags, cards: picked, directions: dealt }, null, 1)); process.exit(0); }
const out = [`# Dealt cards for stage ${stage}${tags.length ? ` (${tags.join(', ')})` : ''}`,
  'Apply each card. Record which check you ran in the stage record. Do not read the library file itself.', ''];
const clip = (t, w) => { const p = String(t).split(/\s+/); return p.length > w ? p.slice(0, w).join(' ') + '...' : t; };
const BUDGET = 4200; // characters, about 1000 tokens with the directions
let used = out.join('\n').length + (nDir ? 1300 : 0);
const shown = [];
for (const c of picked) {
  const block = [`- **${clip(c.rule, 30)}** Do: ${clip(c.do, 22)} Don't: ${clip(c.dont, 16)}`, `  Check (${c.check_kind}): ${clip(c.check, 30)} [${c.id}]`].join('\n');
  if (shown.length >= 5 && used + block.length > BUDGET) break;
  used += block.length + 1; shown.push(c); out.push(block);
}
out.push('', 'Sources: ' + [...new Set(shown.map(c => c.source_url))].join(' '));
if (dealt.length) {
  out.push('', `## Pick one of ${dealt.length} directions`, 'Choose the one whose idea comes from the subject itself. Say why in one sentence.');
  for (const d of dealt) out.push(`- **${d.name}**: ${d.idea} Type: ${d.type}. Color: ${d.palette}. Motion: ${d.motion}.`);
}
console.log(out.join('\n'));
