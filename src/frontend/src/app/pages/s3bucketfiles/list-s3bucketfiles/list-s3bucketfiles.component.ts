import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { RestApiService } from 'src/app/core/services/restApi/rest-api.service';
import {FileService} from "../../../core/services/file/file.service";
import {Subject, Observable, Subscription} from "rxjs";
import { s3PresignedUploadInfo } from "../../../entity/s3";
import { MaterialMoudule } from 'src/material-moudule';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Filelist } from 'src/app/model/filelist';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-list-s3bucketfiles',
  templateUrl: './list-s3bucketfiles.component.html',
  styleUrls: ['./list-s3bucketfiles.component.scss'],
})

export class ListS3bucketfilesComponent implements OnInit,OnDestroy,MaterialMoudule {
  private selectedFile: File | null = null;
  uploadedFiles: string[] = [];
  downloadheader: any;
  public fileDownload = new MatTableDataSource<Filelist>();
  public temp: any;
  public upload_url_info: s3PresignedUploadInfo | null = null;

  nameFilter = new FormControl('');
  fileTypeFilter = new FormControl('');
  lastModifiedFilter = new FormControl('');
  sizeFilter = new FormControl('');
  storageClassFilter = new FormControl('');
  s3UuidFilter = new FormControl('');
  userFilter = new FormControl('');

  filterValues = {
    name: '',
    mime_type: '',
    last_modified: '',
    size: '',
    storage_class: '',
    s3_uuid: '',
    user: '',
  }


  dtOptions: DataTables.Settings = {
    pagingType:"full_numbers"
  };
  dtTrigger: Subject<any> = new Subject<any>();
  public filesSubscription: Subscription;
  private downloadSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private restapi: RestApiService, private fileService: FileService) {
    
  }
  displayedColumns: string[] = ['name', 'mime_type', 'last_modified','size','storage_class','s3_uuid','user','action'];

  ngOnInit(): void {
    this.getAll();
    this.fileService.get_upload_url().subscribe((value) => this.upload_url_info = value);

   
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = String(name);
          this.fileDownload.filter = JSON.stringify(this.filterValues);
        }
      )
    this.fileTypeFilter.valueChanges
      .subscribe(
        mime_type => {
          this.filterValues.mime_type = String(mime_type);
          this.fileDownload.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lastModifiedFilter.valueChanges
      .subscribe(
        last_modified => {
          this.filterValues.last_modified = String(last_modified);
          this.fileDownload.filter = JSON.stringify(this.filterValues);
        }
      )
    this.sizeFilter.valueChanges
      .subscribe(
        size => {
          this.filterValues.size = String(size);
          this.fileDownload.filter = JSON.stringify(this.filterValues);
        }
    )
    this.storageClassFilter.valueChanges
      .subscribe(
        storage_class => {
          this.filterValues.storage_class = String(storage_class);
          this.fileDownload.filter = JSON.stringify(this.filterValues);
        }
    )
    this.s3UuidFilter.valueChanges
      .subscribe(
        s3_uuid => {
          this.filterValues.s3_uuid = String(s3_uuid);
          this.fileDownload.filter = JSON.stringify(this.filterValues);
        }
    )
    this.userFilter.valueChanges
      .subscribe(
        user => {
          this.filterValues.user = String(user);
          this.fileDownload.filter = JSON.stringify(this.filterValues);
        }
      )
 

  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: { name: string; mime_type: { toString: () => string; }; last_modified: string; size: string; storage_class: string; s3_uuid: string; user: string; }, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.mime_type.toString().toLowerCase().indexOf(searchTerms.mime_type) !== -1
        && data.last_modified.toLowerCase().indexOf(searchTerms.last_modified) !== -1
        && data.size.toLowerCase().indexOf(searchTerms.size) !== -1
        && data.storage_class.toLowerCase().indexOf(searchTerms.storage_class) !== -1
        && data.s3_uuid.toLowerCase().indexOf(searchTerms.s3_uuid) !== -1
        && data.user.toLowerCase().indexOf(searchTerms.user) !== -1;
    }
    return filterFunction;
  }





// ---------------------------------------------------------------------







  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if (this.filesSubscription) {
      this.filesSubscription.unsubscribe();
    }
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }
  }

  getAll() { 
    this.filesSubscription = this.fileService.getAll().subscribe((res:Filelist[]) => {
      this.temp = res;
      this.fileDownload= new MatTableDataSource<Filelist>(this.temp);
      this.fileDownload.paginator = this.paginator;
      this.fileDownload.sort = this.sort;
      this.fileDownload.filterPredicate = this.createFilter();
      this.dtTrigger.next(null);
      console.log(this.fileDownload)
    })
  }

  applyFilter(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.fileDownload.filter = filterValue.trim().toLowerCase();

    if (this.fileDownload.paginator) {
      this.fileDownload.paginator.firstPage();
    }
  }

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
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }

    this.downloadSubscription = this.fileService.downloadById(id).subscribe((value: any) =>
    {
      if (value.download_url){
        window.open(value.download_url)
      }
    }
  );
  }

  handleDelete(id: string) {
    this.fileService.deleteById(id).subscribe((value: any) =>
    { window.location.reload();});
  }


  // TODO
  // upload_file_to_url(file: any) {
  //   if (this.upload_url_info) {
  //     this.fileService.upload_file_to_url(this.upload_url_info, file);
  //   }
  // }
}








