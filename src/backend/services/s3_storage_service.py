from flask import Flask, jsonify, request

from database.models.s3_detials_entity import S3FileName
from database.mongo_repo import s3filename

# Route to dynamically search for files based on a partial keyword
def search_files(key):
    partial_keyword = request.args.get('partial_keyword', '')

    # Search for files in MongoDB based on the partial keyword
    results = ""#s3filename.find({"filename": {"$regex": partial_keyword, "$options": "i"}}).limit(10)

    # Convert MongoDB Cursor to list of dictionaries
    files = list(results)

    return jsonify({"files": files})
