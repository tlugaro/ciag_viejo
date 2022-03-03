from flask import Flask, render_template, url_for
import os
import pandas
app = Flask(__name__)

SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY


@app.route("/")
def index():
    return render_template("index.html")
@app.route("/Pronósticos")
def pronostico():
    return render_template("futuros.html")

@app.route("/fut")
def futuro():
    return render_template("futuros_filtro.html")

@app.route("/Pasado", methods=['GET', 'POST'])
def home():
    return render_template("ControldeCapas_definitive.html")

if __name__ == '__main__':
    app.run(debug=True)




"""
tres grandes grupos:
2 por grupo 
    foto representativa
    Pronosticos meteorologiocs -- semanal y a 7 dias
    
    foto resumen
    pronosticos agro (trimestral, niño) 
    
    imagen de atlas
    proyecciones(ipcc, poner imagen de atlas)
    visualizador de pdf
    
    filtros
    HACER POR COLUMNAS
    sacar semanal??
    sumar pronosticos de modelos distintos
    
pronosticos trimestrales del smn
pronostico del niño NOA
atlas de pryoecciones del ipcc



"""

