import { handlersGtmEvent } from './events-list'

export function setDataLayer(selector = '[data-layer]') {
  const dataLayerItems: NodeListOf<HTMLElement> =
    document.querySelectorAll(selector)

  dataLayerItems.forEach((element) => {
    const itemDataValue = element.dataset.layer ?? ''

    if (itemDataValue in handlersGtmEvent) {
      element.addEventListener(
        'click',
        handlersGtmEvent[itemDataValue as keyof typeof handlersGtmEvent],
      )
    }
  })
}
