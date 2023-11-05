from airflow import DAG
from datetime import datetime,timedelta
from airflow.operators.python import PythonOperator
import pandas as pd
import os

default_args={
    'owner': 'IAV',
    'retries':5,
    'retry_delay':timedelta(minutes=2)
}

def read_file(filepath):
    global file_reader
    file_reader =pd.read_csv(filepath)
    print("File read successfully")
    print(file_reader.head())
    concateneted_text = file_reader.apply(lambda x: ' '.join(x.astype(str)), axis=1)
    total_word_count = concateneted_text.str.split().str.len().sum()
    print(f"Total word count is {total_word_count}")



def count_words():
    print(f"counting words for file with 1st row{file_reader.head()}")
    concateneted_text = file_reader.apply(lambda x: ' '.join(x.astype(str)), axis=1)
    total_word_count = concateneted_text.str.split().str.len().sum()
    print(f"Total word count is {total_word_count}")


with DAG (
    dag_id="count_words_csv",
    default_args= default_args,
    description="DAG for reading CSV and counting words",
    start_date=datetime(2023,11,4,2),
    schedule_interval='@daily'
) as dag:

    task1 =PythonOperator(
        task_id = "readFile",
        python_callable=read_file,
        op_kwargs={'filepath':'https://www.stats.govt.nz/assets/Uploads/Annual-enterprise-survey/Annual-enterprise-survey-2021-financial-year-provisional/Download-data/annual-enterprise-survey-2021-financial-year-provisional-csv.csv'}
    )

    task1 
    # task2