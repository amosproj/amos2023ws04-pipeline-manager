import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL:string="http://localhost:8000/"

  constructor(private http: HttpClient) { }


  

  /*
  localhost:5000/datapipeline GET "gets all the datapipelines"
localhost:5000/datapipeline/<id> GET "get the specific datapipeline"
/datapipeline/new POST "create a datapipeline"
  GET

  */
  getUploadedFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiURL}/files`);
  }

  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiURL}/download/${fileName}`, { responseType: 'blob' });
  }

  
  getAllDataPipelines(id?: string): Promise<any>{
    
    return new Promise((resolve) => {
      const options = {
      };
      if (!id) {
        id=""
      }
      

      this.http.get(`${this.apiURL}datapipeline`, options).pipe().subscribe(
        (data) => {
          resolve(data)
          
        }
      )
      
    })

  }

  uploadCSV(filePath:File|null) {
    return new Promise((resolve) => {
      const options = {
        headers: new HttpHeaders(),
      };
      var requestBody: any = {
        file: filePath
      };
      this.http.post(this.apiURL + "uploadcsv", requestBody, options).subscribe(
        (data: any) => {

          resolve(data);
        },
        async (err) => {
          console.error("Server not responding and gave error", err);
        }
      );
    });


    
  }


  createDataPipeline(datapipelineName:string, config:string) {
    return new Promise((resolve) => {
      const options = {
        headers: new HttpHeaders(),
      };
      var requestBody: any = {
        name: datapipelineName,
        config: config,
      };
      this.http.post(this.apiURL + "datapipeline/new", requestBody, options).subscribe(
        (data: any) => {

          resolve(data);
        },
        async (err) => {
          console.error("Server not responding and gave error", err);
        }
      );
    });
    
  }



}
