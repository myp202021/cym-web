'use client'
// "Haz la cuenta" (reel 09): m² de terreno × UF/m² de la microzona = terreno (80%); la casa suma 20% del total (= terreno / 4).
import { useState } from 'react'
import { MICROZONAS } from '@/lib/barrio3d'
import { waLink, mensajeWeb } from '@/lib/sitio'
import { track } from './track'

const uf = (n: number) => 'UF ' + Math.round(n).toLocaleString('es-CL')

export default function CalculadoraB3D() {
  const [zona, setZona] = useState('Polo')
  const [m2, setM2] = useState(500)
  const valor = MICROZONAS.find((z) => z.nombre === zona)?.uf || 0
  const terreno = Math.max(0, m2) * valor
  const casa = terreno / 4
  const total = terreno + casa
  const mensaje = mensajeWeb([`Quiero vender mi casa en Vitacura (${zona}, ${m2} m² de terreno). Hice la cuenta en la web: ${uf(total)} referencial. Quiero una tasación sin costo.`])

  return (
    <div className="calc">
      <div className="calc-campos">
        <label>
          <span className="mono">Microzona · Vitacura</span>
          <select value={zona} onChange={(e) => setZona(e.target.value)}>
            {MICROZONAS.map((z) => (
              <option key={z.nombre} value={z.nombre}>
                {z.nombre} · UF {z.uf}/m²
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mono">m² de terreno</span>
          <input type="number" inputMode="numeric" min={100} max={5000} step={10} value={m2} onChange={(e) => setM2(Number(e.target.value) || 0)} />
        </label>
      </div>
      <dl className="calc-cuenta" aria-live="polite">
        <div>
          <dt className="mono">{m2.toLocaleString('es-CL')} m² × UF {valor} · terreno = 80%</dt>
          <dd>{uf(terreno)}</dd>
        </div>
        <div>
          <dt className="mono">casa = 20%</dt>
          <dd>+ {uf(casa)}</dd>
        </div>
        <div className="calc-total">
          <dt className="mono">Precio de mercado referencial =</dt>
          <dd>{uf(total)}</dd>
        </div>
      </dl>
      <p className="calc-nota">Referencial. La casa se ajusta por calidad, terminaciones y regularización. El precio real lo define una tasación con comparables de tu manzana.</p>
      <a className="btn-b3d" href={waLink(mensaje)} target="_blank" rel="noopener" onClick={() => track('whatsapp', { origen: 'b3d_calculadora' })}>
        Tasación sin costo
      </a>
    </div>
  )
}
