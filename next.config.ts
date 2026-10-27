import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }, { protocol: 'https', hostname: 'www.cympropiedades.cl', pathname: '/Fotos/**' }],
  },
}

export default nextConfig
