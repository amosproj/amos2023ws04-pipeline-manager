import json

from flask import request, Blueprint, jsonify

from database.mongo_repo import fileDetailsDB
from database.mongo_repo import datapipelineRunDB
from services.auth_service import secure
from services.file_storage import (
    list_file,
    get_file_upload_url,
    delete_file,
)

from services.file_detail import insert_file_details
from services.s3_storage import s3_delete_file, s3_get_download_url

file = Blueprint("file", __name__, template_folder="templates")


@file.route("/s3file", methods=['GET'])
@secure
def get_all_s3_files():
    # List objects in the bucket
    try:
        objects = list_file()
        if objects:
            # files = [obj['Key'] for obj in objects]
            return jsonify(objects)
        else:
            return "The bucket is empty."

    except Exception as e:
        return jsonify({f"Error: {e}"})


@file.route("/file", methods=['GET'])
@secure
def get_all_files():
    data = fileDetailsDB.find()

    allData = []
    for d in data:
        allData.append(
            {
                "uuid": d["uuid"],
            "name": d["name"],
            "mime_type": d["mime_type"],
            "size": d["size"],
            "s3_uuid": d["s3_uuid"],
            "content_type": d["content_type"],
            "storage_class": d["storage_class"],
            "last_modified": d["last_modified"],
            # "create_date": d["create_date"] if d["create_date"] else None,
                "user": d["user"] if "user" in d else 'No user',
            }
)
    return jsonify(allData), 201


@file.route('/file/new', methods=["POST"])
@secure
def create_file():
    data = request.json
    # todo add s3_uuid check
    if 'fileName' not in data:
        return jsonify({'error': 'Missing fileName in request'}), 400
    file_name = data['fileName']
    s3_uuid = data['s3_uuid']
    mime_type = data['mime_type']

    insert_file_details(file_name, s3_uuid, mime_type)

    if file_name:
        return jsonify({'message': 'Saved successfully'})


@file.route("/file/<id>", methods=['GET'])
@secure
def get_file(id):
    try:
        # TODO
        return jsonify({"message": "test message"})

        # Send the file for download
    except Exception as e:
        return f"Error: {e}"


@file.route("/file/<id>", methods=["DELETE"])
@secure
def delete_file(id):
    try:

        file_details = fileDetailsDB.find_one({"uuid": id})
        s3_uuid = file_details['s3_uuid']

        # delete s3 bucket file
        s3_delete_file(s3_uuid)

        # delete file detail
        fileDetailsDB.delete_one({"uuid": id})

        return jsonify('Sucessfull deleted')
    except Exception as e:
        return jsonify(f"Error: {e}")


@file.route('/file/upload', methods=['POST'])
@secure
def upload_file_with_url():
    data = request.json
    if 'fileName' not in data:
        return jsonify({'error': 'Missing fileName in request'}), 400

    return jsonify(get_file_upload_url(data['fileName']))


@file.route("/file/<id>/download", methods=['GET'])
@secure
def download_file(id):
    try:
        # Download the object from S3
        file_details = fileDetailsDB.find_one({"uuid": id})
        s3_uuid = file_details['s3_uuid']
        file_name = file_details['name']

        download_url = s3_get_download_url(s3_uuid, file_name)
        return jsonify({"download_url": download_url})

        # Send the file for download
    except Exception as e:
        return f"Error: {e}"


@file.route('/file/search', methods=['POST'])
@secure
def get_data():
    # Get query parameters from the request
    query = request.args.get('query')
    projection = request.args.get('projection')
    options = request.args.get('options')

    query = json.loads(query) if query else {}

    projection = json.loads(projection) if projection else {}

    options = json.loads(options) if options else {}

    result = datapipelineRunDB.find(query, projection, **options)

    result_list = list(result)

    return jsonify(result_list)


@file.route("/file/<file_uuid>/dp_run", methods=["GET"])
@secure
def get_all_dp_runs_by_file_name(file_uuid):
    dp_run_data = datapipelineRunDB.find()
    all_data_by_file = []
    file_name_by_id = fileDetailsDB.find_one({"s3_uuid": file_uuid})
    for d in dp_run_data:
        file_name = fileDetailsDB.find_one({"s3_uuid": d["fileId"]})
        if file_uuid == d["fileId"]:
            all_data_by_file.append(
                {
                    "name": file_name["name"] if file_name else 'no file name given',
                    "executionId": d["executionId"],
                    "datapipelineId": d["datapipelineId"],
                    "fileId": d["fileId"],
                    "result": d["result"],
                    "state": d["state"],
                    "create_date": d["create_date"] if "create_date" in d else None,
                    "user": d["user"] if "user" in d else 'No user',
                }
            )

    if all_data_by_file is not None:
        result = all_data_by_file
    else:
        result = {"message": f"{file_name_by_id} has no results or pipeline results not published"}

    return jsonify(result), 201

