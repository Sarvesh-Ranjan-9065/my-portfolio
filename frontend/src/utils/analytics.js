export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
    return
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...params })
}
