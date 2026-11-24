import datos from '@/data/propiedades.json'
import catalogo from '@/data/catalogo.json'
import { WHATSAPP_ZONA } from '@/lib/sitio'
import { zona as buscarZonaSlug, type Zona } from '@/lib/zonas'

export type Propiedad = {
  codigo: string
  url_ficha: string
  precio: string
  operacion: string
  tipo: string
  m2_construidos?: string
  m2_terreno?: string
  comuna: string
  dormitorios: number | null
  banos: number | null
  titulo: string
  descripcion: string
  fotos: string[]
  oficina: string
  campana: string
  zona: string
  sector?: string
}

// Comuna de la ficha → página de zona (las 5 zonas de CyM); el resto de las comunas tiene su propia página.
const COMUNA_ZONA: Record<string, string> = { 'Lo Barnechea': 'la-dehesa', Vitacura: 'vitacura', 'Las Condes': 'las-condes', 'La Reina': 'la-reina' }
export const slugComuna = (c: string) => c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const zonaDe = (p: { comuna: string; titulo: string }) =>
  p.comuna === 'Las Condes' && /SAN CARLOS/i.test(p.titulo) ? 'san-carlos-de-apoquindo' : COMUNA_ZONA[p.comuna] || slugComuna(p.comuna)

// Propiedades en campaña (data/propiedades.json) + catálogo completo publicado en cympropiedades.cl (data/catalogo.json, sin ocultas &ve=si)
const enCampana = (datos.propiedades as Propiedad[]).filter((p) => p.fotos.length)
const codigosCampana = new Set(enCampana.map((p) => p.codigo))
const delCatalogo = (catalogo.propiedades as Omit<Propiedad, 'campana' | 'zona'>[])
  .filter((p) => p.fotos.length && !codigosCampana.has(p.codigo))
  .map((p) => {
    const zona = zonaDe(p)
    return { ...p, campana: '', zona, ...(zona === 'san-carlos-de-apoquindo' ? { sector: 'San Carlos de Apoquindo' } : {}) } as Propiedad
  })
export const PROPIEDADES = [...enCampana, ...delCatalogo]
export const ACTUALIZADO = catalogo.actualizado > datos.actualizado ? catalogo.actualizado : datos.actualizado

// Comunas con propiedades, ordenadas: primero las 5 zonas de CyM, luego el resto por orden alfabético.
const ORDEN_ZONAS = ['vitacura', 'la-dehesa', 'san-carlos-de-apoquindo', 'las-condes', 'la-reina']
export function comunasCatalogo() {
  const m = new Map<string, { slug: string; comuna: string; total: number }>()
  for (const p of PROPIEDADES) {
    const x = m.get(p.zona) || { slug: p.zona, comuna: p.comuna, total: 0 }
    x.total++
    m.set(p.zona, x)
  }
  return [...m.values()].sort((a, b) => {
    const ia = ORDEN_ZONAS.indexOf(a.slug), ib = ORDEN_ZONAS.indexOf(b.slug)
    if (ia >= 0 || ib >= 0) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
    return a.comuna.localeCompare(b.comuna, 'es')
  })
}

// Fotos: las de campaña pasan por el optimizador de imágenes; las del catálogo se sirven directo (cientos de fichas).
export const sinOptimizar = (p: Propiedad) => !p.campana

export function porZona(zona: string) {
  return PROPIEDADES.filter((p) => p.zona === zona).sort((a, b) => uf(a.precio) - uf(b.precio))
}

export function porCodigo(codigo: string) {
  return PROPIEDADES.find((p) => p.codigo === codigo)
}

// "UF 16.000" → 16000 ; precios en pesos → NaN (se excluyen de los rangos)
export function uf(precio: string) {
  const m = precio.match(/UF\s*([\d.]+)/)
  return m ? Number(m[1].replace(/\./g, '')) : NaN
}

export function formatoUF(n: number) {
  return 'UF ' + n.toLocaleString('es-CL')
}

export function titulo(p: Propiedad) {
  const t = p.titulo.toLowerCase().replace(/(^|[\s./(-])\p{L}/gu, (c) => c.toUpperCase())
  return t.length > 70 ? t.slice(0, 67).trim() + '…' : t
}

// Zona tal como la entiende el agente de WhatsApp (San Carlos de Apoquindo tiene corredor propio)
export function zonaAgente(p: Propiedad, nombreZona: string) {
  return p.sector || nombreZona
}

export function resumen(lista: Propiedad[]) {
  const precios = lista.map((p) => uf(p.precio)).filter((n) => !isNaN(n))
  const dorm = lista.map((p) => p.dormitorios).filter((n): n is number => !!n)
  return {
    total: lista.length,
    casas: lista.filter((p) => p.tipo === 'Casa').length,
    deptos: lista.filter((p) => p.tipo !== 'Casa').length,
    minUF: precios.length ? Math.min(...precios) : null,
    maxUF: precios.length ? Math.max(...precios) : null,
    minDorm: dorm.length ? Math.min(...dorm) : null,
    maxDorm: dorm.length ? Math.max(...dorm) : null,
  }
}

// WhatsApp de la ejecutiva a cargo (10 nov 2026): departamentos → Caro; casas → director de la comuna.
export function numeroPropiedad(p: Propiedad) {
  return WHATSAPP_ZONA[p.tipo === 'Departamento' ? 'Departamentos' : buscarZonaSlug(p.zona)?.nombre || ''] || undefined
}

// Zona de CyM, o página genérica para otra comuna con propiedades publicadas (Providencia, Colina, etc.)
export function zonaOComuna(slug: string): Zona | undefined {
  const z = buscarZonaSlug(slug)
  if (z) return z
  const c = comunasCatalogo().find((x) => x.slug === slug)
  if (!c) return undefined
  const n = c.comuna
  return {
    slug,
    nombre: n,
    comuna: n,
    title: `Propiedades en venta en ${n} | CyM Propiedades`,
    description: `Casas y departamentos en venta en ${n} publicados por CyM Propiedades, con fotos, superficie y precio en UF. Cotiza por WhatsApp.`,
    h1: `Propiedades en venta en ${n}`,
    bajada: 'Propiedades publicadas por CyM, con la ficha oficial de cada una.',
    intro: [],
    barrios: [],
    porQue: [],
    faq: [
      { q: `¿Cómo cotizo una propiedad en ${n}?`, a: 'Toca "Cotizar por WhatsApp" en la propiedad que te interesa y un corredor de CyM te escribe con la información completa.' },
      { q: '¿Los precios están en UF?', a: 'Sí, las propiedades en venta se publican en UF, como es habitual en el mercado chileno.' },
    ],
    microzonas: [],
    colegios: [],
  }
}
