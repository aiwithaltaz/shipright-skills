// Trial facts from README.md, CHANGELOG.md and evals/v1/results-final.md (2026-10-13).
// Left image is 0.6.2. Right image is 1.0.

const repo = 'https://github.com/aiwithaltaz/shipright-skills/tree/main/examples/before-after/v1.0'

export const trialNote =
  'Blind trial, 13 Oct 2026. Pack 0.6.2 scored 93 of 120. Pack 1.0 scored 112 of 120. One run per case, same model family, synthetic prompts. Not user research.'

function view(id, title, size, width, height) {
  const label = size === 'phone' ? 'Phone' : 'Desktop'
  return {
    width,
    height,
    before: {
      src: `/gallery/${id}-before-${size}.png`,
      alt: `${title}, ${label}. Pack 0.6.2.`,
    },
    after: {
      src: `/gallery/${id}-after-${size}.png`,
      alt: `${title}, ${label}. Pack 1.0.`,
    },
  }
}

export const cases = [
  {
    id: 'saas',
    title: 'SaaS dashboard',
    text: 'Blind scores 24 for 0.6.2 and 29 for 1.0. More projects are visible, each with its next deadline and budget, in one table.',
    source: `${repo}/saas-dashboard`,
    primary: 'desktop',
    desktop: view('saas', 'SaaS dashboard', 'desktop', 1280, 800),
    phone: view('saas', 'SaaS dashboard', 'phone', 390, 844),
  },
  {
    id: 'mobile',
    title: 'Mobile form',
    text: 'Blind scores 24 for 0.6.2 and 29 for 1.0. The phone comparison is the primary image for this case.',
    source: `${repo}/mobile-form`,
    primary: 'phone',
    desktop: view('mobile', 'Mobile form', 'desktop', 1280, 800),
    phone: view('mobile', 'Mobile form', 'phone', 390, 844),
  },
  {
    id: 'marketing',
    title: 'Marketing site, grid re-run',
    text: 'Checked, not graded. Hidden content and sideways scroll both pass at 1280 and 390 (0 failures, 1 warning). The graded marketing run was a different build: 22 for 0.6.2 and 28 for 1.0.',
    source: `${repo}/marketing-site-grid`,
    primary: 'desktop',
    desktop: view('marketing', 'Marketing site grid re-run', 'desktop', 1280, 800),
    phone: view('marketing', 'Marketing site grid re-run', 'phone', 390, 844),
  },
  {
    id: '3d',
    title: '3D product site, re-run',
    text: 'Blind score 26 against 23, after the motion fix. Buy is in the hero, view buttons sit under the model, and the page uses a working name. The first 1.0 run scored 19, hid its content until scroll, and is not this image.',
    source: `${repo}/3d-product-fixed`,
    primary: 'desktop',
    desktop: view('3d', '3D product site re-run', 'desktop', 1280, 800),
    phone: view('3d', '3D product site re-run', 'phone', 390, 844),
  },
]
