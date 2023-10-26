import boto3
path='./cars.csv'
s3 = boto3.client('s3')
s3.upload_file(path, 'dpsm-bucket', 'cars.csv')