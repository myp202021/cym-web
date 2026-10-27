import FondoHero, { fotoPortada } from '@/components/FondoHero'
import FormularioContacto from '@/components/FormularioContacto'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import { SITIO, mensajeWeb } from '@/lib/sitio'

export const metadata = {
  title: 'Contacto | CyM Propiedades',
  description: 'Contacta a CyM Propiedades por WhatsApp, teléfono +56 9 3401 8822 o formulario. Oficina en Av. La Dehesa 1844, Lo Barnechea.',
  alternates: { canonical: '/contacto' },
}

export default function Contacto() {
  return (
    <>
      <section className="hero hero-zona">
        <FondoHero src={fotoPortada('5985')} />
        <div className="contenedor">
          <p className="sobretitulo">Contacto</p>
          <h1>Conversemos sobre tu propiedad</h1>
          <p className="bajada">
            {SITIO.direccion}, {SITIO.comuna} · <a href={SITIO.telefonoHref}>{SITIO.telefono}</a> · <a href={`mailto:${SITIO.email}`}>{SITIO.email}</a>
          </p>
          <BotonWhatsApp texto="Escríbenos por WhatsApp" mensaje={mensajeWeb(['Quiero información de propiedades.'])} origen="contacto" />
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor angosto">
          <h2>Formulario de contacto</h2>
          <p className="intro-seccion">Responde en menos de un minuto. Un corredor de CyM te contactará a la brevedad.</p>
          <FormularioContacto origen="contacto" />
        </div>
      </section>
      <WhatsAppFlotante />
    </>
  )
}
