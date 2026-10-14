document.querySelectorAll('[data-case]').forEach((section) => {
  const picks = [...section.querySelectorAll('[data-size-pick]')]
  const panels = [...section.querySelectorAll('[data-compare]')]
  picks.forEach((pick) => {
    pick.addEventListener('click', () => {
      const size = pick.getAttribute('data-size-pick')
      picks.forEach((item) => {
        item.setAttribute('aria-pressed', item === pick ? 'true' : 'false')
      })
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-size') !== size
      })
    })
  })
})

document.querySelectorAll('[data-compare]').forEach((compare) => {
  const range = compare.querySelector('input[type="range"]')
  if (!range) return
  const paint = () => compare.style.setProperty('--pos', `${range.value}%`)
  range.addEventListener('input', paint)
  paint()
})
