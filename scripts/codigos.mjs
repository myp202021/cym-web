// Genera lib/codigos.ts (código → zona y tipo) para que el asistente derive por código sin cargar todas las fichas.
// Corre solo antes de cada build (npm "prebuild").
import { readFileSync, writeFileSync } from 'node:fs'
const NOMBRE = { vitacura: 'Vitacura', 'la-dehesa': 'La Dehesa', 'san-carlos-de-apoquindo': 'San Carlos de Apoquindo', 'las-condes': 'Las Condes', 'la-reina': 'La Reina' }
const { propiedades } = JSON.parse(readFileSync(new URL('../data/propiedades.json', import.meta.url)))
const mapa = Object.fromEntries(propiedades.map((p) => [p.codigo, { zona: p.sector || NOMBRE[p.zona] || '', tipo: p.tipo }]))
writeFileSync(new URL('../lib/codigos.ts', import.meta.url),
  `// Generado por scripts/codigos.mjs desde data/propiedades.json. No editar a mano.\nexport const CODIGOS: Record<string, { zona: string; tipo: string }> = ${JSON.stringify(mapa, null, 2)}\n`)
console.log('codigos.ts:', Object.keys(mapa).length, 'propiedades')
