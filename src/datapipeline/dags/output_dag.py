from airflow.operators.trigger_dagrun import TriggerDagRunOperator
import pandas as pd
from airflow.models import Variable
import json
from airflow.providers.http.operators.http import SimpleHttpOperator

default_args={
    'owner': 'IAV',
    'retries':5,
    'retry_delay':timedelta(minutes=2)
}

dag = DAG(
    dag_id="output_dag",
    default_args=default_args,
    description="DAG counting words",
    start_date=datetime(2023, 11, 4, 2),
    schedule_interval='@daily'
)

trigger_task = TriggerDagRunOperator(
    task_id="triggerTask",
    trigger_dag_id="output_dag",
    conf={
        'download_url': 'https://example.com/your-file.csv'
    },
    dag=dag,
)
send_response = SimpleHttpOperator(
    task_id="sendresponse",
    http_conn_id="test-connection",
    method="POST",
    endpoint="inputData",
    data=json.dumps({'test': 'hello this is data from http operator'}),
    headers={"Content-Type": "application/json"},
    dag=dag
)

trigger_task >> send_response