#!/usr/bin/env node
// Contrast and spacing check for a tokens.css file.
// Usage: node <skill>/scripts/check-tokens.mjs <tokens.css>
// Pairs are comments: /* pair body --text --bg */ or /* pair ui --border --surface */
// body must be at least 4.5:1. ui must be at least 3:1.
// --space-* values must be 0, 4, 8, 16, 24, 32, 40, 48, or 64 px.
// Exit 0 when all pairs pass. Exit 1 on a failed pair or an off-scale space. Exit 2 on bad usage.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = process.argv.slice(2).find(a => !a.startsWith('--'));
if (!file) {
  console.error('usage: node <skill>/scripts/check-tokens.mjs <tokens.css>');
  process.exit(2);
}
const text = readFileSync(resolve(file), 'utf8');
const vars = {};
for (const match of text.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
  vars[match[1]] = match[2].trim();
}
const scale = new Set([0, 4, 8, 16, 24, 32, 40, 48, 64]);
const fails = [];
for (const [name, value] of Object.entries(vars)) {
  if (!name.startsWith('--space-')) continue;
  const px = value.match(/^(-?\d+(?:\.\d+)?)px$/);
  const n = px ? Math.round(Number(px[1])) : null;
  if (n === null || !scale.has(n)) fails.push(`${name}: ${value} is off the spacing scale`);
}

function hexOf(token) {
  const raw = vars[token] || token;
  const hex = raw.match(/#([0-9a-f]{3}|[0-9a-f]{6})\b/i);
  if (!hex) return null;
  let h = hex[1];
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return h.toLowerCase();
}
function lum(hex) {
  const rgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => (
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  ));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function contrast(a, b) {
  const L = [lum(a), lum(b)].sort((x, y) => y - x);
  return (L[0] + 0.05) / (L[1] + 0.05);
}

const pairs = [...text.matchAll(/pair\s+(body|ui)\s+(--[a-z0-9-]+)\s+(--[a-z0-9-]+)/gi)];
if (!pairs.length) fails.push('no /* pair body|ui --fg --bg */ comments');
const rows = [];
for (const pair of pairs) {
  const kind = pair[1].toLowerCase();
  const fg = hexOf(pair[2]);
  const bg = hexOf(pair[3]);
  if (!fg || !bg) {
    fails.push(`${pair[2]} on ${pair[3]}: color is not a hex token`);
    continue;
  }
  const ratio = contrast(fg, bg);
  const need = kind === 'body' ? 4.5 : 3;
  const pass = ratio + 1e-9 >= need;
  rows.push({ kind, fg: pair[2], bg: pair[3], ratio, need, pass });
  if (!pass) fails.push(`${pair[2]} on ${pair[3]}: ${ratio.toFixed(2)}:1 is under ${need}:1`);
}
for (const row of rows) {
  console.log(`${row.pass ? 'PASS' : 'FAIL'} ${row.kind} ${row.fg} on ${row.bg} ${row.ratio.toFixed(2)}:1 (need ${row.need}:1)`);
}
if (fails.length) {
  console.error('check-tokens: fail');
  for (const line of fails) console.error(line);
  process.exit(1);
}
console.log('check-tokens: pass');
