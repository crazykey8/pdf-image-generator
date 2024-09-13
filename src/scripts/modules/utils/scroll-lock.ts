const $body = document.body
let scrollPosition = 0

export function lockScroll() {
  if ($body.style.top === '') {
    scrollPosition = window.scrollY
    $body.style.overflow = 'hidden'
    $body.style.position = 'fixed'
    $body.style.top = `-${scrollPosition}px`
    $body.style.width = '100%'
  }
}

export function unlockScroll() {
  $body.style.removeProperty('overflow')
  $body.style.removeProperty('position')
  $body.style.removeProperty('top')
  $body.style.removeProperty('width')
  window.scrollTo(0, scrollPosition)
}
