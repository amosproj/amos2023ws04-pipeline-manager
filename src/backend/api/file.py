from flask import request, Blueprint, jsonify

from database.mongo_repo import fileDetailsDB
from services.auth_service import secure
from services.file_storage import (
    download_file,
    list_file,
    get_file_upload_url,
    delete_file,
)

from services.file_detail import insert_file_details
from services.s3_storage import s3_delete_file

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
        allData.append({'name': d['name'],
                        'mime_type': d['mime_type'],
                        'size': d['size'],
                        's3_uuid': d['s3_uuid'],
                        'content_type': d['content_type'],
                        'storage_class': d['storage_class'],
                        'last_modified': d['last_modified'],
                        'created_at': d['created_at']})


    return jsonify(allData), 201

@file.route('/file/new', methods=['POST'])
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


@file.route("/file/<file_name>", methods=['GET'])
@secure
def get_file(file_name):
    try:
        # TODO
        return jsonify({"message": "test message"})

        # Send the file for download
    except Exception as e:
        return f"Error: {e}"


@file.route("/file/<file_name>", methods=["DELETE"])
@secure
def delete_file(file_name):
    try:
        # delete s3 bucket file
        s3_delete_file(file_name)
        # delete file detail

        response = delete_file(file_name)
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


@file.route("/file/<file_name>/download", methods=['GET'])
@secure
def download_file(file_name):
    try:
        # Download the object from S3
        file = download_file(file_name)
        return jsonify(file)

        # Send the file for download
    except Exception as e:
        return f"Error: {e}"
