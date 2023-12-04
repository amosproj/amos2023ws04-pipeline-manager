import { Injectable } from '@angular/core';
import {CrudService} from "../crud/crud.service";
import {HttpClient} from "@angular/common/http";
import { Datapipeline } from "../../../entity/datapipeline";
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class DatapipelineService extends CrudService<Datapipeline> {


  constructor(http: HttpClient,router:Router) {
    super(http,router);
    this.baseUrl = '/datapipeline'
  }


}
