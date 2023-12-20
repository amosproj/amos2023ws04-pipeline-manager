from flask import request, jsonify, Blueprint

from database.mongo_repo import metadataDB
from database.models.metadata_details import MetadataDetails
from services.auth_service import secure
from services.store_s3metadata import (
    insert_all_s3files_metadata,
    insert_one_s3file_metadata,
    remove_s3metadata,
)


metadata = Blueprint("metadata", __name__, template_folder="templates")


@metadata.route("/datapipeline_metadata", methods=["GET"])
@secure
def get_all_datapipeline_metadatas():
    metadata = metadataDB.find()

    allData = []
    for data in metadata:
        if "datapipelineId" in data:
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
        else:
            continue
    return jsonify(allData), 201


@metadata.route("/s3files_metadata", methods=["GET"])
@secure
def get_all_s3files_metadatas():
    metadata = metadataDB.find()
    allData = []

    for data in metadata:
        if "Key" in data:
            allData.append(
                {
                    "key": data["Key"],
                    "last_modified": data["LastModified"],
                    "size": data["Size"],
                    "etag": data["ETag"],
                    "storage_class": data["StorageClass"],
                }
            )
        else:
            continue
    return jsonify(allData), 201


@metadata.route("/metadata/datapipline_result", methods=["POST"])
@secure
def insert_file_metadata():
    data = request.json

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

    store_metadata = MetadataDetails(
        data["datapipelineId"],
        data["s3bucketfileId"],
        data["result"],
        data["create_date"],
        data["state"],
        data["file_type"],
        data["file_size"],
    )

    metadataDB.insert_one(store_metadata.to_json())
    print(store_metadata.to_json())

    return jsonify({"message": "Datapipeline metadata is stored successfully"}), 201


@metadata.route("/metadata/store_all_s3metadata", methods=["POST"])
@secure
def store_all_s3files_metadata():
    insert_all_s3files_metadata(metadataDB)
    return jsonify(
        {"message": "The metadatas of files in S3 bucket are stored successfully!"}
    )


@metadata.route("/metadata/store_single_s3metadata", methods=["POST"])
@secure
def store_single_s3metadata():
    data = request.json
    response = insert_one_s3file_metadata(metadataDB, data["file_name"])
    if response != None:
        return jsonify(
            {"message": "The metadatas of uploaded file is stored successfully!"}
        )
    else:
        return jsonify({"message": "There is no such a file in the S3 bucket!"})


@metadata.route("/metadata/delete_all_metadata", methods=["DELETE"])
@secure
def delete_all_metadata():
    metadataDB.delete_many({})

    return jsonify({"message": "All metadatas are deleted successfully"})


@metadata.route("/metadata/delete_single_s3file_metadata", methods=["DELETE"])
@secure
def delete_single_s3file_metadata():
    data = request.json

    response = remove_s3metadata(metadataDB, data["file_name"])
    if response == None:
        return jsonify({"message": "Metadata of file is not exist"})
    else:
        return jsonify({"message": "Metadata of file is deleted successfully"})
