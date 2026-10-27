'use client'
import { useState } from 'react'
import { track } from './track'
import { waLink, mensajeWeb } from '@/lib/sitio'

const ZONAS = ['Vitacura', 'La Dehesa', 'Las Condes', 'San Carlos de Apoquindo', 'La Reina', 'Otra']

export default function FormularioContacto({ origen, zona = '', codigo = '' }: { origen: string; zona?: string; codigo?: string }) {
  const [estado, setEstado] = useState<'listo' | 'enviando' | 'ok' | 'error'>('listo')

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const datos = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setEstado('enviando')
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datos, origen, pagina: location.pathname }),
      })
      if (!r.ok) throw new Error(String(r.status))
      track('formulario', { origen, zona: datos.zona || '' })
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  if (estado === 'ok')
    return (
      <div className="form-ok">
        <b>¡Gracias! Recibimos tu mensaje.</b>
        <p>Un corredor de CyM te contactará a la brevedad.</p>
      </div>
    )

  return (
    <form className="formulario" onSubmit={enviar}>
      <div className="fila">
        <label>
          Nombre*
          <input name="nombre" required maxLength={80} autoComplete="name" />
        </label>
        <label>
          Teléfono*
          <input name="telefono" required type="tel" maxLength={20} placeholder="+56 9" autoComplete="tel" />
        </label>
      </div>
      <div className="fila">
        <label>
          Email*
          <input name="email" required type="email" maxLength={120} autoComplete="email" />
        </label>
        <label>
          ¿Qué necesitas?
          <select name="operacion" defaultValue="Comprar">
            <option>Comprar</option>
            <option>Arrendar</option>
            <option>Vender mi propiedad</option>
            <option>Otro</option>
          </select>
        </label>
      </div>
      <div className="fila">
        <label>
          Zona
          <select name="zona" defaultValue={zona}>
            <option value="">Selecciona</option>
            {ZONAS.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </label>
        <label>
          Código de propiedad
          <input name="codigo" defaultValue={codigo} maxLength={6} inputMode="numeric" />
        </label>
      </div>
      <label>
        Mensaje
        <textarea name="mensaje" rows={4} maxLength={1500} />
      </label>
      <input name="empresa" className="oculto" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
      {estado === 'error' && (
        <p className="form-error">
          No pudimos enviar el formulario.{' '}
          <a href={waLink(mensajeWeb([zona ? `Quiero cotizar propiedades en ${zona}.` : 'Quiero información de propiedades.']))} target="_blank" rel="noopener">
            Escríbenos por WhatsApp
          </a>{' '}
          o llama al +56 9 3401 8822.
        </p>
      )}
    </form>
  )
}
