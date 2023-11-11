import { Component } from '@angular/core';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  constructor(private uploadService: UploadFileService) {
  }
  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    this.uploadService.onFileSelected(event)
  }

  uploadFile(): void {
   this.uploadService.uploadFile()
  }
  showNotification() {
    alert("done")
  }

}
