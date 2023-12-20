import os
import boto3
from dotenv import load_dotenv
from services.upload_to_s3 import get_file_details
from database.mongo_repo import s3filename

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


def insert_one_s3file_metadata(s3_key):
    s3file_metadata = get_file_details(s3_key)
    print(get_file_details(s3_key))
    response = s3filename.insert_one(s3file_metadata)

    return response


def remove_s3metadata(collection, key):
    metadata = collection.find_one({"Key": key})
    if metadata == None:
        return None
    else:
        result = collection.delete_one({"Key": key})
    return result
