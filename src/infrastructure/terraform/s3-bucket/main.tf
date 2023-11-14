resource "aws_s3_bucket" "dpsm-bucket" {
  bucket = "dpsm-bucket"

  tags = {
    Name        = "dpsm-bucket"
    Environment = "Dev"
  }
}