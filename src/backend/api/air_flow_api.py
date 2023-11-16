from flask import jsonify, Blueprint, request
import requests
from flask_restx import Api, Resource
from database.models.file_details import TaskExecutionDetails

air_flow_api = Blueprint("air_flow_api", __name__, template_folder="templates")
air_api = Api(air_flow_api, doc='/swagger')

# Define a route to start Airflow DAG
api1 = air_api.namespace('api1', description='Air Flow Start')


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


# Define  route to get details, logs, and output
api2 = air_api.namespace('api2', description="Get Details")


@api2.route('/get_airflow_details', methods=['GET'])
class GetAirFlow(Resource):
    def get(self):
        # Get the execution_date of the most recent DAG run
        dag_id = request.args.get('parameter')
        dag_run_url = f'http://airflow-server:8080/api/v1/dags/{dag_id}/dagRuns'
        dag_runs = requests.get(dag_run_url).json()['dag_runs']

        if not dag_runs:
            return jsonify({'error': 'No DAG runs found'}), 404

        execution_date = dag_runs[0]['execution_date']

        # Get the task instance
        task_instance_url = f'http://airflow-server:8080/api/v1/dags/{dag_id}/dagRuns/{execution_date}/taskInstances'
        task_instance = requests.get(task_instance_url).json()[0]

        # Get the task log
        task_log_url = f'http://airflow-server:8080/api/v1/dags/{dag_id}/dagRuns/{execution_date}/taskInstances/{task_instance["task_id"]}/logs'
        task_log = requests.get(task_log_url).text

        result = TaskExecutionDetails(
            execution_date=execution_date,
            task_instance=task_instance,
            task_log=task_log)

        return result
