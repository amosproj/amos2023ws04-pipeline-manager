import os
import boto3
from dotenv import load_dotenv

# from database.models.s3_detials_entity import S3ObjectDetails


# import upload_to_s3


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


def insert_one_s3file_metadata(collection, s3_key):
    s3file_metadata = s3_client.list_objects_v2(Bucket=BUCKET_NAME)
    s3file_metadata_contents = s3file_metadata.get("Contents", [])
    target_s3file_metadata = None
    for d in s3file_metadata_contents:
        if d["Key"] == s3_key:
            target_s3file_metadata = d
            response = collection.insert_one(target_s3file_metadata)
            break
    if target_s3file_metadata == None:
        return None

    return response


def remove_s3metadata(collection, key):
    metadata = collection.find_one({"Key": key})
    if metadata == None:
        return None
    else:
        result = collection.delete_one({"Key": key})
    return result
