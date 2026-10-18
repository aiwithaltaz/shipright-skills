#!/usr/bin/env node
// Check a project record folder. A stage is not done while these files are still blank templates.
// Usage: node <skill>/scripts/check-record.mjs <record-dir>
// Exit 0 when all six files exist and none still say "Status: template".
// Exit 1 when a file is missing or still a template. Exit 2 on bad usage.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const dirArg = process.argv.slice(2).find(a => !a.startsWith('--'));
if (!dirArg) {
  console.error('usage: node <skill>/scripts/check-record.mjs <record-dir>');
  process.exit(2);
}
const dir = resolve(dirArg);
const files = ['CONTEXT.md', 'ARCHITECTURE.md', 'DECISIONS.md', 'CHALLENGES.md', 'CHANGELOG.md', 'HANDOFF.md'];
const problems = [];
for (const name of files) {
  const path = join(dir, name);
  if (!existsSync(path) || !statSync(path).isFile()) {
    problems.push(`${name}: missing`);
    continue;
  }
  const text = readFileSync(path, 'utf8');
  if (/^Status:\s*template\s*$/m.test(text)) problems.push(`${name}: still a template`);
  if (!/^## /m.test(text)) problems.push(`${name}: no section heading`);
}
if (problems.length) {
  console.error('check-record: fail');
  for (const line of problems) console.error(line);
  process.exit(1);
}
console.log('check-record: pass');
