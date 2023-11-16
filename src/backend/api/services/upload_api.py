import os

from flask import request, render_template, redirect, url_for, send_from_directory, Blueprint, jsonify
from werkzeug.utils import secure_filename
from database.mongo_repo import user, fileWPDB
from api.services.upload_to_s3 import upload_to_s3


#import sys
#sys.path.append('E:\Amos Backend\amos2023ws04-pipeline-manager\src')
from api.services.filescript import process_csv
from models.fileWP import FileWP

# import sys
# sys.path.append('E:\Amos Backend\amos2023ws04-pipeline-manager\src')

upload_api = Blueprint("user_api", __name__, template_folder="templates")
ALLOWED_EXTENSIONS = {'csv'}

# If working on a mac, set your PWD (path to working directory) in your .env file
# For example: /Users/ingunn/amos2023ws04-pipeline-manager/src
# PWD = os.getenv('PWD')
# if (PWD):
#     os.chdir(str(PWD))

#path='/backend/apis/api_service/cars.csv'

@upload_api.route('/')
def index():
    return "Register/SignIn Page"


@upload_api.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            new_filename = f'{filename.split(".")[0]}_get.csv'
            save_location = os.path.join('mainapp', new_filename)

            rs_username = request.form['txtusername']
            inputEmail = request.form['inputEmail']

            filename = secure_filename(file.filename)
            user.insert_one({'name': rs_username, 'mail': inputEmail})
            file.save(save_location)

            output_file = process_csv(save_location)
            # return send_from_directory('output', output_file)
            return redirect(url_for('download'))

            # return redirect(url_for('download'))
            return 'uploaded'

    return render_template('upload.html')


@upload_api.route('/download')
def download():
    return render_template('download.html', files=os.listdir('mainapp'))


@upload_api.route('/download/<filename>')
def download_file(filename):
    return send_from_directory('mainapp', filename)

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
    print("hello there")
    return render_template('index.html')

@upload_api.route('/do_something',  methods=['POST'])
def do_something():
    testProj = FileWP("123", None)
    fileWPDB.insert_one(testProj.to_json())
    print('after insert')
    all_projects = fileWPDB.find()

    for p in all_projects:
        print(p)

    return render_template('index.html')


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
