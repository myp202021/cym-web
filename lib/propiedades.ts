import datos from '@/data/propiedades.json'

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

export const PROPIEDADES = (datos.propiedades as Propiedad[]).filter((p) => p.fotos.length)
export const ACTUALIZADO = datos.actualizado

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
