from flask import jsonify

from api.airflow_api import dagsExecuteById, airflow_post
from database.mongo_repo import datapipelineRunDB
from services.upload_to_s3 import download_file


def run(executionId):
    dp_run = datapipelineRunDB.find_one({"executionId": executionId})

    if not dp_run:
        return False

    response = run_airflow(executionId, dp_run['datapipelineId'], dp_run['fileId'])

    if response.status_code == 200:
        datapipelineRunDB.update_one({"executionId": executionId}, {'$set': { 'state': "QUEUED"}})
        return True
    else:
        datapipelineRunDB.update_one({"executionId": executionId}, {'$set': { 'state': "FAILED"}})
        return False


def run_airflow(executionId, datapipelineId, fileId):

    airflow_config = {'conf': {"download_url": download_file(fileId).get("download_url"),
                      'executionId': executionId,
                      'datapipelineId': datapipelineId,
                      'fileId': fileId}}

    response = airflow_post('dags/' + datapipelineId + '/dagRuns', airflow_config)
    return response

