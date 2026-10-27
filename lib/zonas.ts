// Contenido SEO por zona. Las cifras (precios, cantidad de propiedades) salen siempre de data/propiedades.json.
export type Zona = {
  slug: string
  nombre: string // como lo dice el agente de WhatsApp
  comuna: string // comuna oficial
  title: string
  description: string
  h1: string
  bajada: string
  intro: string[]
  barrios: { nombre: string; texto: string }[]
  porQue: string[]
  faq: { q: string; a: string }[]
  microzonas: string[]
  colegios: string[]
}

export const ZONAS: Zona[] = [
  {
    slug: 'vitacura',
    nombre: 'Vitacura',
    comuna: 'Vitacura',
    title: 'Casas y departamentos en venta en Vitacura | CyM Propiedades',
    description:
      'Propiedades en venta en Vitacura con fotos, precio en UF y superficie. Cotiza por WhatsApp y un corredor de CyM especialista en Vitacura te contacta.',
    h1: 'Casas y departamentos en venta en Vitacura',
    bajada: 'Propiedades seleccionadas por CyM, con un corredor dedicado a la comuna.',
    intro: [
      'Vitacura es una de las comunas residenciales más buscadas del sector oriente de Santiago: barrios consolidados, calles arboladas, áreas verdes como el Parque Bicentenario y acceso directo a Costanera Norte y Av. Vitacura.',
      'En CyM Propiedades trabajamos Vitacura con un corredor dedicado, que conoce cada barrio y acompaña la compra de principio a fin: visita, negociación, estudio de títulos y gestión del crédito hipotecario.',
    ],
    barrios: [
      { nombre: 'Santa María de Manquehue', texto: 'Barrio residencial de casas con jardín, cerca de colegios y del cerro Manquehue.' },
      { nombre: 'Lo Curro', texto: 'Sector en altura con casas amplias y vistas a la ciudad.' },
      { nombre: 'Vitacura centro', texto: 'Entorno de Av. Vitacura y Alonso de Córdova, con comercio, restaurantes y servicios a pasos.' },
      { nombre: 'Entorno Parque Bicentenario', texto: 'Departamentos y casas cerca de uno de los parques urbanos más usados del sector oriente.' },
    ],
    porQue: [
      'Corredor CyM dedicado a Vitacura, con atención por WhatsApp.',
      'Fichas con fotos, superficie y precio en UF publicados.',
      'Asesoría en crédito hipotecario y en la negociación.',
    ],
    faq: [
      { q: '¿Cómo cotizo una propiedad en Vitacura?', a: 'Toca "Cotizar por WhatsApp" en la propiedad que te interesa. El asistente de CyM toma tus datos y el corredor de Vitacura te escribe a la brevedad con la información completa.' },
      { q: '¿Puedo visitar la propiedad antes de hacer una oferta?', a: 'Sí. El corredor coordina la visita contigo y con el propietario, normalmente en la misma semana.' },
      { q: '¿CyM ayuda con el crédito hipotecario?', a: 'Sí. CyM ofrece gestión de créditos hipotecarios y asesoría financiera para que compares alternativas antes de ofertar.' },
      { q: '¿Los precios están en UF?', a: 'Sí, las propiedades en venta se publican en UF, como es habitual en el mercado chileno. El corredor te puede indicar el valor en pesos del día.' },
    ],
    microzonas: ['Santa María de Manquehue', 'Jardín del Este', 'Lo Curro', 'Club de Polo', 'Lo Castillo', 'Las Hualtatas', 'Luis Pasteur'],
    colegios: ['Tabancura', 'Alianza Francesa', 'Colegio Alemán', "Saint George's", 'San Benito', 'Huelén', 'Los Andes', 'La Maisonnette', 'Santa Úrsula', 'Sagrados Corazones de Manquehue'],
  },
  {
    slug: 'la-dehesa',
    nombre: 'La Dehesa',
    comuna: 'Lo Barnechea',
    title: 'Casas en venta en La Dehesa, Lo Barnechea | CyM Propiedades',
    description:
      'Casas y departamentos en venta en La Dehesa (Lo Barnechea), muchas en condominio. Fotos, precio en UF y corredor local de CyM por WhatsApp.',
    h1: 'Casas en venta en La Dehesa, Lo Barnechea',
    bajada: 'Nuestra oficina está en Av. La Dehesa: conocemos el sector desde adentro.',
    intro: [
      'La Dehesa, en Lo Barnechea, combina casas amplias, condominios con áreas comunes y cercanía a la cordillera. Es una de las zonas preferidas por familias que buscan espacio, seguridad y colegios cerca.',
      'CyM Propiedades tiene su oficina en Av. La Dehesa 1844. Nuestro equipo de La Dehesa recorre el sector todos los días y te puede orientar sobre condominios, accesos y valores reales de venta.',
    ],
    barrios: [
      { nombre: 'Eje Av. La Dehesa', texto: 'Columna vertebral del sector, con comercio, servicios y conexión hacia Costanera Norte.' },
      { nombre: 'Los Trapenses', texto: 'Sector de casas y condominios en altura, con vistas y entorno natural.' },
      { nombre: 'El Huinganal', texto: 'Barrio residencial tranquilo, de casas en terrenos amplios.' },
      { nombre: 'Condominios de La Dehesa', texto: 'Casas con áreas comunes, piscina y control de acceso: la oferta más pedida por familias.' },
    ],
    porQue: [
      'Oficina CyM en el mismo sector (Av. La Dehesa 1844).',
      'Experiencia en casas en condominio y casas para remodelar.',
      'Corredor local que coordina visitas en el día.',
    ],
    faq: [
      { q: '¿La Dehesa es una comuna?', a: 'No. La Dehesa es un sector de la comuna de Lo Barnechea, en el oriente de Santiago.' },
      { q: '¿Tienen casas en condominio en La Dehesa?', a: 'Sí, buena parte de las casas que publicamos en La Dehesa están en condominio. En cada ficha lo indicamos.' },
      { q: '¿Dónde está la oficina de CyM?', a: 'En Av. La Dehesa 1844, oficina 313, Torre Norte, Lo Barnechea.' },
      { q: '¿Cómo agendo una visita?', a: 'Escríbenos por WhatsApp desde la propiedad que te interesa. El corredor de La Dehesa te contacta para coordinar el día y la hora.' },
    ],
    microzonas: ['Los Trapenses', 'Huinganal', 'El Tranque', 'Pie Andino', 'Camino del Sol', 'Los Nogales', 'El Arrayán'],
    colegios: ['Santiago College', 'Craighouse', 'Newland', 'Everest', 'Monte Tabor y Nazaret', 'Huinganal', 'Los Alerces', 'Nido de Águilas', 'Mayflower', 'Instituto Hebreo', 'Huelquén Montessori'],
  },
  {
    slug: 'las-condes',
    nombre: 'Las Condes',
    comuna: 'Las Condes',
    title: 'Casas y departamentos en venta en Las Condes | CyM Propiedades',
    description:
      'Propiedades en venta en Las Condes y San Carlos de Apoquindo: casas y departamentos con fotos y precio en UF. Cotiza por WhatsApp con CyM.',
    h1: 'Casas y departamentos en venta en Las Condes',
    bajada: 'Incluye San Carlos de Apoquindo, con corredor especialista en el sector.',
    intro: [
      'Las Condes concentra una oferta muy variada: departamentos bien conectados cerca de Av. Apoquindo y del Metro, y casas de barrio en sectores como Los Dominicos, Colón o San Carlos de Apoquindo, en la precordillera.',
      'En CyM separamos la atención: un corredor para Las Condes y otro especialista en San Carlos de Apoquindo, para que hables siempre con alguien que conoce el barrio.',
    ],
    barrios: [
      { nombre: 'San Carlos de Apoquindo', texto: 'Sector precordillerano de casas amplias y condominios, muy buscado por familias.' },
      { nombre: 'Los Dominicos', texto: 'Barrio residencial de casas, con parques y acceso a la línea 1 del Metro.' },
      { nombre: 'Eje Apoquindo', texto: 'Departamentos cerca del Metro, comercio, oficinas y servicios.' },
      { nombre: 'Colón y Estoril', texto: 'Barrios consolidados de casas y departamentos, con buena conectividad.' },
    ],
    porQue: [
      'Corredor para Las Condes y especialista en San Carlos de Apoquindo.',
      'Casas y departamentos en distintos rangos de precio.',
      'Asesoría en crédito hipotecario y negociación.',
    ],
    faq: [
      { q: '¿San Carlos de Apoquindo es parte de Las Condes?', a: 'Sí. Es un sector de la comuna de Las Condes, en la precordillera. En CyM tiene un corredor especialista.' },
      { q: '¿Tienen departamentos en Las Condes?', a: 'Sí. En esta página verás casas y departamentos; el tipo aparece en cada ficha.' },
      { q: '¿Cómo cotizo?', a: 'Toca "Cotizar por WhatsApp". El asistente de CyM toma tus datos y te deriva al corredor de la zona.' },
      { q: '¿Puedo vender mi propiedad en Las Condes con CyM?', a: 'Sí. Revisa la sección "Vende tu propiedad" o escríbenos por WhatsApp para una tasación comercial.' },
    ],
    microzonas: ['San Carlos de Apoquindo', 'El Golf', 'Nueva Las Condes', 'Los Dominicos', 'Colón y Estoril'],
    colegios: ['Scuola Italiana Vittorio Montiglio', 'Colegio Cordillera', 'Padre Hurtado y Juanita de Los Andes', 'San Francisco de Asís', 'Villa María Academy', 'Verbo Divino', 'Universidad de los Andes', 'Universidad del Desarrollo', 'Duoc UC San Carlos'],
  },
  {
    slug: 'la-reina',
    nombre: 'La Reina',
    comuna: 'La Reina',
    title: 'Casas en venta en La Reina | CyM Propiedades',
    description:
      'Casas en venta en La Reina y La Reina Alta: terrenos amplios, fotos y precio en UF. Cotiza por WhatsApp con un corredor de CyM Propiedades.',
    h1: 'Casas en venta en La Reina',
    bajada: 'Casas de barrio con terrenos amplios, cerca de la precordillera.',
    intro: [
      'La Reina es una comuna residencial de casas, con terrenos generosos y un ritmo más tranquilo que otros sectores del oriente. La Reina Alta, cerca del Parque Mahuida, es de los sectores más buscados.',
      'CyM acompaña la compra en La Reina con la misma atención que en el resto del sector oriente: visita, negociación y apoyo en el financiamiento.',
    ],
    barrios: [
      { nombre: 'La Reina Alta', texto: 'Casas de terrenos amplios, cerca de la precordillera y del Parque Mahuida.' },
      { nombre: 'Entorno Príncipe de Gales', texto: 'Barrio residencial con comercio, servicios y buena conectividad.' },
      { nombre: 'Eje Av. Larraín', texto: 'Acceso rápido hacia Peñalolén, Ñuñoa y Las Condes.' },
    ],
    porQue: [
      'Casas no pareadas y con terreno, poco frecuentes en otras comunas.',
      'Corredor que coordina visitas y negociación.',
      'Apoyo en crédito hipotecario.',
    ],
    faq: [
      { q: '¿Qué tipo de propiedades hay en La Reina?', a: 'Principalmente casas, muchas con terrenos amplios. En cada ficha verás superficie construida y de terreno.' },
      { q: '¿Cómo cotizo una casa en La Reina?', a: 'Toca "Cotizar por WhatsApp" y el asistente de CyM te deriva al corredor a cargo.' },
      { q: '¿CyM ayuda con el crédito?', a: 'Sí, CyM ofrece gestión de créditos hipotecarios y asesoría financiera.' },
    ],
    microzonas: ['La Reina Alta', 'Entorno Príncipe de Gales', 'Eje Av. Larraín'],
    colegios: [],
  },
]

