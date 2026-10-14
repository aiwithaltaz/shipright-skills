import { cpSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(siteRoot, '..')
const outDir = resolve(siteRoot, 'public/gallery')

const files = {
  'saas-before-desktop.png': 'examples/before-after/v1.0/saas-dashboard/before-desktop.png',
  'saas-after-desktop.png': 'examples/before-after/v1.0/saas-dashboard/after-desktop.png',
  'saas-before-phone.png': 'examples/before-after/v1.0/saas-dashboard/before-phone.png',
  'saas-after-phone.png': 'examples/before-after/v1.0/saas-dashboard/after-phone.png',
  'mobile-before-desktop.png': 'examples/before-after/v1.0/mobile-form/before-desktop.png',
  'mobile-after-desktop.png': 'examples/before-after/v1.0/mobile-form/after-desktop.png',
  'mobile-before-phone.png': 'examples/before-after/v1.0/mobile-form/before-phone.png',
  'mobile-after-phone.png': 'examples/before-after/v1.0/mobile-form/after-phone.png',
  'marketing-before-desktop.png': 'examples/before-after/v1.0/marketing-site-grid/before-desktop.png',
  'marketing-after-desktop.png': 'examples/before-after/v1.0/marketing-site-grid/after-desktop.png',
  'marketing-before-phone.png': 'examples/before-after/v1.0/marketing-site-grid/before-phone.png',
  'marketing-after-phone.png': 'examples/before-after/v1.0/marketing-site-grid/after-phone.png',
  '3d-before-desktop.png': 'examples/before-after/v1.0/3d-product-fixed/before-desktop.png',
  '3d-after-desktop.png': 'examples/before-after/v1.0/3d-product-fixed/after-desktop.png',
  '3d-before-phone.png': 'examples/before-after/v1.0/3d-product-fixed/before-phone.png',
  '3d-after-phone.png': 'examples/before-after/v1.0/3d-product-fixed/after-phone.png',
}

mkdirSync(outDir, { recursive: true })
for (const [name, rel] of Object.entries(files)) {
  cpSync(resolve(repoRoot, rel), resolve(outDir, name))
}
