from flask import Flask, render_template, request, jsonify
import sys
import os
from api.upload_api import upload_api
from api.datapipeline import datapipeline
from api.fileWP import fileWP
from api.airflow_api import airflow_api
from dotenv import load_dotenv
from flask_oidc import OpenIDConnect

from flask_cors import CORS
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

user = None

app = Flask(__name__)
# TODO get origin figured out nicely
CORS(app)

app.config.update({
    'SECRET_KEY': os.getenv('OIDC_SECRET_KEY'),
    'OIDC_CLIENT_SECRETS': 'client_secrets.json',
    'OIDC_OPENID_REALM': 'flask-dpms',
    'OIDC_INTROSPECTION_AUTH_METHOD': 'client_secret_post',
    'OIDC_ID_TOKEN_COOKIE_SECURE': False,
    'OIDC_SCOPES': ['openid', 'email', 'profile'],
})

oidc = OpenIDConnect(app)



@app.route('/')
def index():
    if oidc.user_loggedin:
        return 'Welcome %s' % oidc.user_getfield('email')
    else:
        return 'Not logged in'


def register_api():
    app.register_blueprint(upload_api)
    app.register_blueprint(datapipeline)
    app.register_blueprint(fileWP)
    app.register_blueprint(airflow_api)

    return app


if __name__ == "__main__":
    register_api()

    load_dotenv()
    # Please do not set debug=True in production
    app.run(host=os.getenv('HOST_URL'), port=int(os.getenv('HOST_PORT')), debug=True)
