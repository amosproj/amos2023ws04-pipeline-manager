import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CrudService} from "../crud/crud.service";
import {Datapipeline} from "../../../entity/datapipeline";
import {DatapipelineRun} from "../../../entity/datapipelineRun";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DatapipelineRunService extends CrudService<DatapipelineRun>{

  constructor(http: HttpClient,router:Router) {
    super(http,router);
    this.baseUrl = '/dp_run'
  }


  startDatapipelineRun(executionId: string): Observable<string> {
    // TODO error handling
    return this.http.get(environment.SERVER_URL + this.baseUrl + "/" + executionId + "/run") as Observable<string>;
  }
}
