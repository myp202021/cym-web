import type { NextConfig } from 'next'

const COMUNAS_FUSIONADAS = ['vitacura', 'la-dehesa', 'san-carlos-de-apoquindo', 'las-condes', 'la-reina']

const nextConfig: NextConfig = {
  // 24 nov 2026: «Mejores corredoras en {comuna}» se fusionó con la página de la comuna (ver lib/paginas.ts).
  async redirects() {
    return COMUNAS_FUSIONADAS.map((c) => ({ source: `/corredoras-de-propiedades-${c}`, destination: `/${c}#elegir-corredora`, permanent: true }))
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }, { protocol: 'https', hostname: 'www.cympropiedades.cl', pathname: '/Fotos/**' }, { protocol: 'https', hostname: 'www.cympropiedades.cl', pathname: '/fotos/**' }],
  },
}

export default nextConfig
