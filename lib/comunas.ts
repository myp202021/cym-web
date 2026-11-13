// Landings de EMPRESA por comuna (/vitacura, /la-dehesa…). Distintas del listado /propiedades/<zona>:
// apuntan a "corredora de propiedades en {comuna}". Contenido en data/comunas/<slug>.json (con fuentes).
import vitacura from '@/data/comunas/vitacura.json'
import laDehesa from '@/data/comunas/la-dehesa.json'
import sanCarlos from '@/data/comunas/san-carlos-de-apoquindo.json'
import lasCondes from '@/data/comunas/las-condes.json'
import laReina from '@/data/comunas/la-reina.json'

export type Comuna = {
  slug: string
  nombre: string
  comuna: string
  title: string
  description: string
  h1: string
  bajada: string
  resumen: string
  servicios: { nombre: string; texto: string }[]
  secciones: { h2: string; parrafos: string[]; lista?: string[] }[]
  barrios: { nombre: string; texto: string; lat: number; lng: number }[]
  ranking: {
    titulo: string
    metodologia: string
    items: { puesto: number; barrio: string; fortalezas: string; ojo: string; ideal_para: string }[]
  }
  faq: { q: string; a: string }[]
  mapa: { lat: number; lng: number; zoom: number }
  fuentes: { titulo: string; url: string }[]
}

export const COMUNAS = [vitacura, laDehesa, sanCarlos, lasCondes, laReina] as unknown as Comuna[]
export const comuna = (slug: string) => COMUNAS.find((c) => c.slug === slug)
