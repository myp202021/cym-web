import SitioOficial from '@/components/SitioOficial'
import { FAQ_DEPTOS } from '@/lib/faqs'
import Faq from '@/components/Faq'
import Link from 'next/link'
import type { Metadata } from 'next'
import FondoHero, { FONDOS } from '@/components/FondoHero'
import TarjetaPropiedad from '@/components/TarjetaPropiedad'
import BotonWhatsApp from '@/components/BotonWhatsApp'
import WhatsAppFlotante from '@/components/WhatsAppFlotante'
import { PROPIEDADES, resumen, formatoUF } from '@/lib/propiedades'
import { mensajeWeb, WHATSAPP_ZONA } from '@/lib/sitio'
import { zona as buscarZona } from '@/lib/zonas'

// Departamentos: categoría aparte, como una zona más (Christopher, 10 nov 2026). Los atiende Caro Paoletti.
export const metadata: Metadata = {
  title: 'Departamentos en venta en el sector oriente | CyM Propiedades',
  description: 'Departamentos en venta en el sector oriente de Santiago, con fotos, superficie y precio en UF. Cotiza por WhatsApp con el equipo de Departamentos de CyM.',
  alternates: { canonical: '/propiedades/departamentos' },
}

export default function PaginaDepartamentos() {
  const lista = PROPIEDADES.filter((p) => p.tipo === 'Departamento')
  const r = resumen(lista)
  return (
    <>
      <nav className="migas contenedor" aria-label="Ruta">
        <Link href="/">Inicio</Link> / <span>Departamentos</span>
      </nav>
      <section className="hero hero-zona">
        <FondoHero src={FONDOS.contacto} />
        <div className="contenedor">
          <p className="sobretitulo">Sector oriente</p>
          <h1>Departamentos en venta</h1>
          <p className="bajada">Departamentos en el sector oriente, con un equipo dedicado.</p>
          <ul className="cifras">
            <li><b>{r.total}</b> {r.total === 1 ? 'departamento publicado' : 'departamentos publicados'}</li>
            {r.minUF && r.maxUF && (
              <li><b>{r.minUF === r.maxUF ? formatoUF(r.minUF) : `${formatoUF(r.minUF)} – ${formatoUF(r.maxUF)}`}</b> {r.minUF === r.maxUF ? 'precio' : 'rango de precios'}</li>
            )}
          </ul>
          <BotonWhatsApp texto="Cotizar departamentos por WhatsApp" mensaje={mensajeWeb(['Quiero cotizar departamentos.'])} origen="zona_departamentos" numero={WHATSAPP_ZONA['Departamentos']} />
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor">
          <h2>Departamentos en venta</h2>
          <div className="grilla">
            {lista.map((p) => (
              <TarjetaPropiedad key={p.codigo} p={p} nombreZona={buscarZona(p.zona)?.nombre || ''} />
            ))}
          </div>
        </div>
      </section>
      <WhatsAppFlotante zona="Departamentos" />
      <Faq items={FAQ_DEPTOS} titulo="Preguntas frecuentes sobre departamentos con CyM" />
      <SitioOficial />
    </>
  )
}
