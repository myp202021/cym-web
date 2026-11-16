// "CyM en <comuna> en cifras": cartera publicada hoy en el sitio oficial, con fecha y fuente.
import Link from 'next/link'
import { CARTERA, carteraDe, fechaCartera } from '@/lib/cartera'
import { formatoUF } from '@/lib/propiedades'

export function filasCartera(slug: string) {
  const c = carteraDe(slug)
  if (!c) return []
  const f: [string, string][] = [
    ['Propiedades en venta publicadas', `${c.venta}`],
    ['Casas', `${c.casas}`],
    ['Departamentos', `${c.departamentos}`],
  ]
  if (c.otros) f.push(['Otros (sitios, oficinas, parcelas)', `${c.otros}`])
  if (c.min_uf && c.max_uf) f.push(['Rango de precios publicados', `${formatoUF(c.min_uf)} a ${formatoUF(c.max_uf)}`])
  if (c.mediana_uf) f.push(['Precio mediano publicado', formatoUF(c.mediana_uf)])
  return f
}

export default function CarteraCyM({ slug, nombre }: { slug: string; nombre: string }) {
  const c = carteraDe(slug)
  if (!c || !c.venta) return null
  return (
    <section className="seccion" id="cifras">
      <div className="contenedor angosto">
        <h2>CyM Propiedades en {nombre} en cifras</h2>
        <p className="intro-seccion">
          Al {fechaCartera()}, CyM Propiedades tiene <b>{c.venta} propiedades en venta publicadas en {c.comuna_ficha}</b>
          {c.nota ? ` (${c.nota})` : ''}. Es el conteo de su cartera en el{' '}
          <a href={CARTERA.fuente} target="_blank" rel="noopener">sitio oficial de CyM</a>, no una estimación.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="tabla-ranking">
            <thead>
              <tr>
                <th>Dato</th>
                <th>{c.comuna_ficha}</th>
              </tr>
            </thead>
            <tbody>
              {filasCartera(slug).map(([d, v]) => (
                <tr key={d}>
                  <td>{d}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {c.sectores.length > 1 && (
          <p>
            Referencias de ubicación más usadas en las fichas de CyM en {nombre}: {c.sectores.join(', ')}.
          </p>
        )}
        <p>
          <Link href={`/propiedades/${slug}`}>Ver propiedades de CyM en {nombre}</Link> · Oficina: Av. La Dehesa 1844, of. 313, Lo Barnechea.
        </p>
      </div>
    </section>
  )
}
