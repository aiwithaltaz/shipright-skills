import { cpSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(siteRoot, '..')
const outDir = resolve(siteRoot, 'public/gallery')

const files = {
  'saas-desktop.png': 'examples/before-after/v1.0/saas-dashboard/compare-desktop.png',
  'saas-phone.png': 'examples/before-after/v1.0/saas-dashboard/compare-phone.png',
  'mobile-phone.png': 'examples/before-after/v1.0/mobile-form/compare-phone.png',
  'mobile-desktop.png': 'examples/before-after/v1.0/mobile-form/compare-desktop.png',
  'marketing-desktop.png': 'examples/before-after/v1.0/marketing-site-grid/compare-desktop.png',
  'marketing-phone.png': 'examples/before-after/v1.0/marketing-site-grid/compare-phone.png',
  '3d-desktop.png': 'examples/before-after/v1.0/3d-product-fixed/compare-desktop.png',
  '3d-phone.png': 'examples/before-after/v1.0/3d-product-fixed/compare-phone.png',
}

mkdirSync(outDir, { recursive: true })
for (const [name, rel] of Object.entries(files)) {
  cpSync(resolve(repoRoot, rel), resolve(outDir, name))
}
