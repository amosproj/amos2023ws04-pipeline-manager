# Technology Wiki 

## Infrastructure

Prerequisites: 
- Being connected to an AWS account with the awscli installed. 

To create any infrastructure resources, you can navigate to the related directory, for example infrastructure/terraform/eks-cluster and type 

```
terraform init
terraform plan
terraform apply
```

This will create the resource (in this case, an EKS cluster) in AWS, you can navigate to the console to check for it. 

## Backend

### Installing dependencies with pipenv

Navigate to the backend directory. Run pipenv install to install dependencies. To add dependencies, simply type

```pipenv install <package_name>```

This will update the Pipfile and Pipfile.lock automatically. If you update the Pipfile manually, you can use

```
pipenv lock
```
to update your Pipfile.lock

### Environment variables

You need the following environment variables to be accessible. For example you can export their value in the terminal, ie:

```
export AWS_ACCESS_KEY=my-access-key
```

FLASK_APP - for flask run to find your app.py
AWS_ACCESS_KEY -  you can generate a keypair in the aws console
AWS_SECRET_KEY - you can generate a keypair in the aws console
REGION - aws region that the bucket is in
BUCKET_NAME - name of the s3 bucket
PWD - path to working directory, used if you are working on a mac. Please see in the "upload_api.py" file where the env variable is imported. If working on a windows computer, use the append to system path command above in the same file.

### Running the API

Navigate to the src directory. In your terminal, run the following to start the api:

```
python3 app.py
```

## Dependencies

boto3
python-dotenv
pymongo
