import SitioOficial from '@/components/SitioOficial'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Faq from '@/components/Faq'
import FormularioContacto from '@/components/FormularioContacto'
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
  const indice: { id: string; texto: string }[] = []
  const html = g.html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m: string, t: string) => {
    const id = 's' + (indice.length + 1)
    indice.push({ id, texto: t.replace(/<[^>]+>/g, '') })
    return `<h2 id="${id}">${t}</h2>`
  })
  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <Link href="/guias">Guías</Link> / <span>{g.titulo}</span>
      </nav>
      <article className="seccion">
        <div className="contenedor guia-cab">
          <p className="sobretitulo">Guía · CyM Propiedades</p>
          <h1>{g.titulo}</h1>
          {g.descripcion && <p className="guia-bajada">{g.descripcion}</p>}
        </div>
        <div className="contenedor guia-grid">
          {indice.length > 2 && (
            <aside className="guia-indice" aria-label="Contenido de la guía">
              <p>En esta guía</p>
              <ol>
                {indice.map((h) => (
                  <li key={h.id}><a href={`#${h.id}`}>{h.texto}</a></li>
                ))}
              </ol>
            </aside>
          )}
          <div className="articulo guia-cuerpo" dangerouslySetInnerHTML={{ __html: html }} />
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
      <SitioOficial />
    </>
  )
}
