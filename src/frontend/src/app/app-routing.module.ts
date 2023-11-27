import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { DownloadComponent } from './components/download/download.component';
import { PipelineComponent } from './components/pipeline/pipeline.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'upload', component: UploadFileComponent },
  { path: 'download', component: DownloadComponent },
  { path:'datapipeline',component: PipelineComponent},
  // TODO
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
