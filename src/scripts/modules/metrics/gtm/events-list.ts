import type { LayerOptions } from 'declare'

function createPushLayer(options: LayerOptions) {
  return () => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'landing',
      eventLabel: '{{Page URL}}',
      ...options,
    })
  }
}

export const handlersGtmEvent = {
  REGISTRATION_LINK_BUTTON_CLICK: createPushLayer({
    eventCategory: 'registration',
    eventAction: 'registration_link_button_click',
  }),
}
