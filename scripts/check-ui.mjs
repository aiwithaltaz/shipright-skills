#!/usr/bin/env node
// Thin wrapper. The installed skill owns the checker.
import { pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const target = join(dirname(fileURLToPath(import.meta.url)), '../skills/shipright/scripts/check-ui.mjs');
await import(pathToFileURL(target).href);
