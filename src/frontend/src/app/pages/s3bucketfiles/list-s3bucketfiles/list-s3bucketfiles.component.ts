import { Component,OnInit} from '@angular/core';
import { RestApiService } from 'src/app/core/services/restApi/rest-api.service';


@Component({
  selector: 'app-list-s3bucketfiles',
  templateUrl: './list-s3bucketfiles.component.html',
  styleUrls: ['./list-s3bucketfiles.component.scss'],

})
export class ListS3bucketfilesComponent implements OnInit {
  private selectedFile: File | null = null;
  uploadedFiles: string[] = [];
  downloadheader: any;
  constructor( private restapi: RestApiService) {
  }
  ngOnInit(): void { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadCsv(): void {
    if (this.selectedFile) {
      this.restapi.uploadCsvFile(this.selectedFile)
        .then(() => console.log('File uploaded successfully'))
        .catch(error => console.error('Error uploading file', error));
    } else {
      console.error('No file selected');
    }
  }

  downloadCsv(): void {
      this.restapi.downloadCsvFile();
  }

}
    







