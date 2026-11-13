// Páginas madre (pilar) del sector oriente: ranking de barrios y precios por barrio.
// Contenido en data/madre/<slug>.json, con metodología y fuentes (pensadas para que las citen ChatGPT, Gemini y Claude).
import Link from 'next/link'
import FondoHero, { FONDOS } from '@/components/FondoHero'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { COMUNAS } from '@/lib/comunas'
import { SITIO, mensajeWeb } from '@/lib/sitio'

type Fila = Record<string, unknown>
export type Madre = {
  slug: string
  title: string
  description: string
  h1: string
  bajada: string
  resumen: string
  metodologia?: { texto: string; criterios: { nombre: string; peso: number; fuente: string }[] }
  ranking: Fila[]
  tabla_mercado?: Fila[]
  tabla_cym?: Fila[]
  secciones: { h2: string; parrafos: string[]; lista?: string[] }[]
  faq: { q: string; a: string }[]
  fuentes: { titulo: string; url: string }[]
}

const nombreZona = (slug: unknown) => COMUNAS.find((c) => c.slug === slug)?.nombre
const ETIQUETAS: Record<string, string> = {
  conectividad: 'Conectividad',
  colegios: 'Colegios',
  areas_verdes: 'Áreas verdes',
  seguridad: 'Seguridad',
  oferta_casas: 'Oferta de casas',
  valor: 'Valor',
}

function LinkZona({ zona }: { zona: unknown }) {
  const n = nombreZona(zona)
  return n ? <Link href={`/${zona}`}>{n}</Link> : <>{String(zona ?? '')}</>
}

