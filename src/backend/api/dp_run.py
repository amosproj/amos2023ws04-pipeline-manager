from flask import request, jsonify, Blueprint

from database.models.dp_run import DatapipelineRun
from database.mongo_repo import datapipelineRunDB
from services.auth_service import secure
from services.dp_run import run

dp_run = Blueprint("dp_run", __name__, template_folder="templates")




@dp_run.route("/dp_run", methods=["GET"])
@secure
def get_all_dp_runs():
    dp_run = datapipelineRunDB.find()

    allData = []
    for d in dp_run:
            allData.append({
                    "executionId": d["executionId"],
                    "datapipelineId": d["datapipelineId"],
                    "fileId": d["fileId"],
                    "result": d["result"],
                    "state": d["state"],
                })
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

    return jsonify({"message": "Datapipeline dp_run is stored successfully",
                    "object": created_dp_run.to_json()}), 201

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
        return jsonify({'message': 'Sucessfully deleted'}), 201
    else:
        return jsonify({'error': 'Entity not found'}), 400


