const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reduce && 'IntersectionObserver' in window) {
  const nodes = document.querySelectorAll('[data-rise]')
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('rise')
      observer.unobserve(entry.target)
    }
  }, { threshold: 0.16 })
  nodes.forEach((node) => observer.observe(node))
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const row = button.closest('.install-row')
    const status = row ? row.querySelector('[data-copy-status]') : null
    const text = button.getAttribute('data-copy') || ''
    try {
      await navigator.clipboard.writeText(text)
      if (status) status.textContent = 'Copied'
    } catch {
      if (status) status.textContent = 'Copy failed. Select the line.'
      const code = row ? row.querySelector('code') : null
      if (code) {
        const range = document.createRange()
        range.selectNodeContents(code)
        const selection = window.getSelection()
        if (selection) {
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    }
  })
})
