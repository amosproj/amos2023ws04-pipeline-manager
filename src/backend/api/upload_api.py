import os

from flask import request, render_template, redirect, url_for, send_file, Blueprint, jsonify
from werkzeug.utils import secure_filename
from database.mongo_repo import user, fileWPDB
from services.upload_to_s3 import upload_to_s3 , download_file, list_file
from services.filescript import process_csv
from database.models.fileWP import FileWP

upload_api = Blueprint("upload_api", __name__, template_folder="templates")
ALLOWED_EXTENSIONS = {'csv'}

@upload_api.route('/')
def index():
    return "Register/SignIn Page"


@upload_api.route('/upload', methods=['GET', 'POST'])
def upload():
    BUCKET_NAME = os.getenv('BUCKET_NAME')
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            new_filename = f'{filename.split(".")[0]}_get.csv'
            save_location = os.path.join('mainapp', new_filename)
            s3_key = 'uploads/' + file.filename

            rs_username = request.form['txtusername']
            inputEmail = request.form['inputEmail']

            filename = secure_filename(file.filename)
            user.insert_one({'name': rs_username, 'mail': inputEmail})
            file.save(save_location)
            upload_to_s3(save_location, BUCKET_NAME, s3_key)
            return jsonify({'message': 'File uploaded successfully'})
            output_file = process_csv(save_location)
            # return send_from_directory('output', output_file)
            return redirect(url_for('download'))

            # return redirect(url_for('download'))
            return 'uploaded'

    return render_template('upload.html')


@upload_api.route('/download')
def download():
    BUCKET_NAME = os.getenv('BUCKET_NAME')
    # List objects in the bucket
    try:

        objects = list_file(BUCKET_NAME)

        if objects:
            files = [obj['Key'] for obj in objects]
            return render_template('list.html', files=files)
        else:
            return "The bucket is empty."
    except Exception as e:
        return f"Error: {e}"


@upload_api.route('/download/<filename>')
def download_file_csv(filename):
    AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
    AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
    REGION = os.getenv('REGION')
    BUCKET_NAME = os.getenv('BUCKET_NAME')
    try:
        # Download the object from S3
        file = download_file(filename)

        response = send_file(file, as_attachment=True)
        print(response.headers)
        return response

        # Send the file for download
    except Exception as e:
        return f"Error: {e}"

@upload_api.route('/uploadcsv', methods=['POST'])
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
        return jsonify({'error': str(e)})

@upload_api.route('/ping',  methods=['POST'])
def ping():
    return jsonify({'message': 'Ping successfully'})

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
