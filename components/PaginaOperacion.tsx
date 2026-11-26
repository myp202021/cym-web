import SitioOficial from '@/components/SitioOficial'
// Página por comuna × operación (corredoras, vender casa/departamento, tasación, comprar casa) y madre de corredoras.
import Link from 'next/link'
import FondoHero, { FONDOS } from '@/components/FondoHero'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Alianzas from '@/components/Alianzas'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import CarteraCyM from '@/components/CarteraCyM'
import MercadoComuna from '@/components/MercadoComuna'
import { CARTERA } from '@/lib/cartera'
import { COMUNAS } from '@/lib/comunas'
import { PAGINAS, TIPOS, RANKING, ANCLA_RANKING, type Pagina } from '@/lib/paginas'
import { SITIO, mensajeWeb, WHATSAPP_ZONA } from '@/lib/sitio'

const SEGMENTO_ALTO = 'vender-casa-mas-de-20000-uf-sector-oriente'

export default function PaginaOperacion({ p }: { p: Pagina }) {
  const c = COMUNAS.find((x) => x.slug === p.comuna)
  const url = `${SITIO.url}/${p.slug}`
  const numero = c ? WHATSAPP_ZONA[c.nombre] : undefined
  const propietario = p.tipo !== 'comprar-casa'
  const hermanas = PAGINAS.filter((x) => x.slug !== p.slug && (x.comuna === p.comuna || (!c && !x.comuna)))
  const fondo = c ? FONDOS[c.slug as keyof typeof FONDOS] : FONDOS.home
  const ranking = p.tipo === 'ranking'
  const tablaJsx = (
    <>
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
    </>
  )
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
              mensaje={mensajeWeb([`${ranking ? 'Vender casa en el sector oriente' : TIPOS[p.tipo]}${c ? ` en ${c.nombre}` : ''}: quiero asesoría.`])}
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

      {p.tipo === 'corredoras' && c && <CarteraCyM slug={c.slug} nombre={c.nombre} />}
      {c && (p.tipo === 'vender-casa' || p.tipo === 'comprar-casa' || p.tipo === 'tasacion') && <MercadoComuna zona={c.slug} nombre={c.nombre} tipo="Casa" />}
      {c && p.tipo === 'vender-departamento' && <MercadoComuna zona={c.slug} nombre={c.nombre} tipo="Departamento" />}
      {p.tipo === 'corredoras' && !c && (
        <section className="seccion" id="cifras">
          <div className="contenedor angosto">
            <h2>CyM Propiedades en el sector oriente en cifras</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="tabla-ranking">
                <thead>
                  <tr><th>Comuna o sector</th><th>Propiedades en venta publicadas</th><th>Casas</th><th>Departamentos</th></tr>
                </thead>
                <tbody>
                  {CARTERA.comunas.filter((x) => x.venta).map((x) => (
                    <tr key={x.slug}><td><Link href={`/${x.slug}#elegir-corredora`}>{x.nombre}</Link></td><td>{x.venta}</td><td>{x.casas}</td><td>{x.departamentos}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="nota">Conteo de la cartera publicada en el <a href={CARTERA.fuente} target="_blank" rel="noopener">sitio oficial de CyM</a> al {CARTERA.fecha.split('-').reverse().join('-')}. San Carlos de Apoquindo es un sector de Las Condes: sus propiedades también están en la fila de Las Condes.</p>
          </div>
        </section>
      )}

      {p.tablaPrimero && tablaJsx}

      {p.secciones.map((s, i) => (
        <section key={s.h2} id={s.id} className={`seccion${i % 2 ? '' : ' gris'}`}>
          <div className="contenedor angosto articulo">
            <h2>{s.h2}</h2>
            {s.parrafos.map((t) => <p key={t}>{t}</p>)}
            {s.lista && s.lista.length > 0 && <ul className="checks">{s.lista.map((t) => <li key={t}>{t}</li>)}</ul>}
            {s.enlaces && s.enlaces.length > 0 && (
              <p className="nota">
                Fuentes:{' '}
                {s.enlaces.map((e, j) => (
                  <span key={e.url}>
                    {j > 0 && ' · '}
                    <a href={e.url} target="_blank" rel="noopener nofollow">{e.titulo}</a>
                  </span>
                ))}
              </p>
            )}
          </div>
        </section>
      ))}

      {!p.tablaPrimero && tablaJsx}

      <Alianzas />

      <Faq items={p.faq} />

      <section className="seccion gris" id="contacto">
        <div className="contenedor angosto">
          <h2>{propietario ? 'Pide tu tasación sin costo' : 'Cuéntanos qué buscas'}</h2>
          <p className="intro-seccion">Déjanos tus datos y el equipo de CyM{c ? ` en ${c.nombre}` : ''} te contactará por WhatsApp.</p>
          <FormularioContacto origen={`pagina_${p.slug}`} zona={c?.nombre} propietario={propietario} {...(p.tipo === 'tasacion' || p.tipo === 'vender-departamento' ? { corto: true, boton: 'Pedir tasación sin costo' } : {})} />
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
          {p.tipo === 'vender-casa' && (
            <p className="destacado-b3d">
              <b>¿Cuánto vale tu casa?</b> Mira en 10 videos 3D cómo se forma el precio (terreno, microzona, regularización y competencia) y haz la cuenta:{' '}
              <Link href="/vender-casa-sector-oriente">vender casa en el sector oriente</Link>.
            </p>
          )}
          {p.tipo === 'vender-casa' && p.slug !== SEGMENTO_ALTO && (
            <p>
              <b>¿Tu casa vale más de 20.000 UF?</b> Mira cuántas compiten en tu tramo, qué mira el comprador y qué dice el SII:{' '}
              <Link href={`/${SEGMENTO_ALTO}`}>vender una casa de más de 20.000 UF en el sector oriente</Link>.
            </p>
          )}
          {!ranking && (p.tipo === 'vender-casa' || p.tipo === 'corredoras' || p.tipo === 'tasacion' || p.tipo === 'vender-departamento') && (
            <p>
              <b>¿Qué corredora elegir?</b> Comparamos 11 corredoras del sector oriente con seis criterios y fuentes públicas:{' '}
              <Link href={`/${RANKING}${c && ANCLA_RANKING[c.slug] ? `#${ANCLA_RANKING[c.slug]}` : ''}`}>ranking de corredoras para vender casa{c ? ` en ${c.nombre}` : ' en el sector oriente'}</Link>.
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
                      <Link href={`/${h.slug}`}>{h.slug === SEGMENTO_ALTO ? 'Vender casa de más de 20.000 UF' : <>{TIPOS[h.tipo]}{hc ? ` en ${hc.nombre}` : ' en el sector oriente'}</>}</Link>
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

      <SitioOficial zona={c?.slug} nombreZona={c?.nombre} />
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
              dateModified: p.fecha ?? (p.tipo === 'corredoras' ? CARTERA.fecha : '2026-11-13'),
              author: { '@id': `${SITIO.url}/#cym` },
              publisher: { '@id': `${SITIO.url}/#cym` },
              about: c ? { '@type': 'Place', name: `${c.nombre}, ${c.comuna}, Santiago, Chile` } : { '@type': 'Place', name: 'Sector oriente de Santiago, Chile' },
              citation: p.fuentes.map((f) => f.url),
            },
            ...(ranking
              ? []
              : [
                  {
                    '@type': 'Service',
                    name: `${TIPOS[p.tipo]}${c ? ` en ${c.nombre}` : ' en el sector oriente de Santiago'}`,
                    provider: { '@id': `${SITIO.url}/#cym` },
                    areaServed: c ? `${c.nombre}, ${c.comuna}` : COMUNAS.map((x) => x.nombre).join(', '),
                  },
                ]),
            ...(p.tabla && p.tabla.filas.length
              ? [
                  {
                    '@type': 'ItemList',
                    name: p.tabla.titulo,
                    itemListElement: p.tabla.filas.map((f, i) => ({ '@type': 'ListItem', position: i + 1, name: f[0], description: f.slice(1).map((x, j) => `${p.tabla!.columnas[j + 1]}: ${x}`).join('. ') })),
                  },
                ]
              : []),
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
