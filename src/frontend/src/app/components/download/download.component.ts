import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/restApi/rest-api.service'

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  uploadedFiles: string[] = [];

  constructor(private restapiservice: RestApiService) {}

  ngOnInit(): void {
    this.getUploadedFiles();
  }
  getUploadedFiles(): void {
    this.restapiservice.getUploadedFiles().subscribe(files => {
      this.uploadedFiles = files;
    });
  }
  downloadFile(fileName: string): void {
  this.restapiservice.downloadFile(fileName).subscribe(data => {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  });
}

}
