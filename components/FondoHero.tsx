import Image from 'next/image'
import { PROPIEDADES } from '@/lib/propiedades'

// Foto real de una propiedad publicada como fondo de portada, con velo oscuro para que se lea el texto.
// Por defecto la casa 5716 (La Dehesa); si sale de campaña, la primera casa disponible.
export function fotoPortada(codigo = '5716') {
  return (PROPIEDADES.find((p) => p.codigo === codigo) || PROPIEDADES.find((p) => p.tipo === 'Casa') || PROPIEDADES[0])?.fotos[0]
}

export default function FondoHero({ src }: { src?: string }) {
  if (!src) return null
  return (
    <>
      <Image src={src} alt="" fill priority sizes="100vw" className="hero-fondo" />
      <span className="hero-velo" aria-hidden="true" />
    </>
  )
}
