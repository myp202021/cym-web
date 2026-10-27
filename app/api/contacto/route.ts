import nodemailer from 'nodemailer'

// Formulario de contacto → correo a CyM (contacto@cympropiedades.cl) con copia oculta a M&P.
// Variables en Vercel: GMAIL_USER y GMAIL_APP_PASSWORD (clave de aplicación de la cuenta que envía).
const PARA = process.env.CONTACTO_PARA || 'contacto@cympropiedades.cl'
const COPIA = process.env.CONTACTO_COPIA || 'christopher@mulleryperez.cl'

const esc = (s: unknown) =>
  String(s ?? '')
    .slice(0, 1500)
    .replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]!)

export async function POST(req: Request) {
  let d: Record<string, string>
  try {
    d = await req.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }
  if (d.empresa) return Response.json({ ok: true }) // trampa anti-spam
  if (!d.nombre?.trim() || !d.telefono?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email || '')) {
    return Response.json({ ok: false, error: 'datos' }, { status: 400 })
  }
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('[contacto] faltan GMAIL_USER / GMAIL_APP_PASSWORD')
    return Response.json({ ok: false, error: 'config' }, { status: 500 })
  }

  const filas = [
    ['Nombre', d.nombre],
    ['Teléfono', d.telefono],
    ['Email', d.email],
    ['Necesita', d.operacion],
    ['Zona', d.zona],
    ['Código propiedad', d.codigo],
    ['Mensaje', d.mensaje],
    ['Página', d.pagina],
    ['Origen', d.origen],
  ].filter(([, v]) => v)
  const fono = String(d.telefono).replace(/\D/g, '')
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">
<p><b>Nuevo contacto desde la web de CyM Propiedades</b></p>
<table style="border-collapse:collapse">${filas
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><b>${esc(v).replace(/\n/g, '<br>')}</b></td></tr>`)
    .join('')}</table>
${fono ? `<p><a href="https://wa.me/${fono.length === 9 ? '56' + fono : fono}">Escribirle por WhatsApp</a></p>` : ''}
</div>`

  try {
    const smtp = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } })
    await smtp.sendMail({
      from: `"Web CyM Propiedades" <${process.env.GMAIL_USER}>`,
      to: PARA,
      bcc: COPIA,
      replyTo: `"${String(d.nombre).replace(/"/g, '')}" <${d.email}>`,
      subject: `Nuevo contacto web CyM: ${String(d.nombre).slice(0, 60)}${d.zona ? ` · ${d.zona}` : ''}${d.codigo ? ` · código ${d.codigo}` : ''}`,
      html,
    })
    return Response.json({ ok: true })
  } catch (e) {
    console.error('[contacto] error al enviar', e)
    return Response.json({ ok: false, error: 'envio' }, { status: 502 })
  }
}
