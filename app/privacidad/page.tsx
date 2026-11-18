import { SITIO } from '@/lib/sitio'

export const metadata = {
  title: 'Política de privacidad | CyM Propiedades',
  description: 'Cómo CyM Propiedades usa los datos que nos entregas en formularios web y de Instagram o Facebook.',
  alternates: { canonical: '/privacidad' },
  robots: { index: false, follow: true },
}

export default function Privacidad() {
  return (
    <section className="seccion">
      <div className="contenedor angosto">
        <h1>Política de privacidad</h1>
        <p>CyM Propiedades es responsable de los datos personales que nos entregas al completar un formulario en este sitio o en anuncios de Instagram y Facebook.</p>
        <h2>Qué datos pedimos</h2>
        <p>Nombre, teléfono, correo electrónico y la información de tu propiedad que tú indiques (por ejemplo, comuna y tipo de propiedad).</p>
        <h2>Para qué los usamos</h2>
        <p>Solo para contactarte por tu consulta: tasar tu propiedad, ayudarte a vender, comprar o responder lo que nos preguntaste. No vendemos ni cedemos tus datos a terceros.</p>
        <h2>Quién los ve</h2>
        <p>El equipo de CyM Propiedades y la agencia que administra nuestros anuncios, únicamente para gestionar tu consulta.</p>
        <h2>Tus derechos</h2>
        <p>Puedes pedir acceder, corregir o eliminar tus datos escribiendo a <a href={`mailto:${SITIO.email}`}>{SITIO.email}</a>, conforme a la Ley N° 19.628.</p>
      </div>
    </section>
  )
}
