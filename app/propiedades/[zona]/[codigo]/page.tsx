import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import TarjetaPropiedad from '@/components/TarjetaPropiedad'
import JsonLd from '@/components/JsonLd'
import { zona as buscarZona } from '@/lib/zonas'
import { PROPIEDADES, porCodigo, porZona, titulo, uf, zonaAgente } from '@/lib/propiedades'
import { SITIO, mensajeWeb } from '@/lib/sitio'

type Props = { params: Promise<{ zona: string; codigo: string }> }

export function generateStaticParams() {
  return PROPIEDADES.map((p) => ({ zona: p.zona, codigo: p.codigo }))
}

function datosPagina(zonaSlug: string, codigo: string) {
  const p = porCodigo(codigo)
  const z = buscarZona(zonaSlug)
  if (!p || !z || p.zona !== z.slug) return null
  const lugar = p.sector ? `${p.sector}, ${p.comuna}` : p.comuna
  const title = `${p.tipo} en ${p.operacion.toLowerCase()} en ${p.sector || z.nombre}, ${p.precio} · Código ${p.codigo} | CyM`
  const description = [
    `${p.tipo} en ${p.operacion.toLowerCase()} en ${lugar}`,
    p.dormitorios && `${p.dormitorios} dormitorios`,
    p.banos && `${p.banos} baños`,
    p.m2_construidos && `${p.m2_construidos} m² construidos`,
    p.precio,
  ]
    .filter(Boolean)
    .join(', ')
    .concat('. Cotiza por WhatsApp con CyM Propiedades.')
  return { p, z, lugar, title, description }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zona, codigo } = await params
  const d = datosPagina(zona, codigo)
  if (!d) return {}
  const ruta = `/propiedades/${d.z.slug}/${d.p.codigo}`
  return {
    title: d.title,
    description: d.description,
    alternates: { canonical: ruta },
    openGraph: { title: d.title, description: d.description, url: ruta, images: d.p.fotos.slice(0, 1) },
  }
}

