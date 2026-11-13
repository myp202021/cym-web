// Datos fijos de CyM Propiedades (tomados de www.cympropiedades.cl, 27 oct 2026)
// Texto único de CyM: se usa igual en portada, Quiénes somos, pie, schema y llms.txt.
export const DESCRIPCION = 'CyM Propiedades es una corredora de propiedades de Santiago de Chile especializada en la venta de casas en Vitacura, La Dehesa (Lo Barnechea) y San Carlos de Apoquindo (Las Condes). Acompaña a propietarios y compradores en todo el proceso: tasación sin costo, publicación, visitas, negociación y cierre. Trabaja con una base de más de 100.000 compradores y 12 años en el mercado.'

export const SITIO = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cympropiedadeschile.cl').replace(/\/$/, ''),
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

// WhatsApp central de CyM (+56 9 3401 8822), pedido de Christopher 27 oct.
// Los mensajes salen armados ("Vengo de la web…" + zona/código/nombre). Si el agente (~/myp-whatsapp-agent)
// se vincula a este número, los reconoce y deriva solo al corredor de la zona.
export const WHATSAPP_AGENTE = '56934018822'

export const TRACKING = {
  gtm: 'GTM-57H283KW',
  ga4: 'G-52T9G8JFN6',
  pixel: '2684262525251873',
}

// WhatsApp de cada comuna (Christopher, 10 nov 2026): el asistente deriva directo a la ejecutiva de la zona.
// Departamentos van a Caro Paoletti en cualquier comuna. Sin zona o código desconocido: central.
export const WHATSAPP_ZONA: Record<string, string> = {
  'Vitacura': '56956994725', // Alejandro Ceballos
  'La Dehesa': '56966616220',
  'San Carlos de Apoquindo': '56975474362', // Benjamín Ceballos
  'Las Condes': '56923884109', // Anita Hernández
  'La Reina': '56923884109', // Anita Hernández
  'Departamentos': '56993327318', // Caro Paoletti
}

export function waLink(texto: string, numero: string = WHATSAPP_AGENTE) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
}

export function mensajeWeb(partes: (string | false | undefined)[]) {
  return ['Hola CyM, vengo de la web.', ...partes.filter(Boolean)].join(' ')
}

// cympropiedades.cl es el sitio oficial de CyM (no lo administramos). Este sitio (cympropiedadeschile.cl) lo refuerza
// para SEO/GEO: todas las páginas enlazan al oficial (pedido de Christopher, 13 nov 2026).
const LISTADO_OFICIAL = (loc: number) =>
  `${SITIO.sitioOficial}/i_listing.asp?dormitorios=0&select-status=VE&select-property-type=-1&select-region=-1&select-location=${loc}&rbEs=0&min-price=&max-price=&condominio=2&idPro=0`
export const OFICIAL_ZONA: Record<string, string> = {
  vitacura: LISTADO_OFICIAL(338),
  'la-dehesa': LISTADO_OFICIAL(141),
  'las-condes': LISTADO_OFICIAL(132),
  'san-carlos-de-apoquindo': LISTADO_OFICIAL(132),
}
export const oficialFicha = (codigo: string) => `${SITIO.sitioOficial}/property.asp?Origen=CODIGO&idpro=${codigo}`
