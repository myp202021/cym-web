'use client'
import { useEffect, useRef, useState } from 'react'
import { track } from './track'
import { waLink, mensajeWeb, WHATSAPP_ZONA } from '@/lib/sitio'
import { IconoWA } from './BotonWhatsApp'

// Asistente CyM (10 nov 2026, árbol definido por Christopher):
// Portada: Venta / Arriendo → comprar o vender (arrendar o dar en arriendo) → zona → nombre → consulta → WhatsApp.
// Zonas = 5 comunas (casas) + Departamentos como categoría aparte. Cada zona va a su director
// (misma regla del orgánico y el pagado, WHATSAPP_ZONA).
// Página de comuna: ya sabe la zona, no la pregunta. Ficha: parte desde la propiedad que la persona está viendo.
const ZONAS = ['Vitacura', 'La Dehesa', 'San Carlos de Apoquindo', 'Las Condes', 'La Reina', 'Departamentos']

const NEGOCIOS = [
  { id: 'venta', label: 'Venta' },
  { id: 'arriendo', label: 'Arriendo' },
]
const OPERACIONES: Record<string, { id: string; label: string }[]> = {
  venta: [
    { id: 'comprar', label: 'Comprar' },
    { id: 'vender', label: 'Vender' },
  ],
  arriendo: [
    { id: 'arrendar', label: 'Busco arrendar' },
    { id: 'dar', label: 'Quiero dar en arriendo' },
  ],
}
const INTERES = [
  { id: 'visitar', label: 'Quiero visitarla', frase: 'Quiero visitarla.' },
  { id: 'info', label: 'Quiero más información', frase: 'Quiero más información.' },
]

export type PropiedadAsistente = { codigo: string; tipo: string; zona: string }

function equipoDe(zona: string) {
  return zona === 'Departamentos' ? 'el equipo de Departamentos de CyM' : `el equipo de CyM en ${zona}`
}

function frase(op: string, zona: string) {
  const depto = zona === 'Departamentos'
  switch (op) {
    case 'comprar': return depto ? 'Quiero comprar un departamento.' : `Quiero comprar en ${zona}.`
    case 'vender': return depto ? 'Quiero vender mi departamento.' : `Quiero vender mi propiedad en ${zona}.`
    case 'arrendar': return depto ? 'Busco arrendar un departamento.' : `Busco arrendar en ${zona}.`
    case 'dar': return depto ? 'Quiero dar en arriendo mi departamento.' : `Quiero dar en arriendo mi propiedad en ${zona}.`
  }
  return ''
}

