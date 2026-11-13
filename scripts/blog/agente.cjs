// Agente de blog de CyM Propiedades (M&P, 13 nov 2026).
// Escribe una guía larga (mínimo 3.000 palabras, regla M&P) sobre una comuna donde CyM opera y la agrega a data/guias.json.
// Flujo: 1) investiga con búsqueda web (OpenAI Responses + web_search) y junta datos con su fuente;
//        2) escribe el artículo SOLO con esos datos; 3) amplía por secciones si queda corto (lib/largo.cjs);
//        4) quita enlaces rotos (lib/verificar-fuentes.cjs); 5) revisa reglas de CyM (sin arriendo, sin comisión, sin competidores);
//        6) agrega enlaces internos (landing de la comuna, páginas madre) y al sitio oficial cympropiedades.cl.
// Uso: OPENAI_API_KEY=... node scripts/blog/agente.cjs [--tema N]   (sin --tema = el siguiente tema no publicado)
// La publicación (commit + deploy + IndexNow) la hace el workflow .github/workflows/blog-cym.yml.
const fs = require('fs')
const path = require('path')
const largo = require('./lib/largo.cjs')
const { verificarFuentes } = require('./lib/verificar-fuentes.cjs')

const RAIZ = path.join(__dirname, '..', '..')
const GUIAS = path.join(RAIZ, 'data', 'guias.json')
const TEMAS = require('./temas.json')
const SITIO = 'https://www.cympropiedadeschile.cl'
const OFICIAL = 'https://www.cympropiedades.cl'
const MODELO = 'gpt-4.1'
const KEY = process.env.OPENAI_API_KEY

const COMUNAS = {
  vitacura: { nombre: 'Vitacura', comuna: 'Vitacura' },
  'la-dehesa': { nombre: 'La Dehesa', comuna: 'Lo Barnechea' },
  'san-carlos-de-apoquindo': { nombre: 'San Carlos de Apoquindo', comuna: 'Las Condes' },
  'las-condes': { nombre: 'Las Condes', comuna: 'Las Condes' },
  'la-reina': { nombre: 'La Reina', comuna: 'La Reina' },
}
const MADRES = [
  { url: '/ranking-barrios-sector-oriente', texto: 'ranking de barrios del sector oriente' },
  { url: '/precios-casas-sector-oriente', texto: 'precios de casas en el sector oriente' },
  { url: '/corredoras-de-propiedades-sector-oriente', texto: 'corredoras de propiedades del sector oriente' },
]
// Reglas de Christopher para CyM: sin arriendo, sin comisión, sin nombrar competidores.
const PROHIBIDO = /\barriend|\barrend|comisi[oó]n(?! para el mercado financiero)|engel|sotheby|re\/?max|century 21|coldwell|keller williams|portal ?inmobiliario/i

const DESCRIPCION_CYM =
  'CyM Propiedades es una corredora de propiedades de Santiago de Chile especializada en la venta de casas en Vitacura, La Dehesa (Lo Barnechea), San Carlos de Apoquindo (Las Condes), Las Condes y La Reina. Acompaña a propietarios y compradores en todo el proceso: tasación sin costo, publicación, visitas, negociación y cierre. Trabaja con una base de más de 100.000 compradores y 12 años en el mercado.'

