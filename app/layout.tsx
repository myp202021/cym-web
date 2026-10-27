import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import { Raleway } from 'next/font/google'
import JsonLd from '@/components/JsonLd'
import { SITIO, TRACKING } from '@/lib/sitio'
import { ZONAS } from '@/lib/zonas'
import './globals.css'

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '700', '800'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: { default: 'CyM Propiedades | Casas y departamentos en el sector oriente de Santiago', template: '%s' },
  description:
    'Corretaje de propiedades en Vitacura, Las Condes, La Dehesa y La Reina. Compra, venta y arriendo con corredores por zona y atención por WhatsApp.',
  applicationName: SITIO.nombre,
  openGraph: { type: 'website', locale: 'es_CL', siteName: SITIO.nombre, images: ['/logo5.jpg'] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/logo5.jpg', apple: '/logo5.jpg' },
  robots: { index: true, follow: true },
}

const organizacion = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITIO.url}/#cym`,
  name: SITIO.nombre,
  alternateName: SITIO.razon,
  url: SITIO.url,
  logo: `${SITIO.url}/logo5.jpg`,
  image: `${SITIO.url}/logo5.jpg`,
  telephone: SITIO.telefono,
  email: SITIO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITIO.direccion,
    addressLocality: SITIO.comuna,
    addressRegion: SITIO.region,
    addressCountry: 'CL',
  },
  areaServed: ZONAS.map((z) => ({ '@type': 'Place', name: `${z.nombre}, ${z.comuna}` })),
  sameAs: [SITIO.instagram, SITIO.sitioOficial],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${TRACKING.gtm}');`}
        </Script>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.ga4}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${TRACKING.ga4}');`}
        </Script>
        <Script id="pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${TRACKING.pixel}');fbq('track','PageView');`}
        </Script>
      </head>
      <body className={raleway.className}>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${TRACKING.gtm}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: 'none' }} alt="" src={`https://www.facebook.com/tr?id=${TRACKING.pixel}&ev=PageView&noscript=1`} />
        </noscript>
        <JsonLd data={organizacion} />

        <div className="barra-sup">
          <div className="contenedor">
            <a href={SITIO.telefonoHref}>{SITIO.telefono}</a>
            <span>
              {SITIO.direccion}, {SITIO.comuna}
            </span>
          </div>
        </div>
        <header className="cabecera">
          <div className="contenedor">
            <Link href="/" className="marca" aria-label="CyM Propiedades, inicio">
              <Image src="/logo5.jpg" alt="CyM Propiedades" width={85} height={48} priority />
            </Link>
            <nav aria-label="Principal">
              {ZONAS.map((z) => (
                <Link key={z.slug} href={`/propiedades/${z.slug}`}>
                  {z.nombre}
                </Link>
              ))}
              <Link href="/vende-tu-propiedad">Vende tu propiedad</Link>
              <Link href="/quienes-somos">Quiénes somos</Link>
              <Link href="/contacto" className="nav-cta">
                Contacto
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="pie">
          <div className="contenedor pie-grid">
            <div>
              <Image src="/logo_blanco.png" alt="CyM Propiedades" width={110} height={58} />
              <p>Gestión inmobiliaria en el sector oriente de Santiago: compraventa, arriendo, administración y asesoría legal y financiera.</p>
            </div>
            <div>
              <b>Propiedades</b>
              {ZONAS.map((z) => (
                <Link key={z.slug} href={`/propiedades/${z.slug}`}>
                  Propiedades en {z.nombre}
                </Link>
              ))}
            </div>
            <div>
              <b>Contacto</b>
              <a href={SITIO.telefonoHref}>{SITIO.telefono}</a>
              <a href={`mailto:${SITIO.email}`}>{SITIO.email}</a>
              <span>
                {SITIO.direccion}, {SITIO.comuna}
              </span>
              <a href={SITIO.instagram} target="_blank" rel="noopener">
                Instagram @cym_propiedades
              </a>
            </div>
          </div>
          <p className="contenedor legal">© {new Date().getFullYear()} CyM Propiedades. Precios y disponibilidad sujetos a confirmación del corredor.</p>
        </footer>
      </body>
    </html>
  )
}
