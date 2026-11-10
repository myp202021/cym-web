'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { IconoWA } from './BotonWhatsApp'
import ArbolWhatsApp from './ArbolWhatsApp'

// Botón flotante: abre el Asistente CyM (mismo flujo del agente de WhatsApp) en un panel.
export default function WhatsAppFlotante({ zona }: { zona?: string }) {
  const [abierto, setAbierto] = useState(false)
  const ruta = usePathname()
  // En /propiedades/<zona>… la página pone su propio botón con la zona; el del layout no se duplica.
  if (!zona && /^\/propiedades\/[^/]+/.test(ruta || '')) return null
  return (
    <>
      {abierto && (
        <div className="asistente-panel" role="dialog" aria-label="Asistente CyM">
          <button className="asistente-cerrar" onClick={() => setAbierto(false)} aria-label="Cerrar asistente">×</button>
          <ArbolWhatsApp origen="flotante" zonaInicial={zona || ''} />
        </div>
      )}
      <button className="wa-flotante" onClick={() => setAbierto((v) => !v)} aria-label={abierto ? 'Cerrar asistente' : 'Hablar con el asistente de CyM'}>
        <IconoWA />
      </button>
    </>
  )
}
