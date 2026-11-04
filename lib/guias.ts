import datos from '@/data/guias.json'

export type Guia = { slug: string; titulo: string; descripcion: string; resumen: string; html: string; faq: { q: string; a: string }[] }
export const GUIAS = datos as Guia[]
export const guia = (slug: string) => GUIAS.find((g) => g.slug === slug)
