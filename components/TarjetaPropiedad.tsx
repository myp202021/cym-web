import Image from 'next/image'
import Link from 'next/link'
import BotonWhatsApp from './BotonWhatsApp'
import { type Propiedad, titulo, zonaAgente } from '@/lib/propiedades'
import { mensajeWeb } from '@/lib/sitio'

export default function TarjetaPropiedad({ p, nombreZona }: { p: Propiedad; nombreZona: string }) {
  const tipo = p.tipo === 'Casa' ? 'la casa' : 'el departamento'
  const mensaje = mensajeWeb([`Me interesa ${tipo} código ${p.codigo} en ${zonaAgente(p, nombreZona)}.`])
  return (
    <article className="tarjeta">
      <Link href={`/propiedades/${p.zona}/${p.codigo}`} className="tarjeta-foto">
        <Image src={p.fotos[0]} alt={`${p.tipo} en venta en ${p.sector || p.comuna}, código ${p.codigo}`} fill sizes="(max-width: 700px) 100vw, 380px" />
        <span className="etiqueta">{p.operacion}</span>
      </Link>
      <div className="tarjeta-texto">
        <p className="precio">{p.precio}</p>
        <h3>
          <Link href={`/propiedades/${p.zona}/${p.codigo}`}>{titulo(p)}</Link>
        </h3>
        <p className="datos">
          {p.tipo} · {p.sector || p.comuna}
          {p.dormitorios ? ` · ${p.dormitorios} dorm.` : ''}
          {p.banos ? ` · ${p.banos} baños` : ''}
          {p.m2_construidos ? ` · ${p.m2_construidos} m²` : ''}
        </p>
        <p className="codigo">Código {p.codigo}</p>
        <BotonWhatsApp texto="Cotizar por WhatsApp" mensaje={mensaje} origen={`propiedad_${p.codigo}`} className="btn btn-wa ancho" />
      </div>
    </article>
  )
}
