import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CrudService<Entity> {

  protected baseUrl: string = '/';
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Entity[]> {
    // TODO error handling
    return this.http.get(environment.SERVER_URL + this.baseUrl) as Observable<Entity[]>;
  }

  getById(id: string): Observable<Entity> {
    // TODO error handling
    return this.http.get(environment.SERVER_URL + this.baseUrl + "/" + id) as Observable<Entity>;
  }

  // create(): Observable<Entity> {
  //   return null;
  // }
  //
  // update(): Observable<Entity> {
  //   return null;
  //
  // }
  // delete(): Observable<Boolean> {
  //   return null;
  // }
}
