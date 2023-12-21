import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {DatapipelineService} from "../../../../core/services/datapipeline/datapipeline.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-datapipeline',
  templateUrl: './create-datapipeline.component.html',
  styleUrls: ['./create-datapipeline.component.scss']
})
export class CreateDatapipelineComponent {
  datapipelineForm = this.formBuilder.group({
    name: '',
    config: ''
  });

  constructor(
    private datapipelineService: DatapipelineService,
    private formBuilder: FormBuilder,
    private router : Router,
  ) {

  }

  onSubmit(): void {
    this.datapipelineService.create(this.datapipelineForm.getRawValue());
    this.router.navigate(['/datapipeline']);
  }

}
