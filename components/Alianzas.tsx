// Alianzas publicadas por CyM en su Instagram (@cym_propiedades, bio y posts del 16 sep 2025 y 27 ago 2026).
const ALIANZAS = [
  { nombre: 'Bci', texto: 'Crédito preaprobado: conoce tu capacidad de compra antes de elegir y avanza con más seguridad.' },
  { nombre: 'IKEA', texto: 'Compra una casa con CyM y obtén un 15% de descuento en IKEA para amoblar tu nuevo hogar.' },
  { nombre: 'Fundamenta', texto: 'Alianza con Fundamenta para ofrecer proyectos inmobiliarios.' },
]

export default function Alianzas() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <h2>Nuestras alianzas</h2>
        <p className="intro-seccion">Beneficios para quienes compran con CyM.</p>
        <ul className="alianzas">
          {ALIANZAS.map((a) => (
            <li key={a.nombre}>
              <b>{a.nombre}</b>
              <p>{a.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
