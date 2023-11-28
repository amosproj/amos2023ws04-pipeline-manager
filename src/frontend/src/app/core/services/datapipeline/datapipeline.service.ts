import { Injectable } from '@angular/core';
import {CrudService} from "../crud/crud.service";
import {HttpClient} from "@angular/common/http";
import {Datapipeline} from "../../../entity/datapipeline";


@Injectable({
  providedIn: 'root'
})
export class DatapipelineService extends CrudService<Datapipeline> {


  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = '/datapipeline'
  }


}
