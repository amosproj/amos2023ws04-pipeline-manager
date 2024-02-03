import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDatapipelineComponent } from './pages/list-datapipeline/list-datapipeline.component';
import { EditDatapipelineComponent } from './pages/edit-datapipeline/edit-datapipeline.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { CreateDatapipelineComponent } from './pages/create-datapipeline/create-datapipeline.component';
import {StartDataPipelineComponent} from "../start-data-pipeline/start-data-pipeline.component";

@NgModule({
  declarations: [
    ListDatapipelineComponent,
    EditDatapipelineComponent,
    CreateDatapipelineComponent
  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    ReactiveFormsModule,
    StartDataPipelineComponent
  ]
})
export class DatapipelineModule { }
