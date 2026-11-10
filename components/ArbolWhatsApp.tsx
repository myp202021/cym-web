'use client'
import { useEffect, useRef, useState } from 'react'
import { track } from './track'
import { waLink, mensajeWeb, WHATSAPP_ZONA } from '@/lib/sitio'
import { CODIGOS } from '@/lib/codigos'
import { IconoWA } from './BotonWhatsApp'

// Asistente CyM (demo en la web, 10 nov 2026): replica el flujo del agente de WhatsApp de CyM
// (~/myp-whatsapp-agent, nodos web_nombre → web_consulta → web_derivar) sin conectar ningún bot.
// Qué busca → tipo → zona (o código) → nombre → consulta → "te contacta una ejecutiva de {zona}".
// Al final abre el WhatsApp de la ejecutiva de esa zona (WHATSAPP_ZONA) con el resumen armado; sin zona, el central.
const OPERACIONES = [
  { id: 'comprar', label: 'Comprar una propiedad', frase: 'Quiero comprar' },
  { id: 'vender', label: 'Vender mi propiedad', frase: 'Quiero vender' },
  { id: 'tasar', label: 'Tasar mi propiedad sin costo', frase: 'Quiero tasar' },
  { id: 'codigo', label: 'Tengo el código de una propiedad', frase: '' },
]
const TIPOS = [
  { id: 'casa', label: 'Casa', frase: 'una casa' },
  { id: 'departamento', label: 'Departamento', frase: 'un departamento' },
]
const ZONAS = ['Vitacura', 'La Dehesa', 'San Carlos de Apoquindo', 'Las Condes', 'La Reina', 'Aún no lo sé']

// Misma regla de derivación del agente: departamentos van a su ejecutiva; casas por zona.
function equipo(tipo: string, zona: string) {
  if (tipo === 'departamento') return 'Departamentos'
  if (!zona || zona === 'Aún no lo sé') return 'tu zona'
  return zona
}

