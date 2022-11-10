from flask import Flask, render_template, url_for, request
import requests
import urllib
import json
from requests.auth import AuthBase
from Crypto.Hash import HMAC
from Crypto.Hash import SHA256
from datetime import datetime, timedelta
from dateutil.tz import tzlocal
from pandas import json_normalize
import numpy as np
import pandas as pd
import math
import psycopg2
import geopandas
from osgeo import gdal, ogr
import time
from cla import publicKey, privateKey
app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
@app.route('/Pasado')
def pasado():
    return render_template('Pasado.html')
@app.route('/Futuro')
def fut():
    return render_template('Futuro.html')
@app.route('/Presente')
def presente():
    return render_template('Presente.html')
@app.route('/Atlasinteractivo')
def atlas():
    return render_template('Atlas_interactivo.html')
@app.route('/Aguautilpresente')
def agua():
    return render_template('Mapas_presente.html')
@app.route('/Publicaciones')
def publi():
    return render_template('Publicaciones.html')
@app.route('/Sietedias')
def sietedias():
    return render_template('Siete_Dias.html')    
@app.route('/humedadsuelonp', methods=["GET", "POST"])

def mapa():
    if request.method == 'POST':
        var = request.form.get('variable')
        year = request.form.get('year')
        mes = request.form.get('cosa')
        dia=request.form.get('options')
        # ip desde casa zero tier
        #conexion = psycopg2.connect(host= "10.147.17.191",dbname="ciag", user="tomy", password="tomy1234", port="5432")
        # compu facultad
        conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")

        dat = str(year) + "-" + str(mes) + "-" + (str(dia))
        if var=="Humedad del suelo (NASAPOWER)":
            resultados = pd.read_sql(
                'select "LAT" as lat, "LONG" as lon,  avg("%AU") as au FROM bhoa."bhoa_power_nasa" where extract(year from (fecha))=' + str(
                    year) + ' and extract(month from (fecha))=' + str(mes) + ' and extract(day from (fecha))=' + str(
                    dia) + ' group by "LAT", "LONG"', conexion)
            df = pd.DataFrame(resultados)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('puntos_powernasa.shp')
            capa = "puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
            dem = gdal.Open("grilla.tif")
            gt = dem.GetGeoTransform()
            ulx = gt[0]
            uly = gt[3]
            res = gt[1]
            xsize = dem.RasterXSize
            ysize = dem.RasterYSize
            lrx = ulx + xsize * res
            lry = uly - ysize * res
            dem = None

            # Interpolacion del punto mas cerca
            campo = "au"
            pts = layer = None

            # interpolación idw "invdist:power=3"
            # interpolacion del punto mas cercano "nearest"
            # interpolación linear "linear"

            nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                           algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None
            import numpy as np

            gdal.UseExceptions()
            rasin = "nearest.tif"
            shpin = "arg.shp"
            rasout = "./static/AU-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                              resampleAlg="bilinear")
            # recorto con shape de Arg
            dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date=(dia+"-"+mes+"-"+year)

            return render_template('humedadsuelonp.html',year=year,mes=mes,dia=dia, fecha=date)
        if var == "Temperatura mínima absoluta(NASAPOWER)":
            resultados = pd.read_sql(
                'select "lat" as lat, "lon" as lon,  min(t_min) as tmin FROM public.nasa_power_ where t_min != -999 and year =' + str(
                    year) + ' and mes=' + str(mes) +' group by "lat", "lon"', conexion)

            df = pd.DataFrame(resultados)
            print(df)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('puntos_powernasa.shp')
            capa = "puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
            dem = gdal.Open("grilla.tif")
            gt = dem.GetGeoTransform()
            ulx = gt[0]
            uly = gt[3]
            res = gt[1]
            xsize = dem.RasterXSize
            ysize = dem.RasterYSize
            lrx = ulx + xsize * res
            lry = uly - ysize * res
            dem = None

            # Interpolacion del punto mas cerca
            campo = "tmin"
            pts = layer = None

            # interpolación idw "invdist:power=3"
            # interpolacion del punto mas cercano "nearest"
            # interpolación linear "linear"

            nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                           algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None
            import numpy as np

            gdal.UseExceptions()
            rasin = "nearest.tif"
            shpin = "arg.shp"
            rasout = "./static/tmin-PN/" + str(year) + str(mes) + ".tif"
            resampleada = "nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                              resampleAlg="bilinear")
            # recorto con shape de Arg
            dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = (dia + "-" + mes + "-" + year)

            return render_template('humedadsuelonp.html', year=year, mes=mes, dia=dia, fecha=date)
    now = datetime.now() - timedelta(hours=85)
    date = str(now.day) + "-" + str(now.month) + "-" + str(now.year)
    year = (now.year)
    mes = (now.month)
    dia = (now.day)
    return render_template('humedadsuelonp.html',year=now.year,mes=now.month,dia=now.day, fecha= now)

