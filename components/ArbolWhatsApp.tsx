'use client'
import { useState } from 'react'
import { track } from './track'
import { waLink, mensajeWeb } from '@/lib/sitio'
import { IconoWA } from './BotonWhatsApp'

// Mismo árbol que el agente de WhatsApp de CyM: qué busca → tipo → zona → nombre.
// El mensaje sale armado ("Vengo de la web…") y el agente deriva directo al corredor de la zona.
const OPERACIONES = [
  { id: 'comprar', label: 'Comprar una propiedad', frase: 'Quiero comprar' },
  { id: 'arrendar', label: 'Arrendar una propiedad', frase: 'Quiero arrendar' },
  { id: 'vender', label: 'Vender o publicar mi propiedad', frase: 'Quiero vender' },
  { id: 'codigo', label: 'Tengo el código de una propiedad', frase: '' },
]
const TIPOS = [
  { id: 'casa', label: 'Casa', frase: 'una casa' },
  { id: 'departamento', label: 'Departamento', frase: 'un departamento' },
]
const ZONAS = ['Vitacura', 'La Dehesa', 'Las Condes', 'San Carlos de Apoquindo', 'La Reina', 'Aún no lo sé']

export default function ArbolWhatsApp() {
  const [op, setOp] = useState<string>('')
  const [tipo, setTipo] = useState<string>('')
  const [zona, setZona] = useState<string>('')
  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')

  const operacion = OPERACIONES.find((o) => o.id === op)
  const tipoSel = TIPOS.find((t) => t.id === tipo)
  const paso = !op ? 1 : op === 'codigo' ? (codigo.length < 4 ? 2 : 4) : !tipo ? 2 : !zona ? 3 : 4

  const zonaTexto = zona && zona !== 'Aún no lo sé' ? ` en ${zona}` : ''
  const mensaje =
    op === 'codigo'
      ? mensajeWeb([`Me interesa la propiedad código ${codigo}.`, nombre && `Mi nombre es ${nombre.trim()}.`])
      : mensajeWeb([
          operacion && tipoSel && `${operacion.frase} ${op === 'vender' ? tipoSel.frase.replace(/^un[a]? /, 'mi ') : tipoSel.frase}${zonaTexto}.`,
          nombre && `Mi nombre es ${nombre.trim()}.`,
        ])

  function reiniciar() {
    setOp('')
    setTipo('')
    setZona('')
    setCodigo('')
  }

  return (
    <div className="arbol" aria-live="polite">
      <div className="arbol-cabecera">
        <span className="arbol-avatar">
          <IconoWA />
        </span>
        <div>
          <b>Asistente CyM</b>
          <small>Responde en segundos · te deriva al corredor de tu zona</small>
        </div>
      </div>

      <div className="arbol-cuerpo">
        <p className="burbuja">¡Hola! 👋 ¿Qué estás buscando?</p>
        {paso === 1 ? (
          <div className="opciones">
            {OPERACIONES.map((o) => (
              <button key={o.id} onClick={() => setOp(o.id)}>
                {o.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="burbuja yo">{operacion?.label}</p>
        )}

        {op === 'codigo' && paso >= 2 && (
          <>
            <p className="burbuja">¿Cuál es el código de la propiedad?</p>
            <input className="campo" inputMode="numeric" maxLength={5} placeholder="Ej: 5716" value={codigo} onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))} />
          </>
        )}

        {op && op !== 'codigo' && (
          <>
            <p className="burbuja">{op === 'vender' ? '¿Qué tipo de propiedad quieres vender?' : '¿Buscas casa o departamento?'}</p>
            {paso === 2 ? (
              <div className="opciones">
                {TIPOS.map((t) => (
                  <button key={t.id} onClick={() => setTipo(t.id)}>
                    {t.label}
                  </button>
                ))}
              </div>
            ) : (
              <p className="burbuja yo">{tipoSel?.label}</p>
            )}
          </>
        )}

        {op && op !== 'codigo' && paso >= 3 && (
          <>
            <p className="burbuja">{op === 'vender' ? '¿En qué zona está tu propiedad?' : '¿En qué zona del sector oriente?'}</p>
            {paso === 3 ? (
              <div className="opciones">
                {ZONAS.map((z) => (
                  <button key={z} onClick={() => setZona(z)}>
                    {z}
                  </button>
                ))}
              </div>
            ) : (
              <p className="burbuja yo">{zona}</p>
            )}
          </>
        )}

        {paso === 4 && (
          <>
            <p className="burbuja">¡Perfecto! ¿Cómo te llamas?</p>
            <input className="campo" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={60} />
            <a
              className="btn btn-wa ancho"
              href={waLink(mensaje)}
              target="_blank"
              rel="noopener"
              onClick={() => track('whatsapp', { origen: 'arbol_home', operacion: op, zona: zona || '' })}
            >
              <IconoWA /> Continuar en WhatsApp
            </a>
            <small className="nota">Se abrirá WhatsApp con tu mensaje listo. Solo tienes que enviarlo.</small>
          </>
        )}
        {op && (
          <button className="link-reiniciar" onClick={reiniciar}>
            Empezar de nuevo
          </button>
        )}
      </div>
    </div>
  )
}
