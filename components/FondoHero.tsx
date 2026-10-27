import Image from 'next/image'

// Fondos de portada: fotos de Santiago oriente con la cordillera (Unsplash, licencia libre).
// Las fotos de las propiedades traen la marca de agua "CyM PROPIEDADES" al centro y de fondo se ven mal.
const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=1920&q=75&auto=format&fit=crop`
export const FONDOS = {
  home: U('1597006438013-0f0cca2c1a03'),
  vitacura: U('1593985437133-03d5e1435c03'),
  'la-dehesa': U('1689850543263-01a52ccc6943'),
  'las-condes': U('1566079463188-97d2f1352582'),
  'la-reina': U('1535479672101-8486af672be0'),
  vender: U('1593985437133-03d5e1435c03'),
  tasacion: U('1566079463188-97d2f1352582'),
  nosotros: U('1557974040-3bec341da09b'),
  contacto: U('1597006438013-0f0cca2c1a03'),
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
