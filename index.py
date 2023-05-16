from flask import Flask, render_template, url_for, request
import requests
import urllib
import json
from requests.auth import AuthBase
from Cryptodome.Hash import HMAC
from Cryptodome.Hash import SHA256
from datetime import datetime, timedelta,date
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
from osgeo import gdal, ogr,osr
import time
from cla import publicKey, privateKey
import warnings
import os
import pykrige.kriging_tools as kt
from pykrige.ok import OrdinaryKriging
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
@app.route('/probabilidad', methods=["GET", "POST"])
def eventos_extremos():
    ultimo = []
    media_anual = []
    nombre= []
    now = datetime.now()
    date = str(now.day) + "-" + str(now.month) + "-" + str(now.year)

    meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    d = []
    if request.method == 'POST':
        output = request.get_json()
        unidad="%"
        nombre = str(output["nombre"])
        variable = str(output["variable"])
        codest = str(output["codest"])

        if variable=="heladastardias":
            archivo = pd.read_excel("/var/www/ciag_github/static/heladas/" + codest + "_HEL.xlsx")
            archivo= archivo.iloc[120:-1]
            print(archivo)
            leve = archivo["fuh3"].values.tolist()
            leve = [round(elem, 2) for elem in leve]
            moderada = archivo["fuh0"].values.tolist()
            moderada = [round(elem, 2) for elem in moderada]
            severa = archivo["fuhmen3"].values.tolist()
            severa = [round(elem, 2) for elem in severa]
            extrema = archivo["fuhmen5"].values.tolist()
            extrema = [round(elem, 2) for elem in extrema]
            fecha = archivo["fecha"].values.tolist()
            fecha = [(str(pd.to_datetime(elem).day) + "/" + str(pd.to_datetime(elem).month)) for elem in fecha]
            datos = {"leve": leve, "moderada": moderada, "severa": severa, "extrema": extrema, "nombre": nombre,
                     "unidad": unidad,"fechas":fecha}

            return (datos)
        if variable=="heladastempranas":
            archivo = pd.read_excel("/var/www/ciag_github/static/heladas/" + codest + "_HEL.xlsx")
            archivo = archivo.iloc[31:196]
            leve=archivo["fph3"].values.tolist()
            leve=[round(elem, 2) for elem in leve]
            moderada = archivo["fph0"].values.tolist()
            moderada = [round(elem, 2) for elem in moderada]
            severa = archivo["fphme3"].values.tolist()
            severa = [round(elem, 2) for elem in severa]
            extrema = archivo["fphmen5"].values.tolist()
            extrema = [round(elem, 2) for elem in extrema]
            fecha= archivo["fecha"].values.tolist()
            fecha = [(str(pd.to_datetime(elem).day)+"/"+str(pd.to_datetime(elem).month)) for elem in fecha]

            datos = {"leve": leve, "moderada": moderada, "severa": severa, "extrema": extrema, "nombre": nombre,
                     "unidad": unidad,"fechas":fecha}

            return (datos)
        if variable=="gcantes":
            archivo = pd.read_excel("/var/www/ciag_github/static/gc/" + codest + "_GC.xlsx")
            archivo = archivo.iloc[120:-1]

            leve=archivo["gc sua1"].values.tolist()
            leve=[round(elem, 2) for elem in leve]
            moderada = archivo["gc mod1"].values.tolist()
            moderada = [round(elem, 2) for elem in moderada]
            severa = archivo["gc int1"].values.tolist()
            severa = [round(elem, 2) for elem in severa]
            extrema = archivo["gc ext1"].values.tolist()
            extrema = [round(elem, 2) for elem in extrema]
            fecha= archivo["fecha"].values.tolist()
            fecha = [(str(pd.to_datetime(elem).day)+"/"+str(pd.to_datetime(elem).month)) for elem in fecha]

            datos = {"leve": leve, "moderada": moderada, "severa": severa, "extrema": extrema, "nombre": nombre,
                     "unidad": unidad,"fechas":fecha}

            return (datos)
        if variable=="gcdespues":
            archivo = pd.read_excel("/var/www/ciag_github/static/gc/" + codest + "_GC.xlsx")
            archivo = archivo.iloc[0:196]
            leve=archivo["gc sua2"].values.tolist()
            leve=[round(elem, 2) for elem in leve]
            moderada = archivo["gc mod2"].values.tolist()
            moderada = [round(elem, 2) for elem in moderada]
            severa = archivo["gc int2"].values.tolist()
            severa = [round(elem, 2) for elem in severa]
            extrema = archivo["gc ext2"].values.tolist()
            extrema = [round(elem, 2) for elem in extrema]
            fecha= archivo["fecha"].values.tolist()
            fecha = [(str(pd.to_datetime(elem).day)+"/"+str(pd.to_datetime(elem).month)) for elem in fecha]

            datos = {"leve": leve, "moderada": moderada, "severa": severa, "extrema": extrema, "nombre": nombre,
                     "unidad": unidad,"fechas":fecha}

            return (datos)

    return render_template('eventosextremos.html', nombre=nombre, meses=meses, promedio=media_anual, ult=ultimo)
