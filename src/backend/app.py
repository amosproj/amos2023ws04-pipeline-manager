from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import sys
import os
import requests
from api.upload_api import upload_api
from api.datapipeline import datapipeline
from api.fileWP import fileWP
from api.air_flow_api import air_flow_api
from flask_restx import Api, Resource

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

user = None

app = Flask(__name__)
api = Api(app)

api = Api(app)


@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return 'hello'


api1 = api.namespace("start", description="airflow strats")


@api1.route('/start_airflow', methods=['GET'])
class StartAirFlow(Resource):
    def get(self):
        # Trigger Airflow DAG using the REST API
        dag_id = request.args.get('parameter')
        airflow_api_url = f'http://airflow-server:8080/api/v1/dags/{dag_id}/dagRuns'
        response = requests.post(airflow_api_url)

        if response.status_code == 200:
            return jsonify({'message': 'Airflow DAG triggered successfully'})
        else:
            return jsonify({'error': 'Failed to trigger Airflow DAG'}), 500


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
    register_api()

    load_dotenv()
    # Please do not set debug=True in production
    app.run(host=os.getenv('HOST_URL'), port=int(os.getenv('HOST_PORT')), debug=True)
