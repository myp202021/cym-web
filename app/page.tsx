import Link from 'next/link'
import FondoHero, { FONDOS } from '@/components/FondoHero'
import Image from 'next/image'
import ArbolWhatsApp from '@/components/ArbolWhatsApp'
import TarjetaPropiedad from '@/components/TarjetaPropiedad'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Faq from '@/components/Faq'
import Alianzas from '@/components/Alianzas'
import JsonLd from '@/components/JsonLd'
import { ZONAS, FAQ_HOME } from '@/lib/zonas'
import { PROPIEDADES, porZona, resumen, formatoUF } from '@/lib/propiedades'
import { SITIO } from '@/lib/sitio'

export const metadata = {
  title: 'Corredora de propiedades en Zona Oriente | CyM Propiedades',
  description:
    'Compra, vende o tasa tu propiedad en Vitacura, Las Condes, San Carlos de Apoquindo, La Dehesa, Lo Barnechea y La Reina. 11 años y más de 1.500 ventas.',
  alternates: { canonical: '/' },
}

export const PROCESO = [
  'Evaluación comercial',
  'Análisis de mercado',
  'Estrategia de precio',
  'Presentación',
  'Marketing',
  'Calificación de compradores',
  'Visitas y seguimiento',
  'Negociación',
  'Cierre',
]

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
        <FondoHero src={FONDOS.home} />
        <div className="contenedor hero-grid">
          <div>
            <p className="sobretitulo">CyM Propiedades · Zona Oriente</p>
            <h1>Corredora de propiedades especialista en Zona Oriente</h1>
            <p className="bajada">
              Compra, vende o tasa tu propiedad en Vitacura, Las Condes, San Carlos de Apoquindo, La Dehesa, Lo Barnechea y La Reina.
            </p>
            <div className="acciones">
              <Link href="#zonas" className="btn">
                Buscar propiedad
              </Link>
              <Link href="/vende-tu-propiedad" className="btn btn-claro">
                Quiero vender
              </Link>
              <Link href="/tasacion-propiedades" className="btn btn-claro">
                Tasar mi propiedad
              </Link>
            </div>
            <ul className="cifras">
              <li>
                <b>11 años</b> en el mercado
              </li>
              <li>
                <b>+1.500</b> ventas
              </li>
              <li>
                <b>{r.total}</b> propiedades destacadas
              </li>
            </ul>
          </div>
          <ArbolWhatsApp />
        </div>
      </section>

      <section className="seccion" id="zonas">
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

      <section className="seccion gris">
        <div className="contenedor dos-col">
          <div>
            <p className="sobretitulo">Propietarios</p>
            <h2>¿Quieres vender tu propiedad?</h2>
            <p>
              Conoce su valor comercial y accede a una estrategia de venta basada en información de mercado, posicionamiento y demanda activa.
              Vendemos con un proceso, no con improvisación.
            </p>
            <ol className="proceso">
              {PROCESO.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
            <Link href="/vende-tu-propiedad" className="btn">
              Quiero vender mi propiedad
            </Link>
          </div>
          <div className="caja-propietarios">
            <p className="sobretitulo">Tasación</p>
            <h2>¿Cuánto vale tu propiedad?</h2>
            <p>
              El valor depende de la ubicación y la microzona, el terreno, la superficie, la orientación, el estado, la distribución, los comparables,
              la competencia y la demanda. Te lo explicamos con datos.
            </p>
            <Link href="/tasacion-propiedades" className="btn btn-borde">
              Solicitar tasación
            </Link>
          </div>
        </div>
      </section>

      <Alianzas />

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
