import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DatapipelineService} from "../../../../core/services/datapipeline/datapipeline.service";
import { Datapipeline } from "../../../../entity/datapipeline";
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-list-datapipeline',
  templateUrl: './list-datapipeline.component.html',
  styleUrls: ['./list-datapipeline.component.scss']
})
export class ListDatapipelineComponent implements OnInit {

  public datapipelines = new Observable<Datapipeline[]>;

  constructor(private datapipelineService: DatapipelineService,private router : Router,private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.datapipelines = this.datapipelineService.getAll();

  }

  getID(): string {
    const id : string = this.route.snapshot.paramMap.get('id') ??'null value';
    console.log(id);
    return id
  }

  edit(uuid: string | null) {
    this.router.navigate(['/datapipeline', uuid]);
    // throw Error('unimplemented error');
  }

  delete(uuid: string | null) {
    uuid = uuid ??'null value'
    this.datapipelineService.delete(uuid).subscribe(res => {
      "Delete successful"
    }, err => {
      "Delete failed"
    });
    // throw Error('unimplemented error');
  }

  upload(uuid: string | null) {
    throw Error('unimplemented error');
  }
}
