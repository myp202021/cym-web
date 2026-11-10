'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Item = { href: string; texto: string }

// Menú principal: en escritorio va en línea; en celular se pliega tras el botón ☰ (10 nov 2026).
export default function MenuPrincipal({ comunas }: { comunas: Item[] }) {
  const [abierto, setAbierto] = useState(false)
  const ruta = usePathname()
  useEffect(() => setAbierto(false), [ruta])
  useEffect(() => {
    document.body.classList.toggle('menu-abierto', abierto)
  }, [abierto])
  return (
    <>
      <button
        type="button"
        className="menu-boton"
        aria-expanded={abierto}
        aria-controls="menu-principal"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setAbierto((v) => !v)}
      >
        <span /><span /><span />
      </button>
      <nav id="menu-principal" aria-label="Principal" className={abierto ? 'abierto' : ''}>
        <p className="menu-titulo">Comunas</p>
        {comunas.map((c) => (
          <Link key={c.href} href={c.href} className="menu-comuna">{c.texto}</Link>
        ))}
        <p className="menu-titulo">CyM</p>
        <Link href="/vende-tu-propiedad">Vender</Link>
        <Link href="/tasacion-propiedades">Tasar</Link>
        <Link href="/guias">Guías</Link>
        <Link href="/quienes-somos">Nosotros</Link>
        <Link href="/contacto" className="nav-cta">Contacto</Link>
      </nav>
    </>
  )
}
