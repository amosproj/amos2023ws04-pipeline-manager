import os

import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
from flask import jsonify, request

load_dotenv()

# AWS S3 configuration
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
REGION = os.getenv("REGION")
BUCKET_NAME = os.getenv("BUCKET_NAME")

def get_s3_client():
    s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY,
                      region_name=REGION)
    return s3

def s3_generate_presigned_url(file_name):
    s3 = get_s3_client()
    url = s3.generate_presigned_url('put_object', Params={'Bucket': BUCKET_NAME, 'Key': file_name}, ExpiresIn=3600)
    return url

def s3_get_head_object(file_name):
    s3 = get_s3_client()
    response = s3.head_object(Bucket=BUCKET_NAME, Key=file_name)
    # TODO error handling
    return response

def s3_get_download_url(file_name):
    s3 = get_s3_client()

    url = s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": BUCKET_NAME, "Key": file_name},
        ExpiresIn=3600,
    )
    return url

def s3_list_objects():
    s3 = get_s3_client()
    response = s3.list_objects(Bucket=BUCKET_NAME)
    return response

def s3_delete_file(file_name):
    s3 = get_s3_client()
    s3.delete_object(Bucket=BUCKET_NAME, Key=file_name)



# Function to upload a file to AWS S3
def upload_to_s3(path, s3_key):
    try:
        s3 = get_s3_client()
        s3.upload_fileobj(path, BUCKET_NAME, s3_key)
        return "file_data"
    except FileNotFoundError:
        return False
    except NoCredentialsError:
        return False

# Route to dynamically search for files based on a partial keyword
def search_files(key):
    partial_keyword = request.args.get('partial_keyword', '')

    # Search for files in MongoDB based on the partial keyword
    results = ""#s3filename.find({"filename": {"$regex": partial_keyword, "$options": "i"}}).limit(10)

    # Convert MongoDB Cursor to list of dictionaries
    files = list(results)

    return jsonify({"files": files})
