'use client'
// Reel vertical de la serie Barrio 3D: póster liviano, el video se carga solo al tocar Reproducir (preload="none", sin autoplay).
// Un solo reel suena a la vez. Mide la reproducción en GA4 (video_start) y dataLayer.
import { useRef, useState } from 'react'
import type { Reel } from '@/lib/barrio3d'
import { videoSrc, posterSrc } from '@/lib/barrio3d'

type W = Window & { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] }

export default function ReelB3D({ r, prioridad = false }: { r: Reel; prioridad?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [activo, setActivo] = useState(false)

  function reproducir() {
    const v = ref.current
    if (!v) return
    document.querySelectorAll<HTMLVideoElement>('video.reel-video').forEach((o) => o !== v && o.pause())
    setActivo(true)
    v.play().catch(() => {})
    const w = window as W
    w.gtag?.('event', 'video_start', { video_title: `Barrio 3D ${r.n} ${r.titulo}`, origen: 'vender_casa_sector_oriente' })
    w.dataLayer?.push({ event: 'cym_video', video: r.slug })
  }

  return (
    <figure className="reel" id={`reel-${r.n}`}>
      <div className="reel-marco">
        <video
          ref={ref}
          className="reel-video"
          src={videoSrc(r)}
          poster={posterSrc(r)}
          preload="none"
          playsInline
          controls={activo}
          width={720}
          height={1280}
          aria-label={`Video ${r.n}: ${r.titulo}`}
          onEnded={() => setActivo(false)}
        />
        {!activo && (
          <button type="button" className="reel-play" onClick={reproducir} aria-label={`Reproducir video ${r.n}: ${r.titulo}`}>
            <span className="reel-play-icono" aria-hidden="true">▶</span>
            <span className="reel-play-texto">Ver 18 s</span>
          </button>
        )}
        {prioridad && <link rel="preload" as="image" href={posterSrc(r)} />}
      </div>
      <figcaption>
        <span className="mono">{r.n} · {r.etiqueta}</span>
        <b>{r.titulo}</b>
      </figcaption>
    </figure>
  )
}