@app.route('/humedadsuelonpVIEJA', methods=["GET", "POST"])
def mapaS():
    if request.method == 'POST':
        year = request.form.get('year')
        mes = request.form.get('cosa')
        dia=request.form.get('options')
        # ip desde casa zero tier
        #conexion = psycopg2.connect(host= "10.147.17.191",dbname="ciag", user="tomy", password="tomy1234", port="5432")
        # compu facultad
        conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")

        dat = str(year) + "-" + str(mes) + "-" + (str(dia))

        resultados = pd.read_sql(
            'select "LAT" as lat, "LONG" as lon,  avg("%AU") as au FROM bhoa."bhoa_power_nasa" where extract(year from (fecha))=' + str(
                year) + ' and extract(month from (fecha))=' + str(mes) + ' and extract(day from (fecha))=' + str(
                dia) + ' group by "LAT", "LONG"', conexion)
        df = pd.DataFrame(resultados)
        gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
        gdf = gdf.set_crs('epsg:4326')
        gdf.to_file('puntos_powernasa.shp')
        capa = "puntos_powernasa.shp"
        pts = ogr.Open(capa, 0)
        dem = gdal.Open("grilla.tif")
        gt = dem.GetGeoTransform()
        ulx = gt[0]
        uly = gt[3]
        res = gt[1]
        xsize = dem.RasterXSize
        ysize = dem.RasterYSize
        lrx = ulx + xsize * res
        lry = uly - ysize * res
        dem = None

        # Interpolacion del punto mas cerca
        campo = "au"
        pts = layer = None

        # interpolación idw "invdist:power=3"
        # interpolacion del punto mas cercano "nearest"
        # interpolación linear "linear"

        nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                       algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
        nn = None
        import numpy as np

        gdal.UseExceptions()
        rasin = "nearest.tif"
        shpin = "arg.shp"
        rasout = "./static/AU-PN/" + str(year) + str(mes) + str(dia) + ".tif"
        resampleada = "nearest_resampleada.tif"
        # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
        dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                          resampleAlg="bilinear")
        # recorto con shape de Arg
        dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
        date=(dia+"-"+mes+"-"+year)

        return render_template('humedadsuelonp.html',year=year,mes=mes,dia=dia, fecha=date)
    #aca se va a crear la capa del dia de hoy, y se va a cargar primera

    now = datetime.now()- timedelta(hours=85)
    date = str(now.day)+"-"+str(now.month)+"-"+str(now.year)
    year = (now.year)
    mes = (now.month)
    dia = (now.day)
    # ip desde casa zero tier
    # conexion = psycopg2.connect(host= "10.147.17.191",dbname="ciag", user="tomy", password="tomy1234", port="5432")
    # compu facultad
    conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")

    dat = str(year) + "-" + str(mes) + "-" + (str(dia))

    resultados = pd.read_sql(
        'select "LAT" as lat, "LONG" as lon,  avg("%AU") as au FROM bhoa."bhoa_power_nasa" where extract(year from (fecha))=' + str(
            year) + ' and extract(month from (fecha))=' + str(mes) + ' and extract(day from (fecha))=' + str(
            dia) + ' group by "LAT", "LONG"', conexion)
    df = pd.DataFrame(resultados)
    gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
    gdf = gdf.set_crs('epsg:4326')
    gdf.to_file('puntos_powernasa.shp')
    capa = "puntos_powernasa.shp"
    pts = ogr.Open(capa, 0)
    dem = gdal.Open("grilla.tif")
    gt = dem.GetGeoTransform()
    ulx = gt[0]
    uly = gt[3]
    res = gt[1]
    xsize = dem.RasterXSize
    ysize = dem.RasterYSize
    lrx = ulx + xsize * res
    lry = uly - ysize * res
    dem = None

    # Interpolacion del punto mas cerca
    campo = "au"
    pts = layer = None

    # interpolación idw "invdist:power=3"
    # interpolacion del punto mas cercano "nearest"
    # interpolación linear "linear"

    nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                   algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
    nn = None
    import numpy as np

    gdal.UseExceptions()
    rasin = "nearest.tif"
    shpin = "arg.shp"
    rasout = "./static/AU-PN/" + str(year) + str(mes) + str(dia) + ".tif"
    resampleada = "nearest_resampleada.tif"
    # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
    dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                      resampleAlg="bilinear")
    # recorto con shape de Arg
    dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
    return render_template('humedadsuelonp.html',year=now.year,mes=now.month,dia=now.day, fecha= now)

