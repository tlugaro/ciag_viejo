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
from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms.fields import DateField
from datetime import datetime
from osgeo import gdal, ogr
import time
from cla import publicKey, privateKey
import warnings
warnings.filterwarnings("ignore")
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
    return render_template('Atlas_Interactivo.html')
@app.route('/Aguautilpresente')
def agua():
    return render_template('Mapas_presente.html')
@app.route('/Publicaciones')
def publi():
    return render_template('Publicaciones.html')
@app.route('/Sietedias')
def sietedias():
    return render_template('Siete_Dias.html')

@app.route('/seriestemporalesobs', methods=["GET", "POST"])
def seriestemporalesobs():
    ultimo = []
    media_anual = []
    nombre= []
    # percentil 50 con linea , 20 y 80 (sombreados sin linea) --> SELECT PERCENTILE_CONT(0.5) -- linea de año actual (sin puntear)
    conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    if request.method == 'POST':
        output = request.get_json()
        nombre = str(output["nombre"])
        variable = str(output["variable"])
        codest = str(output["codest"])
        year = str(output["year"])
        if variable=="au":


            resultados_media = pd.read_sql(
                'select loc mes , avg("au") as au  FROM bhoa."BHOA_SMN_historicos" where loc= ' + codest + ' group by  mes, loc order by mes ',
                conexion)
            df = pd.DataFrame(resultados_media)
            unidad = "%"
            media_anual = df["au"].values.tolist()
            print(media_anual)
            resultados_year = pd.read_sql(
                'select  mes, avg("au") as au FROM bhoa."BHOA_SMN_historicos" where loc= ' + codest + ' and year= ' + year + ' group by  mes order by mes ',conexion)
            df = pd.DataFrame(resultados_year)
            ultimo = df["au"].values.tolist()

            datos = {"med": media_anual, "nombre": nombre, "ultimo": ultimo, "yeear": year, "unidad": unidad}

            return (datos)
        else:

            resultados_media = pd.read_sql(
                'with suma as (select loc,year, mes , sum("'+variable+'") as '+variable+' FROM bhoa."BHOA_SMN_historicos" where loc= '+codest+' group by year, mes, loc) '
                'select mes, avg('+variable+') as '+variable+'  FROM suma  group by mes order by  mes',
                conexion)
            df = pd.DataFrame(resultados_media)
            unidad="mm"
            media_anual=df[variable].values.tolist()
            print(media_anual)
            resultados_year = pd.read_sql(
                'select  mes,  sum("'+variable+'") as '+variable+'  FROM bhoa."BHOA_SMN_historicos" where loc= ' + codest + ' and year= '+year+' group by  mes order by mes ',  conexion)
            df = pd.DataFrame(resultados_year)
            ultimo= df[variable].values.tolist()


            datos={"med":media_anual, "nombre":nombre,"ultimo": ultimo, "yeear": year, "unidad":unidad}

            return  (datos)
    now = datetime.now()
    date = str(now.day) + "-" + str(now.month) + "-" + str(now.year)
    #print(df)
    #print(df2)


    meses=[1,2,3,4,5,6,7,8,9,10,11,12]
    d=[]


    return render_template('Seriestemporalesobs.html', nombre=nombre,meses=meses, promedio=media_anual,ult=ultimo)

