// Cartera publicada de CyM por comuna, contada en el sitio oficial (cympropiedades.cl).
// Se genera con: python3 scripts/cartera-por-comuna.py  →  data/cartera-cym.json
import datos from '@/data/cartera-cym.json'

export type CarteraComuna = {
  slug: string
  nombre: string
  comuna_ficha: string
  nota?: string
  venta: number
  casas: number
  departamentos: number
  otros: number
  min_uf: number | null
  max_uf: number | null
  mediana_uf: number | null
  sectores: string[]
}

export const CARTERA = datos as { fecha: string; fuente: string; total_venta: number; comunas: CarteraComuna[] }
export const carteraDe = (slug: string) => CARTERA.comunas.find((c) => c.slug === slug)
export const fechaCartera = () => {
  const [a, m, d] = CARTERA.fecha.split('-').map(Number)
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  return `${d} de ${meses[m - 1]} de ${a}`
}
