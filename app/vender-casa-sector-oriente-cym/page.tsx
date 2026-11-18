// Versión 2 de la landing Barrio 3D con la identidad de CyM (blanco, rojo #eb3d60, negro, Raleway), pedido de Christopher 18 nov 2026.
// Mismo contenido y componentes que /vender-casa-sector-oriente (se reutiliza la página tal cual; solo cambia el estilo con .b3d-cym).
// Solo para comparar: noindex,follow + canonical a la versión 1; fuera del sitemap, llms.txt e IndexNow y sin enlaces internos.
import type { Metadata } from 'next'
import VenderCasaSectorOriente from '../vender-casa-sector-oriente/page'

export const metadata: Metadata = {
  title: 'Vender casa en el sector oriente: cuánto vale y cómo venderla | CyM',
  description:
    'Cuánto vale tu casa en Vitacura, La Dehesa, San Carlos de Apoquindo, Las Condes o La Reina: terreno, microzona, regularización y precio correcto, explicado en 10 videos 3D.',
  alternates: { canonical: '/vender-casa-sector-oriente' },
  robots: { index: false, follow: true },
}

export default function VenderCasaSectorOrienteCyM() {
  return (
    <div className="b3d-cym">
      <VenderCasaSectorOriente />
    </div>
  )
}
