import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "../../../../environments/environment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudService<Entity> {

  protected baseUrl: string = '/';
  constructor(public http: HttpClient,private router:Router) {
  }

  getAll(): Observable<Entity[]> {
    // TODO error handling
    return this.http.get(environment.SERVER_URL + this.baseUrl) as Observable<Entity[]>;
  }

  getById(id: string): Observable<Entity> {
    // TODO error handling
    return this.http.get(environment.SERVER_URL + this.baseUrl + "/" + id) as Observable<Entity>;
  }

  create(entity: Partial<Entity>): Observable<any> {
    return this.http.post(environment.SERVER_URL + this.baseUrl + '/new', entity,
      {headers: {
          "Access-Control-Allow-Origin": "*"
      }});
  }

  update(id: string, updateEntity: Entity): Observable<Entity> {
    return this.http.post(environment.SERVER_URL + this.baseUrl + "/" + id, updateEntity) as Observable<Entity>;
  }

  delete(id:string): Observable<Object> {
    return this.http.delete(environment.SERVER_URL+this.baseUrl+"/"+id);
  }
}
