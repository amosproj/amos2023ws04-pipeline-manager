from flask import Flask, render_template, send_from_directory
from pymongo import MongoClient
import sys
import os
from api.services.upload_api import upload_api
from api.services.datapipeline import datapipeline
from api.services.fileWP import fileWP
from api.services.air_flow_api import air_flow_api
from flask_restful import Api, Resource

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

user = None

app = Flask(__name__)
api = Api(app, version='1.0', title='My API', description='A simple API')


def create_app():
    client = MongoClient('localhost', 27017)
    db = client.flask_db
    user = db.user

    app.register_blueprint(upload_api)
    app.register_blueprint(datapipeline)
    app.register_blueprint(fileWP)
    app.register_blueprint(air_flow_api)


    return app

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == "__main__":
    create_app()
    # Please do not set debug=True in production
    app.run(host="0.0.0.0", port=8000, debug=True)