export default function ArbolWhatsApp({ origen = 'arbol_home', zonaInicial = '', propiedad }: { origen?: string; zonaInicial?: string; propiedad?: PropiedadAsistente }) {
  // En una ficha, la zona sale de la propiedad: departamentos → Departamentos; casas → su comuna.
  const zonaFija = propiedad ? (propiedad.tipo === 'Departamento' ? 'Departamentos' : propiedad.zona) : zonaInicial
  const [negocio, setNegocio] = useState('')
  const [op, setOp] = useState('')
  const [zona, setZona] = useState(zonaFija)
  const [interes, setInteres] = useState('')
  const [nombre, setNombre] = useState('')
  const [nombreOk, setNombreOk] = useState(false)
  const [consulta, setConsulta] = useState('')
  const [listo, setListo] = useState(false)

  const cuerpo = useRef<HTMLDivElement>(null)
  useEffect(() => { const c = cuerpo.current; if (c) c.scrollTo({ top: c.scrollHeight, behavior: 'smooth' }) }, [negocio, op, zona, interes, nombreOk, listo])

  const datosOk = propiedad ? !!interes : !!(op && zona)
  const nom = nombre.trim().split(' ')[0]
  const numero = WHATSAPP_ZONA[zona]
  const tipoArt = propiedad?.tipo === 'Departamento' ? 'el departamento' : 'la casa'
  const mensaje = mensajeWeb([
    propiedad
      ? `Me interesa ${tipoArt} código ${propiedad.codigo} en ${propiedad.zona}. ${INTERES.find((i) => i.id === interes)?.frase || ''}`.trim()
      : frase(op, zona),
    nombre && `Mi nombre es ${nombre.trim()}.`,
    consulta.trim() && `Consulta: ${consulta.trim()}`,
  ])

  function reiniciar() {
    setNegocio(''); setOp(''); setZona(zonaFija); setInteres(''); setNombre(''); setNombreOk(false); setConsulta(''); setListo(false)
  }

  const saludo = propiedad
    ? `Hola, soy el asistente de CyM Propiedades. ¿Te interesa ${tipoArt} código ${propiedad.codigo} en ${propiedad.zona}?`
    : zonaInicial
      ? `Hola, soy el asistente de ${zonaInicial === 'Departamentos' ? 'Departamentos de CyM Propiedades' : `CyM Propiedades en ${zonaInicial}`}. ¿Buscas venta o arriendo?`
      : 'Hola, soy el asistente de CyM Propiedades. ¿Buscas venta o arriendo?'

  return (
    <div className="arbol" aria-live="polite">
      <div className="arbol-cabecera">
        <span className="arbol-avatar"><IconoWA /></span>
        <div>
          <b>Asistente CyM</b>
          <small>Te conecta por WhatsApp con el equipo de tu zona</small>
        </div>
      </div>

      <div className="arbol-cuerpo" ref={cuerpo}>
        <p className="burbuja">{saludo}</p>

        {propiedad ? (
          !interes ? (
            <div className="opciones">
              {INTERES.map((i) => <button key={i.id} onClick={() => setInteres(i.id)}>{i.label}</button>)}
            </div>
          ) : (
            <p className="burbuja yo">{INTERES.find((i) => i.id === interes)?.label}</p>
          )
        ) : (
          <>
            {!negocio ? (
              <div className="opciones">
                {NEGOCIOS.map((n) => <button key={n.id} onClick={() => setNegocio(n.id)}>{n.label}</button>)}
              </div>
            ) : (
              <p className="burbuja yo">{NEGOCIOS.find((n) => n.id === negocio)?.label}</p>
            )}

            {negocio && (
              <>
                <p className="burbuja">{negocio === 'venta' ? '¿Quieres comprar o vender?' : '¿Buscas arrendar o quieres dar en arriendo?'}</p>
                {!op ? (
                  <div className="opciones">
                    {OPERACIONES[negocio].map((o) => <button key={o.id} onClick={() => setOp(o.id)}>{o.label}</button>)}
                  </div>
                ) : (
                  <p className="burbuja yo">{OPERACIONES[negocio].find((o) => o.id === op)?.label}</p>
                )}
              </>
            )}

            {op && !zonaInicial && (
              <>
                <p className="burbuja">{op === 'comprar' || op === 'arrendar' ? '¿En qué zona buscas?' : '¿Dónde está tu propiedad?'}</p>
                {!zona ? (
                  <div className="opciones">
                    {ZONAS.map((z) => <button key={z} onClick={() => setZona(z)}>{z}</button>)}
                  </div>
                ) : (
                  <p className="burbuja yo">{zona}</p>
                )}
              </>
            )}
          </>
        )}

        {datosOk && (
          <>
            <p className="burbuja">¿Cuál es tu nombre?</p>
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
            <p className="burbuja">¿Quieres agregar algo? Por ejemplo, dormitorios, presupuesto o cuándo puedes visitar. Si no, toca Enviar.</p>
            {!listo ? (
              <form className="fila-campo" onSubmit={(e) => { e.preventDefault(); setListo(true); track('whatsapp', { origen: origen + '_consulta', operacion: op || interes, zona }) }}>
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
            <p className="burbuja">Gracias, {nom}. Te contactará {equipoDe(zona)}. Toca el botón para enviarnos tu mensaje por WhatsApp.</p>
            <a className="btn btn-wa ancho" href={waLink(mensaje, numero)} target="_blank" rel="noopener"
              onClick={() => track('whatsapp', { origen, operacion: op || interes, zona, equipo: zona })}>
              <IconoWA /> Enviar por WhatsApp
            </a>
            <small className="nota">Se abrirá WhatsApp con tu mensaje listo. Solo tienes que enviarlo.</small>
          </>
        )}

        {(negocio || interes) && <button className="link-reiniciar" onClick={reiniciar}>Empezar de nuevo</button>}
      </div>
    </div>
  )
}
