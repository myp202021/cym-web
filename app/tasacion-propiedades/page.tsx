import FondoHero, { FONDOS } from '@/components/FondoHero'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import FormularioContacto from '@/components/FormularioContacto'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import Faq from '@/components/Faq'
import { mensajeWeb } from '@/lib/sitio'

export const metadata = {
  title: '¿Cuánto vale tu casa? Tasación de propiedades en Zona Oriente | CyM',
  description:
    'Tasación comercial de casas y departamentos en Vitacura, Las Condes, San Carlos de Apoquindo, La Dehesa, Lo Barnechea y La Reina. Sin costo y sin compromiso.',
  alternates: { canonical: '/tasacion-propiedades' },
}

const FACTORES = [
  'Ubicación y microzona',
  'Terreno y superficie construida',
  'Orientación y vistas',
  'Estado y distribución',
  'Atributos: piscina, jardín, condominio',
  'Comparables del sector',
  'Competencia y demanda activa',
]

const FAQ = [
  { q: '¿La tasación tiene costo?', a: 'No. La tasación comercial de CyM es sin costo y sin compromiso de venta.' },
  { q: '¿Qué diferencia hay entre tasación comercial y tasación bancaria?', a: 'La tasación bancaria la hace el banco para un crédito. La comercial estima el precio al que tu propiedad se puede vender hoy, según comparables y demanda de tu microzona.' },
  { q: '¿Qué datos necesitan?', a: 'Dirección, tipo de propiedad, metros de terreno y construidos, dormitorios y baños. Con eso partimos y luego coordinamos una visita.' },
  { q: '¿En qué comunas tasan?', a: 'Vitacura, Las Condes, San Carlos de Apoquindo, La Dehesa, Lo Barnechea y La Reina.' },
]

export default function Tasacion() {
  return (
    <>
      <section className="hero hero-zona">
        <FondoHero src={FONDOS.tasacion} />
        <div className="contenedor">
          <p className="sobretitulo">Tasación</p>
          <h1>Tasación de propiedades en Zona Oriente</h1>
          <p className="bajada">Conoce el valor comercial real de tu propiedad según su microzona, atributos y la demanda activa. Sin costo y sin compromiso.</p>
          <BotonWhatsApp texto="Solicitar tasación por WhatsApp" mensaje={mensajeWeb(['Quiero tasar mi propiedad.'])} origen="tasacion" />
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor dos-col">
          <div>
            <h2>¿Cuánto vale tu propiedad?</h2>
            <p>
              No hay dos propiedades iguales. Para estimar su valor revisamos los factores que de verdad mueven el precio en la Zona Oriente y te lo
              explicamos con datos, no con una cifra al aire.
            </p>
          </div>
          <ul className="chips">
            {FACTORES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>
      <Faq items={FAQ} />
      <section className="seccion gris" id="contacto">
        <div className="contenedor angosto">
          <h2>Solicita tu tasación</h2>
          <FormularioContacto origen="tasacion" propietario boton="Solicitar tasación" />
        </div>
      </section>
      <WhatsAppFlotante />
    </>
  )
}
