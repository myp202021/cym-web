'use client'
import { useState } from 'react'
import { track } from './track'
import { waLink, mensajeWeb } from '@/lib/sitio'

const ZONAS = ['Vitacura', 'La Dehesa', 'Las Condes', 'San Carlos de Apoquindo', 'La Reina', 'Otra']

export default function FormularioContacto({ origen, zona = '', codigo = '' }: { origen: string; zona?: string; codigo?: string }) {
  const [estado, setEstado] = useState<'listo' | 'ok'>('listo')

  // Mientras CyM no tenga cuenta de envío de correo propia, el formulario arma el mensaje y abre el WhatsApp central.
  // Cuando la tengan, volver a llamar a /api/contacto.
  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    if (d.empresa) return
    const texto = mensajeWeb([
      d.nombre && `Mi nombre es ${d.nombre}.`,
      d.operacion && d.operacion !== 'Otro' && `Quiero ${d.operacion.toLowerCase()}.`,
      d.zona && `Zona: ${d.zona}.`,
      d.codigo && `Código ${d.codigo}.`,
      d.telefono && `Teléfono: ${d.telefono}.`,
      d.email && `Email: ${d.email}.`,
      d.mensaje,
    ])
    track('formulario', { origen, zona: d.zona || '' })
    window.open(waLink(texto), '_blank', 'noopener')
    setEstado('ok')
  }

  if (estado === 'ok')
    return (
      <div className="form-ok">
        <b>¡Gracias! Te abrimos WhatsApp con tus datos.</b>
        <p>Envía el mensaje y un corredor de CyM te contactará a la brevedad.</p>
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
          Email
          <input name="email" type="email" maxLength={120} autoComplete="email" />
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
      <button className="btn">Enviar por WhatsApp</button>
    </form>
  )
}
