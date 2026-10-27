'use client'
import { track } from './track'
import { waLink } from '@/lib/sitio'

export default function BotonWhatsApp({ texto, mensaje, origen, className = 'btn btn-wa' }: { texto: string; mensaje: string; origen: string; className?: string }) {
  return (
    <a className={className} href={waLink(mensaje)} target="_blank" rel="noopener" onClick={() => track('whatsapp', { origen })}>
      <IconoWA /> {texto}
    </a>
  )
}

export function IconoWA() {
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
      <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.2 10 10 5.3 16 5.3S26.8 10 26.8 15.8 22 26.4 16 26.4zm5.9-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.5 8.5 0 0 1-4.3-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.1 1.1-1.1 2.7 1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.9 2.1.9 2.9.9 3.9.8.6-.1 1.9-.8 2.2-1.5s.3-1.4.2-1.5c-.1-.2-.3-.3-.6-.4z" />
    </svg>
  )
}
