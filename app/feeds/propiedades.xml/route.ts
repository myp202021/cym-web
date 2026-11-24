// Feed de propiedades para agregadores (Trovit, Mitula, Nestoria / LIFULL Connect, chilepropiedades.cl).
// Formato Trovit «homes», que aceptan los cuatro. Sale del mismo catálogo de /propiedades (sin ocultas &ve=si).
// Plan Google e IA, semana 3 (24 nov 2026).
import { SITIO } from '@/lib/sitio'
import { PROPIEDADES, titulo, uf } from '@/lib/propiedades'

export const dynamic = 'force-static'

const cdata = (s: string) => `<![CDATA[${String(s ?? '').replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
const num = (s?: string | number | null) => {
  const n = Number(String(s ?? '').replace(/\./g, '').replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? n : null
}

export function GET() {
  const hoy = new Date().toISOString().slice(0, 10)
  const ads = PROPIEDADES.filter((p) => p.operacion === 'Venta' && p.fotos.length).map((p) => {
    const precio = uf(p.precio)
    const m2 = num(p.m2_construidos)
    const terreno = num(p.m2_terreno)
    const campos = [
      `<id>${cdata(p.codigo)}</id>`,
      `<url>${cdata(`${SITIO.url}/propiedades/${p.zona}/${p.codigo}?utm_source=agregador&utm_medium=feed`)}</url>`,
      `<title>${cdata(`${p.tipo} en venta en ${p.comuna}: ${titulo(p)}`)}</title>`,
      `<type>${cdata('For Sale')}</type>`,
      `<content>${cdata(p.descripcion || titulo(p))}</content>`,
      Number.isFinite(precio) ? `<price currency="CLF">${cdata(String(precio))}</price>` : '',
      `<property_type>${cdata(p.tipo)}</property_type>`,
      m2 ? `<floor_area unit="meters">${cdata(String(m2))}</floor_area>` : '',
      terreno ? `<plot_area unit="meters">${cdata(String(terreno))}</plot_area>` : '',
      p.dormitorios ? `<rooms>${cdata(String(p.dormitorios))}</rooms>` : '',
      p.banos ? `<bathrooms>${cdata(String(p.banos))}</bathrooms>` : '',
      `<city>${cdata(p.comuna)}</city>`,
      `<region>${cdata('Región Metropolitana')}</region>`,
      `<agency>${cdata('CyM Propiedades')}</agency>`,
      `<pictures>${p.fotos.slice(0, 20).map((f) => `<picture><picture_url>${cdata(f)}</picture_url></picture>`).join('')}</pictures>`,
      `<date>${cdata(hoy)}</date>`,
    ]
    return `<ad>${campos.filter(Boolean).join('')}</ad>`
  })
  const xml = `<?xml version="1.0" encoding="utf-8"?>\n<trovit>\n${ads.join('\n')}\n</trovit>\n`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
