// Páginas por comuna × operación (corredoras, vender casa, vender departamento, tasación, comprar casa)
// y la madre de corredoras. Contenido en data/paginas/<slug>.json; se leen en el build.
import fs from 'node:fs'
import path from 'node:path'

export type Pagina = {
  slug: string
  comuna: string
  tipo: 'corredoras' | 'vender-casa' | 'vender-departamento' | 'tasacion' | 'comprar-casa'
  title: string
  description: string
  h1: string
  bajada: string
  resumen: string
  secciones: { h2: string; parrafos: string[]; lista?: string[] }[]
  tabla?: { titulo: string; columnas: string[]; filas: string[][] }
  faq: { q: string; a: string }[]
  fuentes: { titulo: string; url: string }[]
}

const DIR = path.join(process.cwd(), 'data', 'paginas')

export const PAGINAS: Pagina[] = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) as Pagina)
  : []

export const pagina = (slug: string) => PAGINAS.find((p) => p.slug === slug)
export const paginasDe = (comuna: string) => PAGINAS.filter((p) => p.comuna === comuna)

export const TIPOS: Record<Pagina['tipo'], string> = {
  corredoras: 'Corredoras de propiedades',
  'vender-casa': 'Vender casa',
  'vender-departamento': 'Vender departamento',
  tasacion: 'Tasación de propiedades',
  'comprar-casa': 'Comprar casa',
}