@app.route('/seriestemporalesobs', methods=["GET", "POST"])
def seriestemporalesobs():
    ultimo = []
    media_anual = []
    nombre= []

    # percentil 50 con linea , 20 y 80 (sombreados sin linea) --> SELECT PERCENTILE_CONT(0.5) -- linea de año actual (sin puntear)
    conexion = psycopg2.connect(host="localhost", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    if request.method == 'POST':
        output = request.get_json()
        nombre = str(output["nombre"])
        variable = str(output["variable"])
        codest = str(output["codest"])
        year = str(output["year"])
        if variable=="au":


            resultados_media = pd.read_sql(
                'with suma as (select  mes::int , avg("atporc") as au  FROM bhoa."bhoa_union_smn" where cod_est= ' + codest + ' and anios::int>1990 and   ppreal is not null  group by  anios::int,mes::int, dia::int order by mes::int) '
                'select mes::int, percentile_cont(0.05) within group (order by au) as "5", '
                'percentile_cont(0.20) within group (order by au) as "20",'
                ' percentile_cont(0.5) within group (order by au) as "50", '
                'percentile_cont(0.8) within group (order by au) as "80" , '
                'percentile_cont(0.95) within group (order by au )as "95"  FROM suma  group by mes::int order by  mes::int',
                conexion)
            df = pd.DataFrame(resultados_media)
            unidad = "%"
            perc95 = (round(df["95"], 0)).values.tolist()
            perc80 = (round(df["80"], 0)).values.tolist()
            perc50 = (round(df["50"], 0)).values.tolist()
            perc20 = (round(df["20"], 0)).values.tolist()
            perc5 = (round(df["5"], 0)).values.tolist()

            resultados_year = pd.read_sql(
                'select  mes::int, avg("atporc") as au FROM bhoa."bhoa_union_smn" where cod_est= ' + codest + ' and anios::int= ' + year + ' group by  mes::int, dia::int order by mes::int, dia::int',conexion)
            df = pd.DataFrame(resultados_year)
            ultimo = round(df["au"],0).values.tolist()


            datos={"perc20":perc20,"perc5":perc5,"perc80":perc80,"perc95":perc95,"perc50":perc50, "nombre":nombre,"ultimo": ultimo, "yeear": year, "unidad":unidad}

            return (datos)
        else:

            resultados_media = pd.read_sql(
                'with suma as (select cod_est,anios::int, mes::int , sum("'+variable+'") as '+variable+' FROM bhoa."bhoa_union_smn" where cod_est= '+codest+' and   ppreal is not null and anios::int>1990  group by anios::int, mes::int, cod_est) '
                'select mes, percentile_cont(0.05) within group (order by '+variable+') as "5", '
                'percentile_cont(0.20) within group (order by '+variable+') as "20",'
                ' percentile_cont(0.5) within group (order by '+variable+') as "50", '
                'percentile_cont(0.8) within group (order by '+variable+') as "80" , '
                'percentile_cont(0.95) within group (order by '+variable+') as "95"  FROM suma  group by mes order by  mes',
                conexion)
            df = pd.DataFrame(resultados_media)
            unidad="mm"
            perc95 = (round(df["95"],2)).values.tolist()
            perc80 = (round(df["80"],2)).values.tolist()
            perc50 = (round(df["50"],2)).values.tolist()
            perc20 = (round(df["20"],2)).values.tolist()
            perc5=(round(df["5"],2)).values.tolist()

            resultados_year = pd.read_sql(
                'select  mes::int,  sum("'+variable+'") as '+variable+'  FROM bhoa."bhoa_union_smn" where cod_est= ' + codest + ' and anios::int= '+year+' group by  mes::int order by mes::int ',  conexion)
            df = pd.DataFrame(resultados_year)
            ultimo= round(df[variable],2).values.tolist()


            datos={"perc20":perc20,"perc5":perc5,"perc80":perc80,"perc95":perc95,"perc50":perc50, "nombre":nombre,"ultimo": ultimo, "yeear": year, "unidad":unidad}

            return  (datos)
    now = datetime.now()
    date = str(now.day) + "-" + str(now.month) + "-" + str(now.year)



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
    #desde fac conexion = psycopg2.connect(host="localhost", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    conexion = psycopg2.connect(host="localhost", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    if request.method == 'POST':
        output = request.get_json()
        nombre = str(output["nombre"])
        variable = str(output["variable"])
        lon = str(output["lon"])
        year = str(output["year"])
        lat= str(output["lat"])
        latylon=pd.read_sql(
                'select  "LAT" as lat ,"LONG" as lon,(SQRT(POW(69.1 * ("LAT" ::float -  '+lat+'::float), 2) + POW(69.1 * ('+lon+'::float - "LONG"::float) * COS("LAT" ::float / 57.3), 2))) AS "distancia" FROM bhoa.bhoa_power_nasa group by  "LAT", "LONG" ORDER BY "distancia" LIMIT 1  ',  conexion)
        df = pd.DataFrame(latylon)
        latitud= str(df["lat"][0])
        longitud= str(df["lon"][0])
        if variable=="au":

            resultados_media = pd.read_sql(
                'with suma as (select extract(month from (fecha)) as mes,extract(year from (fecha)) as year,avg("%AU") as au FROM bhoa.bhoa_power_nasa where "LAT"= '+latitud+' and "LONG"='+longitud+' and extract(year from (fecha))>1990 group by extract(year from (fecha)), mes)'
                'select mes, percentile_cont(0.05) within group (order by au) as "5", percentile_cont(0.20) within group (order by au) as "20", percentile_cont(0.5) within group (order by au) as "50", percentile_cont(0.8) within group (order by au) as "80" , percentile_cont(0.95) within group (order by au) as "95"  FROM suma  group by mes order by  mes'
                ,conexion)

            df = pd.DataFrame(resultados_media)
            unidad = "%"
            perc95 = (round(df["95"], 0)).values.tolist()
            perc80 = (round(df["80"], 0)).values.tolist()
            perc50 = (round(df["50"], 0)).values.tolist()
            perc20 = (round(df["20"], 0)).values.tolist()
            perc5 = (round(df["5"], 0)).values.tolist()

            resultados_year = pd.read_sql(
                'select extract(month from (fecha)) as mes,avg("%AU") as au  FROM bhoa.bhoa_power_nasa WHERE  "LAT"= '+latitud+' and "LONG"='+longitud+' and extract(year from (fecha))='+str(year)+'   group by mes ORDER BY mes',conexion)
            df = pd.DataFrame(resultados_year)
            #si la distancia es mayor a 26 km devolver nulll
            ultimo = df["au"].values.tolist()
            ultimo = [round(elem,2) for elem in ultimo]

            datos = {"latitud":latitud, "longitud":longitud,"perc20": perc20, "perc5": perc5, "perc80": perc80, "perc95": perc95, "perc50": perc50, "ultimo": ultimo, "yeear": year, "unidad": unidad}

            return (datos)
        else:

            resultados_media = pd.read_sql(
                'with suma as (select cod_est,year, mes , sum("'+variable+'") as '+variable+' FROM bhoa."bhoa_power_nasa" where cod_est= '+codest+' group by year, mes, cod_est) '
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
    


    meses=[1,2,3,4,5,6,7,8,9,10,11,12]
    d=[]


    return render_template('Seriestemporalesest.html', nombre=nombre,meses=meses, promedio=media_anual,ult=ultimo)


@app.route('/indicesequia', methods=["GET", "POST"])
def indicesequia():

    if request.method == 'POST':
        var = request.form.get('variable')
        fecha = request.form.get('fechaform')

        date = pd.to_datetime(fecha, infer_datetime_format=True)

        year = str(date.year)
        mes = str(date.month)
        dia = str(date.day)
        # ip desde casa zero tier
        conexion = psycopg2.connect(host= "localhost",dbname="ciag", user="tomy", password="tomy1234", port="5432")
        # compu facultad

        df = pd.read_sql(
            "select    valor, lat,lon  FROM sequia.indices_diario where valor is not null and indice= '"+var+"' and fecha='"+str(fecha)+"'::date   group by  lat,lon, valor ", conexion)

        gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
        gdf = gdf.set_crs('epsg:4326')
        gdf.to_file('/var/www/ciag_github/static/indicesequia/'+var+year+mes+dia+'.geojson', driver='GeoJSON')


        date = (dia + "-" + mes + "-" + year)
        carpeta = "indicesequia/"

        return render_template('indicesequia.html', year=year, mes=mes, dia=dia, fecha=date, variab=var,
                               carpeta=carpeta)
    else:
        try:

            fecha= (datetime.now()-timedelta(days=2))

            df = pd.read_sql(
                "select    valor, lat,lon  FROM sequia.indices_diario where valor is not null and indice= 'IBSe' and fecha='" + str(
                    fecha) + "'::date   group by  lat,lon, valor ", conexion)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('/var/www/ciag_github/static/indicesequia/' + var + year + mes + dia + '.geojson', driver='GeoJSON')

            date = (dia + "-" + mes + "-" + year)
            carpeta = "indicesequia/"

            return render_template('indicesequia.html', year=year, mes=mes, dia=dia, fecha=date, variab=var,
                                   carpeta=carpeta)
        except:
            return render_template('indicesequia.html')
@app.route('/variablesagromet', methods=["GET", "POST"])
def mapa():



    if request.method == 'POST':
        var = request.form.get('variable')
        base= request.form.get('opt')
        fecha= request.form.get('fechaform')
        fecha= pd.to_datetime(fecha, infer_datetime_format=True)
        fecha=fecha-timedelta(days=1)

        year = str(fecha.year)
        mes = str(fecha.month)
        dia=str(fecha.day)
        # ip desde casa zero tier
        conexion = psycopg2.connect(host= "localhost",dbname="ciag", user="tomy", password="tomy1234", port="5432")
        # compu facultad

        if var=="Humedad del suelo" and base== "SMN":
            fecha1 = "'" + str(fecha.date()) + "'"

            df = pd.read_sql(
                'select   avg("au_porc") as au, lat,lon  FROM bhoa."bhoa_union_smn" where fecha='+fecha1+'and   ppreal is not null group by  cod_est,lat,lon', conexion)

            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
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

            x = df.lon
            y = df.lat
            phi = df.au

            OK = OrdinaryKriging(
                x,
                y,
                phi,
                variogram_model='exponential',
                verbose=False,
                enable_plotting=False,
                nlags=960,
                weight=True,
            )

            gridx = np.arange(ulx, lrx, res, dtype='float64')
            gridy = np.arange(lry, uly, res, dtype='float64')
            zstar, ss = OK.execute("grid", gridx, gridy)
            nn = None

            driver = gdal.GetDriverByName('GTiff')
            ds= driver.Create("/var/www/ciag_github/static/AU-SMN/sinreco.tif", xsize, ysize, 1, gdal.GDT_Float32)

            srs = osr.SpatialReference()
            srs.ImportFromEPSG(4326)
            ds.SetProjection(srs.ExportToWkt())
            gt = [ulx, res, 0, lry, 0, res]
            ds.SetGeoTransform(gt)
            outband = ds.GetRasterBand(1)
            outband.WriteArray(zstar)
            ds = None

            rasin = "/var/www/ciag_github/static/AU-SMN/sinreco.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            fecha = fecha + timedelta(days=1)

            year = str(fecha.year)
            mes = str(fecha.month)
            dia = str(fecha.day)
            rasout = "/var/www/ciag_github/static/AU-SMN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearestsmn_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin,xRes=0.064, yRes=0.064 ,resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)


            date = (dia + "-" + mes + "-" + year)
            carpeta = "AU-SMN/"

            return render_template('humedadsuelonp.html',base=base, year=year, mes=mes, dia=dia, fecha=date, variab=var,
                                   carpeta=carpeta)
        dat = str(year) + "-" + str(mes) + "-" + (str(dia))

        if var=="Humedad del suelo" and base== "NASA POWER":
            fecha="'"+str(fecha.date())+"'"
            resultados = pd.read_sql(
                'select "LAT" as lat, "LONG" as lon,  avg("%AU") as au FROM bhoa.bhoa_power_nasa where fecha= '+fecha+'  group by "LAT", "LONG"', conexion)
            df = pd.DataFrame(resultados)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('/var/www/ciag_github/puntos_powernasa.shp')
            capa = "/var/www/ciag_github/puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
            gt = dem.GetGeoTransform()
            ulx = gt[0]
            uly = gt[3]
            res = gt[1]
            xsize = dem.RasterXSize
            ysize = dem.RasterYSize

            lrx = ulx + xsize * res
            lry = uly - ysize * res
            dem = None
            x = df.lon
            y = df.lat
            phi = df.au

            OK = OrdinaryKriging(
                x,
                y,
                phi,
                variogram_model='exponential',
                verbose=False,
                enable_plotting=False,
                nlags=9,
                weight=True,
            )

            gridx = np.arange(ulx, lrx, res, dtype='float64')
            gridy = np.arange(lry, uly, res, dtype='float64')
            zstar, ss = OK.execute("grid", gridx, gridy)
            nn = None

            driver = gdal.GetDriverByName('GTiff')
            ds = driver.Create("/var/www/ciag_github/static/AU-PN/sinreco.tif", xsize, ysize, 1, gdal.GDT_Float32)

            srs = osr.SpatialReference()
            srs.ImportFromEPSG(4326)
            ds.SetProjection(srs.ExportToWkt())
            gt = [ulx, res, 0, lry, 0, res]
            ds.SetGeoTransform(gt)
            outband = ds.GetRasterBand(1)
            outband.WriteArray(zstar)
            ds = None
            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/static/AU-PN/sinreco.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/AU-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date=(dia+"-"+mes+"-"+year)
            carpeta= "AU-PN/"
            return render_template('humedadsuelonp.html',base=base,year=year,mes=mes,dia=dia, fecha=date,variab=var, carpeta=carpeta)
        if var=="Precipitación acumulada (Últimos 30 días)" and base== "SMN":
            fecha1 = "'" + str(fecha.date()) + "'"
            df = pd.read_sql(
                'select   sum("ppreal") as pp, lat,lon  FROM bhoa."bhoa_union_smn"  WHERE fecha BETWEEN (date '+str(fecha1)+'  - 30) AND (date '+str(fecha1)+')  and   ppreal is not null and ppreal>-1 group by  cod_est,lat,lon',
                conexion)

            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
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

            x = df.lon
            y = df.lat
            phi = df.pp


            OK = OrdinaryKriging(
                x,
                y,
                phi,
                variogram_model='exponential',
                verbose=False,
                enable_plotting=False,
                nlags=960,
                weight=True,
            )

            gridx = np.arange(ulx, lrx, res, dtype='float64')
            gridy = np.arange(lry, uly, res, dtype='float64')
            zstar, ss = OK.execute("grid", gridx, gridy)
            nn = None

            driver = gdal.GetDriverByName('GTiff')
            ds = driver.Create("/var/www/ciag_github/static/ppmes-SMN/sinreco.tif", xsize, ysize, 1, gdal.GDT_Float32)

            srs = osr.SpatialReference()
            srs.ImportFromEPSG(4326)
            ds.SetProjection(srs.ExportToWkt())
            gt = [ulx, res, 0, lry, 0, res]
            ds.SetGeoTransform(gt)
            outband = ds.GetRasterBand(1)
            outband.WriteArray(zstar)
            ds = None



            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/static/ppmes-SMN/sinreco.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/ppmes-SMN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date=(dia+"-"+mes+"-"+year)
            carpeta= "ppmes-SMN/"
            return render_template('humedadsuelonp.html',base=base,year=year,mes=mes,dia=dia, fecha=date,variab=var, carpeta=carpeta)
        if var=="Precipitación acumulada (Últimos 7 días)" and base== "SMN":
            fecha1 = "'" + str(fecha.date()) + "'"
            df = pd.read_sql('select   sum("ppreal") as pp, lat,lon  FROM bhoa."bhoa_union_smn"  WHERE fecha BETWEEN (date '+str(fecha1)+'  - 7) AND (date '+str(fecha1)+') and ppreal>-1  and   ppreal is not null group by  cod_est,lat,lon', conexion)
            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
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

            x = df.lon
            y = df.lat
            phi = df.pp

            OK = OrdinaryKriging(
                x,
                y,
                phi,
                variogram_model='exponential',
                verbose=False,
                enable_plotting=False,
                nlags=960,
                weight=True,
            )

            gridx = np.arange(ulx, lrx, res, dtype='float64')
            gridy = np.arange(lry, uly, res, dtype='float64')
            zstar, ss = OK.execute("grid", gridx, gridy)
            nn = None

            driver = gdal.GetDriverByName('GTiff')

            ds = driver.Create("/var/www/ciag_github/static/ppsiete-SMN/sinreco.tif", xsize, ysize, 1, gdal.GDT_Float32)

            srs = osr.SpatialReference()
            srs.ImportFromEPSG(4326)
            ds.SetProjection(srs.ExportToWkt())
            gt = [ulx, res, 0, lry, 0, res]
            ds.SetGeoTransform(gt)
            outband = ds.GetRasterBand(1)
            outband.WriteArray(zstar)
            ds = None
            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/static/ppsiete-SMN/sinreco.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/ppsiete-SMN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date=(dia+"-"+mes+"-"+year)
            carpeta= "ppsiete-SMN/"
            return render_template('humedadsuelonp.html',base=base,year=year,mes=mes,dia=dia, fecha=date,variab=var, carpeta=carpeta)
        if var=="Precipitación acumulada (Últimos 30 días)" and base== "NASA POWER":
            fecha = "'" + str(fecha.date()) + "'"
            resultados = pd.read_sql('SELECT "LAT" as lat,"LONG" as lon,SUM(PP) AS pp FROM bhoa.bhoa_power_nasa WHERE fecha BETWEEN (date '+str(fecha)+'  - 30) AND (date '+str(fecha)+') GROUP BY "LAT", "LONG"', conexion)
            df = pd.DataFrame(resultados)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('/var/www/ciag_github/puntos_powernasa.shp')
            capa = "/var/www/ciag_github/puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
           # Interpolacion del punto mas cerca
            campo = "pp"
            pts = layer = None
            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
            gt = dem.GetGeoTransform()
            ulx = gt[0]
            uly = gt[3]
            res = gt[1]
            xsize = dem.RasterXSize
            ysize = dem.RasterYSize
            lrx = ulx + xsize * res
            lry = uly - ysize * res
            dem = None
            x = df.lon
            y = df.lat
            phi = df.pp

            OK = OrdinaryKriging(
                x,
                y,
                phi,
                variogram_model='exponential',
                verbose=False,
                enable_plotting=False,
                nlags=9,
                weight=True,
            )

            gridx = np.arange(ulx, lrx, res, dtype='float64')
            gridy = np.arange(lry, uly, res, dtype='float64')
            zstar, ss = OK.execute("grid", gridx, gridy)
            nn = None

            driver = gdal.GetDriverByName('GTiff')
            ds = driver.Create("/var/www/ciag_github/static/ppmes-PN/sinreco.tif", xsize, ysize, 1, gdal.GDT_Float32)

            srs = osr.SpatialReference()
            srs.ImportFromEPSG(4326)
            ds.SetProjection(srs.ExportToWkt())
            gt = [ulx, res, 0, lry, 0, res]
            ds.SetGeoTransform(gt)
            outband = ds.GetRasterBand(1)
            outband.WriteArray(zstar)
            ds = None



            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/static/ppmes-PN/sinreco.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/ppmes-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date=(dia+"-"+mes+"-"+year)
            carpeta= "ppmes-PN/"
            return render_template('humedadsuelonp.html',base=base,year=year,mes=mes,dia=dia, fecha=date,variab=var, carpeta=carpeta)
        if var=="Precipitación acumulada (Últimos 7 días)" and base== "NASA POWER":
            fecha = "'" + str(fecha.date()) + "'"
            resultados = pd.read_sql('SELECT "LAT" as lat,"LONG" as lon,SUM(PP) AS pp FROM bhoa.bhoa_power_nasa WHERE fecha BETWEEN (date '+str(fecha)+'  - 7) AND (date '+str(fecha)+' ) GROUP BY "LAT", "LONG"', conexion)
            df = pd.DataFrame(resultados)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('/var/www/ciag_github/puntos_powernasa.shp')
            capa = "/var/www/ciag_github/puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
           # Interpolacion del punto mas cerca
            campo = "pp"
            pts = layer = None
            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
            gt = dem.GetGeoTransform()
            ulx = gt[0]
            uly = gt[3]
            res = gt[1]
            xsize = dem.RasterXSize
            ysize = dem.RasterYSize
            lrx = ulx + xsize * res
            lry = uly - ysize * res
            dem = None
            x = df.lon
            y = df.lat
            phi = df.pp

            OK = OrdinaryKriging(
                x,
                y,
                phi,
                variogram_model='exponential',
                verbose=False,
                enable_plotting=False,
                nlags=9,
                weight=True,
            )

            gridx = np.arange(ulx, lrx, res, dtype='float64')
            gridy = np.arange(lry, uly, res, dtype='float64')
            zstar, ss = OK.execute("grid", gridx, gridy)
            nn = None

            driver = gdal.GetDriverByName('GTiff')
            ds = driver.Create("/var/www/ciag_github/static/ppsiete-PN/sinreco.tif", xsize, ysize, 1, gdal.GDT_Float32)

            srs = osr.SpatialReference()
            srs.ImportFromEPSG(4326)
            ds.SetProjection(srs.ExportToWkt())
            gt = [ulx, res, 0, lry, 0, res]
            ds.SetGeoTransform(gt)
            outband = ds.GetRasterBand(1)
            outband.WriteArray(zstar)
            ds = None
            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/static/ppsiete-PN/sinreco.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/ppsiete-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date=(dia+"-"+mes+"-"+year)
            carpeta= "ppsiete-PN/"
            return render_template('humedadsuelonp.html',base=base,year=year,mes=mes,dia=dia, fecha=date,variab=var, carpeta=carpeta)
        if var == "Temperatura mínima absoluta (Últimos 30 días)" and base== "NASA POWER":
            fecha = "'" + str(fecha.date()) + "'"
            resultados = pd.read_sql(
                'select "lat" as lat, "lon" as lon,  min(t_min) as tmin FROM power_nasa.union_datos_historicos_diarios where t_min >-80  and "date" BETWEEN (date '+str(fecha)+'  - 30) AND (date '+str(fecha)+') group by "lat", "lon" ', conexion)

            df = pd.DataFrame(resultados)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('/var/www/ciag_github/puntos_powernasa.shp')
            capa = "/var/www/ciag_github/puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
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
            nn = gdal.Grid("/var/www/ciag_github/nearest.tif", capa, zfield=campo,
                           algorithm="linear", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None

            ds = None
            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/nearest.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/tmin-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = ( mes + "/" + year)

            return render_template('humedadsuelonp.html',base=base, year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)
        if var == "Temperatura máxima absoluta (Últimos 30 días)" and base== "NASA POWER":
            fecha = "'" + str(fecha.date()) + "'"
            resultados = pd.read_sql(
                'select  lat, lon,  max(t_max) as tmax FROM power_nasa.union_datos_historicos_diarios where  "date" BETWEEN (date '+str(fecha)+'  - 30) AND (date '+str(fecha)+') group by "lat", "lon" ', conexion)

            df = pd.DataFrame(resultados)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('/var/www/ciag_github/puntos_powernasa.shp')
            capa = "/var/www/ciag_github/puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
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


            nn = gdal.Grid("/var/www/ciag_github/nearest.tif", capa, zfield=campo,
                           algorithm="linear", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None

            ds = None
            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/nearest.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/tmax-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = ( mes + "/" + year)

            return render_template('humedadsuelonp.html',base=base, year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)
        if var == "Número de días con pp (Últimos 30 días)" and base== "NASA POWER":
            fecha = "'" + str(fecha.date()) + "'"
            resultados = pd.read_sql(
                'with tabla1 as(select lat, lon,case when precip<-1 then 0 when precip>4 then 1 end cuenta FROM power_nasa.union_datos_historicos_diarios where precip>-60 and "date" BETWEEN (date '+str(fecha)+'  - 30) AND (date '+str(fecha)+' )) select lat, lon,  sum(cuenta) as pp FROM tabla1 group by lat, lon', conexion)

            df = pd.DataFrame(resultados)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('/var/www/ciag_github/puntos_powernasa.shp')
            capa = "/var/www/ciag_github/puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
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
            nn = gdal.Grid("/var/www/ciag_github/nearest.tif", capa, zfield=campo,
                           algorithm="linear", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None

            ds = None
            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/nearest.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/diaspp-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = (mes + "/" + year)

            return  render_template('humedadsuelonp.html',base=base, year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)
        if var == "Número de días con T mayor a 30 (Últimos 30 días)" and base== "NASA POWER":
            fecha = "'" + str(fecha.date()) + "'"
            resultados = pd.read_sql(
                'with tabla1 as(select lat, lon,case when t_max<29 then 0 when t_max>29 then 1 end cuenta FROM power_nasa.union_datos_historicos_diarios where t_max >-60 and "date" BETWEEN (date '+str(fecha)+'  - 30) AND (date '+str(fecha)+'::date )) select lat, lon,  sum(cuenta) as tmax FROM tabla1 group by lat, lon', conexion)

            df = pd.DataFrame(resultados)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('/var/www/ciag_github/puntos_powernasa.shp')
            capa = "/var/www/ciag_github/puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
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
            nn = gdal.Grid("/var/www/ciag_github/nearest.tif", capa, zfield=campo,
                           algorithm="linear", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None

            ds = None
            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/nearest.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/tmas30-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = (mes + "/" + year)

            return  render_template('humedadsuelonp.html',base=base, year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)
        if var == "Número de días con T menor a 3 (Últimos 30 días)" and base== "NASA POWER":
            fecha = "'" + str(fecha.date()) + "'"
            resultados = pd.read_sql(
                'with tabla1 as(select lat, lon,case when t_min>3 then 0 when t_min<4 then 1 end cuenta FROM power_nasa.union_datos_historicos_diarios where t_min >-60 and "date" BETWEEN (date '+str(fecha)+'  - 30) AND (date '+str(fecha)+'::date )) select lat, lon,  sum(cuenta) as tmin FROM tabla1 group by lat, lon', conexion)

            df = pd.DataFrame(resultados)
            gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
            gdf = gdf.set_crs('epsg:4326')
            gdf.to_file('/var/www/ciag_github/puntos_powernasa.shp')
            capa = "/var/www/ciag_github/puntos_powernasa.shp"
            pts = ogr.Open(capa, 0)
            dem = gdal.Open("/var/www/ciag_github/grilla.tif")
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
            nn = gdal.Grid("/var/www/ciag_github/nearest.tif", capa, zfield=campo,
                           algorithm="linear", outputBounds=[ulx, uly, lrx, lry], width=xsize, height=ysize)
            nn = None

            ds = None
            gdal.UseExceptions()
            rasin = "/var/www/ciag_github/nearest.tif"
            shpin = "/var/www/ciag_github/arg.shp"
            rasout = "/var/www/ciag_github/static/tmen3-PN/" + str(year) + str(mes) + str(dia) + ".tif"
            resampleada = "/var/www/ciag_github/nearest_resampleada.tif"
            # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
            gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
            # recorto con shape de Arg
            gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)
            date = (dia+"/"+mes + "/" + year)

            return  render_template('humedadsuelonp.html',base=base, year=year, mes=mes,dia=dia,variab=var, fecha=date, carpeta=carpeta)

    now = datetime.now()+timedelta(days=1)
    date = str(now.day) + "-" + str(now.month) + "-" + str(now.year)
    year = str(now.year)
    mes = str(now.month)
    dia = str(now.day)
    path= "/var/www/ciag_github/static/AU-SMN/" + str(year) + str(mes) + str(dia) + ".tif"
    isExisting = os.path.exists(path)
    carpeta = "AU-SMN/"
    var = "Humedad del suelo (SMN)"
    if isExisting is False:


        conexion = psycopg2.connect(host="localhost", dbname="ciag", user="tomy", password="tomy1234", port="5432")



        # compu facultad
        isExisting = os.path.exists(path)
        var="Humedad del suelo"
        base="SMN+"
        df = pd.read_sql(
            'select   avg("au_porc") as au, lat,lon, fecha  FROM bhoa."bhoa_union_smn" where fecha =(select fecha  FROM bhoa."bhoa_union_smn" order by fecha desc limit 1) group by lat,lon, fecha order by fecha desc',
            conexion)
        fecha = df["fecha"][0 ]
        dem = gdal.Open("/var/www/ciag_github/grilla.tif")
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

        x = df.lon
        y = df.lat
        phi = df.au

        OK = OrdinaryKriging(
            x,
            y,
            phi,
            variogram_model='exponential',
            verbose=False,
            enable_plotting=False,
            nlags=960,
            weight=True,
        )

        gridx = np.arange(ulx, lrx, res, dtype='float64')
        gridy = np.arange(lry, uly, res, dtype='float64')
        zstar, ss = OK.execute("grid", gridx, gridy)
        nn = None

        driver = gdal.GetDriverByName('GTiff')
        ds= driver.Create("/var/www/ciag_github/static/AU-SMN/sinreco.tif", xsize,
                      ysize, 1, gdal.GDT_Float32)

        srs = osr.SpatialReference()
        srs.ImportFromEPSG(4326)
        ds.SetProjection(srs.ExportToWkt())
        gt = [ulx, res, 0, lry, 0, res]
        ds.SetGeoTransform(gt)
        outband = ds.GetRasterBand(1)
        outband.WriteArray(zstar)
        ds = None

        rasin = "/var/www/ciag_github/static/AU-SMN/sinreco.tif"
        shpin = "/var/www/ciag_github/arg.shp"
        now = fecha + timedelta(days=1)
        date = str(now.day) + "-" + str(now.month) + "-" + str(now.year)
        year = str(now.year)
        mes = str(now.month)
        dia = str(now.day)
        rasout = "/var/www/ciag_github/static/AU-SMN/" + str(year) + str(mes) + str(dia) + ".tif"
        resampleada = "/var/www/ciag_github/nearestsmn_resampleada.tif"
        # Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
        gdal.Warp(resampleada, rasin, xRes=0.064, yRes=0.064, resampleAlg="bilinear")
        # recorto con shape de Arg
        gdal.Warp(rasout, resampleada, cutlineDSName=shpin, cropToCutline=True, dstNodata=np.nan)

        date = (dia + "-" + mes + "-" + year)
        carpeta = "AU-SMN/"

        base = "SMN"
        return render_template('humedadsuelonp.html',base=base, year=year,mes=mes,dia=dia, fecha=date, variab=var,
                               carpeta=carpeta)
    else:

        return render_template('humedadsuelonp.html',base="SMN", year=year, mes=mes, dia=dia, fecha=date, variab=var,
                               carpeta=carpeta)


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



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
