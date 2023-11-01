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


### Uploading data to S3 bucket

Once an S3 bucket exists in AWS, you can upload files to it using the existing python library called boto. 
https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html


## Dependencies

boto3