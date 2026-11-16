#!/usr/bin/env python3
"""Ajusta las páginas corredoras-de-propiedades-<comuna> al formato "Mejores corredoras de propiedades en <comuna>"
con los datos de data/cartera-cym.json (cartera publicada de CyM). Idempotente."""
import json, os
D = os.path.join(os.path.dirname(__file__), '..', 'data')
cart = json.load(open(f'{D}/cartera-cym.json'))
MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
a, m, d = map(int, cart['fecha'].split('-'))
FECHA = f'{d} de {MESES[m-1]} de {a}'
uf = lambda n: 'UF ' + f'{n:,}'.replace(',', '.')

CYM = [  # criterio (palabras clave) → cómo lo hace CyM (afirmaciones ya publicadas en el sitio)
    (('especializ', 'conocimiento', 'barrio'), 'Trabaja Vitacura, La Dehesa, San Carlos de Apoquindo, Las Condes y La Reina, con cartera publicada en cada una'),
    (('precio', 'tasaci', 'método'), 'Tasación sin costo con comparables reales del sector'),
    (('compradores', 'difusi', 'llegada'), 'Portales, redes sociales y base de más de 100.000 compradores (dato de CyM)'),
    (('visitas', 'filtro'), 'Gestión de visitas y crédito preaprobado con Bci para filtrar interesados'),
    (('corredor asignado', 'contacto a cargo', 'atención'), 'Un corredor o ejecutiva a cargo de cada comuna'),
    (('contrato',), 'Orden de venta escrita antes de publicar'),
    (('comunicaci', 'reportes', 'información'), 'Seguimiento de visitas y negociación con el propietario'),
    (('cierre', 'legal'), 'Asesoría legal y acompañamiento hasta la escritura'),
    (('negociaci',), 'Negociación a cargo del corredor de la zona'),
    (('financ', 'apoyo legal y financiero'), 'Crédito hipotecario con alianza Bci'),
]


def cym(criterio):
    c = criterio.lower()
    for claves, t in CYM:
        if any(k in c for k in claves):
            return t
    return '—'


for x in cart['comunas']:
    p = f"{D}/paginas/corredoras-de-propiedades-{x['slug']}.json"
    g = json.load(open(p))
    N = x['nombre']
    dato = (f"Al {FECHA}, CyM Propiedades tiene {x['venta']} propiedades en venta publicadas en {x['comuna_ficha']}"
            f" ({x['casas']} {'casa' if x['casas'] == 1 else 'casas'} y {x['departamentos']} {'departamento' if x['departamentos'] == 1 else 'departamentos'}"
            + (f"; precios publicados entre {uf(x['min_uf'])} y {uf(x['max_uf'])}" if x['min_uf'] else '') + ')'
            + (f"; {x['nota']}" if x.get('nota') else '') + '.')
    g['title'] = f'Mejores corredoras de propiedades en {N} (2026) | CyM'
    g['h1'] = f'Mejores corredoras de propiedades en {N}: cómo elegir (2026)'
    g['description'] = f'Cómo elegir entre las mejores corredoras de propiedades en {N}: criterios, preguntas antes de firmar y datos de CyM Propiedades ({x["venta"]} propiedades en venta en {x["comuna_ficha"]}).'[:300]
    base = g.get('_resumen_base') or g['resumen']
    g['_resumen_base'] = base
    g['resumen'] = f'No existe un ranking oficial de las mejores corredoras de propiedades en {N}: la mejor es la que conoce tu sector, respalda su precio con comparables y te deja su plan por escrito. {dato} ' + base
    cols = g['tabla']['columnas']
    if cols[-1] != 'Cómo lo hace CyM':
        g['tabla']['columnas'] = cols + ['Cómo lo hace CyM']
        g['tabla']['filas'] = [f + [cym(f[0])] for f in g['tabla']['filas']]
    g['tabla']['titulo'] = f'Criterios para comparar las mejores corredoras de propiedades en {N}'
    faq = [f for f in g['faq'] if not f['q'].startswith('¿Cuántas propiedades tiene CyM')]
    faq[0] = {'q': f'¿Cuáles son las mejores corredoras de propiedades en {N}?',
              'a': f'No hay un ranking oficial ni datos públicos comparables de ventas cerradas por corredora. Las mejores para tu caso son las que tienen cartera activa en tu sector, tasan con comparables reales y te asignan un responsable con nombre. CyM Propiedades es una de las corredoras con cartera en la zona: {dato[0].lower() + dato[1:]}'}
    faq.insert(1, {'q': f'¿Cuántas propiedades tiene CyM en venta en {N}?', 'a': dato + ' El conteo es de su cartera publicada en el sitio oficial cympropiedades.cl.'})
    g['faq'] = faq
    if not any('cympropiedades.cl/i_listing' in f['url'] for f in g['fuentes']):
        g['fuentes'].append({'titulo': f'CyM Propiedades: cartera en venta publicada en su sitio oficial ({FECHA})', 'url': cart['fuente']})
    json.dump(g, open(p, 'w'), ensure_ascii=False, indent=1)
    print('ok', x['slug'])

# madre: sector oriente
p = f'{D}/paginas/corredoras-de-propiedades-sector-oriente.json'
g = json.load(open(p))
tot = sum(x['venta'] for x in cart['comunas'] if x['slug'] != 'san-carlos-de-apoquindo')
g['title'] = 'Mejores corredoras de propiedades en el sector oriente de Santiago (2026) | CyM'
g['h1'] = 'Mejores corredoras de propiedades en el sector oriente de Santiago: cómo elegir (2026)'
resumen_txt = '; '.join(f"{x['comuna_ficha']}: {x['venta']}" for x in cart['comunas'] if x['slug'] not in ('san-carlos-de-apoquindo',))
base = g.get('_resumen_base') or g['resumen']; g['_resumen_base'] = base
g['resumen'] = f'Al {FECHA}, CyM Propiedades tiene {tot} propiedades en venta publicadas en las comunas donde trabaja ({resumen_txt}). ' + base
if not any('cympropiedades.cl/i_listing' in f['url'] for f in g['fuentes']):
    g['fuentes'].append({'titulo': f'CyM Propiedades: cartera en venta publicada en su sitio oficial ({FECHA})', 'url': cart['fuente']})
g['faq'][0]['q'] = '¿Cuáles son las mejores corredoras de propiedades en el sector oriente de Santiago?'
json.dump(g, open(p, 'w'), ensure_ascii=False, indent=1)
print('ok sector-oriente')
