'use client'
import { useState } from 'react'
import { track } from './track'
import { waLink, mensajeWeb } from '@/lib/sitio'

const ZONAS = ['Vitacura', 'Las Condes', 'San Carlos de Apoquindo', 'La Dehesa', 'Lo Barnechea', 'La Reina', 'Otra']

export default function FormularioContacto({
  origen,
  zona = '',
  codigo = '',
  propietario = false,
  boton = 'Enviar por WhatsApp',
}: {
  origen: string
  zona?: string
  codigo?: string
  propietario?: boolean
  boton?: string
}) {
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
      d.direccion && `Dirección: ${d.direccion}.`,
      d.tipo && `Tipo: ${d.tipo}.`,
      d.terreno && `Terreno: ${d.terreno} m².`,
      d.construida && `Construidos: ${d.construida} m².`,
      d.dormitorios && `${d.dormitorios} dormitorios.`,
      d.banos && `${d.banos} baños.`,
      d.precio && `Precio esperado: ${d.precio}.`,
      d.fecha && `Fecha estimada de venta: ${d.fecha}.`,
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
          <select name="operacion" defaultValue={propietario ? 'Vender mi propiedad' : 'Comprar'}>
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
      {propietario && (
        <>
          <div className="fila">
            <label>
              Dirección
              <input name="direccion" maxLength={120} autoComplete="street-address" />
            </label>
            <label>
              Tipo de propiedad
              <select name="tipo" defaultValue="Casa">
                <option>Casa</option>
                <option>Departamento</option>
                <option>Terreno</option>
                <option>Otro</option>
              </select>
            </label>
          </div>
          <div className="fila">
            <label>
              Terreno (m²)
              <input name="terreno" maxLength={8} inputMode="numeric" />
            </label>
            <label>
              Superficie construida (m²)
              <input name="construida" maxLength={8} inputMode="numeric" />
            </label>
          </div>
          <div className="fila">
            <label>
              Dormitorios
              <input name="dormitorios" maxLength={2} inputMode="numeric" />
            </label>
            <label>
              Baños
              <input name="banos" maxLength={2} inputMode="numeric" />
            </label>
          </div>
          <div className="fila">
            <label>
              Precio esperado (UF)
              <input name="precio" maxLength={20} />
            </label>
            <label>
              Fecha estimada de venta
              <input name="fecha" maxLength={40} placeholder="Ej.: marzo 2027" />
            </label>
          </div>
        </>
      )}
      <label>
        Mensaje
        <textarea name="mensaje" rows={4} maxLength={1500} />
      </label>
      <input name="empresa" className="oculto" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn">{boton}</button>
    </form>
  )
}
