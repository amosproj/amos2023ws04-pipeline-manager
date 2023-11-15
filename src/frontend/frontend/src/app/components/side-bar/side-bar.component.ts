import { Component } from '@angular/core';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
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
