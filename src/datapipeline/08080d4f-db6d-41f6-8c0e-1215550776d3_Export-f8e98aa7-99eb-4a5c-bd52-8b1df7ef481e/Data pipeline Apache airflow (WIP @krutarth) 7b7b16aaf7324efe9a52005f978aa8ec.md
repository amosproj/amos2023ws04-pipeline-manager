# Data pipeline Apache airflow (WIP @krutarth)

This document contain in depth commands how to start a apache airflow server

### pre-requisite:

Python

Make sure python path is properly configured

### Tested on the version

- pip ~ 23.3.1
- 

Step-by-Step guide

**`sudo pip3 install virtualenv`**

create repos 

mkdir airflow_env

mkdir airflow

**`virtualenv airflow_env`**

**`source airflow_env/bin/activate`**

- **`pip3 install 'apache-airflow[gcp,sentry,statsd]`'**
    - **`cd airflow`**
    - **`airflow db init`**
    - **`mkdir dags`**
- **`airflow users create --username admin --password your_password --firstname your_first_name --lastname your_last_name --role Admin --email your_email@some.com`**
- **`airflow users list`**
- Start the scheduler : **`airflow scheduler` and let it keep running**
- start a new terminal
- **`source airflow_env/bin/activate`**
- **`cd airflow`**
- **`airflow webserver -p <port>` By default 8080**

Visit the website **[http://localhost:8080/](http://localhost:8080/)** 

A dashboard will be available login with the same password and user name you provided.

Apache airflow : https://github.com/apache/airflow

Apache airflow docs: [https://airflow.apache.org/docs/](https://airflow.apache.org/docs/)

virtual environment will look like this 

![Screenshot 2023-10-26 at 15.31.15.png](Data%20pipeline%20Apache%20airflow%20(WIP%20@krutarth)%207b7b16aaf7324efe9a52005f978aa8ec/Screenshot_2023-10-26_at_15.31.15.png)