from airflow import DAG
from datetime import datetime,timedelta
from airflow.operators.python import PythonOperator

default_args={
    'owner': 'IAV',
    'retries':5,
    'retry_delay':timedelta(minutes=2)
}

def hello():
    print("Hello world")

def hello_name(name):
    print(f"Hello my name is {name}")



with DAG (
    dag_id="bash_operation_python",
    default_args= default_args,
    description="DAG using python operator",
    start_date=datetime(2023,10,28,2),
    schedule_interval='@daily'
) as dag:
    task1 =PythonOperator(
        task_id = "greet",
        python_callable=hello
    )
    task2 =PythonOperator(
        task_id = "greet_name",
        python_callable=hello_name,
        op_kwargs={'name': 'IAV'}
    )

    task1 
    task2