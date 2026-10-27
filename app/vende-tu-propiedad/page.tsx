import BotonWhatsApp from '@/components/BotonWhatsApp'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Faq from '@/components/Faq'
import Link from 'next/link'
import { mensajeWeb } from '@/lib/sitio'

export const metadata = {
  title: 'Vende tu propiedad en el sector oriente | CyM Propiedades',
  description:
    'Vende tu casa o departamento en Vitacura, Las Condes, La Dehesa o La Reina con CyM: tasación comercial, publicación en los principales portales y acompañamiento hasta la escritura.',
  alternates: { canonical: '/vende-tu-propiedad' },
}

const PASOS = [
  { t: 'Tasación comercial', d: 'Visitamos la propiedad y te proponemos un precio de publicación con referencias reales del sector.' },
  { t: 'Preparación y fotos', d: 'Ordenamos la información, los documentos y el material para publicar.' },
  { t: 'Publicación y difusión', d: 'Publicamos en los principales portales del país, en nuestro sitio y en redes, con campañas por zona.' },
  { t: 'Visitas y negociación', d: 'Filtramos interesados, coordinamos visitas y negociamos en tu nombre.' },
  { t: 'Cierre', d: 'Te acompañamos con la revisión legal, la promesa y la escritura.' },
]

const FAQ = [
  { q: '¿Cuánto vale mi propiedad?', a: 'Te hacemos una tasación comercial con referencias del sector. Escríbenos por WhatsApp o deja tus datos en el formulario.' },
  { q: '¿Dónde publican las propiedades?', a: 'En los principales portales inmobiliarios del país, en el sitio de CyM y en nuestras redes y campañas por zona.' },
  { q: '¿También arriendan y administran?', a: 'Sí. CyM arrienda y administra propiedades, con contrato, cobranza y seguimiento.' },
  { q: '¿En qué comunas trabajan?', a: 'Principalmente en Vitacura, Las Condes, Lo Barnechea (La Dehesa) y La Reina.' },
]

export default function Vende() {
  return (
    <>
      <section className="hero hero-zona">
        <div className="contenedor">
          <p className="sobretitulo">Propietarios</p>
          <h1>Vende tu propiedad con CyM</h1>
          <p className="bajada">Seriedad y confianza en la gestión de tu propiedad, con un corredor que conoce tu barrio.</p>
          <BotonWhatsApp texto="Quiero vender por WhatsApp" mensaje={mensajeWeb(['Quiero vender mi propiedad.'])} origen="vende" />
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor">
          <h2>Cómo vendemos tu propiedad</h2>
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
          <h2>Solicita una tasación</h2>
          <FormularioContacto origen="vende" />
        </div>
      </section>
      <WhatsAppFlotante />
    </>
  )
}
