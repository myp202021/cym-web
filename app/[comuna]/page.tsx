import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import FondoHero, { FONDOS } from '@/components/FondoHero'
import TarjetaPropiedad from '@/components/TarjetaPropiedad'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Alianzas from '@/components/Alianzas'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { COMUNAS, comuna as buscar } from '@/lib/comunas'
import { porZona } from '@/lib/propiedades'
import { SITIO, mensajeWeb, WHATSAPP_ZONA } from '@/lib/sitio'
import { PROCESO } from '@/app/page'

type Props = { params: Promise<{ comuna: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return COMUNAS.map((c) => ({ comuna: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = buscar((await params).comuna)
  if (!c) return {}
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/${c.slug}` },
    openGraph: { title: c.title, description: c.description, url: `/${c.slug}`, type: 'website' },
  }
}

export default async function LandingComuna({ params }: Props) {
  const c = buscar((await params).comuna)
  if (!c) notFound()
  const url = `${SITIO.url}/${c.slug}`
  const numero = WHATSAPP_ZONA[c.nombre]
  const propiedades = porZona(c.slug).slice(0, 6)
  const lugar = c.nombre === c.comuna ? c.comuna : `${c.nombre}, ${c.comuna}`
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent(`${lugar}, Santiago, Chile`)}&ll=${c.mapa.lat},${c.mapa.lng}&z=${c.mapa.zoom}&output=embed`

  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <span>Corredora de propiedades en {c.nombre}</span>
      </nav>

      <section className="hero hero-zona">
        <FondoHero src={FONDOS[c.slug as keyof typeof FONDOS]} />
        <div className="contenedor">
          <p className="sobretitulo">CyM Propiedades · {lugar}</p>
          <h1>{c.h1}</h1>
          <p className="bajada">{c.bajada}</p>
          <div className="acciones">
            <BotonWhatsApp
              texto={`Hablar con CyM en ${c.nombre}`}
              mensaje={mensajeWeb([`Quiero información de CyM en ${c.nombre}.`])}
              origen={`comuna_${c.slug}`}
              numero={numero}
            />
            <Link href="#contacto" className="btn btn-claro">
              Tasar o vender mi propiedad
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor angosto">
          <p className="intro-seccion">
            <b>{c.resumen}</b>
          </p>
        </div>
      </section>

      <section className="seccion gris">
        <div className="contenedor">
          <h2>Servicios de CyM en {c.nombre}</h2>
          <div className="servicios">
            {c.servicios.map((s) => (
              <div key={s.nombre}>
                <h3>{s.nombre}</h3>
                <p>{s.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {propiedades.length > 0 && (
        <section className="seccion">
          <div className="contenedor">
            <h2>Propiedades de CyM en venta en {c.nombre}</h2>
            <div className="grilla">
              {propiedades.map((p) => (
                <TarjetaPropiedad key={p.codigo} p={p} nombreZona={c.nombre} />
              ))}
            </div>
            <p className="centro">
              <Link href={`/propiedades/${c.slug}`} className="btn btn-borde">
                Ver todas las propiedades en {c.nombre}
              </Link>
            </p>
          </div>
        </section>
      )}

      {c.secciones.map((s, i) => (
        <section key={s.h2} className={`seccion${i % 2 ? '' : ' gris'}`}>
          <div className="contenedor angosto articulo">
            <h2>{s.h2}</h2>
            {s.parrafos.map((t) => (
              <p key={t}>{t}</p>
            ))}
            {s.lista && s.lista.length > 0 && (
              <ul className="checks">
                {s.lista.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section className="seccion">
        <div className="contenedor">
          <h2>Cómo vendemos tu propiedad en {c.nombre}</h2>
          <ol className="proceso">
            {PROCESO.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="seccion gris">
        <div className="contenedor dos-col">
          <div>
            <h2>Barrios y sectores de {c.nombre}</h2>
            {c.barrios.map((b) => (
              <div key={b.nombre} className="barrio">
                <h3>{b.nombre}</h3>
                <p>{b.texto}</p>
              </div>
            ))}
          </div>
          <div>
            <h2>Mapa de {c.nombre}</h2>
            <iframe
              title={`Mapa de ${lugar}`}
              src={mapa}
              width="100%"
              height="460"
              style={{ border: 0, borderRadius: 8 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="nota">Oficina CyM: {SITIO.direccion}, {SITIO.comuna}.</p>
          </div>
        </div>
      </section>

      <section className="seccion" id="ranking">
        <div className="contenedor">
          <h2>{c.ranking.titulo}</h2>
          <p className="intro-seccion">{c.ranking.metodologia}</p>
          <div style={{ overflowX: 'auto' }}>
            <table className="tabla-ranking">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Barrio</th>
                  <th>Fortalezas</th>
                  <th>A considerar</th>
                  <th>Ideal para</th>
                </tr>
              </thead>
              <tbody>
                {c.ranking.items.map((r) => (
                  <tr key={r.puesto}>
                    <td>{r.puesto}</td>
                    <td>
                      <b>{r.barrio}</b>
                    </td>
                    <td>{r.fortalezas}</td>
                    <td>{r.ojo}</td>
                    <td>{r.ideal_para}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="nota">
            Ranking del sector oriente completo: <Link href="/ranking-barrios-sector-oriente">mejores barrios del sector oriente</Link> ·{' '}
            <Link href="/precios-casas-sector-oriente">precios de casas por barrio</Link>.
          </p>
        </div>
      </section>

      <Alianzas />

      <section className="seccion gris">
        <div className="contenedor dos-col">
          <div className="caja-propietarios">
            <p className="sobretitulo">Propietarios</p>
            <h2>¿Tienes una propiedad en {c.nombre}?</h2>
            <p>Te entregamos una tasación sin costo con comparables reales de {c.nombre} y una estrategia de venta para tu propiedad.</p>
            <div className="acciones">
              <Link href="/vende-tu-propiedad" className="btn">
                Quiero vender
              </Link>
              <Link href="/tasacion-propiedades" className="btn btn-borde">
                Tasar mi propiedad
              </Link>
            </div>
          </div>
          <div className="caja-propietarios">
            <p className="sobretitulo">Compradores</p>
            <h2>¿Buscas casa en {c.nombre}?</h2>
            <p>Revisa las propiedades publicadas o cuéntanos qué buscas y el equipo de CyM en {c.nombre} te contactará.</p>
            <div className="acciones">
              <Link href={`/propiedades/${c.slug}`} className="btn">
                Ver propiedades
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Faq items={c.faq} titulo={`Preguntas frecuentes: corredora de propiedades en ${c.nombre}`} />

      <section className="seccion gris" id="contacto">
        <div className="contenedor angosto">
          <h2>Habla con CyM en {c.nombre}</h2>
          <p className="intro-seccion">Déjanos tus datos y el equipo de CyM en {c.nombre} te contactará por WhatsApp.</p>
          <FormularioContacto origen={`comuna_${c.slug}`} zona={c.nombre} />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor angosto">
          <h2>Fuentes</h2>
          <ul className="fuentes">
            {c.fuentes.map((f) => (
              <li key={f.url}>
                <a href={f.url} target="_blank" rel="noopener nofollow">
                  {f.titulo}
                </a>
              </li>
            ))}
          </ul>
          <h2>CyM en otras comunas</h2>
          <ul className="chips">
            {COMUNAS.filter((o) => o.slug !== c.slug).map((o) => (
              <li key={o.slug}>
                <Link href={`/${o.slug}`}>Corredora de propiedades en {o.nombre}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhatsAppFlotante zona={c.nombre} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'RealEstateAgent',
              '@id': `${url}#cym`,
              name: `CyM Propiedades ${c.nombre}`,
              url,
              description: c.description,
              telephone: numero ? `+${numero}` : SITIO.telefono,
              email: SITIO.email,
              image: `${SITIO.url}/og-cym.png`,
              logo: `${SITIO.url}/logo-cym.png`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: SITIO.direccion,
                addressLocality: SITIO.comuna,
                addressRegion: SITIO.region,
                addressCountry: 'CL',
              },
              areaServed: { '@type': 'Place', name: `${lugar}, Santiago, Chile`, geo: { '@type': 'GeoCoordinates', latitude: c.mapa.lat, longitude: c.mapa.lng } },
              parentOrganization: { '@id': `${SITIO.url}/#cym` },
              makesOffer: c.servicios.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${s.nombre} en ${c.nombre}`, description: s.texto } })),
            },
            {
              '@type': 'WebPage',
              '@id': url,
              url,
              name: c.title,
              description: c.description,
              inLanguage: 'es-CL',
              about: { '@id': `${url}#cym` },
              citation: c.fuentes.map((f) => f.url),
            },
            {
              '@type': 'ItemList',
              name: c.ranking.titulo,
              itemListElement: c.ranking.items.map((r) => ({ '@type': 'ListItem', position: r.puesto, name: r.barrio, description: r.fortalezas })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url },
                { '@type': 'ListItem', position: 2, name: `Corredora de propiedades en ${c.nombre}`, item: url },
              ],
            },
          ],
        }}
      />
    </>
  )
}
