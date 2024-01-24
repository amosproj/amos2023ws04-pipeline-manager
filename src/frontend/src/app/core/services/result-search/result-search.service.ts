import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultSearchService {
  private apiUrl = environment.SERVER_URL;;

  constructor(private http: HttpClient) {}

  getData(query: string, projection: string, options: string): Observable<any[]> {
    // Set up headers if needed
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Set up query parameters
    const params = new HttpParams()
      .set('query', query)
      .set('projection', projection)
      .set('options', options);

    // Make the HTTP GET request
    return this.http.get<any[]>(`${this.apiUrl}/get_data`, { headers, params });
  }
}
