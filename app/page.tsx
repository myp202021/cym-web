import Link from 'next/link'
import FondoHero, { fotoPortada } from '@/components/FondoHero'
import Image from 'next/image'
import ArbolWhatsApp from '@/components/ArbolWhatsApp'
import TarjetaPropiedad from '@/components/TarjetaPropiedad'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { ZONAS, FAQ_HOME } from '@/lib/zonas'
import { PROPIEDADES, porZona, resumen, formatoUF } from '@/lib/propiedades'
import { SITIO } from '@/lib/sitio'

export const metadata = {
  title: 'CyM Propiedades | Casas y departamentos en venta en el sector oriente de Santiago',
  description:
    'Casas y departamentos en venta en Vitacura, Las Condes, La Dehesa y La Reina. Corredores por zona, fichas con fotos y precio en UF, y atención inmediata por WhatsApp.',
  alternates: { canonical: '/' },
}

const SERVICIOS = [
  { t: 'Compraventa', d: 'Te acompañamos en la búsqueda, la visita, la negociación y la escritura.' },
  { t: 'Arriendo y administración', d: 'Arrendamos y administramos tu propiedad con contratos y cobranza en orden.' },
  { t: 'Asesoría legal', d: 'Estudio de títulos y revisión de documentos antes de firmar.' },
  { t: 'Crédito hipotecario', d: 'Gestión de créditos y asesoría financiera para comparar alternativas.' },
  { t: 'Remodelaciones', d: 'Apoyo para remodelar y poner en valor la propiedad.' },
  { t: 'Proyectos y segunda vivienda', d: 'Proyectos inmobiliarios en venta y propiedades en otras regiones.' },
]

export default function Home() {
  // 2 casas por zona (las más caras primero) para mostrar la oferta principal
  const destacadas = ZONAS.flatMap((z) => porZona(z.slug).filter((p) => p.tipo === 'Casa').reverse().slice(0, 2)).slice(0, 6)
  const r = resumen(PROPIEDADES)
  return (
    <>
      <section className="hero">
        <FondoHero src={fotoPortada()} />
        <div className="contenedor hero-grid">
          <div>
            <p className="sobretitulo">Corretaje de propiedades · Sector oriente</p>
            <h1>Casas y departamentos en venta en el sector oriente de Santiago</h1>
            <p className="bajada">
              Vitacura, Las Condes, La Dehesa y La Reina. Un corredor de CyM por zona y atención inmediata por WhatsApp: cuéntanos qué buscas y te
              contactamos con propiedades reales.
            </p>
            <ul className="cifras">
              <li>
                <b>{r.total}</b> propiedades destacadas
              </li>
              {r.minUF && r.maxUF && (
                <li>
                  <b>
                    {formatoUF(r.minUF)} – {formatoUF(r.maxUF)}
                  </b>{' '}
                  rango de precios
                </li>
              )}
              <li>
                <b>4</b> zonas con corredor propio
              </li>
            </ul>
          </div>
          <ArbolWhatsApp />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>Propiedades por zona</h2>
          <p className="intro-seccion">Elige la zona y revisa las propiedades con fotos, superficie y precio. En cada una puedes cotizar por WhatsApp.</p>
          <div className="zonas">
            {ZONAS.map((z) => {
              const lista = porZona(z.slug)
              const rz = resumen(lista)
              return (
                <Link key={z.slug} href={`/propiedades/${z.slug}`} className="zona">
                  {lista[0] && <Image src={lista[0].fotos[0]} alt={`Propiedades en ${z.nombre}`} fill sizes="(max-width: 700px) 100vw, 300px" />}
                  <span>
                    <b>{z.nombre}</b>
                    {rz.total} propiedades{rz.minUF ? ` · desde ${formatoUF(rz.minUF)}` : ''}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="seccion gris">
        <div className="contenedor">
          <h2>Propiedades destacadas</h2>
          <div className="grilla">
            {destacadas.map((p) => (
              <TarjetaPropiedad key={p.codigo} p={p} nombreZona={ZONAS.find((z) => z.slug === p.zona)!.nombre} />
            ))}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor dos-col">
          <div>
            <h2>Quiénes somos</h2>
            <p>
              CyM Propiedades es una empresa de gestión inmobiliaria con oficina en La Dehesa. Nuestra misión es ayudar a nuestros clientes con
              soluciones rápidas, efectivas y eficientes, con atención personalizada en cada etapa.
            </p>
            <p>Trabajamos con un corredor a cargo de cada zona, para que siempre hables con alguien que conoce el barrio y los valores reales de venta.</p>
            <Link href="/quienes-somos" className="btn btn-borde">
              Conoce CyM
            </Link>
          </div>
          <div>
            <h2>Servicios</h2>
            <ul className="servicios">
              {SERVICIOS.map((s) => (
                <li key={s.t}>
                  <b>{s.t}</b>
                  {s.d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="banda">
        <div className="contenedor banda-grid">
          <div>
            <h2>¿Quieres vender tu propiedad?</h2>
            <p>Tasación comercial, publicación en los principales portales del país y acompañamiento hasta la escritura.</p>
          </div>
          <Link href="/vende-tu-propiedad" className="btn btn-blanco">
            Vende con CyM
          </Link>
        </div>
      </section>

      <Faq items={FAQ_HOME} />

      <section className="seccion gris" id="contacto">
        <div className="contenedor angosto">
          <h2>Contáctanos</h2>
          <p className="intro-seccion">
            Déjanos tus datos y un corredor te contactará. Si prefieres, escríbenos por WhatsApp o llama al <a href={SITIO.telefonoHref}>{SITIO.telefono}</a>.
          </p>
          <FormularioContacto origen="home" />
        </div>
      </section>

      <WhatsAppFlotante />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: SITIO.nombre, url: SITIO.url, inLanguage: 'es-CL' }} />
    </>
  )
}
