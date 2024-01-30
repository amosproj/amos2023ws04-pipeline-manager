import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {AirflowService} from "../../core/services/airflow/airflow.service";
import {FileService} from "../../core/services/file/file.service";
import {DatapipelineRunService} from "../../core/services/datapipeline-run/datapipeline-run.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-start-data-pipeline',
  templateUrl: './start-data-pipeline.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgbDropdownMenu,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownToggle
  ],
  styleUrls: ['./start-data-pipeline.component.scss']
})

export class StartDataPipelineComponent implements OnInit {
  public dags$: Observable<any>;
  public files$: Observable<any>;
  selectedDag: any;
  selectedFile: any;

  constructor(private dpRunService: DatapipelineRunService,
              private airflowService: AirflowService,
              private fileService: FileService) {}

  ngOnInit(): void {
    this.dags$ = this.airflowService.getAllDags();
    this.files$ = this.fileService.getAll();
    }

  startPipeline() {
    if (this.selectedFile && this.selectedDag) {
      this.dpRunService.create({"datapipelineId": this.selectedDag.dag_id, "fileId": this.selectedFile?.s3_uuid})
        .subscribe((value: any) => {
          const executionId = value?.object.executionId;
          console.log(executionId);
          // TODO dont subscribe in a subscribe q_q but for now it can work
          this.dpRunService.startDatapipelineRun(executionId).subscribe();
        } );
    } else {
      throw Error("File and/or dag not selected.");
    }
  }

  changeDag(dag: any) {
    this.selectedDag = dag;
  }

  changeFile(file: any) {
    this.selectedFile = file;
  }
}
