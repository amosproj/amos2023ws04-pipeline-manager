import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { UploadFileComponent } from './modules/upload-file/upload-file.component';
import { DownloadComponent } from './modules/download/download.component';
import { PipelineComponent } from './pages/pipeline/pipeline.component';

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
