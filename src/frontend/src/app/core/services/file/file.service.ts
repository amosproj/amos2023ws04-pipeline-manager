import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {s3PresignedUploadInfo} from "../../../entity/s3";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = "/file";

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(environment.SERVER_URL + this.baseUrl) as Observable<any>;
  }

  downloadById(id: string,file_name:string) {
    return this.http.post(environment.SERVER_URL + this.baseUrl + "/download", {"id":id,"file_name":file_name});
  }

  getById(id: string): Observable<Object> {
    // TODO error handling
    return this.http.get(environment.SERVER_URL + this.baseUrl + "/" + id) as Observable<Object>;
  }

  deleteById(id: string) {
    return this.http.delete(environment.SERVER_URL + this.baseUrl + "/" + id);
  }

  get_upload_url(): Observable<s3PresignedUploadInfo> {
    return this.http.get(environment.SERVER_URL + '/file/upload') as Observable<s3PresignedUploadInfo>;
  }

  upload_file_to_url(upload_url_info: s3PresignedUploadInfo, file: any) {
    return this.http.post(upload_url_info.url, {
      fields: upload_url_info.fields,
      file: file},
      {headers: {
          "Access-Control-Allow-Origin": "*"
        }}).subscribe((value) =>
      console.log(value));
  }
}
