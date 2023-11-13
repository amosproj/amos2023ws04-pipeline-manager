import boto3
from dotenv import load_dotenv
from botocore.exceptions import NoCredentialsError
import os

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
        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY, region_name=REGION)
        s3.upload_file(path, bucket_name, s3_key)
        return True
    except FileNotFoundError:
        return False
    except NoCredentialsError:
        return False