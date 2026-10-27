import type { MetadataRoute } from 'next'
import { SITIO } from '@/lib/sitio'
import { ZONAS } from '@/lib/zonas'
import { PROPIEDADES, ACTUALIZADO } from '@/lib/propiedades'

export default function sitemap(): MetadataRoute.Sitemap {
  const fecha = new Date(ACTUALIZADO)
  return [
    { url: `${SITIO.url}/`, lastModified: fecha, changeFrequency: 'weekly', priority: 1 },
    ...ZONAS.map((z) => ({ url: `${SITIO.url}/propiedades/${z.slug}`, lastModified: fecha, changeFrequency: 'weekly' as const, priority: 0.9 })),
    ...PROPIEDADES.map((p) => ({ url: `${SITIO.url}/propiedades/${p.zona}/${p.codigo}`, lastModified: fecha, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...['vende-tu-propiedad', 'quienes-somos', 'contacto'].map((r) => ({ url: `${SITIO.url}/${r}`, lastModified: fecha, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
