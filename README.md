# cym-web — landing CyM Propiedades (M&P)

Next.js (App Router). Home con árbol de WhatsApp, una página por zona (Vitacura, La Dehesa, Las Condes + San Carlos de Apoquindo, La Reina),
una ficha por propiedad en campaña, vende tu propiedad, quiénes somos y contacto.

- **Propiedades**: `npm run propiedades` (lee los códigos con gasto del mes en `~/cym-dashboard/data/seguimiento-AAAA-MM.json` y baja la ficha oficial de cympropiedades.cl) → `data/propiedades.json` → commit + push.
- **WhatsApp**: todos los botones abren el número del agente (`lib/sitio.ts`, WHATSAPP_AGENTE) con un mensaje "Vengo de la web…". El agente (`~/myp-whatsapp-agent`, nodos `web_*`) pregunta lo que falta y deriva al corredor de la zona.
- **Formulario**: `/api/contacto` → correo a contacto@cympropiedades.cl (copia oculta a christopher@). Variables en Vercel: `GMAIL_USER`, `GMAIL_APP_PASSWORD`.
- **Seguimiento**: GTM-57H283KW, GA4 G-52T9G8JFN6, Pixel 2684262525251873 (los mismos del sitio oficial). Eventos: `Contact`/`click_whatsapp` y `Lead`/`generate_lead`.
- **SEO**: title/description/canonical por página, H1 único, schema RealEstateAgent, CollectionPage, ItemList, SingleFamilyResidence/Apartment + RealEstateListing + Offer (CLF), FAQPage, BreadcrumbList. sitemap.xml y robots.txt.
- **IndexNow**: clave en `public/<clave>.txt`; después de cada deploy: `NEXT_PUBLIC_SITE_URL=https://<dominio> npm run indexnow`.
- **Dominio**: definir `NEXT_PUBLIC_SITE_URL` en Vercel (canonical, sitemap y schema la usan).
