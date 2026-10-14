// Trial facts from README.md, CHANGELOG.md and evals/v1/results-final.md (2026-10-13).
// Images are the real comparison files. Left is 0.6.2. Right is 1.0.

const repo = 'https://github.com/aiwithaltaz/shipright-skills/tree/main/examples/before-after/v1.0'

export const trial = {
  baselineVersion: '0.6.2',
  currentVersion: '1.0',
  baseline: 93,
  current: 112,
  firstRun: 105,
  max: 120,
  phase3Baseline: 94,
  phase3Current: 107,
}

export const cases = [
  {
    id: 'saas',
    title: 'SaaS dashboard',
    text: 'Blind scores 24 for 0.6.2 and 29 for 1.0. More projects are visible, each with its next deadline and budget, in one table.',
    source: `${repo}/saas-dashboard`,
    images: [
      {
        src: '/gallery/saas-desktop.png',
        width: 1400,
        height: 499,
        label: 'Desktop',
        alt: 'SaaS dashboard comparison. Pack 0.6.2 is on the left. Pack 1.0 is on the right.',
      },
      {
        src: '/gallery/saas-phone.png',
        width: 900,
        height: 980,
        label: 'Phone',
        phone: true,
        alt: 'SaaS dashboard phone comparison. Pack 0.6.2 is on the left. Pack 1.0 is on the right.',
      },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile form',
    text: 'Blind scores 24 for 0.6.2 and 29 for 1.0. The phone comparison is the primary image for this case.',
    source: `${repo}/mobile-form`,
    images: [
      {
        src: '/gallery/mobile-phone.png',
        width: 900,
        height: 980,
        label: 'Phone',
        phone: true,
        alt: 'Mobile form phone comparison. Pack 0.6.2 is on the left. Pack 1.0 is on the right.',
      },
      {
        src: '/gallery/mobile-desktop.png',
        width: 1400,
        height: 499,
        label: 'Desktop',
        alt: 'Mobile form desktop comparison. Pack 0.6.2 is on the left. Pack 1.0 is on the right.',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing site, grid re-run',
    text: 'Checked, not graded. Hidden content and sideways scroll both pass at 1280 and 390 (0 failures, 1 warning). The graded marketing run was a different build: 22 for 0.6.2 and 28 for 1.0.',
    source: `${repo}/marketing-site-grid`,
    images: [
      {
        src: '/gallery/marketing-desktop.png',
        width: 1400,
        height: 499,
        label: 'Desktop',
        alt: 'Marketing site grid re-run. Pack 0.6.2 is on the left. Pack 1.0 is on the right. This run was checked, not blind graded.',
      },
      {
        src: '/gallery/marketing-phone.png',
        width: 900,
        height: 980,
        label: 'Phone',
        phone: true,
        alt: 'Marketing site grid re-run on a phone. Pack 0.6.2 is on the left. Pack 1.0 is on the right.',
      },
    ],
  },
  {
    id: '3d',
    title: '3D product site, re-run',
    text: 'Blind score 26 against 23, after the motion fix. Buy is in the hero, view buttons sit under the model, and the page uses a working name. The first 1.0 run scored 19, hid its content until scroll, and is not this image.',
    source: `${repo}/3d-product-fixed`,
    images: [
      {
        src: '/gallery/3d-desktop.png',
        width: 1400,
        height: 499,
        label: 'Desktop',
        alt: '3D product site after the motion fix. Pack 0.6.2 is on the left. Pack 1.0 is on the right. This is the re-run, not the first run that hid content.',
      },
      {
        src: '/gallery/3d-phone.png',
        width: 900,
        height: 980,
        label: 'Phone',
        phone: true,
        alt: '3D product site phone comparison after the motion fix. Pack 0.6.2 is on the left. Pack 1.0 is on the right.',
      },
    ],
  },
]
