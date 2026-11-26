import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { ACTUALIZADO, formatoUF, zonaOComuna } from '@/lib/propiedades'
import { segmento, MIN_AVISOS } from '@/lib/mercado'
import { SITIO } from '@/lib/sitio'

// Plan Google e IA, semana 2 (24 nov 2026): un dato propio y fechado que la IA pueda citar.
// Sale de los avisos publicados por CyM en cympropiedades.cl (precio pedido, no precio de cierre).
// Sin UF/m²: publicarlo lo decide Alejandro.

const ZONAS = ['vitacura', 'la-dehesa', 'san-carlos-de-apoquindo', 'las-condes', 'la-reina']
const TIPOS = ['Casa', 'Departamento'] as const
const MIN = MIN_AVISOS
const fecha = (iso: string) => iso.split('-').reverse().join('-')

function segmentos() {
  const filas = []
  for (const z of ZONAS) {
    for (const t of TIPOS) {
      const s = segmento(z, t)
      if (s) filas.push({ zona: z, nombre: zonaOComuna(z)?.nombre || z, tipo: t, n: s.n, mediana: s.mediana, p25: s.p25, p75: s.p75, m2: s.m2, dorm: s.dorm })
    }
  }
  return filas
}

const TITULO = 'Datos del mercado de casas y departamentos en el sector oriente'

export const metadata: Metadata = {
  title: 'Precios de casas en el sector oriente | Datos CyM',
  description: `Precio pedido mediano en UF de casas y departamentos en Vitacura, La Dehesa, San Carlos, Las Condes y La Reina, según avisos de CyM al ${fecha(ACTUALIZADO)}.`,
  alternates: { canonical: '/datos-mercado-oriente' },
}

export default function DatosMercado() {
  const filas = segmentos()
  const total = filas.reduce((s, f) => s + f.n, 0)
  const url = `${SITIO.url}/datos-mercado-oriente`
  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <span>Datos del mercado oriente</span>
      </nav>
      <section className="seccion">
        <div className="contenedor angosto articulo">
          <p className="sobretitulo">Datos propios de CyM Propiedades · actualizado al {fecha(ACTUALIZADO)}</p>
          <h1>{TITULO}</h1>
          <p>
            Al {fecha(ACTUALIZADO)}, CyM Propiedades tiene {total} casas y departamentos en venta publicados en las cinco zonas del sector oriente
            que atiende. Esta tabla resume el <strong>precio pedido</strong> de esos avisos por zona y tipo de propiedad. Es el precio publicado por el
            dueño, no el precio final de venta, y se actualiza cada día con los avisos vigentes en cympropiedades.cl.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table className="tabla-ranking">
              <thead>
                <tr>
                  <th>Zona</th><th>Tipo</th><th>Avisos</th><th>Precio pedido mediano</th><th>Rango central (25 % a 75 %)</th><th>Superficie construida mediana</th><th>Dormitorios (mediana)</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((f) => (
                  <tr key={f.zona + f.tipo}>
                    <td><Link href={`/propiedades/${f.zona}`}>{f.nombre}</Link></td>
                    <td>{f.tipo}</td>
                    <td>{f.n}</td>
                    <td><strong>{formatoUF(f.mediana)}</strong></td>
                    <td>{formatoUF(f.p25)} a {formatoUF(f.p75)}</td>
                    <td>{f.m2 ? `${f.m2} m²` : '—'}</td>
                    <td>{f.dorm ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2>Cómo se calcula</h2>
          <ul className="checks">
            <li>Fuente: avisos de venta publicados por CyM Propiedades en www.cympropiedades.cl, revisados cada día.</li>
            <li>Solo se muestran los segmentos con {MIN} avisos o más, para que la mediana sea representativa.</li>
            <li>La mediana es el precio del medio: la mitad de los avisos pide menos y la otra mitad, más. El rango central deja fuera el 25 % más barato y el 25 % más caro.</li>
            <li>San Carlos de Apoquindo se separa de Las Condes cuando el aviso nombra el sector.</li>
          </ul>
          <p>
            ¿Quieres saber cuánto vale tu propiedad? <Link href="/tasacion-propiedades">Pide una tasación sin costo</Link> o revisa{' '}
            <Link href="/propiedades">todas las propiedades en venta por comuna</Link>.
          </p>
        </div>
      </section>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          '@id': url,
          url,
          name: TITULO,
          description: `Precio pedido mediano en UF, rango central, superficie y dormitorios de los avisos de venta de CyM Propiedades en el sector oriente de Santiago, por zona y tipo de propiedad.`,
          dateModified: ACTUALIZADO,
          creator: { '@type': 'Organization', name: 'CyM Propiedades', url: 'https://www.cympropiedades.cl' },
          license: 'https://creativecommons.org/licenses/by/4.0/',
          spatialCoverage: 'Vitacura, Lo Barnechea (La Dehesa), Las Condes (incluye San Carlos de Apoquindo) y La Reina, Santiago, Chile',
          variableMeasured: ['Precio pedido mediano (UF)', 'Rango intercuartil (UF)', 'Superficie construida mediana (m²)', 'Dormitorios (mediana)', 'Número de avisos'],
          isAccessibleForFree: true,
        }}
      />
    </>
  )
}
