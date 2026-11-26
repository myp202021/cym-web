// Páginas por comuna × operación (corredoras, vender casa, vender departamento, tasación, comprar casa)
// y la madre de corredoras. Contenido en data/paginas/<slug>.json; se leen en el build.
import fs from 'node:fs'
import path from 'node:path'

export type Pagina = {
  slug: string
  comuna: string
  tipo: 'corredoras' | 'vender-casa' | 'vender-departamento' | 'tasacion' | 'comprar-casa' | 'ranking'
  title: string
  description: string
  h1: string
  bajada: string
  resumen: string
  secciones: { h2: string; parrafos: string[]; lista?: string[]; id?: string; enlaces?: { titulo: string; url: string }[] }[]
  tabla?: { titulo: string; columnas: string[]; filas: string[][] }
  faq: { q: string; a: string }[]
  fuentes: { titulo: string; url: string }[]
  fecha?: string // última revisión del contenido (dateModified y sitemap)
  tablaPrimero?: boolean // la tabla va antes de las secciones (rankings)
}

const DIR = path.join(process.cwd(), 'data', 'paginas')

const TODAS: Pagina[] = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) as Pagina)
  : []

// 24 nov 2026 (plan Google e IA, semana 2): «Mejores corredoras en {comuna}» competía con /{comuna} por
// «corredora de propiedades {comuna}» (Search Console: las dos salen para la misma búsqueda). Su contenido
// pasa a la página de la comuna y la URL antigua redirige con 301 (next.config.ts). Se mantiene la del sector oriente.
const fusionada = (p: Pagina) => p.tipo === 'corredoras' && !!p.comuna
export const CORREDORAS_FUSIONADAS = TODAS.filter(fusionada)
export const corredorasDe = (comuna: string) => CORREDORAS_FUSIONADAS.find((p) => p.comuna === comuna)

export const PAGINAS: Pagina[] = TODAS.filter((p) => !fusionada(p))

export const pagina = (slug: string) => PAGINAS.find((p) => p.slug === slug)
export const paginasDe = (comuna: string) => PAGINAS.filter((p) => p.comuna === comuna)

export const TIPOS: Record<Pagina['tipo'], string> = {
  corredoras: 'Corredoras de propiedades',
  'vender-casa': 'Vender casa',
  'vender-departamento': 'Vender departamento',
  tasacion: 'Tasación de propiedades',
  'comprar-casa': 'Comprar casa',
  ranking: 'Ranking de corredoras',
}

// 26 nov 2026: ranking comparativo con competidores nombrados (permitido por Christopher). Se enlaza desde
// /{comuna}, /vender-casa-*, /corredoras-de-propiedades-sector-oriente, la portada y llms.txt.
export const RANKING = 'ranking-corredoras-de-propiedades-sector-oriente'
export const ANCLA_RANKING: Record<string, string> = {
  vitacura: 'vitacura',
  'la-dehesa': 'lo-barnechea-la-dehesa',
  'san-carlos-de-apoquindo': 'las-condes',
  'las-condes': 'las-condes',
  'la-reina': 'la-reina',
}
