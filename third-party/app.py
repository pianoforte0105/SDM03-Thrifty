from updateDB import updateSeven
from flask import Flask
from flask_restful import Api
from werkzeug.middleware.proxy_fix import ProxyFix


app = Flask(__name__)
api = Api(app)
api.add_resource(updateSeven, '/')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)