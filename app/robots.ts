import type { MetadataRoute } from 'next'
import { SITIO } from '@/lib/sitio'

const BOTS_IA = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }, ...BOTS_IA.map((userAgent) => ({ userAgent, allow: '/', disallow: '/api/' }))],
    sitemap: `${SITIO.url}/sitemap.xml`,
    host: SITIO.url,
  }
}
