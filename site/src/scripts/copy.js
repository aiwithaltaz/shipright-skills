document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const unit = button.closest('.unit')
    const status = unit ? unit.querySelector('[data-status]') : null
    const text = button.getAttribute('data-copy') || ''
    try {
      await navigator.clipboard.writeText(text)
      if (status) status.textContent = 'Copied'
    } catch {
      if (status) status.textContent = 'Copy failed. Select the line.'
      const code = unit ? unit.querySelector('code') : null
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
