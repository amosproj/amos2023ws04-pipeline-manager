from flask import Flask, render_template
import sys
import os
from api.services.upload_api import upload_api
from api.services.datapipeline import datapipeline
from api.services.fileWP import fileWP
from dotenv import load_dotenv


sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)

load_dotenv()

def register_api():

    app.register_blueprint(upload_api)
    app.register_blueprint(datapipeline)
    app.register_blueprint(fileWP)

    return app

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == "__main__":
    register_api()
    # Please do not set debug=True in production
    app.run(host=os.getenv('HOST_URL'), port=int(os.getenv('HOST_PORT')), debug=True)
