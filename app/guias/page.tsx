import { FAQ_CYM } from '@/lib/faqs'
import Faq from '@/components/Faq'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { GUIAS } from '@/lib/guias'
import { SITIO } from '@/lib/sitio'

export const metadata = {
  title: 'Guías para comprar y vender casas en el sector oriente | CyM Propiedades',
  description: 'Plan Regulador de Vitacura, precio del m² por sector y casas para remodelar: guías con fuentes de CyM Propiedades.',
  alternates: { canonical: '/guias' },
}

export default function Guias() {
  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <span>Guías</span>
      </nav>
      <section className="seccion">
        <div className="contenedor">
          <h1>Guías del sector oriente</h1>
          <p className="intro-seccion">Respuestas con fuentes a lo que más nos preguntan antes de comprar o vender.</p>
          <div className="guias">
            {GUIAS.map((g) => (
              <Link key={g.slug} href={`/guias/${g.slug}`} className="guia">
                <b>{g.titulo}</b>
                <span>{g.resumen}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url },
            { '@type': 'ListItem', position: 2, name: 'Guías', item: `${SITIO.url}/guias` },
          ],
        }}
      />
      <Faq items={FAQ_CYM.slice(2, 7)} titulo="Preguntas frecuentes sobre CyM Propiedades" />
    </>
  )
}
