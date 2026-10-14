const tabs = [...document.querySelectorAll('[role="tab"]')]
const panels = [...document.querySelectorAll('[role="tabpanel"]')]

function select(index, focus) {
  tabs.forEach((tab, i) => {
    const on = i === index
    tab.setAttribute('aria-selected', on ? 'true' : 'false')
    tab.tabIndex = on ? 0 : -1
    if (panels[i]) panels[i].hidden = !on
  })
  if (focus) tabs[index]?.focus()
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => select(index, false))
  tab.addEventListener('keydown', (event) => {
    const last = tabs.length - 1
    let next = null
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last
    if (next === null) return
    event.preventDefault()
    select(next, true)
  })
})
