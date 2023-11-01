resource "aws_s3_bucket" "example" {
  bucket = "dpsm-bucket"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}