export function zona(slug: string) {
  return ZONAS.find((z) => z.slug === slug)
}

export const FAQ_HOME = [
  { q: '¿En qué comunas trabaja CyM Propiedades?', a: 'En la Zona Oriente de Santiago: Vitacura, Las Condes, San Carlos de Apoquindo, La Dehesa, Lo Barnechea y La Reina.' },
  { q: '¿Cómo me contacto con un corredor?', a: 'Por WhatsApp: responde 3 preguntas en el asistente de esta página y el corredor de la zona te escribe a la brevedad. También puedes usar el formulario de contacto o llamar al +56 9 3401 8822.' },
  { q: '¿CyM vende y arrienda propiedades?', a: 'Sí. CyM hace compraventa, arriendo y administración de propiedades, además de asesorías inmobiliarias y legales.' },
  { q: '¿Cómo se determina el precio de una propiedad?', a: 'Depende de la ubicación y la microzona, el terreno, la superficie, la orientación, el estado, la distribución, los comparables del sector y la demanda activa. En la tasación te lo explicamos con datos.' },
  { q: '¿Puedo vender mi propiedad con CyM?', a: 'Sí. Trabajamos con un proceso de venta: evaluación comercial, análisis de mercado, estrategia de precio, marketing, calificación de compradores, visitas, negociación y cierre.' },
  { q: '¿CyM ayuda con el crédito hipotecario?', a: 'Sí. Por nuestra alianza con Bci puedes acceder a un crédito preaprobado y conocer tu capacidad de compra antes de elegir.' },
  { q: '¿Dónde están ubicados?', a: 'Av. La Dehesa 1844, oficina 313, Torre Norte, Lo Barnechea.' },
]
