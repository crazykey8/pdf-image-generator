// Declare GTM
export interface LayerOptions {
  event?: string
  eventCategory: string
  eventAction: string
  eventLabel?: string
}

declare global {
  interface Window {
    dataLayer: LayerOptions[]
  }
}
