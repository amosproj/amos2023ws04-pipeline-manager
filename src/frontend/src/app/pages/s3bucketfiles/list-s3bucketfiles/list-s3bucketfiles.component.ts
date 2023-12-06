import { Component,OnInit} from '@angular/core';
import { RestApiService } from 'src/app/core/services/restApi/rest-api.service';
import {FileService} from "../../../core/services/file/file.service";
import {BehaviorSubject, Observable} from "rxjs";
import {s3PresignedUploadInfo} from "../../../entity/s3";


@Component({
  selector: 'app-list-s3bucketfiles',
  templateUrl: './list-s3bucketfiles.component.html',
  styleUrls: ['./list-s3bucketfiles.component.scss'],

})
export class ListS3bucketfilesComponent implements OnInit {
  private selectedFile: File | null = null;
  uploadedFiles: string[] = [];
  downloadheader: any;
  public fileDownload: Observable<any>;
  public upload_url_info : s3PresignedUploadInfo | null = null;
  constructor( private restapi: RestApiService, private fileService: FileService) {

    this.fileDownload = this.fileService.download();
    this.fileService.get_upload_url().subscribe((value) => this.upload_url_info = value);

  }
  ngOnInit(): void { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    if (this.selectedFile) {
      this.restapi.uploadCsvFile(this.selectedFile)
        .then(() => console.log('File uploaded successfully'))
        .catch(error => console.error('Error uploading file', error));
    } else {
      console.error('No file selected');
    }
  }

  handleDownload(id: string) {
    // TODO bad subscibe as the subscription is not ending here,
    this.fileService.downloadById(id).subscribe((value: any) =>
    {
      if (value.download_url){
        window.open(value.download_url)
      }
    }
  );
  }


  upload_file_to_url(file: any) {
    if (this.upload_url_info) {
      this.fileService.upload_file_to_url(this.upload_url_info, file);
    }
  }
}