@app.route('/seriestemporalesest', methods=["GET", "POST"])
def seriestemporalesest():
    ultimo = []
    media_anual = []
    nombre= []
    # ip desde casa zero tier
    # conexion = psycopg2.connect(host= "10.147.17.191",dbname="ciag", user="tomy", password="tomy1234", port="5432")
    # percentil 50 con linea , 20 y 80 (sombreados sin linea) --> SELECT PERCENTILE_CONT(0.5) -- linea de año actual (sin puntear)
    #desde fac conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    if request.method == 'POST':
        output = request.get_json()
        nombre = str(output["nombre"])
        variable = str(output["variable"])
        lon = str(output["lon"])
        year = str(output["year"])
        lat= str(output["lat"])
        if variable=="au":


            resultados_media = pd.read_sql(
                'select extract(month from (fecha)) as mes,avg("%AU") as au, "LAT" ,"LONG",(SQRT(POW(69.1 * ("LAT" ::float -  '+lat+'::float), 2) + POW(69.1 * ('+lon+'::float - "LONG"::float) * COS("LAT" ::float / 57.3), 2))) AS "distancia" FROM bhoa.bhoa_power_nasa group by mes, "LAT", "LONG" ORDER BY "distancia", mes LIMIT 12  ',
                conexion)
            df = pd.DataFrame(resultados_media)
            unidad = "%"
            media_anual = df["au"].values.tolist()
            media_anual = [round(elem,2) for elem in media_anual]
            resultados_year = pd.read_sql(
                'select extract(month from (fecha)) as mes,avg("%AU") as au, "LAT" ,"LONG",(SQRT(POW(69.1 * ("LAT" ::float -  '+lat+'::float), 2) + POW(69.1 * ('+lon+'::float - "LONG"::float) * COS("LAT" ::float / 57.3), 2))) AS "distancia" FROM bhoa.bhoa_power_nasa WHERE extract(year from (fecha))='+str(year)+'   group by mes, "LAT", "LONG" ORDER BY "distancia", mes LIMIT 12  ',conexion)
            df = pd.DataFrame(resultados_year)
            #si la distancia es mayor a 26 km devolver nulll
            ultimo = df["au"].values.tolist()
            ultimo = [round(elem,2) for elem in ultimo]

            lat = str(round(df["LAT"][1], 2))
            lon = str(round(df["LONG"][1], 2))
            datos = {"latitud":lat, "longitud":lon,"med": media_anual, "nombre": nombre, "ultimo": ultimo, "yeear": year, "unidad": unidad}

            return (datos)
        else:

            resultados_media = pd.read_sql(
                'with suma as (select loc,year, mes , sum("'+variable+'") as '+variable+' FROM bhoa."BHOA_SMN_historicos" where loc= '+codest+' group by year, mes, loc) '
                'select mes, avg('+variable+') as '+variable+'  FROM suma  group by mes order by  mes',
                conexion)
            df = pd.DataFrame(resultados_media)
            unidad="mm"
            media_anual=df[variable].values.tolist()

            resultados_year = pd.read_sql(
                'select extract(month from (fecha)) as mes,avg("%AU") as au, "LAT" ,"LONG",(SQRT(POW(69.1 * ("LAT" ::float -  '+lat+'::float), 2) + POW(69.1 * ('+lon+'::float - "LONG"::float) * COS("LAT" ::float / 57.3), 2))) AS "distancia" FROM bhoa.bhoa_power_nasa group by mes, "LAT", "LONG" ORDER BY "distancia", mes LIMIT 12  ',  conexion)
            df = pd.DataFrame(resultados_year)
            ultimo= df[variable].values.tolist()


            datos={"med":media_anual, "nombre":nombre,"ultimo": ultimo, "yeear": year, "unidad":unidad}

            return  (datos)
    now = datetime.now()
    date = str(now.day) + "-" + str(now.month) + "-" + str(now.year)
    #print(df)
    #print(df2)


    meses=[1,2,3,4,5,6,7,8,9,10,11,12]
    d=[]


    return render_template('Seriestemporalesest.html', nombre=nombre,meses=meses, promedio=media_anual,ult=ultimo)

