// Genera lib/codigos.ts (código → zona y tipo) para que el asistente derive por código sin cargar todas las fichas.
// Corre solo antes de cada build (npm "prebuild").
import { readFileSync, writeFileSync } from 'node:fs'
const NOMBRE = { vitacura: 'Vitacura', 'la-dehesa': 'La Dehesa', 'san-carlos-de-apoquindo': 'San Carlos de Apoquindo', 'las-condes': 'Las Condes', 'la-reina': 'La Reina' }
const { propiedades: campana } = JSON.parse(readFileSync(new URL('../data/propiedades.json', import.meta.url)))
// 24 nov 2026: también el catálogo completo (data/catalogo.json); la zona sale de la comuna de la ficha
const ZC = { 'Lo Barnechea': 'la-dehesa', Vitacura: 'vitacura', 'Las Condes': 'las-condes', 'La Reina': 'la-reina' }
const { propiedades: catalogo } = JSON.parse(readFileSync(new URL('../data/catalogo.json', import.meta.url)))
const vistos = new Set(campana.map((p) => p.codigo))
const propiedades = [...campana, ...catalogo.filter((p) => !vistos.has(p.codigo)).map((p) => ({ ...p, zona: p.comuna === 'Las Condes' && /SAN CARLOS/i.test(p.titulo) ? 'san-carlos-de-apoquindo' : ZC[p.comuna], sector: p.comuna === 'Las Condes' && /SAN CARLOS/i.test(p.titulo) ? 'San Carlos de Apoquindo' : undefined, comunaFicha: p.comuna }))]
const mapa = Object.fromEntries(propiedades.map((p) => [p.codigo, { zona: p.sector || NOMBRE[p.zona] || p.comunaFicha || '', tipo: p.tipo }]))
writeFileSync(new URL('../lib/codigos.ts', import.meta.url),
  `// Generado por scripts/codigos.mjs desde data/propiedades.json. No editar a mano.\nexport const CODIGOS: Record<string, { zona: string; tipo: string }> = ${JSON.stringify(mapa, null, 2)}\n`)
console.log('codigos.ts:', Object.keys(mapa).length, 'propiedades')
