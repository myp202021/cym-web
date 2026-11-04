import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Faq from '@/components/Faq'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import JsonLd from '@/components/JsonLd'
import { GUIAS, guia } from '@/lib/guias'
import { SITIO } from '@/lib/sitio'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = guia((await params).slug)
  if (!g) return {}
  const titulo = `${g.titulo} | CyM Propiedades`
  return { title: titulo, description: g.descripcion, alternates: { canonical: `/guias/${g.slug}` }, openGraph: { title: titulo, description: g.descripcion, url: `/guias/${g.slug}`, type: 'article' } }
}

export default async function PaginaGuia({ params }: Props) {
  const g = guia((await params).slug)
  if (!g) notFound()
  const url = `${SITIO.url}/guias/${g.slug}`
  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <Link href="/guias">Guías</Link> / <span>{g.titulo}</span>
      </nav>
      <article className="seccion">
        <div className="contenedor articulo">
          <p className="sobretitulo">Guía · CyM Propiedades</p>
          <h1>{g.titulo}</h1>
          <div dangerouslySetInnerHTML={{ __html: g.html }} />
        </div>
      </article>
      {g.faq.length > 0 && <Faq items={g.faq} />}
      <section className="seccion gris">
        <div className="contenedor angosto">
          <h2>¿Quieres saber cómo te afecta?</h2>
          <p className="intro-seccion">Cuéntanos de tu propiedad y un corredor de la zona te responde. La tasación es sin costo.</p>
          <FormularioContacto origen={`guia-${g.slug}`} />
        </div>
      </section>
      <WhatsAppFlotante />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Article', headline: g.titulo, description: g.descripcion, url, inLanguage: 'es-CL', author: { '@id': `${SITIO.url}/#cym` }, publisher: { '@id': `${SITIO.url}/#cym` } },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url },
                { '@type': 'ListItem', position: 2, name: 'Guías', item: `${SITIO.url}/guias` },
                { '@type': 'ListItem', position: 3, name: g.titulo, item: url },
              ],
            },
          ],
        }}
      />
    </>
  )
}
