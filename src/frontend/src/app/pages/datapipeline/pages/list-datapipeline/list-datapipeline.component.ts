import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DatapipelineService} from "../../../../core/services/datapipeline/datapipeline.service";
import {Datapipeline} from "../../../../entity/datapipeline";



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
  edit(uuid: string | null) {
    throw Error('unimplemented error');
  }

  delete(uuid: string | null) {
    throw Error('unimplemented error');
  }

  upload(uuid: string | null) {
    throw Error('unimplemented error');
  }
}
