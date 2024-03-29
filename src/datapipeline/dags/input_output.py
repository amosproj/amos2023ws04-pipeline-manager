import requests
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
import pandas as pd
from datetime import datetime, timedelta
import json
import io
from airflow.providers.http.operators.http import SimpleHttpOperator

default_args = {
    'owner': 'IAV',
    'retries': 5,
    'retry_delay': timedelta(minutes=2)
}


def read_and_count_words(**kwargs):
    download_url = kwargs['dag_run'].conf.get('download_url')
    executionId = kwargs['dag_run'].conf.get('executionId')

    if not executionId:
        kwargs['ti'].xcom_push(key="test-identifier", value={"error": "executionId not provided."})
        print("Error download url not found")
        return

    if not download_url :
        kwargs['ti'].xcom_push(key="test-identifier", value={"error": "Download URL not provided.", "executionId": executionId , "result": "error"})
        print("Error download url not found")
        return


    # Download the file from the provided URL
    response = requests.get(download_url)
    if response.status_code == 200:
        file_content = response.text

        # Now 'file_content' contains the content of the file
        # Proceed with processing the file content as needed
        file_reader = pd.read_csv(io.StringIO(file_content))
        print("File read successfully")
        print(file_reader.head())
        concatenated_text = file_reader.apply(lambda x: ' '.join(x.astype(str)), axis=1)
        print(concatenated_text)
        # TODO
        total_word_count = 50 #concatenated_text.str.split().str.len().sum()
        print(f"Total word count is {total_word_count}")
        kwargs['ti'].xcom_push(key="test-identifier", value={ "result": {"word_count": total_word_count},"executionId": executionId})
    else:
        print(f"Failed to download file from URL: {download_url}")
        kwargs['ti'].xcom_push(key="test-identifier", value={"error": "Failed to download file from URL",
                                                             "executionId": executionId,
                                                             "result": "error"})
        return


dag = DAG(
    dag_id="input_output",
    default_args=default_args,
    description="DAG to test input and output",
    start_date=datetime(2023, 11, 4, 2),
    schedule_interval=None
)


task_read_and_count_words = PythonOperator(
    task_id="readAndCountWords",
    python_callable=read_and_count_words,
    provide_context=True,
    dag=dag,
)


send_response = SimpleHttpOperator(
    task_id="sendresponse",
    http_conn_id="https-connection",
    method="POST",
    endpoint="inputData",
    data=json.dumps("{{ task_instance.xcom_pull(task_ids='readAndCountWords', key='test-identifier') }}"),
    headers={"Content-Type": "application/json"},
    response_check=lambda response: True if (response.status_code == 200 | response.status_code == 201) else False,
    dag=dag
)

task_read_and_count_words >> send_response