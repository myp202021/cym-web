// Avisa a Bing/Yandex/Seznam (IndexNow) de todas las URLs del sitemap. Uso: npm run indexnow  (después de cada deploy)
import fs from 'node:fs'
import path from 'node:path'

const sitio = (process.env.NEXT_PUBLIC_SITE_URL || 'https://cym-web-two.vercel.app').replace(/\/$/, '')
const key = fs.readdirSync(path.join(import.meta.dirname, '..', 'public')).find((f) => /^[a-f0-9]{32}\.txt$/.test(f)).replace('.txt', '')
const xml = await (await fetch(`${sitio}/sitemap.xml`)).text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(sitio).host, key, keyLocation: `${sitio}/${key}.txt`, urlList: urls }),
})
console.log(`IndexNow: ${urls.length} URLs → HTTP ${r.status}`)
