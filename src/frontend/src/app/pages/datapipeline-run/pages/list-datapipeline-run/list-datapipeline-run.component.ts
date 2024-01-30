import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DatapipelineRun} from "../../../../entity/datapipelineRun";
import {DatapipelineRunService} from "../../../../core/services/datapipeline-run/datapipeline-run.service";

@Component({
  selector: 'app-list-datapipeline-run',
  templateUrl: './list-datapipeline-run.component.html',
  styleUrls: ['./list-datapipeline-run.component.scss']
})
export class ListDatapipelineRunComponent implements OnInit {
  public datapipelineRuns = new Observable<DatapipelineRun[]>;

  constructor(private datapipelineRunService: DatapipelineRunService,
              private router : Router,private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.datapipelineRuns = this.datapipelineRunService.getAll();
  }

  getID(): string {
    const id : string = this.route.snapshot.paramMap.get('id') ??'null value';
    console.log(id);
    return id
  }

  edit(uuid: string | null) {
    this.router.navigate(['/datapipelineRun', uuid]);
  }

  delete(uuid: string | null) {
    uuid = uuid ??'null value'
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
