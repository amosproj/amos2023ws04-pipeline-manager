import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Dag} from "../../../entity/dag";

@Injectable({
  providedIn: 'root'
})
export class AirflowService {

  baseUrl = '/dags';
  constructor(public http: HttpClient,private router:Router) { }

  getAllDags() {
    return this.http.get(environment.SERVER_URL + this.baseUrl) as Observable<any>;
  }
}
