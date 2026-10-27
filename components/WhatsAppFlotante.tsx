'use client'
import { track } from './track'
import { waLink, mensajeWeb } from '@/lib/sitio'
import { IconoWA } from './BotonWhatsApp'

export default function WhatsAppFlotante({ zona }: { zona?: string }) {
  const mensaje = mensajeWeb([zona ? `Quiero cotizar propiedades en ${zona}.` : 'Quiero información de propiedades.'])
  return (
    <a className="wa-flotante" href={waLink(mensaje)} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp" onClick={() => track('whatsapp', { origen: 'flotante' })}>
      <IconoWA />
    </a>
  )
}
