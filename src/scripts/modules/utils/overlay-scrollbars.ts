import { OverlayScrollbars } from 'overlayscrollbars'

export interface OverlayScrollbarsContainer {
  selector: string
  theme?: 'os-theme-dark' | 'os-theme-light' | 'os-theme-custom'
}

export function initOverlayScrollbars(
  containers: OverlayScrollbarsContainer[],
) {
  containers.forEach((container) => {
    const elems: NodeListOf<HTMLElement> = document.querySelectorAll(
      container.selector,
    )
    elems.forEach((elem) => {
      OverlayScrollbars(elem, {
        scrollbars: {
          autoHide: container.selector === 'body' ? 'leave' : 'never',
          theme: container.theme ?? 'os-theme-dark',
        },
      })
    })
  })
}