@app.route('/humedadsuelonp', methods=["GET", "POST"])
def mapa():

    if request.method == 'POST':
        var = request.form.get('variable')

        year = request.form.get('year')
        mes = request.form.get('cosa')
        dia=request.form.get('options')
        # ip desde casa zero tier
        conexion = psycopg2.connect(host= "10.1.5.144",dbname="ciag", user="tomy", password="tomy1234", port="5432")
        # compu facultad


        dat = str(year) + "-" + str(mes) + "-" + (str(dia))
        if var=="Humedad del suelo (NASAPOWER)":
            print("conectado")
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
            carpeta= "AU-PN/"
            return render_template('humedadsuelonp.html',year=year,mes=mes,dia=dia, fecha=date,variab=var, carpeta=carpeta)
        elif var=="Precipitación acumulada del mes (NASAPOWER)":
            resultados = pd.read_sql(
                'select "LAT" as lat, "LONG" as lon,  sum(pp) as pp FROM bhoa."bhoa_power_nasa" where extract(year from (fecha))=' + str(
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
            campo = "pp"
            pts = layer = None

            # interpolación idw "invdist:power=3"
            # interpolacion del punto mas cercano "nearest"
            # interpolación linear "linear"

            nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                           algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None


            gdal.UseExceptions()
            rasin = "nearest.tif"
            shpin = "arg.shp"
            rasout = "./static/ppmes-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                              resampleAlg="bilinear")
            # recorto con shape de Arg
            dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date=(dia+"-"+mes+"-"+year)
            carpeta= "ppmes-PN/"
            return render_template('humedadsuelonp.html',year=year,mes=mes,dia=dia, fecha=date,variab=var, carpeta=carpeta)
        elif var == "Temperatura mínima absoluta(NASAPOWER)":
            resultados = pd.read_sql(
                'select "lat" as lat, "lon" as lon,  min(t_min) as tmin FROM power_nasa.union_datos_historicos_diarios where t_min >-80 and year =' + str(
                    year) + ' and mes=' + str(mes) +' group by "lat", "lon" ', conexion)

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

            carpeta="tmin-PN/"
            # Interpolacion del punto mas cerca
            campo = "tmin"
            pts = layer = None

            # interpolación idw "invdist:power=3"
            # interpolacion del punto mas cercano "nearest"
            # interpolación linear "linear"

            nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                           algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None


            gdal.UseExceptions()
            rasin = "nearest.tif"
            shpin = "arg.shp"
            rasout = "./static/tmin-PN/" + str(year) + str(mes) + str(dia)+ ".tif"
            resampleada = "nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                              resampleAlg="bilinear")
            # recorto con shape de Arg
            dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = ( mes + "/" + year)

            return render_template('humedadsuelonp.html', year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)
        elif var == "Temperatura máxima absoluta(NASAPOWER)":
            resultados = pd.read_sql(
                'select "lat" as lat, "lon" as lon,  max(t_max) as tmax FROM power_nasa.union_datos_historicos_diarios where t_max > -89 and year =' + str(
                    year) + ' and mes=' + str(mes) +' group by "lat", "lon" ', conexion)

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

            carpeta="tmax-PN/"
            # Interpolacion del punto mas cerca
            campo = "tmax"
            pts = layer = None

            # interpolación idw "invdist:power=3"
            # interpolacion del punto mas cercano "nearest"
            # interpolación linear "linear"

            nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                           algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None


            gdal.UseExceptions()
            rasin = "nearest.tif"
            shpin = "arg.shp"
            rasout = "./static/tmax-PN/" + str(year) + str(mes) + str(dia)+ ".tif"
            resampleada = "nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                              resampleAlg="bilinear")
            # recorto con shape de Arg
            dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = ( mes + "/" + year)

            return render_template('humedadsuelonp.html', year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)
        elif var == "Número de días con pp (NASAPOWER)":
            resultados = pd.read_sql(
                'with tabla1 as(select lat, lon,case when precip<-1 then 0 when precip>4 then 1 end cuenta FROM power_nasa.union_datos_historicos_diarios where precip>-60 and year =' + str(
                    year) + ' and mes=' + str(
                    mes) + ') select lat, lon,  sum(cuenta) as pp FROM tabla1 group by lat, lon', conexion)

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

            carpeta = "diaspp-PN/"
            # Interpolacion del punto mas cerca
            campo = "pp"
            pts = layer = None

            # interpolación idw "invdist:power=3"
            # interpolacion del punto mas cercano "nearest"
            # interpolación linear "linear"

            nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                           algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None


            gdal.UseExceptions()
            rasin = "nearest.tif"
            shpin = "arg.shp"
            rasout = "./static/diaspp-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                              resampleAlg="near")
            # recorto con shape de Arg
            dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = (mes + "/" + year)

            return  render_template('humedadsuelonp.html', year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)
        elif var == "Número de días con t mayor a 30 (NASAPOWER)":
            resultados = pd.read_sql(
                'with tabla1 as(select lat, lon,case when t_max<29 then 0 when t_max>29 then 1 end cuenta FROM power_nasa.union_datos_historicos_diarios where t_max >-60 and year =' + str(
                    year) + ' and mes=' + str(mes) + ') select lat, lon,  sum(cuenta) as tmax FROM tabla1 group by lat, lon', conexion)

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

            carpeta = "tmas30-PN/"
            # Interpolacion del punto mas cerca
            campo = "tmax"
            pts = layer = None

            # interpolación idw "invdist:power=3"
            # interpolacion del punto mas cercano "nearest"
            # interpolación linear "linear"

            nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                           algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None


            gdal.UseExceptions()
            rasin = "nearest.tif"
            shpin = "arg.shp"
            rasout = "./static/tmas30-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                              resampleAlg="near")
            # recorto con shape de Arg
            dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = (mes + "/" + year)

            return  render_template('humedadsuelonp.html', year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)
        elif var == "Número de días con t menor a 3 (NASAPOWER)":
            resultados = pd.read_sql(
                'with tabla1 as(select lat, lon,case when t_min>3 then 0 when t_min<4 then 1 end cuenta FROM power_nasa.union_datos_historicos_diarios where t_min >-60 and year =' + str(
                    year) + ' and mes=' + str(mes) + ') select lat, lon,  sum(cuenta) as tmin FROM tabla1 group by lat, lon', conexion)

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

            carpeta = "tmen3-PN/"
            # Interpolacion del punto mas cerca
            campo = "tmin"
            pts = layer = None

            # interpolación idw "invdist:power=3"
            # interpolacion del punto mas cercano "nearest"
            # interpolación linear "linear"

            nn = gdal.Grid("nearest.tif", capa, zfield=campo,
                           algorithm="nearest", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None


            gdal.UseExceptions()
            rasin = "nearest.tif"
            shpin = "arg.shp"
            rasout = "./static/tmen3-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            dsRes = gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064,
                              resampleAlg="near")
            # recorto con shape de Arg
            dsClip = gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = (mes + "/" + year)

            return  render_template('humedadsuelonp.html', year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)
    now = datetime.now() - timedelta(hours=85)
    date = str(now.day) + "-" + str(now.month) + "-" + str(now.year)
    year = (now.year)
    mes = (now.month)
    dia = (now.day)
    return render_template('humedadsuelonp.html',year=now.year,mes=now.month,dia=now.day, fecha= date )

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
            dia) + ' group by "LAT", "LONG" ', conexion)
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
    print(marchahum)
    marchapuntorocio = valores2[8]
    marchatmax=valoresmax[6]
    marchatmin=valoresmin[6]
    unidades = df['unit'].tolist()
    nombres = df['name'].tolist()
    valores = df['values.avg']

    wind= "S/D" if str(valores[11])=="nan" else str(valores[11][0])+ " km/h"


    radiacion =str(round(valores[0][0],1)) + " "
    temp_suelo = str(round(valores[1][0],1)) + " " + str(unidades[1])
    temp_air =str(round(valores[6][0],1)) + " " + str(unidades[6])
    humedad = str(round(valores[7][0],1)) + " " + str(unidades[7])
    now= datetime.now()
    hour= str(now.hour)
    #hour1=str((datetime.now()- timedelta(hours=2)).hour)
    date = str(now.day) + "/" + str(now.month)
    hours=[47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]
    d=[]
    for i in hours:
        d.append(((datetime.now() - timedelta(hours=i)).hour))

    return render_template('ema.html',d=d,wind=wind,puntorocio=marchapuntorocio,mrad=marcharad,mhum=marchahum,mpp=ppt,mtsuelo=marchatsuelo,mtmed=marchatmed,tmax=tmax,tmin=tmin, rad=radiacion,pp=pp, temp= temp_suelo, temp2=temp_air, hum=humedad,hora=hour,date=date)

@app.route('/seriesTemporalesSatelitales', methods=["GET", "POST"])
def seriesTemporalesSateliales():
    conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    if request.method == 'POST':
        var = request.form.get('variable')

        year = request.form.get('year')
        mes = request.form.get('cosa')
        dia=request.form.get('options')
        lat= request.form.get("lat")
        lon = request.form.get("lon")
        # ip desde casa zero tier
        #conexion = psycopg2.connect(host= "10.147.17.191",dbname="ciag", user="tomy", password="tomy1234", port="5432")
        # compu facultad

        dat = str(year) + "-" + str(mes) + "-" + (str(dia))
        if var=="Humedad del suelo (NASAPOWER)":
            resultados = pd.read_sql(
                'select fecha, "%AU" as au FROM bhoa."bhoa_power_nasa" where fecha< '+fecha+' and "LAT"= '+lat+' and "LON" = '+lon+' group by fecha', conexion)
            df = pd.DataFrame(resultados)
            serie= df["au"].values
            fechas=df["fecha"].values
            return render_template('seriestemporalessatelites.html',year=year,mes=mes,dia=dia, fecha=date,variab=var, serie=serie, fechas=fechas)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
