// Landing "Barrio 3D" para propietarios que quieren vender su casa en el sector oriente (pedido de Christopher, 18 nov 2026).
// Estética y contenidos de los 10 reels Barrio 3D de CyM (lib/barrio3d.ts). Página madre de las 5 páginas /vender-casa-<comuna>.
import type { Metadata } from 'next'
import Link from 'next/link'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import SitioOficial from '@/components/SitioOficial'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import ReelB3D from '@/components/ReelB3D'
import CalculadoraB3D from '@/components/CalculadoraB3D'
import { COMUNAS } from '@/lib/comunas'
import { PAGINAS } from '@/lib/paginas'
import { CARTERA, fechaCartera } from '@/lib/cartera'
import { SITIO, mensajeWeb } from '@/lib/sitio'
import {
  REELS,
  reel,
  videoSrc,
  posterSrc,
  MICROZONAS,
  TRAMOS,
  AVISOS_VITACURA,
  MAS_45_DIAS,
  MEDIANA_VITACURA,
  METODO,
  B3D_FECHA,
  B3D_FUENTE,
} from '@/lib/barrio3d'

const SLUG = 'vender-casa-sector-oriente'
const TITULO = 'Vender casa en el sector oriente: precio y plazos | CyM'
const DESCRIPCION =
  'Cuánto vale tu casa en el sector oriente: terreno, microzona, regularización y precio correcto, explicado en 10 videos 3D por CyM Propiedades.'
const H1 = 'Vender tu casa en el sector oriente, con el precio correcto'

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: `/${SLUG}` },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    url: `/${SLUG}`,
    type: 'website',
    images: [{ url: posterSrc(reel('03')), width: 540, height: 960, alt: 'La ecuación 80-20: en Vitacura, 80% del valor de una casa es el terreno' }],
    videos: [{ url: `${SITIO.url}${videoSrc(reel('03'))}`, type: 'video/mp4', width: 720, height: 1280 }],
  },
}

const FAQ = [
  {
    q: '¿Cuánto vale mi casa en el sector oriente?',
    a: 'Depende sobre todo del terreno y de la microzona. En Vitacura, según el análisis de CyM, cerca del 80% del valor de una casa es el terreno y el 20% la construcción, con valores de suelo entre UF 36 y UF 50 por m² según la microzona. Para tu casa, CyM hace una tasación sin costo con comparables de tu manzana.',
  },
  {
    q: '¿Cómo se calcula el precio de mercado de una casa?',
    a: 'Como punto de partida: m² de terreno × UF/m² de la microzona, más m² construidos × UF/m² según calidad, terminaciones y regularización. Ejemplo de CyM en Polo (Vitacura): 500 m² × UF 48 = UF 24.000 de terreno, más UF 6.000 de casa, da UF 30.000 referenciales.',
  },
  {
    q: '¿Una ampliación sin permiso baja el precio de mi casa?',
    a: 'Sí. Lo que no está regularizado no suma igual que lo regularizado y además puede frenar el crédito hipotecario del comprador. Conviene regularizar antes de publicar; CyM te orienta en el proceso.',
  },
  {
    q: '¿Por qué mi casa no se vende?',
    a: `La causa más común es el precio de lista. En Vitacura hay ${AVISOS_VITACURA.toLocaleString('es-CL')} avisos de casas en venta y el ${MAS_45_DIAS}% lleva más de 45 días publicado, según el conteo de CyM. Un precio de lista alto deja la casa quieta; el precio correcto vende.`,
  },
  {
    q: '¿El precio de lista es el precio al que se vende la casa?',
    a: 'No. El precio de lista es el de la publicación y el de venta es el que se firma al cierre. Publicar con un precio bien calculado desde el primer día es lo que más acorta la venta.',
  },
  {
    q: '¿La tasación de CyM tiene costo?',
    a: 'No. La tasación comercial de CyM es sin costo y sin compromiso de venta. Puedes pedirla por WhatsApp o dejando tus datos en esta página.',
  },
  {
    q: '¿En qué comunas vende casas CyM?',
    a: `En Vitacura, La Dehesa (Lo Barnechea), San Carlos de Apoquindo, Las Condes y La Reina. Al ${fechaCartera()}, CyM tenía ${CARTERA.total_venta} propiedades en venta publicadas en su sitio oficial, cympropiedades.cl.`,
  },
]

