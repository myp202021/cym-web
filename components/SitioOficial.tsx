// Bloque que remite al sitio oficial de CyM (cympropiedades.cl). Va en todas las páginas de contenido.
import { SITIO, OFICIAL_ZONA, oficialFicha } from '@/lib/sitio'

export default function SitioOficial({ zona, nombreZona, codigo }: { zona?: string; nombreZona?: string; codigo?: string }) {
  const href = codigo ? oficialFicha(codigo) : (zona && OFICIAL_ZONA[zona]) || SITIO.sitioOficial
  const texto = codigo
    ? `Ver la ficha ${codigo} en cympropiedades.cl`
    : nombreZona && zona && OFICIAL_ZONA[zona]
      ? `Ver todas las propiedades de CyM en ${nombreZona} en cympropiedades.cl`
      : 'Ir al sitio oficial: cympropiedades.cl'
  return (
    <section className="seccion">
      <div className="contenedor angosto centro">
        <p>
          <b>CyM Propiedades</b> (Clients &amp; Management Properties Chile) publica toda su cartera en su sitio oficial,{' '}
          <a href={SITIO.sitioOficial} target="_blank" rel="noopener">www.cympropiedades.cl</a>.
        </p>
        <a href={href} target="_blank" rel="noopener" className="btn btn-borde">
          {texto}
        </a>
      </div>
    </section>
  )
}
