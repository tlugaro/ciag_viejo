from flask import Flask, render_template
import flask
from flask_mail import Mail, Message
from flask import request, redirect
app= Flask(__name__)


def mail():
    with app.app_context():
        app.config['DEBUG']= False
        app.config['TESTING']= False
        app.config['MAIL_SERVER']='smtp.gmail.com'
        app.config['MAIL_PORT']= 465
        app.config['MAIL_USE_TLS']= False
        app.config['MAIL_USE_SSL']= True
        app.config['MAIL_USERNAME']= 'anemoi.vientos.arg@gmail.com'
        app.config['MAIL_PASSWORD']= 'lyqrctvwauauggnq'
        app.config['MAIL_DEFAULT_SENDER']= 'anemoi.vientos.arg@gmail.com'
        app.config['MAIL_MAX_EMAILS']= 1
        app.config['MAIL_SUPPRESS_SEND']= False
        app.config['MAIL_ASCII_ATTACHMENTS']= False

        email=('tlugaro@agro.uba.ar')
        mensaje=('Hubo un error en la carga de datos de ayer!')
        cuerpo=(str(mensaje))
        print(cuerpo)
        msg = Message(email, recipients=['anemoi.vientos.arg@gmail.com'])
        msg.body = cuerpo
        mail.send(msg)
mail()



