from osgeo import gdal
from osgeo import ogr
import numpy as np
import pandas as pd
import geopandas
import psycopg2


nombre_dat= "AU_20220802.dat"
nombre= "AU_20220802"
df = pd.DataFrame()

with open(r""+nombre_dat+"") as datFile:
    df["codest"] = ([data.split()[0] for data in datFile])
with open(r""+nombre_dat+"") as datFile:
    df["lat"] = ([data.split()[1] for data in datFile])
with open(r""+nombre_dat+"") as datFile:
    df["lon"] = ([data.split()[2] for data in datFile])
with open(r""+nombre_dat+"") as datFile:
    df["au"] = ([data.split()[3] for data in datFile])


gdf = geopandas.GeoDataFrame(df, geometry=geopandas.points_from_xy(df.lon, df.lat))
gdf = gdf.set_crs('epsg:4326')
gdf.to_file('puntos_powernasa.shp')

capa="puntos_powernasa.shp"
pts = ogr.Open(capa, 0)
layer = pts.GetLayer()

for field in layer.schema:
    print(field.name)

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
campo="au"
pts = layer = None

#interpolación idw "invdist:power=3"
# interpolacion del punto mas cercano "nearest"
#interpolación linear "linear"

nn = gdal.Grid("nearest.tif", capa, zfield=campo,
               algorithm = "linear",outputBounds = [ulx,uly,lrx,lry],width = xsize, height = ysize)
nn = None
import numpy as np

gdal.UseExceptions()
rasin= "nearest.tif"
shpin= "arg.shp"
rasout= nombre+".tif"
resampleada="nearest_resampleada.tif"
print(rasout)
#Resampleo con un 0 mas estaba antes pero pesaaban 20 megas, ahora pesan 0,2 megas
dsRes = gdal.Warp(resampleada, rasin, xRes = 0.064, yRes = 0.064,
                  resampleAlg = "bilinear")
#recorto con shape de Arg
dsClip=  gdal.Warp("../"+rasout, resampleada, cutlineDSName = shpin,cropToCutline = True, dstNodata = np.nan)




shp_file = geopandas.read_file('puntos_powernasa.shp')
shp_file.to_file("../"+nombre+'.geojson', driver='GeoJSON')
