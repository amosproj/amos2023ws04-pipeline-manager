import os

from flask import request, render_template, redirect, url_for, send_from_directory, Blueprint
from werkzeug.utils import secure_filename
from .repository.mongo_repo import user
from .api_service.filescript import process_csv

# import sys
# sys.path.append('E:\Amos Backend\amos2023ws04-pipeline-manager\src')

upload_api = Blueprint("user_api", __name__, template_folder="templates")
ALLOWED_EXTENSIONS = {'csv'}


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


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
