import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


interface Datapipeline {
  uuid: string;
  name: string;
  config: string;
}


@Component({
  selector: 'app-list-datapipeline',
  templateUrl: './list-datapipeline.component.html',
  styleUrls: ['./list-datapipeline.component.scss']
})
export class ListDatapipelineComponent implements OnInit{

  public datapiplines = new Observable<Datapipeline[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.datapiplines = this.http.get('http://localhost:8000/datapipeline') as Observable<Datapipeline[]>;
  }
}
