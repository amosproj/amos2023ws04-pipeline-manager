import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {s3PresignedUploadInfo} from "../../../entity/s3";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = "/download";
  deleteUrl = "/delete";

  constructor(private http: HttpClient) { }

  download(){
    return this.http.get(environment.SERVER_URL + this.baseUrl);
  }

  downloadById(id: string) {
    return this.http.get(environment.SERVER_URL + this.baseUrl + "/" + id);
  }

  deleteById(id: string) {
    return this.http.delete(environment.SERVER_URL + this.deleteUrl + "/" + id);
  }

  get_upload_url(): Observable<s3PresignedUploadInfo> {
    return this.http.get(environment.SERVER_URL + '/upload_url') as Observable<s3PresignedUploadInfo>;
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
