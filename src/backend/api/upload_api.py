from flask import request, render_template, send_file, Blueprint, jsonify
from werkzeug.utils import secure_filename

from services.auth_service import secure
from services.upload_to_s3 import upload_to_s3, download_file, list_file, file_name_check, get_upload_rul


upload_api = Blueprint("upload_api", __name__, template_folder="templates")
ALLOWED_EXTENSIONS = {'csv'}

@upload_api.route('/upload_url', methods=['GET'])
@secure
def upload_url():
    return jsonify(get_upload_rul())

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
            return jsonify(objects)

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
