import json

from flask import request, jsonify, Blueprint

from database.models.dp_run import DatapipelineRun
from database.mongo_repo import datapipelineRunDB, fileDetailsDB
from services.auth_service import secure
from services.dp_run import run

dp_run = Blueprint("dp_run", __name__, template_folder="templates")


@dp_run.route("/dp_run", methods=["GET"])
@secure
def get_all_dp_runs():
    dp_run = datapipelineRunDB.find()

    allData = []
    for d in dp_run:
        file_name = fileDetailsDB.find_one({"s3_uuid": d["fileId"]})

        allData.append(
            {
                "name": file_name["name"] if file_name else 'no file name given',
                "executionId": d["executionId"],
                "datapipelineId": d["datapipelineId"],
                "fileId": d["fileId"],
                "result": d["result"],
                "state": d["state"],
                "create_date": d["create_date"] if "create_date" in d else 'no date provided',
                "user": d["user"] if "user" in d else 'no user',
                "error": d["error"] if "error" in d else "no error",
            }
        )
    return jsonify(allData), 201


@dp_run.route("/dp_run/new", methods=["POST"])
@secure
def create_dp_run():
    data = request.json

    if "datapipelineId" not in data or "fileId" not in data:
        return (
            jsonify({"error": "Missing datapipelineId or s3BucketFileId in request."}),
            400,
        )

    created_dp_run = DatapipelineRun(
        data["datapipelineId"],
        data["fileId"],
    )

    datapipelineRunDB.insert_one(created_dp_run.to_json())

    return (
        jsonify(
            {
                "message": "Datapipeline dp_run is stored successfully",
                "object": created_dp_run.to_json(),
            }
        ),
        201,
    )


@dp_run.route("/dp_run/<executionId>/run", methods=["GET"])
@secure
def run_by_id(executionId):
    run_response = run(executionId)
    if run_response:
        return jsonify({"message": "Successfully started"})
    else:
        return jsonify({"message": "Failed to start"})


@dp_run.route("/dp_run/<id>", methods=["DELETE"])
@secure
def delete_dp_run(id):
    result = datapipelineRunDB.delete_one({"executionId": id})

    if result.deleted_count > 0:
        return jsonify({"message": "Sucessfully deleted"}), 201
    else:
        return jsonify({"error": "Entity not found"}), 400


@dp_run.route("/inputData", methods=["POST"])
# @public
def input_endpoint():
    data = request.json

    if data is None:
        return jsonify({"error": "Missing data"}), 400

    # TODO this is bad, dont touch this. for some reason apache airflow
    #  is sending the jsonified string with single quotes single quotes are not valid json,
    #  thats why we double quote to json.load afterwards
    data = data.replace("\'", "\"")

    data = json.loads(data)

    error_flag = False
    if "error" in data:
        error_flag = True
    if "executionId" not in data:
        return jsonify({"error": "Missing id or result in request"}), 400

    d = datapipelineRunDB.find_one({"executionId": data["executionId"]})
    if not d:
        return jsonify({"error": "Entity not found"}), 400

    if error_flag:
        datapipelineRunDB.update_one(
            {"executionId": data["executionId"]}, {"$set": {"state": "FAILED", "error": data["error"]}}
        )
    else:
        # TODO add to result not overwrite
        datapipelineRunDB.update_one(
            {"executionId": data["executionId"]},
            {"$set": {"state": "SUCCESSFULL", "result": data["result"]}},
        )

    return (
        jsonify(
            {
                "executionId": d["executionId"],
                "result": d["result"],
                "fileId": d["fileId"],
                "datapipelineId": d["datapipelineId"],
                "error": d["error"]
            }
        ),
        201,
    )
