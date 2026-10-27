#!/usr/bin/env python3
"""Arma data/propiedades.json con las propiedades que CyM tiene en campaña Meta este mes.
Fuente de códigos: ~/cym-dashboard/data/seguimiento-AAAA-MM.json (gasto > 0).
Fuente de datos: ficha oficial www.cympropiedades.cl/property.asp (precio, superficie, dormitorios, fotos, descripción).
Uso: python3 scripts/actualizar-propiedades.py [AAAA-MM]
"""
import json, re, html, sys, os, datetime, urllib.request, time

MES = sys.argv[1] if len(sys.argv) > 1 else datetime.date.today().strftime('%Y-%m')
SEG = os.path.expanduser(f'~/cym-dashboard/data/seguimiento-{MES}.json')
FICHA = 'https://www.cympropiedades.cl/property.asp?Origen=CODIGO&idpro={}'
SALIDA = os.path.join(os.path.dirname(__file__), '..', 'data', 'propiedades.json')

# Campaña Meta → página de la landing ("SCA" = San Carlos de Apoquindo, Las Condes)
ZONA = {'La Dehesa': 'la-dehesa', 'Vitacura': 'vitacura', 'Las Condes': 'las-condes', 'SCA': 'las-condes', 'La Reina': 'la-reina'}
COMUNA_ZONA = {'Lo Barnechea': 'la-dehesa', 'Vitacura': 'vitacura', 'Las Condes': 'las-condes', 'La Reina': 'la-reina'}


def bajar(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (M&P landing CyM)'})
    return urllib.request.urlopen(req, timeout=30).read().decode('latin-1')


def texto(h):
    h = re.sub(r'<script.*?</script>|<style.*?</style>', '', h, flags=re.S)
    t = html.unescape(re.sub(r'<br\s*/?>', '\n', h))
    t = re.sub(r'<[^>]+>', '\n', t)
    return [l.strip() for l in t.split('\n') if l.strip()]


def ficha(codigo):
    h = bajar(FICHA.format(codigo))
    L = texto(h)
    try:
        i = L.index('Cód.:')
    except ValueError:
        return None
    d = {'codigo': codigo, 'url_ficha': FICHA.format(codigo)}
    precio = next((l for l in L[:i] if re.match(r'^(UF|\$)\s', l)), '')
    d['precio'] = precio.replace(',00', '')
    d['operacion'] = 'Arriendo' if 'Arriendo' in L[:i][-3:] else 'Venta'
    d['tipo'] = L[i + 3] if L[i + 2] == 'Tipo:' else ''
    sup = re.findall(r'Sup\.:\s*([\d.,]+)\s*m2\s*/?\s*([\d.,]*)', ' '.join(L[i:i + 12]))
    if sup:
        d['m2_construidos'], d['m2_terreno'] = sup[0]
    j = next((k for k in range(i, i + 15) if 'SANTIAGO' in L[k].upper() or ', ' in L[k]), None)
    d['comuna'] = L[j].split(',')[0].strip().title() if j else ''
    dm = next((re.match(r'(\d+) Dormitorio', l) for l in L[i:i + 15] if re.match(r'\d+ Dormitorio', l)), None)
    bn = next((re.match(r'(\d+) Baño', l) for l in L[i:i + 15] if re.match(r'\d+ Baño', l)), None)
    d['dormitorios'] = int(dm.group(1)) if dm else None
    d['banos'] = int(bn.group(1)) if bn else None
    k = next((k for k in range(i, i + 18) if re.match(r'\d+ Baño', L[k])), i + 10)
    fin = next((x for x in range(k, len(L)) if L[x].startswith('Para encontrar más propiedades') or L[x] in ('Más Información', 'Detalles Adicionales')), k + 20)
    d['titulo'] = L[k + 1].strip(' .') if k + 1 < fin else ''
    d['descripcion'] = '\n'.join(L[k + 2:fin]).strip()
    fotos = []
    for f in re.findall(r'["\'](Fotos/%s[a-z]?\d*\.(?:jpe?g|png|webp))["\']' % codigo, h, flags=re.I):
        u = 'https://www.cympropiedades.cl/' + f
        if u not in fotos:
            fotos.append(u)
    d['fotos'] = fotos[:12]
    contacto = re.search(r'Nombre:\s*\n?\s*([^\n]+)', '\n'.join(L))
    d['oficina'] = contacto.group(1).strip() if contacto else ''
    return d


def main():
    seg = json.load(open(SEG))
    salida = []
    for x in seg['por_codigo']:
        if x.get('gasto', 0) <= 0:
            continue
        try:
            d = ficha(x['codigo'])
        except Exception as e:
            print('error', x['codigo'], e)
            continue
        if not d or not d.get('fotos'):
            print('sin ficha publicada', x['codigo'])
            continue
        d['campana'] = x['comuna']
        d['zona'] = ZONA.get(x['comuna']) or COMUNA_ZONA.get(d['comuna'], '')
        if x['comuna'] == 'SCA':
            d['sector'] = 'San Carlos de Apoquindo'
        if not d['zona']:
            print('sin zona', x['codigo'], d['comuna'])
            continue
        salida.append(d)
        time.sleep(0.4)
    json.dump({'actualizado': datetime.date.today().isoformat(), 'mes_campana': MES, 'propiedades': salida},
              open(SALIDA, 'w'), ensure_ascii=False, indent=1)
    print(len(salida), 'propiedades →', os.path.abspath(SALIDA))


if __name__ == '__main__':
    main()
