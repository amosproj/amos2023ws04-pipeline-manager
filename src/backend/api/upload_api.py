import os

from flask import request, render_template, redirect, url_for, send_file, Blueprint, jsonify
from werkzeug.utils import secure_filename
from database.mongo_repo import user, fileWPDB
from services.upload_to_s3 import upload_to_s3, download_file, list_file, file_name_check
from database.models.fileWP import FileWP
from flask_restx import Api, Resource

upload_api = Blueprint("upload_api", __name__, template_folder="templates")
api = Api(upload_api)
ALLOWED_EXTENSIONS = {'csv'}

# If working on a mac, set your PWD (path to working directory) in your .env file
# For example: /Users/ingunn/amos2023ws04-pipeline-manager/src
PWD = os.getenv('PWD')
if PWD:
    os.chdir(str(PWD))


# path='/backend/apis/api_service/cars.csv'

@upload_api.route('/')
def index():
    return "Register/SignIn Page"


@upload_api.route('/upload', methods=['GET', 'POST'])
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
                new_filename = f'{filename.split(".")[0]}_get.csv'
                s3_key = file.filename

                rs_username = request.form['username']
                input_email = request.form['inputEmail']

                # user.insert_one({'name': rs_username, 'mail': input_email})
                upload_to_s3(file, file.filename)
                return jsonify({'message': 'File uploaded successfully'})

    # return render_template('upload.html')


@upload_api.route('/download')
def download():
    # List objects in the bucket
    try:

        objects = list_file()

        if objects:
            files = [obj['Key'] for obj in objects]
            return render_template('list.html', files=files)
        else:
            return "The bucket is empty."
    except Exception as e:
        return f"Error: {e}"


@upload_api.route('/download/<filename>')
def download_file_csv(filename):
    try:
        # Download the object from S3
        file = download_file(filename)

        response = send_file(file, as_attachment=True)
        print(response.headers)
        return response

        # Send the file for download
    except Exception as e:
        return f"Error: {e}"


'''@upload_api.route('/uploadcsv', methods=['POST'])
def uploadcsv():
    BUCKET_NAME = os.getenv('BUCKET_NAME')

    try:
        # Check if the file part is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        # Check if the file is uploaded
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        # Save the file to a temporary location
        temp_file_path = '/tmp/' + file.filename
        file.save(temp_file_path)

        # Upload the file to AWS S3
        s3_key = 'uploads/' + file.filename  # S3 object key (adjust as needed)
        if upload_to_s3(temp_file_path, BUCKET_NAME, s3_key):
            return jsonify({'message': 'File uploaded successfully'})
        else:
            return jsonify({'error': 'Failed to upload file to AWS S3'})

    except Exception as e:
        return jsonify({'error': str(e)})'''


@upload_api.route('/ping', methods=['POST'])
def ping():
    return jsonify({'message': 'Ping successfully'})


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
