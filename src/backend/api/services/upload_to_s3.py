import boto3
from dotenv import load_dotenv
from botocore.exceptions import NoCredentialsError
import os
from models.s3_detials_entity.py import S3ObjectDetails
from io import BytesIO

# AWS S3 configuration
AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
REGION = os.getenv('REGION')
BUCKET_NAME = ""


def upload_file(path, bucket_name, s3_key):
    s3 = boto3.client('s3')
    s3.upload_file(path, bucket_name, s3_key)


# Function to upload a file to AWS S3
def upload_to_s3(path, bucket_name, s3_key):
    load_dotenv()
    # AWS S3 configuration
    AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
    AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
    REGION = os.getenv('REGION')

    try:
        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY,
                          region_name=REGION)
        s3.upload_file(path, bucket_name, s3_key)
        file_data = get_file_details(path, bucket_name, s3_key)
        s3.list_objects_v2(Bucket=bucket_name)
        return file_data
    except FileNotFoundError:
        return False
    except NoCredentialsError:
        return False


def get_file_details(path, bucket_name, s3_key):
    # Get details of a specific file
    global s3_file_data
    try:
        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY,
                          region_name=REGION)
        response = s3.head_object(Bucket=bucket_name, Key=s3_key)

        # Print details
        return S3ObjectDetails(
            key=response['Metadata']['Key'],
            last_modified=response['LastModified'],
            size=response['ContentLength'],
            content_type=response['ContentType'],
            etag=response['ETag'],
            storage_class=response['StorageClass']
        )
    except Exception as e:
        print(f"Error: {e}")


def download_file(file_name):
    try:
        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY,
                          region_name=REGION)
        path = os.path.join('s3files', file_name)
        print("Starting download...")
        file_content = s3.download_file(BUCKET_NAME, file_name, path)
        print("Download completed.")

        file_stream = BytesIO(file_content)
        return file_stream
    except Exception as e:
        print(f"Error: {e}")


def list_file(bucket):
    try:
        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY,
                          region_name=REGION)
        response = s3.list_objects(Bucket=bucket)
        objects = response.get('Contents', [])

        return objects
    except Exception as e:
        print(f"Error: {e}")
