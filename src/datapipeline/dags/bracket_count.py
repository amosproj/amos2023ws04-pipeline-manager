import requests
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
import pandas as pd
from datetime import datetime, timedelta
import json
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


def read_and_count_bracket(**kwargs):
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


        # Save the content to a temporary file
        with open("temp_file.csv", "wb") as temp_file:
            temp_file.write(file_content.encode('utf-8'))


        # Read the CSV content
        #df = pd.read_csv("temp_file.csv")
        value_string =  response.text    # df.values[3]
        print("File read successfully")
        bracket = "{}"
        bracket_count = 0
        for char in value_string:
            for ch in char:
                if ch in bracket:
                    bracket_count += 1

        print("vowel_count", bracket_count)
        kwargs['ti'].xcom_push(key="test-identifier", value={"result": {"bracket_count": bracket_count},
                                                             "executionId": executionId})
    else:
        print(f"Failed to download file from URL: {download_url}")
        kwargs['ti'].xcom_push(key="test-identifier", value={"error": "Failed to download file from URL",
                                                             "executionId": executionId})
        return


dag = DAG(
    dag_id="bracket_output",
    default_args=default_args,
    description="DAG to count the bracket number in a file",
    start_date=datetime(2023, 11, 4, 2),
    schedule_interval=None
)

task_read_and_count_vowels = PythonOperator(
    task_id="readAndCountBracket",
    python_callable=read_and_count_bracket,
    provide_context=True,
    dag=dag,
)

send_response = SimpleHttpOperator(
    task_id="sendresponse",
    http_conn_id="https-connection",
    method="POST",
    endpoint="inputData",
    data=json.dumps("{{ task_instance.xcom_pull(task_ids='readAndCountBracket', key='test-identifier')}}"),
    headers={"Content-Type": "application/json"},
    response_check=lambda response: True if (response.status_code == 200 | response.status_code == 201) else False,
    dag=dag
)
task_read_and_count_vowels >> send_response