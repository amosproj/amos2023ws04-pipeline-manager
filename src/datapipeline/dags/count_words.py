import requests
from airflow import DAG
from datetime import datetime, timedelta
from airflow.operators.python_operator import PythonOperator
from airflow.operators.trigger_dagrun import TriggerDagRunOperator
import pandas as pd
from airflow.models import Variable

default_args = {
    'owner': 'IAV',
    'retries': 5,
    'retry_delay': timedelta(minutes=2)
}


def read_and_count_words(**kwargs):
    download_url = Variable.get("download_url", default_var="")
    if not download_url:
        print("Download URL not provided.")
        return

    # Download the file from the provided URL
    response = requests.get(download_url)
    if response.status_code == 200:
        file_content = response.text

        # Now 'file_content' contains the content of the file
        # Proceed with processing the file content as needed
        file_reader = pd.read_csv(pd.compat.StringIO(file_content))
        print("File read successfully")
        print(file_reader.head())
        concatenated_text = file_reader.apply(lambda x: ' '.join(x.astype(str)), axis=1)
        total_word_count = concatenated_text.str.split().str.len().sum()
        print(f"Total word count is {total_word_count}")
    else:
        print(f"Failed to download file from URL: {download_url}")


dag = DAG(
    dag_id="read_and_count_words_csv",
    default_args=default_args,
    description="DAG counting words",
    start_date=datetime(2023, 11, 4, 2),
    schedule_interval='@daily'
)

trigger_task = TriggerDagRunOperator(
    task_id="triggerTask",
    trigger_dag_id="read_and_count_words_csv",
    conf={
        'download_url': 'https://example.com/your-file.csv'
    },
    dag=dag,
)

task_read_and_count_words = PythonOperator(
    task_id="readAndCountWords",
    python_callable=read_and_count_words,
    provide_context=True,
    dag=dag,
)

trigger_task >> task_read_and_count_words