#!/usr/bin/env python3
"""Catálogo completo de CyM → data/catalogo.json (24 nov 2026, Christopher: "carga todas las propiedades de cympropiedades.cl").
Recorre el listado público de venta de www.cympropiedades.cl, abre cada ficha y guarda los datos publicados.
No se suben las propiedades ocultas: las que CyM comparte con un enlace que termina en &ve=si (no aparecen en el listado público).
Uso: python3 scripts/catalogo-completo.py              (descarga todo, ~10 min)
     python3 scripts/catalogo-completo.py <carpeta>     (reusa fichas ya descargadas: <carpeta>/<codigo>.html)
"""
import json, re, os, sys, datetime, http.cookiejar, urllib.request, importlib.util
from concurrent.futures import ThreadPoolExecutor

AQUI = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('ap', os.path.join(AQUI, 'actualizar-propiedades.py'))
ap = importlib.util.module_from_spec(spec); spec.loader.exec_module(ap)

U = 'https://www.cympropiedades.cl/'
SALIDA = os.path.join(AQUI, '..', 'data', 'catalogo.json')
CACHE = sys.argv[1] if len(sys.argv) > 1 else None


def listado():
    op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
    op.addheaders = [('User-Agent', 'Mozilla/5.0 (M&P landing CyM)')]
    leer = lambda u: op.open(u, timeout=40).read().decode('latin-1')
    t = leer(U + 'i_listing.asp?select-status=VE&select-property-type=-1&select-region=-1&select-location=-1&rbEs=0&min-price=0&max-price=0&condominio=2')
    ids, vistos = [], set()
    for pag in range(2, 400):
        nuevos = 0
        for enlace, c in re.findall(r'(property\.asp\?idPro=(\d+)[^"\']*)', t, re.I):
            if 've=si' in enlace.lower():  # oculta: no se sube
                continue
            if c not in vistos:
                vistos.add(c); ids.append(c); nuevos += 1
        if not nuevos:
            break
        t = leer(U + f'i_listing.asp?Order=ASC&NumPag={pag}')
    return ids


def ficha(c):
    try:
        if CACHE and os.path.exists(f'{CACHE}/{c}.html') and os.path.getsize(f'{CACHE}/{c}.html') > 2000:
            h = open(f'{CACHE}/{c}.html', encoding='utf-8', errors='replace').read()
            ap.bajar = lambda url, h=h: h  # usa la copia local
        return ap.ficha(c)
    except Exception as e:
        print('error', c, e)
        return None


def main():
    ids = listado()
    print(len(ids), 'propiedades en el listado público')
    with ThreadPoolExecutor(1 if CACHE else 8) as ex:
        fichas = list(ex.map(ficha, ids))
    salida = [d for d in fichas if d and d.get('fotos') and d.get('operacion') == 'Venta' and d.get('comuna')]
    json.dump({'actualizado': datetime.date.today().isoformat(), 'fuente': U + 'i_listing.asp', 'propiedades': salida},
              open(SALIDA, 'w'), ensure_ascii=False, indent=0)
    print(len(salida), 'con ficha y fotos →', os.path.abspath(SALIDA))


if __name__ == '__main__':
    main()
