import { Injectable } from '@angular/core';
import {CrudService} from "../crud/crud.service";
import {HttpClient} from "@angular/common/http";


interface Datapipeline {
  uuid: string;
  name: string;
  config: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatapipelineService extends CrudService<Datapipeline> {


  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = '/datapipeline'
  }


}
