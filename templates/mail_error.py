import smtplib, ssl
import datetime
import time
from datetime import timedelta
import psycopg2
import pandas as pd

class Mail:

    def __init__(self):
        self.port = 465
        self.smtp_server_domain_name = "smtp.gmail.com"
        self.sender_mail = 'anemoi.vientos.arg@gmail.com'
        self.password = 'lyqrctvwauauggnq'

    def send(self, emails, subject, content):
        ssl_context = ssl.create_default_context()
        service = smtplib.SMTP_SSL(self.smtp_server_domain_name, self.port, context=ssl_context)
        service.login(self.sender_mail, self.password)

        for email in emails:
            result = service.sendmail(self.sender_mail, email, f"Subject: {subject}\n{content}")

        service.quit()

def powernasa(nowie):
    #conexion a la base de datos
    conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    #aca va la consulta para ver si da error
    resultados = pd.read_sql(
        "select * FROM power_nasa.conteo_diario where date= ('"+str(nowie)+"')::date", conexion)

    dia = str(nowie.day)
    year = str(nowie.year)
    mes = str(nowie.month)

    if resultados["proceso"][0]=="ERROR":

        if __name__ == '__main__':
            mails = "calabres@agro.uba.ar", "lugarotomas@gmail.com"
            subject = "Error en carga de datos"
            content = "Hubo un error en la carga de datos diarios de NASA POWER el "+dia+" del "+ mes+ " del "+ year

            mail = Mail()
            mail.send(mails, subject, content)
    else:
        print("todo joya")
        pass



def bhoa_powernasa(nowie):
    #conexion a la base de datos
    conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    #aca va la consulta para ver si da error
    resultados = pd.read_sql(
        "select fecha FROM bhoa.bhoa_power_nasa group by 1 order by 1 desc limit 1", conexion)

    dia = str(nowie.day)
    year = str(nowie.year)
    mes = str(nowie.month)
    fecha=str(resultados["fecha"][0])

    if fecha!=str(nowie):

        if __name__ == '__main__':
            mails = "calabres@agro.uba.ar", "lugarotomas@gmail.com"
            subject = "Error en carga de datos"
            content = "Hubo un error en la carga del bhoa de NASA POWER el "+dia+" del "+ mes+ " del "+ year

            mail = Mail()
            mail.send(mails, subject, content)
    else:
        print("todo joya")
        pass

def bhoa_smn(now):
    #conexion a la base de datos
    conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    #aca va la consulta para ver si da error
    resultados = pd.read_sql(
        "select fecha FROM bhoa.bhoa_smn group by 1 order by 1 desc limit 1", conexion)

    dia = str(now.day)
    year = str(now.year)
    mes = str(now.month)
    fecha=str(resultados["fecha"][0])
    print(now)
    if fecha!=str(now):

        if __name__ == '__main__':
            mails = "calabres@agro.uba.ar", "lugarotomas@gmail.com"
            subject = "Error en carga de datos"
            content = "Hubo un error en la carga del bhoa de SMN el "+dia+" del "+ mes+ " del "+ year

            mail = Mail()
            mail.send(mails, subject, content)
    else:
        print("todo joya")
        pass

while True:
    try:
        now=datetime.date.today()
        nowie= now-timedelta(hours=96)

        dia=now.day
        year=now.year
        mes=now.month
        print("ejecutado ", now, " Se volverá a ejecutar en 24 horas")
        bhoa_powernasa(nowie)
        powernasa(nowie)
        bhoa_smn(now)
        time.sleep(86400)
        pass
    except:
        time.sleep(10800)
        pass
