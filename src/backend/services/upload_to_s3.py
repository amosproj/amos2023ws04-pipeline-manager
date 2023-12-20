import string
import random
import uuid
import boto3
from dotenv import load_dotenv
from botocore.exceptions import NoCredentialsError
import os
from database.models.s3_detials_entity import S3ObjectDetails
from io import BytesIO
import humanfriendly

# AWS S3 configuration
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
REGION = os.getenv("REGION")
BUCKET_NAME = os.getenv("BUCKET_NAME")


# Function to upload a file to AWS S3
def upload_to_s3(path, s3_key):
    load_dotenv()

    try:
        s3 = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=REGION,
        )
        s3.upload_fileobj(path, BUCKET_NAME, s3_key)
        # file_data = get_file_details(path, BUCKET_NAME, s3_key)
        return "file_data"
    except FileNotFoundError:
        return False
    except NoCredentialsError:
        return False


def generated_key_check(file_name):
    if file_name_check(file_name):
        get_name = file_name.split("_")
        key = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))
        file_name = str(key) + "_" + get_name[1]
        generated_key_check(file_name)
        return file_name
    else:
        return file_name


def get_upload_url(file_name):
    try:
        key = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))
        file_name = generated_key_check(str(key) + "_" + file_name)
        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY,
                          region_name=REGION)
        url = s3.generate_presigned_url('put_object', Params={'Bucket': BUCKET_NAME, 'Key': file_name}, ExpiresIn=3600)
        response_data = {'presignedUrl': url, 'fileName': file_name}
        return response_data
    except Exception as e:
        print(f"Error: {e}")


# TODO test this
def get_file_details(s3_key):
    # Get details of a specific file
    try:
        s3 = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=REGION,
        )
        response = s3.head_object(Bucket=bucket_name, Key=s3_key)

        # Print details
        return S3ObjectDetails(
            key=response["Metadata"]["Key"],
            last_modified=response["LastModified"],
            size=response["ContentLength"],
            content_type=response["ContentType"],
            etag=response["ETag"],
            storage_class=response["StorageClass"],
        )
        print(res.to_dict())

        # Print details

        return res.to_dict()
    except Exception as e:
        print(f"Error: {e}")


def download_file(file_name):
    try:
        try:
            s3 = boto3.client(
                "s3",
                aws_access_key_id=AWS_ACCESS_KEY,
                aws_secret_access_key=AWS_SECRET_KEY,
                region_name=REGION,
            )

            url = s3.generate_presigned_url(
                "get_object",
                Params={"Bucket": BUCKET_NAME, "Key": file_name},
                ExpiresIn=3600,
            )
            return {"download_url": url}

        except NoCredentialsError:
            return {"error": "AWS credentials not available or incorrect."}

    except Exception as e:
        print(f"Error: {e}")


def list_file():
    try:
        s3 = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=REGION,
        )
        response = s3.list_objects(Bucket=BUCKET_NAME)
        objects = response.get("Contents", [])
        for size in objects:
            size["Size"] = humanfriendly.format_size(size["Size"])
        print("s3 connected")
        return objects
    except Exception as e:
        print(f"Error: {e}")


def file_name_check(file_name):
    try:
        s3 = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=REGION,
        )
        # HeadObject returns metadata for an object
        s3.head_object(Bucket=BUCKET_NAME, Key=file_name)
        return True  # File exists

    except Exception as e:
        print(f"Error: {e}")
        return False


def delete_s3file(file_name):
    try:
        if file_name_check(file_name):
            s3 = boto3.client(
                "s3",
                aws_access_key_id=AWS_ACCESS_KEY,
                aws_secret_access_key=AWS_SECRET_KEY,
                region_name=REGION,
            )
            s3.delete_object(Bucket=BUCKET_NAME, Key=file_name)
            return ["File is deleted seccessfuly"]
        else:
            return [{"Error": "File not exist"}]
    except Exception as e:
        return [{f"Error: {e}"}]
