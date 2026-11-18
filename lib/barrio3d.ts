// Serie "Barrio 3D" de CyM Propiedades: 10 reels verticales (1080x1920, 18 s) que Alejandro Ceballos (CyM) envió el 17 nov 2026.
// Videos optimizados (720x1280, H.264) en public/videos/barrio-3d/<slug>.mp4 con su póster .jpg.
// Las cifras son las que CyM publica en los reels (análisis de mercado de CyM para Vitacura, noviembre de 2026).

export const B3D_FECHA = '2026-11-17'
export const B3D_FUENTE = 'Serie Barrio 3D de CyM Propiedades (análisis de mercado de CyM para Vitacura, noviembre de 2026)'

export type Reel = { n: string; slug: string; titulo: string; etiqueta: string; texto: string }

export const REELS: Reel[] = [
  {
    n: '01',
    slug: '01-tu-terreno-medido',
    titulo: 'Tu terreno, medido',
    etiqueta: 'Terreno',
    texto:
      'Tu casa está sobre 500 m². En Villa El Dorado (UF 36 por m²) ese terreno vale UF 18.000; en Polo (UF 48 por m²), UF 24.000; en Jardín del Este (UF 50 por m²), UF 25.000. Solo el terreno: mismo tamaño, otra microzona.',
  },
  {
    n: '02',
    slug: '02-mapa-del-valor',
    titulo: 'El mapa del valor',
    etiqueta: 'Valor del suelo',
    texto: 'UF por m² de terreno en 16 microzonas de Vitacura: de UF 36 a UF 50 por m². La manzana define tu precio.',
  },
  {
    n: '03',
    slug: '03-ecuacion-80-20',
    titulo: 'La ecuación 80-20',
    etiqueta: 'La ecuación',
    texto: '¿Cuánto vale tu casa? En Vitacura, 80% es el terreno y 20% es la casa. Por eso la ubicación pesa más que la construcción.',
  },
  {
    n: '04',
    slug: '04-no-regularizado-baja-precio',
    titulo: 'Lo no regularizado baja el precio',
    etiqueta: 'Regularización',
    texto: '¿Ampliaste sin permiso? Lo que no está regularizado no suma igual: una ampliación no regularizada baja el precio de tu casa. Regularízala antes de vender; te orientamos.',
  },
  {
    n: '05',
    slug: '05-calidad-y-terminaciones',
    titulo: 'Calidad y terminaciones',
    etiqueta: 'Construido',
    texto:
      'No todos los m² construidos valen igual. El valor de lo construido depende de la calidad de construcción, las terminaciones y la regularización. Según terminaciones, el m² construido puede valer el doble.',
  },
  {
    n: '06',
    slug: '06-precio-de-lista-no-es-precio-de-venta',
    titulo: 'Precio de lista no es precio de venta',
    etiqueta: 'Precio',
    texto: 'El precio de lista es el que manda… pero no es el precio de venta: uno es el de la publicación y el otro, el del cierre. Publicar bien es vender mejor; te ayudamos a calcularlo.',
  },
  {
    n: '07',
    slug: '07-compites-con-1208-avisos',
    titulo: 'Compites con 1.208 casas',
    etiqueta: 'Competencia',
    texto: 'Hay 1.208 avisos de casas en venta en Vitacura: si vendes, compites con todos. El 56% lleva más de 45 días publicado. Precio de lista alto es casa quieta; el precio correcto vende.',
  },
  {
    n: '08',
    slug: '08-en-que-tramo-esta-tu-casa',
    titulo: 'En qué tramo está tu casa',
    etiqueta: 'Tramos',
    texto:
      'Casas en venta en Vitacura por tramo: hasta UF 15.000, 207; de UF 15.000 a 25.000, 528; de UF 25.000 a 40.000, 247; más de UF 40.000, 226. Precio mediano: UF 21.500. Entre UF 15.000 y 25.000 está la mayor pelea.',
  },
  {
    n: '09',
    slug: '09-haz-la-cuenta',
    titulo: 'Haz la cuenta',
    etiqueta: 'Haz la cuenta',
    texto:
      'Ejemplo en Polo con 500 m² de terreno: 500 m² × UF 48 = UF 24.000 de terreno (80%), más UF 6.000 de casa (20%). Precio de mercado: UF 30.000. Es referencial: la casa se ajusta por calidad, terminaciones y regularización.',
  },
  {
    n: '10',
    slug: '10-asi-vendemos-tu-casa',
    titulo: 'Así vendemos tu casa',
    etiqueta: 'Método CyM',
    texto: 'El método CyM: tasación sin costo, fotos profesionales, publicación, visitas calificadas, negociación y firma. 12 años en el mercado y más de 100.000 compradores.',
  },
]

export const reel = (n: string) => REELS.find((r) => r.n === n)!
export const videoSrc = (r: Reel) => `/videos/barrio-3d/${r.slug}.mp4`
export const posterSrc = (r: Reel) => `/videos/barrio-3d/${r.slug}.jpg`

// Reel 02: UF por m² de terreno en 16 microzonas de Vitacura
export const MICROZONAS: { nombre: string; uf: number }[] = [
  { nombre: 'Jardín del Este', uf: 50 },
  { nombre: 'Polo', uf: 48 },
  { nombre: 'Alianza Francesa', uf: 48 },
  { nombre: 'El Mañío', uf: 47 },
  { nombre: 'Alonso de Córdova', uf: 46 },
  { nombre: 'Colegio Tabancura', uf: 45 },
  { nombre: 'Sport Francés', uf: 45 },
  { nombre: 'Las Fresas', uf: 43 },
  { nombre: 'Club Manquehue', uf: 42 },
  { nombre: 'Lo Matta', uf: 40 },
  { nombre: 'Colegio Manquehue (sector 1)', uf: 40 },
  { nombre: 'Colegio Alemán', uf: 40 },
  { nombre: 'Luis Pasteur', uf: 40 },
  { nombre: 'Bicentenario', uf: 40 },
  { nombre: 'Colegio Manquehue (sector 2)', uf: 38 },
  { nombre: 'Villa El Dorado', uf: 36 },
]

// Reel 08: avisos de casas en venta en Vitacura por tramo de precio (suman 1.208, reel 07)
export const TRAMOS = [
  { tramo: 'Hasta UF 15.000', casas: 207 },
  { tramo: 'UF 15.000 a 25.000', casas: 528, destacado: true },
  { tramo: 'UF 25.000 a 40.000', casas: 247 },
  { tramo: 'Más de UF 40.000', casas: 226 },
]
export const AVISOS_VITACURA = 1208
export const MAS_45_DIAS = 56
export const MEDIANA_VITACURA = 21500

export const METODO = ['Tasación sin costo', 'Fotos profesionales', 'Publicación', 'Visitas calificadas', 'Negociación', 'Firma']