@app.route('/emafauba')
def home_page():
    # HMAC Authentication credentials

    # Class to perform HMAC encoding
    class AuthHmacMetosGet(AuthBase):
        # Creates HMAC authorization header for Metos REST service GET request.
        def __init__(self, apiRoute, publicKey, privateKey):
            self._publicKey = publicKey
            self._privateKey = privateKey
            self._method = 'GET'
            self._apiRoute = apiRoute

        def __call__(self, request):
            dateStamp = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')
            print("timestamp: ", dateStamp)
            request.headers['Date'] = dateStamp
            msg = (self._method + self._apiRoute + dateStamp + self._publicKey).encode(encoding='utf-8')
            h = HMAC.new(self._privateKey.encode(encoding='utf-8'), msg, SHA256)
            signature = h.hexdigest()
            request.headers['Authorization'] = 'hmac ' + self._publicKey + ':' + signature
            return request

    # Endpoint of the API, version for example: v1
    apiURI = 'https://api.fieldclimate.com/v2'

    # Service/Route that you wish to call
    apiRoute = '/data/0020B01A/hourly/last/1h'
    apiRoute2 = '/data/0020B01A/hourly/last/48h'

    auth = AuthHmacMetosGet(apiRoute, publicKey, privateKey)
    response = requests.get(apiURI + apiRoute, headers={'Accept': 'application/json'}, auth=auth)

    auth2 = AuthHmacMetosGet(apiRoute2, publicKey, privateKey)
    response2 = requests.get(apiURI + apiRoute2, headers={'Accept': 'application/json'}, auth=auth2)

    df = json_normalize((response.json()['data']))
    df2 = json_normalize((response2.json()['data']))

    pd.set_option('display.max_columns', 150)
    #print(df)
    #print(df2)

    valoressum= df2['values.sum']
    valores2 = df2['values.avg']
    valoresmin = df2['values.min']
    valoresmax = df2['values.max']
    ppt=valoressum[3]

    pp= round((sum(ppt[24:48])),1)
    tmax= round(max(valoresmax[6][24:48]),1)
    tmin=round(min(valoresmin[6][24:48]),1)

    marchaviento = valores2[11]
    marchadirviento = valores2[12]
    marchatmed=valores2[6]
    marcharad = valores2[0]
    marchatsuelo = valores2[1]
    marchahum = valores2[7]
    marchapuntorocio = valores2[8]
    marchatmax=valoresmax[6]
    marchatmin=valoresmin[6]
    unidades = df['unit'].tolist()
    nombres = df['name'].tolist()
    valores = df['values.avg']

    wind= "Sensor no responde" if str(valores[11])=="nan" else str(valores[11][0])+ " km/h"


    radiacion =str(round(valores[0][0],1)) + " " + str(unidades[0])
    temp_suelo = str(round(valores[1][0],1)) + " " + str(unidades[1])
    temp_air =str(round(valores[6][0],1)) + " " + str(unidades[6])
    humedad = str(round(valores[7][0],1)) + " " + str(unidades[7])
    now= datetime.now()- timedelta(hours=3)
    hour= str(now.hour)
    hour1=str((datetime.now()- timedelta(hours=2)).hour)
    date = str(now.day) + "/" + str(now.month)
    hours=[47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]
    d=[]
    for i in hours:
        d.append(((datetime.now() - timedelta(hours=3 )- timedelta(hours=i)).hour))

    return render_template('ema.html',d=d,hour1=hour1,wind=wind,puntorocio=marchapuntorocio,mrad=marcharad,mhum=marchahum,mpp=ppt,mtsuelo=marchatsuelo,mtmed=marchatmed,tmax=tmax,tmin=tmin, rad=radiacion,pp=pp, temp= temp_suelo, temp2=temp_air, hum=humedad,hora=hour,date=date)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)



"""
python --> consultas
python --> crear capas
si yo creo las capas en el servidor pero no por consultas 
python --> crea las ultimas 10¿? y remplaza las que ya estan, por si hay algun error.

cargar la ultima capa
if not disponible:
    cargar anteultimacapa
if not disponible
    cargar anteanteultimacapa

para lo que lo puedo usar python es para las cosas temporales, tiene mas sentido.

import aspose.words as aw

doc = aw.Document()
builder = aw.DocumentBuilder(doc)

shape = builder.insert_image("Input.tiff")
shape.image_data.save("Output.png")

    """