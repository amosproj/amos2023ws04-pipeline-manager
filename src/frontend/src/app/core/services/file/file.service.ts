import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = "/download";

  constructor(private http: HttpClient) { }

  download(){
    return this.http.get(environment.SERVER_URL + this.baseUrl);
  }

  // upload();
  downloadById(id: string) {
    return this.http.get(environment.SERVER_URL + this.baseUrl + "/" + id);
  }
}