const url = `${SITIO.url}/${SLUG}`
const uf = (n: number) => 'UF ' + n.toLocaleString('es-CL')
const venderComuna = PAGINAS.filter((p) => p.tipo === 'vender-casa')
const maxTramo = Math.max(...TRAMOS.map((t) => t.casas))
const mapa = `https://www.google.com/maps?q=${encodeURIComponent(`${SITIO.direccion}, ${SITIO.comuna}, Santiago, Chile`)}&z=11&output=embed`

function Formula() {
  return (
    <div className="b3d-formula" aria-label="Precio de mercado: metros cuadrados de terreno por UF por metro cuadrado, más metros cuadrados construidos por UF por metro cuadrado. Terreno 80%, casa 20%.">
      <p className="mono tenue">Precio de mercado · Vitacura</p>
      <p className="mono">m² terreno × UF/m² + m² construido × UF/m²</p>
      <div className="b3d-barra"><span style={{ width: '80%' }} /></div>
      <p className="mono b3d-barra-leyenda"><span className="verde">Terreno 80%</span><span>Casa 20%</span></p>
    </div>
  )
}

export default function VenderCasaSectorOriente() {
  return (
    <div className="b3d">
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <span>Vender casa en el sector oriente</span>
      </nav>

      <section className="b3d-hero">
        <div className="contenedor b3d-hero-grid">
          <div className="b3d-hero-texto">
            <p className="mono b3d-tag"><span className="punto" /> Barrio 3D · Propietarios</p>
            <h1>
              Vender tu casa en el sector oriente, <span className="verde">con el precio correcto</span>
            </h1>
            <p className="b3d-bajada">
              Tu casa vale por su terreno, su manzana y cómo está construida. Te lo mostramos en 10 videos de 18 segundos y te hacemos la cuenta con datos de mercado de
              CyM, sin costo.
            </p>
            <div className="b3d-acciones">
              <BotonWhatsApp texto="Tasación sin costo por WhatsApp" mensaje={mensajeWeb(['Quiero vender mi casa. Vi la serie Barrio 3D y quiero una tasación sin costo.'])} origen="b3d_hero" />
              <a href="#haz-la-cuenta" className="btn-b3d btn-b3d-borde">Haz la cuenta</a>
            </div>
          </div>
          <ReelB3D r={reel('03')} prioridad />
          <div className="b3d-hero-datos">
            <ul className="b3d-cifras">
              <li><b>12 años</b><span className="mono">en el mercado</span></li>
              <li><b>+100.000</b><span className="mono">compradores</span></li>
              <li><b>{CARTERA.total_venta}</b><span className="mono">propiedades en venta</span></li>
            </ul>
            <Formula />
          </div>
        </div>
      </section>

      <section className="b3d-sec">
        <div className="contenedor angosto">
          <p className="b3d-resumen">
            <b>
              Para vender una casa en Vitacura, La Dehesa, San Carlos de Apoquindo, Las Condes o La Reina, el precio correcto parte del terreno: en Vitacura, según el
              análisis de CyM Propiedades, el 80% del valor es el terreno y el 20% la construcción, y el suelo vale entre UF 36 y UF 50 por m² según la microzona. Sobre esa base
              se ajusta por calidad, terminaciones y regularización. Publicar sobre el precio de mercado deja la casa quieta: el 56% de los 1.208 avisos de casas en Vitacura lleva
              más de 45 días publicado.
            </b>
          </p>
          <ol className="b3d-indice mono" aria-label="Contenido">
            <li><a href="#terreno">01–03 · Cuánto vale tu terreno</a></li>
            <li><a href="#mapa-del-valor">02 · El mapa del valor</a></li>
            <li><a href="#construido">04–05 · Lo construido</a></li>
            <li><a href="#precio">06–07 · Precio y competencia</a></li>
            <li><a href="#tramos">08 · Tramos de precio</a></li>
            <li><a href="#haz-la-cuenta">09 · Haz la cuenta</a></li>
            <li><a href="#metodo">10 · Así vendemos tu casa</a></li>
          </ol>
        </div>
      </section>

      <section className="b3d-sec b3d-rejilla" id="terreno">
        <div className="contenedor b3d-dos">
          <div>
            <p className="mono b3d-tag"><span className="punto" /> Terreno</p>
            <h2>¿Cuánto vale tu casa? <span className="verde">Empieza por el terreno.</span></h2>
            <p>
              En el sector oriente la ubicación pesa más que la construcción. En Vitacura, <b>80% del valor de una casa es el terreno y 20% es la casa</b>. Por eso dos casas
              iguales, con el mismo terreno, pueden valer muy distinto según la microzona.
            </p>
            <div className="b3d-tabla-wrap">
              <table className="b3d-tabla">
                <caption className="mono">Mismo terreno de 500 m², otra microzona (solo el terreno)</caption>
                <thead><tr><th>Microzona</th><th>UF/m²</th><th>Terreno</th></tr></thead>
                <tbody>
                  <tr><td>Villa El Dorado</td><td>36</td><td>{uf(18000)}</td></tr>
                  <tr><td>Polo</td><td>48</td><td>{uf(24000)}</td></tr>
                  <tr className="destacado"><td>Jardín del Este</td><td>50</td><td>{uf(25000)}</td></tr>
                </tbody>
              </table>
            </div>
            <p className="b3d-chico">Diferencia entre microzonas para el mismo terreno: {uf(7000)}. Fuente: {B3D_FUENTE}.</p>
          </div>
          <div className="b3d-reels">
            <ReelB3D r={reel('01')} />
          </div>
        </div>
      </section>

      <section className="b3d-sec" id="mapa-del-valor">
        <div className="contenedor b3d-dos b3d-invertido">
          <div className="b3d-reels">
            <ReelB3D r={reel('02')} />
          </div>
          <div>
            <p className="mono b3d-tag"><span className="punto" /> Valor del suelo</p>
            <h2>El mapa del valor: UF por m² de terreno en 16 microzonas de Vitacura</h2>
            <p>De UF 36 a UF 50 por m². <span className="verde">La manzana define tu precio.</span></p>
            <ul className="b3d-mapa" aria-label="UF por m² de terreno por microzona de Vitacura">
              {MICROZONAS.map((z) => (
                <li key={z.nombre} style={{ ['--nivel' as string]: (z.uf - 34) / 16 }}>
                  <span className="mono">{z.nombre}</span>
                  <b className="mono">UF {z.uf}</b>
                </li>
              ))}
            </ul>
            <p className="b3d-chico">Valores de referencia por m² de terreno. Fuente: {B3D_FUENTE}. Para La Dehesa, San Carlos de Apoquindo, Las Condes y La Reina, la tasación usa comparables de cada sector.</p>
          </div>
        </div>
      </section>

      <section className="b3d-sec b3d-rejilla" id="construido">
        <div className="contenedor">
          <p className="mono b3d-tag"><span className="punto" /> Construido · Regularización</p>
          <h2>No todos los m² construidos valen igual</h2>
          <div className="b3d-dos">
            <div>
              <p>Sobre el valor del terreno, la casa suma según tres factores:</p>
              <ol className="b3d-lista mono">
                <li><span>01</span> Calidad de construcción</li>
                <li><span>02</span> Terminaciones</li>
                <li className="rojo"><span>03</span> Regularización</li>
              </ol>
              <p>
                Según terminaciones, <b className="verde">el m² construido puede valer el doble</b>. Y lo que no está regularizado no suma igual: una{' '}
                <b className="rojo">ampliación no regularizada baja el precio de tu casa</b> y puede trabar el crédito del comprador. Regularízala antes de vender; te orientamos
                con los certificados de la Dirección de Obras.
              </p>
            </div>
            <div className="b3d-reels b3d-reels-2">
              <ReelB3D r={reel('05')} />
              <ReelB3D r={reel('04')} />
            </div>
          </div>
        </div>
      </section>

      <section className="b3d-sec" id="precio">
        <div className="contenedor">
          <p className="mono b3d-tag"><span className="punto" /> Precio · Competencia</p>
          <h2>Precio de lista no es precio de venta</h2>
          <div className="b3d-dos">
            <div>
              <p>
                El precio de lista es el que manda… pero no es el precio de venta. Uno es el de la publicación y el otro, el del cierre. <b className="verde">Publicar bien es vender mejor.</b>
              </p>
              <div className="b3d-kpis">
                <div>
                  <p className="mono tenue">Avisos de casas en venta · Vitacura</p>
                  <p className="b3d-num verde">{AVISOS_VITACURA.toLocaleString('es-CL')}</p>
                  <p>Si vendes, compites con todos.</p>
                </div>
                <div>
                  <p className="mono rojo-suave">Más de 45 días publicados</p>
                  <p className="b3d-num rojo">{MAS_45_DIAS}%</p>
                  <p>Precio de lista alto = casa quieta. <span className="verde">El precio correcto vende.</span></p>
                </div>
              </div>
              <p className="b3d-chico">Fuente: {B3D_FUENTE}.</p>
            </div>
            <div className="b3d-reels b3d-reels-2">
              <ReelB3D r={reel('06')} />
              <ReelB3D r={reel('07')} />
            </div>
          </div>
        </div>
      </section>

      <section className="b3d-sec b3d-rejilla" id="tramos">
        <div className="contenedor b3d-dos">
          <div>
            <p className="mono b3d-tag"><span className="punto" /> Tramos</p>
            <h2>¿En qué tramo está tu casa?</h2>
            <p>Las {AVISOS_VITACURA.toLocaleString('es-CL')} casas en venta en Vitacura, por tramo de precio de lista:</p>
            <ul className="b3d-tramos">
              {TRAMOS.map((t) => (
                <li key={t.tramo} className={t.destacado ? 'destacado' : ''}>
                  <span className="mono">{t.tramo}</span>
                  <span className="b3d-tramo-barra"><span style={{ width: `${(t.casas / maxTramo) * 100}%` }} /></span>
                  <b className="mono">{t.casas}</b>
                </li>
              ))}
            </ul>
            <p>
              Precio mediano en Vitacura: <b>{uf(MEDIANA_VITACURA)}</b>. <span className="verde">Entre UF 15.000 y 25.000 está la mayor pelea</span>: ahí la diferencia la hacen el
              precio de salida, las fotos y a quién le llega el aviso.
            </p>
            <p className="b3d-chico">Fuente: {B3D_FUENTE}.</p>
          </div>
          <div className="b3d-reels">
            <ReelB3D r={reel('08')} />
          </div>
        </div>
      </section>

      <section className="b3d-sec" id="haz-la-cuenta">
        <div className="contenedor b3d-dos b3d-invertido">
          <div className="b3d-reels">
            <ReelB3D r={reel('09')} />
          </div>
          <div>
            <p className="mono b3d-tag"><span className="punto" /> Haz la cuenta</p>
            <h2>Haz la cuenta de tu casa</h2>
            <p>Elige tu microzona de Vitacura y los m² de tu terreno. Usamos la misma ecuación de los videos: terreno 80%, casa 20%.</p>
            <CalculadoraB3D />
          </div>
        </div>
      </section>

      <section className="b3d-sec b3d-rejilla" id="metodo">
        <div className="contenedor b3d-dos">
          <div>
            <p className="mono b3d-tag"><span className="punto" /> Método CyM</p>
            <h2>Así vendemos tu casa</h2>
            <ol className="b3d-pasos mono">
              {METODO.map((m, i) => (
                <li key={m}><span>{String(i + 1).padStart(2, '0')}</span> {m}</li>
              ))}
            </ol>
            <p>
              <b className="verde b3d-grande">12 años</b> en el mercado y <b>más de 100.000 compradores</b> en nuestra base. Nos especializamos en casas del sector oriente, con un
              corredor a cargo de cada zona.
            </p>
            <BotonWhatsApp texto="Quiero vender mi casa" mensaje={mensajeWeb(['Quiero vender mi casa con CyM. Vi la serie Barrio 3D.'])} origen="b3d_metodo" />
          </div>
          <div className="b3d-reels">
            <ReelB3D r={reel('10')} />
          </div>
        </div>
      </section>

      <section className="b3d-sec" id="comunas">
        <div className="contenedor">
          <p className="mono b3d-tag"><span className="punto" /> Zonas CyM</p>
          <h2>Vender casa por comuna</h2>
          <p>Cartera de CyM publicada en su sitio oficial al {fechaCartera()}. En cada comuna tienes una guía de venta con precios, documentos y plazos.</p>
          <div className="b3d-comunas">
            {COMUNAS.map((c) => {
              const ca = CARTERA.comunas.find((x) => x.slug === c.slug)
              const pg = venderComuna.find((p) => p.comuna === c.slug)
              return (
                <article key={c.slug}>
                  <h3><Link href={pg ? `/${pg.slug}` : `/${c.slug}`}>Vender casa en {c.nombre}</Link></h3>
                  {ca && (
                    <p className="mono">
                      <b className="verde">{ca.casas}</b> casas en venta{ca.mediana_uf ? ` · mediana ${uf(ca.mediana_uf)}` : ''}
                    </p>
                  )}
                  <p className="b3d-chico"><Link href={`/${c.slug}`}>CyM en {c.nombre}</Link> · <Link href={`/tasacion-de-propiedades-${c.slug}`}>Tasación</Link></p>
                </article>
              )
            })}
          </div>
          <p>¿Qué corredora elegir? <Link href="/ranking-corredoras-de-propiedades-sector-oriente">Ranking de 11 corredoras para vender casa en el sector oriente</Link>, con metodología, reseñas y oficinas por comuna.</p>
          <p>¿Cuánto demora vender? <Link href="/cuanto-demora-vender-casa-sector-oriente">Cuánto demora vender una casa en el sector oriente y cómo acortarlo</Link>: plazos de referencia, etapas hasta la escritura y qué hacer antes de publicar.</p>
          <p>¿Tu casa vale más de 20.000 UF? <Link href="/vender-casa-mas-de-20000-uf-sector-oriente">Guía para vender una casa de valor alto en el sector oriente</Link>: cuántas compiten en tu tramo por comuna, documentos e impuestos.</p>
          <p className="b3d-chico">
            Medianas de precio de la cartera publicada por CyM (todas las propiedades en venta de cada comuna), no del mercado completo.{' '}
            <a href={CARTERA.fuente} target="_blank" rel="noopener">Ver la cartera en cympropiedades.cl</a>.
          </p>
          <div className="b3d-dos b3d-mapa-bloque">
            <div>
              <h2>Dónde vende casas CyM</h2>
              <p>
                Vitacura, La Dehesa (Lo Barnechea), San Carlos de Apoquindo, Las Condes y La Reina. Oficina: {SITIO.direccion}, {SITIO.comuna}.
              </p>
              <ul className="chips">
                {COMUNAS.map((c) => (
                  <li key={c.slug}><Link href={`/${c.slug}`}>Corredora de propiedades en {c.nombre}</Link></li>
                ))}
              </ul>
              <p className="b3d-chico">
                También: <Link href="/precios-casas-sector-oriente">precios de casas en el sector oriente</Link>,{' '}
                <Link href="/ranking-barrios-sector-oriente">ranking de barrios</Link> y <Link href="/vende-tu-propiedad">proceso de venta de propiedades</Link>.
              </p>
            </div>
            <iframe title="Mapa de las zonas de CyM Propiedades en el sector oriente de Santiago" src={mapa} width="100%" height="380" style={{ border: 0, borderRadius: 8 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <Faq items={FAQ} titulo="Preguntas frecuentes al vender tu casa" />

      <section className="b3d-sec b3d-rejilla" id="contacto">
        <div className="contenedor angosto">
          <p className="mono b3d-tag"><span className="punto" /> Tasación sin costo</p>
          <h2>¿Cuánto vale tu casa?</h2>
          <p>Déjanos tus datos y el equipo de CyM te contactará por WhatsApp con una tasación sin costo y sin compromiso.</p>
          <FormularioContacto origen="b3d_formulario" propietario boton="Pedir tasación sin costo" />
        </div>
      </section>

      <section className="b3d-sec">
        <div className="contenedor angosto">
          <h2>Fuentes</h2>
          <ul className="fuentes">
            <li>{B3D_FUENTE}: <a href={SITIO.instagram} target="_blank" rel="noopener">@cym_propiedades</a>.</li>
            <li><a href={CARTERA.fuente} target="_blank" rel="noopener">Cartera en venta de CyM Propiedades en cympropiedades.cl</a>, contada al {fechaCartera()}.</li>
          </ul>
        </div>
      </section>

      <SitioOficial />
      <WhatsAppFlotante />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${url}#pagina`,
              url,
              name: TITULO,
              headline: H1,
              description: DESCRIPCION,
              inLanguage: 'es-CL',
              datePublished: '2026-11-18',
              dateModified: '2026-11-18',
              isPartOf: { '@type': 'WebSite', name: SITIO.nombre, url: SITIO.url },
              about: { '@type': 'Thing', name: 'Venta de casas en el sector oriente de Santiago' },
              audience: { '@type': 'Audience', audienceType: 'Propietarios que quieren vender su casa' },
              publisher: { '@id': `${SITIO.url}/#cym` },
              primaryImageOfPage: { '@type': 'ImageObject', url: `${SITIO.url}${posterSrc(reel('03'))}`, width: 540, height: 960 },
              breadcrumb: { '@id': `${url}#migas` },
              video: REELS.map((r) => ({ '@id': `${url}#video-${r.n}` })),
              spatialCoverage: COMUNAS.map((c) => ({ '@type': 'Place', name: `${c.nombre}, ${c.comuna}, Santiago, Chile` })),
            },
            ...REELS.map((r) => ({
              '@type': 'VideoObject',
              '@id': `${url}#video-${r.n}`,
              name: `Barrio 3D ${r.n}: ${r.titulo}`,
              description: r.texto,
              transcript: r.texto,
              thumbnailUrl: `${SITIO.url}${posterSrc(r)}`,
              contentUrl: `${SITIO.url}${videoSrc(r)}`,
              uploadDate: `${B3D_FECHA}T12:00:00-03:00`,
              duration: 'PT18S',
              width: 720,
              height: 1280,
              inLanguage: 'es-CL',
              isFamilyFriendly: true,
              publisher: { '@id': `${SITIO.url}/#cym` },
              author: { '@id': `${SITIO.url}/#cym` },
            })),
            {
              '@type': 'Service',
              name: 'Venta de casas en el sector oriente de Santiago',
              serviceType: 'Corretaje de propiedades: venta de casas',
              provider: { '@id': `${SITIO.url}/#cym` },
              areaServed: COMUNAS.map((c) => ({ '@type': 'Place', name: `${c.nombre}, ${c.comuna}` })),
              offers: { '@type': 'Offer', name: 'Tasación comercial sin costo', price: 0, priceCurrency: 'CLP' },
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${url}#migas`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url },
                { '@type': 'ListItem', position: 2, name: 'Vender casa en el sector oriente', item: url },
              ],
            },
          ],
        }}
      />
    </div>
  )
}
