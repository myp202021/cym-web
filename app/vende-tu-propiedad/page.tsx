import FondoHero, { FONDOS } from '@/components/FondoHero'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Faq from '@/components/Faq'
import Link from 'next/link'
import { mensajeWeb } from '@/lib/sitio'

export const metadata = {
  title: 'Vende tu propiedad en Zona Oriente — tasación y estrategia | CyM',
  description:
    'Vende tu casa o departamento en Vitacura, Las Condes, San Carlos de Apoquindo, La Dehesa, Lo Barnechea o La Reina con un proceso de venta basado en información de mercado.',
  alternates: { canonical: '/vende-tu-propiedad' },
}

const PASOS = [
  { t: 'Evaluación comercial', d: 'Visitamos la propiedad y revisamos sus atributos, documentos y estado.' },
  { t: 'Análisis de mercado', d: 'Comparables reales de la microzona, competencia y demanda activa.' },
  { t: 'Estrategia de precio', d: 'Un precio de salida defendible, con datos, para vender en buen plazo.' },
  { t: 'Presentación', d: 'Fotos, descripción y material para mostrar la propiedad en su mejor versión.' },
  { t: 'Marketing', d: 'Campañas por zona, redes, nuestra base de compradores y los principales portales.' },
  { t: 'Calificación de compradores', d: 'Filtramos interesados y priorizamos a quienes tienen financiamiento.' },
  { t: 'Visitas y seguimiento', d: 'Coordinamos visitas y te informamos de cada interesado.' },
  { t: 'Negociación', d: 'Negociamos en tu nombre para cerrar al mejor valor posible.' },
  { t: 'Cierre', d: 'Te acompañamos con la revisión legal, la promesa y la escritura.' },
]

const FAQ = [
  { q: '¿Cuánto vale mi propiedad?', a: 'Te hacemos una tasación comercial con referencias del sector. Escríbenos por WhatsApp o deja tus datos en el formulario.' },
  { q: '¿Cuánto demora vender una casa?', a: 'Depende del precio de salida, la microzona y la demanda del momento. Con un precio bien definido desde el inicio, los plazos se acortan; en la evaluación te damos una estimación para tu caso.' },
  { q: '¿Dónde publican las propiedades?', a: 'En los principales portales del país, en el sitio de CyM, en redes y en campañas por zona, además de nuestra base de compradores.' },
  { q: '¿También arriendan y administran?', a: 'Sí. CyM arrienda y administra propiedades, con contrato, cobranza y seguimiento.' },
  { q: '¿En qué comunas trabajan?', a: 'Vitacura, Las Condes, San Carlos de Apoquindo, La Dehesa, Lo Barnechea y La Reina.' },
]

export default function Vende() {
  return (
    <>
      <section className="hero hero-zona">
        <FondoHero src={FONDOS.vender} />
        <div className="contenedor">
          <p className="sobretitulo">Propietarios</p>
          <h1>Vende tu propiedad con especialistas en Zona Oriente</h1>
          <p className="bajada">
            Metodología, precio, posicionamiento, marketing, compradores calificados, visitas, ofertas, negociación y cierre, con información de mercado
            propia.
          </p>
          <BotonWhatsApp texto="Quiero vender por WhatsApp" mensaje={mensajeWeb(['Quiero vender mi propiedad.'])} origen="vende" />
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor">
          <h2>Vende con un proceso, no con improvisación</h2>
          <p className="intro-seccion">Conocimiento de mercado, compradores activos, estrategia comercial, marketing y negociación.</p>
          <ol className="pasos">
            {PASOS.map((p) => (
              <li key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </li>
            ))}
          </ol>
          <p>
            ¿Prefieres arrendar? También <Link href="/contacto">arrendamos y administramos</Link> propiedades.
          </p>
        </div>
      </section>
      <Faq items={FAQ} />
      <section className="seccion gris" id="contacto">
        <div className="contenedor angosto">
          <h2>Solicita una evaluación</h2>
          <FormularioContacto origen="vende" propietario boton="Solicitar evaluación" />
        </div>
      </section>
      <WhatsAppFlotante />
    </>
  )
}
