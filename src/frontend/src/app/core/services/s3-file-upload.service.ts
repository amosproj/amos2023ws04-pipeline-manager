import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class S3FileUploadService {

  private backendUrl = environment.SERVER_URL; // actual backend URL

  constructor(private http: HttpClient) { }

  uploadFileToS3(formData: FormData): Observable<any> {
    return this.http.post(`${this.backendUrl}/upload`, formData);
  }

 getPresignedUrl(fileName: string): Observable<{ presignedUrl: string; fileName: string; s3_uuid: string,  }> {
  return this.http.post<{ presignedUrl: string; fileName: string; s3_uuid: string }>(
    `${this.backendUrl}/file/upload`,
    {"fileName": fileName},
    {headers: {
        "Access-Control-Allow-Origin": "*"
      }});
 }

 uploadFileToS3Presigned(presignedUrl: string, file: File): Observable<any> {
  return this.http.put(presignedUrl, file);

 }
 createFileDetails(fileName: string, s3_uuid: string, mime_type: string): Observable<string> {
  return this.http.post<string>(`${this.backendUrl}/file/new`, {"fileName": fileName, "s3_uuid": s3_uuid, "mime_type": mime_type });
 }
}


