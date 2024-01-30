import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDatapipelineRunComponent } from './pages/list-datapipeline-run/list-datapipeline-run.component';
import { FormControl, ReactiveFormsModule,FormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { MaterialMoudule } from 'src/material-moudule';
import {StartDataPipelineComponent} from "../start-data-pipeline/start-data-pipeline.component";



@NgModule({
  declarations: [
    ListDatapipelineRunComponent,

  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        RouterLinkActive,
        MaterialMoudule,
        ReactiveFormsModule,
        StartDataPipelineComponent
    ]
})
export class DatapipelineRunModule { }
