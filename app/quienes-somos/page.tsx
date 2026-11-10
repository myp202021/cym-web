import FondoHero, { FONDOS } from '@/components/FondoHero'
import Link from 'next/link'
import Alianzas from '@/components/Alianzas'
import { SITIO, DESCRIPCION } from '@/lib/sitio'

export const metadata = {
  title: 'Quiénes somos | CyM Propiedades',
  description: DESCRIPCION,
  alternates: { canonical: '/quienes-somos' },
}

export default function QuienesSomos() {
  return (
    <>
      <section className="hero hero-zona">
        <FondoHero src={FONDOS.nosotros} />
        <div className="contenedor">
          <p className="sobretitulo">La empresa</p>
          <h1>Quiénes somos</h1>
          <p className="bajada">CyM Propiedades: venta de casas en Vitacura, La Dehesa y San Carlos de Apoquindo.</p>
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor dos-col">
          <div>
            <h2>CyM Propiedades</h2>
            <p>{DESCRIPCION}</p>
            <p>
              Trabajamos en Vitacura, La Dehesa (Lo Barnechea), San Carlos de Apoquindo, Las Condes y La Reina, con un corredor a cargo de cada zona. Así siempre hablas con alguien que conoce el barrio, los condominios y los valores a los que de verdad se cierran las ventas.
            </p>
            <ul className="cifras oscuro">
              <li><b>12 años</b> en el mercado</li>
              <li><b>+100.000</b> compradores en nuestra base</li>
              <li><b>Sin costo</b> tasación comercial</li>
            </ul>
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
              Venta y compra de casas, tasación sin costo, asesorías inmobiliarias y legales, gestión de créditos hipotecarios y asesorías financieras.
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
      <Alianzas />
    </>
  )
}
