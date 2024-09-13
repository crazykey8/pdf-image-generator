import smoothscroll from 'smoothscroll-polyfill'

// kick off the polyfill!
smoothscroll.polyfill()

const arrowDown: NodeListOf<HTMLElement> =
  document.querySelectorAll('[data-section]')

export function initScrollToSection() {
  arrowDown.forEach((arrow) => {
    const section: HTMLElement | null = document.querySelector(
      `${arrow.dataset.section}`,
    )

    arrow.addEventListener('click', (event) => {
      event.preventDefault()
      section?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })
  })
}
