import JsonLd from './JsonLd'

export default function Faq({ items, titulo = 'Preguntas frecuentes' }: { items: { q: string; a: string }[]; titulo?: string }) {
  return (
    <section className="seccion" id="preguntas">
      <div className="contenedor angosto">
        <h2>{titulo}</h2>
        {items.map((f) => (
          <details key={f.q} className="faq">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
    </section>
  )
}
