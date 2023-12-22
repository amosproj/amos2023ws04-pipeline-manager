import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {DatapipelineService} from "../../../../core/services/datapipeline/datapipeline.service";
import { Datapipeline } from "../../../../entity/datapipeline";
import { ActivatedRoute } from '@angular/router';
import {AirflowService} from "../../../../core/services/airflow/airflow.service";
import {FileService} from "../../../../core/services/file/file.service";



@Component({
  selector: 'app-list-datapipeline',
  templateUrl: './list-datapipeline.component.html',
  styleUrls: ['./list-datapipeline.component.scss']
})
export class ListDatapipelineComponent implements OnInit {

  public datapipelines$ = new Observable<Datapipeline[]>;
  public dags$: Observable<any>;
  public files$: Observable<any>;

  constructor(private datapipelineService: DatapipelineService,
              private router : Router,
              private route: ActivatedRoute,
              private airflowService: AirflowService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.datapipelines$ = this.datapipelineService.getAll();
    this.dags$ = this.airflowService.getAllDags();
    this.files$ = this.fileService.getAll();
  }

  getID(): string {
    const id : string = this.route.snapshot.paramMap.get('id') ??'null value';
    console.log(id);
    return id
  }

  edit(uuid: string | null) {
    this.router.navigate(['/datapipeline', uuid]);
    // throw Error('unimplemented error');
  }

  delete(uuid: string | null) {
    uuid = uuid ??'null value'
    this.datapipelineService.delete(uuid).subscribe(res => {
      "Delete successful"
    }, err => {
      "Delete failed"
    });
    // throw Error('unimplemented error');
  }

  upload(uuid: string | null) {
    throw Error('unimplemented error');
  }
}
