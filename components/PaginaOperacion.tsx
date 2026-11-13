// Página por comuna × operación (corredoras, vender casa/departamento, tasación, comprar casa) y madre de corredoras.
import Link from 'next/link'
import FondoHero, { FONDOS } from '@/components/FondoHero'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Alianzas from '@/components/Alianzas'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { COMUNAS } from '@/lib/comunas'
import { PAGINAS, TIPOS, type Pagina } from '@/lib/paginas'
import { SITIO, mensajeWeb, WHATSAPP_ZONA } from '@/lib/sitio'

export default function PaginaOperacion({ p }: { p: Pagina }) {
  const c = COMUNAS.find((x) => x.slug === p.comuna)
  const url = `${SITIO.url}/${p.slug}`
  const numero = c ? WHATSAPP_ZONA[c.nombre] : undefined
  const propietario = p.tipo !== 'comprar-casa'
  const hermanas = PAGINAS.filter((x) => x.slug !== p.slug && (x.comuna === p.comuna || (!c && x.tipo === 'corredoras')))
  const fondo = c ? FONDOS[c.slug as keyof typeof FONDOS] : FONDOS.home
  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link>
        {c && (
          <>
            {' '}/ <Link href={`/${c.slug}`}>CyM en {c.nombre}</Link>
          </>
        )}{' '}
        / <span>{p.h1}</span>
      </nav>

      <section className="hero hero-zona">
        <FondoHero src={fondo} />
        <div className="contenedor">
          <p className="sobretitulo">CyM Propiedades{c ? ` · ${c.nombre === c.comuna ? c.comuna : `${c.nombre}, ${c.comuna}`}` : ' · Sector oriente'}</p>
          <h1>{p.h1}</h1>
          <p className="bajada">{p.bajada}</p>
          <div className="acciones">
            <BotonWhatsApp
              texto={propietario ? 'Tasar sin costo por WhatsApp' : 'Hablar con CyM por WhatsApp'}
              mensaje={mensajeWeb([`${TIPOS[p.tipo]}${c ? ` en ${c.nombre}` : ''}: quiero asesoría.`])}
              origen={`pagina_${p.slug}`}
              numero={numero}
            />
            <Link href="#contacto" className="btn btn-claro">
              Dejar mis datos
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor angosto">
          <p className="intro-seccion">
            <b>{p.resumen}</b>
          </p>
        </div>
      </section>

      {p.secciones.map((s, i) => (
        <section key={s.h2} className={`seccion${i % 2 ? '' : ' gris'}`}>
          <div className="contenedor angosto articulo">
            <h2>{s.h2}</h2>
            {s.parrafos.map((t) => <p key={t}>{t}</p>)}
            {s.lista && s.lista.length > 0 && <ul className="checks">{s.lista.map((t) => <li key={t}>{t}</li>)}</ul>}
          </div>
        </section>
      ))}

      {p.tabla && p.tabla.filas.length > 0 && (
        <section className="seccion">
          <div className="contenedor">
            <h2>{p.tabla.titulo}</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="tabla-ranking">
                <thead>
                  <tr>{p.tabla.columnas.map((col) => <th key={col}>{col}</th>)}</tr>
                </thead>
                <tbody>
                  {p.tabla.filas.map((f, i) => (
                    <tr key={i}>{f.map((cel, j) => <td key={j}>{cel}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <Alianzas />

      <Faq items={p.faq} />

      <section className="seccion gris" id="contacto">
        <div className="contenedor angosto">
          <h2>{propietario ? 'Pide tu tasación sin costo' : 'Cuéntanos qué buscas'}</h2>
          <p className="intro-seccion">Déjanos tus datos y el equipo de CyM{c ? ` en ${c.nombre}` : ''} te contactará por WhatsApp.</p>
          <FormularioContacto origen={`pagina_${p.slug}`} zona={c?.nombre} propietario={propietario} />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor angosto">
          {c && (
            <p>
              <Link href={`/${c.slug}`} className="btn btn-borde">Corredora de propiedades en {c.nombre}</Link>{' '}
              <Link href={`/propiedades/${c.slug}`} className="btn btn-borde">Propiedades en venta en {c.nombre}</Link>
            </p>
          )}
          {hermanas.length > 0 && (
            <>
              <h2>Sigue leyendo</h2>
              <ul className="chips">
                {hermanas.map((h) => {
                  const hc = COMUNAS.find((x) => x.slug === h.comuna)
                  return (
                    <li key={h.slug}>
                      <Link href={`/${h.slug}`}>{TIPOS[h.tipo]}{hc ? ` en ${hc.nombre}` : ' en el sector oriente'}</Link>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
          <h2>Fuentes</h2>
          <ul className="fuentes">
            {p.fuentes.map((f) => (
              <li key={f.url}><a href={f.url} target="_blank" rel="noopener nofollow">{f.titulo}</a></li>
            ))}
          </ul>
        </div>
      </section>

      <WhatsAppFlotante zona={c?.nombre} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              '@id': url,
              headline: p.h1,
              description: p.description,
              url,
              inLanguage: 'es-CL',
              dateModified: '2026-11-13',
              author: { '@id': `${SITIO.url}/#cym` },
              publisher: { '@id': `${SITIO.url}/#cym` },
              about: c ? { '@type': 'Place', name: `${c.nombre}, ${c.comuna}, Santiago, Chile` } : { '@type': 'Place', name: 'Sector oriente de Santiago, Chile' },
              citation: p.fuentes.map((f) => f.url),
            },
            {
              '@type': 'Service',
              name: `${TIPOS[p.tipo]}${c ? ` en ${c.nombre}` : ' en el sector oriente de Santiago'}`,
              provider: { '@id': `${SITIO.url}/#cym` },
              areaServed: c ? `${c.nombre}, ${c.comuna}` : COMUNAS.map((x) => x.nombre).join(', '),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url },
                ...(c ? [{ '@type': 'ListItem', position: 2, name: `CyM en ${c.nombre}`, item: `${SITIO.url}/${c.slug}` }] : []),
                { '@type': 'ListItem', position: c ? 3 : 2, name: p.h1, item: url },
              ],
            },
          ],
        }}
      />
    </>
  )
}
