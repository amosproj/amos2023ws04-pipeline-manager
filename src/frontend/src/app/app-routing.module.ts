import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { UploadFileComponent } from './modules/upload-file/upload-file.component';
import { DownloadComponent } from './modules/download/download.component';
import {ListDatapipelineComponent} from "./pages/datapipeline/pages/list-datapipeline/list-datapipeline.component";
import {EditDatapipelineComponent} from "./pages/datapipeline/pages/edit-datapipeline/edit-datapipeline.component";
import { ListS3bucketfilesComponent } from './pages/s3bucketfiles/list-s3bucketfiles/list-s3bucketfiles.component';
import { CreateDatapipelineComponent } from './pages/datapipeline/pages/create-datapipeline/create-datapipeline.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'upload', component: UploadFileComponent },
  { path: 'download', component: DownloadComponent },
  { path:'datapipeline',component: ListDatapipelineComponent},
  { path:'datapipeline/new',component: CreateDatapipelineComponent},
  { path:'datapipeline/:id',component: EditDatapipelineComponent},
  { path: 's3list', component: ListS3bucketfilesComponent },
  {path:'newdatapipeline',component:CreateDatapipelineComponent},
  // TODO
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
