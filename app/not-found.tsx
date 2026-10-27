import Link from 'next/link'

export default function NoEncontrada() {
  return (
    <section className="seccion">
      <div className="contenedor angosto centro">
        <h1>Esta propiedad ya no está publicada</h1>
        <p>Puede que se haya vendido o cambiado de código. Revisa las propiedades disponibles por zona.</p>
        <Link href="/" className="btn">
          Ver propiedades
        </Link>
      </div>
    </section>
  )
}
