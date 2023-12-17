import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getS3Files(): Observable<{ files: string[] }> {
    const url = `${this.baseUrl}/download`;
    return  this.http.get<{ files: string[] }>(url);
  }

  getAvailablePipelines(): Observable<any[]> {
    const url = `${this.baseUrl}/datapipelines`;
    return this.http.get<any[]>(url);
  }

  startPipeline(s3File: string, pipelineId: string): Observable<any> {
    const url = `${this.baseUrl}/startPipeline`;
    const body = { s3File, pipelineId };
    return this.http.post<any>(url, body);
  }
}

