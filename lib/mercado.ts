// Precio pedido de los avisos de venta de CyM por zona y tipo (24 nov 2026).
// Lo usan /datos-mercado-oriente y las páginas «vender casa / vender departamento / tasación {comuna}».
// Es precio publicado, no precio de cierre. Sin UF/m²: publicarlo lo decide Alejandro.
import { PROPIEDADES, uf, type Propiedad } from '@/lib/propiedades'

export const MIN_AVISOS = 5

const cuantil = (xs: number[], q: number) => {
  const s = [...xs].sort((a, b) => a - b)
  const i = (s.length - 1) * q, lo = Math.floor(i), hi = Math.ceil(i)
  return s[lo] + (s[hi] - s[lo]) * (i - lo)
}
const redondeo = (n: number) => Math.round(n / 100) * 100
const numero = (s?: string) => Number(String(s || '').replace(/\./g, '').replace(',', '.'))

export type Segmento = {
  n: number
  mediana: number
  p25: number
  p75: number
  m2: number | null
  terreno: number | null
  dorm: number | null
  avisos: Propiedad[]
}

export function segmento(zona: string, tipo: 'Casa' | 'Departamento'): Segmento | null {
  const avisos = PROPIEDADES.filter((p) => p.zona === zona && p.tipo === tipo && p.operacion === 'Venta' && Number.isFinite(uf(p.precio)))
  if (avisos.length < MIN_AVISOS) return null
  const precios = avisos.map((p) => uf(p.precio))
  const m2 = avisos.map((p) => numero(p.m2_construidos)).filter((n) => n > 0)
  const terreno = avisos.map((p) => numero(p.m2_terreno)).filter((n) => n > 0)
  const dorm = avisos.map((p) => p.dormitorios || 0).filter((n) => n > 0)
  return {
    n: avisos.length,
    mediana: redondeo(cuantil(precios, 0.5)),
    p25: redondeo(cuantil(precios, 0.25)),
    p75: redondeo(cuantil(precios, 0.75)),
    m2: m2.length >= MIN_AVISOS ? Math.round(cuantil(m2, 0.5)) : null,
    terreno: terreno.length >= MIN_AVISOS ? Math.round(cuantil(terreno, 0.5)) : null,
    dorm: dorm.length >= MIN_AVISOS ? Math.round(cuantil(dorm, 0.5)) : null,
    avisos,
  }
}
