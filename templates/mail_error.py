import smtplib, ssl
import datetime
from datetime import timedelta
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

def powernasa(dia,mes, year):
    #conexion a la base de datos
    conexion = psycopg2.connect(host="10.1.5.144", dbname="ciag", user="tomy", password="tomy1234", port="5432")
    #aca va la consulta para ver si da error
    resultados = pd.read_sql(
        'select * FROM where'+dia+mes+year, conexion)
    if resultados[3]=="Error":
        if __name__ == '__main__':
            mails = "lcalabrese@agro.uba.ar"
            subject = "Error en carga de datos"
            content = "Hubo un error ayer en la carga de datos de NASA POWER"

            mail = Mail()
            mail.send(mails, subject, content)
    else:
        pass
now=datetime.date.today() -timedelta(hours=24)
dia=now.day
year=now.year
mes=now.month
print(dia,mes,year)
powernasa(dia,mes,year)