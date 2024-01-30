import { Component } from '@angular/core';
import { ResultSearchService } from 'src/app/core/services/result-search/result-search.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss']
})
export class ResultSearchComponent {
  showQueryInput: boolean = false;
  showProjectionInput: boolean = false;
  showOptionsInput: boolean = false;
  query: string = '';
  projection: string = '';
  options: string = '';
  responseData: any[] = [];

  constructor(private searchService: ResultSearchService) { }

  fetchData() {
    // Pass user input values to the service
    this.searchService.getData(this.query, this.projection, this.options).subscribe(
      data => {
        console.log(data);
        // Handle the data received from the backend
        this.responseData = data;
      },
      error => {
        console.error(error);
        // Handle errors
      }
    );
  }
}
