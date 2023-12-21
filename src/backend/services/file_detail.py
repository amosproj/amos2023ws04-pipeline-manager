import os
import boto3
from dotenv import load_dotenv
from services.file_storage import get_file_details
from database.mongo_repo import s3filename, fileDetailsDB

load_dotenv()

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
REGION = os.getenv("REGION")
BUCKET_NAME = os.getenv("BUCKET_NAME")
s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=REGION,
)


def insert_all_s3files_metadata(collection):
    s3file_metadata = s3_client.list_objects_v2(Bucket=BUCKET_NAME)
    s3file_metadata_contents = s3file_metadata.get("Contents", [])
    response = collection.insert_many(s3file_metadata_contents)
    return response


def insert_file_details(file_name, s3_uuid, mime_type):
    new_file_details = get_file_details(file_name, s3_uuid, mime_type)
    response = fileDetailsDB.insert_one(new_file_details)

    return response


def remove_s3metadata(collection, key):
    metadata = collection.find_one({"Key": key})
    if metadata == None:
        return None
    else:
        result = collection.delete_one({"Key": key})
    return result
