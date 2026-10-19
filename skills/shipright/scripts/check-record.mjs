#!/usr/bin/env node
// Check a project record folder.
// Usage: node <skill>/scripts/check-record.mjs <record-dir> [--base] [--ship]
// --base (1.4): CONTEXT.md has an Idea brief, ARCHITECTURE.md has a Screens table with a job, one primary action
//   and empty, loading and error states for every screen, plus Project rules. --ship (1.4): HANDOFF.md has
//   Security, Preview and QA, and Monitoring sections.
// Exit 0 when the six record files exist and are not templates, and any case study
// or pitch deck in that folder passes the guardrails below.
// Exit 1 on a problem. Exit 2 on bad usage.
//
// Guardrails:
// - Every Approved decision has a date and a decider.
// - Every changelog row with a change names a pain or decision id.
// - Every local screenshot path in the case study exists.
// - The case study has no number that is not in the other record files or the test report.
// - Market, model, and ask lines in the pitch deck do not state a number unless that
//   same line says Verified, Assumed, or [Add your real numbers].
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, dirname, basename } from 'node:path';

const dirArg = process.argv.slice(2).find(a => !a.startsWith('--'));
if (!dirArg) {
  console.error('usage: node <skill>/scripts/check-record.mjs <record-dir>');
  process.exit(2);
}
const dir = resolve(dirArg);
const problems = [];
const files = ['CONTEXT.md', 'ARCHITECTURE.md', 'DECISIONS.md', 'CHALLENGES.md', 'CHANGELOG.md', 'HANDOFF.md'];

function read(path) {
  return readFileSync(path, 'utf8');
}

function cells(line) {
  return line.split('|').slice(1, -1).map(cell => cell.trim());
}

function tableRows(text) {
  const rows = [];
  let headers = null;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim().startsWith('|')) continue;
    const cols = cells(line);
    if (cols.every(col => /^:?-+:?$/.test(col))) continue;
    if (!headers) {
      headers = cols.map(col => col.toLowerCase());
      continue;
    }
    const row = {};
    headers.forEach((name, i) => { row[name] = cols[i] || ''; });
    if (Object.values(row).every(value => !value)) continue;
    rows.push(row);
  }
  return rows;
}

