import { Component,OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { DatapipelineService } from "../../../../core/services/datapipeline/datapipeline.service";
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Entity } from 'aws-sdk/clients/costexplorer';

@Component({
  selector: 'app-edit-datapipeline',
  templateUrl: './edit-datapipeline.component.html',
  styleUrls: ['./edit-datapipeline.component.scss']
})
export class EditDatapipelineComponent{

  constructor(
    private datapipelineService: DatapipelineService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router : Router,
  ) {
  }

  ngOnInit(): void {
    this.getID();
  }

  getID(): string {
    const id : string = this.route.snapshot.paramMap.get('id') ??'null value';
    console.log(id);
    return id
  }
  datapipelineForm = this.formBuilder.group({
    uuid: this.getID(),
    name: '',
    config: ''
  });

  onSubmit(): void {
     this.datapipelineService.getById(this.getID()).subscribe(
      entity =>  {
        },
      (error) => {
        console.error('Error fetching entity:', error);
      }
    );
    this.datapipelineService.update(this.getID(),this.datapipelineForm.getRawValue()).subscribe();
    this.router.navigate(['/datapipeline']);
  }

}
