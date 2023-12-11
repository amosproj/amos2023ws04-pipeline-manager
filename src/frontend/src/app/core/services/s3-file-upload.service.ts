import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class S3FileUploadService {

  private backendUrl = environment.BACKEND_URL; // actual backend URL

  constructor(private http: HttpClient) { }

  uploadCsv(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }

  uploadFileToS3(formData: FormData): Observable<any> {
    return this.http.post(`${this.backendUrl}/upload`, formData);
  }

 getPresignedUrl(fileName: string): Observable<string> {
  return this.http.get<string>(`${this.backendUrl}upload_url?fileName=${fileName}`);
 }

 uploadFileToS3Presigned(presignedUrl: string, formData: FormData): Observable<any> {
  return this.http.put(presignedUrl, formData);

 }
 storeFileDetails(fileName: string): Observable<string> {
  return this.http.get<string>(`${this.backendUrl}/store_file_data?fileName=${fileName}`);
 }
}


