import Image from 'next/image'

// Fondos de portada: las mismas fotos de casas del slider de cympropiedades.cl (13 nov 2026),
// para que el sitio se vea como el oficial. Sin velo oscuro: el texto va en un recuadro blanco.
const F = (n: number) => `/oficial/slider${n}.jpg`
export const FONDOS = {
  home: F(26),
  vitacura: F(27),
  'la-dehesa': F(26),
  'san-carlos-de-apoquindo': F(29),
  'las-condes': F(28),
  'la-reina': F(29),
  vender: F(28),
  tasacion: F(27),
  nosotros: F(28),
  contacto: F(26),
} as const

export default function FondoHero({ src }: { src?: string }) {
  if (!src) return null
  return (
    <>
      <Image src={src} alt="" fill priority sizes="100vw" className="hero-fondo" />
      <span className="hero-velo" aria-hidden="true" />
    </>
  )
}
