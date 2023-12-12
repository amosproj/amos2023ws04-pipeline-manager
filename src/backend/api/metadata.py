from flask import request, jsonify, Blueprint

from database.mongo_repo import metadataDB
from database.models.metadata_details import MetadataDetails
from services.auth_service import secure

metadata = Blueprint("metadata", __name__, template_folder="templates")


@metadata.route("/metadata", methods=["GET"])
@secure
def get_all_metadatas():
    metadata = metadataDB.find()

    allData = []
    for data in metadata:
        allData.append(
            {
                "datapipelineId": data["datapipelineId"],
                "s3bucketfileId": data["s3bucketfileId"],
                "result": data["result"],
                "create_date": data["create_date"],
                "state": data["state"],
                "file_type": data["file_type"],
                "file_size": data["file_size"],
            }
        )

    return jsonify(allData), 201


@metadata.route("/metadata/datapipline_result", methods=["POST"])
@secure
def insert_file_metadata():
    data = request.json
    storedata = MetadataDetails(
        data["datapipelineId"],
        data["s3bucketfileId"],
        data["result"],
        data["create_date"],
        data["state"],
        data["file_type"],
        data["file_size"],
    )

    if "datapipelineId" not in data or "s3bucketfileId" not in data:
        return (
            jsonify({"error": "Missing datapipelineId or s3bucketfileId in request."}),
            400,
        )
    if "create_date" not in data or "state" not in data:
        return jsonify({"error": "Missing create_date or state in request."}), 400
    if "file_type" not in data or "file_size" not in data:
        return jsonify({"error": "Missing file_type or file_size in request."}), 400
    if "result" not in data:
        return jsonify({"error": "Missing result in request."})

    metadataDB.insert_one(storedata.to_json())
    print(storedata.to_json())

    return jsonify({"message": "Datapipeline metadata is stored successfully"}), 201


@metadata.route("/metadata/delete_all_data", methods=["DELETE"])
@secure
def delete_all_data():
    metadataDB.delete_many({})

    return jsonify({"message": "Datapipeline metadatas are deleted successfully"})