const hoy = () => new Date().toLocaleDateString('es-CL', { timeZone: 'America/Santiago', day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').split('-').slice(0, 9).join('-')
const texto = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

async function openai(url, body) {
  for (let i = 0; i < 3; i++) {
    const r = await fetch('https://api.openai.com/v1/' + url, { method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const j = await r.json()
    if (r.ok) return j
    if (r.status === 401 || /insufficient_quota/.test(JSON.stringify(j))) throw new Error('OpenAI ' + r.status + ': ' + JSON.stringify(j.error))
    await new Promise((s) => setTimeout(s, 5000 * (i + 1)))
  }
  throw new Error('OpenAI no respondió tras 3 intentos')
}

// Portales y corredoras: no se citan como fuente (regla CyM: no nombrar competidores).
const NO_FUENTE = /portalinmobiliario|toctoc|chilepropiedades|yapo\.cl|enlaceinmobiliario|goplaceit|mercadolibre|icasas|properati|zoominmobiliario|economicos\.cl|remax|engelvoelkers|sothebys|century21|corredora|propiedades\.cl|inmobiliaria|emol\.com\/propiedad|propiedades\.emol|\/ficha\/|\/propiedad\/|codR\d|propiedadesya|portalpm/i

// 1) Investigación con búsqueda web, en tres ángulos para juntar suficientes datos con fuente.
const ANGULOS = [
  'precios y mercado: valores de viviendas y suelo en UF o UF/m² por sector o barrio, variación anual, plazos de venta, cantidad de ventas, estudios de mercado y prensa económica',
  'entorno y normativa: plan regulador y alturas permitidas, proyectos viales, Metro y autopistas, colegios, áreas verdes, servicios, seguridad, población (Censo 2024)',
  'proceso y financiamiento: tasas de crédito hipotecario vigentes (Banco Central, CMF), pie exigido, contribuciones y avalúo fiscal (SII), documentos y trámites para comprar o vender una casa en Chile',
]
async function buscar(t, c, angulo) {
  const pregunta = `Investiga en fuentes chilenas confiables y recientes (2024-2026) para una guía sobre: "${t.tema}" (sector ${c.nombre}, comuna de ${c.comuna}, Santiago de Chile).
Ángulo de esta búsqueda: ${angulo}.
Fuentes preferidas: municipalidad, MINVU, SII, Banco Central, CMF, INE, Metro, universidades, CChC, prensa (Emol, La Tercera, DF, El Mercurio Inversiones, Biobío, CNN Chile, Ex-Ante).
NO uses portales de avisos (Portal Inmobiliario, TocToc, Chilepropiedades, Yapo, Enlace Inmobiliario, GoPlaceIt, Mercado Libre) ni sitios de corredoras o inmobiliarias, ni avisos o fichas individuales de propiedades aunque estén en un diario (por ejemplo Emol Propiedades). Solo estudios, estadísticas, normas y notas de prensa. Nada de arriendo.
Responde en texto plano, sin markdown, sin numerar, entre 10 y 20 líneas, una por dato, con este formato exacto:
DATO: <el dato, con cifra y periodo> | FUENTE: <medio o institución> | URL: <url exacta> | FECHA: <fecha de publicación o "s/f">`
  const j = await openai('responses', { model: MODELO, tools: [{ type: 'web_search_preview', search_context_size: 'high', user_location: { type: 'approximate', country: 'CL', city: 'Santiago' } }], input: pregunta })
  const txt = (j.output || []).filter((o) => o.type === 'message').flatMap((o) => o.content || []).map((x) => x.text || '').join('\n')
  const datos = []
  for (const bloque of txt.replace(/\*\*/g, '').split(/DATO:/i).slice(1)) {
    const url = (bloque.match(/https?:\/\/[^\s)\]|]+/) || [])[0]
    if (!url || NO_FUENTE.test(url)) continue
    const dato = bloque.split(/\|?\s*-?\s*FUENTE:/i)[0].replace(/\s+/g, ' ').trim()
    const fuente = ((bloque.match(/FUENTE:\s*([^|\n]+)/i) || [])[1] || '').trim()
    const fecha = ((bloque.match(/FECHA:\s*([^|\n]+)/i) || [])[1] || 's/f').trim()
    if (NO_FUENTE.test(fuente) || PROHIBIDO.test(dato)) continue
    datos.push(`DATO: ${dato} | FUENTE: ${fuente} | URL: ${url.replace(/[?&]utm_source=openai/, '')} | FECHA: ${fecha}`)
  }
  return datos
}
async function investigar(t, c) {
  const una = async (a) => {
    for (let intento = 1; intento <= 3; intento++) {
      const d = await buscar(t, c, a).catch((e) => { console.log('búsqueda falló:', e.message); return [] })
      if (d.length >= 3) return d
      console.log(`  ángulo con ${d.length} datos, reintento ${intento}`)
    }
    return []
  }
  const listas = await Promise.all(ANGULOS.map(una))
  const vistos = new Set()
  return listas.flat().filter((d) => { const k = d.split('| URL:')[0]; if (vistos.has(k)) return false; vistos.add(k); return true })
}

// Contexto ya verificado: la landing de la comuna (barrios, ranking, secciones y sus fuentes).
function contextoComuna(t) {
  const d = JSON.parse(fs.readFileSync(path.join(RAIZ, 'data', 'comunas', t.comuna + '.json'), 'utf8'))
  const sec = (d.secciones || []).map((x) => `${x.h2}: ${texto([].concat(x.parrafos || x.html || x.texto || '').join(' '))}`).join('\n')
  const barrios = (d.barrios || []).map((b) => `${b.nombre}: ${b.texto}`).join('\n')
  const ranking = ((d.ranking || {}).items || []).map((r) => `${r.puesto}. ${r.barrio} — ${r.fortalezas} Ojo: ${r.ojo}`).join('\n')
  const fuentes = (d.fuentes || []).map((f) => `${f.titulo}: ${f.url}`).join('\n')
  return `BARRIOS:\n${barrios}\n\nRANKING DE BARRIOS CyM:\n${ranking}\n\nTEXTO DE LA LANDING (ya verificado):\n${sec.slice(0, 9000)}\n\nFUENTES DE LA LANDING:\n${fuentes}`
}

// Datos propios: casas que CyM tiene a la venta en la zona (precio y m² de la ficha oficial).
function datosCyM(t) {
  const { propiedades } = JSON.parse(fs.readFileSync(path.join(RAIZ, 'data', 'propiedades.json'), 'utf8'))
  return propiedades
    .filter((p) => p.zona === t.comuna && p.operacion === 'Venta')
    .map((p) => `DATO: CyM Propiedades tiene a la venta ${p.tipo.toLowerCase()} de ${p.dormitorios} dormitorios, ${p.m2_construidos} m² construidos${p.m2_terreno ? ' y ' + p.m2_terreno + ' m² de terreno' : ''} en ${p.comuna} (${p.titulo.toLowerCase()}) en ${p.precio} | FUENTE: CyM Propiedades | URL: ${p.url_ficha} | FECHA: ${hoy()}`)
}

// 2) Redacción en tres pasos: esquema → cada sección por separado con sus datos → unión.
const REGLAS = `Escribes para CyM Propiedades, corredora de propiedades del sector oriente de Santiago. Español de Chile, sin voseo, tuteando al lector. Concreto y útil: cada párrafo aporta un dato, un ejemplo o un consejo accionable. Prohibido el relleno ("es importante considerar", "en conclusión", "cabe destacar", "juega un papel clave", "no solo... sino también"), repetir ideas de otras secciones o listas genéricas que valen para cualquier ciudad.
- Cifras y hechos: SOLO los de los datos investigados o del contexto verificado. Cada cifra con su fuente enlazada en el mismo párrafo: <a href="URL" rel="noopener">nombre de la fuente</a>. No inventes cifras, fuentes ni URLs.
- Nunca hables de arriendo ni de arrendar. Nunca menciones comisiones. Nunca nombres otras corredoras ni portales inmobiliarios.
- CyM: "${DESCRIPCION_CYM}" No le atribuyas otras cifras ni servicios que no estén en esa descripción o en el contexto (nada de reportes periódicos, tasación online, datos de ventas propios, etc.).
- Un precio de aviso es "precio publicado", nunca "se vendió". No cites avisos de otras corredoras.
- Nunca estimes ni extrapoles: si no hay una cifra por barrio, describe el barrio sin números. Prohibido armar rangos de precio, superficies "típicas" o porcentajes que no estén literalmente en los datos.
- Tablas: solo con cifras que aparezcan tal cual en los datos, y cada fila con su propia fuente. Si no hay al menos 3 filas con datos reales, no hagas tabla.
- La fuente va enlazada dentro de la frase ("según <a ...>la CChC</a>, ..."), nunca como palabra suelta al final del párrafo ni entre paréntesis sin contexto.
- Normas y zonas: atribuye cada norma solo al sector que el dato nombra; no la extiendas a otros barrios.
- Los subtítulos <h3> nunca repiten el título de la sección.
- HTML simple: p, h3, ul, ol, li, strong, table, thead, tbody, tr, th, td, a. Sin estilos ni clases.`

async function chatJSON(sistema, usuario, maxTokens) {
  const j = await openai('chat/completions', { model: MODELO, temperature: 0.4, max_tokens: maxTokens, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: sistema }, { role: 'user', content: usuario }] })
  return JSON.parse(j.choices[0].message.content)
}


