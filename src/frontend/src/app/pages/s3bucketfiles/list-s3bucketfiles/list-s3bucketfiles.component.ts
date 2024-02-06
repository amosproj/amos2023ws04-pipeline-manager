import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  AfterContentInit,
  AfterViewInit
} from '@angular/core';
import {RestApiService} from 'src/app/core/services/restApi/rest-api.service';
import {FileService} from "../../../core/services/file/file.service";
import {
  Subject,
  Observable,
  Subscription,
  combineLatest,
  forkJoin,
  ReplaySubject,
  switchMap,
  BehaviorSubject, debounceTime
} from "rxjs";
import {s3PresignedUploadInfo} from "../../../entity/s3";
import {MaterialMoudule} from 'src/material-moudule';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {FileList} from "../../../entity/fileList";


@Component({
  selector: 'app-list-s3bucketfiles',
  templateUrl: './list-s3bucketfiles.component.html',
  styleUrls: ['./list-s3bucketfiles.component.scss'],
})

export class ListS3bucketfilesComponent implements OnInit, OnDestroy, MaterialMoudule {
  public fileDownload$ = new BehaviorSubject<MatTableDataSource<FileList>>(new MatTableDataSource<FileList>());
  public temp: any;
  public upload_url_info: s3PresignedUploadInfo | null = null;

  refreshToken$: Subject<void> = new Subject<void>();

  nameFilter = new FormControl('');
  fileTypeFilter = new FormControl('');
  lastModifiedFilter = new FormControl('');
  sizeFilter = new FormControl('');
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


  public filesSubscription: Subscription;
  private downloadSubscription: Subscription;

  private filterFunction = function (data: {
    name: string;
    mime_type: { toString: () => string; };
    last_modified: string;
    size: string;
    s3_uuid: string;
    user: string;
  }, filter: string): boolean {
    let searchTerms = JSON.parse(filter);
    return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
      && data.mime_type.toString().toLowerCase().indexOf(searchTerms.mime_type) !== -1
      && data.last_modified.toLowerCase().indexOf(searchTerms.last_modified) !== -1
      && data.size.toLowerCase().indexOf(searchTerms.size) !== -1
      && data.s3_uuid.toLowerCase().indexOf(searchTerms.s3_uuid) !== -1
      && data.user.toLowerCase().indexOf(searchTerms.user) !== -1;
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private restapi: RestApiService, private fileService: FileService) {
    this.filesSubscription = this.refreshToken$.pipe(
      debounceTime(1000),
      switchMap(() => this.fileService.getAll())
    ).subscribe(
      (res) => {
        this.temp = res;
        const matTable = new MatTableDataSource<FileList>(this.temp)
        matTable.filterPredicate = this.filterFunction;
        matTable.paginator = this.paginator;
        matTable.sort = this.sort;
        this.fileDownload$.next(matTable);
      });
  }

  displayedColumns: string[] = ['name', 'mime_type', 'last_modified', 'size', 's3_uuid', 'user', 'action'];

  ngOnInit(): void {
    this.refreshToken$.next();

    this.fileService.get_upload_url().subscribe((value) => this.upload_url_info = value);

    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = String(name);
          this.refreshingMaterialDataTable();
        }
      )
    this.fileTypeFilter.valueChanges
      .subscribe(
        mime_type => {
          this.filterValues.mime_type = String(mime_type);
          this.refreshingMaterialDataTable();
        }
      )
    this.lastModifiedFilter.valueChanges
      .subscribe(
        last_modified => {
          this.filterValues.last_modified = String(last_modified);
          this.refreshingMaterialDataTable();
        }
      )
    this.sizeFilter.valueChanges
      .subscribe(
        size => {
          this.filterValues.size = String(size);
          this.refreshingMaterialDataTable();
        }
      )
    this.s3UuidFilter.valueChanges
      .subscribe(
        s3_uuid => {
          this.filterValues.s3_uuid = String(s3_uuid);
          this.refreshingMaterialDataTable();
        }
      )
    this.userFilter.valueChanges
      .subscribe(
        user => {
          this.filterValues.user = String(user);
          this.refreshingMaterialDataTable();
        }
      )


  }

  private refreshingMaterialDataTable() {
    const matTable = this.fileDownload$.getValue();
    matTable.filterPredicate = this.filterFunction;
    matTable.paginator = this.paginator;
    matTable.sort = this.sort;
    matTable.filter = JSON.stringify(this.filterValues);
    this.fileDownload$.next(matTable);
  }

// ---------------------------------------------------------------------


  ngOnDestroy(): void {
    if (this.filesSubscription) {
      this.filesSubscription.unsubscribe();
    }
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }
  }

  handleDownload(id: string) {
    // TODO bad subscibe as the subscription is not ending here,
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }

    this.downloadSubscription = this.fileService.downloadById(id).subscribe((value: any) => {
        if (value.download_url) {
          window.open(value.download_url)
        }
      }
    );
  }

  handleDelete(id: string) {
    this.fileService.deleteById(id).subscribe((value: any) => {
      window.location.reload();
    });
  }

  refresh($event: any) {
    // ignore event but trigger refresh token
    this.refreshToken$.next();
  }
}








