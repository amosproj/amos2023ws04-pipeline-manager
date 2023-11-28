import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DatapipelineService} from "../../../../core/services/datapipeline/datapipeline.service";


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

  constructor(private datapipelineService: DatapipelineService) {
  }

  ngOnInit(): void {
    this.datapiplines = this.datapipelineService.getAll();
  }
}
