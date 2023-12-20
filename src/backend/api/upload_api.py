from flask import request, render_template, send_file, Blueprint, jsonify
from werkzeug.utils import secure_filename

from services.auth_service import secure
from services.upload_to_s3 import upload_to_s3, download_file, list_file, file_name_check, get_upload_url
from services.store_s3metadata import insert_one_s3file_metadata

from services.upload_to_s3 import upload_to_s3, download_file, list_file, file_name_check, get_upload_url
from services.store_s3metadata import insert_one_s3file_metadata

upload_api = Blueprint("upload_api", __name__, template_folder="templates")
ALLOWED_EXTENSIONS = {'csv'}


@upload_api.route('/upload_url', methods=['GET'])
@secure
def upload_url():
    file_name = request.args.get('fileName')
    if file_name:
        return jsonify(get_upload_url(file_name))


@upload_api.route('/upload', methods=['GET', 'POST'])
@secure
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})
        file = request.files['file']
        if file_name_check(file.filename):
            print(f"File '{file.filename}' already exists in the bucket. Choose appropriate action.")
            return jsonify(
                {'message': f"File '{file.filename}' already exists in the bucket. Choose appropriate action."})
        else:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                upload_to_s3(file, filename)
                return jsonify({'message': 'File uploaded successfully'})

    return render_template('upload.html')


@upload_api.route('/download')
@secure
def download():
    # List objects in the bucket
    try:
        objects = list_file()
        if objects:
            files = [obj['Key'] for obj in objects]
            # return render_template('list.html', files=files)
            return jsonify({"files": files})
        else:
            return "The bucket is empty."

    except Exception as e:
        return jsonify({f"Error: {e}"})


@upload_api.route('/download/<filename>')
@secure
def download_file_csv(filename):
    try:
        # Download the object from S3
        file = download_file(filename)
        return jsonify(file)

        # Send the file for download
    except Exception as e:
        return f"Error: {e}"


@upload_api.route('/ping', methods=['POST'])
def ping():
    return jsonify({'message': 'Ping successfully'})


@upload_api.route('/store_file_data', methods=['GET'])
@secure
def store_file_data():
    file_name = request.args.get('fileName')
    print(file_name)
    insert_one_s3file_metadata(file_name)

    if file_name:
        return jsonify({'message': 'Saved successfully'})


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
