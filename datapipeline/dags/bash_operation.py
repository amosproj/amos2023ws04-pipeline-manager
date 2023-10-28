from airflow import DAG
from datetime import datetime,timedelta
from airflow.operators.bash import BashOperator

default_args={
    'owner': 'IAV',
    'retries':5,
    'retry_delay':timedelta(minutes=2)
}


with DAG (
    dag_id="bash_operation_echo",
    default_args= default_args,
    description="This DAG contains tasked based on bash operations",
    start_date=datetime(2023,10,28,2),
    schedule_interval='@daily'
) as dag:
    task1 = BashOperator(
        task_id="bash_operation_first",
        bash_command="echo Welcome to the first DAG  generated task"

    )

    task2 = BashOperator(
        task_id ="second_task",
        bash_command ="echo this is 2nd task"
    )

# run task 2 after completion of task 1
task1.set_downstream(task2)




# 

 

    



