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

  create(entity: Partial<Entity>) {
    console.log(environment.SERVER_URL + this.baseUrl + '/new');
    return this.http.post(environment.SERVER_URL + this.baseUrl + '/new', entity,
      {headers: {
          "Access-Control-Allow-Origin": "*"
        }}).subscribe((value) =>
    console.log(value));
  }

  update(id: string, updateEntity: Entity): Observable<Entity> {
    return this.http.post(environment.SERVER_URL + this.baseUrl + "/" + id, updateEntity) as Observable<Entity>;
  }

  // delete(): Observable<Boolean> {
  //   return null;
  // }
}
