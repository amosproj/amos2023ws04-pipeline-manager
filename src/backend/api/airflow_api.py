import os

from flask import jsonify, Blueprint, request
import requests

from database.models.file_details import TaskExecutionDetails
from dotenv import load_dotenv

load_dotenv()
airflow_api = Blueprint("airflow_api", __name__, template_folder="templates")


@airflow_api.route('/start_airflow', methods=['GET'])
class StartAirFlow:
    def get(self):
        # Trigger Airflow DAG using the REST API
        dag_id = request.args.get('parameter')
        airflow_api_url = os.getenv('AIRFLOW_SERVER_URL') + f'/api/v1/dags/{dag_id}/dagRuns'
        response = requests.post(airflow_api_url)

        if response.status_code == 200:
            return jsonify({'message': 'Airflow DAG triggered successfully'})
        else:
            return jsonify({'error': 'Failed to trigger Airflow DAG'}), 500



@airflow_api.route('/get_airflow_details', methods=['GET'])
class GetAirFlow:
    def get(self):
        # Get the execution_date of the most recent DAG run
        dag_id = request.args.get('parameter')
        dag_run_url = os.getenv('AIRFLOW_SERVER_URL') + f'/api/v1/dags/{dag_id}/dagRuns'
        dag_runs = requests.get(dag_run_url).json()['dag_runs']

        if not dag_runs:
            return jsonify({'error': 'No DAG runs found'}), 404

        execution_date = dag_runs[0]['execution_date']

        # Get the task instance
        task_instance_url = os.getenv('AIRFLOW_SERVER_URL') + f'/api/v1/dags/{dag_id}/dagRuns/{execution_date}/taskInstances'
        task_instance = requests.get(task_instance_url).json()[0]

        # Get the task log
        task_log_url = os.getenv('AIRFLOW_SERVER_URL') + f'/api/v1/dags/{dag_id}/dagRuns/{execution_date}/taskInstances/{task_instance["task_id"]}/logs'
        task_log = requests.get(task_log_url).text

        result = TaskExecutionDetails(
            execution_date=execution_date,
            task_instance=task_instance,
            task_log=task_log)

        return result
