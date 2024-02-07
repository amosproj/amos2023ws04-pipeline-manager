from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
import json
from airflow.providers.http.operators.http import SimpleHttpOperator

default_args = {
    'owner': 'IAV',
    'retries': 5,
    'retry_delay': timedelta(minutes=2)
}


def create_error_func(**kwargs):
    executionId = kwargs['dag_run'].conf.get('executionId')

    if not executionId:
        print("Error executionId not found")
        return

    kwargs['ti'].xcom_push(key="error-identifier", value={"error": {"error": "Succesfully created an error"}, "executionId": executionId})
    return


dag = DAG(
    dag_id="create_error",
    default_args=default_args,
    description="DAG to test error",
    start_date=datetime(2023, 11, 4, 2),
    schedule_interval=None
)


task_create_error_output = PythonOperator(
    task_id="create_error_output",
    python_callable=create_error_func,
    provide_context=True,
    dag=dag,
)


send_response = SimpleHttpOperator(
    task_id="sendresponse",
    http_conn_id="https-connection",
    method="POST",
    endpoint="inputData",
    data=json.dumps("{{ task_instance.xcom_pull(task_ids='create_error_output', key='error-identifier') }}"),
    headers={"Content-Type": "application/json"},
    response_check=lambda response: True if (response.status_code == 200 | response.status_code == 201) else False,
    dag=dag
)

task_create_error_output >> send_response