export default function ArbolWhatsApp({ origen = 'arbol_home', zonaInicial = '' }: { origen?: string; zonaInicial?: string }) {
  const [op, setOp] = useState('')
  const [tipo, setTipo] = useState('')
  const [zona, setZona] = useState(zonaInicial)
  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [nombreOk, setNombreOk] = useState(false)
  const [consulta, setConsulta] = useState('')
  const [listo, setListo] = useState(false)

  const cuerpo = useRef<HTMLDivElement>(null)
  useEffect(() => { const c = cuerpo.current; if (c) c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' }) }, [op, tipo, zona, nombreOk, listo])

  const operacion = OPERACIONES.find((o) => o.id === op)
  const tipoSel = TIPOS.find((t) => t.id === tipo)
  const datosOk = op === 'codigo' ? codigo.length >= 4 : !!(op && tipo && zona)
  const nom = nombre.trim().split(' ')[0]
  const destino = op === 'codigo' ? 'la propiedad' : equipo(tipo, zona)
  // Con código: zona y tipo salen de la propiedad publicada; si no está, va al central.
  const prop = op === 'codigo' ? CODIGOS[codigo] : undefined
  const equipoFinal = op === 'codigo' ? (prop ? (prop.tipo === 'Departamento' ? 'Departamentos' : prop.zona) : '') : destino
  const numero = WHATSAPP_ZONA[equipoFinal]

  const zonaTexto = zona && zona !== 'Aún no lo sé' ? ` en ${zona}` : ''
  const mensaje =
    op === 'codigo'
      ? mensajeWeb([`Me interesa la propiedad código ${codigo}.`, nombre && `Mi nombre es ${nombre.trim()}.`, consulta && `Consulta: ${consulta.trim()}`])
      : mensajeWeb([
          operacion && tipoSel && `${operacion.frase} ${op === 'vender' || op === 'tasar' ? tipoSel.frase.replace(/^un[a]? /, 'mi ') : tipoSel.frase}${zonaTexto}.`,
          nombre && `Mi nombre es ${nombre.trim()}.`,
          consulta && `Consulta: ${consulta.trim()}`,
        ])

  function reiniciar() {
    setOp(''); setTipo(''); setZona(zonaInicial); setCodigo(''); setNombre(''); setNombreOk(false); setConsulta(''); setListo(false)
  }

  return (
    <div className="arbol" aria-live="polite">
      <div className="arbol-cabecera">
        <span className="arbol-avatar"><IconoWA /></span>
        <div>
          <b>Asistente CyM</b>
          <small>Responde en segundos · te deriva a la ejecutiva de tu zona</small>
        </div>
      </div>

      <div className="arbol-cuerpo" ref={cuerpo}>
        <p className="burbuja">¡Hola! Soy el asistente de CyM Propiedades 🏠 ¿Qué estás buscando?</p>
        {!op ? (
          <div className="opciones">
            {OPERACIONES.map((o) => <button key={o.id} onClick={() => setOp(o.id)}>{o.label}</button>)}
          </div>
        ) : (
          <p className="burbuja yo">{operacion?.label}</p>
        )}

        {op === 'codigo' && (
          <>
            <p className="burbuja">¿Cuál es el código de la propiedad?</p>
            {!nombreOk ? (
              <input className="campo" inputMode="numeric" maxLength={5} placeholder="Ej: 5716" value={codigo} onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))} />
            ) : (
              <p className="burbuja yo">{codigo}</p>
            )}
          </>
        )}

        {op && op !== 'codigo' && (
          <>
            <p className="burbuja">{op === 'comprar' ? '¿Buscas casa o departamento?' : '¿Qué tipo de propiedad es?'}</p>
            {!tipo ? (
              <div className="opciones">
                {TIPOS.map((t) => <button key={t.id} onClick={() => setTipo(t.id)}>{t.label}</button>)}
              </div>
            ) : (
              <p className="burbuja yo">{tipoSel?.label}</p>
            )}
          </>
        )}

        {op && op !== 'codigo' && tipo && (
          <>
            <p className="burbuja">{op === 'comprar' ? '¿En qué zona del sector oriente?' : '¿En qué zona está tu propiedad?'}</p>
            {!zona ? (
              <div className="opciones">
                {ZONAS.map((z) => <button key={z} onClick={() => setZona(z)}>{z}</button>)}
              </div>
            ) : (
              <p className="burbuja yo">{zona}</p>
            )}
          </>
        )}

        {datosOk && (
          <>
            <p className="burbuja">¿Me dices tu nombre?</p>
            {!nombreOk ? (
              <form className="fila-campo" onSubmit={(e) => { e.preventDefault(); if (nombre.trim().length > 1) setNombreOk(true) }}>
                <input className="campo" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={60} autoFocus />
                <button className="btn btn-wa" type="submit" disabled={nombre.trim().length < 2}>Enviar</button>
              </form>
            ) : (
              <p className="burbuja yo">{nombre.trim()}</p>
            )}
          </>
        )}

        {nombreOk && (
          <>
            <p className="burbuja">Gracias, {nom}. Cuéntame en una línea qué necesitas: dormitorios, presupuesto aproximado o cuándo te acomoda una visita.</p>
            {!listo ? (
              <form className="fila-campo" onSubmit={(e) => { e.preventDefault(); setListo(true); track('whatsapp', { origen: origen + '_consulta', operacion: op, zona: zona || '' }) }}>
                <input className="campo" placeholder="Ej: 4 dormitorios, hasta UF 20.000" value={consulta} onChange={(e) => setConsulta(e.target.value)} maxLength={200} autoFocus />
                <button className="btn btn-wa" type="submit">Enviar</button>
              </form>
            ) : (
              consulta.trim() && <p className="burbuja yo">{consulta.trim()}</p>
            )}
          </>
        )}

        {listo && (
          <>
            <p className="burbuja">
              ¡Listo, {nom}! 🙌 {op === 'codigo' ? 'Te contacta la ejecutiva a cargo de esa propiedad' : `Te contacta una ejecutiva de ${destino}`} a la brevedad. Toca el botón para enviarnos tu mensaje por WhatsApp.
            </p>
            <a className="btn btn-wa ancho" href={waLink(mensaje, numero)} target="_blank" rel="noopener"
              onClick={() => track('whatsapp', { origen, operacion: op, zona: zona || '', equipo: equipoFinal || 'central' })}>
              <IconoWA /> Enviar por WhatsApp
            </a>
            <small className="nota">Se abrirá WhatsApp con tu mensaje listo. Solo tienes que enviarlo.</small>
          </>
        )}

        {op && <button className="link-reiniciar" onClick={reiniciar}>Empezar de nuevo</button>}
      </div>
    </div>
  )
}
