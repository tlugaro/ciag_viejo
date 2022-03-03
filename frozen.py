from flask_frozen import Freezer
from myapplication import app

freezer = Freezer(app)

if __name__ == '__main__':

    app.testing = True
    client = app.test_client()
    freezer.freeze()