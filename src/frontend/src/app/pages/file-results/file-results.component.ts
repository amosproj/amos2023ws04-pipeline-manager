import {Component, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {String} from 'aws-sdk/clients/cloudsearch';
import {DatapipelineRun} from 'src/app/entity/datapipelineRun';
import {DatapipelineRunService} from 'src/app/core/services/datapipeline-run/datapipeline-run.service';
import {FileService} from 'src/app/core/services/file/file.service';

@Component({
  selector: 'app-file-results',
  templateUrl: './file-results.component.html',
  styleUrls: ['./file-results.component.scss']
})
export class FileResultsComponent {
  public filesSubscription: Subscription;
  public datapipelineRuns = new MatTableDataSource<DatapipelineRun>();
  dtTrigger: Subject<any> = new Subject<any>();
  nameFilter = new FormControl('');
  executionIdFilter = new FormControl('');
  datapipelineIdFilter = new FormControl('');
  fileIdFilter = new FormControl('');
  createdDateFilter = new FormControl('');
  userFilter = new FormControl('');
  resultFilter = new FormControl('');
  stateFilter = new FormControl('');
  filterValues = {
    name: '',
    executionId: '',
    datapipelineId: '',
    fileId: '',
    create_date: '',
    user: '',
    result: '',
    state: ''
  }
  s3_uuid: any;

  constructor(private datapipelineRunService: DatapipelineRunService,
              private router: Router, private route: ActivatedRoute, private fileService: FileService) {
  }

  displayedColumns: string[] = ['name', 'fileId', 'executionId', 'datapipelineId', 'create_date', 'user', 'result'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.route.params.subscribe(paramMap => {
      this.s3_uuid = paramMap['s3_uuid'];
    });

    this.getAll();
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = String(name);
          this.datapipelineRuns.filter = JSON.stringify(this.filterValues);
        }
      )
    this.executionIdFilter.valueChanges
      .subscribe(
        executionId => {
          this.filterValues.executionId = String(executionId);
          this.datapipelineRuns.filter = JSON.stringify(this.filterValues);
        }
      )
    this.datapipelineIdFilter.valueChanges
      .subscribe(
        datapipelineId => {
          this.filterValues.datapipelineId = String(datapipelineId);
          this.datapipelineRuns.filter = JSON.stringify(this.filterValues);
        }
      )
    this.fileIdFilter.valueChanges
      .subscribe(
        fileId => {
          this.filterValues.fileId = String(fileId);
          this.datapipelineRuns.filter = JSON.stringify(this.filterValues);
        }
      )
    this.createdDateFilter.valueChanges
      .subscribe(
        create_date => {
          this.filterValues.create_date = String(create_date);
          this.datapipelineRuns.filter = JSON.stringify(this.filterValues);
        }
      )
    this.userFilter.valueChanges
      .subscribe(
        user => {
          this.filterValues.user = String(user);
          this.datapipelineRuns.filter = JSON.stringify(this.filterValues);
        }
      )
    this.resultFilter.valueChanges
      .subscribe(
        result => {
          this.filterValues.result = String(result);
          this.datapipelineRuns.filter = JSON.stringify(this.filterValues);
        }
      )
    this.stateFilter.valueChanges
      .subscribe(
        state => {
          this.filterValues.state = String(state);
          this.datapipelineRuns.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  getAll() {
    this.filesSubscription = this.fileService.getDpRunById(this.s3_uuid).subscribe((res: DatapipelineRun[]) => {
      this.datapipelineRuns = new MatTableDataSource<DatapipelineRun>(res);
      this.datapipelineRuns.paginator = this.paginator;
      this.datapipelineRuns.sort = this.sort;
      this.datapipelineRuns.filterPredicate = this.createFilter();
      this.dtTrigger.next(null);
    })
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: {
      name: string;
      executionId: String;
      datapipelineId: string;
      fileId: string;
      create_date: string;
      user: string;
      result: string;
      state: string
    }, filter: string): boolean {
      let searchTerms = JSON.parse(filter);

      const resultString = JSON.stringify(data.result);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.executionId.toString().toLowerCase().indexOf(searchTerms.executionId) !== -1
        && data.datapipelineId.toLowerCase().indexOf(searchTerms.datapipelineId) !== -1
        && data.fileId.toLowerCase().indexOf(searchTerms.fileId) !== -1
        && resultString.toLowerCase().indexOf(searchTerms.result) !== -1
        && data.state.toLowerCase().indexOf(searchTerms.state) !== -1
        && data.create_date.toLowerCase().indexOf(searchTerms.created_Date) !== -1
        && data.user.toLowerCase().indexOf(searchTerms.user) !== -1;
    }
    return filterFunction;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if (this.filesSubscription) {
      this.filesSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datapipelineRuns.filter = filterValue.trim().toLowerCase();
    if (this.datapipelineRuns.paginator) {
      this.datapipelineRuns.paginator.firstPage();
    }
  }

  getID(): string {
    const id: string = this.route.snapshot.paramMap.get('id') ?? 'null value';
    console.log(id);
    return id
  }

  edit(uuid: string | null) {
    this.router.navigate(['/datapipelineRun', uuid]);
  }

  delete(uuid: string | null) {
    uuid = uuid ?? 'null value'
    this.datapipelineRunService.delete(uuid).subscribe(res => {
      "Delete successful"
    }, err => {
      "Delete failed"
    });
    // throw Error('unimplemented error');
  }

  upload(uuid: string | null) {
    throw Error('unimplemented error');
  }

  rerun(uuid: any) {
    throw Error('unimplemented error');
  }
}









