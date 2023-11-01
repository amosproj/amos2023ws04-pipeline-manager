import os

from flask import Flask, request, render_template, redirect, url_for, send_from_directory
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from datetime import datetime
from filescript import process_csv

ALLOWED_EXTENSIONS = set(['csv'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def create_app():
    app = Flask(__name__)
    client = MongoClient('localhost', 27017)

    db = client.initial
    user = db.user
    @app.route('/')
    def index():
        return render_template("index.html")

    @app.route('/upload', methods=['GET', 'POST'])
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
                user.insert({'name': rs_username, 'mail': inputEmail})
                file.save(save_location)
                
                output_file = process_csv(save_location)
                #return send_from_directory('output', output_file)
                return redirect(url_for('download'))
                
                #return redirect(url_for('download'))
                return 'uploaded'

        return render_template('upload.html')
    @app.route('/download')
    def download():
        return render_template('download.html', files=os.listdir('mainapp'))

    @app.route('/download/<filename>')
    def download_file(filename):
        return send_from_directory('mainapp', filename)

    return app