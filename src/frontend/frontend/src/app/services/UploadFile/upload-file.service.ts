import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  selectedFile: File | null = null;
  constructor() { }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const bucketName = environment.bucketName;
    const region = environment.region;
    const accessKeyId = environment.accessKeyId;
    const secretAccessKey = environment.secretAccessKey;
    const a = environment.secretAccessKey

    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey
    });

    const s3 = new S3();

    const params = {
      Bucket: bucketName,
      Key: this.selectedFile.name,
      Body: this.selectedFile
    };

    s3.upload(params, (err: any, data: any) => {
      if (err) {
        console.error('Error uploading file:', err);
      } else {
        console.log('File uploaded successfully. S3 Location:', data);
      }
    });
  }
}
