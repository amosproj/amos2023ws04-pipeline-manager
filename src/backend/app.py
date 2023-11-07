from flask import Flask, render_template, send_from_directory
from pymongo import MongoClient
from .api.services.upload_api import upload_api


user = None


def create_app():
    app = Flask(__name__)
    client = MongoClient('localhost', 27017)
    db = client.flask_db
    user = db.user

    @app.route('/')
    def index():
        return render_template("index.html")

    app.register_blueprint(upload_api)

    return app
