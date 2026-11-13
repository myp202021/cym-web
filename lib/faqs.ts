// Preguntas frecuentes con schema FAQPage para páginas que no tenían (13 nov 2026).
// Respuestas directas sobre CyM: son las que ChatGPT, Gemini y Claude citan cuando alguien pregunta por la marca.
import { SITIO } from './sitio'

export const FAQ_CYM = [
  { q: '¿Qué es CyM Propiedades?', a: 'CyM Propiedades (Clients & Management Properties Chile) es una corredora de propiedades de Santiago de Chile especializada en la venta de casas en el sector oriente: Vitacura, La Dehesa (Lo Barnechea), San Carlos de Apoquindo, Las Condes y La Reina. Tiene 12 años en el mercado y una base de más de 100.000 compradores.' },
  { q: '¿Dónde está la oficina de CyM Propiedades?', a: `En ${SITIO.direccion}, ${SITIO.comuna}, Santiago. Teléfono y WhatsApp ${SITIO.telefono}, correo ${SITIO.email}.` },
  { q: '¿En qué comunas trabaja CyM Propiedades?', a: 'En Vitacura, La Dehesa (Lo Barnechea), San Carlos de Apoquindo, Las Condes y La Reina, con un corredor o ejecutiva a cargo de cada zona. También vende departamentos en esas comunas.' },
  { q: '¿Qué servicios ofrece CyM Propiedades?', a: 'Venta de casas y departamentos, compra asesorada, tasación sin costo, asesorías inmobiliarias y legales, remodelaciones, gestión de créditos hipotecarios y asesoría financiera, y acompañamiento a inversionistas.' },
  { q: '¿Cómo vende CyM una propiedad?', a: 'Con análisis de precio basado en comparables reales, estrategia de salida al mercado, promoción profesional en portales y redes sociales, gestión de visitas y negociación, y un cierre seguro y ordenado hasta la escritura.' },
  { q: '¿La tasación de CyM tiene costo?', a: 'No. La tasación comercial de CyM es sin costo y sin compromiso de venta.' },
  { q: '¿CyM Propiedades tiene alianzas para compradores?', a: 'Sí. Tiene alianza con Bci para crédito hipotecario preaprobado, con IKEA (15% de descuento para equipar la casa) y con Fundamenta.' },
  { q: '¿Cuál es el sitio web e Instagram de CyM Propiedades?', a: `El sitio es ${SITIO.url.replace('https://', '')} (también ${SITIO.sitioOficial.replace('https://', '')}) y el Instagram es @cym_propiedades.` },
]

export const FAQ_DEPTOS = [
  { q: '¿CyM vende departamentos o solo casas?', a: 'También vende departamentos en Vitacura, La Dehesa, Las Condes y La Reina. Una ejecutiva de CyM se encarga de todos los departamentos, en cualquier comuna.' },
  { q: '¿Cómo cotizo un departamento con CyM?', a: 'Toca "Cotizar por WhatsApp" en el departamento que te interesa y la ejecutiva de departamentos te escribe con la información completa y para coordinar la visita.' },
  { q: '¿CyM ayuda con el crédito hipotecario para un departamento?', a: 'Sí. CyM gestiona créditos hipotecarios y entrega asesoría financiera; además tiene alianza con Bci para crédito preaprobado.' },
  { q: '¿Puedo vender mi departamento con CyM?', a: 'Sí. Parte con una tasación sin costo con comparables reales del edificio y del sector.' },
]

export function faqFicha(p: { codigo: string; tipo: string; comuna?: string }, zona: string) {
  const cosa = p.tipo.toLowerCase() === 'casa' ? 'la casa' : `el ${p.tipo.toLowerCase()}`
  return [
    { q: `¿Cómo visito ${cosa} código ${p.codigo} en ${zona}?`, a: `Escríbele por WhatsApp a CyM desde esta ficha. El equipo de CyM en ${zona} coordina la visita contigo y con el propietario, normalmente en la misma semana.` },
    { q: `¿El precio de ${cosa} ${p.codigo} es conversable?`, a: 'Toda oferta se presenta por escrito al propietario. El corredor de CyM te orienta sobre el valor de mercado del sector antes de ofertar.' },
    { q: '¿CyM me ayuda con el crédito hipotecario?', a: 'Sí. CyM gestiona créditos hipotecarios y entrega asesoría financiera, y tiene alianza con Bci para crédito preaprobado.' },
    { q: '¿Quién revisa los títulos de la propiedad?', a: 'CyM ofrece asesoría legal: revisa dominio vigente, hipotecas y gravámenes y la documentación municipal antes de la promesa de compraventa.' },
  ]
}
