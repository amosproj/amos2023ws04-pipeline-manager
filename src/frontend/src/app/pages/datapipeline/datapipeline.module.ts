import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDatapipelineComponent } from './pages/list-datapipeline/list-datapipeline.component';
import { EditDatapipelineComponent } from './pages/edit-datapipeline/edit-datapipeline.component';

@NgModule({
  declarations: [
    ListDatapipelineComponent,
    EditDatapipelineComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DatapipelineModule { }
