from flask import Flask, url_for, redirect
import os

from flask_oidc import OpenIDConnect

from dotenv import load_dotenv

from api.airflow_api import airflow_api
from api.datapipeline import datapipeline
from api.dp_run import dp_run
from api.fileWP import fileWP
from api.upload_api import upload_api
from services.auth_service import secure
from flask_cors import CORS


app = Flask(__name__)
# TODO get origin figured out nicely
CORS(app)
load_dotenv()
app.config.update(
    {
        "SECRET_KEY": os.getenv("OIDC_SECRET_KEY"),
        "TESTING": True,
        "DEBUG": True,
        "OIDC_CLIENT_SECRETS": "client_secrets.json",
        "OIDC_ID_TOKEN_COOKIE_SECURE": False,
        "OIDC_USER_INFO_ENABLED": True,
        "OIDC_OPENID_REALM": "master",
        "OIDC_SCOPES": ["openid", "email", "profile"],
        "OIDC_INTROSPECTION_AUTH_METHOD": "client_secret_post",
    }
)
oidc = OpenIDConnect(app)


app.register_blueprint(upload_api)
app.register_blueprint(datapipeline, url_prefix="/")
app.register_blueprint(fileWP)
app.register_blueprint(airflow_api)
app.register_blueprint(dp_run)


@app.route("/")
@secure
def root():
    return redirect(url_for("index"))


@app.route("/index")
@secure
def index():
    return "Welcome %s" % oidc.user_getfield("email")


@app.route("/auth")
@oidc.require_login
def auth():
    return redirect(url_for("index"))


if __name__ == "__main__":
    load_dotenv()
    # Please do not set debug=True in production
    app.run(host=os.getenv("HOST_URL"), port=int(os.getenv("HOST_PORT")), debug=True)
