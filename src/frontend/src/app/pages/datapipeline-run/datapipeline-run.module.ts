import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDatapipelineRunComponent } from './pages/list-datapipeline-run/list-datapipeline-run.component';
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";



@NgModule({
  declarations: [
    ListDatapipelineRunComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        RouterLinkActive
    ]
})
export class DatapipelineRunModule { }
