// Bloque con datos reales de CyM en la comuna (plan Google e IA, semana 2: que cada página «vender {tipo} {comuna}»
// tenga datos propios y no el mismo texto con la comuna cambiada). Fuente: avisos de venta de CyM, actualizados cada día.
import Link from 'next/link'
import { segmento } from '@/lib/mercado'
import { ACTUALIZADO, formatoUF, uf, titulo } from '@/lib/propiedades'

const fecha = (iso: string) => iso.split('-').reverse().join('-')

export default function MercadoComuna({ zona, nombre, tipo }: { zona: string; nombre: string; tipo: 'Casa' | 'Departamento' }) {
  const s = segmento(zona, tipo)
  if (!s) return null
  const plural = tipo === 'Casa' ? 'casas' : 'departamentos'
  const cerca = [...s.avisos].sort((a, b) => Math.abs(uf(a.precio) - s.mediana) - Math.abs(uf(b.precio) - s.mediana)).slice(0, 6)
  return (
    <section className="seccion" id="mercado">
      <div className="contenedor angosto articulo">
        <h2>
          {plural[0].toUpperCase() + plural.slice(1)} en venta en {nombre}: lo que muestran los avisos de CyM
        </h2>
        <p>
          Al {fecha(ACTUALIZADO)}, CyM Propiedades tiene <strong>{s.n} {plural} en venta</strong> publicados en {nombre}. El precio pedido mediano es{' '}
          <strong>{formatoUF(s.mediana)}</strong> y la mitad central de los avisos va de {formatoUF(s.p25)} a {formatoUF(s.p75)}.
          {s.m2 ? ` La superficie construida típica es de ${s.m2} m²` : ''}
          {s.m2 && s.terreno && tipo === 'Casa' ? `, sobre un terreno de ${s.terreno} m²` : ''}
          {s.m2 ? '.' : ''}
          {s.dorm ? ` Lo más común son ${s.dorm} dormitorios.` : ''}
        </p>
        <p className="nota">
          Es el precio publicado por los dueños, no el precio de cierre: la diferencia depende de la negociación y del estado de la propiedad. Ver{' '}
          <Link href="/datos-mercado-oriente">datos del mercado oriente</Link>.
        </p>
        <h3>Avisos de CyM cerca del precio mediano</h3>
        <ul className="lista-propiedades">
          {cerca.map((p) => (
            <li key={p.codigo}>
              <Link href={`/propiedades/${p.zona}/${p.codigo}`}>{titulo(p)}</Link>{' '}
              <span>
                {p.precio}
                {p.m2_construidos ? ` · ${p.m2_construidos} m²` : ''}
                {p.dormitorios ? ` · ${p.dormitorios} dorm.` : ''}
              </span>
            </li>
          ))}
        </ul>
        <p>
          <Link href={`/propiedades/${zona}`}>Ver todas las propiedades de CyM en {nombre}</Link>
        </p>
      </div>
    </section>
  )
}
