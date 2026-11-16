#!/usr/bin/env python3
"""Cuenta la cartera de CyM publicada en su sitio oficial (cympropiedades.cl) por comuna → data/cartera-cym.json.
Recorre el listado de venta completo, abre cada ficha (property.asp) y agrupa por comuna.
Uso: python3 scripts/cartera-por-comuna.py            (descarga todo, ~5 min)
     python3 scripts/cartera-por-comuna.py crudo.json (reusa una descarga previa)
Solo datos publicados por CyM: cantidad, tipo, precio publicado y sector (título de la ficha)."""
import json, re, html, sys, os, datetime, statistics
from concurrent.futures import ThreadPoolExecutor
import requests

U = 'https://www.cympropiedades.cl/'
SALIDA = os.path.join(os.path.dirname(__file__), '..', 'data', 'cartera-cym.json')
# landing → comuna de la ficha
LANDINGS = [
    ('vitacura', 'Vitacura', 'Vitacura', None),
    ('la-dehesa', 'La Dehesa', 'Lo Barnechea', 'La Dehesa es el principal sector de Lo Barnechea; el conteo es de toda la comuna'),
    ('san-carlos-de-apoquindo', 'San Carlos de Apoquindo', 'Las Condes', 'son las fichas de Las Condes que nombran el sector San Carlos de Apoquindo'),
    ('las-condes', 'Las Condes', 'Las Condes', None),
    ('la-reina', 'La Reina', 'La Reina', None),
]


def texto(h):
    h = re.sub(r'<script.*?</script>|<style.*?</style>', '', h, flags=re.S)
    t = html.unescape(re.sub(r'<br\s*/?>', '\n', h))
    t = re.sub(r'<[^>]+>', '\n', t)
    return [l.strip() for l in t.split('\n') if l.strip()]


def ficha(c):
    try:
        h = requests.get(U + f'property.asp?Origen=CODIGO&idpro={c}', headers={'User-Agent': 'Mozilla/5.0 (M&P landing CyM)'}, timeout=40).content.decode('latin-1')
    except Exception as e:
        return {'codigo': c, 'error': str(e)}
    L = texto(h)
    try:
        i = L.index('Cód.:')
    except ValueError:
        return {'codigo': c, 'error': 'sin ficha'}
    d = {'codigo': c}
    d['precio'] = next((l for l in L[:i] if re.match(r'^(UF|\$)\s', l)), '').replace(',00', '')
    d['operacion'] = 'Arriendo' if 'Arriendo' in L[:i][-3:] else 'Venta'
    d['tipo'] = L[i + 3] if L[i + 2] == 'Tipo:' else ''
    j = next((k for k in range(i, min(i + 15, len(L))) if 'SANTIAGO' in L[k].upper() or ', ' in L[k]), None)
    d['ubic'] = L[j] if j else ''
    d['comuna'] = L[j].split(',')[0].strip().title() if j else ''
    k = next((k for k in range(i, min(i + 18, len(L))) if re.match(r'\d+ Baño', L[k])), i + 10)
    d['titulo'] = L[k + 1].strip(' .') if k + 1 < len(L) else ''
    return d


def descargar():
    s = requests.Session(); s.headers['User-Agent'] = 'Mozilla/5.0 (M&P landing CyM)'
    r = s.get(U + 'i_listing.asp?select-status=VE&select-property-type=-1&select-region=-1&select-location=-1&rbEs=0&min-price=0&max-price=0&condominio=2')
    ids, vistos = [], set()

    def sumar(t):
        n = 0
        for x in re.findall(r'idpro=(\d+)', t, re.I):
            if x not in vistos and x not in ('0', '15', '16'):
                vistos.add(x); ids.append(x); n += 1
        return n
    sumar(r.text)
    for p in range(2, 300):
        if not sumar(s.get(U + f'i_listing.asp?Order=ASC&NumPag={p}').text):
            break
    with ThreadPoolExecutor(10) as ex:
        return list(ex.map(ficha, ids))


def uf(p):
    m = re.match(r'UF\s*([\d.]+)', p or '')
    return int(m.group(1).replace('.', '')) if m else None


def sector(t):
    t = re.split(r'[/,(]| - ', t)[0].strip(' .')
    return t.title() if 3 <= len(t) <= 30 and not re.search(r'\d{3,}|OPORTUNIDAD|EXCELENTE|VENDE|REMODELAR|IMPECABLE|LINDA|HERMOS|^CONDOMINIO$|DEPARTAMENTO|ACOGEDOR|CASA', t.upper()) else None


def main():
    crudo = json.load(open(sys.argv[1])) if len(sys.argv) > 1 else descargar()
    venta = [x for x in crudo if 'error' not in x and x.get('operacion') == 'Venta']
    out = []
    for slug, nombre, comuna, nota in LANDINGS:
        xs = [x for x in venta if x['comuna'] == comuna]
        if slug == 'san-carlos-de-apoquindo':  # solo fichas de Las Condes que nombran el sector
            xs = [x for x in xs if re.search(r'SAN CARLOS', (x.get('titulo', '') + ' ' + x.get('ubic', '')).upper())]
        precios = sorted(p for p in (uf(x['precio']) for x in xs) if p)
        casas = sum(1 for x in xs if x['tipo'].lower().startswith('casa'))
        deptos = sum(1 for x in xs if x['tipo'].lower().startswith('depto') or 'departamento' in x['tipo'].lower())
        cont = {}
        for x in xs:
            s = sector(x.get('titulo', ''))
            if s:
                s = s.replace('San Carlos Apoquindo', 'San Carlos De Apoquindo').replace('Ossandon', 'Ossandón').replace('Aleman', 'Alemán').replace('Frances', 'Francés').replace('Francésa', 'Francesa').replace('Maria', 'María').replace('Arrayan', 'Arrayán').replace('Quinchamali', 'Quinchamalí').replace('Reina Alta', 'La Reina Alta').replace('La La Reina Alta', 'La Reina Alta')
                s = re.sub(r'\bDe\b', 'de', re.sub(r'\bDel\b', 'del', re.sub(r'\bLa\b(?!s)', 'La', s)))
                cont[s] = cont.get(s, 0) + 1
        sectores = [s for s, n in sorted(cont.items(), key=lambda z: -z[1]) if n >= 2][:8]
        out.append({'slug': slug, 'nombre': nombre, 'comuna_ficha': 'San Carlos de Apoquindo, Las Condes' if slug == 'san-carlos-de-apoquindo' else comuna, 'nota': nota, 'venta': len(xs), 'casas': casas, 'departamentos': deptos,
                    'otros': len(xs) - casas - deptos, 'min_uf': precios[0] if precios else None, 'max_uf': precios[-1] if precios else None,
                    'mediana_uf': int(statistics.median(precios)) if precios else None, 'sectores': sectores})
    json.dump({'fecha': datetime.date.today().isoformat(), 'fuente': U + 'i_listing.asp?select-status=VE&select-property-type=-1&select-region=-1&select-location=-1&rbEs=0&min-price=0&max-price=0&condominio=2',
               'total_venta': len(venta), 'comunas': out}, open(SALIDA, 'w'), ensure_ascii=False, indent=1)
    print(len(venta), 'en venta →', os.path.abspath(SALIDA))
    for o in out:
        print(o['slug'], o['venta'], o['casas'], o['departamentos'], o['min_uf'], o['max_uf'], o['sectores'])


if __name__ == '__main__':
    main()
