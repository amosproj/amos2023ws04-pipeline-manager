import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DatapipelineRun} from "../../../../entity/datapipelineRun";
import {DatapipelineRunService} from "../../../../core/services/datapipeline-run/datapipeline-run.service";
import {MatSort} from '@angular/material/sort';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaterialMoudule} from 'src/material-moudule';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-list-datapipeline-run',
  templateUrl: './list-datapipeline-run.component.html',
  styleUrls: ['./list-datapipeline-run.component.scss']
})
export class ListDatapipelineRunComponent implements OnInit, OnDestroy, MaterialMoudule, ReactiveFormsModule {
  public filesSubscription: Subscription;
  public datapipelineRuns = new MatTableDataSource<DatapipelineRun>();
  dtTrigger: Subject<any> = new Subject<any>();

  nameFilter = new FormControl('');
  executionIdFilter = new FormControl('');
  datapipelineIdFilter = new FormControl('');
  fileIdFilter = new FormControl('');
  createDateFilter = new FormControl('');
  userFilter = new FormControl('');
  resultFilter = new FormControl('');
  stateFilter = new FormControl('');


  filterValues = {
    name: '',
    fileId: '',
    executionId: '',
    datapipelineId: '',
    create_date: '',
    user: '',
    result: '',
    state: ''

  }

  constructor(private datapipelineRunService: DatapipelineRunService,
              private router: Router, private route: ActivatedRoute,) {
  }

  displayedColumns: string[] = ['name', 'executionId', 'datapipelineId', 'fileId', 'create_date', 'user', 'result', 'state', "action"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
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
    this.createDateFilter.valueChanges
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
    this.filesSubscription = this.datapipelineRunService.getAll().subscribe((res: DatapipelineRun[]) => {
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
      executionId: string;
      datapipelineId: string;
      fileId: string;
      create_date: string;
      user: string;
      result: any;
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
        && data.create_date.toLowerCase().indexOf(searchTerms.create_date) !== -1
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
  }

  rerun(uuid: any) {
    throw Error('unimplemented error');
  }
}
