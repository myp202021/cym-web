import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { PROPIEDADES, comunasCatalogo, porZona, titulo, formatoUF, resumen, zonaOComuna } from '@/lib/propiedades'
import { SITIO } from '@/lib/sitio'

// Todas las propiedades publicadas por CyM, ordenadas por comuna (24 nov 2026).
export const metadata: Metadata = {
  title: 'Propiedades en venta por comuna | CyM Propiedades',
  description: `Las ${PROPIEDADES.length} propiedades en venta de CyM Propiedades, ordenadas por comuna: Vitacura, La Dehesa, Las Condes, La Reina y más. Precio en UF y ficha de cada una.`,
  alternates: { canonical: '/propiedades' },
}

export default function PaginaPropiedades() {
  const comunas = comunasCatalogo().map((c) => ({ ...c, nombre: zonaOComuna(c.slug)?.nombre || c.comuna, lista: porZona(c.slug) }))
  const url = `${SITIO.url}/propiedades`
  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <span>Propiedades</span>
      </nav>
      <section className="seccion">
        <div className="contenedor">
          <h1>Propiedades en venta por comuna</h1>
          <p className="intro-seccion">
            {PROPIEDADES.length} propiedades publicadas por CyM en {comunas.length} comunas y sectores. Cada una enlaza a su ficha con fotos, superficie y precio.
          </p>
          <ul className="chips">
            {comunas.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`}>
                  {c.nombre} ({c.lista.length})
                </a>
              </li>
            ))}
          </ul>
          {comunas.map((c) => {
            const r = resumen(c.lista)
            return (
              <div key={c.slug} id={c.slug} className="bloque-comuna">
                <h2>
                  <Link href={`/propiedades/${c.slug}`}>Propiedades en venta en {c.nombre}</Link>
                </h2>
                <p className="nota">
                  {r.total} {r.total === 1 ? 'propiedad' : 'propiedades'}
                  {r.minUF && r.maxUF ? ` · ${r.minUF === r.maxUF ? formatoUF(r.minUF) : `${formatoUF(r.minUF)} – ${formatoUF(r.maxUF)}`}` : ''}
                </p>
                <ul className="lista-propiedades">
                  {c.lista.map((p) => (
                    <li key={p.codigo}>
                      <Link href={`/propiedades/${p.zona}/${p.codigo}`}>
                        {p.tipo} · {titulo(p)}
                      </Link>{' '}
                      <span>
                        {p.precio}
                        {p.dormitorios ? ` · ${p.dormitorios} dorm.` : ''}
                        {p.m2_construidos ? ` · ${p.m2_construidos} m²` : ''} · Código {p.codigo}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'CollectionPage', '@id': url, url, name: 'Propiedades en venta por comuna', provider: { '@id': `${SITIO.url}/#cym` } },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url },
                { '@type': 'ListItem', position: 2, name: 'Propiedades', item: url },
              ],
            },
          ],
        }}
      />
    </>
  )
}
