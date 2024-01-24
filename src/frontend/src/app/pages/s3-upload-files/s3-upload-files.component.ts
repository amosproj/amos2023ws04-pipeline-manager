import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AirflowService } from 'src/app/core/services/airflow/airflow.service';
import { DatapipelineRunService } from 'src/app/core/services/datapipeline-run/datapipeline-run.service';
import { FileService } from 'src/app/core/services/file/file.service';
import { S3FileUploadService } from 'src/app/core/services/s3-file-upload.service';

@Component({
  selector: 'app-s3-upload-files',
  templateUrl: './s3-upload-files.component.html',
  styleUrls: ['./s3-upload-files.component.scss']
})
export class S3UploadFilesComponent {
    startPipelineWithFile: boolean = false;
    public selectedFile!: File;
    public successMessage!: string;
    public errorMessage!: string;
    selectedFileName: string = 'File Name';
    public dags$: Observable<any>;
    public files$: Observable<any>;
    selectedDag: any;
    get_s3_uuid: any;

    constructor(private fileUploadService: S3FileUploadService,
      private dpRunService: DatapipelineRunService,
              private airflowService: AirflowService,
              private fileService: FileService) { }

    selectFile() {
      const fileInput: HTMLInputElement | null = document.querySelector('input[type="file"]');

      if (fileInput !== null) {
        fileInput.click();

        fileInput.addEventListener('change', () => {
          const selectedFile: File | undefined = fileInput.files?.[0];

          if (selectedFile !== undefined) {
            this.selectedFile = selectedFile;
            this.selectedFileName = selectedFile.name;
          }
        });
      }
  }


  uploadFileWithUrl() {
    if (!this.selectedFile) {
      return;
    }

    const formData = this.fileUploadService.getFormDataFromFile(this.selectedFile);

    this.fileUploadService.getPresignedUrl(this.selectedFile.name).subscribe(
      (response: { presignedUrl: string, fileName: string, s3_uuid: string}) => {
        const { presignedUrl, fileName, s3_uuid } = response;
        const get_s3_uuid = s3_uuid;

        this.uploadToPresignedUrl(presignedUrl, formData, fileName, s3_uuid, this.selectedFile.type);

        console.log(presignedUrl)
      },
      (error) => {
        console.error('Error getting presigned URL:', error);
      }
    );
  }



  private uploadToPresignedUrl(presignedUrl: string, formData: FormData, fileName: string, s3_uuid: string, mime_type: string): void {
    this.fileUploadService.uploadFileToS3Presigned(presignedUrl, formData).subscribe(
      (response) => {
        this.successMessage = 'File uploaded successfully!';
        this.createFileDetails(fileName, s3_uuid, mime_type)
        console.log(response);

      },
      (error) => {
        console.error('Error uploading file:', error);
      this.errorMessage = 'Error uploading file. Please try again.';

      }
    );
  }
  private createFileDetails(fileName: string, s3_uuid: string, mime_type: string): void {
    this.get_s3_uuid = s3_uuid
    this.fileUploadService.createFileDetails(fileName, s3_uuid, mime_type).subscribe(
      (response) =>{
        console.log(this.get_s3_uuid)
      },
      (error) => {
        console.error('Error storing file:', error);
      this.errorMessage = 'Error Storing file. Please try again.';

      })
  }

  ngOnInit(): void {
    this.dags$ = this.airflowService.getAllDags();
    }

  startPipeline() {
    if (this.selectedFile && this.selectedDag) {
      this.dpRunService.create({"datapipelineId": this.selectedDag.dag_id, "fileId": this.get_s3_uuid})
        .subscribe((value: any) => {
          const executionId = value?.object.executionId;
          console.log(executionId);
          console.log(this.get_s3_uuid);
          // TODO dont subscribe in a subscribe q_q but for now it can work
          this.dpRunService.startDatapipelineRun(executionId).subscribe();
        } );
    } else {
      throw Error("File and/or dag not selected.");
    }
  }

  changeDag(dag: any) {
    this.selectedDag = dag;
  }
}
