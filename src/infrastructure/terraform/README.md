# Postponed
## Infrastructure

Prerequisites: 
- Being connected to an AWS account with the awscli installed.
- Make sure the terraform is installed 

To create any infrastructure resources, you can navigate to the related directory, for example infrastructure/terraform/eks-cluster and execute the following commands:

```
terraform init # only for the first time 
terraform plan
terraform apply
```

This will create the resource (in this case, an EKS cluster) in AWS, you can navigate to the console to check for it. 