export default async function PaginaPropiedad({ params }: Props) {
  const { zona, codigo } = await params
  const d = datosPagina(zona, codigo)
  if (!d) notFound()
  const { p, z, lugar } = d
  const url = `${SITIO.url}/propiedades/${z.slug}/${p.codigo}`
  const tipoArt = p.tipo === 'Casa' ? 'la casa' : 'el departamento'
  const mensaje = mensajeWeb([`Me interesa ${tipoArt} código ${p.codigo} en ${zonaAgente(p, z.nombre)}.`])
  const relacionadas = porZona(z.slug)
    .filter((x) => x.codigo !== p.codigo)
    .slice(0, 3)
  const precioUF = uf(p.precio)

  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <Link href={`/propiedades/${z.slug}`}>Propiedades en {z.nombre}</Link> / <span>Código {p.codigo}</span>
      </nav>

      <section className="seccion ficha">
        <div className="contenedor ficha-grid">
          <div>
            <div className="galeria">
              {p.fotos.slice(0, 7).map((f, i) => (
                <div key={f} className={i === 0 ? 'foto principal' : 'foto'}>
                  <Image src={f} alt={`${titulo(p)}, foto ${i + 1}`} fill sizes={i === 0 ? '(max-width: 900px) 100vw, 760px' : '250px'} priority={i === 0} />
                </div>
              ))}
            </div>
            <h2>Descripción</h2>
            {p.descripcion.split('\n').map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>

          <aside className="ficha-lateral">
            <p className="sobretitulo">
              {p.tipo} en {p.operacion.toLowerCase()} · {lugar}
            </p>
            <h1>{titulo(p)}</h1>
            <p className="precio grande">{p.precio}</p>
            <dl className="atributos">
              <div>
                <dt>Código</dt>
                <dd>{p.codigo}</dd>
              </div>
              {p.dormitorios ? (
                <div>
                  <dt>Dormitorios</dt>
                  <dd>{p.dormitorios}</dd>
                </div>
              ) : null}
              {p.banos ? (
                <div>
                  <dt>Baños</dt>
                  <dd>{p.banos}</dd>
                </div>
              ) : null}
              {p.m2_construidos ? (
                <div>
                  <dt>Construidos</dt>
                  <dd>{p.m2_construidos} m²</dd>
                </div>
              ) : null}
              {p.m2_terreno ? (
                <div>
                  <dt>Terreno</dt>
                  <dd>{p.m2_terreno} m²</dd>
                </div>
              ) : null}
            </dl>
            <BotonWhatsApp texto="Cotizar por WhatsApp" mensaje={mensaje} origen={`ficha_${p.codigo}`} className="btn btn-wa ancho" />
            <a className="btn btn-borde ancho" href={SITIO.telefonoHref}>
              Llamar {SITIO.telefono}
            </a>
            <p className="nota">
              Ficha oficial:{' '}
              <a href={p.url_ficha} target="_blank" rel="noopener">
                cympropiedades.cl
              </a>
            </p>
          </aside>
        </div>
      </section>

      <section className="seccion gris" id="contacto">
        <div className="contenedor angosto">
          <h2>¿Te interesa esta propiedad?</h2>
          <p className="intro-seccion">Déjanos tus datos y el corredor de {z.nombre} te enviará la información completa y coordinará la visita.</p>
          <FormularioContacto origen={`ficha_${p.codigo}`} zona={zonaAgente(p, z.nombre)} codigo={p.codigo} />
        </div>
      </section>

      {relacionadas.length > 0 && (
        <section className="seccion">
          <div className="contenedor">
            <h2>Otras propiedades en {z.nombre}</h2>
            <div className="grilla">
              {relacionadas.map((x) => (
                <TarjetaPropiedad key={x.codigo} p={x} nombreZona={z.nombre} />
              ))}
            </div>
            <p className="centro">
              <Link href={`/propiedades/${z.slug}`} className="btn btn-borde">
                Ver todas las propiedades en {z.nombre}
              </Link>
            </p>
          </div>
        </section>
      )}

      <WhatsAppFlotante zona={zonaAgente(p, z.nombre)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': p.tipo === 'Casa' ? 'SingleFamilyResidence' : 'Apartment',
              '@id': `${url}#inmueble`,
              name: titulo(p),
              url,
              image: p.fotos.slice(0, 6),
              description: p.descripcion.slice(0, 500),
              ...(p.dormitorios ? { numberOfBedrooms: p.dormitorios, numberOfRooms: p.dormitorios } : {}),
              ...(p.banos ? { numberOfBathroomsTotal: p.banos } : {}),
              ...(p.m2_construidos ? { floorSize: { '@type': 'QuantitativeValue', value: Number(p.m2_construidos.replace(',', '.')), unitCode: 'MTK' } } : {}),
              address: { '@type': 'PostalAddress', addressLocality: p.comuna, addressRegion: SITIO.region, addressCountry: 'CL' },
            },
            {
              '@type': 'RealEstateListing',
              url,
              name: d.title,
              description: d.description,
              image: p.fotos[0],
              about: { '@id': `${url}#inmueble` },
              provider: { '@id': `${SITIO.url}/#cym` },
              ...(isNaN(precioUF)
                ? {}
                : {
                    offers: {
                      '@type': 'Offer',
                      price: precioUF,
                      priceCurrency: 'CLF',
                      availability: 'https://schema.org/InStock',
                      businessFunction: p.operacion === 'Arriendo' ? 'http://purl.org/goodrelations/v1#LeaseOut' : 'http://purl.org/goodrelations/v1#Sell',
                      seller: { '@id': `${SITIO.url}/#cym` },
                    },
                  }),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url },
                { '@type': 'ListItem', position: 2, name: `Propiedades en ${z.nombre}`, item: `${SITIO.url}/propiedades/${z.slug}` },
                { '@type': 'ListItem', position: 3, name: `Código ${p.codigo}`, item: url },
              ],
            },
          ],
        }}
      />
    </>
  )
}
