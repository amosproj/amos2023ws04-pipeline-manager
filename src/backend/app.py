from flask import Flask, render_template
from pymongo import MongoClient
import sys
import os
from api.services.upload_api import upload_api
from api.services.datapipeline import datapipeline
from api.services.fileWP import fileWP

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

user = None

app = Flask(__name__)

def create_app():
    client = MongoClient("mongodb://test_mongodb:27017")
    db = client.flask_db
    user = db.user

    app.register_blueprint(upload_api)
    app.register_blueprint(datapipeline)
    app.register_blueprint(fileWP)


    return app

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == "__main__":
    create_app()
    # Please do not set debug=True in production
    app.run(host="0.0.0.0", port=8000, debug=True)
