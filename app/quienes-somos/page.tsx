import Link from 'next/link'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import { SITIO } from '@/lib/sitio'

export const metadata = {
  title: 'Quiénes somos | CyM Propiedades, gestión inmobiliaria en La Dehesa',
  description:
    'CyM Propiedades: gestión inmobiliaria con oficina en La Dehesa. Compraventa, arriendo, administración, asesoría legal y financiera en el sector oriente de Santiago.',
  alternates: { canonical: '/quienes-somos' },
}

export default function QuienesSomos() {
  return (
    <>
      <section className="hero hero-zona">
        <div className="contenedor">
          <p className="sobretitulo">La empresa</p>
          <h1>Quiénes somos</h1>
          <p className="bajada">Clients &amp; Management Properties Chile. Nuestros clientes son nuestra mejor publicidad.</p>
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor dos-col">
          <div>
            <h2>Nuestra misión</h2>
            <p>
              Ayudar a nuestros clientes en la gestión inmobiliaria, otorgándoles asesorías y servicios con soluciones rápidas, efectivas y eficientes en
              el proceso.
            </p>
            <ul className="checks">
              <li>Focalizar los requerimientos de cada cliente para lograr la máxima satisfacción.</li>
              <li>Atención personalizada en todo momento.</li>
            </ul>
            <h2>Nuestra visión</h2>
            <ul className="checks">
              <li>Ser la mejor opción del mercado inmobiliario.</li>
              <li>Ser reconocidos como una empresa confiable y transparente en sus negocios.</li>
              <li>Contar con un 100% de satisfacción de nuestros clientes.</li>
            </ul>
          </div>
          <div>
            <h2>Servicios</h2>
            <p>
              Compraventa, arriendo y administración de propiedades, asesorías inmobiliarias y legales, remodelaciones, gestión de créditos
              hipotecarios, asesorías financieras y otros servicios asociados al rubro.
            </p>
            <h3>Proyectos inmobiliarios</h3>
            <p>Contamos con proyectos inmobiliarios en venta.</p>
            <h3>Segunda vivienda</h3>
            <p>Ofrecemos propiedades para segunda vivienda en distintas regiones del país.</p>
            <h3>Dónde estamos</h3>
            <p>
              {SITIO.direccion}, {SITIO.comuna}. <a href={SITIO.telefonoHref}>{SITIO.telefono}</a> ·{' '}
              <a href={`mailto:${SITIO.email}`}>{SITIO.email}</a>
            </p>
            <Link href="/contacto" className="btn">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
      <WhatsAppFlotante />
    </>
  )
}
