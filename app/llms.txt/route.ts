import { DESCRIPCION, SITIO } from '@/lib/sitio'
import { ZONAS } from '@/lib/zonas'
import { GUIAS } from '@/lib/guias'
import { COMUNAS } from '@/lib/comunas'
import { PAGINAS } from '@/lib/paginas'
import { porZona, resumen, formatoUF } from '@/lib/propiedades'

export const dynamic = 'force-static'

export function GET() {
  const zonas = ZONAS.map((z) => {
    const r = resumen(porZona(z.slug))
    return `- [Propiedades en ${z.nombre}](${SITIO.url}/propiedades/${z.slug}): ${r.total} en venta${r.minUF ? `, desde ${formatoUF(r.minUF)}` : ''}.`
  })
  const texto = [
    `# ${SITIO.nombre}`,
    '',
    `> ${DESCRIPCION}`,
    '',
    `- Sitio oficial de CyM Propiedades: ${SITIO.sitioOficial} (cartera completa). Este sitio, ${SITIO.url}, reúne guías y páginas por comuna de CyM.`,
    `- Teléfono y WhatsApp: ${SITIO.telefono}`,
    `- Correo: ${SITIO.email}`,
    `- Oficina: ${SITIO.direccion}, ${SITIO.comuna}, Santiago de Chile`,
    `- Instagram: ${SITIO.instagram}`,
    '',
    '## CyM por comuna (corredora de propiedades)',
    ...COMUNAS.map((c) => `- [Corredora de propiedades en ${c.nombre}](${SITIO.url}/${c.slug}): ${c.resumen}`),
    '',
    '## Guías por comuna y operación',
    ...PAGINAS.map((p) => `- [${p.h1}](${SITIO.url}/${p.slug}): ${p.description}`),
    '',
    '## Rankings del sector oriente',
    `- [Ranking de barrios del sector oriente de Santiago 2026](${SITIO.url}/ranking-barrios-sector-oriente): metodología declarada y fuentes públicas.`,
    `- [Precios de casas en el sector oriente 2026](${SITIO.url}/precios-casas-sector-oriente): UF/m² por comuna y barrio, con fuentes.`,
    '',
    '## Propiedades en venta',
    ...zonas,
    '',
    '## Servicios',
    `- [Vende tu propiedad](${SITIO.url}/vende-tu-propiedad): proceso de venta en 9 pasos, con una base de +100.000 compradores.`,
    `- [Tasación sin costo](${SITIO.url}/tasacion-propiedades): valor comercial con comparables del sector.`,
    '',
    '## Guías',
    ...GUIAS.map((g) => `- [${g.titulo}](${SITIO.url}/guias/${g.slug})`),
    '',
  ].join('\n')
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