// Verificador de cifras: toda cifra de 2+ dígitos (salvo años) debe estar en los datos o el contexto.
function cifras(texto) {
  const limpio = texto.replace(/<a [^>]*href="[^"]*"[^>]*>/g, ' ').replace(/<[^>]+>/g, ' ')
  const out = new Set()
  for (const m of limpio.matchAll(/\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?/g)) {
    const n = m[0].replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')
    const v = Number(n)
    if (!Number.isFinite(v) || (Number.isInteger(v) && v < 10) || (v >= 1900 && v <= 2100 && Number.isInteger(v))) continue
    out.add(String(v))
  }
  return out
}
function sinRespaldo(html, respaldo) { return [...cifras(html)].filter((x) => !respaldo.has(x)) }

async function redactar(t, c, datos, contexto) {
  const respaldo = cifras(datos.join(' ') + ' ' + contexto + ' ' + DESCRIPCION_CYM)
  const esCyM = (d) => d.includes('FUENTE: CyM Propiedades')
  const listaDe = (conCyM) => datos.map((d, i) => (conCyM || !esCyM(d) ? `[${i}] ${d}` : null)).filter(Boolean).join('\n')
  const lista = listaDe(true)
  const baseDe = (conCyM) => `Tema: ${t.tema}\nPalabra clave: ${t.kw}\nSector: ${c.nombre} (comuna de ${c.comuna})\nFecha de hoy: ${hoy()}\n\nDATOS INVESTIGADOS:\n${listaDe(conCyM)}\n\nCONTEXTO VERIFICADO DE LA COMUNA:\n${contexto}`
  const base = `Tema: ${t.tema}\nPalabra clave: ${t.kw}\nSector: ${c.nombre} (comuna de ${c.comuna})\nFecha de hoy: ${hoy()}\n\nDATOS INVESTIGADOS:\n${lista}\n\nCONTEXTO VERIFICADO DE LA COMUNA:\n${contexto}`
  const esquema = await chatJSON(REGLAS, base + `

Arma el esquema de una guía de 3.000 a 3.500 palabras. Responde JSON con:
"titulo" (máx. 70 caracteres, con la palabra clave), "descripcion" (meta description de 140-155 caracteres),
"intro" (párrafo HTML <p> de 60-90 palabras que responde directo la pregunta del título, con al menos una cifra y su fuente enlazada),
"secciones": 9 a 11 objetos {"h2": título con forma de pregunta o tema concreto, "enfoque": qué responde y qué la diferencia de las demás, "datos": índices de DATOS INVESTIGADOS que usa (2 a 5, sin repetir entre secciones cuando se pueda), "tabla": true si conviene una tabla comparativa}. Al menos una sección con tabla. La penúltima sección explica cómo trabaja CyM en ${c.nombre}; la última es "Qué hacer ahora" con pasos concretos.
"faq": 6 objetos {"q","a"} con preguntas reales de personas; respuestas de 2-4 frases solo con datos de la lista.`, 6000)
  const titulos = esquema.secciones.map((x) => x.h2)
  if (sinRespaldo(esquema.intro, respaldo).length) console.log('    intro con cifras sin respaldo: ' + sinRespaldo(esquema.intro, respaldo).join(', '))
  let html = esquema.intro.replace(/<p\b[^>]*>[\s\S]*?<\/p>/g, (m) => (sinRespaldo(m, respaldo).length ? '' : m))
  if (!html.trim()) html = `<p>${t.tema}: en esta guía revisamos los datos disponibles para ${c.nombre}, con sus fuentes, y lo que significan para quien vende o compra.</p>`
  esquema.faq = (esquema.faq || []).filter((f) => !sinRespaldo(f.a + ' ' + f.q, respaldo).length)
  const yaUsados = new Set()
  for (const [n, sec] of esquema.secciones.entries()) {
    const seccionCyM = n === titulos.length - 2
    const usados = (sec.datos || []).map((i) => datos[i]).filter(Boolean).filter((d) => seccionCyM || !esCyM(d))
    const previos = [...yaUsados].filter((d) => !usados.includes(d))
    const r = await chatJSON(REGLAS, baseDe(seccionCyM) + `

Artículo: "${esquema.titulo}". Secciones del artículo, en orden: ${titulos.map((h, i) => `${i + 1}. ${h}`).join(' / ')}.
Escribe SOLO la sección ${n + 1}: "${sec.h2}". Enfoque: ${sec.enfoque}.
Datos principales para esta sección: ${usados.join(' || ') || 'los del contexto verificado que correspondan'}.
${sec.tabla ? 'Incluye una tabla comparativa con datos reales y una columna o fila de fuente.' : ''}
Entre 280 y 380 palabras, con 1-3 subtítulos <h3> si ayudan (distintos de "${sec.h2}"). No repitas lo que cubren las otras secciones. No pongas el <h2>.
${previos.length ? `Estas cifras ya se usaron en secciones anteriores; NO las repitas: ${previos.map((d) => d.split(' | FUENTE')[0].replace(/^DATO: /, '')).join(' || ')}` : ''}
${seccionCyM ? 'Menciona como ejemplo a lo más una propiedad de CyM, una sola vez.' : 'No menciones propiedades específicas de CyM en esta sección.'}
${n === titulos.length - 2 ? `Menciona de forma natural <a href="/${t.comuna}">CyM Propiedades en ${c.nombre}</a> y el sitio oficial <a href="${OFICIAL}" rel="noopener">cympropiedades.cl</a>.` : ''}
${n === 1 ? `Incluye de forma natural un enlace a <a href="${MADRES[0].url}">${MADRES[0].texto}</a>.` : ''}${n === 3 ? ` Incluye de forma natural un enlace a <a href="${MADRES[1].url}">${MADRES[1].texto}</a>.` : ''}
Responde JSON {"html": "..."}`, 3000)
    let malas = sinRespaldo(r.html, respaldo)
    if (malas.length) {
      console.log(`    cifras sin respaldo en sección ${n + 1}: ${malas.join(', ')} → reescribiendo`)
      const r2 = await chatJSON(REGLAS, baseDe(seccionCyM) + `

Este es el texto de la sección "${sec.h2}":
${r.html}

Contiene cifras que NO están en los datos investigados ni en el contexto: ${malas.join(', ')}. Reescríbelo quitando esas cifras (y las filas de tabla que las tengan; si la tabla queda con menos de 3 filas, quítala). No agregues cifras nuevas. Mantén el largo con explicación útil. Responde JSON {"html": "..."}`, 3000)
      r.html = r2.html
      malas = sinRespaldo(r.html, respaldo)
      if (malas.length) {
        console.log(`    siguen sin respaldo: ${malas.join(', ')} → se quitan esos párrafos o filas`)
        r.html = r.html.replace(/<(p|li|tr)\b[^>]*>[\s\S]*?<\/\1>/g, (m) => (sinRespaldo(m, respaldo).length ? '' : m))
      }
    }
    usados.forEach((d) => yaUsados.add(d))
    const norm = (x) => x.replace(/<[^>]+>/g, '').replace(/[¿?¡!.:]/g, '').trim().toLowerCase()
    const cuerpo = r.html.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, (m, h) => (norm(h) === norm(sec.h2) ? '' : m))
    html += `\n<h2>${sec.h2}</h2>\n${cuerpo}`
    console.log(`  sección ${n + 1}/${titulos.length}: ${largo.palabras(r.html)} palabras`)
  }
  return { art: { titulo: esquema.titulo, descripcion: esquema.descripcion, html, faq: esquema.faq }, sistema: REGLAS }
}

