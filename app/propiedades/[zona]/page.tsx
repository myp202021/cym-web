import { notFound } from 'next/navigation'
import Link from 'next/link'
import FondoHero, { fotoPortada } from '@/components/FondoHero'
import type { Metadata } from 'next'
import TarjetaPropiedad from '@/components/TarjetaPropiedad'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { ZONAS, zona as buscarZona } from '@/lib/zonas'
import { porZona, resumen, formatoUF, titulo } from '@/lib/propiedades'
import { SITIO, mensajeWeb } from '@/lib/sitio'

type Props = { params: Promise<{ zona: string }> }

export function generateStaticParams() {
  return ZONAS.map((z) => ({ zona: z.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const z = buscarZona((await params).zona)
  if (!z) return {}
  return {
    title: z.title,
    description: z.description,
    alternates: { canonical: `/propiedades/${z.slug}` },
    openGraph: { title: z.title, description: z.description, url: `/propiedades/${z.slug}`, images: porZona(z.slug)[0]?.fotos.slice(0, 1) },
  }
}

export default async function PaginaZona({ params }: Props) {
  const z = buscarZona((await params).zona)
  if (!z) notFound()
  const lista = porZona(z.slug)
  const r = resumen(lista)
  const sectores = [...new Set(lista.map((p) => p.sector).filter(Boolean))]
  const url = `${SITIO.url}/propiedades/${z.slug}`

  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <span>Propiedades en {z.nombre}</span>
      </nav>

      <section className="hero hero-zona">
        <FondoHero src={[...lista].reverse().find((p) => p.tipo === 'Casa')?.fotos[0] || fotoPortada()} />
        <div className="contenedor">
          <p className="sobretitulo">
            {z.nombre === z.comuna ? 'Comuna de' : 'Sector de'} {z.nombre === z.comuna ? z.comuna : `${z.nombre}, ${z.comuna}`}
          </p>
          <h1>{z.h1}</h1>
          <p className="bajada">{z.bajada}</p>
          <ul className="cifras">
            <li>
              <b>{r.total}</b> propiedades publicadas
            </li>
            {r.minUF && r.maxUF && (
              <li>
                <b>
                  {formatoUF(r.minUF)} – {formatoUF(r.maxUF)}
                </b>{' '}
                rango de precios
              </li>
            )}
            {r.minDorm && r.maxDorm && (
              <li>
                <b>
                  {r.minDorm === r.maxDorm ? r.minDorm : `${r.minDorm} a ${r.maxDorm}`}
                </b>{' '}
                dormitorios
              </li>
            )}
          </ul>
          <BotonWhatsApp texto={`Cotizar en ${z.nombre} por WhatsApp`} mensaje={mensajeWeb([`Quiero cotizar propiedades en ${z.nombre}.`])} origen={`zona_${z.slug}`} />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>Propiedades en venta en {z.nombre}</h2>
          <p className="intro-seccion">
            {r.casas} casas{r.deptos ? ` y ${r.deptos} departamentos` : ''}
            {sectores.length ? `, incluidas propiedades en ${sectores.join(', ')}` : ''}. Ordenadas de menor a mayor precio.
          </p>
          <div className="grilla">
            {lista.map((p) => (
              <TarjetaPropiedad key={p.codigo} p={p} nombreZona={z.nombre} />
            ))}
          </div>
        </div>
      </section>

      <section className="seccion gris">
        <div className="contenedor dos-col">
          <div>
            <h2>Vivir en {z.nombre}</h2>
            {z.intro.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <h3>Por qué comprar en {z.nombre} con CyM</h3>
            <ul className="checks">
              {z.porQue.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Barrios y sectores de {z.nombre}</h2>
            {z.barrios.map((b) => (
              <div key={b.nombre} className="barrio">
                <h3>{b.nombre}</h3>
                <p>{b.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq items={z.faq} titulo={`Preguntas frecuentes sobre propiedades en ${z.nombre}`} />

      <section className="seccion gris" id="contacto">
        <div className="contenedor angosto">
          <h2>Cotiza propiedades en {z.nombre}</h2>
          <p className="intro-seccion">Déjanos tus datos y el corredor de {z.nombre} te contactará.</p>
          <FormularioContacto origen={`zona_${z.slug}`} zona={z.nombre} />
        </div>
      </section>

      <WhatsAppFlotante zona={z.nombre} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': url,
              url,
              name: z.title,
              description: z.description,
              about: { '@type': 'Place', name: `${z.nombre}, ${z.comuna}, Santiago, Chile` },
              provider: { '@id': `${SITIO.url}/#cym` },
            },
            {
              '@type': 'ItemList',
              name: `Propiedades en venta en ${z.nombre}`,
              numberOfItems: lista.length,
              itemListElement: lista.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITIO.url}/propiedades/${z.slug}/${p.codigo}`,
                name: titulo(p),
              })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url },
                { '@type': 'ListItem', position: 2, name: `Propiedades en ${z.nombre}`, item: url },
              ],
            },
          ],
        }}
      />
    </>
  )
}
