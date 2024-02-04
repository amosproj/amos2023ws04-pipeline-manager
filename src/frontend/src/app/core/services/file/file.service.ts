import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {s3PresignedUploadInfo} from "../../../entity/s3";
import {FileList} from "../../../entity/fileList";
import { DatapipelineRun } from 'src/app/entity/datapipelineRun';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = "/file";

  constructor(private http: HttpClient) { }

  getAll():Observable<FileList[]>{
    return this.http.get<FileList[]>(environment.SERVER_URL + this.baseUrl);
  }

  downloadById(id: string) {
    return this.http.get(environment.SERVER_URL + this.baseUrl+"/"+ id + "/download");
  }

  getById(id: string): Observable<Object> {
    // TODO error handling
    return this.http.get(environment.SERVER_URL + this.baseUrl + "/" + id) as Observable<Object>;
  }
  getDpRunById(id: string): Observable<DatapipelineRun[]> {
    // TODO error handling
    return this.http.get(environment.SERVER_URL + this.baseUrl + "/"  + id + "/dp_run") as Observable<DatapipelineRun[]>;
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
