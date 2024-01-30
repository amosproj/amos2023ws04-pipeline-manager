import requests
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
import pandas as pd
from datetime import datetime, timedelta
from airflow.operators.trigger_dagrun import TriggerDagRunOperator
import json
import io
from airflow.providers.http.operators.http import SimpleHttpOperator

default_args = {
    'owner': 'IAV',
    'retries': 5,
    'retry_delay': timedelta(minutes=2)
}


def read_file(file_path):
    try:
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
            return df

        elif file_path.endswith('.json'):
            with open(file_path, 'r') as json_file:
                data = pd.read_json(json_file)
                return data

        elif file_path.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file_path)
            return df

        else:
            return "Unsupported file format. Please provide a CSV, JSON, or Excel file."

    except Exception as e:
        return f"Error reading file: {e}"


def read_and_count_consonant(**kwargs):
    download_url = kwargs['dag_run'].conf.get('download_url')
    executionId = kwargs['dag_run'].conf.get('executionId')

    if not executionId:
        kwargs['ti'].xcom_push(key="test-identifier", value={"error": "executionId not provided."})
        print("Error download url not found")
        return

    if not download_url:
        kwargs['ti'].xcom_push(key="test-identifier",
                               value={"error": "Download URL not provided.", "executionId": executionId})
        print("Error download url not found")
        return

    # Download the file from the provided URL
    response = requests.get(download_url)
    if response.status_code == 200:
        file_content = response.text

        # Now 'file_content' contains the content of the file
        # Proceed with processing the file content as needed
        file_reader = pd.read_csv(io.StringIO(file_content))
        # Save the content to a temporary file
        with open("temp_file.csv", "wb") as temp_file:
            temp_file.write(response.content)

        # Read the CSV content
        df = pd.read_csv("temp_file.csv")
        value_string = df.values[3]
        print("File read successfully")
        print(file_reader)
        vowels = "aeiouAEIOU"
        consonant_count = 0
        for char in value_string:
            for ch in char:
                if ch not in vowels:
                    consonant_count += 1

        print("vowel_count", consonant_count)
        kwargs['ti'].xcom_push(key="test-identifier", value={"result": {"word_count": consonant_count},
                                                             "executionId": executionId})
    else:
        print(f"Failed to download file from URL: {download_url}")
        kwargs['ti'].xcom_push(key="test-identifier", value={"error": "Failed to download file from URL",
                                                             "executionId": executionId})
        return


dag = DAG(
    dag_id="consonant_output",
    default_args=default_args,
    description="DAG to test input and output",
    start_date=datetime(2023, 11, 4, 2),
    schedule_interval=None
)

trigger_task = TriggerDagRunOperator(
    task_id="triggerTask",
    trigger_dag_id="output_dag",
    conf={
        'Error': 'No conf given.'
    },
    dag=dag,
)

task_read_and_count_vowels = PythonOperator(
    task_id="readAndCountConsonant",
    python_callable=read_and_count_consonant,
    provide_context=True,
    dag=dag,
)

send_response = SimpleHttpOperator(
    task_id="sendresponse",
    http_conn_id="test-connection",
    method="POST",
    endpoint="inputData",
    data=json.dumps("{{ task_instance.xcom_pull(task_ids='readAndCountConsonant', key='test-identifier')}}"),
    headers={"Content-Type": "application/json"},
    response_check=lambda response: True if response.status_code == 200 else False,
    dag=dag
)

trigger_task >> task_read_and_count_vowels >> send_response
