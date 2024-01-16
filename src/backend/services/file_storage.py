import string
import random
import uuid

from botocore.exceptions import NoCredentialsError

from database.models.file_details import FileDetails
import humanfriendly

from services.s3_storage import (
    s3_generate_presigned_url,
    s3_get_head_object,
    s3_get_download_url,
    s3_list_objects,
    s3_delete_file,
)


def generated_key_check(file_name):
    if file_name_check(file_name):
        get_name = file_name.split("_")
        key = "".join(
            random.choice(
                string.ascii_uppercase + string.ascii_lowercase + string.digits
            )
            for _ in range(10)
        )
        file_name = str(key) + "_" + get_name[1]
        generated_key_check(file_name)
        return file_name
    else:
        return file_name


def get_file_upload_url(file_name):
    try:
        s3_uuid = str(uuid.uuid4())
        url = s3_generate_presigned_url(s3_uuid)
        response_data = {"presignedUrl": url, "fileName": file_name, "s3_uuid": s3_uuid}

        return response_data
    except Exception as e:
        print(f"Error: {e}")
        # TODO error


# TODO test this
def get_file_details(file_name, s3_uuid, mime_type):
    # Get details of a specific file
    try:
        response = s3_get_head_object(s3_uuid)

        new_file_details = FileDetails(
            name=file_name,
            # TODO add mime type to maybe remove duplicate
            mime_type=mime_type,
            s3_uuid=s3_uuid,
            last_modified=response["LastModified"],
            size=humanfriendly.format_size(response["ContentLength"]),
            content_type=response["ContentType"],
            storage_class="dummy storage class",
            user_name="user1",
        )
        return new_file_details.to_json()

    except Exception as e:
        print(f"Error: {e}")


def download_file(file_name):
    try:
        try:
            url = s3_get_download_url(file_name)
            return {"download_url": url}

        except NoCredentialsError:
            return {"error": "AWS credentials not available or incorrect."}

    except Exception as e:
        print(f"Error: {e}")


def list_file():
    try:
        response = s3_list_objects()
        objects = response.get("Contents", [])
        for size in objects:
            size["Size"] = humanfriendly.format_size(size["Size"])
        print("s3 connected")
        return objects
    except Exception as e:
        print(f"Error: {e}")


def file_name_check(file_name):
    try:
        # HeadObject returns metadata for an object
        obj = s3_get_head_object(file_name)
        if obj:
            return True  # File exists
        return False

    except Exception as e:
        print(f"Error: {e}")
        return False


def delete_file(file_name):
    try:
        if file_name_check(file_name):
            s3_delete_file(file_name)
            return ["File is deleted seccessfuly"]
        else:
            return [{"Error": "File not exist"}]
    except Exception as e:
        return [{f"Error: {e}"}]


ALLOWED_EXTENSIONS = {"csv"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
