# Landing CyM Propiedades

Next.js en Vercel. Cada cambio en `main` se publica solo: trabaja en una rama, revisa la vista previa y luego fusiona.

## Dónde se cambia cada cosa
- Texto único de CyM (portada, Quiénes somos, pie, schema, llms.txt): `DESCRIPCION` en `lib/sitio.ts`.
- Zonas y su orden: `lib/zonas.ts`.
- Propiedades: `data/propiedades.json`.
- Guías: `data/guias.json`.
- Teléfono, WhatsApp, dirección y medición: `lib/sitio.ts`.

## No romper
- Medición: `TRACKING` en `lib/sitio.ts` y los eventos de `components/track.ts`. Las campañas dependen de ellos.
- Sin arriendo en ninguna parte. Solo cifras con respaldo.
- Los precios y datos de cada ficha se toman de la ficha oficial en cympropiedades.cl.
- `robots.ts` debe seguir permitiendo GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot y Google-Extended.

## Antes de publicar
Corre `npm run build`. Al conectar el dominio definitivo, define `NEXT_PUBLIC_SITE_URL` en Vercel con esa dirección.
