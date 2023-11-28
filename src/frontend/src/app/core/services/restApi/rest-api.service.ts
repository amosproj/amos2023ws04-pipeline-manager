import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL:string="http://localhost:8000/"

  constructor(private http: HttpClient) { }
  private videoToUpload: any;


  

  /*
  localhost:5000/datapipeline GET "gets all the datapipelines"
localhost:5000/datapipeline/<id> GET "get the specific datapipeline"
/datapipeline/new POST "create a datapipeline"
  GET

  */
  getUploadedFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiURL}/files`);
  }

  // downloadFile(fileName: string): Observable<Blob> {
  //   return this.http.get(`${this.apiURL}/download?fileName=${fileName}`, { responseType: 'blob' });
  // }
  // uploadFile(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post(`${this.apiURL}/upload`, formData);
  // }

  getPresignedUrl(): Promise<string> {
    return this.http.get<any>('apiURL/get-presigned-url')
      .toPromise()
      .then(response => response.presigned_url)
      .catch(error => {
        console.error('Error fetching presigned URL', error);
        throw error;
      });
  }

  uploadCsvFile(file: File): Promise<void> {
    return this.getPresignedUrl()
      .then(presignedUrl => this.uploadFile(file, presignedUrl));
  }

  private uploadFile(file: File, presignedUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', presignedUrl, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(`Failed to upload file. Status: ${xhr.status}`);
        }
      };
      xhr.onerror = () => {
        reject('Failed to upload file.');
      };
      xhr.send(file);
    });
  }

  downloadCsvFile(): void {
    this.getPresignedUrl()
      .then(url => this.downloadFile(url))
      .catch(error => console.error('Error getting presigned URL', error));
  }

  private downloadFile(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'your-file.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      this.http.post(this.apiURL + "upload", requestBody, options).subscribe(
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
