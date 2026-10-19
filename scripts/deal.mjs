#!/usr/bin/env node
// Thin wrapper. The installed skill owns the dealer.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
await import(pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), '../skills/shipright/scripts/deal.mjs')).href);
