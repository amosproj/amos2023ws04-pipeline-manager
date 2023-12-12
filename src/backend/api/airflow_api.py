import os

from flask import jsonify, Blueprint, request
import requests
from requests.auth import HTTPBasicAuth

from dotenv import load_dotenv

from services.auth_service import secure
from services.upload_to_s3 import download_file


load_dotenv()
airflow_api = Blueprint("airflow_api", __name__, template_folder="templates")

def airflow_get(url):
    basic = HTTPBasicAuth(os.getenv('AIRFLOW_USERNAME'), os.getenv('AIRFLOW_PASSWORD'))
    response = requests.get(os.getenv('AIRFLOW_SERVER_URL') + 'api/v1/' + url,
                            auth=basic, headers={'content-type': 'application/json'})
    return response

def airflow_post(url, json_object):
    basic = HTTPBasicAuth(os.getenv('AIRFLOW_USERNAME'), os.getenv('AIRFLOW_PASSWORD'))
    response = requests.post(os.getenv('AIRFLOW_SERVER_URL') + 'api/v1/' + url, json=json_object,
                             auth=basic, headers={'content-type': 'application/json'})
    if response.status_code == 200:
        return response
    else:
        return jsonify({'error': 'Failed to post to apache airflow'}), 500


@airflow_api.route('/dags', methods=['GET'])
@secure
def dags():
    response = airflow_get('dags')
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to trigger Airflow DAG'}), 500

@airflow_api.route('/dags/<id>/execute', methods=['GET'])
@secure
def dagsExecuteById(id):
    file_name = request.args.get('parameter')
    json_config = {'conf': download_file(file_name)}

    response = airflow_post('dags/' + id + '/dagRuns', json_config)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to trigger Airflow DAG'}), 500


@airflow_api.route('/dags/<id>/dagRuns', methods=['GET'])
@secure
def dagsDetailsById(id):
        # Get the execution_date of the most recent DAG run
        response = airflow_get('dags/' + id + '/dagRuns')

        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Failed to trigger Airflow DAG'}), 500


@airflow_api.route('/dags/<id>/dagRuns/<execution_date>', methods=['GET'])
@secure
def dagsDetailsByIdByExecutionDate(id, execution_date):

    # Get the execution_date of the most recent DAG run
    response = airflow_get('dags/' + id + '/dagRuns/' + execution_date + '/taskInstances')

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to trigger Airflow DAG'}), 500

@airflow_api.route('/dags/<id>/dagRuns/<execution_date>/taskInstances/<task_instance>', methods=['GET'])
@secure
def dagsDetailsByIdByExecutionDateByTaskInstance(id, execution_date, task_instance):

    # Get the execution_date of the most recent DAG run
    response = airflow_get('dags/' + id + '/dagRuns/' + execution_date + '/taskInstances/' + task_instance + 'logs')

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to trigger Airflow DAG'}), 500