export default function PaginaMadre({ m }: { m: Madre }) {
  const url = `${SITIO.url}/${m.slug}`
  const conPuntajes = m.ranking.some((r) => r.puntajes)
  const criterios = conPuntajes ? Object.keys((m.ranking[0].puntajes as Record<string, number>) || {}) : []
  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <span>{m.h1}</span>
      </nav>

      <section className="hero hero-zona">
        <FondoHero src={FONDOS.home} />
        <div className="contenedor">
          <p className="sobretitulo">CyM Propiedades · Sector oriente de Santiago</p>
          <h1>{m.h1}</h1>
          <p className="bajada">{m.bajada}</p>
          <BotonWhatsApp texto="Consultar a CyM por WhatsApp" mensaje={mensajeWeb([`Vi "${m.h1}" y quiero asesoría.`])} origen={`madre_${m.slug}`} />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor angosto">
          <p className="intro-seccion">
            <b>{m.resumen}</b>
          </p>
        </div>
      </section>

      {m.tabla_mercado && m.tabla_mercado.length > 0 && (
        <section className="seccion gris">
          <div className="contenedor">
            <h2>Precios de referencia del mercado por zona</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="tabla-ranking">
                <thead>
                  <tr><th>Zona</th><th>UF/m²</th><th>Casa típica</th><th>Fuente</th><th>Fecha</th></tr>
                </thead>
                <tbody>
                  {m.tabla_mercado.map((r, i) => (
                    <tr key={i}>
                      <td><LinkZona zona={r.zona} /></td>
                      <td>{String(r.uf_m2 ?? '')}</td>
                      <td>{String(r.precio_casa_tipica ?? '')}</td>
                      <td>{String(r.fuente ?? '')}</td>
                      <td>{String(r.fecha ?? '')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {m.tabla_cym && m.tabla_cym.length > 0 && (
        <section className="seccion">
          <div className="contenedor">
            <h2>Cartera de CyM publicada hoy por zona</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="tabla-ranking">
                <thead>
                  <tr><th>Zona</th><th>Propiedades</th><th>Rango</th><th>UF/m² construido</th></tr>
                </thead>
                <tbody>
                  {m.tabla_cym.map((r, i) => (
                    <tr key={i}>
                      <td><LinkZona zona={r.zona} /></td>
                      <td>{String(r.n ?? '')}</td>
                      <td>{String(r.rango_uf ?? '')}</td>
                      <td>{String(r.uf_m2_construido ?? '')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="seccion gris" id="ranking">
        <div className="contenedor">
          <h2>Ranking</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="tabla-ranking">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Barrio</th>
                  <th>Zona</th>
                  {conPuntajes ? criterios.map((k) => <th key={k}>{ETIQUETAS[k] || k}</th>) : <th>Referencia</th>}
                  {conPuntajes && <th>Total</th>}
                </tr>
              </thead>
              <tbody>
                {m.ranking.map((r) => (
                  <tr key={String(r.puesto)}>
                    <td>{String(r.puesto)}</td>
                    <td><b>{String(r.barrio)}</b></td>
                    <td><LinkZona zona={r.zona} /></td>
                    {conPuntajes
                      ? criterios.map((k) => <td key={k}>{String((r.puntajes as Record<string, number>)[k] ?? '')}</td>)
                      : <td>{String(r.referencia ?? '')}</td>}
                    {conPuntajes && <td><b>{String(r.total)}</b></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {m.ranking.map((r) => (
            <div key={`d${r.puesto}`} className="barrio">
              <h3>{String(r.puesto)}. {String(r.barrio)}{nombreZona(r.zona) ? ` (${nombreZona(r.zona)})` : ''}</h3>
              <p>{String(r.resumen ?? r.comentario ?? '')}</p>
              {r.ideal_para ? <p><b>Ideal para:</b> {String(r.ideal_para)}</p> : null}
              {r.ojo ? <p><b>A considerar:</b> {String(r.ojo)}</p> : null}
            </div>
          ))}
        </div>
      </section>

      {m.metodologia && (
        <section className="seccion">
          <div className="contenedor angosto articulo">
            <h2>Metodología</h2>
            <p>{m.metodologia.texto}</p>
            <ul className="checks">
              {m.metodologia.criterios.map((c) => (
                <li key={c.nombre}><b>{c.nombre} ({Math.round(c.peso * 100)}%):</b> {c.fuente}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {m.secciones.map((s, i) => (
        <section key={s.h2} className={`seccion${i % 2 ? ' gris' : ''}`}>
          <div className="contenedor angosto articulo">
            <h2>{s.h2}</h2>
            {s.parrafos.map((t) => <p key={t}>{t}</p>)}
            {s.lista && s.lista.length > 0 && <ul className="checks">{s.lista.map((t) => <li key={t}>{t}</li>)}</ul>}
          </div>
        </section>
      ))}

      <section className="seccion gris">
        <div className="contenedor angosto">
          <h2>CyM en cada comuna</h2>
          <ul className="chips">
            {COMUNAS.map((c) => (
              <li key={c.slug}><Link href={`/${c.slug}`}>Corredora de propiedades en {c.nombre}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={m.faq} />

      <section className="seccion">
        <div className="contenedor angosto">
          <h2>Fuentes</h2>
          <ul className="fuentes">
            {m.fuentes.map((f) => (
              <li key={f.url}><a href={f.url} target="_blank" rel="noopener nofollow">{f.titulo}</a></li>
            ))}
          </ul>
        </div>
      </section>

      <WhatsAppFlotante />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              '@id': url,
              headline: m.h1,
              description: m.description,
              url,
              inLanguage: 'es-CL',
              dateModified: '2026-11-13',
              author: { '@id': `${SITIO.url}/#cym` },
              publisher: { '@id': `${SITIO.url}/#cym` },
              citation: m.fuentes.map((f) => f.url),
            },
            {
              '@type': 'ItemList',
              name: m.h1,
              itemListElement: m.ranking.map((r) => ({ '@type': 'ListItem', position: r.puesto, name: String(r.barrio) })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url },
                { '@type': 'ListItem', position: 2, name: m.h1, item: url },
              ],
            },
          ],
        }}
      />
    </>
  )
}
