// Datos fijos de CyM Propiedades (tomados de www.cympropiedades.cl, 27 oct 2026)
export const SITIO = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://cym-web.vercel.app').replace(/\/$/, ''),
  nombre: 'CyM Propiedades',
  razon: 'CyM Propiedades — Clients & Management Properties Chile',
  telefono: '+56 9 3401 8822',
  telefonoHref: 'tel:+56934018822',
  email: 'contacto@cympropiedades.cl',
  direccion: 'Av. La Dehesa 1844, of. 313, Torre Norte',
  comuna: 'Lo Barnechea',
  region: 'Región Metropolitana',
  instagram: 'https://www.instagram.com/cym_propiedades/',
  sitioOficial: 'https://www.cympropiedades.cl',
}

// WhatsApp atendido por el agente de CyM (número de Rayen, ~/myp-whatsapp-agent).
// El agente reconoce los mensajes que dicen "Vengo de la web" y deriva al corredor de la zona.
export const WHATSAPP_AGENTE = '56951432633'

export const TRACKING = {
  gtm: 'GTM-57H283KW',
  ga4: 'G-52T9G8JFN6',
  pixel: '2684262525251873',
}

export function waLink(texto: string) {
  return `https://wa.me/${WHATSAPP_AGENTE}?text=${encodeURIComponent(texto)}`
}

export function mensajeWeb(partes: (string | false | undefined)[]) {
  return ['Hola CyM 👋 Vengo de la web.', ...partes.filter(Boolean)].join(' ')
}