function asegurarEnlaces(html, t, c) {
  let extra = ''
  if (!html.includes(`href="/${t.comuna}"`)) extra += `<p>Si tienes una casa en ${c.nombre} o buscas una, revisa <a href="/${t.comuna}">CyM Propiedades en ${c.nombre}</a>: barrios, precios de referencia y contacto directo con un corredor de la zona.</p>`
  if (!MADRES.some((m) => html.includes(`href="${m.url}"`))) extra += `<p>Para comparar con otros sectores, mira el <a href="${MADRES[0].url}">${MADRES[0].texto}</a> y los <a href="${MADRES[1].url}">${MADRES[1].texto}</a>.</p>`
  extra += `<p>Las propiedades que CyM tiene a la venta están en su sitio oficial, <a href="${OFICIAL}" rel="noopener">www.cympropiedades.cl</a>.</p>`
  return html + extra
}

async function main() {
  if (!KEY) throw new Error('Falta OPENAI_API_KEY')
  const guias = JSON.parse(fs.readFileSync(GUIAS, 'utf8'))
  const publicados = new Set(guias.map((g) => g.tema).filter(Boolean))
  const i = process.argv.indexOf('--tema')
  const t = i > 0 ? TEMAS[Number(process.argv[i + 1])] : TEMAS.find((x) => !publicados.has(x.tema))
  if (!t) { console.log('No quedan temas sin publicar: agregar temas a scripts/blog/temas.json'); return }
  const c = COMUNAS[t.comuna]
  if (!c) throw new Error('Comuna fuera de las de CyM: ' + t.comuna)
  console.log('Tema:', t.tema)

  const datos = await investigar(t, c)
  const propios = datosCyM(t)
  console.log('Datos con fuente externa:', datos.length, '· propiedades CyM:', propios.length)
  if (datos.length < 8) throw new Error('Muy pocos datos con fuente (' + datos.length + '): no se escribe para no inventar.')

  const { art, sistema } = await redactar(t, c, [...datos, ...propios], contextoComuna(t))
  let html = await largo.asegurarLargo(art.html, { tema: art.titulo, sistema, apiKey: KEY })
  html = (await verificarFuentes(html, { dominioPropio: 'cympropiedadeschile.cl' })).html
  html = asegurarEnlaces(html, t, c)
  largo.exigirLargo(html)

  const todo = [art.titulo, art.descripcion, html, ...art.faq.map((f) => f.q + ' ' + f.a)].join(' ')
  const malo = todo.match(PROHIBIDO)
  if (malo) throw new Error('El artículo rompe una regla de CyM ("' + malo[0] + '"): no se publica.')

  const slug = slugify(art.titulo)
  if (guias.some((g) => g.slug === slug)) throw new Error('Slug repetido: ' + slug)
  const resumen = texto(html.match(/<p>[\s\S]*?<\/p>/)[0]).slice(0, 300)
  const guia = { slug, titulo: art.titulo, descripcion: art.descripcion, resumen, html, faq: art.faq, comuna: t.comuna, tema: t.tema, fecha: new Date().toISOString().slice(0, 10) }
  guias.unshift(guia)
  fs.writeFileSync(GUIAS, JSON.stringify(guias, null, 2) + '\n')
  console.log(`OK: ${SITIO}/guias/${slug} — ${largo.palabras(html)} palabras, ${(html.match(/href="https?:/g) || []).length} enlaces externos`)
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `url=${SITIO}/guias/${slug}\nslug=${slug}\n`)
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1) })
