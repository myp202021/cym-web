// Eventos de conversión: Pixel de Meta + GA4 + dataLayer (GTM)
type W = Window & { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] }

export function track(evento: 'whatsapp' | 'formulario', datos: Record<string, string> = {}) {
  const w = window as W
  if (evento === 'whatsapp') {
    w.fbq?.('track', 'Contact', datos)
    w.gtag?.('event', 'click_whatsapp', datos)
  } else {
    w.fbq?.('track', 'Lead', datos)
    w.gtag?.('event', 'generate_lead', datos)
  }
  w.dataLayer?.push({ event: evento === 'whatsapp' ? 'cym_whatsapp' : 'cym_formulario', ...datos })
}