function numbersIn(text) {
  const found = new Set();
  for (const match of text.matchAll(/\d[\d,]*(?:\.\d+)?/g)) found.add(match[0].replace(/,/g, ''));
  return found;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

for (const name of files) {
  const path = join(dir, name);
  if (!existsSync(path) || !statSync(path).isFile()) {
    problems.push(`${name}: missing`);
    continue;
  }
  const text = read(path);
  if (/^Status:\s*template\s*$/m.test(text)) problems.push(`${name}: still a template`);
  if (!/^## /m.test(text)) problems.push(`${name}: no section heading`);
}

const decisionsPath = join(dir, 'DECISIONS.md');
if (existsSync(decisionsPath)) {
  for (const row of tableRows(read(decisionsPath))) {
    if ((row.status || '').toLowerCase() !== 'approved') continue;
    if (!row.date) problems.push('DECISIONS.md: Approved row has no date');
    if (!(row.who || row.decider)) problems.push('DECISIONS.md: Approved row has no decider');
  }
}

const changePath = join(dir, 'CHANGELOG.md');
if (existsSync(changePath)) {
  for (const row of tableRows(read(changePath))) {
    const change = row.change || row.what || '';
    if (!change) continue;
    const blob = Object.values(row).join(' ');
    if (!/\b[A-Za-z]{1,8}-?\d+\b/.test(blob)) {
      problems.push(`CHANGELOG.md: "${change.slice(0, 60)}" has no pain or decision id`);
    }
  }
}

function resolveShot(fromFile, target) {
  if (!target || /^(https?:|data:|mailto:)/i.test(target)) return null;
  const clean = target.split('#')[0].split('?')[0];
  if (!clean) return null;
  const bases = [];
  if (clean.startsWith('/')) {
    const rel = clean.replace(/^\/+/, '');
    bases.push(resolve(dirname(fromFile), rel));
    bases.push(resolve(dirname(fromFile), 'public', rel));
    bases.push(resolve(dir, rel));
    bases.push(resolve(dir, '..', 'public', rel));
  } else {
    bases.push(resolve(dirname(fromFile), clean));
  }
  return bases.find(path => existsSync(path) && statSync(path).isFile()) || bases[0];
}

function localShots(text, kind) {
  const shots = [];
  if (kind === 'md') {
    for (const match of text.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)) shots.push(match[1]);
    for (const match of text.matchAll(/^(?:Shot|Screenshot):\s*(\S+)/gm)) shots.push(match[1]);
  } else {
    for (const match of text.matchAll(/\bsrc=["']([^"']+)["']/g)) shots.push(match[1]);
  }
  return shots;
}

function checkShots(path, kind) {
  const text = read(path);
  for (const target of localShots(text, kind)) {
    const resolved = resolveShot(path, target);
    if (!resolved) continue;
    if (!existsSync(resolved) || !statSync(resolved).isFile()) {
      problems.push(`${basename(path)}: missing screenshot ${target}`);
    }
  }
}

function allowedNumbers() {
  const allowed = new Set();
  const names = readdirSync(dir).filter(name => name.endsWith('.md') && name !== 'case-study.md' && name !== 'pitch-deck.md');
  for (const name of names) {
    for (const value of numbersIn(read(join(dir, name)))) allowed.add(value);
  }
  return allowed;
}

function checkNumbers(path, text) {
  const allowed = allowedNumbers();
  const seen = new Set();
  for (const value of numbersIn(text)) {
    if (allowed.has(value) || seen.has(value)) continue;
    seen.add(value);
    problems.push(`${basename(path)}: number ${value} is not in the record or the test report`);
  }
}

const caseMd = join(dir, 'case-study.md');
const caseHtml = [join(dir, 'case-study.html'), join(dir, '..', 'case-study.html')].find(path => existsSync(path));
if (existsSync(caseMd)) {
  const text = read(caseMd);
  if (/^Status:\s*template\s*$/m.test(text)) problems.push('case-study.md: still a template');
  checkShots(caseMd, 'md');
  checkNumbers(caseMd, text);
}
if (caseHtml) {
  const raw = read(caseHtml);
  checkShots(caseHtml, 'html');
  checkNumbers(caseHtml, stripTags(raw));
}

const pitchPath = join(dir, 'pitch-deck.md');
if (existsSync(pitchPath)) {
  const text = read(pitchPath);
  if (/^Status:\s*template\s*$/m.test(text)) problems.push('pitch-deck.md: still a template');
  const slides = text.split(/^## /m).slice(1);
  for (const slide of slides) {
    const [titleLine, ...rest] = slide.split(/\r?\n/);
    const title = titleLine.trim().toLowerCase();
    if (!/market|model|ask|traction|revenue/.test(title)) continue;
    for (const line of rest) {
      if (!/\d/.test(line)) continue;
      if (/Verified|Assumed|\[Add your real numbers\]/i.test(line)) continue;
      problems.push(`pitch-deck.md: ${titleLine.trim()} has a number without a source, Assumed, or a blank`);
      break;
    }
  }
}

const argv = process.argv.slice(2);
function section(text, name) {
  const m = text.match(new RegExp(`^## ${name}[^\\n]*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'mi'));
  return m ? m[1] : null;
}
function filled(body) { return body && body.replace(/^[-*\s]*$/gm, '').replace(/Names only\./, '').trim().length > 0; }
function labeled(body, labels, where) {
  for (const label of labels) {
    const line = (body || '').match(new RegExp(`^[-*]\\s*${label}:\\s*(.*)$`, 'mi'));
    if (!line || line[1].trim().length < 3) problems.push(`${where}: "${label}:" is missing or empty`);
  }
}
const readIf = name => existsSync(join(dir, name)) ? read(join(dir, name)) : '';
if (argv.includes('--base')) {
  const ctx = readIf('CONTEXT.md');
  const idea = section(ctx, 'Idea');
  if (!idea) problems.push('CONTEXT.md: no "## Idea" brief (vision, user, MVP, out of scope, next step)');
  else labeled(idea, ['Vision', 'User', 'MVP', 'Out of scope', 'Next step'], 'CONTEXT.md Idea');
  const arch = readIf('ARCHITECTURE.md');
  const screens = section(arch, 'Screens');
  if (!screens) problems.push('ARCHITECTURE.md: no "## Screens" table (screen, job, primary action, empty, loading, error)');
  else {
    const rows = tableRows(screens);
    if (!rows.length) problems.push('ARCHITECTURE.md Screens: table has no rows');
    for (const row of rows) {
      const name = row.screen || '?';
      for (const col of ['job', 'primary action', 'empty', 'loading', 'error']) {
        const v = (row[col] || '').trim();
        if (!v || /^(-|tbd|todo|n\/a|none)$/i.test(v)) problems.push(`ARCHITECTURE.md Screens: ${name} has no ${col}`);
      }
      if (/\b(and|or)\b|[,+/]/i.test(row['primary action'] || '')) problems.push(`ARCHITECTURE.md Screens: ${name} has more than one primary action`);
      if (row.loading && !/skeleton|spinner|progress|instant|optimistic|placeholder/i.test(row.loading)) problems.push(`ARCHITECTURE.md Screens: ${name} loading state does not name skeleton, spinner, progress or instant`);
      if (row.error && !/retry|try again|fix|contact|back|undo|edit|reload/i.test(row.error)) problems.push(`ARCHITECTURE.md Screens: ${name} error state has no way out (retry, fix, back)`);
    }
  }
  const rules = section(arch, 'Project rules');
  if (!rules) problems.push('ARCHITECTURE.md: no "## Project rules" (stack, folders, banned)');
  else labeled(rules, ['Stack', 'Folders', 'Banned'], 'ARCHITECTURE.md Project rules');
}
if (argv.includes('--ship')) {
  const hand = readIf('HANDOFF.md');
  for (const [name, need] of [['Security', /access|auth/i], ['Preview and QA', /https?:\/\/|preview/i], ['Monitoring', /error/i]]) {
    const body = section(hand, name);
    if (!filled(body)) problems.push(`HANDOFF.md: no filled "## ${name}" section`);
    else if (!need.test(body)) problems.push(`HANDOFF.md ${name}: must mention ${need.source.replace(/\\/g, '')}`);
  }
  const mon = section(hand, 'Monitoring');
  if (mon && filled(mon) && !/owner:/i.test(mon)) problems.push('HANDOFF.md Monitoring: no "Owner:" line');
}

if (problems.length) {
  console.error('check-record: fail');
  for (const line of problems) console.error(line);
  process.exit(1);
}
console.log('check-record: pass');
