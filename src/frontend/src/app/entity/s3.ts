
export interface s3PresignedUploadInfo {
  "fields": {
    "key": string,
    "policy": string,
    "x-amz-algorithm": string,
    "x-amz-credential": string,
    "x-amz-date": Date,
    "x-amz-signature": string,
  },
  "url": string,
}
