import type { Metadata } from 'next'
import PaginaMadre, { type Madre } from '@/components/PaginaMadre'
import datos from '@/data/madre/precios-casas-sector-oriente.json'

const m = datos as unknown as Madre

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  alternates: { canonical: '/precios-casas-sector-oriente' },
  openGraph: { title: m.title, description: m.description, url: '/precios-casas-sector-oriente', type: 'article' },
}

export default function Pagina() {
  return <PaginaMadre m={m} />
}
