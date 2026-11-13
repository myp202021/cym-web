import Link from 'next/link'
import FondoHero, { FONDOS } from '@/components/FondoHero'
import Image from 'next/image'
import ArbolWhatsApp from '@/components/ArbolWhatsApp'
import TarjetaPropiedad from '@/components/TarjetaPropiedad'
import FormularioContacto from '@/components/FormularioContacto'
import Faq from '@/components/Faq'
import Alianzas from '@/components/Alianzas'
import JsonLd from '@/components/JsonLd'
import { ZONAS, FAQ_HOME } from '@/lib/zonas'
import { PROPIEDADES, porZona, resumen, formatoUF } from '@/lib/propiedades'
import { SITIO, DESCRIPCION } from '@/lib/sitio'
import { GUIAS } from '@/lib/guias'
import { COMUNAS } from '@/lib/comunas'
import { paginasDe, TIPOS } from '@/lib/paginas'
import { FONDOS as FOTOS } from '@/components/FondoHero'
import SitioOficial from '@/components/SitioOficial'

export const metadata = {
  title: 'Casas en venta en Vitacura, La Dehesa y San Carlos de Apoquindo | CyM Propiedades',
  description: DESCRIPCION,
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
  { t: 'Venta de casas', d: 'Publicación, visitas, negociación y cierre, con un corredor por zona.' },
  { t: 'Compra', d: 'Te acompañamos en la búsqueda, la visita, la negociación y la escritura.' },
  { t: 'Tasación sin costo', d: 'Valor comercial con comparables reales del sector.' },
  { t: 'Asesoría legal', d: 'Estudio de títulos y revisión de documentos antes de firmar.' },
  { t: 'Crédito hipotecario', d: 'Gestión de créditos y asesoría financiera para comparar alternativas.' },
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
            <p className="sobretitulo">CyM Propiedades · Sector oriente</p>
            <h1>Líderes en venta en el sector oriente</h1>
            <p className="comunas-hero">
              {ZONAS.map((z) => (
                <Link key={z.slug} href={`/${z.slug}`}>{z.nombre}</Link>
              ))}
            </p>
            <p className="bajada">Compra, vende o tasa sin costo tu propiedad con CyM.</p>
            <div className="acciones">
              <Link href="/vende-tu-propiedad" className="btn">
                Quiero vender
              </Link>
              <Link href="/tasacion-propiedades" className="btn btn-claro">
                Tasar sin costo
              </Link>
            </div>
            <ul className="cifras">
              <li>
                <b>12 años</b> en el mercado
              </li>
              <li>
                <b>+100.000</b> compradores
              </li>
              <li>
                <b>{r.total}</b> propiedades en venta
              </li>
            </ul>
          </div>
          <ArbolWhatsApp />
        </div>
      </section>

      <section className="seccion" id="comunas">
        <div className="contenedor">
          <h2>CyM en tu comuna</h2>
          <p className="intro-seccion">Un corredor a cargo de cada zona. En cada comuna encuentras barrios, precios de referencia, ranking de sectores, propiedades y contacto directo.</p>
          <div className="comunas-cym">
            {COMUNAS.map((c) => {
              const lista = porZona(c.slug)
              const foto = lista.find((p) => p.tipo === 'Casa')?.fotos[0] || FOTOS[c.slug as keyof typeof FOTOS]
              return (
                <article key={c.slug} className="comuna-cym">
                  <Link href={`/${c.slug}`} className="comuna-cym-foto">
                    {foto && <Image src={foto} alt={`CyM Propiedades en ${c.nombre}`} fill sizes="(max-width: 760px) 100vw, 400px" />}
                    <span>{c.nombre}</span>
                  </Link>
                  <div className="comuna-cym-texto">
                    <h3><Link href={`/${c.slug}`}>Corredora de propiedades en {c.nombre}</Link></h3>
                    <p>{c.bajada}</p>
                    <ul>
                      {paginasDe(c.slug).map((pg) => (
                        <li key={pg.slug}><Link href={`/${pg.slug}`}>{TIPOS[pg.tipo]}</Link></li>
                      ))}
                      <li><Link href={`/propiedades/${c.slug}`}>Propiedades en venta ({lista.length})</Link></li>
                    </ul>
                  </div>
                </article>
              )
            })}
            <article className="comuna-cym madres-cym">
              <div className="comuna-cym-texto">
                <p className="sobretitulo">Sector oriente</p>
                <h3>Compara las comunas</h3>
                <ul>
                  <li><Link href="/ranking-barrios-sector-oriente">Ranking de barrios del sector oriente</Link></li>
                  <li><Link href="/precios-casas-sector-oriente">Precios de casas por comuna</Link></li>
                  <li><Link href="/corredoras-de-propiedades-sector-oriente">Corredoras de propiedades del sector oriente</Link></li>
                </ul>
                <a href={SITIO.sitioOficial} target="_blank" rel="noopener" className="btn btn-borde">Sitio oficial: cympropiedades.cl</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="seccion gris" id="zonas">
        <div className="contenedor">
          <h2>Propiedades por zona</h2>
          <p className="intro-seccion">Elige la zona y revisa las propiedades con fotos, superficie y precio. En cada una puedes cotizar por WhatsApp.</p>
          <div className="zonas">
            {[
              ...ZONAS.map((z) => ({ nombre: z.nombre, href: `/propiedades/${z.slug}`, lista: porZona(z.slug).filter((p) => p.tipo === 'Casa'), unidad: ['casa', 'casas'] })),
              { nombre: 'Departamentos', href: '/propiedades/departamentos', lista: PROPIEDADES.filter((p) => p.tipo === 'Departamento'), unidad: ['departamento', 'departamentos'] },
            ].map((z) => {
              const rz = resumen(z.lista)
              return (
                <Link key={z.href} href={z.href} className="zona">
                  {z.lista[0] && <Image src={z.lista[0].fotos[0]} alt={`${z.nombre}: propiedades en venta`} fill sizes="(max-width: 700px) 50vw, 380px" />}
                  <span>
                    <b>{z.nombre}</b>
                    {rz.total} {rz.total === 1 ? z.unidad[0] : z.unidad[1]}{rz.minUF ? ` · desde ${formatoUF(rz.minUF)}` : ''}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>Casas destacadas</h2>
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
            <p>{DESCRIPCION}</p>
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
              Conoce su valor comercial y accede a una estrategia de venta basada en información de mercado, posicionamiento y una base de +100.000 compradores.
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
            <p className="sobretitulo">Tasación sin costo</p>
            <h2>¿Cuánto vale tu propiedad?</h2>
            <p>
              El valor depende de la ubicación y la microzona, el terreno, la superficie, la orientación, el estado, la distribución, los comparables,
              la competencia y la demanda. Te lo explicamos con datos, sin costo.
            </p>
            <Link href="/tasacion-propiedades" className="btn btn-borde">
              Solicitar tasación
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>Guías del sector oriente</h2>
          <p className="intro-seccion">Respuestas con fuentes a lo que más nos preguntan antes de comprar o vender.</p>
          <div className="guias">
            {GUIAS.map((g) => (
              <Link key={g.slug} href={`/guias/${g.slug}`} className="guia">
                <b>{g.titulo}</b>
                <span>{g.resumen}</span>
              </Link>
            ))}
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

      <SitioOficial />
    </>
  )
}
