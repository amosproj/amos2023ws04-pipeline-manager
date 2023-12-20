import { Component } from '@angular/core';
import { S3FileUploadService } from 'src/app/core/services/s3-file-upload.service';

@Component({
  selector: 'app-s3-upload-files',
  templateUrl: './s3-upload-files.component.html',
  styleUrls: ['./s3-upload-files.component.scss']
})
export class S3UploadFilesComponent {
    private selectedFile!: File;
    public successMessage!: string;
    public errorMessage!: string;

    constructor(private fileUploadService: S3FileUploadService) { }

    selectFile() {
      const fileInput: HTMLInputElement | null = document.querySelector('input[type="file"]');

      if (fileInput !== null) {
        fileInput.click();

        fileInput.addEventListener('change', (event) => {
          const selectedFile: File | undefined = fileInput.files?.[0];

          if (selectedFile !== undefined) {
            this.selectedFile = selectedFile;
          }
        });
      }
    }


    uploadFile() {
      if (!this.selectedFile) {
        return;
      }

      const formData = this.fileUploadService.uploadCsv(this.selectedFile);

      this.fileUploadService.uploadFileToS3(formData).subscribe(
        response => {
          this.successMessage = 'File uploaded successfully!';
          console.log(response);
        },
        error => {
          console.error('Error uploading file:', error);
        }
      );
    }




  uploadFileWithUrl() {
    if (!this.selectedFile) {
      return;
    }

    const formData = this.fileUploadService.uploadCsv(this.selectedFile);

    this.fileUploadService.getPresignedUrl(this.selectedFile.name).subscribe(
      (response: { presignedUrl: string, fileName: string }) => {
        const { presignedUrl, fileName } = response;
        this.uploadToPresignedUrl(presignedUrl, formData, fileName);
        console.log(presignedUrl)
      },
      (error) => {
        console.error('Error getting presigned URL:', error);
      }
    );
  }

  private uploadToPresignedUrl(presignedUrl: string, formData: FormData, fileName: string): void {
    this.fileUploadService.uploadFileToS3Presigned(presignedUrl, formData).subscribe(
      (response) => {
        this.successMessage = 'File uploaded successfully!';
        this.store_file_data(fileName)
        console.log(response);

      },
      (error) => {
        console.error('Error uploading file:', error);
      this.errorMessage = 'Error uploading file. Please try again.';

      }
    );
  }
  private store_file_data(fileName: string): void {
    this.fileUploadService.storeFileDetails(fileName).subscribe(
      (response) =>{
      },
      (error) => {
        console.error('Error storing file:', error);
      this.errorMessage = 'Error Storing file. Please try again.';

      })
  }
}



