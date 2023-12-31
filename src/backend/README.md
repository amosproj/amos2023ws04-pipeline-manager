
## Backend

### Installing dependencies with pipenv

Navigate to the backend directory. Run pipenv install to install dependencies. To add dependencies, simply type

```pipenv install <package_name>```

This will update the Pipfile and Pipfile.lock automatically.

### Environment variables

You need the following environment variables in a .env file.

FLASK_APP - for flask run to find your app.py
AWS_ACCESS_KEY -  you can generate a keypair in the aws console
AWS_SECRET_KEY - you can generate a keypair in the aws console
REGION - aws region that the bucket is in
BUCKET_NAME - name of the s3 bucket
PWD - path to working directory, used if you are working on a mac. Please see in the "upload_api.py" file where the env variable is imported. If working on a windows computer, use the append to system path command above in the same file.

### Running the API

Navigate to the src directory. In your terminal, type:

```
flask run
```

## Dependencies

boto3
python-dotenv
pymongo
