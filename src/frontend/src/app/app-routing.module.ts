import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { UploadFileComponent } from './modules/upload-file/upload-file.component';
import { DownloadComponent } from './modules/download/download.component';
import {ListDatapipelineComponent} from "./pages/datapipeline/pages/list-datapipeline/list-datapipeline.component";
import {EditDatapipelineComponent} from "./pages/datapipeline/pages/edit-datapipeline/edit-datapipeline.component";
import { ListS3bucketfilesComponent } from './pages/s3bucketfiles/list-s3bucketfiles/list-s3bucketfiles.component';
import { CreateDatapipelineComponent } from './pages/datapipeline/pages/create-datapipeline/create-datapipeline.component';
import {S3UploadFilesComponent} from './pages/s3-upload-files/s3-upload-files.component';
import {S3UploadFilesComponent} from './pages/s3-upload-files/s3-upload-files.component';
import { startDataPipelineComponent } from './pages/start-data-pipeline/start-data-pipeline.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'upload', component: UploadFileComponent },
  { path: 'download', component: DownloadComponent },
  { path:'datapipeline',component: ListDatapipelineComponent},
  { path:'datapipeline/new',component: EditDatapipelineComponent},
  { path:'datapipeline/:id',component: EditDatapipelineComponent},
  { path:'s3upload',component: S3UploadFilesComponent},
  { path:'startpipeline',component: startDataPipelineComponent},
  { path: 's3list', component: ListS3bucketfilesComponent },
  {path:'newdatapipeline',component:CreateDatapipelineComponent},
  { path:'startdatapipeline',component: PipelineComponent},

  { path:'s3upload',component: S3UploadFilesComponent},
  { path:'startpipeline',component: startDataPipelineComponent},
  // TODO
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
