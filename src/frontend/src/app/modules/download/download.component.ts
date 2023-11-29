import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RestApiService } from 'src/app/core/services/restApi/rest-api.service'



@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  uploadedFiles: string[] = [];
  downloadheader: any;

  constructor(private restapiservice: RestApiService) { }

  downloadCsv(): void {
    this.restapiservice.download();
  }
  // dtoptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    // this.dtoptions = {
    //   pagingType : "full_numbers"
    // };
    // this.getUploadedFiles();
  }
  // downloadFile() {
  //   this.restapiservice.downloadFile('my-csv-file.csv').subscribe(response => {
  //     const blob = new Blob([response], { type: 'text/csv' });
  //     const url = window.URL.createObjectURL(blob);
  //     window.open(url);
  //   });
  // }
  // getUploadedFiles(): void {
  //   this.restapiservice.getUploadedFiles().subscribe(files => {
  //     this.uploadedFiles = files;
  //     this.dtTrigger.next(null);
  //   });
  // }
  // downloadFile(fileName: string): void {
  // this.restapiservice.downloadFile(fileName).subscribe(data => {
  //   const blob = new Blob([data]);
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = fileName;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   window.URL.revokeObjectURL(url);
  // });

  // LoadInvoice() {
  //   this.service.GetAllInvoice().subscribe(res => {
  //     this.Invoiceheader = res;
  //     this.dtTrigger.next(null);
  //   });
  // }

}

