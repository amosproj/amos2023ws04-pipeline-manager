import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import {ListDatapipelineComponent} from "./pages/datapipeline/pages/list-datapipeline/list-datapipeline.component";
import {EditDatapipelineComponent} from "./pages/datapipeline/pages/edit-datapipeline/edit-datapipeline.component";
import { ListS3bucketfilesComponent } from './pages/s3bucketfiles/list-s3bucketfiles/list-s3bucketfiles.component';
import { CreateDatapipelineComponent } from './pages/datapipeline/pages/create-datapipeline/create-datapipeline.component';
import {S3UploadFilesComponent} from './pages/s3-upload-files/s3-upload-files.component';
import {
  ListDatapipelineRunComponent
} from "./pages/datapipeline-run/pages/list-datapipeline-run/list-datapipeline-run.component";
import { ResultSearchComponent } from './pages/result-search/result-search.component';

import { FileResultsComponent } from './pages/file-results/file-results.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'datapipeline',component: ListDatapipelineComponent},
  { path: 'datapipeline/new',component: CreateDatapipelineComponent},
  { path: 'datapipeline/:id',component: EditDatapipelineComponent},
  { path: 'dp_run',component: ListDatapipelineRunComponent},
  { path: 's3list', component: ListS3bucketfilesComponent },
  { path: 's3upload',component: S3UploadFilesComponent},
  { path: 'resultSearch',component: ResultSearchComponent},

  { path: 'fileResults/:s3_uuid',component: FileResultsComponent},

  // TODO
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
