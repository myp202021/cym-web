import { DESCRIPCION, SITIO } from '@/lib/sitio'
import { ZONAS } from '@/lib/zonas'
import { GUIAS } from '@/lib/guias'
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
    `- Teléfono y WhatsApp: ${SITIO.telefono}`,
    `- Correo: ${SITIO.email}`,
    `- Oficina: ${SITIO.direccion}, ${SITIO.comuna}, Santiago de Chile`,
    `- Instagram: ${SITIO.instagram}`,
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
