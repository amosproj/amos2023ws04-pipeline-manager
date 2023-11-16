from flask import Flask, render_template
import sys
import os
from api.services.upload_api import upload_api
from api.services.datapipeline import datapipeline
from api.services.fileWP import fileWP
from dotenv import load_dotenv
from api.services.air_flow_api import air_flow_api
from flask_restful import Api, Resource

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

user = None

app = Flask(__name__)
api = Api(app, version='1.0', title='My API', description='A simple API')



def register_api():

    app.register_blueprint(upload_api)
    app.register_blueprint(datapipeline)
    app.register_blueprint(fileWP)
    app.register_blueprint(air_flow_api)

    return app

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == "__main__":
    register_api()

    load_dotenv()
    # Please do not set debug=True in production
    app.run(host=os.getenv('HOST_URL'), port=int(os.getenv('HOST_PORT')), debug=True)
